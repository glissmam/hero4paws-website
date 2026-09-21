/* Layout-Bausteine für den Seiten-Generator (tools/generate.cjs)
   {r} in Links/Pfaden wird durch den relativen Root-Prefix ersetzt. */

const DRAFT_NOINDEX = true;

const ICONS = {
  paw: '<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="17" cy="38" r="10"/><circle cx="38" cy="22" r="11"/><circle cx="63" cy="22" r="11"/><circle cx="84" cy="38" r="9"/><path d="M50 42c15 0 27 12 27 26 0 11-8 19-19 19-4 0-6-1-8-3-2 2-4 3-8 3-11 0-19-8-19-19 0-14 12-26 27-26z"/></svg>',
  check:
    '<svg viewBox="0 0 512 512" aria-hidden="true"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>',
  arrow:
    '<svg viewBox="0 0 512 512" aria-hidden="true"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>',
  heart:
    '<svg viewBox="0 0 512 512" aria-hidden="true"><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>',
  pin:
    '<svg viewBox="0 0 512 512" aria-hidden="true"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>',
  phone:
    '<svg viewBox="0 0 512 512" aria-hidden="true"><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/></svg>',
  mail:
    '<svg viewBox="0 0 512 512" aria-hidden="true"><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg>',
  whatsapp:
    '<svg viewBox="0 0 448 512" aria-hidden="true"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>',
  clock:
    '<svg viewBox="0 0 512 512" aria-hidden="true"><path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/></svg>',
  calendar:
    '<svg viewBox="0 0 448 512" aria-hidden="true"><path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L64 64C28.7 64 0 92.7 0 128l0 16 0 48L0 448c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-256 0-48 0-16c0-35.3-28.7-64-64-64l-40 0 0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L152 64l0-40zM48 192l352 0 0 256c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256z"/></svg>',
  users:
    '<svg viewBox="0 0 640 512" aria-hidden="true"><path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192l42.7 0c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0L42.7 320C19.1 320 0 300.9 0 277.3l0-21.3zM320 176a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM186.1 469.3c-5.2-13.7-8.1-28.3-8.1-43.4c0-34.1 12.3-65.3 32.9-89.6C224 316.1 255.3 304 289.3 304l61.4 0c34 0 65.3 12.1 78.4 32.4c20.5 24.3 32.9 55.5 32.9 89.6c0 15.1-2.9 29.7-8.1 43.4C441.7 490.2 409.9 504 375.6 504l-79.2 0c-34.3 0-66.1-13.8-77.2-34.7z"/></svg>',
  scissors:
    '<svg viewBox="0 0 512 512" aria-hidden="true"><path d="M256 192l-39.5-39.5c4.9-12.6 7.5-26.2 7.5-40.5C224 50.1 173.9 0 112 0S0 50.1 0 112s50.1 112 112 112c14.3 0 27.9-2.7 40.5-7.5L192 256l-39.5 39.5c-12.6-4.9-26.2-7.5-40.5-7.5C50.1 288 0 338.1 0 400s50.1 112 112 112s112-50.1 112-112c0-14.3-2.7-27.9-7.5-40.5L256 320l192 192 32 0 0-64L256 192zm-144 32a48 48 0 1 1 0-96 48 48 0 1 1 0 96zm0 256a48 48 0 1 1 0-96 48 48 0 1 1 0 96zm96-160a32 32 0 1 1 0-64 32 32 0 1 1 0 64zM448 0L256 192l64 64L512 64 512 0 448 0z"/></svg>',
};

