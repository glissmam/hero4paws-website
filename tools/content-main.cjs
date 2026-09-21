/* Inhalte: Über uns (inkl. Anlage), Hero4Hair, Galerie, Kontakt, Rechtliches */

const { layout, ctaBand, pageHead, ICONS } = require('./layout.cjs');

const TEL = 'tel:+4915734777688';
const WA = 'https://wa.me/4915734777688';
const MAIL = 'mailto:hero4paws@gmx.de';

function galleryItem(item, r = '') {
  const thumb = item.thumb || item.src;
  return `<a href="${r}assets/img/${item.src}" data-lightbox data-full="${r}assets/img/${item.src}"><img src="${r}assets/img/${thumb}" alt="${item.alt}" loading="lazy"></a>`;
}

function galleryGrid(items, r = '') {
  return `<div class="gallery">
      ${items.map((i) => galleryItem(i, r)).join('\n      ')}
    </div>`;
}

/* ----------------------------------------------------------------- Über uns */

function ueberUns() {
  const anlageImgs = [
    ['anlage-01.jpg', 'Überdachte Terrasse auf der Anlage'],
    ['anlage-05.jpg', 'Trainingsfeld mit Gehegen'],
    ['anlage-09.jpg', 'Innenbereich der Ranch mit Tischen'],
    ['anlage-08.jpg', 'Grüne Wiese mit Trampolin'],
    ['anlage-06.jpg', 'Hindernisparcours auf der Wiese'],
    ['anlage-11.jpg', 'Raum für Theorie und Seminare'],
  ];
  const einblicke = [
    ['galerie-34.jpg', 'Golden Retriever lacht in die Kamera'],
    ['kleine-helden-02.jpg', 'Kleine Hunde tollen auf der Wiese'],
    ['degility-01.jpg', 'Hund läuft über eine Rampe'],
    ['social-walk-01.jpg', 'Gruppe läuft mit Hunden spazieren'],
    ['galerie-46.jpg', 'Frauchen umarmt ihren Hund im Schnee'],
    ['galerie-11.jpg', 'Hunde toben im Schnee'],
  ];

  const body = `
<main id="main">
${pageHead('{r}', {
    crumbs: [{ label: 'Start', href: 'index.html' }, { label: 'Über uns' }],
    title: 'Über uns',
    lead: 'Katja Heldt-Lewerentz, ihre Hunde und unser Gelände - die Menschen und der Ort hinter Hero4Paws.',
  })}
<section class="section-tight">
  <div class="wrap">
    <nav class="chip-nav" aria-label="Seitenabschnitte">
      <a href="#katja">Katja</a>
      <a href="#ansatz">Unser Ansatz</a>
      <a href="#anlage">Die Anlage</a>
      <a href="#einblicke">Einblicke</a>
    </nav>
  </div>
</section>

<section id="katja">
  <div class="wrap split reverse">
    <div class="img-stack">
      <img class="img-frame" src="assets/img/ueber-uns-1.jpg" alt="Katja Heldt mit ihren Hunden Berta und Henry">
      <img class="img-frame small" src="assets/img/ueber-uns-3.jpg" alt="Zwergpudel Henry im Studio">
    </div>
    <div>
      <p class="eyebrow">Über mich</p>
      <h2>Ich habe das Rad nicht neu erfunden ...</h2>
      <p class="lead">... das wäre ein Wunder! Aber manchmal wundert man sich.</p>
      <p>Ich bin <strong>Katja Heldt-Lewerentz</strong>, Hundetrainerin mit Erlaubnis des Veterinäramts Osnabrück. Zu meiner Familie gehören Herdenschutzhündin Berta und Zwergpudel Henry - zwei sehr unterschiedliche Charaktere, die mich täglich daran erinnern, jeden Hund als Individuum zu sehen.</p>
      <p>Als Halterin eines Herdenschutzhundes kenne ich auch die „oft stigmatisierten Rassen" gut - und weiß, wie wichtig ein fairer, geduldiger Blick auf jedes Tier ist.</p>
      <div class="info-box">
        <h3>Meine Qualifikation</h3>
        <ul class="paw-list">
          <li>Erlaubnis nach <strong>§ 11 Abs. 1 Nr. 8f TierSchG</strong> durch das Veterinäramt Osnabrück: Ausbildung von Hunden für Dritte und Anleitung der Ausbildung durch den Tierhalter</li>
          <li>Ausbildung am Schulungszentrum für Hundetrainer <strong>Ziemer &amp; Falke</strong></li>
          <li>Erfahrung mit Herdenschutzhunden und großen wie kleinen Rassen</li>
        </ul>
        <img src="assets/img/siegel-ziemer-falke.png" alt="Siegel: Ziemer &amp; Falke Schulungszentrum für Hundetrainer" style="width:150px;margin-top:.5rem">
      </div>
    </div>
  </div>
</section>

<section class="bg-cream-2" id="ansatz">
  <div class="wrap">
    <div class="section-head">
      <p class="eyebrow">Unser Ansatz</p>
      <h2>„Sei höflich zu deinem Hund."</h2>
      <p class="lead">Dieser Satz von Masih Samin hat mich sehr geprägt. Ja, ein Hund braucht Grenzen - aber es liegt an uns Menschen, ihm diese freundlich und höflich zu vermitteln.</p>
    </div>
    <div class="grid grid-3">
      <div class="icon-card">
        <div class="icon-bubble">${ICONS.paw}</div>
        <h3>Fair, klar, persönlich</h3>
        <p class="muted" style="margin:0">Da unsere Hunde nicht unsere Sprache sprechen, kommunizieren wir in ihrer: Verstehe das Verhalten, halte den Hund fair, verstärke, was gelingt. So richtet sich der Blick auf das Ziel - nicht auf das Problem.</p>
      </div>
      <div class="icon-card">
        <div class="icon-bubble">${ICONS.users}</div>
        <h3>Training nach Größe getrennt</h3>
        <p class="muted" style="margin:0">Groß und Klein zusammen geht nicht immer gut. Deshalb gibt es bei uns Gruppen nach Größe - von den „Kleinen Helden" bis zu den XXL-Rassen, alle sind willkommen.</p>
      </div>
      <div class="icon-card">
        <div class="icon-bubble">${ICONS.clock}</div>
        <h3>Erst kennenlernen, dann trainieren</h3>
        <p class="muted" style="margin:0">Mit Hund an der Leine bleiben viele Fragen unausgesprochen. Deshalb nehmen wir uns zu Beginn Zeit, das Mensch-Hund-Team kennenzulernen - in Ruhe.</p>
      </div>
    </div>
  </div>
</section>

<section id="anlage">
  <div class="wrap split">
    <div>
      <p class="eyebrow">Die Anlage</p>
      <h2>Unsere Ranch am Stadtrand von Osnabrück</h2>
      <p>An der Stadtgrenze von Osnabrück, zwischen Voxtrup und Bissendorf, liegt unser geschütztes Gelände auf über 8000 Quadratmetern. Im Frühjahr 2024 sind hier kleinere und größere Gehege entstanden - die Zäune und Tore hat uns der Zoo Osnabrück zur Verfügung gestellt.</p>
      <p>Auf der „Ranch" finden ca. 30 bis 40 Personen Platz: genug Raum für angenehme Seminare und theoretischen Unterricht. Die große überdachte Terrasse lädt besonders im Sommer zum Pausieren und Verweilen ein. Damen- und Herren-WC befinden sich ebenfalls auf dem Gelände.</p>
      <p>Abgerundet wird alles durch einen geräumigen Parkplatz und eine Flutlichtanlage für die dunkle Jahreszeit und die Abendstunden.</p>
      <div class="fact-row">
        <div class="fact"><strong>8.000+</strong><span class="muted">m² Gelände</span></div>
        <div class="fact"><strong>30-40</strong><span class="muted">Personen finden Platz</span></div>
        <div class="fact"><strong>Flutlicht</strong><span class="muted">für Abendstunden</span></div>
      </div>
      <p style="margin-top:1.4rem"><a class="btn btn-outline" href="https://maps.google.com/?q=Am+Sonnebrink+7,+49086+Osnabr%C3%BCck" rel="noopener">Route planen</a></p>
    </div>
    <div>
      <img class="img-frame" src="assets/img/anlage-01.jpg" alt="Überdachte Terrasse auf der Anlage">
    </div>
  </div>
  <div class="wrap" style="margin-top:2.5rem">
    ${galleryGrid(
      anlageImgs.map(([src, alt]) => ({ src, alt, thumb: 'thumbs/' + src })),
      '{r}'
    )}
  </div>
</section>

<section class="bg-cream-2" id="einblicke">
  <div class="wrap">
    <div class="section-head center">
      <p class="eyebrow">Einblicke</p>
      <h2>Momente aus dem Training</h2>
      <p class="lead">Noch mehr Bilder gibt es in der <a href="galerie.html">Galerie</a>.</p>
    </div>
    ${galleryGrid(
      einblicke.map(([src, alt]) => ({ src, alt, thumb: 'thumbs/' + src })),
      '{r}'
    )}
    <div class="btn-row" style="margin-top:2rem;justify-content:center">
      <a class="btn btn-primary" href="galerie.html">Zur ganzen Galerie</a>
    </div>
  </div>
</section>

${ctaBand('{r}', { title: 'Lern uns kennen', text: 'Am besten versteht man unsere Arbeit, wenn man dabei ist. Schreib uns oder komm zu einer Schnupperstunde vorbei.', eyebrow: 'Kennenlernen' })}
</main>`;
  return layout({
    title: 'Über uns - Katja Heldt-Lewerentz & die Anlage - Hero4Paws',
    description:
      'Über die Hundeschule Hero4Paws: Katja Heldt-Lewerentz, Erlaubnis nach § 11 TierSchG, Ausbildung bei Ziemer & Falke - und unsere Anlage mit über 8000 m² zwischen Voxtrup und Bissendorf.',
    active: 'ueber',
    body,
  });
}

