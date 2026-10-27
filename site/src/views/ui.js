// Shared building blocks for website pages.
import { html, raw, safeUrl, escape } from '../lib/html.js';
import { iconSvg } from '../../../shared/icons.js';

export const icon = (name, cls) => raw(iconSvg(name, cls));

export const digits = (v) => String(v ?? '').replace(/[^\d+]/g, '');
export const telHref = (phone) => `tel:${digits(phone)}`;
export const waHref = (number, text = '') =>
  `https://wa.me/${String(number ?? '').replace(/\D/g, '')}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

export const isOn = (v) => v === true || v === 'true' || v === 1 || v === '1';

// Image if one is set, otherwise a soft gradient tile with an icon.
export function visual(src, iconName, alt = '', variant = 0, cls = '') {
  const url = safeUrl(src);
  if (url) return html`<img class="visual ${cls}" src="${url}" alt="${alt}" loading="lazy" decoding="async">`;
  return html`<div class="visual ph ph-${Math.abs(Number(variant) || 0) % 4} ${cls}" role="img" aria-label="${alt}">${icon(iconName || 'sparkles', 'ph-icon')}</div>`;
}

export function initials(name) {
  return String(name ?? '')
    .replace(/^(dr|mr|mrs|ms)\.?\s+/i, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}

export function avatar(photo, name, variant = 0, cls = 'avatar') {
  const url = safeUrl(photo);
  if (url) return html`<img class="${cls}" src="${url}" alt="${name}" loading="lazy">`;
  return html`<span class="${cls} avatar-doctor ph-${Math.abs(Number(variant) || 0) % 4}" role="img" aria-label="Generic doctor illustration">
    <svg viewBox="0 0 160 160" aria-hidden="true" focusable="false">
      <circle cx="80" cy="80" r="66" fill="rgba(255,255,255,.48)"/>
      <path d="M54 39h52l11 18 20 13v48H23V70l20-13 11-18Z" fill="#fff" stroke="#0a2558" stroke-width="4" stroke-linejoin="round"/>
      <path d="m54 40 26 27 26-27M68 54l12 13 12-13" fill="none" stroke="#0a2558" stroke-width="4" stroke-linejoin="round"/>
      <path d="M63 56v13c0 24 34 24 34 0V56" fill="none" stroke="#2bbdaf" stroke-width="5" stroke-linecap="round"/>
      <circle cx="97" cy="76" r="6" fill="#2bbdaf" stroke="#0a2558" stroke-width="3"/>
      <rect x="36" y="83" width="25" height="25" rx="7" fill="#e5fbf8" stroke="#2bbdaf" stroke-width="2"/>
      <path d="M48.5 89v13m-6.5-6.5h13" stroke="#0a2558" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M72 96h29" stroke="#d5e2ea" stroke-width="4" stroke-linecap="round"/>
    </svg>
  </span>`;
}

export function stars(n = 5) {
  const count = Math.max(0, Math.min(5, Math.round(Number(n) || 5)));
  return html`<span class="stars" aria-label="${count} out of 5 stars">${Array.from({ length: 5 }, (_, i) =>
    icon('star', i < count ? 'icon on' : 'icon'),
  )}</span>`;
}

// Eyebrow + title + intro for a section, read from the "sections" settings.
export function sectionHead(sections, key, { center = true, light = false, tag = 'h2' } = {}) {
  const eyebrow = sections[`${key}Eyebrow`];
  const title = sections[`${key}Title`];
  const intro = sections[`${key}Intro`];
  return html`<div class="section-head ${center ? 'center' : ''} ${light ? 'light' : ''}">
    ${eyebrow ? html`<span class="eyebrow">${eyebrow}</span>` : ''}
    ${title ? raw(`<${tag}>${escape(title)}</${tag}>`) : ''}
    ${intro ? html`<p>${intro}</p>` : ''}
  </div>`;
}

export function pageHero(title, crumbs = [], intro = '') {
  return html`<section class="page-hero">
    <div class="wrap">
      <nav class="crumbs" aria-label="Breadcrumb">
        <a href="/">Home</a>
        ${crumbs.map(([label, href]) => html`<span aria-hidden="true">/</span>${href ? html`<a href="${href}">${label}</a>` : html`<span>${label}</span>`}`)}
      </nav>
      <h1>${title}</h1>
      ${intro ? html`<p>${intro}</p>` : ''}
    </div>
  </section>`;
}

export function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
}

export function serviceCard(svc, i) {
  return html`<article class="card service-card reveal">
    <span class="icon-chip">${icon(svc.icon || 'sparkles')}</span>
    <h3><a href="/services/${svc.slug}">${svc.title}</a></h3>
    <p>${svc.summary}</p>
    ${svc.features?.length ? html`<ul class="tags">${svc.features.slice(0, 4).map((f) => html`<li>${f}</li>`)}</ul>` : ''}
    <a class="link-arrow" href="/services/${svc.slug}" aria-label="Learn more about ${svc.title}">Learn more ${icon('arrow')}</a>
  </article>`;
}

export function conditionCard(cond) {
  return html`<a class="condition-card reveal" href="/conditions/${cond.slug}">
    <span class="icon-chip sm">${icon(cond.icon || 'sparkles')}</span>
    <span><strong>${cond.title}</strong><small>${cond.short}</small></span>
  </a>`;
}

export function teamCard(m, i) {
  return html`<article class="card team-card reveal">
    ${avatar(m.photo, m.name, i, 'team-photo')}
    <div class="team-body">
      <h3>${m.name}</h3>
      <p class="role">${m.role}</p>
      ${m.specialty ? html`<p class="muted">${m.specialty}</p>` : ''}
      <div class="team-meta">
        ${m.experience ? html`<span class="pill">${m.experience}</span>` : ''}
        ${m.qualifications ? html`<span class="pill soft">${m.qualifications}</span>` : ''}
      </div>
    </div>
  </article>`;
}

export function postCard(p, i) {
  return html`<article class="card post-card reveal">
    <a class="post-cover" href="/blog/${p.slug}" tabindex="-1" aria-hidden="true">${visual(p.cover, 'clipboard', '', i + 1)}</a>
    <div class="post-body">
      <p class="post-meta">${p.category ? html`<span class="pill soft">${p.category}</span>` : ''}<span>${formatDate(p.date)}</span></p>
      <h3><a href="/blog/${p.slug}">${p.title}</a></h3>
      <p>${p.excerpt}</p>
      <a class="link-arrow" href="/blog/${p.slug}">Read article ${icon('arrow')}</a>
    </div>
  </article>`;
}

export function testimonialCard(t) {
  return html`<figure class="card testimonial">
    <div class="testimonial-top">${stars(t.rating)}${icon('quote', 'quote-mark')}</div>
    <blockquote>${t.text}</blockquote>
    <figcaption>
      <span class="avatar-initials sm ph-${(t.id || 0) % 4}" aria-hidden="true">${initials(t.name)}</span>
      <span><strong>${t.name}</strong><small>${[t.condition, t.when].filter(Boolean).join(' · ')}</small></span>
    </figcaption>
  </figure>`;
}

export function faqList(faqs) {
  return html`<div class="faq-list">
    ${faqs.map(
      (f, i) => html`<details class="faq" ${i === 0 ? raw('open') : ''}>
        <summary>${f.question}${icon('down', 'faq-chevron')}</summary>
        <div class="faq-answer"><p>${f.answer}</p></div>
      </details>`,
    )}
  </div>`;
}

export function contactList({ s }, { light = false } = {}) {
  const ct = s.contact;
  return html`<ul class="contact-list ${light ? 'light' : ''}">
    ${ct.address ? html`<li>${icon('pin')}<div><strong>Address</strong><span>${raw(escape(ct.address).replace(/\n/g, '<br>'))}</span></div></li>` : ''}
    ${ct.phone ? html`<li>${icon('phone')}<div><strong>Phone</strong><a href="${telHref(ct.phone)}">${ct.phone}</a></div></li>` : ''}
    ${ct.email ? html`<li>${icon('mail')}<div><strong>Email</strong><a href="mailto:${ct.email}">${ct.email}</a></div></li>` : ''}
    ${ct.hours?.length
      ? html`<li>${icon('clock')}<div><strong>Opening hours</strong>${ct.hours.map((h) => html`<span class="hours-row"><span>${h.days}</span><span>${h.time}</span></span>`)}</div></li>`
      : ''}
  </ul>`;
}

export function ctaBand({ s }) {
  const ct = s.contact;
  return html`<section class="cta-band">
    <div class="wrap cta-inner">
      <div>
        <h2>Need help choosing a service?</h2>
        <p>Call or WhatsApp the clinic to ask about physiotherapy and availability.</p>
      </div>
      <div class="cta-actions">
        ${ct.phone ? html`<a class="btn btn-accent btn-lg" href="${telHref(ct.phone)}">${icon('phone')} Call the clinic</a>` : ''}
        ${ct.whatsapp ? html`<a class="btn btn-ghost-light btn-lg" href="${waHref(ct.whatsapp)}" target="_blank" rel="noopener">${icon('whatsapp')} WhatsApp</a>` : ''}
      </div>
    </div>
  </section>`;
}
