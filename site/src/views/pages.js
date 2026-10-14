import { html, raw, safeUrl, escape, lines } from '../lib/html.js';
import { markdown } from '../lib/markdown.js';
import { aboutArt } from './art.js';
import {
  icon, telHref, waHref, visual, avatar, sectionHead, pageHero, serviceCard, conditionCard, teamCard, postCard,
  faqList, bookingForm, contactList, ctaBand, formatDate,
} from './ui.js';

const sideCta = ({ s }) => html`<aside class="side-card cta-card">
  <span class="icon-chip accent">${icon('calendar')}</span>
  <h3>Book an assessment</h3>
  <p>Talk to a physiotherapist about your problem and get a clear treatment plan.</p>
  <a class="btn btn-accent btn-block" href="/contact#book">${s.hero.primaryLabel || 'Book Appointment'}</a>
  ${s.contact.phone ? html`<a class="btn btn-ghost-light btn-block" href="${telHref(s.contact.phone)}">${icon('phone')} ${s.contact.phone}</a>` : ''}
</aside>`;

const sideLinks = (title, items, base, currentSlug) => html`<aside class="side-card">
  <h3>${title}</h3>
  <ul class="side-links">${items.map(
    (x) => html`<li><a class="${x.slug === currentSlug ? 'active' : ''}" href="${base}${x.slug}">${x.title || x.name}${icon('right')}</a></li>`,
  )}</ul>
</aside>`;

export function aboutPage(ctx) {
  const { s, c } = ctx;
  const a = s.about;
  return {
    title: s.sections.aboutTitle || 'About us',
    description: a.body,
    body: html`
${pageHero('About us', [['About us']], s.clinic.tagline)}
<section class="section">
  <div class="wrap split">
    <div class="split-visual reveal">
      ${safeUrl(a.image)
        ? html`<img class="about-img" src="${safeUrl(a.image)}" alt="${s.clinic.name}">`
        : html`<div class="about-img art">${aboutArt()}</div>`}
    </div>
    <div class="split-copy">
      ${sectionHead(s.sections, 'about', { center: false })}
      <div class="prose">${raw(markdown(a.body))}</div>
      ${a.points?.length ? html`<ul class="check-list">${a.points.map((p) => html`<li>${icon('check')}<span>${p}</span></li>`)}</ul>` : ''}
    </div>
  </div>
</section>
${s.stats.items?.length
  ? html`<section class="section tight"><div class="wrap"><dl class="stats inline">${s.stats.items.map(
      (st) => html`<div class="stat"><dt>${st.label}</dt><dd>${st.value}</dd></div>`,
    )}</dl></div></section>`
  : ''}
${a.founderName
  ? html`<section class="section alt" id="founder">
      <div class="wrap founder">
        <div class="founder-photo">${avatar(a.founderPhoto, a.founderName, 1, 'founder-img')}</div>
        <div>
          <span class="eyebrow">Our founder</span>
          <h2>${a.founderName}</h2>
          <p class="role">${a.founderRole}</p>
          ${a.founderQualifications ? html`<p class="pill soft">${a.founderQualifications}</p>` : ''}
          <div class="prose">${raw(markdown(a.founderBio))}</div>
        </div>
      </div>
    </section>`
  : ''}
${c.features.length
  ? html`<section class="section dark">
      <div class="wrap">
        ${sectionHead(s.sections, 'features', { light: true })}
        <div class="grid grid-3">${c.features.map(
          (f) => html`<article class="feature"><span class="icon-chip accent">${icon(f.icon)}</span><h3>${f.title}</h3><p>${f.text}</p></article>`,
        )}</div>
      </div>
    </section>`
  : ''}
${ctaBand(ctx)}`,
  };
}

export function servicesPage(ctx) {
  const { s, c } = ctx;
  return {
    title: s.sections.servicesTitle || 'Services',
    description: s.sections.servicesIntro,
    body: html`
${pageHero(s.sections.servicesTitle || 'Services', [['Services']], s.sections.servicesIntro)}
<section class="section"><div class="wrap"><div class="grid grid-3">${c.services.map(serviceCard)}</div></div></section>
${ctaBand(ctx)}`,
  };
}

