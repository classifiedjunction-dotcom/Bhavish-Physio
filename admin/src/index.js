// Admin portal worker: JSON API for editing website content, plus the static admin app in ./public.
import { SETTINGS, COLLECTIONS, SETTINGS_BY_KEY, COLLECTIONS_BY_KEY, APPOINTMENT_STATUSES, slugify } from '../../shared/schema.js';
import { ICON_PATHS } from '../../shared/icons.js';
import {
  hashPassword, verifyPassword, createSession, getSessionUser, destroySession, tooManyAttempts, recordFailedAttempt,
} from './auth.js';

const json = (data, status = 200, headers = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', ...headers },
  });
const fail = (status, error) => json({ error }, status);

const parse = (text, fallback = {}) => {
  try {
    return JSON.parse(text) ?? fallback;
  } catch {
    return fallback;
  }
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    try {
      if (url.pathname.startsWith('/media/')) return await serveMedia(env, url.pathname.slice(7));
      if (url.pathname.startsWith('/api/')) return await api(request, env, url);
      return env.ASSETS.fetch(request);
    } catch (err) {
      console.error(err);
      return fail(500, 'Something went wrong. Please try again.');
    }
  },
};

async function api(request, env, url) {
  const method = request.method;
  const path = url.pathname.replace(/\/+$/, '');
  const parts = path.split('/').slice(2); // after /api

  // Block cross-site writes (SameSite cookies already help; this is a second layer).
  if (method !== 'GET') {
    const origin = request.headers.get('Origin');
    if (origin && origin !== url.origin) return fail(403, 'Cross-site request blocked');
  }

  if (path === '/api/login' && method === 'POST') return login(request, env, url);
  if (path === '/api/logout' && method === 'POST') {
    return json({ ok: true }, 200, { 'Set-Cookie': await destroySession(env, request, url) });
  }

  const user = await getSessionUser(env, request);
  if (!user) return fail(401, 'Please log in');

  const body = method === 'POST' || method === 'PUT' || method === 'PATCH' ? await readJson(request) : null;
  const [section, a, b] = parts;

  switch (section) {
    case 'me':
      return json({ user, siteUrl: env.SITE_URL || '' });
    case 'schema':
      return json({ settings: SETTINGS, collections: COLLECTIONS, icons: ICON_PATHS, statuses: APPOINTMENT_STATUSES });
    case 'dashboard':
      return dashboard(env);
    case 'settings':
      if (method === 'GET' && !a) return getSettings(env);
      if (method === 'PUT' && a) return saveSetting(env, a, body);
      break;
    case 'entries':
      if (!COLLECTIONS_BY_KEY[a]) return fail(404, 'Unknown section');
      if (method === 'GET' && !b) return listEntries(env, a);
      if (method === 'POST' && b === 'order') return reorder(env, a, body);
      if (method === 'POST' && !b) return saveEntry(env, a, null, body);
      if (method === 'GET' && b) return getEntry(env, a, b);
      if (method === 'PUT' && b) return saveEntry(env, a, b, body);
      if (method === 'DELETE' && b) return deleteEntry(env, a, b);
      break;
    case 'appointments':
      if (method === 'GET' && !a) return listAppointments(env, url);
      if (method === 'PATCH' && a) return updateAppointment(env, a, body);
      if (method === 'DELETE' && a) return deleteAppointment(env, a);
      break;
    case 'media':
      if (method === 'GET' && !a) return listMedia(env);
      if (method === 'POST' && !a) return uploadMedia(request, env);
      if (method === 'DELETE' && a) return deleteMedia(env, a);
      break;
    case 'password':
      if (method === 'POST') return changePassword(env, user, body, request, url);
      break;
  }
  return fail(404, 'Not found');
}

async function readJson(request) {
  if (!(request.headers.get('Content-Type') || '').includes('application/json')) return {};
  try {
    return (await request.json()) || {};
  } catch {
    return {};
  }
}