/* ---------------------------------------------------------------- Hero4Hair */

function hero4hair() {
  const body = `
<main id="main">
${pageHead('{r}', {
    crumbs: [{ label: 'Start', href: 'index.html' }, { label: 'Hero4Hair' }],
    title: 'Hero4Hair',
    lead: 'Neu ab Februar 2026: Fellpflege bei Hero4Paws - vom Bürsten bis zum Scheren.',
  })}

<section>
  <div class="wrap split">
    <div>
      <p class="eyebrow">Fellpflege</p>
      <h2>Rundum-Sorglos-Paket fürs Fell</h2>
      <p>Bürsten, Blowern, Schneiden und Scheren - bei Hero4Hair bekommt dein Hund die komplette Fellpflege. Die Termine vergeben wir individuell auf Anfrage.</p>
      <div class="info-box">
        <h3>Preisliste Fellpflege</h3>
        <ul class="paw-list">
          <li>Hunde bis 30 cm: <strong>40,00 €</strong></li>
          <li>Hunde bis 45 cm: <strong>60,00 €</strong></li>
          <li>Hunde bis 60 cm: <strong>80,00 €</strong></li>
          <li>Hunde ab 60 cm: nach Absprache</li>
          <li>Krallen kürzen: <strong>10,00 €</strong></li>
          <li>Pfotenpflege: <strong>15,00 €</strong></li>
          <li>Eingewöhnung für Welpen und Hunde ohne Erfahrung: <strong>19,00 €</strong></li>
        </ul>
        <p style="margin:0"><strong>Termine auf Anfrage!</strong></p>
      </div>
      <div class="btn-row" style="margin-top:1.4rem">
        <a class="btn btn-primary" href="${WA}">Termin per WhatsApp</a>
        <a class="btn btn-outline" href="${TEL}">01573 4 777 688</a>
      </div>
    </div>
    <div>
      <img class="img-frame" src="assets/img/hero4hair-preisliste.jpg" alt="Hero4Hair Preisliste">
    </div>
  </div>
</section>

${ctaBand('{r}', { title: 'Termin für die Fellpflege', text: 'Schreib uns kurz, welche Rasse und Größe dein Hund hat - wir melden uns mit einem Terminvorschlag.', eyebrow: 'Hero4Hair' })}
</main>`;
  return layout({
    title: 'Hero4Hair - Fellpflege für Hunde in Osnabrück - Hero4Paws',
    description:
      'Hero4Hair bei Hero4Paws: Fellpflege für Hunde in Osnabrück - Bürsten, Blowern, Schneiden und Scheren. Preisliste und Termine auf Anfrage.',
    active: 'hero4hair',
    body,
  });
}