export function servicePage(ctx, svc) {
  const { c } = ctx;
  return {
    title: svc.title,
    description: svc.summary,
    image: svc.image,
    body: html`
${pageHero(svc.title, [['Services', '/services'], [svc.title]], svc.summary)}
<section class="section">
  <div class="wrap detail-layout">
    <article class="detail-main">
      ${visual(svc.image, svc.icon, svc.title, svc.id, 'detail-visual')}
      ${svc.features?.length ? html`<ul class="feature-chips">${svc.features.map((f) => html`<li>${icon('check')} ${f}</li>`)}</ul>` : ''}
      <div class="prose">${raw(markdown(svc.body))}</div>
    </article>
    <div class="detail-side">
      ${sideCta(ctx)}
      ${sideLinks('All services', c.services, '/services/', svc.slug)}
    </div>
  </div>
</section>`,
  };
}

export function conditionsPage(ctx) {
  const { s, c } = ctx;
  return {
    title: s.sections.conditionsTitle || 'Conditions we treat',
    description: s.sections.conditionsIntro,
    body: html`
${pageHero(s.sections.conditionsTitle || 'Conditions we treat', [['Conditions']], s.sections.conditionsIntro)}
<section class="section"><div class="wrap"><div class="grid grid-3 conditions-grid">${c.conditions.map(conditionCard)}</div>
<p class="center-note">Don’t see your condition? <a href="/contact#book">Talk to us</a> — we treat many more.</p></div></section>
${ctaBand(ctx)}`,
  };
}

export function conditionPage(ctx, cond) {
  const { c } = ctx;
  return {
    title: `${cond.title} Treatment`,
    description: cond.summary,
    image: cond.image,
    body: html`
${pageHero(cond.title, [['Conditions', '/conditions'], [cond.title]], cond.short)}
<section class="section">
  <div class="wrap detail-layout">
    <article class="detail-main">
      ${visual(cond.image, cond.icon, cond.title, cond.id, 'detail-visual')}
      ${cond.summary ? html`<p class="lead dark">${cond.summary}</p>` : ''}
      <div class="info-cols">
        ${cond.symptoms?.length
          ? html`<div class="info-box"><h2>Common symptoms</h2><ul class="dot-list">${cond.symptoms.map((x) => html`<li>${x}</li>`)}</ul></div>`
          : ''}
        ${cond.treatments?.length
          ? html`<div class="info-box accent"><h2>How we treat it</h2><ul class="check-list">${cond.treatments.map((x) => html`<li>${icon('check')}<span>${x}</span></li>`)}</ul></div>`
          : ''}
      </div>
      <div class="prose">${raw(markdown(cond.body))}</div>
    </article>
    <div class="detail-side">
      ${sideCta(ctx)}
      ${sideLinks('Other conditions', c.conditions, '/conditions/', cond.slug)}
    </div>
  </div>
</section>`,
  };
}

export function teamPage(ctx) {
  const { s, c } = ctx;
  return {
    title: s.sections.teamTitle || 'Our team',
    description: s.sections.teamIntro,
    body: html`
${pageHero(s.sections.teamTitle || 'Our team', [['About', '/about'], ['Team']], s.sections.teamIntro)}
<section class="section">
  <div class="wrap team-list">${c.team.map(
    (m, i) => html`<article class="card team-row reveal">
      ${avatar(m.photo, m.name, i, 'team-photo')}
      <div>
        <h2>${m.name}</h2>
        <p class="role">${m.role}</p>
        <div class="team-meta">
          ${m.specialty ? html`<span class="pill soft">${m.specialty}</span>` : ''}
          ${m.experience ? html`<span class="pill">${m.experience}</span>` : ''}
          ${m.qualifications ? html`<span class="pill soft">${m.qualifications}</span>` : ''}
        </div>
        ${m.bio ? html`<p>${m.bio}</p>` : ''}
      </div>
    </article>`,
  )}</div>
</section>
${ctaBand(ctx)}`,
  };
}