const NAV = [
  { key: 'start', href: 'index.html', label: 'Start' },
  {
    key: 'kurse',
    href: 'kurse.html',
    label: 'Kurse & Preise',
    children: [
      { href: 'kurse.html#wochenplan', label: 'Wochenplan & Termine' },
      { href: 'kurse.html#preise', label: 'Preise' },
      { href: 'kurse.html#welpengruppe', label: 'Welpengruppe' },
      { href: 'kurse.html#junghunde', label: 'Junghunde' },
      { href: 'kurse.html#hab8', label: 'Hab8!' },
      { href: 'kurse.html#halb8', label: 'Ha(l)b 8 - kleine Hunde' },
      { href: 'kurse.html#kleine-helden', label: 'Kleine Helden' },
      { href: 'kurse.html#social-walk', label: 'Social Walk' },
      { href: 'kurse.html#freilauf', label: 'Freilauf' },
      { href: 'kurse.html#hoopers', label: 'Hoopers' },
      { href: 'kurse.html#longieren', label: 'Longieren' },
      { href: 'kurse.html#agility', label: 'Agility' },
      { href: 'kurse.html#degility', label: 'Degility' },
      { href: 'kurse.html#rally-obedience', label: 'Rally-Obedience' },
      { href: 'kurse.html#einzelstunde', label: 'Einzelstunde' },
      { href: 'kurse.html#maulkorbtraining', label: 'Maulkorbtraining' },
      { href: 'kurse.html#hundefuehrerschein', label: 'Hundeführerschein' },
    ],
  },
  {
    key: 'events',
    href: 'events.html',
    label: 'Events',
    children: [
      { href: 'events.html#krimiwanderung', label: 'Krimiwanderung' },
      { href: 'events.html#dog-dance', label: 'Dog Dance' },
      { href: 'events.html#clubs', label: 'Kids- &amp; Teens-Club' },
      { href: 'events.html#seminare', label: 'Seminare' },
      { href: 'events.html#stammtisch', label: 'Stammtisch' },
      { href: 'events.html#gutscheine', label: 'Gutscheine' },
    ],
  },
  { key: 'hero4hair', href: 'hero4hair.html', label: 'Hero4Hair' },
  { key: 'ueber', href: 'ueber-uns.html', label: 'Über uns' },
  { key: 'galerie', href: 'galerie.html', label: 'Galerie' },
  { key: 'kontakt', href: 'kontakt.html', label: 'Kontakt' },
];

function navHtml(active, r) {
  const items = NAV.map((item) => {
    const current = item.key === active ? ' aria-current="page"' : '';
    if (!item.children) {
      return `<a class="nav-link" href="${r}${item.href}"${current}>${item.label}</a>`;
    }
    const kids = item.children
      .map(
        (c) =>
          `<a href="${r}${c.href}">${c.label}</a>`
      )
      .join('\n          ');
    const cls = item.children.length > 8 ? 'dropdown cols-2' : 'dropdown';
    return `<div class="has-drop">
        <a class="nav-link" href="${r}${item.href}"${current}>${item.label}</a>
        <div class="${cls}">
          ${kids}
        </div>
      </div>`;
  }).join('\n      ');
  return items;
}

function header(active, r) {
  return `<!-- header -->
<header class="site-header">
  <div class="wrap header-inner">
    <a class="brand" href="${r}index.html">
      <span class="brand-mark">${ICONS.paw}</span>
      <span class="brand-text"><strong>Hero4Paws</strong><span>Hundeschule Katja Heldt</span></span>
    </a>
    <button class="nav-toggle" aria-expanded="false" aria-controls="mainnav" aria-label="Menü öffnen"><span></span></button>
    <nav class="nav" id="mainnav" aria-label="Hauptmenü">
      ${navHtml(active, r)}
    </nav>
    <a class="btn btn-primary header-cta" href="${r}kontakt.html">Kurs anfragen</a>
  </div>
</header>`;
}

