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
  return html`<span class="${cls} avatar-initials ph-${Math.abs(Number(variant) || 0) % 4}" aria-hidden="true">${initials(name)}</span>`;
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

export function bookingForm({ s, c }, { compact = false, id = '' } = {}) {
  const services = s.booking.services?.length ? s.booking.services : c.services.map((x) => x.title);
  const slots = s.booking.timeSlots || [];
  const branches = c.branches || [];
  const success = s.booking.successMessage || 'Thank you! We will call you shortly to confirm.';

  if (compact) {
    return html`<form class="booking-form compact" data-booking data-success="${success}" action="/api/appointments" method="post" ${id ? raw(`id="${escape(id)}"`) : ''}>
      <label class="field"><span>Your name</span><input name="name" required maxlength="80" autocomplete="name" placeholder="Full name"></label>
      <label class="field"><span>Phone number</span><input name="phone" type="tel" required maxlength="20" autocomplete="tel" placeholder="10-digit mobile"></label>
      <label class="field"><span>What do you need help with?</span>
        <select name="service">${services.map((o) => html`<option>${o}</option>`)}</select>
      </label>
      <input class="hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
      <button class="btn btn-accent btn-block" type="submit">Request a call back ${icon('arrow')}</button>
      <p class="form-status" role="status" aria-live="polite"></p>
    </form>`;
  }

  return html`<form class="booking-form" data-booking data-success="${success}" action="/api/appointments" method="post" ${id ? raw(`id="${escape(id)}"`) : ''}>
    <div class="form-grid">
      <label class="field"><span>Full name *</span><input name="name" required maxlength="80" autocomplete="name"></label>
      <label class="field"><span>Phone number *</span><input name="phone" type="tel" required maxlength="20" autocomplete="tel"></label>
      <label class="field"><span>Email <em>(optional)</em></span><input name="email" type="email" maxlength="120" autocomplete="email"></label>
      <label class="field"><span>Service</span><select name="service">${services.map((o) => html`<option>${o}</option>`)}</select></label>
      <label class="field"><span>Preferred date</span><input name="date" type="date" data-min-today></label>
      <label class="field"><span>Preferred time</span><select name="time"><option value="">Any time</option>${slots.map((o) => html`<option>${o}</option>`)}</select></label>
      ${branches.length > 1
        ? html`<label class="field full"><span>Branch</span><select name="branch">${branches.map((b) => html`<option>${b.name}</option>`)}</select></label>`
        : ''}
      <label class="field full"><span>Describe your problem <em>(optional)</em></span><textarea name="message" rows="3" maxlength="1000"></textarea></label>
    </div>
    <input class="hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
    <button class="btn btn-accent btn-block btn-lg" type="submit">Send appointment request ${icon('arrow')}</button>
    <p class="form-status" role="status" aria-live="polite"></p>
  </form>`;
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
        <h2>Ready to start feeling better?</h2>
        <p>Book an assessment with one of our physiotherapists today.</p>
      </div>
      <div class="cta-actions">
        <a class="btn btn-accent btn-lg" href="/contact#book">${s.hero.primaryLabel || 'Book Appointment'} ${icon('arrow')}</a>
        ${ct.phone ? html`<a class="btn btn-ghost-light btn-lg" href="${telHref(ct.phone)}">${icon('phone')} ${ct.phone}</a>` : ''}
      </div>
    </div>
  </section>`;
}