export function galleryPage(ctx) {
  const { c } = ctx;
  return {
    title: 'Gallery',
    description: 'A look inside our clinic.',
    body: html`
${pageHero('Gallery', [['About', '/about'], ['Gallery']], 'A look inside our clinic and treatment spaces.')}
<section class="section">
  <div class="wrap gallery-grid">${c.gallery.map((g, i) => {
    const src = safeUrl(g.image);
    return src
      ? html`<figure class="gallery-item reveal"><button type="button" data-lightbox="${src}" data-caption="${g.title}"><img src="${src}" alt="${g.title}" loading="lazy"></button><figcaption>${g.title}</figcaption></figure>`
      : html`<figure class="gallery-item reveal">${visual('', 'image', g.title, i)}<figcaption>${g.title}<small>Photo coming soon</small></figcaption></figure>`;
  })}</div>
</section>
<dialog class="lightbox" id="lightbox"><button type="button" class="lightbox-close" aria-label="Close">${icon('close')}</button><img alt=""><p></p></dialog>`,
  };
}

export function blogPage(ctx) {
  const { s, c } = ctx;
  const posts = [...c.posts].sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')));
  return {
    title: s.sections.postsTitle || 'Blog',
    description: s.sections.postsIntro,
    body: html`
${pageHero(s.sections.postsTitle || 'Blog', [['Blog']], s.sections.postsIntro)}
<section class="section"><div class="wrap">
  ${posts.length ? html`<div class="grid grid-3">${posts.map(postCard)}</div>` : html`<p class="center-note">Articles are coming soon.</p>`}
</div></section>`,
  };
}

export function postPage(ctx, post) {
  const { c } = ctx;
  const others = c.posts.filter((p) => p.slug !== post.slug).slice(0, 4);
  return {
    title: post.title,
    description: post.excerpt,
    image: post.cover,
    body: html`
${pageHero(post.title, [['Blog', '/blog'], [post.title]])}
<section class="section">
  <div class="wrap detail-layout">
    <article class="detail-main">
      <p class="post-meta big">
        ${post.category ? html`<span class="pill soft">${post.category}</span>` : ''}
        ${post.date ? html`<span>${icon('calendar')} ${formatDate(post.date)}</span>` : ''}
        ${post.author ? html`<span>By ${post.author}</span>` : ''}
      </p>
      ${visual(post.cover, 'clipboard', post.title, post.id, 'detail-visual')}
      <div class="prose article">${raw(markdown(post.body))}</div>
    </article>
    <div class="detail-side">
      ${sideCta(ctx)}
      ${others.length ? sideLinks('More articles', others, '/blog/', '') : ''}
    </div>
  </div>
</section>`,
  };
}

function mapFrame(src, title) {
  const url = safeUrl(src);
  if (!/^https:\/\/(www\.)?google\.[a-z.]+\/maps/i.test(url)) return '';
  return html`<iframe class="map" src="${url}" title="Map: ${title}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>`;
}

const branchCard = (b, i) => html`<article class="card branch-card reveal">
  ${visual(b.image, 'pin', b.name, i)}
  <div class="branch-body">
    <h3><a href="/branches/${b.slug}">${b.name}</a></h3>
    ${b.address ? html`<p class="with-icon">${icon('pin')}<span>${lines(b.address)}</span></p>` : ''}
    ${b.phone ? html`<p class="with-icon">${icon('phone')}<a href="${telHref(b.phone)}">${b.phone}</a></p>` : ''}
    ${b.hours ? html`<p class="with-icon">${icon('clock')}<span>${b.hours}</span></p>` : ''}
    <div class="btn-row">
      <a class="btn btn-primary btn-sm" href="/branches/${b.slug}">View branch</a>
      ${safeUrl(b.mapLink) ? html`<a class="btn btn-outline btn-sm" href="${safeUrl(b.mapLink)}" target="_blank" rel="noopener">Directions</a>` : ''}
    </div>
  </div>
</article>`;

export function branchesPage(ctx) {
  const { c } = ctx;
  return {
    title: 'Our branches',
    description: 'Find a clinic near you.',
    body: html`
${pageHero('Our branches', [['Branches']], 'Find a clinic near you.')}
<section class="section"><div class="wrap grid grid-2">${c.branches.map(branchCard)}</div></section>
${ctaBand(ctx)}`,
  };
}

