// Password hashing (PBKDF2-SHA256) and cookie sessions stored in D1.
// Hash format: pbkdf2$<iterations>$<salt b64>$<hash b64> — same as scripts/create-admin.mjs.

const ITERATIONS = 20000; // Workers free plan has a small CPU budget per request.
const SESSION_DAYS = 7;
const COOKIE = 'physio_admin';
const enc = new TextEncoder();

const b64 = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf)));
const unb64 = (s) => Uint8Array.from(atob(s), (ch) => ch.charCodeAt(0));

async function pbkdf2(password, salt, iterations) {
  const key = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']);
  return crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt, iterations }, key, 256);
}

export async function hashPassword(password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const bits = await pbkdf2(password, salt, ITERATIONS);
  return `pbkdf2$${ITERATIONS}$${b64(salt)}$${b64(bits)}`;
}

export async function verifyPassword(password, stored) {
  const [alg, iter, salt, hash] = String(stored || '').split('$');
  if (alg !== 'pbkdf2' || !iter || !salt || !hash) return false;
  const bits = b64(await pbkdf2(password, unb64(salt), Number(iter)));
  if (bits.length !== hash.length) return false;
  let diff = 0;
  for (let i = 0; i < bits.length; i++) diff |= bits.charCodeAt(i) ^ hash.charCodeAt(i);
  return diff === 0;
}

async function sha256(text) {
  return b64(await crypto.subtle.digest('SHA-256', enc.encode(text)));
}

function readCookie(request) {
  const header = request.headers.get('Cookie') || '';
  const m = header.match(new RegExp(`(?:^|;\\s*)${COOKIE}=([^;]+)`));
  return m ? m[1] : null;
}

function cookie(value, maxAge, secure) {
  return `${COOKIE}=${value}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${maxAge}${secure ? '; Secure' : ''}`;
}

export async function createSession(env, userId, url) {
  const token = b64(crypto.getRandomValues(new Uint8Array(32))).replace(/[+/=]/g, (c) => ({ '+': '-', '/': '_', '=': '' })[c]);
  const expires = Date.now() + SESSION_DAYS * 86400_000;
  await env.DB.batch([
    env.DB.prepare('DELETE FROM sessions WHERE expires_at < ?').bind(Date.now()),
    env.DB.prepare('INSERT INTO sessions (token_hash, user_id, expires_at) VALUES (?, ?, ?)').bind(await sha256(token), userId, expires),
  ]);
  return cookie(token, SESSION_DAYS * 86400, url.protocol === 'https:');
}

export async function getSessionUser(env, request) {
  const token = readCookie(request);
  if (!token) return null;
  return env.DB.prepare(
    `SELECT u.id, u.username FROM sessions s JOIN users u ON u.id = s.user_id
     WHERE s.token_hash = ? AND s.expires_at > ?`,
  )
    .bind(await sha256(token), Date.now())
    .first();
}

export async function destroySession(env, request, url) {
  const token = readCookie(request);
  if (token) await env.DB.prepare('DELETE FROM sessions WHERE token_hash = ?').bind(await sha256(token)).run();
  return cookie('', 0, url.protocol === 'https:');
}

// Simple brute-force protection: at most 10 failed logins per IP per 15 minutes.
export async function tooManyAttempts(env, ip) {
  const since = Date.now() - 15 * 60_000;
  const row = await env.DB.prepare('SELECT COUNT(*) AS n FROM login_attempts WHERE ip = ? AND ts > ?').bind(ip, since).first();
  return (row?.n || 0) >= 10;
}

export async function recordFailedAttempt(env, ip) {
  await env.DB.batch([
    env.DB.prepare('INSERT INTO login_attempts (ip, ts) VALUES (?, ?)').bind(ip, Date.now()),
    env.DB.prepare('DELETE FROM login_attempts WHERE ts < ?').bind(Date.now() - 86400_000),
  ]);
}
