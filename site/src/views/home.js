import { html, raw, safeUrl } from '../lib/html.js';
import { markdown } from '../lib/markdown.js';
import {
  icon, isOn, telHref, waHref, visual, sectionHead, serviceCard, conditionCard, teamCard, postCard,
  testimonialCard, faqList, bookingForm, contactList, stars,
} from './ui.js';

function hero(ctx) {
  const { s, c } = ctx;
  const h = s.hero;
  const ct = s.contact;
  const wa = ct.whatsapp ? waHref(ct.whatsapp, `Hi ${s.clinic.name}, I would like to book an appointment.`) : '';
  const photo = safeUrl(h.image);
  const highlights = c.features.slice(0, 3).map((f) => f.title);

  return html`<section class="hero">
    <div class="hero-bg" aria-hidden="true"></div>
    <div class="wrap hero-grid">
      <div class="hero-copy">
        ${h.badge ? html`<span class="badge-pill">${stars(5)} ${h.badge}</span>` : ''}
        <h1>${h.title}${h.highlight ? html` <em>${h.highlight}</em>` : ''}</h1>
        ${h.subtitle ? html`<p class="lead">${h.subtitle}</p>` : ''}
        <div class="hero-ctas">
          <a class="btn btn-accent btn-lg" href="#book">${h.primaryLabel || 'Book Appointment'} ${icon('arrow')}</a>
          ${wa ? html`<a class="btn btn-wa btn-lg" href="${wa}" target="_blank" rel="noopener">${icon('whatsapp')} ${h.secondaryLabel || 'WhatsApp Us'}</a>` : ''}
        </div>
        ${highlights.length ? html`<ul class="hero-points">${highlights.map((t) => html`<li>${icon('check')} ${t}</li>`)}</ul>` : ''}
      </div>
      <div class="hero-side">
        ${photo
          ? html`<figure class="hero-photo"><img src="${photo}" alt="${s.clinic.name}" fetchpriority="high"></figure>`
          : html`<div class="quick-card">
              <div class="quick-head">
                <span class="icon-chip">${icon('calendar')}</span>
                <div><h2>Book a visit</h2><p>Leave your number — we’ll call you back to confirm a time.</p></div>
              </div>
              ${bookingForm(ctx, { compact: true })}
              ${ct.hours?.[0] ? html`<p class="quick-foot">${icon('clock')} ${ct.hours[0].days}: ${ct.hours[0].time}</p>` : ''}
            </div>`}
      </div>
    </div>
    ${s.stats.items?.length
      ? html`<div class="wrap"><dl class="stats">${s.stats.items.map(
          (st) => html`<div class="stat"><dt>${st.label}</dt><dd>${st.value}</dd></div>`,
        )}</dl></div>`
      : ''}
  </section>`;
}

function aboutBlock(ctx) {
  const { s, c } = ctx;
  const a = s.about;
  const firstPara = String(a.body || '').split(/\n\s*\n/)[0];
  const years = s.clinic.established ? new Date().getUTCFullYear() - Number(s.clinic.established) : 0;
  return html`<section class="section" id="about">
    <div class="wrap split">
      <div class="split-visual reveal">
        ${safeUrl(a.image)
          ? html`<img class="about-img" src="${safeUrl(a.image)}" alt="${s.clinic.name}" loading="lazy">`
          : html`<img class="about-img art" src="/img/about-art.svg" alt="" loading="lazy">`}
        ${years > 0 ? html`<div class="exp-badge"><strong>${years}+</strong><span>Years of trusted care</span></div>` : ''}
      </div>
      <div class="split-copy reveal">
        ${sectionHead(s.sections, 'about', { center: false })}
        <div class="prose">${raw(markdown(firstPara))}</div>
        ${a.points?.length ? html`<ul class="check-list">${a.points.map((p) => html`<li>${icon('check')}<span>${p}</span></li>`)}</ul>` : ''}
        <div class="btn-row">
          <a class="btn btn-primary" href="/about">More about us ${icon('arrow')}</a>
          ${s.contact.phone ? html`<a class="btn btn-outline" href="${telHref(s.contact.phone)}">${icon('phone')} ${s.contact.phone}</a>` : ''}
        </div>
      </div>
    </div>
  </section>`;
}