/* ----------------------------------------------------------------- Galerie */

function galerie(galerieItems, kleineItems) {
  const body = `
<main id="main">
${pageHead('{r}', {
    crumbs: [{ label: 'Start', href: 'index.html' }, { label: 'Galerie &amp; Presse' }],
    title: 'Galerie &amp; Presse',
    lead: 'Momente aus dem Training, Bilder von der Anlage und aus der Presse.',
  })}

<section>
  <div class="wrap">
    <div class="section-head">
      <p class="eyebrow">Galerie</p>
      <h2>Aus dem Training</h2>
      <p class="lead">Klick auf ein Bild, um es groß zu sehen.</p>
    </div>
    ${galleryGrid(galerieItems)}
  </div>
</section>

<section class="bg-cream-2">
  <div class="wrap">
    <div class="section-head">
      <p class="eyebrow">Kleine Helden</p>
      <h2>Die Kleinen in Aktion</h2>
    </div>
    ${galleryGrid(kleineItems)}
  </div>
</section>

<section>
  <div class="wrap">
    <div class="section-head">
      <p class="eyebrow">Presse</p>
      <h2>Über uns in der Zeitung</h2>
      <p class="lead">Die Neue Osnabrücker Zeitung hat über die Eröffnung unserer Hundeschule und unser Konzept berichtet.</p>
    </div>
    <div class="grid grid-3">
      <a class="card card-link" href="assets/img/presse-02.webp" data-lightbox data-full="assets/img/presse-02.webp">
        <img class="card-img" src="assets/img/presse-02.webp" alt="Zeitungsartikel über die Eröffnung der Hundeschule" loading="lazy">
        <div class="card-pad">
          <p class="card-meta">Neue Osnabrücker Zeitung</p>
          <h3>Eröffnung der Hundeschule</h3>
          <p class="muted" style="margin:0">Zum Vergrößern anklicken.</p>
        </div>
      </a>
      <a class="card card-link" href="assets/img/presse-03.webp" data-lightbox data-full="assets/img/presse-03.webp">
        <img class="card-img" src="assets/img/presse-03.webp" alt="Zeitungsartikel: Spiel und Training auf Größe angepasst" loading="lazy">
        <div class="card-pad">
          <p class="card-meta">Neue Osnabrücker Zeitung</p>
          <h3>„Spiel und Training auf Größe angepasst"</h3>
          <p class="muted" style="margin:0">Zum Vergrößern anklicken.</p>
        </div>
      </a>
      <a class="card card-link" href="assets/img/presse-01.webp" data-lightbox data-full="assets/img/presse-01.webp">
        <img class="card-img" src="assets/img/presse-01.webp" alt="Zeitungsartikel über die Hundeschule Hero4Paws" loading="lazy">
        <div class="card-pad">
          <p class="card-meta">Neue Osnabrücker Zeitung</p>
          <h3>Hero4Paws in Osnabrück</h3>
          <p class="muted" style="margin:0">Zum Vergrößern anklicken.</p>
        </div>
      </a>
    </div>
    <div class="split" style="margin-top:2.5rem">
      <div>
        <h3>„Hero4Paws" in Osnabrück-Voxtrup</h3>
        <p>In der neu eröffneten Hundeschule „Hero4Paws" ist der Name Programm. Die Leiterin Katja Heldt widmet sich ganz den Individuen auf vier Pfoten. Ihr Ansatz: die Hunde bei Spiel und Training nach Größe zu trennen. „Das kommt bei vielen Haltern sehr gut an, denn Groß und Klein zusammen geht nicht immer gut", sagt sie.</p>
        <p>So gibt es in Anlehnung an den Namen der Hundeschule zum Beispiel die „Kleinen Helden", eine Spiel- und Trainingsgruppe speziell für Hunde mit einer Schulterhöhe von bis zu 40 Zentimetern. Genauso sind auch XXL-Rassen herzlich willkommen.</p>
        <p>Als Halterin eines Herdenschutzhundes geht Heldt gerne speziell auf diese, wie sie sagt, „oft stigmatisierten Rassen" ein und bietet auch ein Maulkorbtraining an.</p>
        <div class="btn-row">
          <a class="btn btn-outline" href="assets/presse/noz-2024-11-12.pdf" download>Artikel vom 12.11.2024 (PDF)</a>
          <a class="btn btn-outline" href="assets/presse/noz-2024-03-28.pdf" download>Artikel vom 28.03.2024 (PDF)</a>
        </div>
      </div>
      <div>
        <img class="img-frame" src="assets/img/ueber-uns-1.jpg" alt="Katja Heldt mit ihren Hunden">
      </div>
    </div>
  </div>
</section>

${ctaBand('{r}')}
</main>`;
  return layout({
    title: 'Galerie & Presse - Hero4Paws Hundeschule Osnabrück',
    description:
      'Bilder aus dem Training, von der Anlage und aus der Presse - die Galerie der Hundeschule Hero4Paws in Osnabrück.',
    active: 'galerie',
    body,
  });
}