// ---------- Auth ----------

async function login(request, env, url) {
  const ip = request.headers.get('CF-Connecting-IP') || 'local';
  if (await tooManyAttempts(env, ip)) return fail(429, 'Too many attempts. Please wait 15 minutes and try again.');

  const { username, password } = await readJson(request);
  const user = await env.DB.prepare('SELECT id, username, password_hash FROM users WHERE username = ?')
    .bind(String(username || '').trim().toLowerCase())
    .first();
  const ok = user && (await verifyPassword(String(password || ''), user.password_hash));
  if (!ok) {
    await recordFailedAttempt(env, ip);
    return fail(401, 'Wrong username or password');
  }
  const setCookie = await createSession(env, user.id, url);
  return json({ user: { id: user.id, username: user.username } }, 200, { 'Set-Cookie': setCookie });
}

async function changePassword(env, user, body, request, url) {
  const current = String(body.current || '');
  const next = String(body.next || '');
  if (next.length < 10) return fail(400, 'New password must be at least 10 characters.');
  const row = await env.DB.prepare('SELECT password_hash FROM users WHERE id = ?').bind(user.id).first();
  if (!(await verifyPassword(current, row?.password_hash))) return fail(400, 'Current password is not correct.');
  await env.DB.batch([
    env.DB.prepare('UPDATE users SET password_hash = ? WHERE id = ?').bind(await hashPassword(next), user.id),
    env.DB.prepare('DELETE FROM sessions WHERE user_id = ?').bind(user.id),
  ]);
  // Old sessions are cleared; start a fresh one so the admin stays logged in.
  return json({ ok: true }, 200, { 'Set-Cookie': await createSession(env, user.id, url) });
}

// ---------- Validation ----------

function cleanValue(field, v) {
  switch (field.type) {
    case 'boolean':
      return v === true || v === 'true' || v === 1 || v === '1';
    case 'number': {
      if (v === '' || v == null) return null;
      const n = Number(v);
      return Number.isFinite(n) ? n : null;
    }
    case 'list':
      return (Array.isArray(v) ? v : String(v ?? '').split('\n'))
        .map((x) => String(x).trim())
        .filter(Boolean)
        .slice(0, 100);
    case 'repeater':
      return (Array.isArray(v) ? v : [])
        .slice(0, 50)
        .map((row) => Object.fromEntries(field.fields.map((f) => [f.name, cleanValue(f, row?.[f.name])])));
    default:
      return String(v ?? '').slice(0, field.type === 'markdown' ? 50000 : 5000);
  }
}

function cleanData(fields, input = {}) {
  const out = {};
  for (const f of fields) if (f.name && f.type !== 'heading') out[f.name] = cleanValue(f, input[f.name]);
  return out;
}

function missingRequired(fields, data) {
  const f = fields.find((x) => x.required && !String(data[x.name] ?? '').trim());
  return f ? `${f.label} is required.` : null;
}

// ---------- Settings ----------

async function getSettings(env) {
  const { results } = await env.DB.prepare('SELECT key, value FROM settings').all();
  const out = {};
  for (const r of results) out[r.key] = parse(r.value);
  return json(out);
}

async function saveSetting(env, key, body) {
  const def = SETTINGS_BY_KEY[key];
  if (!def) return fail(404, 'Unknown settings section');
  const data = cleanData(def.fields, body.data);
  const err = missingRequired(def.fields, data);
  if (err) return fail(400, err);
  await env.DB.prepare(
    `INSERT INTO settings (key, value, updated_at) VALUES (?, ?, datetime('now'))
     ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`,
  )
    .bind(key, JSON.stringify(data))
    .run();
  return json({ ok: true, data });
}

// ---------- Collections ----------

const entryRow = (r) => ({
  id: r.id,
  slug: r.slug,
  published: !!r.published,
  sort_order: r.sort_order,
  updated_at: r.updated_at,
  data: parse(r.data),
});

