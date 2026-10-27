import { html, raw, safeUrl, escape } from '../lib/html.js';
import { icon, telHref, waHref, isOn } from './ui.js';

const HEX = /^#[0-9a-f]{3,8}$/i;
const color = (v, fallback) => (HEX.test(String(v || '')) ? v : fallback);

function themeStyle(theme) {
  return `:root{--primary:${color(theme.primary, '#0a2558')};--accent:${color(theme.accent, '#2cc5b4')};--bg:${color(theme.background, '#f3f7fc')}}`;
}

function brand(clinic, cls = 'brand') {
  const name = clinic.name || 'Clinic';
  const logo = safeUrl(clinic.logo);
  if (logo) return html`<a class="${cls}" href="/" aria-label="${name} home"><img class="brand-logo" src="${logo}" alt="${name}"></a>`;
  const [first, ...rest] = name.split(' ');
  return html`<a class="${cls}" href="/" aria-label="${name} home">
    <span class="brand-mark">${icon('activity')}</span>
    <span class="brand-text"><strong>${first}</strong>${rest.length ? html`<small>${rest.join(' ')}</small>` : ''}</span>
  </a>`;
}

function navigation({ s, c }, path) {
  const active = (prefix) => (prefix === '/' ? path === '/' : path === prefix || path.startsWith(prefix + '/')) ? 'active' : '';
  const aboutActive = ['/about', '/team'].some((p) => active(p)) ? 'active' : '';
  const sub = (label, items) =>
    html`<button class="sub-toggle" type="button" aria-expanded="false" aria-label="Show ${label} menu">${icon('down')}</button>
      <div class="sub">${items}</div>`;

  return html`<ul class="nav-list">
    <li><a class="${active('/')}" href="/">Home</a></li>
    <li class="has-sub">
      <a class="${aboutActive}" href="/about">About ${icon('down', 'icon caret')}</a>
      ${sub('About', html`<a href="/about">About us</a><a href="/team">Dr. Sudha</a>`)}
    </li>
    <li class="has-sub">
      <a class="${active('/services')}" href="/services">Services ${icon('down', 'icon caret')}</a>
      ${sub('Services', c.services.map((x) => html`<a href="/services/${x.slug}">${x.title}</a>`))}
    </li>
    <li class="has-sub wide">
      <a class="${active('/conditions')}" href="/conditions">Conditions ${icon('down', 'icon caret')}</a>
      ${sub('Conditions', c.conditions.map((x) => html`<a href="/conditions/${x.slug}">${x.title}</a>`))}
    </li>
    ${c.posts.length ? html`<li><a class="${active('/blog')}" href="/blog">Articles</a></li>` : ''}
    <li><a class="${active('/contact')}" href="/contact">Contact</a></li>
  </ul>`;
}

function socialLinks(social) {
  const items = [
    ['facebook', 'Facebook'],
    ['instagram', 'Instagram'],
    ['youtube', 'YouTube'],
    ['x', 'X'],
    ['linkedin', 'LinkedIn'],
    ['googleReviews', 'Google reviews'],
  ].filter(([k]) => safeUrl(social[k]));
  if (!items.length) return '';
  return html`<div class="social">${items.map(
    ([k, label]) => html`<a href="${safeUrl(social[k])}" target="_blank" rel="noopener" aria-label="${label}">${icon(k === 'googleReviews' ? 'google' : k)}</a>`,
  )}</div>`;
}

function footer({ s, c }) {
  const { clinic, contact: ct, footer: ft } = s;
  const year = new Date().getUTCFullYear();
  return html`<footer class="site-footer">
    <div class="wrap footer-grid">
      <div class="footer-about">
        ${brand(clinic, 'brand light')}
        <p>${ft.about || clinic.tagline}</p>
        ${socialLinks(s.social)}
      </div>
      <div>
        <h3>Quick links</h3>
        <ul>
          <li><a href="/about">About us</a></li>
          <li><a href="/team">Dr. Sudha</a></li>
          ${c.posts.length ? html`<li><a href="/blog">Articles</a></li>` : ''}
          <li><a href="/contact">Contact</a></li>
        </ul>
      </div>
      <div>
        <h3>Services</h3>
        <ul>${c.services.slice(0, 7).map((x) => html`<li><a href="/services/${x.slug}">${x.title}</a></li>`)}</ul>
      </div>
      <div>
        <h3>Get in touch</h3>
        <ul class="footer-contact">
          ${ct.address ? html`<li>${icon('pin')}<span>${raw(escape(ct.address).replace(/\n/g, '<br>'))}</span></li>` : ''}
          ${ct.phone ? html`<li>${icon('phone')}<a href="${telHref(ct.phone)}">${ct.phone}</a></li>` : ''}
          ${ct.whatsapp ? html`<li>${icon('whatsapp')}<a href="${waHref(ct.whatsapp)}" target="_blank" rel="noopener">WhatsApp the clinic</a></li>` : ''}
          ${(ct.hours || []).map((h) => html`<li>${icon('clock')}<span>${h.days}: ${h.time}</span></li>`)}
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="wrap">
        <span>© ${year} ${ft.copyright || clinic.name}</span>
        <span>Built by DigiBillMate</span>
        ${clinic.registration ? html`<span>${clinic.registration}</span>` : ''}
      </div>
    </div>
  </footer>`;
}