/* ----------------------------------------------------------------- Kontakt */

function kontakt() {
  const body = `
<main id="main">
${pageHead('{r}', {
    crumbs: [{ label: 'Start', href: 'index.html' }, { label: 'Kontakt &amp; Anfahrt' }],
    title: 'Kontakt &amp; Anfahrt',
    lead: 'Wir freuen uns über deine Nachricht - am schnellsten geht es per WhatsApp oder Telefon.',
  })}

<section>
  <div class="wrap">
    <div class="grid grid-4">
      <a class="card card-link card-pad" href="${WA}">
        <div class="icon-bubble">${ICONS.whatsapp}</div>
        <h3>WhatsApp</h3>
        <p class="muted" style="margin:0">01573 4 777 688</p>
      </a>
      <a class="card card-link card-pad" href="${TEL}">
        <div class="icon-bubble">${ICONS.phone}</div>
        <h3>Telefon</h3>
        <p class="muted" style="margin:0">01573 4 777 688</p>
      </a>
      <a class="card card-link card-pad" href="${MAIL}">
        <div class="icon-bubble">${ICONS.mail}</div>
        <h3>E-Mail</h3>
        <p class="muted" style="margin:0">hero4paws@gmx.de</p>
      </a>
      <a class="card card-link card-pad" href="https://maps.google.com/?q=Am+Sonnebrink+7,+49086+Osnabr%C3%BCck" rel="noopener">
        <div class="icon-bubble">${ICONS.pin}</div>
        <h3>Adresse</h3>
        <p class="muted" style="margin:0">Am Sonnebrink 7<br>49086 Osnabrück</p>
      </a>
    </div>
  </div>
</section>

<section class="bg-cream-2" id="anfahrt">
  <div class="wrap split">
    <div>
      <p class="eyebrow">Anfahrt</p>
      <h2>So findest du uns</h2>
      <p>Unsere Anlage liegt an der Stadtgrenze von Osnabrück, zwischen <strong>Voxtrup und Bissendorf</strong> - mitten in der Natur und trotzdem schnell erreichbar.</p>
      <ul class="paw-list">
        <li><strong>Adresse:</strong> Am Sonnebrink 7, 49086 Osnabrück</li>
        <li><strong>Parken:</strong> geräumiger Parkplatz direkt auf dem Gelände</li>
        <li><strong>Orientierung:</strong> Zufahrt über Voxtrup bzw. Bissendorf, ausgeschildertes Gelände</li>
        <li><strong>Wichtig:</strong> Bitte warte mit deinem Hund auf dem Parkplatz, bis du dran bist - so bleibt der Einlauf entspannt.</li>
      </ul>
      <div class="btn-row">
        <a class="btn btn-primary" href="https://maps.google.com/?q=Am+Sonnebrink+7,+49086+Osnabr%C3%BCck" rel="noopener">Route in Google Maps öffnen</a>
      </div>
      <p class="small muted" style="margin-top:1rem">Hinweis: Der Link öffnet Google Maps. Dabei werden Daten an Google übertragen - Details in unserer <a href="datenschutz.html">Datenschutzerklärung</a>.</p>
    </div>
    <div>
      <div class="card card-pad">
        <h3>Anfrage schicken</h3>
        <form data-mailform="hero4paws@gmx.de" data-subject="Anfrage über die Website" class="form-grid">
          <div>
            <label for="k-vorname">Vorname *</label>
            <input id="k-vorname" name="Vorname" required>
          </div>
          <div>
            <label for="k-nachname">Nachname *</label>
            <input id="k-nachname" name="Nachname" required>
          </div>
          <div>
            <label for="k-mail">E-Mail *</label>
            <input id="k-mail" name="E-Mail" type="email" required>
          </div>
          <div>
            <label for="k-tel">Telefon</label>
            <input id="k-tel" name="Telefon" type="tel">
          </div>
          <div class="full">
            <label for="k-msg">Nachricht</label>
            <textarea id="k-msg" name="Nachricht" rows="5" placeholder="Erzähl uns kurz von dir und deinem Hund..."></textarea>
          </div>
          <div class="full">
            <button class="btn btn-primary" type="submit">Anfrage per E-Mail senden</button>
            <p class="small muted" style="margin:.6rem 0 0">Das Formular öffnet dein E-Mail-Programm mit den ausgefüllten Angaben. Deine Daten werden dabei nicht auf der Website gespeichert.</p>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="section-head center">
      <p class="eyebrow">Folge uns</p>
      <h2>Auch auf Instagram und Facebook</h2>
      <p class="lead">Aktuelle Termine, neue Kurse und viele Hundebilder gibt es in den sozialen Medien.</p>
    </div>
    <div class="btn-row" style="justify-content:center">
      <a class="btn btn-primary" href="https://www.instagram.com/hero4paws/" rel="noopener">Instagram</a>
      <a class="btn btn-outline" href="https://www.facebook.com/profile.php?id=61553829191021" rel="noopener">Facebook</a>
    </div>
  </div>
</section>

${ctaBand('{r}', { title: 'Bis bald auf dem Platz!', text: 'Ob Kursanfrage, Gutschein oder Frage zu deinem Hund - schreib uns einfach. Wir melden uns so schnell wie möglich.', eyebrow: 'Wir freuen uns' })}
</main>`;
  return layout({
    title: 'Kontakt & Anfahrt - Hero4Paws Hundeschule Osnabrück',
    description:
      'Kontakt zur Hundeschule Hero4Paws in Osnabrück: Telefon und WhatsApp 01573 4 777 688, hero4paws@gmx.de, Am Sonnebrink 7. Anfahrt zwischen Voxtrup und Bissendorf.',
    active: 'kontakt',
    body,
  });
}