export function homePage(ctx) {
  const { s, c } = ctx;
  const sec = s.sections;
  const show = (k) => isOn(sec[`${k}Show`]) && (k === 'about' || c[k]?.length);
  const avg = c.testimonials.length
    ? (c.testimonials.reduce((n, t) => n + (Number(t.rating) || 5), 0) / c.testimonials.length).toFixed(1)
    : null;

  return html`
${hero(ctx)}

${show('services')
  ? html`<section class="section" id="services">
      <div class="wrap">
        ${sectionHead(sec, 'services')}
        <div class="grid grid-4">${c.services.map(serviceCard)}</div>
        <div class="center-row"><a class="btn btn-outline" href="/services">View all services ${icon('arrow')}</a></div>
      </div>
    </section>`
  : ''}

${show('about') ? aboutBlock(ctx) : ''}

${show('conditions')
  ? html`<section class="section alt" id="conditions">
      <div class="wrap">
        ${sectionHead(sec, 'conditions')}
        <div class="grid grid-4 conditions-grid">${c.conditions.map(conditionCard)}</div>
        <p class="center-note">Don’t see your condition? <a href="/contact#book">Talk to us</a> — we treat many more.</p>
      </div>
    </section>`
  : ''}

${show('process')
  ? html`<section class="section" id="process">
      <div class="wrap">
        ${sectionHead(sec, 'process')}
        <ol class="steps">${c.process.map(
          (p, i) => html`<li class="step reveal"><span class="step-num">${String(i + 1).padStart(2, '0')}</span><h3>${p.title}</h3><p>${p.text}</p></li>`,
        )}</ol>
      </div>
    </section>`
  : ''}

${show('features')
  ? html`<section class="section dark" id="why-us">
      <div class="wrap">
        ${sectionHead(sec, 'features', { light: true })}
        <div class="grid grid-3">${c.features.map(
          (f) => html`<article class="feature reveal"><span class="icon-chip accent">${icon(f.icon || 'sparkles')}</span><h3>${f.title}</h3><p>${f.text}</p></article>`,
        )}</div>
      </div>
    </section>`
  : ''}

${show('testimonials')
  ? html`<section class="section" id="reviews">
      <div class="wrap">
        <div class="head-row">
          ${sectionHead(sec, 'testimonials', { center: false })}
          <div class="rating-summary">
            <strong>${avg}</strong>
            <div>${stars(Math.round(avg))}<small>Average from ${c.testimonials.length} reviews</small></div>
          </div>
        </div>
        <div class="carousel" data-carousel>
          <div class="carousel-track">${c.testimonials.map(testimonialCard)}</div>
          <div class="carousel-nav">
            <button type="button" data-prev aria-label="Previous reviews">${icon('left')}</button>
            <button type="button" data-next aria-label="Next reviews">${icon('right')}</button>
          </div>
        </div>
        ${safeUrl(s.social.googleReviews) ? html`<div class="center-row"><a class="btn btn-outline" href="${safeUrl(s.social.googleReviews)}" target="_blank" rel="noopener">${icon('google')} Read our Google reviews</a></div>` : ''}
      </div>
    </section>`
  : ''}

${show('team')
  ? html`<section class="section alt" id="team">
      <div class="wrap">
        ${sectionHead(sec, 'team')}
        <div class="grid grid-4">${c.team.slice(0, 4).map(teamCard)}</div>
        <div class="center-row"><a class="btn btn-outline" href="/team">Meet the full team ${icon('arrow')}</a></div>
      </div>
    </section>`
  : ''}

${show('faqs')
  ? html`<section class="section" id="faqs">
      <div class="wrap faq-layout">
        <div>
          ${sectionHead(sec, 'faqs', { center: false })}
          <div class="help-card">
            <h3>Still have questions?</h3>
            <p>Our team is happy to help. Call or message us any time during clinic hours.</p>
            <div class="btn-row">
              ${s.contact.phone ? html`<a class="btn btn-primary" href="${telHref(s.contact.phone)}">${icon('phone')} Call us</a>` : ''}
              ${s.contact.whatsapp ? html`<a class="btn btn-wa" href="${waHref(s.contact.whatsapp)}" target="_blank" rel="noopener">${icon('whatsapp')} WhatsApp</a>` : ''}
            </div>
          </div>
        </div>
        ${faqList(c.faqs)}
      </div>
    </section>`
  : ''}

${show('posts')
  ? html`<section class="section alt" id="blog">
      <div class="wrap">
        ${sectionHead(sec, 'posts')}
        <div class="grid grid-3">${c.posts.slice(0, 3).map(postCard)}</div>
        <div class="center-row"><a class="btn btn-outline" href="/blog">View all articles ${icon('arrow')}</a></div>
      </div>
    </section>`
  : ''}

<section class="section dark booking-section" id="book">
  <div class="wrap booking-grid">
    <div class="booking-info">
      <span class="eyebrow">Get in touch</span>
      <h2>${s.booking.title || 'Book an appointment'}</h2>
      ${s.booking.intro ? html`<p class="lead">${s.booking.intro}</p>` : ''}
      ${contactList(ctx, { light: true })}
      ${s.contact.whatsapp ? html`<a class="btn btn-wa" href="${waHref(s.contact.whatsapp, `Hi ${s.clinic.name}, I would like to book an appointment.`)}" target="_blank" rel="noopener">${icon('whatsapp')} Quick book on WhatsApp</a>` : ''}
    </div>
    <div class="form-card">${bookingForm(ctx)}</div>
  </div>
</section>`;
}
