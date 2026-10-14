// Admin portal single-page app. Forms are generated from the content schema served by /api/schema,
// so new fields added in shared/schema.js appear here automatically.

const app = document.getElementById('app');
let schema = null;
let me = null;
let dirty = false;
let lastHash = location.hash;

// ---------- Icons ----------
const ADMIN_ICONS = {
  activity: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  close: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  inbox: '<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
  sliders: '<line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>',
  edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
  trash: '<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>',
  up: '<polyline points="18 15 12 9 6 15"/>',
  plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
  external: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',
  upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
  copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
  user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  list: '<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>',
  search: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
  globe: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  help: '<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="13" y2="17"/>',
  palette: '<circle cx="13.5" cy="6.5" r="1.2"/><circle cx="17.5" cy="10.5" r="1.2"/><circle cx="8.5" cy="7.5" r="1.2"/><circle cx="6.5" cy="12.5" r="1.2"/><path d="M12 2a10 10 0 0 0 0 20c1 0 1.7-.8 1.7-1.7 0-.4-.2-.8-.4-1.1-.3-.3-.4-.7-.4-1.1 0-.9.8-1.7 1.7-1.7h2a5.6 5.6 0 0 0 5.4-5.6C22 6 17.5 2 12 2z"/>',
};
let ICONS = { ...ADMIN_ICONS };
const svg = (name) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ''}</svg>`;
const ic = (name, cls = 'i') => h('span', { class: cls, html: svg(name) });

const COLLECTION_ICONS = {
  services: 'stethoscope', conditions: 'spine', process: 'trending', features: 'award', team: 'users',
  testimonials: 'star', faqs: 'help', gallery: 'image', posts: 'file', branches: 'pin',
};
const SETTINGS_ICONS = {
  clinic: 'home', contact: 'phone', social: 'globe', hero: 'sparkles', stats: 'trending', sections: 'list',
  about: 'heart', booking: 'calendar', footer: 'list', theme: 'palette', seo: 'search',
};

// ---------- DOM helper ----------
function h(tag, props, ...kids) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(props || {})) {
    if (v == null || v === false) continue;
    if (k === 'class') el.className = v;
    else if (k === 'html') el.innerHTML = v; // trusted SVG markup only
    else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2), v);
    else if (k === 'value') el.value = v;
    else if (k === 'checked') el.checked = !!v;
    else el.setAttribute(k, v === true ? '' : v);
  }
  for (const kid of kids.flat(Infinity)) {
    if (kid == null || kid === false) continue;
    el.append(kid instanceof Node ? kid : String(kid));
  }
  return el;
}

// ---------- API ----------
async function api(path, { method = 'GET', body, form } = {}) {
  const opts = { method, headers: {}, credentials: 'same-origin' };
  if (form) opts.body = form;
  else if (body !== undefined) {
    opts.headers['Content-Type'] = 'application/json';
    opts.body = JSON.stringify(body);
  }
  const res = await fetch(`/api${path}`, opts);
  const data = await res.json().catch(() => ({}));
  if (res.status === 401 && path !== '/login') {
    me = null;
    renderLogin();
    throw new Error('Your session has ended. Please log in again.');
  }
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data;
}

// ---------- Feedback ----------
function toast(message, type = 'ok') {
  const t = h('div', { class: `toast ${type}`, role: 'status' }, ic(type === 'ok' ? 'check' : 'help'), h('span', null, message));
  document.getElementById('toasts').append(t);
  setTimeout(() => t.classList.add('out'), 3200);
  setTimeout(() => t.remove(), 3600);
}

function confirmBox(message, { ok = 'Delete', danger = true } = {}) {
  return new Promise((resolve) => {
    const dlg = h('dialog', { class: 'modal small' },
      h('p', { class: 'modal-text' }, message),
      h('div', { class: 'modal-actions' },
        h('button', { class: 'btn ghost', type: 'button', onclick: () => close(false) }, 'Cancel'),
        h('button', { class: `btn ${danger ? 'danger' : 'primary'}`, type: 'button', onclick: () => close(true) }, ok),
      ),
    );
    const close = (v) => {
      dlg.close();
      dlg.remove();
      resolve(v);
    };
    dlg.addEventListener('cancel', () => close(false));
    document.body.append(dlg);
    dlg.showModal();
  });
}

const fmtDateTime = (s) => {
  if (!s) return '';
  const d = new Date(String(s).replace(' ', 'T') + (String(s).includes('Z') ? '' : 'Z'));
  return Number.isNaN(d.getTime()) ? s : d.toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' });
};
const fmtDate = (s) => {
  if (!s) return '';
  const d = new Date(`${s}T00:00:00`);
  return Number.isNaN(d.getTime()) ? s : d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
};
const fmtSize = (n) => (n > 1048576 ? `${(n / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(n / 1024))} KB`);
const siteLink = (path = '/') => (me?.siteUrl ? me.siteUrl.replace(/\/$/, '') + path : '');
// Indian mobile numbers are often stored without the country code.
const waNumber = (phone) => {
  let d = String(phone || '').replace(/\D/g, '');
  if (d.length === 10) d = `91${d}`;
  return d;
};

// ---------- Boot & routing ----------
async function boot() {
  try {
    me = await api('/me');
    schema = await api('/schema');
    ICONS = { ...schema.icons, ...ADMIN_ICONS };
    renderShell();
    route();
    refreshBadge();
  } catch {
    if (!me) renderLogin();
  }
}

window.addEventListener('hashchange', () => {
  if (dirty && !window.confirm('You have unsaved changes. Leave this page without saving?')) {
    history.replaceState(null, '', lastHash || '#/');
    return;
  }
  dirty = false;
  route();
});
window.addEventListener('beforeunload', (e) => {
  if (dirty) e.preventDefault();
});

function route() {
  if (!me || !schema) return;
  lastHash = location.hash;
  const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  const view = document.getElementById('view');
  view.replaceChildren(h('div', { class: 'loading' }, 'Loading…'));
  document.body.classList.remove('menu-open');
  setActiveNav();
  window.scrollTo(0, 0);

  const [a, b, c] = parts;
  let p;
  if (!a) p = viewDashboard(view);
  else if (a === 'appointments') p = viewAppointments(view);
  else if (a === 'c' && b && !c) p = viewCollection(view, b);
  else if (a === 'c' && b && c) p = viewEntry(view, b, c === 'new' ? null : c);
  else if (a === 's' && b) p = viewSettings(view, b);
  else if (a === 'media') p = viewMedia(view);
  else if (a === 'account') p = viewAccount(view);
  else p = Promise.resolve(view.replaceChildren(empty('Page not found')));
  p?.catch?.((err) => view.replaceChildren(empty(err.message)));
}

function setActiveNav() {
  const hash = location.hash || '#/';
  document.querySelectorAll('.nav a').forEach((a) => {
    const href = a.getAttribute('href');
    const on = href === '#/' ? hash === '#/' || hash === '' : hash === href || hash.startsWith(`${href}/`);
    a.classList.toggle('active', on);
  });
}

async function refreshBadge() {
  try {
    const d = await api('/dashboard');
    const n = d.appointments?.new || 0;
    const badge = document.getElementById('new-badge');
    if (badge) {
      badge.textContent = n;
      badge.hidden = !n;
    }
    return d;
  } catch {
    return null;
  }
}

// ---------- Login ----------
function renderLogin() {
  document.body.className = 'login-page';
  const user = h('input', { name: 'username', autocomplete: 'username', required: true, value: 'admin' });
  const pass = h('input', { name: 'password', type: 'password', autocomplete: 'current-password', required: true });
  const err = h('p', { class: 'form-error', role: 'alert' });
  const btn = h('button', { class: 'btn primary block', type: 'submit' }, 'Log in');
  const form = h('form', {
    class: 'login-card',
    onsubmit: async (e) => {
      e.preventDefault();
      err.textContent = '';
      btn.disabled = true;
      btn.textContent = 'Logging in…';
      try {
        await api('/login', { method: 'POST', body: { username: user.value, password: pass.value } });
        document.body.className = '';
        await boot();
      } catch (ex) {
        err.textContent = ex.message;
        btn.disabled = false;
        btn.textContent = 'Log in';
      }
    },
  },
    h('div', { class: 'login-brand' }, h('span', { class: 'logo-mark', html: svg('activity') }), h('div', null, h('strong', null, 'Admin Portal'), h('small', null, 'Website content manager'))),
    h('h1', null, 'Welcome back'),
    h('p', { class: 'muted' }, 'Log in to manage your website, appointments and photos.'),
    h('label', { class: 'field' }, h('span', { class: 'label' }, 'Username'), user),
    h('label', { class: 'field' }, h('span', { class: 'label' }, 'Password'), pass),
    err,
    btn,
  );
  app.replaceChildren(h('div', { class: 'login-wrap' }, form));
  (user.value ? pass : user).focus();
}

// ---------- Shell ----------
function renderShell() {
  document.body.className = '';
  const navLink = (href, iconName, label, extra) => h('a', { href }, ic(iconName), h('span', null, label), extra);
  const groups = {};
  for (const s of schema.settings) (groups[s.group] ||= []).push(s);

  const sidebar = h('aside', { class: 'sidebar' },
    h('a', { class: 'sb-brand', href: '#/' },
      h('span', { class: 'logo-mark', html: svg('activity') }),
      h('span', null, h('strong', null, 'Admin Portal'), h('small', null, 'Website manager')),
    ),
    h('nav', { class: 'nav' },
      h('p', { class: 'nav-label' }, 'Overview'),
      navLink('#/', 'grid', 'Dashboard'),
      navLink('#/appointments', 'inbox', 'Appointments', h('b', { class: 'badge', id: 'new-badge', hidden: true }, '0')),
      h('p', { class: 'nav-label' }, 'Website content'),
      schema.collections.map((c) => navLink(`#/c/${c.key}`, COLLECTION_ICONS[c.key] || 'list', c.label)),
      Object.entries(groups).map(([group, items]) => [
        h('p', { class: 'nav-label' }, group),
        items.map((s) => navLink(`#/s/${s.key}`, SETTINGS_ICONS[s.key] || 'sliders', s.label)),
      ]),
      h('p', { class: 'nav-label' }, 'Library'),
      navLink('#/media', 'image', 'Photos & images'),
      navLink('#/account', 'user', 'Account'),
    ),
  );

  const top = h('header', { class: 'topbar' },
    h('button', { class: 'icon-btn menu-btn', type: 'button', 'aria-label': 'Menu', onclick: () => document.body.classList.toggle('menu-open') }, ic('menu')),
    h('div', { class: 'top-title', id: 'top-title' }),
    h('div', { class: 'top-actions' },
      me.siteUrl ? h('a', { class: 'btn ghost sm', href: me.siteUrl, target: '_blank', rel: 'noopener' }, ic('external'), h('span', { class: 'hide-sm' }, 'View website')) : null,
      h('span', { class: 'user-chip' }, ic('user'), h('span', { class: 'hide-sm' }, me.user.username)),
      h('button', { class: 'icon-btn', type: 'button', title: 'Log out', 'aria-label': 'Log out', onclick: logout }, ic('logout')),
    ),
  );

  app.replaceChildren(
    h('div', { class: 'shell' },
      sidebar,
      h('div', { class: 'scrim', onclick: () => document.body.classList.remove('menu-open') }),
      h('div', { class: 'main' }, top, h('main', { id: 'view', class: 'view' })),
    ),
  );
}