/* ------------------------------------------------------------- Rechtliches */

function impressum() {
  const body = `
<main id="main">
${pageHead('{r}', {
    crumbs: [{ label: 'Start', href: 'index.html' }, { label: 'Impressum' }],
    title: 'Impressum',
    lead: 'Angaben gemäß § 5 TMG.',
  })}
<section>
  <div class="wrap-narrow">
    <h2>Anbieter</h2>
    <p>
      Hero4Paws<br>
      Hundeschule Katja Heldt<br>
      Inhaberin: Katja Heldt-Lewerentz<br>
      Am Sonnebrink 7<br>
      49086 Osnabrück
    </p>
    <p>
      Telefon: <a href="${TEL}">01573-4777688</a><br>
      E-Mail: <a href="${MAIL}">hero4paws@gmx.de</a>
    </p>

    <h2>Zulassung</h2>
    <p>Erlaubnis nach § 11 Abs. 1 Nr. 8f des Tierschutzgesetzes (TierSchG) zur Ausbildung von Hunden für Dritte und zur Anleitung der Ausbildung von Hunden durch den Tierhalter, erteilt durch das Veterinäramt der Stadt Osnabrück.</p>

    <h2>Umsatzsteuer</h2>
    <p>Als Kleinunternehmerin im Sinne von § 19 Abs. 1 UStG wird keine Umsatzsteuer berechnet und ausgewiesen.</p>

    <h2>Verantwortlich für den Inhalt</h2>
    <p>Katja Heldt-Lewerentz, Adresse wie oben.</p>

    <h2>Streitschlichtung</h2>
    <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>

    <h2>Haftung für Inhalte</h2>
    <p>Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.</p>

    <h2>Haftung für Links</h2>
    <p>Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft; rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.</p>

    <h2>Urheberrecht</h2>
    <p>Die durch die Seitenbetreiberin erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung der Rechteinhaberin. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht von der Betreiberin erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Solltest du trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.</p>
  </div>
</section>
</main>`;
  return layout({
    title: 'Impressum - Hero4Paws Hundeschule Osnabrück',
    description: 'Impressum der Hundeschule Hero4Paws, Katja Heldt-Lewerentz, Am Sonnebrink 7, 49086 Osnabrück.',
    active: '',
    body,
  });
}

function datenschutz() {
  const body = `
<main id="main">
${pageHead('{r}', {
    crumbs: [{ label: 'Start', href: 'index.html' }, { label: 'Datenschutz' }],
    title: 'Datenschutzerklärung',
    lead: 'Transparent und schlank: Diese Website setzt keine Cookies, lädt keine externen Schriften und bindet keine Analyse- oder Werbedienste ein.',
  })}
<section>
  <div class="wrap-narrow">
    <h2>1. Verantwortliche Stelle</h2>
    <p>
      Verantwortlich für die Datenverarbeitung auf dieser Website ist:<br><br>
      Hero4Paws<br>
      Hundeschule Katja Heldt-Lewerentz<br>
      Am Sonnebrink 7<br>
      49086 Osnabrück<br>
      Telefon: <a href="${TEL}">01573-4777688</a><br>
      E-Mail: <a href="${MAIL}">hero4paws@gmx.de</a>
    </p>

    <h2>2. Hosting und Server-Logfiles</h2>
    <p>Diese Website wird bei einem externen Dienstleister gehostet. Beim Aufruf der Seiten erhebt der Hosting-Anbieter automatisch Informationen in Server-Logfiles, die dein Browser übermittelt:</p>
    <ul>
      <li>Browsertyp und Browserversion</li>
      <li>verwendetes Betriebssystem</li>
      <li>Referrer-URL</li>
      <li>Uhrzeit der Serveranfrage</li>
      <li>gekürzte oder vollständige IP-Adresse</li>
    </ul>
    <p>Diese Daten werden nicht mit anderen Datenquellen zusammengeführt. Die Erfassung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Es besteht ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und der Sicherheit der Website. Die Logfiles werden nach kurzer Zeit automatisch gelöscht, sofern sie nicht zur Aufklärung eines konkreten Missbrauchsfalls benötigt werden.</p>
    <p>Mit dem Hosting-Anbieter besteht ein Vertrag über Auftragsverarbeitung (AVV) gemäß Art. 28 DSGVO.</p>

    <h2>3. Cookies, Schriften und externe Dienste</h2>
    <p>Diese Website verwendet <strong>keine Cookies</strong>, kein Tracking und keine Analyse-Tools. Es werden <strong>keine externen Schriftarten oder Skripte</strong> von Drittanbietern geladen - alle Schriften und Dateien liegen auf unserem eigenen Server. Dadurch werden beim Besuch der Website keine Daten an Google, Meta oder andere Dritte übertragen.</p>

    <h2>4. Kontaktaufnahme</h2>
    <p>Die Anfrage-Formulare auf dieser Website senden keine Daten an einen Server. Sie öffnen lediglich dein eigenes E-Mail-Programm mit den von dir eingegebenen Angaben. Die Übertragung erfolgt dann per E-Mail an uns.</p>
    <p>Wenn du uns per E-Mail, Telefon oder WhatsApp kontaktierst, werden deine Angaben inklusive der von dir dort gemachten Daten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne deine Einwilligung weiter.</p>
    <p>Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, wenn deine Anfrage mit der Anbahnung oder Erfüllung eines Vertrags zusammenhängt. In allen anderen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der Bearbeitung von Anfragen (Art. 6 Abs. 1 lit. f DSGVO) bzw. auf deiner Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), die du jederzeit widerrufen kannst.</p>

    <h2>5. Links zu sozialen Medien und Karten</h2>
    <p>Auf unseren Seiten findest du einfache Links zu Instagram, Facebook und Google Maps. Solange du diese Links nicht anklickst, werden keine Daten an die Anbieter übertragen. Erst mit dem Klick verlässt du unsere Website; es gelten die Datenschutzbestimmungen der jeweiligen Anbieter.</p>

    <h2>6. Speicherdauer</h2>
    <p>Soweit in dieser Datenschutzerklärung keine speziellere Speicherdauer genannt ist, verbleiben deine personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn du ein berechtigtes Löschersuchen geltend machst oder eine Einwilligung widerrufst, werden deine Daten gelöscht, sofern keine anderen rechtlich zulässigen Gründe für die Speicherung bestehen (zum Beispiel steuer- oder handelsrechtliche Aufbewahrungsfristen).</p>

    <h2>7. Deine Rechte</h2>
    <p>Du hast jederzeit das Recht auf:</p>
    <ul>
      <li><strong>Auskunft</strong> über Herkunft, Empfänger und Zweck deiner gespeicherten personenbezogenen Daten (Art. 15 DSGVO)</li>
      <li><strong>Berichtigung</strong> unrichtiger Daten (Art. 16 DSGVO)</li>
      <li><strong>Löschung</strong> deiner Daten (Art. 17 DSGVO)</li>
      <li><strong>Einschränkung</strong> der Verarbeitung (Art. 18 DSGVO)</li>
      <li><strong>Datenübertragbarkeit</strong> (Art. 20 DSGVO)</li>
      <li><strong>Widerspruch</strong> gegen die Verarbeitung (Art. 21 DSGVO)</li>
    </ul>
    <p>Eine erteilte Einwilligung kannst du jederzeit mit Wirkung für die Zukunft widerrufen. Außerdem steht dir ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu - für uns ist das die Landesbeauftragte für den Datenschutz Niedersachsen.</p>

    <h2>8. SSL- bzw. TLS-Verschlüsselung</h2>
    <p>Diese Seite nutzt aus Sicherheitsgründen eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennst du daran, dass die Adresszeile des Browsers von „http://" auf „https://" wechselt und ein Schloss-Symbol angezeigt wird.</p>
  </div>
</section>
</main>`;
  return layout({
    title: 'Datenschutzerklärung - Hero4Paws Hundeschule Osnabrück',
    description:
      'Datenschutzerklärung der Hundeschule Hero4Paws: keine Cookies, kein Tracking, keine externen Dienste. Alle Informationen zur Verarbeitung personenbezogener Daten.',
    active: '',
    body,
  });
}