export function layout(ctx, { title, description, body, image, jsonLd, path = '/', status = 200 }) {
  const { s, c, origin } = ctx;
  const { clinic, contact: ct, seo } = s;
  const siteName = clinic.name || 'Clinic';
  const pageTitle = title ? `${title} | ${siteName}` : seo.metaTitle || siteName;
  const desc = description || seo.metaDescription || clinic.tagline || '';
  const ogImage = safeUrl(image || seo.ogImage);
  const absolute = (u) => (u.startsWith('/') ? origin + u : u);
  const wa = ct.whatsapp ? waHref(ct.whatsapp, `Hi ${siteName}, I would like to ask about physiotherapy services.`) : '';

  return html`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script>document.documentElement.classList.add('js')</script>
<title>${pageTitle}</title>
<meta name="description" content="${desc}">
${isOn(seo.noindex) ? raw('<meta name="robots" content="noindex, nofollow">') : ''}
<link rel="canonical" href="${origin + path}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${siteName}">
<meta property="og:title" content="${pageTitle}">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="${origin + path}">
${ogImage ? html`<meta property="og:image" content="${absolute(ogImage)}">` : ''}
<meta name="theme-color" content="${color(s.theme.primary, '#0a2558')}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="/css/site.css?v=17">
<style>${raw(themeStyle(s.theme))}</style>
${jsonLd ? raw(`<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`) : ''}
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
<div class="topbar">
  <div class="wrap topbar-inner">
    <div class="topbar-info">
      ${ct.hours?.[0] ? html`<span>${icon('clock')} ${ct.hours[0].days}: ${ct.hours[0].time}</span>` : ''}
    </div>
    ${socialLinks(s.social)}
  </div>
</div>
<header class="site-header" id="top">
  <div class="wrap nav-wrap">
    ${brand(clinic)}
    <nav class="nav" id="site-nav" aria-label="Main">
      ${navigation(ctx, path)}
      <div class="nav-mobile-cta">
        ${ct.phone ? html`<a class="btn btn-accent btn-block" href="${telHref(ct.phone)}">${icon('phone')} Call the clinic</a>` : ''}
        ${wa ? html`<a class="btn btn-wa btn-block" href="${wa}" target="_blank" rel="noopener">${icon('whatsapp')} WhatsApp</a>` : ''}
      </div>
    </nav>
    <div class="header-actions">
      ${ct.phone ? html`<a class="header-phone" href="${telHref(ct.phone)}"><span class="icon-chip xs">${icon('phone')}</span><span><small>Call us</small>${ct.phone}</span></a>` : ''}
      ${wa ? html`<a class="btn btn-accent header-book" href="${wa}" target="_blank" rel="noopener">${icon('whatsapp')} WhatsApp</a>` : ''}
      <button class="nav-toggle" type="button" aria-controls="site-nav" aria-expanded="false" aria-label="Open menu">${icon('menu', 'icon i-open')}${icon('close', 'icon i-close')}</button>
    </div>
  </div>
</header>
<main id="main">
${body}
</main>
${footer(ctx)}
${wa ? html`<div class="floating"><a class="fab fab-wa" href="${wa}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">${icon('whatsapp')}<span>Chat with us</span></a></div>` : ''}
<nav class="mobile-bar" aria-label="Quick actions">
  ${wa || ct.phone
    ? html`<div class="mb-row">
        ${wa ? html`<a class="mb-btn mb-wa" href="${wa}" target="_blank" rel="noopener">${icon('whatsapp')} WhatsApp</a>` : ''}
        ${ct.phone ? html`<a class="mb-btn mb-call" href="${telHref(ct.phone)}">${icon('phone')} Call Now</a>` : ''}
      </div>`
    : ''}
</nav>
<script src="/js/site.js?v=3" defer></script>
</body>
</html>`;
}
