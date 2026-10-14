// Public website worker: renders pages from D1 content, accepts booking requests,
// and serves images uploaded through the admin portal.
import { loadContent } from './content.js';
import { layout } from './views/layout.js';
import { homePage } from './views/home.js';
import * as pages from './views/pages.js';
import { plainText } from './lib/markdown.js';

const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'SAMEORIGIN',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};

const htmlResponse = (body, status = 200) =>
  new Response(String(body), {
    status,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache', ...SECURITY_HEADERS },
  });

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json', ...SECURITY_HEADERS } });

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    try {
      if (path === '/api/appointments') {
        if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
        return await createAppointment(request, env, url);
      }
      if (path.startsWith('/media/')) return await serveMedia(request, env, path.slice(7));
      if (request.method !== 'GET' && request.method !== 'HEAD') return json({ error: 'Method not allowed' }, 405);

      const content = await loadContent(env);
      const ctx = { ...content, origin: url.origin };

      if (path === '/robots.txt') return robots(ctx);
      if (path === '/sitemap.xml') return sitemap(ctx);

      const page = route(ctx, path, url);
      const status = page ? 200 : 404;
      const p = page || pages.notFoundPage(ctx);
      const doc = layout(ctx, {
        ...p,
        description: plainText(p.description),
        path: status === 404 ? '/404' : path,
        jsonLd: path === '/' ? clinicJsonLd(ctx) : null,
      });
      return htmlResponse(doc, status);
    } catch (err) {
      console.error(err);
      return new Response('Sorry, something went wrong. Please try again shortly.', {
        status: 500,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      });
    }
  },
};

function route(ctx, path, url) {
  const { s, c } = ctx;
  const [, section, slug, extra] = path.split('/');
  if (extra) return null;
  const find = (list) => list.find((x) => x.slug === slug);

  if (path === '/') return { body: homePage(ctx), description: s.seo.metaDescription };
  switch (section) {
    case 'about':
      return slug ? null : pages.aboutPage(ctx);
    case 'services':
      if (!slug) return pages.servicesPage(ctx);
      return find(c.services) ? pages.servicePage(ctx, find(c.services)) : null;
    case 'conditions':
      if (!slug) return pages.conditionsPage(ctx);
      return find(c.conditions) ? pages.conditionPage(ctx, find(c.conditions)) : null;
    case 'team':
      return slug ? null : pages.teamPage(ctx);
    case 'gallery':
      return slug ? null : pages.galleryPage(ctx);
    case 'blog':
      if (!slug) return pages.blogPage(ctx);
      return find(c.posts) ? pages.postPage(ctx, find(c.posts)) : null;
    case 'branches':
      if (!slug) return c.branches.length ? pages.branchesPage(ctx) : null;
      return find(c.branches) ? pages.branchPage(ctx, find(c.branches)) : null;
    case 'contact':
    case 'book':
      return slug ? null : pages.contactPage(ctx, { booked: url.searchParams.get('booked') === '1' });
    default:
      return null;
  }
}

// ---------- Booking requests ----------

const clean = (v, max) =>
  String(v ?? '')
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, '')
    .trim()
    .slice(0, max);

async function createAppointment(request, env, url) {
  const type = request.headers.get('Content-Type') || '';
  const isJson = type.includes('application/json');
  let input = {};
  try {
    input = isJson ? await request.json() : Object.fromEntries(await request.formData());
  } catch {
    return json({ error: 'Invalid request' }, 400);
  }

  const reply = (status, data) => {
    if (isJson) return json(data, status);
    if (status === 200) return Response.redirect(`${url.origin}/contact?booked=1#book`, 303);
    return htmlResponse(`<p>${data.error}</p><p><a href="/contact#book">Go back</a></p>`, status);
  };

  // Bots fill the hidden "website" field; pretend success.
  if (clean(input.website, 200)) return reply(200, { ok: true });

  const a = {
    name: clean(input.name, 80),
    phone: clean(input.phone, 20),
    email: clean(input.email, 120),
    service: clean(input.service, 80),
    branch: clean(input.branch, 80),
    date: clean(input.date, 10),
    time: clean(input.time, 20),
    message: clean(input.message, 1000),
  };

  const phoneDigits = a.phone.replace(/\D/g, '');
  if (a.name.length < 2) return reply(400, { error: 'Please enter your name.' });
  if (phoneDigits.length < 8 || phoneDigits.length > 15) return reply(400, { error: 'Please enter a valid phone number.' });
  if (a.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a.email)) return reply(400, { error: 'Please enter a valid email address.' });
  if (a.date && !/^\d{4}-\d{2}-\d{2}$/.test(a.date)) a.date = '';

  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const recent = await env.DB.prepare(
    "SELECT COUNT(*) AS n FROM appointments WHERE ip = ? AND created_at > datetime('now', '-1 hour')",
  )
    .bind(ip)
    .first();
  if (recent && recent.n >= 5) {
    return reply(429, { error: 'Too many requests. Please call or WhatsApp us instead.' });
  }

  await env.DB.prepare(
    `INSERT INTO appointments (name, phone, email, service, branch, preferred_date, preferred_time, message, ip)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(a.name, a.phone, a.email || null, a.service || null, a.branch || null, a.date || null, a.time || null, a.message || null, ip)
    .run();

  return reply(200, { ok: true });
}

// ---------- Media ----------

async function serveMedia(request, env, id) {
  if (!/^[a-z0-9-]+\.(png|jpe?g|webp|gif|avif)$/i.test(id)) return new Response('Not found', { status: 404 });

  const cache = caches.default;
  const cached = await cache.match(request);
  if (cached) return cached;

  const { value, metadata } = await env.MEDIA.getWithMetadata(`media:${id}`, { type: 'arrayBuffer' });
  if (!value) return new Response('Not found', { status: 404 });

  const res = new Response(value, {
    headers: {
      'Content-Type': metadata?.contentType || 'application/octet-stream',
      'Cache-Control': 'public, max-age=31536000, immutable',
      'X-Content-Type-Options': 'nosniff',
    },
  });
  await cache.put(request, res.clone());
  return res;
}

// ---------- SEO ----------

function robots({ s, origin }) {
  const body = s.seo.noindex
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${origin}/sitemap.xml\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain' } });
}

function sitemap({ c, origin }) {
  const paths = ['/', '/about', '/services', '/conditions', '/team', '/gallery', '/blog', '/contact'];
  if (c.branches.length) paths.push('/branches');
  for (const x of c.services) paths.push(`/services/${x.slug}`);
  for (const x of c.conditions) paths.push(`/conditions/${x.slug}`);
  for (const x of c.posts) paths.push(`/blog/${x.slug}`);
  for (const x of c.branches) paths.push(`/branches/${x.slug}`);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths
    .map((p) => `  <url><loc>${origin}${encodeURI(p)}</loc></url>`)
    .join('\n')}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}

function clinicJsonLd({ s, c, origin }) {
  const ct = s.contact;
  return {
    '@context': 'https://schema.org',
    '@type': 'Physiotherapy',
    name: s.clinic.name,
    description: s.seo.metaDescription,
    url: origin,
    telephone: ct.phone,
    email: ct.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: String(ct.address || '').replace(/\n/g, ', '),
      addressLocality: ct.city,
      addressCountry: 'IN',
    },
    openingHours: (ct.hours || []).map((h) => `${h.days} ${h.time}`),
    medicalSpecialty: 'Physiotherapy',
    availableService: c.services.map((x) => ({ '@type': 'MedicalTherapy', name: x.title })),
  };
}