function agb() {
  const body = `
<main id="main">
${pageHead('{r}', {
    crumbs: [{ label: 'Start', href: 'index.html' }, { label: 'AGB' }],
    title: 'Allgemeine Geschäftsbedingungen',
    lead: 'Für alle Verträge, Kurse, Abos, Seminare und sonstigen Leistungen der Hundeschule Hero4Paws.',
  })}
<section>
  <div class="wrap-narrow">
    <h2>Allgemeines</h2>
    <p>Nachstehende Allgemeine Geschäftsbedingungen gelten für alle Verträge, Kurse, Abos, Seminare und sonstigen Leistungen. Abweichenden Vorschriften des Vertragspartners widersprechen wir hiermit ausdrücklich. Alle Nebenabreden bedürfen der schriftlichen Bestätigung unsererseits. Mit der Anmeldung werden unsere AGB und unsere Teilnahmebedingungen anerkannt.</p>
    <p>Die Hundeschule Hero4Paws ist jederzeit berechtigt, diese Allgemeinen Geschäftsbedingungen einschließlich aller eventuellen Anlagen mit einer angemessenen Kündigungsfrist zu ändern oder zu ergänzen. Vorher eingehende Anmeldungen werden nach den zum Zeitpunkt der Anmeldung gültigen Allgemeinen Geschäftsbedingungen bearbeitet.</p>

    <h2>Leistungsbeschreibung</h2>
    <p>Welche Leistungen vertraglich vereinbart sind, ergibt sich aus der Kurs- und Leistungsbeschreibung. Diese Angaben sind bindend. Die Hundeschule Hero4Paws behält sich jedoch ausdrücklich vor, aus sachlich berechtigten, erheblichen und nicht vorhersehbaren Gründen eine Änderung der Angaben zu erklären, über die der Teilnehmer vor Antritt der Veranstaltung bzw. des Trainings informiert wird. In diesem Fall hat der Teilnehmer das Recht, innerhalb von 8 Tagen von der Veranstaltung zurückzutreten und erhält unverzüglich die eventuell bereits bezahlte Teilnahmegebühr zurückerstattet. Meldet er sich nicht innerhalb dieser Frist ab, gilt die neue Leistungsbeschreibung stillschweigend als angenommen.</p>
    <p>Die Hundeschule Hero4Paws behält sich insbesondere notwendige kurzfristige und kleinere Änderungen vor, wie zum Beispiel die Verlegung des Trainings- oder Seminarortes sowie zeitliche Verschiebungen, falls dies erforderlich ist. Hierdurch können vom Teilnehmer keine Ansprüche gegen die Hundeschule abgeleitet werden.</p>

    <h2>Teilnahmevoraussetzungen</h2>
    <p>Um Leistungen der Hundeschule in Anspruch nehmen zu können, ist es erforderlich, dass der teilnehmende Hund vollen Impfschutz hat. Der Hund sollte zudem durch den Teilnehmer haftpflichtversichert sein (Empfehlung!), zumindest für die Kursdauer.</p>
    <p>Die Teilnehmer verpflichten sich, nur mit einem gesunden Tier, das kein Ansteckungsrisiko für andere Personen oder Tiere darstellt, ungezieferfrei ist und den Anforderungen des Unterrichts körperlich gewachsen ist, an den Trainingsstunden teilzunehmen.</p>
    <p>Die Hundeschule Hero4Paws behält sich vor, die Unterrichtsanforderungen den körperlichen Voraussetzungen und dem Alter der Tiere anzupassen. Ferner behält sich die Hundeschule vor, die Örtlichkeiten für die Trainingsstunden des Einzel- und Gruppenunterrichts individuell zu bestimmen. Den Einsatz spezieller Hilfsmittel, die vom Halter bzw. Hundeführer gefordert werden, kann die Hundeschule Hero4Paws ablehnen. Hunden, die nicht für den Gruppenunterricht geeignet erscheinen, kann die Teilnahme verweigert werden. In diesem Fall besteht selbstverständlich die Möglichkeit, den Hund durch Einzelunterricht auf die Teilnahme am Gruppenunterricht vorzubereiten.</p>
    <p>Von den Gruppenstunden ausgeschlossen sind läufige Hündinnen sowie Hunde, die laut Hundeverordnung in die Gruppe der gefährlichen Hunderassen einzuordnen sind und ohne erforderliche Erlaubnis geführt werden. Für läufige Hündinnen kann im Einzelfall eine Ausnahmeregelung getroffen werden. Dies setzt jedoch eine vorherige Absprache und Zustimmung der Hundeschule Hero4Paws voraus.</p>

    <h2>Haftung</h2>
    <p>Jeder Teilnehmer ist für seinen Hund verantwortlich und haftbar für alle Schäden und Verletzungen, die während des gesamten Aufenthaltes in der Hundeschule entstehen - nicht nur während des Kurses, sondern auch bei Begrüßung, Verabschiedung und in den Pausen. Gleiches gilt für den Teilnehmer selbst.</p>
    <p>Die Hundeschule haftet nicht für Schäden und Verletzungen, die durch mitgeführte Tiere entstehen, sowie für Schäden an den mitgeführten Tieren und für Diebstahl oder Verlust der Tiere. Weiterhin besteht keine Haftung der Hundeschule für Personen- und Sachschäden sowie Diebstahl oder Verlust während des Aufenthaltes in der Hundeschule.</p>
    <p>Die Teilnehmer dürfen von Personen begleitet werden, müssen diese aber über die Haftungsausschlüsse informieren (eigenes Risiko!). Begleitende Kinder und Jugendliche sind von den Eltern zu beaufsichtigen.</p>
    <p>Die Hundeschule Hero4Paws übernimmt keinerlei Haftung für Personen-, Sach- oder Vermögensschäden, die durch die Anwendung und Ausführung der gezeigten und veranlassten Übungen entstehen. Den Anweisungen der Trainer und Vertreter ist Folge zu leisten.</p>
    <p>Jede Teilnahme, jeder Besuch und jede Übung der teilnehmenden Personen und Tiere an den Unterrichts-, Spiel- und Beratungsstunden sowie Seminaren erfolgen ausschließlich auf eigenes Risiko.</p>
    <p>Die Hundeschule übernimmt keine Erfolgsgarantie für die im Rahmen des Unterrichts vermittelten Inhalte. Es wird darauf hingewiesen, dass der Erfolg in erster Linie vom Teilnehmer und vom teilnehmenden Hund abhängig ist.</p>
    <p>Sofern es für die Ausbildung notwendig ist, den Hund auch im freien Gelände von der Leine zu lassen, wird ausdrücklich darauf hingewiesen, dass dabei die gesetzlichen Bestimmungen gelten. Die Hundeschule kann nur empfehlen, den Hund für die eine oder andere Übung frei zu lassen. Der Halter handelt eigenverantwortlich und trägt selbst das Risiko einer etwaigen Ordnungsstrafe.</p>

    <h2>Kurs- und Seminargebühren, Rücktritt</h2>
    <p>Die Gebühren für die Kurse, Seminare und sonstigen Leistungen sind zur jeweiligen Fälligkeit per Überweisung, Bankeinzug oder als Barzahlung zu leisten.</p>
    <p>Eine Unterrichtsstunde dauert 60 Minuten. Verspätungen des Teilnehmers gehen zu dessen Lasten und berechtigen nicht zur Verminderung der Vergütung.</p>
    <p>Der Teilnehmer kann jederzeit vor Beginn der Leistung zurücktreten. Der Rücktritt hat in Schriftform (Brief, E-Mail) zu erfolgen. Maßgeblicher Zeitpunkt für die Rücktrittserklärung ist der Zeitpunkt des Eingangs bei der Hundeschule Hero4Paws. Bei einem Rücktritt bis 8 Tage vor Beginn der ersten Unterrichtsstunde bzw. vor Beginn des Seminars werden die gesamten Gebühren abzüglich einer Bearbeitungspauschale von 15,00 € zurückerstattet. Bei einem Rücktritt später als 8 Tage vor Beginn betragen die Stornierungsgebühren: bis 6 Tage vor Beginn 20 % des Kurspreises, bis 4 Tage vor Beginn 50 %, bis 2 Tage vor Beginn 80 % des Preises. Spätere Rücktritte und nicht in Anspruch genommene Leistungen werden nicht zurückerstattet.</p>
    <p>Die Hundeschule Hero4Paws kann den Vertrag ohne Einhaltung einer Frist kündigen, wenn sich der Teilnehmer vertragswidrig verhält, insbesondere wenn das Ziel der Veranstaltung oder andere Teilnehmer gefährdet werden. Der Vertrag verlängert sich jeweils um einen weiteren Monat, wenn der Hundeschule nicht einen Monat vor Ablauf des Vertragsendes die Kündigung zugegangen ist.</p>
    <p>Vereinbarte Unterrichtstermine für Einzelstunden müssen spätestens 24 Stunden vor Beginn abgesagt werden. Nicht rechtzeitig abgesagte Stunden werden voll angerechnet. Gruppenunterricht und Seminare werden im Rahmen von festen Kursen angeboten. Kann ein Teilnehmer nicht teilnehmen, steht es der Hundeschule frei zu entscheiden, ob die Stunden nachgeholt werden. Die diesbezüglich zu entrichtende Gebühr für den Kurs kann nicht anteilig zurückgefordert werden. Unterrichtsstunden und Kurse, die schriftlich oder mündlich gebucht und in regelmäßigen Abständen besucht werden, können bar oder per Überweisung im Voraus gezahlt werden. Eine Absage wegen Verhinderung muss bis zum Vortag um 23:59 Uhr erfolgen, ansonsten muss diese Stunde berechnet werden.</p>
    <p>Sofern ein Teilnehmer oder sein Hund während des Kurses krank wird, der Teilnehmer in den Urlaub fährt, eine Hündin heiß wird oder eine Absage unsererseits aufgrund von Urlaub oder Krankheit des Trainers erfolgt, gelten für den Ausfall der Trainingsstunden folgende Bestimmungen:</p>
    <ul>
      <li>Wir bieten in regelmäßigen Abständen Nachholstunden für versäumte Trainingseinheiten an.</li>
      <li>Für eine nicht in Anspruch genommene Unterrichtseinheit wird eine Nachholstunde gewährt, bis zu einem Maximum von 4 Nachholstunden je Vertrag.</li>
      <li>Die Nachholstunden zu verschiedenen Themenbereichen finden sowohl online als auch auf dem Hundeplatz vor Ort statt.</li>
      <li>Der Anspruch auf die Buchung einer Nachholstunde erlischt 2 Monate nach Beendigung des Vertrages.</li>
    </ul>
    <p>Der Unterricht findet in der Regel bei jedem Wetter statt. Sollten die Witterungsbedingungen aufgrund extremer Wetterverhältnisse wie Schnee, Gewitter, Starkregen oder Hitze unzumutbar sein, der Trainer erkranken oder sich im Urlaub befinden, wird der Unterricht rechtzeitig abgesagt. In diesem Fall erhält der Teilnehmer eine Nachholstunde als Ausgleich, sofern die maximale Anzahl nicht in Anspruch genommener Nachholstunden noch nicht erreicht wurde. Bei Ausfall durch Verhinderung des Trainers durch Urlaub oder Krankheit länger als zwei Wochen in Folge besteht der Anspruch durch Vertretung auf dem Hundeplatz. Die Hundeschule behält sich vor, Kurse bei zu geringer Teilnehmerzahl angemessen zu kürzen.</p>
    <p>Teilnehmern, die aufgrund ihres Verhaltens vom Unterricht ausgeschlossen werden, wird die Kursgebühr nicht erstattet. Das Gleiche gilt, wenn der Teilnehmer aus eigenen Gründen den Kurs abbricht. Erfolgt seitens des Halters nach Beginn des Kurses oder des Seminars ein Abbruch der vereinbarten Ausbildung, aus welchen Gründen auch immer, werden die Kurs- bzw. Seminargebühren nicht erstattet.</p>

    <h2>Bild- und Tonmaterial</h2>
    <p>Alle Bild- und Tonträger, die im Zusammenhang mit der Hundeschule Hero4Paws erstellt werden, dürfen ohne vorherige Genehmigung weder ganz noch teilweise veröffentlicht werden. Die Hundeschule Hero4Paws kann solche Bild- und Tonträger zu Veröffentlichungszwecken, PR-Maßnahmen oder im Rahmen der Ausbildung ohne vorherige Absprache nutzen.</p>
    <p>Die Hundeschule Hero4Paws veröffentlicht teilweise selbst aufgenommene Fotos, Filme etc. auf der Homepage. Jeder Teilnehmer stimmt mit der Inanspruchnahme einer Leistung der Hundeschule der Veröffentlichung zu.</p>
    <p>Die Kursinhalte inklusive der ausgegebenen Unterlagen unterliegen dem Copyright und dürfen nicht ohne ausdrückliche Genehmigung der Hundeschule vervielfältigt oder an Dritte weitergegeben werden.</p>

    <h2>Schlussbestimmungen</h2>
    <p>Ansprüche verjähren nach den gesetzlichen Bestimmungen. Jegliche Änderungen, Ergänzungen oder die teilweise oder gesamte Aufhebung des Vertrages bedürfen der Schriftform, auch die Abänderung oder Aufhebung des Schriftformerfordernisses. Sollten einzelne Bestimmungen dieser AGB nichtig oder unwirksam sein, berührt dies die Gültigkeit der übrigen Bestimmungen nicht.</p>
    <p>Die Berichtigung von Irrtümern sowie von Druck- und Rechenfehlern bleibt vorbehalten. Gerichtsstand ist Osnabrück.</p>
  </div>
</section>
</main>`;
  return layout({
    title: 'AGB - Hero4Paws Hundeschule Osnabrück',
    description: 'Allgemeine Geschäftsbedingungen der Hundeschule Hero4Paws in Osnabrück.',
    active: '',
    body,
  });
}

module.exports = {
  pages: () => [
    { file: 'ueber-uns.html', html: ueberUns() },
    { file: 'hero4hair.html', html: hero4hair() },
    { file: 'kontakt.html', html: kontakt() },
    { file: 'impressum.html', html: impressum() },
    { file: 'datenschutz.html', html: datenschutz() },
    { file: 'agb.html', html: agb() },
  ],
  galerie,
};
