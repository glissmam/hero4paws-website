/* Hero4Paws - kleine Helfer, kein Framework nötig */

// ---------- Mobile Navigation ----------
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });

  nav.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;
    if (link.parentElement.classList.contains('has-drop')) return;
    if (window.innerWidth <= 1180) {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document
        .querySelectorAll('.has-drop.open')
        .forEach((d) => d.classList.remove('open'));
    }
  });
}

// ---------- Dropdowns auf Touch: erster Tipp öffnet ----------
document.querySelectorAll('.has-drop > .nav-link').forEach((trigger) => {
  trigger.addEventListener('click', (e) => {
    if (window.innerWidth <= 1180) {
      e.preventDefault();
      const parent = trigger.parentElement;
      parent.classList.toggle('open');
    }
  });
});

// ---------- Galerie-Lightbox ----------
(function () {
  const links = Array.from(document.querySelectorAll('[data-lightbox] a, a[data-lightbox]'));
  if (!links.length) return;

  const box = document.createElement('div');
  box.className = 'lightbox';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.setAttribute('aria-label', 'Bildergalerie');
  box.innerHTML =
    '<button class="lb-close" aria-label="Schließen">&times;</button>' +
    '<button class="lb-prev" aria-label="Vorheriges Bild">&#8592;</button>' +
    '<img alt="">' +
    '<button class="lb-next" aria-label="Nächstes Bild">&#8594;</button>' +
    '<div class="lb-count"></div>';
  document.body.appendChild(box);

  const img = box.querySelector('img');
  const counter = box.querySelector('.lb-count');
  let index = 0;

  const items = links.map((a) => ({
    full: a.getAttribute('data-full') || a.getAttribute('href'),
    thumb: a.querySelector('img'),
  }));

  function show(i) {
    index = (i + items.length) % items.length;
    const item = items[index];
    img.src = item.full;
    img.alt = item.thumb ? item.thumb.alt : '';
    counter.textContent = `${index + 1} / ${items.length}`;
  }

  function open(i) {
    show(i);
    box.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    box.classList.remove('open');
    document.body.style.overflow = '';
  }

  links.forEach((a, i) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      open(i);
    });
  });

  box.querySelector('.lb-close').addEventListener('click', close);
  box.querySelector('.lb-prev').addEventListener('click', () => show(index - 1));
  box.querySelector('.lb-next').addEventListener('click', () => show(index + 1));
  box.addEventListener('click', (e) => {
    if (e.target === box) close();
  });
  document.addEventListener('keydown', (e) => {
    if (!box.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });
})();

// ---------- Formulare: Anfrage per E-Mail-Programm ----------
document.querySelectorAll('form[data-mailform]').forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const to = form.getAttribute('data-mailform');
    const data = new FormData(form);
    const lines = [];
    for (const [key, value] of data.entries()) {
      if (String(value).trim() === '') continue;
      lines.push(`${key}: ${value}`);
    }
    const subject = form.getAttribute('data-subject') || 'Anfrage über die Website';
    const body = lines.join('\n');
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
});
