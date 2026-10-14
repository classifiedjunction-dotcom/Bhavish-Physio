// Tiny HTML templating: html`...` escapes every interpolated value unless it is wrapped in raw().
// Arrays are joined, and null / undefined / false render as nothing.

const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export const escape = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ESC[c]);

class Raw {
  constructor(v) {
    this.v = v;
  }
  toString() {
    return this.v;
  }
}

export const raw = (v) => new Raw(String(v ?? ''));

const render = (v) => {
  if (v == null || v === false) return '';
  if (v instanceof Raw) return v.v;
  if (Array.isArray(v)) return v.map(render).join('');
  return escape(v);
};

export function html(strings, ...values) {
  let out = strings[0];
  values.forEach((v, i) => {
    out += render(v) + strings[i + 1];
  });
  return new Raw(out);
}

// Only allow links that cannot run script.
export function safeUrl(url) {
  const u = String(url ?? '').trim();
  if (!u) return '';
  if (/^(https?:|mailto:|tel:|\/|#)/i.test(u)) return u;
  return '';
}

// Turn multi-line text into lines separated by <br>.
export const lines = (text) =>
  raw(
    String(text ?? '')
      .split(/\r?\n/)
      .map(escape)
      .join('<br>'),
  );