async function logout() {
  await api('/logout', { method: 'POST' }).catch(() => {});
  me = null;
  renderLogin();
}

function setTitle(text) {
  const t = document.getElementById('top-title');
  if (t) t.textContent = text;
  document.title = `${text} · Admin Portal`;
}

const empty = (text, action) => h('div', { class: 'empty' }, ic('inbox', 'i big'), h('p', null, text), action || null);

const pageHead = (title, subtitle, ...actions) =>
  h('div', { class: 'page-head' }, h('div', null, h('h1', null, title), subtitle ? h('p', { class: 'muted' }, subtitle) : null), h('div', { class: 'page-actions' }, actions));

// ---------- Dashboard ----------
async function viewDashboard(view) {
  setTitle('Dashboard');
  const [d, settings] = await Promise.all([api('/dashboard'), api('/settings')]);
  const appts = d.appointments || {};
  const total = Object.values(appts).reduce((a, b) => a + b, 0);
  const statusBadge = (s) => h('span', { class: `status s-${s}` }, s);

  const stat = (label, value, iconName, href, tone = '') =>
    h('a', { class: `stat-card ${tone}`, href }, ic(iconName, 'i stat-ic'), h('div', null, h('strong', null, String(value)), h('span', null, label)));

  const seo = settings.seo || {};
  const clinic = settings.clinic || {};
  const checklist = [
    ['Clinic name, phone, WhatsApp and address', '#/s/contact', !/sample|example|90000 00000/i.test(JSON.stringify(settings.contact || {}))],
    ['Upload the clinic logo', '#/s/clinic', !!clinic.logo],
    ['Replace sample reviews with real ones', '#/c/testimonials', false],
    ['Add real team names and photos', '#/c/team', false],
    ['Upload clinic photos to the gallery', '#/c/gallery', d.media > 0],
    ['Turn off the preview banner', '#/s/seo', !seo.previewBanner],
    ['Allow Google to show the site', '#/s/seo', !seo.noindex],
  ];

  view.replaceChildren(
    pageHead(`Hello, ${me.user.username}`, `Here’s what’s happening with ${clinic.name || 'your website'}.`,
      me.siteUrl ? h('a', { class: 'btn primary', href: me.siteUrl, target: '_blank', rel: 'noopener' }, ic('external'), 'Open website') : null),
    h('div', { class: 'stat-grid' },
      stat('New requests', appts.new || 0, 'inbox', '#/appointments', 'accent'),
      stat('Requests this week', d.thisWeek, 'calendar', '#/appointments'),
      stat('All requests', total, 'list', '#/appointments'),
      stat('Uploaded photos', d.media, 'image', '#/media'),
    ),
    h('div', { class: 'dash-grid' },
      h('section', { class: 'panel' },
        h('div', { class: 'panel-head' }, h('h2', null, 'Latest appointment requests'), h('a', { class: 'link', href: '#/appointments' }, 'View all')),
        d.latest.length
          ? h('ul', { class: 'mini-list' }, d.latest.map((a) =>
              h('li', null,
                h('div', null, h('strong', null, a.name), h('small', null, [a.service, a.preferred_date && fmtDate(a.preferred_date), a.preferred_time].filter(Boolean).join(' · '))),
                h('div', { class: 'mini-right' }, statusBadge(a.status), h('small', null, fmtDateTime(a.created_at))),
              )))
          : empty('No appointment requests yet. They will appear here when patients use the booking form.'),
      ),
      h('section', { class: 'panel' },
        h('div', { class: 'panel-head' }, h('h2', null, 'Launch checklist')),
        h('p', { class: 'muted small' }, 'The site currently uses sample content. Work through these before sharing it publicly.'),
        h('ul', { class: 'checklist' }, checklist.map(([label, href, done]) =>
          h('li', { class: done ? 'done' : '' }, h('a', { href }, h('span', { class: 'tick', html: done ? svg('check') : '' }), label)))),
      ),
    ),
    h('section', { class: 'panel' },
      h('div', { class: 'panel-head' }, h('h2', null, 'Quick edit')),
      h('div', { class: 'quick-grid' },
        [['#/s/hero', 'sparkles', 'Home banner'], ['#/s/contact', 'phone', 'Contact & hours'], ['#/c/services', 'stethoscope', 'Services'],
          ['#/c/team', 'users', 'Team'], ['#/c/testimonials', 'star', 'Reviews'], ['#/c/gallery', 'image', 'Gallery'],
          ['#/c/posts', 'file', 'Blog posts'], ['#/s/theme', 'palette', 'Colours']].map(([href, i, label]) =>
          h('a', { class: 'quick', href }, ic(i), h('span', null, label))),
      ),
    ),
  );
  const badge = document.getElementById('new-badge');
  if (badge) {
    badge.textContent = appts.new || 0;
    badge.hidden = !appts.new;
  }
}