export function branchPage(ctx, b) {
  const { c } = ctx;
  return {
    title: `${b.name} Branch`,
    description: b.description,
    image: b.image,
    body: html`
${pageHero(b.name, [['Branches', '/branches'], [b.name]], b.description)}
<section class="section">
  <div class="wrap detail-layout">
    <article class="detail-main">
      ${mapFrame(b.mapEmbed, b.name) || visual(b.image, 'pin', b.name, b.id, 'detail-visual')}
      <div class="info-cols">
        <div class="info-box">
          <h2>Visit us</h2>
          ${b.address ? html`<p class="with-icon">${icon('pin')}<span>${lines(b.address)}</span></p>` : ''}
          ${b.phone ? html`<p class="with-icon">${icon('phone')}<a href="${telHref(b.phone)}">${b.phone}</a></p>` : ''}
          ${b.hours ? html`<p class="with-icon">${icon('clock')}<span>${b.hours}</span></p>` : ''}
          ${safeUrl(b.mapLink) ? html`<a class="btn btn-primary btn-sm" href="${safeUrl(b.mapLink)}" target="_blank" rel="noopener">Get directions ${icon('arrow')}</a>` : ''}
        </div>
      </div>
    </article>
    <div class="detail-side">
      ${sideCta(ctx)}
      ${c.branches.length > 1 ? sideLinks('All branches', c.branches, '/branches/', b.slug) : ''}
    </div>
  </div>
</section>`,
  };
}

export function contactPage(ctx, { booked = false } = {}) {
  const { s, c } = ctx;
  const ct = s.contact;
  const wa = ct.whatsapp ? waHref(ct.whatsapp, `Hi ${s.clinic.name}, I would like to book an appointment.`) : '';
  return {
    title: 'Contact & Booking',
    description: `Book an appointment or get in touch with ${s.clinic.name}.`,
    body: html`
${pageHero('Contact us', [['Contact']], s.booking.intro)}
<section class="section">
  <div class="wrap">
    <div class="grid grid-4 contact-cards">
      ${ct.phone ? html`<a class="card contact-card" href="${telHref(ct.phone)}"><span class="icon-chip">${icon('phone')}</span><strong>Call us</strong><span>${ct.phone}</span></a>` : ''}
      ${wa ? html`<a class="card contact-card" href="${wa}" target="_blank" rel="noopener"><span class="icon-chip wa">${icon('whatsapp')}</span><strong>WhatsApp</strong><span>Chat with our team</span></a>` : ''}
      ${ct.email ? html`<a class="card contact-card" href="mailto:${ct.email}"><span class="icon-chip">${icon('mail')}</span><strong>Email</strong><span>${ct.email}</span></a>` : ''}
      ${safeUrl(ct.mapLink) ? html`<a class="card contact-card" href="${safeUrl(ct.mapLink)}" target="_blank" rel="noopener"><span class="icon-chip">${icon('pin')}</span><strong>Visit us</strong><span>Get directions</span></a>` : ''}
    </div>
  </div>
</section>
<section class="section dark booking-section" id="book">
  <div class="wrap booking-grid">
    <div class="booking-info">
      <span class="eyebrow">Appointments</span>
      <h2>${s.booking.title || 'Book an appointment'}</h2>
      ${contactList(ctx, { light: true })}
    </div>
    <div class="form-card">
      ${booked ? html`<div class="form-success">${icon('check')}<p>${s.booking.successMessage}</p></div>` : ''}
      ${bookingForm(ctx)}
    </div>
  </div>
</section>
${mapFrame(ct.mapEmbed, s.clinic.name) ? html`<section class="map-section">${mapFrame(ct.mapEmbed, s.clinic.name)}</section>` : ''}
${c.branches.length > 1
  ? html`<section class="section alt"><div class="wrap"><div class="section-head center"><span class="eyebrow">Locations</span><h2>Our branches</h2></div><div class="grid grid-2">${c.branches.map(branchCard)}</div></div></section>`
  : ''}`,
  };
}

export function notFoundPage(ctx) {
  return {
    title: 'Page not found',
    body: html`
<section class="section not-found">
  <div class="wrap center">
    <span class="icon-chip accent lg">${icon('target')}</span>
    <h1>Page not found</h1>
    <p>Sorry, we couldn’t find that page. It may have moved or no longer exists.</p>
    <div class="btn-row center"><a class="btn btn-primary" href="/">Back to home</a><a class="btn btn-outline" href="/contact">Contact us</a></div>
  </div>
</section>`,
  };
}