function footer(r) {
  return `<!-- footer -->
<footer class="site-footer">
  <div class="wrap">
    <div class="footer-grid">
      <div>
        <div class="footer-brand">
          <span class="brand-mark">${ICONS.paw}</span>
          <strong>Hero4Paws</strong>
        </div>
        <p style="margin-bottom:.6rem">Mit Herz. Mit Wissen. Für euch.<br>Hundeschule Katja Heldt in Osnabrück-Voxtrup - auf über 8000 m² eigener Anlage.</p>
        <p style="margin:0">
          <a href="https://www.instagram.com/hero4paws/" rel="noopener">Instagram</a> ·
          <a href="https://www.facebook.com/profile.php?id=61553829191021" rel="noopener">Facebook</a>
        </p>
      </div>
      <div>
        <h3>Kurse</h3>
        <ul class="footer-list">
          <li><a href="${r}kurse.html#welpengruppe">Welpengruppe</a></li>
          <li><a href="${r}kurse.html#junghunde">Junghunde</a></li>
          <li><a href="${r}kurse.html#degility">Degility</a></li>
          <li><a href="${r}kurse.html#hoopers">Hoopers</a></li>
          <li><a href="${r}kurse.html#rally-obedience">Rally-Obedience</a></li>
          <li><a href="${r}kurse.html#social-walk">Social Walk</a></li>
          <li><a href="${r}kurse.html">Alle Kurse &amp; Preise</a></li>
        </ul>
      </div>
      <div>
        <h3>Hundeschule</h3>
        <ul class="footer-list">
          <li><a href="${r}ueber-uns.html">Über uns</a></li>
          <li><a href="${r}ueber-uns.html#anlage">Die Anlage</a></li>
          <li><a href="${r}events.html#krimiwanderung">Krimiwanderung mit Hund</a></li>
          <li><a href="${r}events.html#seminare">Seminare</a></li>
          <li><a href="${r}kurse.html#hundefuehrerschein">Hundeführerschein</a></li>
          <li><a href="${r}hero4hair.html">Hero4Hair</a></li>
          <li><a href="${r}galerie.html">Galerie &amp; Presse</a></li>
        </ul>
      </div>
      <div>
        <h3>Kontakt</h3>
        <ul class="footer-list">
          <li><a href="tel:+4915734777688">01573 4 777 688</a></li>
          <li><a href="https://wa.me/4915734777688" rel="noopener">WhatsApp schreiben</a></li>
          <li><a href="mailto:hero4paws@gmx.de">hero4paws@gmx.de</a></li>
          <li>Am Sonnebrink 7<br>49086 Osnabrück</li>
          <li><a href="${r}kontakt.html#anfahrt">Anfahrt &amp; Karte</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 Hero4Paws · Hundeschule Katja Heldt</span>
      <span><a href="${r}impressum.html">Impressum</a> · <a href="${r}datenschutz.html">Datenschutz</a> · <a href="${r}agb.html">AGB</a></span>
    </div>
  </div>
</footer>

<a class="whatsapp-float" href="https://wa.me/4915734777688" aria-label="Per WhatsApp schreiben">
  ${ICONS.whatsapp}
  WhatsApp
</a>`;
}

function ctaBand(r, opts = {}) {
  const title = opts.title || 'Dann lass uns kennenlernen!';
  const text =
    opts.text ||
    'Erzähl uns kurz von dir und deinem Hund - wir finden gemeinsam den passenden Kurs. Am schnellsten geht es per WhatsApp oder Telefon.';
  const eyebrow = opts.eyebrow || 'Lust bekommen?';
  return `<!-- cta -->
<section>
  <div class="wrap">
    <div class="cta-band">
      <svg class="deco-paw" style="width:150px;right:2%;bottom:-20px;fill:rgba(255,253,242,.12);opacity:1" viewBox="0 0 100 100" aria-hidden="true"><circle cx="17" cy="38" r="10"/><circle cx="38" cy="22" r="11"/><circle cx="63" cy="22" r="11"/><circle cx="84" cy="38" r="9"/><path d="M50 42c15 0 27 12 27 26 0 11-8 19-19 19-4 0-6-1-8-3-2 2-4 3-8 3-11 0-19-8-19-19 0-14 12-26 27-26z"/></svg>
      <div>
        <p class="eyebrow">${eyebrow}</p>
        <h2>${title}</h2>
        <p style="margin:0">${text}</p>
      </div>
      <div class="btn-row">
        <a class="btn btn-light" href="${r}kontakt.html">Kontakt aufnehmen</a>
        <a class="btn btn-outline" style="border-color:rgba(255,253,242,.6);color:#fffdf2" href="tel:+4915734777688">01573 4 777 688</a>
      </div>
    </div>
  </div>
</section>`;
}

function pageHead(r, { crumbs = [], title, lead }) {
  const crumbHtml = crumbs.length
    ? `<p class="breadcrumb">${crumbs
        .map((c, i) =>
          c.href
            ? `<a href="${r}${c.href}">${c.label}</a>`
            : c.label
        )
        .join(' · ')}</p>`
    : '';
  return `<!-- page head -->
<section class="page-head">
  <div class="wrap">
    ${crumbHtml}
    <h1>${title}</h1>
    ${lead ? `<p class="lead">${lead}</p>` : ''}
  </div>
</section>`;
}

function layout({ title, description, active, dir = '', body }) {
  const r = dir ? '../'.repeat(dir.split('/').filter(Boolean).length) : '';
  const withR = body.replace(/\{r\}/g, r);
  return `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
${DRAFT_NOINDEX ? '<meta name="robots" content="noindex">' : ''}
<link rel="icon" href="${r}assets/img/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="${r}assets/css/style.css">
</head>
<body>
<a class="skip-link" href="#main">Zum Inhalt springen</a>

${header(active, r)}

${withR}

${footer(r)}

<script src="${r}assets/js/main.js"></script>
</body>
</html>
`;
}

module.exports = { ICONS, layout, header, footer, ctaBand, pageHead, NAV };
