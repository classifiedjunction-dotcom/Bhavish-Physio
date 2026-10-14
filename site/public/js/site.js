// Website interactions: mobile menu, sticky header, review carousel, booking forms, gallery lightbox.
(() => {
  const root = document.documentElement;

  // Mobile menu
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  toggle?.addEventListener('click', () => {
    const open = !document.body.classList.contains('nav-open');
    // The panel is fixed; start it just below the header wherever the page is scrolled.
    if (open && nav) nav.style.top = `${Math.max(0, document.querySelector('.site-header').getBoundingClientRect().bottom)}px`;
    document.body.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  document.querySelectorAll('.sub-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const sub = btn.nextElementSibling;
      const open = !sub.classList.contains('open');
      sub.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', String(open));
    });
  });
  document.querySelectorAll('.nav a').forEach((a) =>
    a.addEventListener('click', () => {
      if (a.getAttribute('href')?.includes('#')) document.body.classList.remove('nav-open');
    }),
  );

  // Header shadow on scroll
  const header = document.querySelector('.site-header');
  const onScroll = () => header?.classList.toggle('scrolled', window.scrollY > 10);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        }),
      { rootMargin: '0px 0px -8% 0px' },
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('in'));
  }

  // Review carousel
  document.querySelectorAll('[data-carousel]').forEach((c) => {
    const track = c.querySelector('.carousel-track');
    const step = () => (track.firstElementChild?.getBoundingClientRect().width || 300) + 24;
    c.querySelector('[data-prev]')?.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
    c.querySelector('[data-next]')?.addEventListener('click', () => {
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 10;
      track.scrollTo({ left: atEnd ? 0 : track.scrollLeft + step(), behavior: 'smooth' });
    });
  });

  // Date inputs: no past dates
  const today = new Date();
  const iso = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  document.querySelectorAll('input[data-min-today]').forEach((i) => (i.min = iso));

  // Booking forms
  document.querySelectorAll('form[data-booking]').forEach((form) => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const status = form.querySelector('.form-status');
      const button = form.querySelector('button[type=submit]');
      const data = Object.fromEntries(new FormData(form));
      status.className = 'form-status';
      if (!form.reportValidity()) return;

      button.disabled = true;
      const label = button.innerHTML;
      button.textContent = 'Sending…';
      try {
        const res = await fetch('/api/appointments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const body = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(body.error || 'Something went wrong. Please call us instead.');
        status.textContent = form.dataset.success || 'Thank you! We will call you shortly.';
        status.classList.add('ok');
        form.classList.add('sent');
        form.reset();
      } catch (err) {
        status.textContent = err.message;
        status.classList.add('err');
      } finally {
        button.disabled = false;
        button.innerHTML = label;
      }
    });
  });

  // Gallery lightbox
  const box = document.getElementById('lightbox');
  if (box && typeof box.showModal === 'function') {
    const img = box.querySelector('img');
    const cap = box.querySelector('p');
    document.querySelectorAll('[data-lightbox]').forEach((btn) =>
      btn.addEventListener('click', () => {
        img.src = btn.dataset.lightbox;
        img.alt = btn.dataset.caption || '';
        cap.textContent = btn.dataset.caption || '';
        box.showModal();
      }),
    );
    box.querySelector('.lightbox-close').addEventListener('click', () => box.close());
    box.addEventListener('click', (e) => e.target === box && box.close());
  }

  root.classList.add('ready');
})();
