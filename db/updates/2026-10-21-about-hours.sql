UPDATE settings
SET value = json_set(value, '$.points[4]', 'Call or WhatsApp to confirm current clinic hours'),
    updated_at = datetime('now')
WHERE key = 'about';

UPDATE settings
SET value = json_set(value, '$.practoProfile', 'https://www.practo.com/chennai/doctor/sudha-18-physiotherapist/recommended?practice_id=1238501&referrer=establishment_profile'),
    updated_at = datetime('now')
WHERE key = 'social';

UPDATE settings
SET value = json_set(value, '$.testimonialsEyebrow', 'Practo stories', '$.testimonialsTitle', '125 patient stories', '$.testimonialsIntro', 'Practo currently shows a 98% recommendation from 125 patients.'),
    updated_at = datetime('now')
WHERE key = 'sections';
