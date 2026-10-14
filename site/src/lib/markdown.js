// Minimal, safe Markdown for admin-written content:
// ## headings, - bullet lists, 1. numbered lists, > quotes, **bold**, *italic*, [links](url).
// All text is escaped before formatting, so raw HTML in content is never rendered.

import { escape, safeUrl } from './html.js';

function inline(text) {
  return escape(text)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*\s][^*]*?)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, url) => {
      const href = safeUrl(url.replace(/&amp;/g, '&'));
      return href ? `<a href="${escape(href)}">${label}</a>` : label;
    });
}

export function markdown(src) {
  const out = [];
  let para = [];
  let list = null;

  const flushPara = () => {
    if (para.length) out.push(`<p>${inline(para.join(' '))}</p>`);
    para = [];
  };
  const flushList = () => {
    if (list) out.push(`<${list.tag}>${list.items.map((i) => `<li>${inline(i)}</li>`).join('')}</${list.tag}>`);
    list = null;
  };
  const addItem = (tag, item) => {
    flushPara();
    if (list?.tag !== tag) {
      flushList();
      list = { tag, items: [] };
    }
    list.items.push(item);
  };

  for (const rawLine of String(src ?? '').replace(/\r\n/g, '\n').split('\n')) {
    const line = rawLine.trim();
    let m;
    if (!line) {
      flushPara();
      flushList();
    } else if ((m = line.match(/^(#{2,4})\s+(.*)$/))) {
      flushPara();
      flushList();
      out.push(`<h${m[1].length}>${inline(m[2])}</h${m[1].length}>`);
    } else if ((m = line.match(/^[-*]\s+(.*)$/))) {
      addItem('ul', m[1]);
    } else if ((m = line.match(/^\d+[.)]\s+(.*)$/))) {
      addItem('ol', m[1]);
    } else if ((m = line.match(/^>\s?(.*)$/))) {
      flushPara();
      flushList();
      out.push(`<blockquote>${inline(m[1])}</blockquote>`);
    } else {
      flushList();
      para.push(line);
    }
  }
  flushPara();
  flushList();
  return out.join('\n');
}

// Plain-text version (for meta descriptions).
export function plainText(src, max = 160) {
  const t = String(src ?? '')
    .replace(/[#>*_[\]()-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return t.length > max ? t.slice(0, max - 1).trimEnd() + '…' : t;
}
