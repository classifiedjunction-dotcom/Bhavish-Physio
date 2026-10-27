// Content model shared by the admin portal (form builder + validation) and the website.
//
// Field types: text, textarea, markdown, number, url, email, tel, color, date,
// select (options), boolean, image, list (one item per line), repeater (fields), heading.
// "heading" is a visual divider in admin forms and stores no value.

import { ICON_NAMES } from './icons.js';

const icon = { name: 'icon', label: 'Icon', type: 'select', options: ICON_NAMES };
const slug = {
  name: 'slug',
  label: 'Page address (slug)',
  type: 'text',
  help: 'Lowercase words joined by dashes. Leave blank to create it from the title.',
};

// Sections shown on the home page. Their titles are reused as headings on inner pages.
export const HOME_SECTIONS = [
  ['services', 'Services'],
  ['about', 'About'],
  ['conditions', 'Conditions we treat'],
  ['process', 'How it works'],
  ['features', 'Why choose us'],
  ['testimonials', 'Patient reviews'],
  ['team', 'Team'],
  ['faqs', 'FAQs'],
  ['posts', 'Blog'],
];

export const SETTINGS = [
  {
    key: 'clinic',
    label: 'Clinic details',
    group: 'General',
    fields: [
      { name: 'name', label: 'Clinic name', type: 'text', required: true },
      { name: 'tagline', label: 'Tagline', type: 'text' },
      { name: 'logo', label: 'Logo', type: 'image', help: 'Optional. Leave empty to show the clinic name as text.' },
      { name: 'established', label: 'Year established', type: 'text' },
      { name: 'registration', label: 'Registration line', type: 'text', help: 'Shown in the footer, e.g. GST or clinic registration number.' },
    ],
  },
  {
    key: 'contact',
    label: 'Contact & hours',
    group: 'General',
    fields: [
      { name: 'phone', label: 'Phone number (as displayed)', type: 'tel', required: true },
      { name: 'whatsapp', label: 'WhatsApp number', type: 'tel', help: 'Digits only with country code, e.g. 919000000000' },
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'address', label: 'Address', type: 'textarea' },
      { name: 'city', label: 'City', type: 'text' },
      { name: 'mapEmbed', label: 'Google Maps embed link', type: 'url', help: 'Google Maps → Share → Embed a map → copy only the link inside src="…"' },
      { name: 'mapLink', label: 'Directions link', type: 'url', help: 'Google Maps → Share → Copy link' },
      {
        name: 'hours',
        label: 'Opening hours',
        type: 'repeater',
        fields: [
          { name: 'days', label: 'Days', type: 'text' },
          { name: 'time', label: 'Time', type: 'text' },
        ],
      },
    ],
  },
  {
    key: 'social',
    label: 'Social links',
    group: 'General',
    fields: [
      { name: 'facebook', label: 'Facebook', type: 'url' },
      { name: 'instagram', label: 'Instagram', type: 'url' },
      { name: 'youtube', label: 'YouTube', type: 'url' },
      { name: 'x', label: 'X (Twitter)', type: 'url' },
      { name: 'linkedin', label: 'LinkedIn', type: 'url' },
      { name: 'googleReviews', label: 'Google reviews page', type: 'url' },
    ],
  },
  {
    key: 'hero',
    label: 'Home banner',
    group: 'Home page',
    fields: [
      { name: 'badge', label: 'Small badge text', type: 'text' },
      { name: 'title', label: 'Headline (line 1)', type: 'text' },
      { name: 'highlight', label: 'Headline (line 2, highlighted)', type: 'text' },
      { name: 'subtitle', label: 'Intro text', type: 'textarea' },
      { name: 'primaryLabel', label: 'Main button text', type: 'text' },
      { name: 'secondaryLabel', label: 'WhatsApp button text', type: 'text' },
      { name: 'image', label: 'Banner photo', type: 'image', help: 'Optional. Without a photo, a quick booking card is shown instead.' },
    ],
  },
  {
    key: 'stats',
    label: 'Headline numbers',
    group: 'Home page',
    fields: [
      {
        name: 'items',
        label: 'Numbers',
        type: 'repeater',
        fields: [
          { name: 'value', label: 'Number', type: 'text' },
          { name: 'label', label: 'Label', type: 'text' },
        ],
      },
    ],
  },
  {
    key: 'sections',
    label: 'Section titles',
    group: 'Home page',
    fields: HOME_SECTIONS.flatMap(([k, label]) => [
      { type: 'heading', label },
      { name: `${k}Show`, label: 'Show on home page', type: 'boolean' },
      { name: `${k}Eyebrow`, label: 'Small label', type: 'text' },
      { name: `${k}Title`, label: 'Title', type: 'text' },
      { name: `${k}Intro`, label: 'Intro text', type: 'textarea' },
    ]),
  },
  {
    key: 'about',
    label: 'About & founder',
    group: 'Pages',
    fields: [
      { name: 'body', label: 'About text', type: 'markdown' },
      { name: 'points', label: 'Highlights (one per line)', type: 'list' },
      { name: 'image', label: 'About photo', type: 'image' },
      { type: 'heading', label: 'Founder' },
      { name: 'founderName', label: 'Name', type: 'text' },
      { name: 'founderRole', label: 'Role', type: 'text' },
      { name: 'founderQualifications', label: 'Qualifications', type: 'text' },
      { name: 'founderPhoto', label: 'Photo', type: 'image' },
      { name: 'founderBio', label: 'Biography', type: 'markdown' },
    ],
  },
  {
    key: 'booking',
    label: 'Booking form',
    group: 'Pages',
    fields: [
      { name: 'title', label: 'Title', type: 'text' },
      { name: 'intro', label: 'Intro text', type: 'textarea' },
      { name: 'services', label: 'Service options (one per line)', type: 'list' },
      { name: 'timeSlots', label: 'Time slots (one per line)', type: 'list' },
      { name: 'successMessage', label: 'Message after booking', type: 'textarea' },
    ],
  },
  {
    key: 'footer',
    label: 'Footer',
    group: 'Pages',
    fields: [
      { name: 'about', label: 'Short description', type: 'textarea' },
      { name: 'copyright', label: 'Copyright line', type: 'text', help: 'The year is added automatically.' },
    ],
  },
  {
    key: 'theme',
    label: 'Colours',
    group: 'Appearance',
    fields: [
      { name: 'primary', label: 'Main colour (dark)', type: 'color' },
      { name: 'accent', label: 'Highlight colour', type: 'color' },
      { name: 'background', label: 'Page background', type: 'color' },
    ],
  },
  {
    key: 'seo',
    label: 'Search & launch',
    group: 'Appearance',
    fields: [
      { name: 'metaTitle', label: 'Home page title (Google)', type: 'text' },
      { name: 'metaDescription', label: 'Home page description (Google)', type: 'textarea' },
      { name: 'ogImage', label: 'Share image (WhatsApp / Facebook preview)', type: 'image' },
      { type: 'heading', label: 'Launch' },
      { name: 'noindex', label: 'Hide website from Google (turn off at launch)', type: 'boolean' },
      { name: 'previewBanner', label: 'Show "preview" banner at the top', type: 'boolean' },
      { name: 'previewText', label: 'Preview banner text', type: 'text' },
    ],
  },
];