// ---------- Appointments ----------
async function viewAppointments(view) {
  setTitle('Appointments');
  const statuses = schema.statuses;
  let filter = sessionStorage.getItem('apptFilter') || '';
  let search = '';
  let rows = [];

  const tabs = h('div', { class: 'tabs' });
  const list = h('div', { class: 'appt-list' });
  const searchInput = h('input', { type: 'search', placeholder: 'Search name or phone…', oninput: (e) => { search = e.target.value.toLowerCase(); draw(); } });

  const exportCsv = () => {
    const cols = ['id', 'created_at', 'name', 'phone', 'email', 'service', 'branch', 'preferred_date', 'preferred_time', 'message', 'status', 'notes'];
    const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
    const csv = [cols.join(','), ...visible().map((r) => cols.map((c) => esc(r[c])).join(','))].join('\n');
    const a = h('a', { href: URL.createObjectURL(new Blob([csv], { type: 'text/csv' })), download: `appointments-${new Date().toISOString().slice(0, 10)}.csv` });
    a.click();
    URL.revokeObjectURL(a.href);
  };

  view.replaceChildren(
    pageHead('Appointment requests', 'Requests sent from the booking forms on your website.',
      h('button', { class: 'btn ghost', type: 'button', onclick: exportCsv }, ic('download'), 'Export CSV')),
    h('div', { class: 'toolbar' }, tabs, h('label', { class: 'search' }, ic('search'), searchInput)),
    list,
  );

  const visible = () =>
    rows.filter((r) => !search || `${r.name} ${r.phone} ${r.email || ''}`.toLowerCase().includes(search));

  async function load() {
    sessionStorage.setItem('apptFilter', filter);
    tabs.replaceChildren(
      ...['', ...statuses].map((s) =>
        h('button', { type: 'button', class: `tab ${filter === s ? 'on' : ''}`, onclick: () => { filter = s; load(); } }, s || 'All')),
    );
    list.replaceChildren(h('div', { class: 'loading' }, 'Loading…'));
    rows = await api(`/appointments${filter ? `?status=${filter}` : ''}`);
    draw();
  }

  function draw() {
    const items = visible();
    if (!items.length) {
      list.replaceChildren(empty(filter || search ? 'No requests match this filter.' : 'No appointment requests yet.'));
      return;
    }
    list.replaceChildren(...items.map(card));
  }

  function card(r) {
    const status = h('select', { class: `status-select s-${r.status}`, 'aria-label': 'Status', onchange: async (e) => {
      const v = e.target.value;
      try {
        await api(`/appointments/${r.id}`, { method: 'PATCH', body: { status: v } });
        r.status = v;
        e.target.className = `status-select s-${v}`;
        toast(`Marked as ${v}`);
        refreshBadge();
        if (filter && filter !== v) load();
      } catch (ex) {
        toast(ex.message, 'err');
      }
    } }, statuses.map((s) => h('option', { value: s }, s)));
    status.value = r.status;

    const notes = h('textarea', { rows: 2, placeholder: 'Private notes (e.g. called, booked for Tue 5 PM)…' });
    notes.value = r.notes || '';
    notes.addEventListener('change', async () => {
      try {
        await api(`/appointments/${r.id}`, { method: 'PATCH', body: { notes: notes.value } });
        toast('Notes saved');
      } catch (ex) {
        toast(ex.message, 'err');
      }
    });

    const wa = waNumber(r.phone);
    return h('article', { class: `appt s-${r.status}` },
      h('div', { class: 'appt-main' },
        h('div', { class: 'appt-who' },
          h('strong', null, r.name),
          h('div', { class: 'appt-contact' },
            h('a', { href: `tel:${r.phone}` }, ic('phone'), r.phone),
            wa ? h('a', { href: `https://wa.me/${wa}`, target: '_blank', rel: 'noopener', class: 'wa' }, ic('whatsapp'), 'WhatsApp') : null,
            r.email ? h('a', { href: `mailto:${r.email}` }, ic('mail'), r.email) : null,
          ),
        ),
        h('dl', { class: 'appt-meta' },
          h('div', null, h('dt', null, 'Service'), h('dd', null, r.service || '—')),
          r.branch ? h('div', null, h('dt', null, 'Branch'), h('dd', null, r.branch)) : null,
          h('div', null, h('dt', null, 'Preferred'), h('dd', null, [r.preferred_date && fmtDate(r.preferred_date), r.preferred_time].filter(Boolean).join(', ') || 'Any time')),
          h('div', null, h('dt', null, 'Received'), h('dd', null, fmtDateTime(r.created_at))),
        ),
        r.message ? h('p', { class: 'appt-msg' }, r.message) : null,
      ),
      h('div', { class: 'appt-side' },
        status,
        notes,
        h('button', { class: 'btn ghost sm danger-text', type: 'button', onclick: async () => {
          if (!(await confirmBox(`Delete the request from ${r.name}? This cannot be undone.`))) return;
          await api(`/appointments/${r.id}`, { method: 'DELETE' });
          toast('Request deleted');
          rows = rows.filter((x) => x.id !== r.id);
          draw();
          refreshBadge();
        } }, ic('trash'), 'Delete'),
      ),
    );
  }

  await load();
}

