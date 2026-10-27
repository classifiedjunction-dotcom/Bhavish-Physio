import { html, raw, safeUrl, lines } from '../lib/html.js';
import { markdown } from '../lib/markdown.js';
import { aboutArt } from './art.js';
import {
  icon, isOn, telHref, waHref, visual, sectionHead, serviceCard, conditionCard, teamCard, postCard,
  faqList, stars,
} from './ui.js';

function hero(ctx) {
  const { s, c } = ctx;
  const h = s.hero;
  const ct = s.contact;
  const wa = ct.whatsapp ? waHref(ct.whatsapp, `Hi ${s.clinic.name}, I would like to ask about physiotherapy.`) : '';
  const photo = safeUrl(h.image);
  const highlights = c.features.slice(0, 3).map((f) => f.title);

  return html`<section class="hero">
    <div class="hero-bg" aria-hidden="true"></div>
    <div class="wrap hero-grid">
      <div class="hero-copy">
        ${h.badge ? html`<span class="badge-pill">${h.badge}</span>` : ''}
        <h1>${h.title}${h.highlight ? html` <em>${h.highlight}</em>` : ''}</h1>
        ${h.subtitle ? html`<p class="lead">${h.subtitle}</p>` : ''}
        <div class="hero-ctas">
          ${ct.phone ? html`<a class="btn btn-accent btn-lg" href="${telHref(ct.phone)}">${icon('phone')} Call the clinic</a>` : ''}
          ${wa ? html`<a class="btn btn-wa btn-lg" href="${wa}" target="_blank" rel="noopener">${icon('whatsapp')} ${h.secondaryLabel || 'WhatsApp Us'}</a>` : ''}
        </div>
        ${highlights.length ? html`<ul class="hero-points">${highlights.map((t) => html`<li>${icon('check')} ${t}</li>`)}</ul>` : ''}
      </div>
      <div class="hero-side">
        ${photo
          ? html`<figure class="hero-photo"><img src="${photo}" alt="${s.clinic.name}" fetchpriority="high"></figure>`
          : html`<div class="quick-card clinic-card">
              <div class="quick-head">
                <span class="icon-chip">${icon('pin')}</span>
                <div><h2>${c.branches[0]?.name || s.clinic.name}</h2><p>${c.branches[0]?.address || s.contact.address || 'Physiotherapy clinic in Chennai'}</p></div>
              </div>
              ${ct.hours?.length ? html`<div class="clinic-hours">${ct.hours.map((h) => html`<p>${icon('clock')} <span>${h.days}: ${h.time}</span></p>`)}</div>` : ''}
              <div class="btn-row">
                ${ct.phone ? html`<a class="btn btn-accent btn-block" href="${telHref(ct.phone)}">${icon('phone')} Call the clinic</a>` : ''}
                ${wa ? html`<a class="btn btn-wa btn-block" href="${wa}" target="_blank" rel="noopener">${icon('whatsapp')} WhatsApp</a>` : ''}
              </div>
              ${c.branches[0]?.mapLink ? html`<a class="link-arrow clinic-directions" href="${safeUrl(c.branches[0].mapLink)}" target="_blank" rel="noopener">Get directions ${icon('arrow')}</a>` : ''}
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
          : html`<div class="about-img art">${aboutArt()}</div>`}
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
  const ct = s.contact;
  const practoStoriesUrl = 'https://www.practo.com/chennai/doctor/sudha-18-physiotherapist/recommended?practice_id=1238501&referrer=establishment_profile';
  const wa = ct.whatsapp ? waHref(ct.whatsapp, `Hi ${s.clinic.name}, I would like to ask about physiotherapy.`) : '';
  const show = (k) => isOn(sec[`${k}Show`]) && (k === 'about' || c[k]?.length);
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
        <p class="center-note">Not sure which service is right for you? <a href="/contact">Call or WhatsApp the clinic</a>.</p>
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

${s.sections.testimonialsShow && s.social.practoProfile
  ? html`<section class="section" id="reviews"><div class="wrap review-link-card">
      <div><span class="eyebrow">Practo stories</span><h2>125 patient stories</h2><p>Practo currently shows a 98% recommendation from 125 patients. Read patient stories directly on Practo.</p></div>
      <a class="btn btn-primary" href="${safeUrl(practoStoriesUrl)}" target="_blank" rel="noopener">Read stories on Practo ${icon('arrow')}</a>
    </div></section>`
  : ''}

${show('team')
  ? html`<section class="section alt team-section" id="team">
      <div class="wrap">
        ${sectionHead(sec, 'team', { center: false })}
        <div class="team-showcase">${c.team.slice(0, 4).map(teamCard)}</div>
        <div class="center-row"><a class="btn btn-outline" href="/team">View Dr. Sudha’s profile ${icon('arrow')}</a></div>
      </div>
    </section>`
  : ''}

${c.branches.length
  ? html`<section class="section single-location-section" id="locations">
      <div class="wrap">
        <div class="section-head center"><span class="eyebrow">Our clinic</span><h2>Visit us in Porur</h2><p>One clinic for physiotherapy care in Porur, Chennai.</p></div>
        ${c.branches.slice(0, 1).map((b) => html`<article class="card location-card single-location-card">
          <span class="icon-chip">${icon('pin')}</span>
          <div class="single-location-copy"><h3>${b.name}</h3>${b.address ? html`<p>${lines(b.address)}</p>` : ''}${b.hours ? html`<p class="muted">${icon('clock')} ${b.hours}</p>` : ''}</div>
          <div class="btn-row single-location-actions">${b.phone ? html`<a class="btn btn-outline btn-sm" href="${telHref(b.phone)}">${icon('phone')} Call clinic</a>` : ''}${safeUrl(b.mapLink) ? html`<a class="link-arrow" href="${safeUrl(b.mapLink)}" target="_blank" rel="noopener">Get directions ${icon('arrow')}</a>` : ''}</div>
        </article>`)}
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

<section class="section dark booking-section" id="contact-cta">
  <div class="wrap contact-cta-grid">
    <div><span class="eyebrow">Get in touch</span><h2>Speak with the clinic</h2><p class="lead">Call or WhatsApp to ask about services, timings and availability.</p></div>
    <div class="btn-row">
      ${ct.phone ? html`<a class="btn btn-accent btn-lg" href="${telHref(ct.phone)}">${icon('phone')} Call the clinic</a>` : ''}
      ${wa ? html`<a class="btn btn-wa btn-lg" href="${wa}" target="_blank" rel="noopener">${icon('whatsapp')} WhatsApp us</a>` : ''}
    </div>
  </div>
</section>`;
}