async function listEntries(env, collection) {
  const { results } = await env.DB.prepare(
    'SELECT id, slug, data, sort_order, published, updated_at FROM entries WHERE collection = ? ORDER BY sort_order, id',
  )
    .bind(collection)
    .all();
  return json(results.map(entryRow));
}

async function getEntry(env, collection, id) {
  const r = await env.DB.prepare('SELECT id, slug, data, sort_order, published, updated_at FROM entries WHERE collection = ? AND id = ?')
    .bind(collection, Number(id))
    .first();
  return r ? json(entryRow(r)) : fail(404, 'Not found');
}

async function uniqueSlug(env, collection, base, id) {
  const root = base || 'item';
  let slug = root;
  for (let n = 2; ; n++) {
    const clash = await env.DB.prepare('SELECT id FROM entries WHERE collection = ? AND slug = ? AND id != ?')
      .bind(collection, slug, id || 0)
      .first();
    if (!clash) return slug;
    slug = `${root}-${n}`;
  }
}

async function saveEntry(env, collection, id, body) {
  const def = COLLECTIONS_BY_KEY[collection];
  const data = cleanData(def.fields, body.data);
  const err = missingRequired(def.fields, data);
  if (err) return fail(400, err);

  let slug = null;
  if (def.fields.some((f) => f.name === 'slug')) {
    slug = await uniqueSlug(env, collection, slugify(data.slug || data[def.titleField]), id ? Number(id) : 0);
    data.slug = slug;
  }
  const published = body.published === false ? 0 : 1;

  if (id) {
    const res = await env.DB.prepare(
      `UPDATE entries SET data = ?, slug = ?, published = ?, updated_at = datetime('now') WHERE collection = ? AND id = ?`,
    )
      .bind(JSON.stringify(data), slug, published, collection, Number(id))
      .run();
    if (!res.meta.changes) return fail(404, 'Not found');
    return json({ ok: true, id: Number(id), slug });
  }

  const max = await env.DB.prepare('SELECT COALESCE(MAX(sort_order), 0) AS m FROM entries WHERE collection = ?').bind(collection).first();
  const res = await env.DB.prepare('INSERT INTO entries (collection, slug, data, sort_order, published) VALUES (?, ?, ?, ?, ?)')
    .bind(collection, slug, JSON.stringify(data), (max?.m || 0) + 1, published)
    .run();
  return json({ ok: true, id: res.meta.last_row_id, slug }, 201);
}

async function deleteEntry(env, collection, id) {
  await env.DB.prepare('DELETE FROM entries WHERE collection = ? AND id = ?').bind(collection, Number(id)).run();
  return json({ ok: true });
}

async function reorder(env, collection, body) {
  const ids = (Array.isArray(body.ids) ? body.ids : []).map(Number).filter(Number.isInteger);
  if (!ids.length) return fail(400, 'Nothing to reorder');
  await env.DB.batch(
    ids.map((id, i) => env.DB.prepare('UPDATE entries SET sort_order = ? WHERE collection = ? AND id = ?').bind(i + 1, collection, id)),
  );
  return json({ ok: true });
}

// ---------- Appointments ----------

async function listAppointments(env, url) {
  const status = url.searchParams.get('status') || '';
  const { results } = await env.DB.prepare(
    `SELECT id, name, phone, email, service, branch, preferred_date, preferred_time, message, status, notes, created_at
     FROM appointments WHERE (?1 = '' OR status = ?1) ORDER BY id DESC LIMIT 1000`,
  )
    .bind(status)
    .all();
  return json(results);
}

