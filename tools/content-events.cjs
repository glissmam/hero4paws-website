/* Inhalt: events.html - Krimiwanderung, Dog Dance, Clubs, Seminare, Stammtisch, Gutscheine */

const { layout, ctaBand, pageHead, ICONS } = require('./layout.cjs');

const WA = 'https://wa.me/4915734777688';

const body = `
<main id="main">
${pageHead('{r}', {
  crumbs: [{ label: 'Start', href: 'index.html' }, { label: 'Events & Specials' }],
  title: 'Events &amp; Specials',
  lead: 'Krimiwanderung, Dog Dance, Clubs für Kids und Teens, Seminare und unser Stammtisch - alles, was neben dem Kursalltag passiert.',
})}
<section class="section-tight">
  <div class="wrap">
    <nav class="chip-nav" aria-label="Seitenabschnitte">
      <a href="#krimiwanderung">Krimiwanderung</a>
      <a href="#dog-dance">Dog Dance</a>
      <a href="#clubs">Kids &amp; Teens</a>
      <a href="#seminare">Seminare</a>
      <a href="#stammtisch">Stammtisch</a>
      <a href="#gutscheine">Gutscheine</a>
    </nav>
  </div>
</section>

<section class="bg-cream-2" id="krimiwanderung">
  <div class="wrap split">
    <div>
      <p class="eyebrow">Soko Wuff ermittelt</p>
      <h2>Krimiwanderung mit Hund</h2>
      <p>„Nichts ist trügerischer als eine offenkundige Tatsache!" (Sherlock Holmes) - du wolltest schon immer gemeinsam mit deinem Hund einen mysteriösen Kriminalfall lösen? Unser Soko-Wuff-Team sucht immer neue Detektive mit Spürnasen, um den Täter zu überführen.</p>
      <p>Wir sammeln gemeinsam Beweise, lösen Rätsel und befragen möglicherweise Zeugen. Gemeinsam erschnüffeln wir die richtige Fährte und überwinden kleine Hindernisse. Wenn es knifflig wird, stecken wir die Köpfe zusammen und geben nicht auf, bis wir den Täter gefunden haben.</p>
      <h3>Anforderungsprofil</h3>
      <ul class="paw-list">
        <li>Spaß am Schnüffeln und Freude am Spazieren</li>
        <li>Sozialverträglich, arbeitet gerne mit Frauchen oder Herrchen</li>
        <li>Mindestalter 9 Monate, Grundimmunisierung und Hundehaftpflichtversicherung</li>
      </ul>
      <h3>Hinweise zur Tour</h3>
      <ul class="paw-list">
        <li>Dauer ca. 2 bis 3 Stunden, Strecke zwischen 4 und 6 km</li>
        <li>Maximal 10 Mensch-Hund-Teams pro Fall - Spaß für die ganze Familie</li>
        <li>Die Themen wechseln und finden oft an mehreren Standorten statt</li>
        <li>Löst ihr den Fall, werdet ihr am Ende dafür belohnt</li>
      </ul>
      <div class="btn-row">
        <a class="btn btn-primary" href="${WA}">Per WhatsApp anmelden</a>
        <a class="btn btn-outline" href="mailto:hero4paws@gmx.de?subject=Anmeldung%20Krimiwanderung">Per E-Mail anmelden</a>
      </div>
    </div>
    <div>
      <img class="img-frame" src="assets/img/soko-wuff.jpg" alt="Soko Wuff - Logo mit Pfoten und Lupe" style="max-width:min(340px,100%)">
      <div class="info-box" style="margin-top:1.5rem">
        <h3>Preis</h3>
        <p style="margin-bottom:.4rem"><span class="price-tag">40,00 € pro Mensch-Hund-Team</span></p>
        <p class="muted" style="margin:0">Zusätzlicher Hund oder Begleitperson: je 10,00 € (bitte bei der Anmeldung angeben). Anmeldung über die Kontaktseite, per WhatsApp unter 01573 4 777 688 oder per E-Mail an hero4paws@gmx.de.</p>
      </div>
    </div>
  </div>
</section>

<section id="dog-dance">
  <div class="wrap split reverse">
    <div>
      <img class="img-frame" src="assets/img/poster-dog-dance.jpg" alt="Flyer Dog Dance: dienstags 19 Uhr" style="max-width:min(420px,100%)">
    </div>
    <div>
      <p class="eyebrow">Neu bei Hero4Paws</p>
      <h2>Dog Dance</h2>
      <p>Gemeinsam bewegen, Bindung stärken, Spaß und Teamwork: Beim Dog Dance entstehen kleine Choreografien aus Bewegung und Vertrauen - tanzen. Vertrauen. Ein Team. Ein Gefühl.</p>
      <ul class="paw-list">
        <li>Immer dienstags um 19:00 Uhr</li>
        <li>Für alle, die Freude an gemeinsamer Bewegung haben</li>
        <li>Frag uns nach freien Plätzen</li>
      </ul>
      <div class="btn-row">
        <a class="btn btn-primary" href="${WA}">Platz anfragen</a>
      </div>
    </div>
  </div>
</section>

<section class="bg-cream-2" id="clubs">
  <div class="wrap">
    <div class="section-head">
      <p class="eyebrow">Für Kids &amp; Teens</p>
      <h2>Kids-Paws-Club &amp; Teens-Paws-Club</h2>
      <p class="lead">Hunde verstehen, mit Hunden leben, mit Hunden trainieren - gemeinsam wachsen und stark fürs Leben werden.</p>
    </div>
    <div class="grid grid-2">
      <div class="card">
        <img class="card-img" src="assets/img/poster-kids-club.jpg" alt="Flyer Kids-Paws-Club: donnerstags 15 bis 15:45 Uhr für Kinder von 6 bis 10 Jahren" loading="lazy">
        <div class="card-pad">
          <p class="card-meta">Donnerstags 15:00 - 15:45 Uhr</p>
          <h3>Kids-Paws-Club (6 - 10 Jahre)</h3>
          <p class="muted">Hunde verstehen, mit Hunden leben, mit Hunden trainieren - spielerisch und altersgerecht.</p>
          <p style="margin:0"><span class="price-tag">15,00 € pro Woche</span></p>
        </div>
      </div>
      <div class="card">
        <img class="card-img" src="assets/img/poster-teens-club.jpg" alt="Flyer Teens-Paws-Club: donnerstags 16 bis 16:45 Uhr für Kids und Teens von 11 bis 16 Jahren" loading="lazy">
        <div class="card-pad">
          <p class="card-meta">Donnerstags 16:00 - 16:45 Uhr</p>
          <h3>Teens-Paws-Club (11 - 16 Jahre)</h3>
          <p class="muted">Gemeinsam wachsen, Vertrauen aufbauen, Verantwortung übernehmen - stark fürs Leben.</p>
          <p style="margin:0"><span class="price-tag">15,00 € pro Woche</span></p>
        </div>
      </div>
    </div>
    <div class="btn-row" style="margin-top:1.6rem;justify-content:center">
      <a class="btn btn-primary" href="${WA}">Platz im Club sichern</a>
    </div>
  </div>
</section>

<section id="seminare">
  <div class="wrap split">
    <div>
      <p class="eyebrow">Wissen teilen</p>
      <h2>Seminare &amp; Workshops</h2>
      <p>Immer wieder gibt es bei uns Seminare und Workshops zu wechselnden Themen - vom gemeinsamen Trainingstag bis zu Spezialthemen rund um den Alltag mit Hund.</p>
      <p>Auf unserer Ranch ist Platz für 30 bis 40 Personen, genug Raum für angenehme Theorie und Praxis. Die Termine geben wir kurzfristig über WhatsApp, E-Mail und Instagram bekannt.</p>
      <ul class="kicker-list">
        <li><span class="ico">${ICONS.users}</span><div><strong>Gruppen bis 40 Personen</strong><br><span class="muted">Theorie im überdachten Bereich, Praxis auf dem Gelände.</span></div></li>
        <li><span class="ico">${ICONS.calendar}</span><div><strong>Wechselnde Themen</strong><br><span class="muted">Du hast ein Wunschthema? Sag uns Bescheid.</span></div></li>
        <li><span class="ico">${ICONS.paw}</span><div><strong>Auch als Gutschein</strong><br><span class="muted">Gutscheine für Seminare, Kurse und Krimiwanderungen gibt es auf Anfrage.</span></div></li>
      </ul>
    </div>
    <div>
      <div class="card card-pad">
        <h3>Verbindliche Buchung</h3>
        <form data-mailform="hero4paws@gmx.de" data-subject="Seminaranfrage über die Website" class="form-grid">
          <div>
            <label for="s-vorname">Vorname *</label>
            <input id="s-vorname" name="Vorname" required>
          </div>
          <div>
            <label for="s-nachname">Nachname *</label>
            <input id="s-nachname" name="Nachname" required>
          </div>
          <div>
            <label for="s-mail">E-Mail *</label>
            <input id="s-mail" name="E-Mail" type="email" required>
          </div>
          <div>
            <label for="s-tel">Telefon *</label>
            <input id="s-tel" name="Telefon" type="tel" required>
          </div>
          <div>
            <label for="s-personen">Anzahl Personen *</label>
            <input id="s-personen" name="Anzahl Personen" type="number" min="1" value="1" required>
          </div>
          <div class="full">
            <label for="s-msg">Nachricht</label>
            <textarea id="s-msg" name="Nachricht" rows="4" placeholder="Um welches Seminar geht es?"></textarea>
          </div>
          <div class="full">
            <button class="btn btn-primary" type="submit">Anfrage per E-Mail senden</button>
            <p class="small muted" style="margin:.6rem 0 0">Das Formular öffnet dein E-Mail-Programm mit den ausgefüllten Angaben - so landet die Anfrage direkt bei uns.</p>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>

<section class="bg-cream-2" id="stammtisch">
  <div class="wrap split">
    <div>
      <p class="eyebrow">Community</p>
      <h2>Stammtisch</h2>
      <p>Jeden ersten Donnerstag im Monat treffen wir uns um 19:00 Uhr, um gemütlich beisammen zu sein, zu klönen - und vielleicht lecker zu essen. Der genaue Ort wird jeweils kurzfristig bekannt gegeben.</p>
      <ul class="paw-list">
        <li>Jeden 1. Donnerstag im Monat, 19:00 Uhr</li>
        <li>Offen für alle - mit oder ohne Hund</li>
        <li>Fragen? Kurz per WhatsApp oder E-Mail melden</li>
      </ul>
    </div>
    <div>
      <div class="info-box">
        <h3>Gut zu wissen</h3>
        <ul class="paw-list">
          <li>Alle Trainingszeiten findest du im <a href="kurse.html#wochenplan">Wochenplan</a></li>
          <li>Änderungen bei Wetter, Urlaub oder Krankheit geben wir kurzfristig bekannt</li>
          <li>Rückfragen beantworten wir am schnellsten per WhatsApp</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<section id="gutscheine">
  <div class="wrap">
    <div class="section-head center">
      <p class="eyebrow">Verschenken</p>
      <h2>Gutscheine für Hundemenschen</h2>
      <p class="lead">Ob zum Geburtstag, zu Weihnachten oder als Dankeschön: Über einen gemeinsamen Termin mit dem eigenen Hund freut sich jeder.</p>
    </div>
    <div class="grid grid-3">
      <div class="card card-pad">
        <h3>Krimiwanderung</h3>
        <p class="muted" style="margin:0">Ein Fall für Soko Wuff - alle Krimiwanderungen gibt es als Geschenkgutschein.</p>
      </div>
      <div class="card card-pad">
        <h3>Kursstunden</h3>
        <p class="muted" style="margin:0">Fünf oder zehn Kursstunden zum Start in den Lieblingskurs.</p>
      </div>
      <div class="card card-pad">
        <h3>Hero4Hair</h3>
        <p class="muted" style="margin:0">Eine Runde Fellpflege zum Verwöhnen - vom Bürsten bis zum Scheren.</p>
      </div>
    </div>
    <div class="btn-row" style="margin-top:1.6rem;justify-content:center">
      <a class="btn btn-primary" href="${WA}">Gutschein anfragen</a>
    </div>
  </div>
</section>

${ctaBand('{r}', { title: 'Sei bei der nächsten Aktion dabei', text: 'Schreib uns, was dich interessiert - wir sagen dir, wann der nächste Fall, das nächste Seminar oder der nächste Club startet.', eyebrow: 'Mitmachen' })}
</main>`;

module.exports = [
  {
    file: 'events.html',
    html: layout({
      title: 'Events & Specials - Krimiwanderung, Dog Dance & Clubs - Hero4Paws',
      description:
        'Events bei Hero4Paws in Osnabrück: Krimiwanderung Soko Wuff, Dog Dance, Kids- und Teens-Paws-Club, Seminare, Stammtisch und Gutscheine.',
      active: 'events',
      body,
    }),
  },
];
