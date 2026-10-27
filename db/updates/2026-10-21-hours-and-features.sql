-- Keep the clinic schedule consistent and complete the six-card About section.
UPDATE settings
SET value = json_set(value, '$.hours', json('[{"days":"Monday – Saturday","time":"9:00 AM – 10:00 PM"}]')),
    updated_at = datetime('now')
WHERE key = 'contact';

UPDATE settings
SET value = json_set(value, '$.items[3].value', 'Mon–Sat', '$.items[3].label', 'Clinic hours'),
    updated_at = datetime('now')
WHERE key = 'stats';

UPDATE entries
SET data = json_set(data, '$.hours', 'Mon–Sat 9:00 AM – 10:00 PM'),
    updated_at = datetime('now')
WHERE collection = 'branches';

UPDATE entries
SET data = json_set(data, '$.title', 'Clinic hours', '$.text', 'Call or WhatsApp to confirm current clinic hours and availability.'),
    updated_at = datetime('now')
WHERE collection = 'features' AND json_extract(data, '$.title') = 'Open all week';

INSERT INTO entries (collection, slug, data, sort_order, published)
VALUES ('features', NULL, '{"title":"Professional membership","icon":"users","text":"Dr. Sudha''s profile lists membership in the Indian Association of Physiotherapist."}', 5, 1);

INSERT INTO entries (collection, slug, data, sort_order, published)
VALUES ('features', NULL, '{"title":"Treatment modalities","icon":"activity","text":"The profile lists manual therapy, TENS and computerised traction among treatment options."}', 6, 1);

UPDATE entries
SET data = json_set(data, '$.answer', 'The clinic page lists Monday–Saturday, 9:00 AM–10:00 PM. Call or WhatsApp to confirm current timings before visiting.'),
    updated_at = datetime('now')
WHERE collection = 'faqs' AND json_extract(data, '$.question') = 'What are the clinic timings?';