// ---------- Collections ----------
const entryTitle = (def, e) => e.data[def.titleField] || e.data.title || e.data.name || `Untitled ${def.singular}`;
const entrySubtitle = (key, d) =>
  ({
    services: d.summary, conditions: d.short, team: d.role, testimonials: d.condition, faqs: d.answer,
    posts: d.date, branches: d.address, gallery: d.category, process: d.text, features: d.text,
  })[key] || '';

async function viewCollection(view, key) {
  const def = schema.collections.find((c) => c.key === key);
  if (!def) return view.replaceChildren(empty('Unknown section'));
  setTitle(def.label);
  let items = await api(`/entries/${key}`);
  const list = h('div', { class: 'entry-list' });

  view.replaceChildren(
    pageHead(def.label, `${items.length} ${items.length === 1 ? def.singular : `${def.singular}s`} · change the order with the arrows. Hidden items are not shown on the website.`,
      h('a', { class: 'btn primary', href: `#/c/${key}/new` }, ic('plus'), `Add ${def.singular}`)),
    list,
  );

  const thumbField = def.fields.find((f) => f.type === 'image');

  async function move(i, dir) {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    [items[i], items[j]] = [items[j], items[i]];
    draw();
    try {
      await api(`/entries/${key}/order`, { method: 'POST', body: { ids: items.map((x) => x.id) } });
    } catch (ex) {
      toast(ex.message, 'err');
    }
  }

  function draw() {
    if (!items.length) {
      list.replaceChildren(empty(`No ${def.singular}s yet.`, h('a', { class: 'btn primary', href: `#/c/${key}/new` }, ic('plus'), `Add ${def.singular}`)));
      return;
    }
    list.replaceChildren(
      ...items.map((e, i) => {
        const toggle = h('input', { type: 'checkbox', checked: e.published, 'aria-label': 'Show on website' });
        toggle.addEventListener('change', async () => {
          try {
            await api(`/entries/${key}/${e.id}`, { method: 'PUT', body: { data: e.data, published: toggle.checked } });
            e.published = toggle.checked;
            row.classList.toggle('hidden-entry', !e.published);
            toast(toggle.checked ? 'Now visible on the website' : 'Hidden from the website');
          } catch (ex) {
            toggle.checked = !toggle.checked;
            toast(ex.message, 'err');
          }
        });
        const thumb = thumbField && e.data[thumbField.name];
        const viewUrl = def.path && e.slug && siteLink(def.path + e.slug);
        const row = h('div', { class: `entry ${e.published ? '' : 'hidden-entry'}` },
          h('div', { class: 'order' },
            h('button', { class: 'icon-btn xs', type: 'button', 'aria-label': 'Move up', disabled: i === 0, onclick: () => move(i, -1) }, ic('up')),
            h('button', { class: 'icon-btn xs flip', type: 'button', 'aria-label': 'Move down', disabled: i === items.length - 1, onclick: () => move(i, 1) }, ic('up')),
          ),
          thumb ? h('img', { class: 'entry-thumb', src: thumb, alt: '' }) : h('span', { class: 'entry-thumb ph', html: svg(e.data.icon || COLLECTION_ICONS[key] || 'list') }),
          h('a', { class: 'entry-text', href: `#/c/${key}/${e.id}` },
            h('strong', null, entryTitle(def, e)),
            h('small', null, String(entrySubtitle(key, e.data) || '').slice(0, 120)),
          ),
          h('label', { class: 'switch', title: 'Show on website' }, toggle, h('span', { class: 'slider' }), h('span', { class: 'switch-label hide-sm' }, e.published ? 'Visible' : 'Hidden')),
          h('div', { class: 'entry-actions' },
            viewUrl ? h('a', { class: 'icon-btn', href: viewUrl, target: '_blank', rel: 'noopener', title: 'View on website', 'aria-label': 'View on website' }, ic('external')) : null,
            h('a', { class: 'icon-btn', href: `#/c/${key}/${e.id}`, title: 'Edit', 'aria-label': 'Edit' }, ic('edit')),
            h('button', { class: 'icon-btn danger-text', type: 'button', title: 'Delete', 'aria-label': 'Delete', onclick: async () => {
              if (!(await confirmBox(`Delete “${entryTitle(def, e)}”? This cannot be undone.`))) return;
              await api(`/entries/${key}/${e.id}`, { method: 'DELETE' });
              items = items.filter((x) => x.id !== e.id);
              toast('Deleted');
              draw();
            } }, ic('trash')),
          ),
        );
        toggle.addEventListener('change', () => (row.querySelector('.switch-label').textContent = toggle.checked ? 'Visible' : 'Hidden'));
        return row;
      }),
    );
  }
  draw();
}

