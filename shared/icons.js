// Line icons (24x24, stroke-based). Used by the website and previewed in the admin portal.
// Names listed in ICON_NAMES are the ones admins can pick for services, conditions and features.

const P = {
  // Body & treatment icons (selectable)
  spine:
    '<rect x="9" y="2" width="6" height="3.6" rx="1.2"/><rect x="8.5" y="7.2" width="7" height="3.6" rx="1.2"/><rect x="8.5" y="12.4" width="7" height="3.6" rx="1.2"/><rect x="9" y="17.6" width="6" height="3.6" rx="1.2"/><path d="M5.5 9h2M16.5 9h2M5.5 14.2h2M16.5 14.2h2"/>',
  neck: '<circle cx="12" cy="6" r="3.5"/><path d="M10.2 9.2V12L5 14.5V21M13.8 9.2V12l5.2 2.5V21"/><path d="M9 6.5c1.8 1.2 4.2 1.2 6 0" opacity=".5"/>',
  shoulder: '<circle cx="9" cy="5" r="2.6"/><path d="M4 21v-7a4 4 0 0 1 4-4h3.5l6 -3.5"/><path d="M17.5 6.5 20 5"/><circle cx="11.5" cy="10" r="1.6"/>',
  knee: '<path d="M9 2v7.5a3 3 0 0 0 6 0V2"/><circle cx="12" cy="12.5" r="2.4"/><path d="M9.3 22v-5.5a2.7 2.7 0 0 1 5.4 0V22"/>',
  bone: '<path d="M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-7 7c-.7.7-1.69 0-2.5 0a2.5 2.5 0 0 0 0 5c.28 0 .5.22.5.5a2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5Z"/>',
  hand: '<path d="M18 11V6a2 2 0 0 0-4 0v5"/><path d="M14 10V4a2 2 0 0 0-4 0v6"/><path d="M10 10.5V6a2 2 0 0 0-4 0v8a8 8 0 0 0 16 0v-2a2 2 0 0 0-4 0"/>',
  foot: '<path d="M9 22c-2.6 0-4-2.2-4-5.5C5 12 6.5 8.5 9 8.5s3.5 2.4 3.5 5.5c0 2-.9 3.4-.9 5 0 1.8-1 3-2.6 3Z"/><circle cx="14.6" cy="5.2" r="1.4"/><circle cx="17.4" cy="7.6" r="1.2"/><circle cx="19" cy="10.8" r="1.1"/><circle cx="11.6" cy="3.6" r="1.4"/>',
  brain:
    '<path d="M12 5a3 3 0 0 0-5.6-1.4A3 3 0 0 0 3.5 7a3 3 0 0 0 .3 4.8A3.5 3.5 0 0 0 7 18a3 3 0 0 0 5 1.7V5Z"/><path d="M12 5a3 3 0 0 1 5.6-1.4A3 3 0 0 1 20.5 7a3 3 0 0 1-.3 4.8A3.5 3.5 0 0 1 17 18a3 3 0 0 1-5 1.7"/><path d="M8.5 9.5c1 .3 2 .1 2.6-.6M15.5 9.5c-1 .3-2 .1-2.6-.6M8 14c1.3 0 2.4-.6 3-1.6M16 14c-1.3 0-2.4-.6-3-1.6"/>',
  baby: '<circle cx="12" cy="8" r="5"/><path d="M10 8h.01M14 8h.01"/><path d="M10.4 10.3c.9.6 2.3.6 3.2 0"/><path d="M6.5 21a5.5 5.5 0 0 1 11 0"/>',
  activity: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
  heart: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
  posture: '<circle cx="12" cy="3.8" r="2"/><path d="M12 6.5v8.5M7.5 9.5 12 8l4.5 1.5M12 15l-3 6.5M12 15l3 6.5"/>',
  stethoscope:
    '<path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1"/><path d="M8 15v1a6 6 0 0 0 12 0v-3"/><circle cx="20" cy="11" r="2"/>',
  dumbbell: '<path d="M6.5 6.5v11M17.5 6.5v11M3.5 9v6M20.5 9v6M6.5 12h11"/>',
  zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>',
  award: '<circle cx="12" cy="8" r="6"/><polyline points="8.2 13 7 22 12 19.5 17 22 15.8 13"/>',
  users:
    '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  home: '<path d="M3 9.5 12 2l9 7.5V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  calendar:
    '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
  sparkles: '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M19 3v4M17 5h4M5 17v4M3 19h4"/>',
  trending: '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
  clipboard:
    '<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><path d="m9 14 2 2 4-4"/>',
  smile: '<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>',

  // Interface icons
  phone:
    '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
  mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  arrow: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  left: '<path d="m15 18-6-6 6-6"/>',
  right: '<path d="m9 18 6-6-6-6"/>',
  down: '<polyline points="6 9 12 15 18 9"/>',
  menu: '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>',
  close: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  quote:
    '<path d="M3 21c3 0 7-1 7-8V5c0-1.25-.76-2-2-2H4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 0-1 1v3c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.76-2-2-2h-4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>',
  image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>',
  whatsapp:
    '<path d="M3 21l1.65-4.8A8.5 8.5 0 1 1 7.8 19.4z"/><path d="M9 8.8c0 3 2.6 6 6 6.2l1.2-1.3-1.8-1-1 .8c-1-.4-2.1-1.5-2.5-2.5l.8-1-1-1.8L9.4 8.2"/>',
  facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
  instagram:
    '<rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>',
  youtube:
    '<path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>',
  x: '<path d="M4 4l16 16M20 4 4 20"/>',
  linkedin:
    '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
  google: '<path d="M21 12.2c0-.7-.1-1.3-.2-2H12v3.8h5a4.3 4.3 0 0 1-1.9 2.8v2.3h3A9 9 0 0 0 21 12.2Z"/><path d="M12 21c2.5 0 4.6-.8 6.1-2.2l-3-2.3a5.4 5.4 0 0 1-8.1-2.9H4v2.4A9 9 0 0 0 12 21Z"/><path d="M7 13.6a5.4 5.4 0 0 1 0-3.4V7.8H4a9 9 0 0 0 0 8.2Z"/><path d="M12 6.6c1.4 0 2.6.5 3.6 1.4l2.6-2.6A9 9 0 0 0 4 7.8l3 2.4a5.4 5.4 0 0 1 5-3.6Z"/>',
};

export const ICON_NAMES = [
  'spine', 'neck', 'shoulder', 'knee', 'bone', 'hand', 'foot', 'brain', 'baby', 'activity', 'heart',
  'posture', 'stethoscope', 'dumbbell', 'zap', 'target', 'shield', 'award', 'users', 'home', 'clock',
  'calendar', 'sparkles', 'trending', 'clipboard', 'smile',
];

export const ICON_PATHS = P;

export function iconSvg(name, cls = 'icon') {
  const body = P[name] || P.sparkles;
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
}
