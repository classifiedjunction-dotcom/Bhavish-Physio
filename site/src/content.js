import { SETTINGS, COLLECTIONS } from '../../shared/schema.js';

const parse = (text) => {
  try {
    return JSON.parse(text) || {};
  } catch {
    return {};
  }
};

// Loads every setting and every published entry in two queries.
// The whole site is small, so one round trip per page keeps things simple and fast.
export async function loadContent(env) {
  const [settingsRes, entriesRes] = await env.DB.batch([
    env.DB.prepare('SELECT key, value FROM settings'),
    env.DB.prepare('SELECT id, collection, slug, data FROM entries WHERE published = 1 ORDER BY sort_order, id'),
  ]);

  const s = {};
  for (const { key } of SETTINGS) s[key] = {};
  for (const row of settingsRes.results) s[row.key] = parse(row.value);

  const c = {};
  for (const { key } of COLLECTIONS) c[key] = [];
  for (const row of entriesRes.results) {
    (c[row.collection] ||= []).push({ ...parse(row.data), id: row.id, slug: row.slug });
  }
  return { s, c };
}