async function viewEntry(view, key, id) {
  const def = schema.collections.find((c) => c.key === key);
  if (!def) return view.replaceChildren(empty('Unknown section'));
  const entry = id ? await api(`/entries/${key}/${id}`) : { data: {}, published: true };
  const title = id ? entryTitle(def, entry) : `New ${def.singular}`;
  setTitle(def.label);

  const form = buildForm(def.fields, entry.data);
  const published = h('input', { type: 'checkbox', checked: entry.published });
  published.addEventListener('change', () => (dirty = true));
  const saveBtn = h('button', { class: 'btn primary block', type: 'submit' }, 'Save');
  const viewUrl = def.path && entry.slug ? siteLink(def.path + entry.slug) : '';

  const el = h('form', { class: 'editor', novalidate: true, onsubmit: async (e) => {
    e.preventDefault();
    saveBtn.disabled = true;
    saveBtn.textContent = 'Saving…';
    try {
      const body = { data: form.getData(), published: published.checked };
      const res = id
        ? await api(`/entries/${key}/${id}`, { method: 'PUT', body })
        : await api(`/entries/${key}`, { method: 'POST', body });
      dirty = false;
      toast('Saved — the website is updated');
      if (!id) location.hash = `#/c/${key}/${res.id}`;
      else route();
    } catch (ex) {
      toast(ex.message, 'err');
      saveBtn.disabled = false;
      saveBtn.textContent = 'Save';
    }
  } },
    h('div', { class: 'editor-main panel' }, form.el),
    h('aside', { class: 'editor-side' },
      h('div', { class: 'panel sticky' },
        h('label', { class: 'switch big' }, published, h('span', { class: 'slider' }), h('span', null, 'Show on website')),
        saveBtn,
        viewUrl ? h('a', { class: 'btn ghost block', href: viewUrl, target: '_blank', rel: 'noopener' }, ic('external'), 'View on website') : null,
        id ? h('button', { class: 'btn ghost block danger-text', type: 'button', onclick: async () => {
          if (!(await confirmBox(`Delete “${title}”? This cannot be undone.`))) return;
          await api(`/entries/${key}/${id}`, { method: 'DELETE' });
          dirty = false;
          toast('Deleted');
          location.hash = `#/c/${key}`;
        } }, ic('trash'), 'Delete') : null,
      ),
    ),
  );
  el.addEventListener('input', () => (dirty = true));

  view.replaceChildren(
    h('a', { class: 'back', href: `#/c/${key}` }, '← ', def.label),
    pageHead(title, id ? null : `Fill in the details and press Save.`),
    el,
  );
}