async function updateAppointment(env, id, body) {
  const sets = [];
  const vals = [];
  if (body.status !== undefined) {
    if (!APPOINTMENT_STATUSES.includes(body.status)) return fail(400, 'Unknown status');
    sets.push('status = ?');
    vals.push(body.status);
  }
  if (body.notes !== undefined) {
    sets.push('notes = ?');
    vals.push(String(body.notes).slice(0, 2000));
  }
  if (!sets.length) return fail(400, 'Nothing to update');
  await env.DB.prepare(`UPDATE appointments SET ${sets.join(', ')} WHERE id = ?`).bind(...vals, Number(id)).run();
  return json({ ok: true });
}

async function deleteAppointment(env, id) {
  await env.DB.prepare('DELETE FROM appointments WHERE id = ?').bind(Number(id)).run();
  return json({ ok: true });
}

// ---------- Dashboard ----------

async function dashboard(env) {
  const [byStatus, week, entries, latest, media] = await env.DB.batch([
    env.DB.prepare('SELECT status, COUNT(*) AS n FROM appointments GROUP BY status'),
    env.DB.prepare("SELECT COUNT(*) AS n FROM appointments WHERE created_at > datetime('now', '-7 days')"),
    env.DB.prepare('SELECT collection, COUNT(*) AS n FROM entries GROUP BY collection'),
    env.DB.prepare(
      'SELECT id, name, phone, service, preferred_date, preferred_time, status, created_at FROM appointments ORDER BY id DESC LIMIT 6',
    ),
    env.DB.prepare('SELECT COUNT(*) AS n FROM media'),
  ]);
  return json({
    appointments: Object.fromEntries(byStatus.results.map((r) => [r.status, r.n])),
    thisWeek: week.results[0]?.n || 0,
    entries: Object.fromEntries(entries.results.map((r) => [r.collection, r.n])),
    latest: latest.results,
    media: media.results[0]?.n || 0,
  });
}

// ---------- Media ----------

const IMAGE_TYPES = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp', 'image/gif': 'gif', 'image/avif': 'avif' };
const MAX_UPLOAD = 5 * 1024 * 1024;

async function listMedia(env) {
  const { results } = await env.DB.prepare('SELECT id, filename, content_type, size, created_at FROM media ORDER BY created_at DESC').all();
  return json(results.map((m) => ({ ...m, url: `/media/${m.id}` })));
}

async function uploadMedia(request, env) {
  let form;
  try {
    form = await request.formData();
  } catch {
    return fail(400, 'Upload failed');
  }
  const file = form.get('file');
  if (!file || typeof file === 'string') return fail(400, 'No file received');
  const ext = IMAGE_TYPES[file.type];
  if (!ext) return fail(400, 'Please upload a JPG, PNG, WebP, GIF or AVIF image.');
  if (file.size > MAX_UPLOAD) return fail(413, 'Image is larger than 5 MB. Please resize it and try again.');

  const id = `${crypto.randomUUID().replace(/-/g, '').slice(0, 20)}.${ext}`;
  await env.MEDIA.put(`media:${id}`, await file.arrayBuffer(), { metadata: { contentType: file.type } });
  await env.DB.prepare('INSERT INTO media (id, filename, content_type, size) VALUES (?, ?, ?, ?)')
    .bind(id, String(file.name || '').slice(0, 200), file.type, file.size)
    .run();
  return json({ ok: true, id, url: `/media/${id}` }, 201);
}

async function deleteMedia(env, id) {
  await env.MEDIA.delete(`media:${id}`);
  await env.DB.prepare('DELETE FROM media WHERE id = ?').bind(id).run();
  return json({ ok: true });
}

async function serveMedia(env, id) {
  if (!/^[a-z0-9-]+\.(png|jpe?g|webp|gif|avif)$/i.test(id)) return new Response('Not found', { status: 404 });
  const { value, metadata } = await env.MEDIA.getWithMetadata(`media:${id}`, { type: 'arrayBuffer' });
  if (!value) return new Response('Not found', { status: 404 });
  return new Response(value, {
    headers: {
      'Content-Type': metadata?.contentType || 'application/octet-stream',
      'Cache-Control': 'private, max-age=86400',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
