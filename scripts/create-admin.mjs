// Creates (or resets) the admin portal login.
// Usage: node scripts/create-admin.mjs [username] [label]
// Writes db/admin-user.local.sql (to run with wrangler) and admin-credentials[-label].local.txt.
// Both files are git-ignored. The password hash format matches admin/src/auth.js.
import { pbkdf2Sync, randomBytes } from 'node:crypto';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const ITERATIONS = 20000; // Kept modest so login fits the Workers free-plan CPU limit.
const username = (process.argv[2] || 'admin').toLowerCase();
const label = process.argv[3] ? `-${process.argv[3]}` : '';
if (!/^[a-z0-9._-]{3,40}$/.test(username)) throw new Error('Username: 3-40 letters, numbers, dots, dashes or underscores');
const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';
const password = Array.from(randomBytes(16), (b) => alphabet[b % alphabet.length]).join('');

const salt = randomBytes(16);
const hash = pbkdf2Sync(password, salt, ITERATIONS, 32, 'sha256');
const stored = `pbkdf2$${ITERATIONS}$${salt.toString('base64')}$${hash.toString('base64')}`;

const sql = [
  `INSERT INTO users (username, password_hash) VALUES ('${username}', '${stored}')`,
  `  ON CONFLICT(username) DO UPDATE SET password_hash = excluded.password_hash;`,
  `DELETE FROM sessions;`,
].join('\n');

const root = (p) => fileURLToPath(new URL(`../${p}`, import.meta.url));
writeFileSync(root('db/admin-user.local.sql'), sql + '\n');
const credsFile = `admin-credentials${label}.local.txt`;
writeFileSync(
  root(credsFile),
  `Admin portal login\n\nUsername: ${username}\nPassword: ${password}\n\nChange this password from the admin portal (Account page) after first login.\nThis file is not committed to git. Delete it once the password is stored safely.\n`,
);
console.log(`Admin login for "${username}" written to ${credsFile}`);