// ---------- Settings ----------
async function viewSettings(view, key) {
  const def = schema.settings.find((s) => s.key === key);
  if (!def) return view.replaceChildren(empty('Unknown settings'));
  setTitle(def.label);
  const all = await api('/settings');
  const form = buildForm(def.fields, all[key] || {});
  const saveBtn = h('button', { class: 'btn primary', type: 'submit' }, 'Save changes');

  const el = h('form', { class: 'settings-form', novalidate: true, onsubmit: async (e) => {
    e.preventDefault();
    saveBtn.disabled = true;
    saveBtn.textContent = 'Saving…';
    try {
      await api(`/settings/${key}`, { method: 'PUT', body: { data: form.getData() } });
      dirty = false;
      toast('Saved — the website is updated');
    } catch (ex) {
      toast(ex.message, 'err');
    } finally {
      saveBtn.disabled = false;
      saveBtn.textContent = 'Save changes';
    }
  } },
    h('div', { class: 'panel' }, form.el),
    h('div', { class: 'save-bar' }, h('span', { class: 'muted small' }, 'Changes appear on the website as soon as you save.'), saveBtn),
  );
  el.addEventListener('input', () => (dirty = true));

  view.replaceChildren(pageHead(def.label, `${def.group} settings`, siteLink() ? h('a', { class: 'btn ghost', href: siteLink(), target: '_blank', rel: 'noopener' }, ic('external'), 'View website') : null), el);
}

// ---------- Form builder ----------
let fieldSeq = 0;

function buildForm(fields, data) {
  const controls = [];
  const el = h('div', { class: 'form-grid' });
  for (const f of fields) {
    if (f.type === 'heading') {
      el.append(h('h3', { class: 'form-heading' }, f.label));
      continue;
    }
    const c = fieldControl(f, data?.[f.name]);
    controls.push([f.name, c]);
    el.append(c.el);
  }
  return {
    el,
    getData: () => Object.fromEntries(controls.map(([name, c]) => [name, c.get()])),
  };
}

const WIDE = new Set(['textarea', 'markdown', 'list', 'repeater', 'image']);
const INPUT_TYPES = { url: 'url', email: 'email', tel: 'tel', date: 'date', number: 'number', text: 'text' };

