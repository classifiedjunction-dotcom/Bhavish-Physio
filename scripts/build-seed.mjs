// Builds db/seed.sql from db/seed-data.js.
// WARNING: the generated SQL deletes all existing settings and content entries before inserting.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { settings, collections } from '../db/seed-data.js';
import { COLLECTIONS_BY_KEY, slugify } from '../shared/schema.js';

const q = (v) => `'${String(v).replace(/'/g, "''")}'`;
const lines = ['DELETE FROM settings;', 'DELETE FROM entries;'];

for (const [key, value] of Object.entries(settings)) {
  lines.push(`INSERT INTO settings (key, value) VALUES (${q(key)}, ${q(JSON.stringify(value))});`);
}

for (const [collection, items] of Object.entries(collections)) {
  const def = COLLECTIONS_BY_KEY[collection];
  if (!def) throw new Error(`Unknown collection: ${collection}`);
  const hasSlug = def.fields.some((f) => f.name === 'slug');
  items.forEach((item, i) => {
    const data = { ...item };
    let slug = null;
    if (hasSlug) {
      slug = data.slug || slugify(data[def.titleField]);
      data.slug = slug;
    }
    lines.push(
      `INSERT INTO entries (collection, slug, data, sort_order, published) VALUES (${q(collection)}, ${slug ? q(slug) : 'NULL'}, ${q(JSON.stringify(data))}, ${i + 1}, 1);`,
    );
  });
}

const out = fileURLToPath(new URL('../db/seed.sql', import.meta.url));
writeFileSync(out, lines.join('\n') + '\n');
console.log(`Wrote ${lines.length} statements to db/seed.sql`);