export const COLLECTIONS = [
  {
    key: 'services',
    label: 'Services',
    singular: 'service',
    titleField: 'title',
    path: '/services/',
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      slug,
      icon,
      { name: 'summary', label: 'Short summary', type: 'textarea' },
      { name: 'features', label: 'Key points (one per line)', type: 'list' },
      { name: 'image', label: 'Photo', type: 'image' },
      { name: 'body', label: 'Full description', type: 'markdown' },
    ],
  },
  {
    key: 'conditions',
    label: 'Conditions',
    singular: 'condition',
    titleField: 'title',
    path: '/conditions/',
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      slug,
      icon,
      { name: 'short', label: 'One-line description', type: 'text' },
      { name: 'summary', label: 'Summary', type: 'textarea' },
      { name: 'symptoms', label: 'Common symptoms (one per line)', type: 'list' },
      { name: 'treatments', label: 'How we treat it (one per line)', type: 'list' },
      { name: 'image', label: 'Photo', type: 'image' },
      { name: 'body', label: 'Full description', type: 'markdown' },
    ],
  },
  {
    key: 'process',
    label: 'Recovery steps',
    singular: 'step',
    titleField: 'title',
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'text', label: 'Description', type: 'textarea' },
    ],
  },
  {
    key: 'features',
    label: 'Why choose us',
    singular: 'point',
    titleField: 'title',
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      icon,
      { name: 'text', label: 'Description', type: 'textarea' },
    ],
  },
  {
    key: 'team',
    label: 'Team',
    singular: 'team member',
    titleField: 'name',
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'role', label: 'Role', type: 'text' },
      { name: 'specialty', label: 'Speciality', type: 'text' },
      { name: 'experience', label: 'Experience (e.g. 10+ yrs)', type: 'text' },
      { name: 'qualifications', label: 'Qualifications', type: 'text' },
      { name: 'photo', label: 'Photo', type: 'image' },
      { name: 'bio', label: 'Short biography', type: 'textarea' },
    ],
  },
  {
    key: 'testimonials',
    label: 'Reviews',
    singular: 'review',
    titleField: 'name',
    fields: [
      { name: 'name', label: 'Patient name', type: 'text', required: true },
      { name: 'condition', label: 'Treated for', type: 'text' },
      { name: 'text', label: 'Review', type: 'textarea', required: true },
      { name: 'rating', label: 'Stars (1–5)', type: 'number' },
      { name: 'when', label: 'When (e.g. 2 weeks ago)', type: 'text' },
    ],
  },
  {
    key: 'faqs',
    label: 'FAQs',
    singular: 'question',
    titleField: 'question',
    fields: [
      { name: 'question', label: 'Question', type: 'text', required: true },
      { name: 'answer', label: 'Answer', type: 'textarea' },
    ],
  },
  {
    key: 'posts',
    label: 'Blog posts',
    singular: 'post',
    titleField: 'title',
    path: '/blog/',
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      slug,
      { name: 'date', label: 'Date', type: 'date' },
      { name: 'author', label: 'Author', type: 'text' },
      { name: 'category', label: 'Category', type: 'text' },
      { name: 'excerpt', label: 'Short summary', type: 'textarea' },
      { name: 'cover', label: 'Cover photo', type: 'image' },
      { name: 'body', label: 'Article', type: 'markdown' },
    ],
  },
  {
    key: 'branches',
    label: 'Branches',
    singular: 'branch',
    titleField: 'name',
    path: '/branches/',
    fields: [
      { name: 'name', label: 'Branch name', type: 'text', required: true },
      slug,
      { name: 'address', label: 'Address', type: 'textarea' },
      { name: 'phone', label: 'Phone', type: 'tel' },
      { name: 'hours', label: 'Hours', type: 'text' },
      { name: 'mapEmbed', label: 'Google Maps embed link', type: 'url' },
      { name: 'mapLink', label: 'Directions link', type: 'url' },
      { name: 'image', label: 'Photo', type: 'image' },
      { name: 'description', label: 'Description', type: 'textarea' },
    ],
  },
];

export const SETTINGS_BY_KEY = Object.fromEntries(SETTINGS.map((s) => [s.key, s]));
export const COLLECTIONS_BY_KEY = Object.fromEntries(COLLECTIONS.map((c) => [c.key, c]));

export const APPOINTMENT_STATUSES = ['new', 'contacted', 'booked', 'completed', 'cancelled'];

export function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}