function fieldControl(f, value) {
  const id = `f${++fieldSeq}`;
  let control;
  let get;

  switch (f.type) {
    case 'textarea':
    case 'markdown':
    case 'list': {
      const ta = h('textarea', { id, rows: f.type === 'markdown' ? 12 : f.type === 'list' ? 6 : 3, class: f.type === 'markdown' ? 'mono' : '' });
      ta.value = f.type === 'list' ? (Array.isArray(value) ? value : []).join('\n') : value ?? '';
      get = () => (f.type === 'list' ? ta.value.split('\n').map((s) => s.trim()).filter(Boolean) : ta.value);
      control = ta;
      break;
    }
    case 'boolean': {
      const cb = h('input', { id, type: 'checkbox', checked: value === true });
      get = () => cb.checked;
      control = h('label', { class: 'switch' }, cb, h('span', { class: 'slider' }), h('span', null, f.label));
      return { el: h('div', { class: 'field' }, control, f.help ? h('p', { class: 'help' }, f.help) : null), get };
    }
    case 'select': {
      const sel = h('select', { id }, h('option', { value: '' }, '— Choose —'), (f.options || []).map((o) => h('option', { value: o }, o)));
      sel.value = value ?? '';
      get = () => sel.value;
      if (f.name === 'icon') {
        const preview = h('span', { class: 'icon-preview', html: svg(sel.value) });
        sel.addEventListener('change', () => (preview.innerHTML = svg(sel.value)));
        control = h('div', { class: 'with-preview' }, preview, sel);
      } else control = sel;
      break;
    }
    case 'color': {
      const txt = h('input', { id, type: 'text', value: value || '', placeholder: '#000000', pattern: '#[0-9a-fA-F]{3,8}' });
      const pick = h('input', { type: 'color', value: /^#[0-9a-f]{6}$/i.test(value || '') ? value : '#000000', 'aria-label': `${f.label} picker` });
      pick.addEventListener('input', () => {
        txt.value = pick.value;
        txt.dispatchEvent(new Event('input', { bubbles: true }));
      });
      txt.addEventListener('input', () => /^#[0-9a-f]{6}$/i.test(txt.value) && (pick.value = txt.value));
      get = () => txt.value.trim();
      control = h('div', { class: 'color-field' }, pick, txt);
      break;
    }
    case 'image': {
      const r = imageField(id, value);
      control = r.el;
      get = r.get;
      break;
    }
    case 'repeater': {
      const r = repeaterField(f, value);
      control = r.el;
      get = r.get;
      break;
    }
    default: {
      const input = h('input', { id, type: INPUT_TYPES[f.type] || 'text', value: value ?? '' });
      if (f.type === 'number') input.step = 'any';
      get = () => input.value.trim();
      control = input;
    }
  }

  return {
    el: h('div', { class: `field ${WIDE.has(f.type) ? 'wide' : ''}` },
      h('label', { class: 'label', for: id }, f.label, f.required ? h('span', { class: 'req' }, ' *') : null),
      control,
      f.type === 'markdown'
        ? h('p', { class: 'help' }, 'Formatting: ## Heading · - bullet point · 1. numbered list · **bold** · *italic* · [link text](https://…) · leave an empty line between paragraphs.')
        : null,
      f.help ? h('p', { class: 'help' }, f.help) : null,
    ),
    get,
  };
}

function imageField(id, value) {
  const input = h('input', { id, type: 'text', placeholder: 'Upload an image or paste an image link', value: value || '' });
  const preview = h('div', { class: 'img-preview' });
  const file = h('input', { type: 'file', accept: 'image/png,image/jpeg,image/webp,image/gif,image/avif', hidden: true });

  const show = () => {
    const v = input.value.trim();
    preview.replaceChildren(v ? h('img', { src: v, alt: '', onerror: (e) => e.target.replaceWith(h('span', { class: 'muted small' }, 'Preview unavailable')) }) : h('span', { class: 'ph', html: svg('image') }));
    remove.hidden = !v;
  };
  const set = (v) => {
    input.value = v;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    show();
  };
  input.addEventListener('change', show);

  const uploadBtn = h('button', { class: 'btn ghost sm', type: 'button', onclick: () => file.click() }, ic('upload'), 'Upload');
  file.addEventListener('change', async () => {
    if (!file.files[0]) return;
    uploadBtn.disabled = true;
    uploadBtn.lastChild.textContent = 'Uploading…';
    try {
      const fd = new FormData();
      fd.append('file', file.files[0]);
      const res = await api('/media', { method: 'POST', form: fd });
      set(res.url);
      toast('Image uploaded');
    } catch (ex) {
      toast(ex.message, 'err');
    } finally {
      uploadBtn.disabled = false;
      uploadBtn.lastChild.textContent = 'Upload';
      file.value = '';
    }
  });
  const remove = h('button', { class: 'btn ghost sm danger-text', type: 'button', onclick: () => set('') }, 'Remove');

  const el = h('div', { class: 'image-field' },
    preview,
    h('div', { class: 'image-controls' },
      input,
      h('div', { class: 'btn-row' },
        uploadBtn,
        h('button', { class: 'btn ghost sm', type: 'button', onclick: async () => { const url = await pickMedia(); if (url) set(url); } }, ic('image'), 'Choose from library'),
        remove,
      ),
      file,
    ),
  );
  show();
  return { el, get: () => input.value.trim() };
}

function repeaterField(f, value) {
  const rowsEl = h('div', { class: 'rep-rows' });
  const rows = [];

  const addRow = (data = {}) => {
    const inputs = f.fields.map((sf) => {
      const input = h('input', { type: 'text', value: data[sf.name] ?? '', placeholder: sf.label, 'aria-label': sf.label });
      return [sf.name, input];
    });
    const row = { inputs };
    const el = h('div', { class: 'rep-row' },
      inputs.map(([, input]) => input),
      h('div', { class: 'rep-actions' },
        h('button', { class: 'icon-btn xs', type: 'button', 'aria-label': 'Move up', onclick: () => moveRow(row, -1) }, ic('up')),
        h('button', { class: 'icon-btn xs flip', type: 'button', 'aria-label': 'Move down', onclick: () => moveRow(row, 1) }, ic('up')),
        h('button', { class: 'icon-btn xs danger-text', type: 'button', 'aria-label': 'Remove row', onclick: () => {
          rows.splice(rows.indexOf(row), 1);
          el.remove();
          rowsEl.dispatchEvent(new Event('input', { bubbles: true }));
        } }, ic('trash')),
      ),
    );
    row.el = el;
    rows.push(row);
    rowsEl.append(el);
  };

  const moveRow = (row, dir) => {
    const i = rows.indexOf(row);
    const j = i + dir;
    if (j < 0 || j >= rows.length) return;
    [rows[i], rows[j]] = [rows[j], rows[i]];
    rowsEl.replaceChildren(...rows.map((r) => r.el));
    rowsEl.dispatchEvent(new Event('input', { bubbles: true }));
  };

  (Array.isArray(value) ? value : []).forEach(addRow);
  const el = h('div', { class: 'repeater' },
    h('div', { class: 'rep-head' }, f.fields.map((sf) => h('span', null, sf.label)), h('span')),
    rowsEl,
    h('button', { class: 'btn ghost sm', type: 'button', onclick: () => { addRow(); rowsEl.dispatchEvent(new Event('input', { bubbles: true })); } }, ic('plus'), 'Add row'),
  );
  el.style.setProperty('--cols', f.fields.length);
  return {
    el,
    get: () => rows.map((r) => Object.fromEntries(r.inputs.map(([n, i]) => [n, i.value.trim()]))).filter((r) => Object.values(r).some(Boolean)),
  };
}

// ---------- Media ----------
async function uploadFiles(files) {
  let ok = 0;
  for (const f of files) {
    const fd = new FormData();
    fd.append('file', f);
    try {
      await api('/media', { method: 'POST', form: fd });
      ok++;
    } catch (ex) {
      toast(`${f.name}: ${ex.message}`, 'err');
    }
  }
  if (ok) toast(`${ok} image${ok > 1 ? 's' : ''} uploaded`);
}

function dropZone(onFiles) {
  const input = h('input', { type: 'file', accept: 'image/png,image/jpeg,image/webp,image/gif,image/avif', multiple: true, hidden: true });
  const zone = h('div', { class: 'dropzone', tabindex: 0, role: 'button', onclick: () => input.click(), onkeydown: (e) => (e.key === 'Enter' || e.key === ' ') && input.click() },
    ic('upload', 'i big'),
    h('strong', null, 'Click to upload or drag photos here'),
    h('span', { class: 'muted small' }, 'JPG, PNG, WebP or GIF · up to 5 MB each'),
    input,
  );
  input.addEventListener('change', () => input.files.length && onFiles([...input.files]));
  zone.addEventListener('dragover', (e) => { e.preventDefault(); zone.classList.add('over'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('over'));
  zone.addEventListener('drop', (e) => {
    e.preventDefault();
    zone.classList.remove('over');
    if (e.dataTransfer.files.length) onFiles([...e.dataTransfer.files]);
  });
  return zone;
}

async function viewMedia(view) {
  setTitle('Photos & images');
  const grid = h('div', { class: 'media-grid' });

  async function load() {
    const items = await api('/media');
    if (!items.length) return grid.replaceChildren(empty('No images uploaded yet.'));
    grid.replaceChildren(...items.map((m) =>
      h('figure', { class: 'media-item' },
        h('img', { src: m.url, alt: m.filename || '', loading: 'lazy' }),
        h('figcaption', null,
          h('span', { class: 'media-name', title: m.filename }, m.filename || m.id),
          h('small', null, fmtSize(m.size)),
          h('div', { class: 'media-actions' },
            h('button', { class: 'icon-btn xs', type: 'button', title: 'Copy image link', 'aria-label': 'Copy image link', onclick: async () => {
              await navigator.clipboard.writeText(m.url).catch(() => {});
              toast('Image link copied');
            } }, ic('copy')),
            h('button', { class: 'icon-btn xs danger-text', type: 'button', title: 'Delete', 'aria-label': 'Delete', onclick: async () => {
              if (!(await confirmBox('Delete this image? Any page using it will show an empty space.'))) return;
              await api(`/media/${m.id}`, { method: 'DELETE' });
              toast('Image deleted');
              load();
            } }, ic('trash')),
          ),
        ),
      )));
  }

  view.replaceChildren(
    pageHead('Photos & images', 'Upload clinic photos, team pictures and your logo. Then choose them from any image field.'),
    dropZone(async (files) => {
      await uploadFiles(files);
      load();
    }),
    grid,
  );
  await load();
}

function pickMedia() {
  return new Promise(async (resolve) => {
    const grid = h('div', { class: 'media-grid picker' }, h('div', { class: 'loading' }, 'Loading…'));
    const dlg = h('dialog', { class: 'modal' },
      h('div', { class: 'modal-head' }, h('h2', null, 'Choose an image'), h('button', { class: 'icon-btn', type: 'button', 'aria-label': 'Close', onclick: () => done(null) }, ic('close'))),
      dropZone(async (files) => {
        await uploadFiles(files);
        load();
      }),
      grid,
    );
    const done = (v) => {
      dlg.close();
      dlg.remove();
      resolve(v);
    };
    dlg.addEventListener('cancel', () => done(null));
    document.body.append(dlg);
    dlg.showModal();

    async function load() {
      const items = await api('/media');
      if (!items.length) return grid.replaceChildren(empty('No images yet — upload one above.'));
      grid.replaceChildren(...items.map((m) =>
        h('button', { class: 'media-pick', type: 'button', onclick: () => done(m.url) }, h('img', { src: m.url, alt: m.filename || '' }))));
    }
    load();
  });
}

// ---------- Account ----------
async function viewAccount(view) {
  setTitle('Account');
  const current = h('input', { type: 'password', autocomplete: 'current-password', required: true });
  const next = h('input', { type: 'password', autocomplete: 'new-password', required: true, minlength: 10 });
  const again = h('input', { type: 'password', autocomplete: 'new-password', required: true });
  const btn = h('button', { class: 'btn primary', type: 'submit' }, 'Change password');

  view.replaceChildren(
    pageHead('Account', `Logged in as ${me.user.username}`),
    h('form', { class: 'panel narrow', onsubmit: async (e) => {
      e.preventDefault();
      if (next.value !== again.value) return toast('The new passwords do not match', 'err');
      btn.disabled = true;
      try {
        await api('/password', { method: 'POST', body: { current: current.value, next: next.value } });
        toast('Password changed');
        e.target.reset();
      } catch (ex) {
        toast(ex.message, 'err');
      } finally {
        btn.disabled = false;
      }
    } },
      h('h2', null, 'Change password'),
      h('p', { class: 'muted small' }, 'Use at least 10 characters. Other devices will be logged out.'),
      h('div', { class: 'form-grid one' },
        h('label', { class: 'field' }, h('span', { class: 'label' }, 'Current password'), current),
        h('label', { class: 'field' }, h('span', { class: 'label' }, 'New password'), next),
        h('label', { class: 'field' }, h('span', { class: 'label' }, 'Repeat new password'), again),
      ),
      btn,
    ),
    h('div', { class: 'panel narrow' },
      h('h2', null, 'Log out'),
      h('p', { class: 'muted small' }, 'End your session on this device.'),
      h('button', { class: 'btn ghost', type: 'button', onclick: logout }, ic('logout'), 'Log out'),
    ),
  );
}

boot();
