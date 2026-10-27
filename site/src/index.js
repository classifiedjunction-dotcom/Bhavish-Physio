// Public website worker: renders the clinic website from D1 content.
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
      if (request.method !== 'GET' && request.method !== 'HEAD') return json({ error: 'Method not allowed' }, 405);

      if (path === '/branches' || path.startsWith('/branches/')) {
        return Response.redirect(new URL('/contact', url), 301);
      }

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
    case 'blog':
      if (!c.posts.length) return null;
      if (!slug) return pages.blogPage(ctx);
      return find(c.posts) ? pages.postPage(ctx, find(c.posts)) : null;
    case 'contact':
      return slug ? null : pages.contactPage(ctx);
    default:
      return null;
  }
}

// ---------- Media ----------

// ---------- SEO ----------

function robots({ s, origin }) {
  const body = s.seo.noindex
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${origin}/sitemap.xml\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain' } });
}

function sitemap({ c, origin }) {
  const paths = ['/', '/about', '/services', '/conditions', '/team', '/contact'];
  if (c.posts.length) paths.push('/blog');
  for (const x of c.services) paths.push(`/services/${x.slug}`);
  for (const x of c.conditions) paths.push(`/conditions/${x.slug}`);
  for (const x of c.posts) paths.push(`/blog/${x.slug}`);
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
