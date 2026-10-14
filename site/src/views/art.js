// Placeholder illustration shown until an About photo is uploaded.
// Inline (not an <img>) so it picks up the theme colours set in the admin portal.
import { raw } from '../lib/html.js';

const P = 'var(--primary)';
const A = 'var(--accent)';
const mix = (color, pct, other = 'white') => `color-mix(in srgb, ${color} ${pct}%, ${other})`;

export const aboutArt = () =>
  raw(`<svg viewBox="0 0 400 430" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Illustration of a person stretching">
  <defs>
    <linearGradient id="art-bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" style="stop-color:${mix(P, 12)}"/>
      <stop offset="1" style="stop-color:${mix(A, 26)}"/>
    </linearGradient>
    <linearGradient id="art-arm" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0" style="stop-color:${A}"/>
      <stop offset="1" style="stop-color:${mix(A, 55, '#8fd3ff')}"/>
    </linearGradient>
    <pattern id="art-dots" width="16" height="16" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.6" style="fill:${P}" opacity=".14"/>
    </pattern>
  </defs>
  <rect width="400" height="430" style="fill:${mix(P, 5)}"/>
  <rect x="24" y="24" width="120" height="96" fill="url(#art-dots)"/>
  <rect x="270" y="320" width="110" height="90" fill="url(#art-dots)"/>
  <circle cx="205" cy="225" r="150" fill="url(#art-bg)"/>
  <circle cx="205" cy="225" r="176" fill="none" style="stroke:${A}" stroke-width="2" stroke-dasharray="3 11" stroke-linecap="round" opacity=".8"/>
  <ellipse cx="200" cy="378" rx="120" ry="11" style="fill:${P}" opacity=".1"/>
  <path d="M300 70a70 70 0 0 1 30 52" fill="none" style="stroke:${A}" stroke-width="5" stroke-linecap="round"/>
  <path d="M318 52a95 95 0 0 1 36 72" fill="none" style="stroke:${A}" stroke-width="5" stroke-linecap="round" opacity=".45"/>
  <g fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="M196 250 150 312 112 366" style="stroke:${P}" stroke-width="26"/>
    <path d="M196 250 252 302 268 366" style="stroke:${mix(P, 80)}" stroke-width="26"/>
    <path d="M216 152 152 208" style="stroke:${mix(P, 80)}" stroke-width="19"/>
    <path d="M224 140 200 250" style="stroke:${P}" stroke-width="36"/>
    <path d="M226 150 C 250 130 272 108 292 80" stroke="url(#art-arm)" stroke-width="19"/>
  </g>
  <circle cx="236" cy="104" r="25" style="fill:${P}"/>
  <circle cx="292" cy="78" r="11" style="fill:${A}"/>
  <g transform="translate(36 210)">
    <rect width="96" height="58" rx="14" fill="#fff"/>
    <polyline points="14 36 28 36 36 20 48 46 56 30 82 30" fill="none" style="stroke:${A}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <g transform="translate(286 170)">
    <rect width="78" height="78" rx="18" style="fill:${P}"/>
    <path d="M24 40l10 10 20-22" fill="none" style="stroke:${A}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>`);
