/* Inhalt: kurse.html - alle Kurse, Preise und Termine auf einer Seite */

const { layout, ctaBand, pageHead, ICONS } = require('./layout.cjs');

const W = 'https://wa.me/4915734777688';

const schedule = [
  ['Dienstag', '15:00', 'Club', ''],
  ['Dienstag', '16:30', 'Rally Obedience', '#rally-obedience'],
  ['Dienstag', '16:30', 'Agility', '#agility'],
  ['Dienstag', '18:00', 'Degility®', '#degility'],
  ['Dienstag', '18:00', 'Unterordnung', ''],
  ['Dienstag', '19:00', 'Dog Dance', 'events.html#dog-dance'],
  ['Donnerstag', '15:00', 'Hoopers', '#hoopers'],
  ['Donnerstag', '15:00', 'Kids-Paws-Club (6-10 Jahre)', 'events.html#clubs'],
  ['Donnerstag', '17:30', 'Obedience', ''],
  ['Donnerstag', '17:30', 'Klasse 3', ''],
  ['Freitag', '15:00', 'Degility®', '#degility'],
  ['Freitag', '15:00', 'Freilauf bis 40 cm', '#freilauf'],
  ['Freitag', '16:30', 'Police-Academy', ''],
  ['Freitag', '16:30', 'Agility', '#agility'],
  ['Freitag', '18:00', 'Ha(l)b8! Kleine Hunde', '#halb8'],
  ['Freitag', '18:00', 'Longieren', '#longieren'],
  ['Samstag', '10:00', 'Rookie Degility®', '#degility'],
  ['Samstag', '11:00', 'Degility®', '#degility'],
  ['Samstag', '12:30', 'Klasse 4', ''],
  ['Samstag', '14:00', 'Welpen „Mini"', '#welpengruppe'],
  ['Samstag', '15:30', 'Degility® Profi', '#degility'],
  ['Samstag', '15:30', 'Hab8!', '#hab8'],
  ['Sonntag', '10:00', 'Freilauf bis 40 cm', '#freilauf'],
  ['Sonntag', '10:00', 'Welpen Neu', '#welpengruppe'],
  ['Sonntag', '11:00', 'Welpen Klasse 1', '#welpengruppe'],
  ['Sonntag', '12:00', 'Welpen Klasse 2', '#welpengruppe'],
  ['Sonntag', '13:15', 'Freilauf mit Wiesenpass', '#freilauf'],
  ['Sonntag', '13:15', 'Offene Stunde (2. - 4. Sonntag)', ''],
  ['Sonntag', '14:00', 'Social Walk (1. Sonntag)', '#social-walk'],
];

function scheduleTable() {
  const groups = [];
  for (const row of schedule) {
    const last = groups[groups.length - 1];
    if (!last || last.day !== row[0]) groups.push({ day: row[0], rows: [row] });
    else last.rows.push(row);
  }
  const rows = groups
    .map((group) =>
      group.rows
        .map((row, i) => {
          const [, time, name, link] = row;
          const label = link ? `<a href="${link}">${name}</a>` : name;
          const first = i === 0;
          const dayCell = first
            ? `<td rowspan="${group.rows.length}">${group.day}</td>`
            : '';
          return `<tr${first ? ' class="group-start"' : ''}>${dayCell}<td><time>${time}</time></td><td>${label}</td></tr>`;
        })
        .join('\n            ')
    )
    .join('\n            ');
  return `<div class="table-scroll">
      <table class="schedule">
        <thead><tr><th>Tag</th><th>Uhrzeit</th><th>Kurs</th></tr></thead>
        <tbody>
            ${rows}
        </tbody>
      </table>
    </div>`;
}

function course({ id, title, tags = [], image, alt, paragraphs, facts, price, prices }) {
  const tagHtml = tags.map((t) => `<span class="tag olive">${t}</span>`).join(' ');
  const priceHtml = prices
    ? prices.map((p) => `<span class="price-tag">${p}</span>`).join(' ')
    : price
      ? `<span class="price-tag">${price}</span>`
      : '';
  return `<article class="course" id="${id}">
      <img src="assets/img/thumbs/${image}" alt="${alt}" loading="lazy">
      <div>
        <h3>${title} ${tagHtml}</h3>
        ${paragraphs.map((p) => `<p${p.startsWith('<') ? ' style="margin:0"' : ''}>${p}</p>`).join('\n        ')}
        ${facts ? `<div class="facts">\n          ${facts.map((f) => `<span class="price-tag" style="border-style:solid">${f}</span>`).join('\n          ')}\n        </div>` : ''}
        ${priceHtml ? `<p style="margin:.9rem 0 0">${priceHtml}</p>` : ''}
      </div>
    </article>`;
}

const body = `
<main id="main">
${pageHead('{r}', {
  crumbs: [{ label: 'Start', href: 'index.html' }, { label: 'Kurse & Preise' }],
  title: 'Kurse, Preise &amp; Termine',
  lead: 'Von der Welpenstunde bis zum Degility-Parcours: Hier findest du alle Kurse, unsere Preisliste und den aktuellen Wochenplan - alles auf einer Seite.',
})}
<section class="section-tight">
  <div class="wrap">
    <nav class="chip-nav" aria-label="Seitenabschnitte">
      <a href="#wochenplan">Wochenplan</a>
      <a href="#preise">Preise</a>
      <a href="#welpen">Welpen &amp; Junghunde</a>
      <a href="#kleine">Kleine Helden &amp; Freilauf</a>
      <a href="#sport">Sport &amp; Spiel</a>
      <a href="#individuell">Individuell &amp; Prüfungen</a>
    </nav>
  </div>
</section>

<section class="bg-cream-2" id="wochenplan">
  <div class="wrap">
    <div class="section-head">
      <p class="eyebrow">Termine</p>
      <h2>Kursübersicht ab 01.07.2026</h2>
      <p class="lead">Kurzfristige Änderungen sind möglich - frag im Zweifel einfach kurz per WhatsApp nach.</p>
    </div>
    ${scheduleTable()}
    <div class="note" style="margin-top:1.4rem">
      <strong>Gut zu wissen:</strong> Einzelstunden finden immer mittwochs nach Absprache statt. Termine für den Hundeführerschein vergeben wir individuell.
    </div>
    <div class="btn-row" style="margin-top:1.4rem">
      <a class="btn btn-outline" href="assets/img/kursplan.png" download>Kursplan als Bild herunterladen</a>
      <a class="btn btn-primary" href="kontakt.html">Platz anfragen</a>
    </div>
  </div>
</section>

<section id="preise">
  <div class="wrap">
    <div class="section-head">
      <p class="eyebrow">Preise</p>
      <h2>Faire Preise, klare Ansagen</h2>
      <p class="lead">Als Kleinunternehmerin im Sinne von § 19 Abs. 1 UStG berechne ich keine Umsatzsteuer.</p>
    </div>
    <div class="grid grid-3">
      <div class="card card-pad">
        <h3>Kursstunden</h3>
        <p><span class="price-tag">15,00 € pro Stunde</span></p>
        <p class="muted" style="margin:0">Alle Gruppenkurse - eine Unterrichtseinheit dauert 60 Minuten.</p>
      </div>
      <div class="card card-pad">
        <h3>Freilauf</h3>
        <p><span class="price-tag">5,00 € pro Hund</span></p>
        <p class="muted" style="margin:0">Freies Toben in passender Gruppe - Termine siehe Wochenplan.</p>
      </div>
      <div class="card card-pad">
        <h3>Social Walk</h3>
        <p><span class="price-tag">10,00 € pro Familie/Hund</span></p>
        <p class="muted" style="margin:0">Geführter Spaziergang in der Gruppe.</p>
      </div>
      <div class="card card-pad">
        <h3>Einzelstunde</h3>
        <p><span class="price-tag">65,00 € auf dem Platz</span> <span class="price-tag">75,00 € Hausbesuch</span></p>
        <p class="muted" style="margin:0">Hausbesuche innerhalb von Osnabrück. Außerhalb zzgl. km-Pauschale. Termine mittwochs nach Absprache.</p>
      </div>
      <div class="card card-pad">
        <h3>Maulkorbtraining &amp; Beratung</h3>
        <p><span class="price-tag">30,00 €</span></p>
        <p class="muted" style="margin:0">Von der Anprobe über die Bestellung bis zum Tragen.</p>
      </div>
      <div class="card card-pad">
        <h3>Degility Rookie-Kurs</h3>
        <p><span class="price-tag">50,00 € einmalig</span></p>
        <p class="muted" style="margin:0">Einführungskurs, mindestens 3 Besuche - danach geht es in die Parcours-Kurse.</p>
      </div>
      <div class="card card-pad">
        <h3>Kids- &amp; Teens-Paws-Club</h3>
        <p><span class="price-tag">15,00 € pro Woche</span></p>
        <p class="muted" style="margin:0">Donnerstags für Kinder und Teens von 6 bis 16 Jahren.</p>
      </div>
      <div class="card card-pad">
        <h3>Krimiwanderung Soko Wuff</h3>
        <p><span class="price-tag">40,00 € pro Team</span></p>
        <p class="muted" style="margin:0">Jede weitere Begleitperson oder jeder weitere Hund 10,00 €. Auch als Geschenkgutschein.</p>
      </div>
      <div class="card card-pad">
        <h3>Hundeführerschein</h3>
        <p><span class="price-tag">je 70,00 €</span></p>
        <p class="muted" style="margin:0">Theoretische und praktische Prüfung, Vorbereitungskurs inklusive Übungsbögen.</p>
      </div>
    </div>
  </div>
</section>

<section class="bg-cream-2" id="welpen">
  <div class="wrap">
    <div class="section-head">
      <p class="eyebrow">Gruppe 1</p>
      <h2>Welpen &amp; Junghunde</h2>
      <p class="lead">Die ersten Monate entscheiden: Wir begleiten euch vom ersten Kennenlernen bis durch die Pubertät.</p>
    </div>
    ${course({
      id: 'welpengruppe',
      title: 'Welpengruppe',
      tags: ['Sonntags &amp; samstags'],
      image: 'galerie-53.jpg',
      alt: 'Welpe wird auf dem Arm gehalten',
      paragraphs: [
        'In unserer Welpengruppe lernen die Hunde unter Anleitung die Grundlagen von Erziehung, Kommunikation und Sozialisation. Die Minis spielen mit Artgenossen unterschiedlicher Rassen, Größen und Charaktere und sammeln dabei positive Erfahrungen.',
        'Die Welpengruppe ist eine kluge Investition in deinen Hund: Sie hilft ihm, ein ausgeglichener und sicherer Begleiter zu werden.',
      ],
      facts: ['So 10:00 Welpen „Neu"', 'So 11:00 Klasse 1', 'So 12:00 Klasse 2', 'Sa 14:00 Welpen „Mini"'],
      price: '15,00 € pro Stunde',
    })}
    ${course({
      id: 'junghunde',
      title: 'Junghunde',
      tags: ['Pubertät'],
      image: 'galerie-38.jpg',
      alt: 'Junger Hund tobt über die Wiese',
      paragraphs: [
        'Wenn Mutti und Vati schwierig werden, braucht das Pubertier jemanden, der vermittelt. Anders als leider oft üblich, treffen unsere jungen Wilden gesittet und in Ruhe aufeinander.',
        'Das heißt nicht, dass sie nie im Freispiel miteinander agieren dürfen - sondern dass sie von Anfang an lernen, mit Geduld statt Hektik zum Ziel zu kommen.',
      ],
      facts: ['Zeiten laut Wochenplan', 'Leinenführung &amp; Rückruf', 'Impulskontrolle', 'Alltagssituationen üben'],
      price: '15,00 € pro Stunde',
    })}
    ${course({
      id: 'hab8',
      title: 'Hab8!',
      tags: ['Ab ca. 1 Jahr', 'Samstags 15:30'],
      image: 'galerie-41.jpg',
      alt: 'Großer dunkler Hund an der Leine',
      paragraphs: [
        '„Das hat er noch nie gemacht!" - oder „eigentlich kann er das"? Wir starten nochmal da, wo in der Pubertät plötzlich das Baustellenschild aufgestellt wurde.',
        'Wir finden heraus, wo sich Probleme und Missverständnisse eingeschlichen haben - und lernen, wie wichtig unsere Körpersprache und Energie im Alltag mit unseren Hunden ist. Für jagende Jagdhunde, schützende Herdenschützer, hütende Hütehunde und alle anderen: Hund lernt nie aus.',
      ],
      facts: ['Immer samstags 15:30 Uhr'],
      price: '15,00 € pro Stunde',
    })}
    ${course({
      id: 'halb8',
      title: 'Ha(l)b 8',
      tags: ['Kleine Hunde', 'Freitags 18:00'],
      image: 'kleine-helden-07.jpg',
      alt: 'Kleine Hunde beim Training',
      paragraphs: [
        'Der Erziehungskurs für Junghunde kleiner Hunde: Auch kleine Pubertiere brauchen jemanden, der mit ihnen durch diese Zeit geht.',
        'Wenn es Halb8 ist, solltet ihr schnell diesen Kurs besuchen :-)',
      ],
      facts: ['Freitags 18:00 Uhr'],
      price: '15,00 € pro Stunde',
    })}
  </div>
</section>

<section id="kleine">
  <div class="wrap">
    <div class="section-head">
      <p class="eyebrow">Gruppe 2</p>
      <h2>Kleine Helden &amp; Freilauf</h2>
      <p class="lead">Groß und Klein getrennt - so fühlt sich jeder Hund sicher und kann unbeschwert toben.</p>
    </div>
    ${course({
      id: 'kleine-helden',
      title: 'Kleine Helden',
      tags: ['Bis 40 cm Schulterhöhe'],
      image: 'kleine-helden-02.jpg',
      alt: 'Kleine Hunde toben auf der Wiese',
      paragraphs: [
        'Bei den „Kleinen Helden" können Hunde mit einer Schulterhöhe von bis zu 40 cm teilnehmen. Neben Spielen und Toben bleibt stets Zeit für eine kleine Trainingseinheit.',
      ],
      facts: ['Spielen &amp; Toben mit passenden Partnern', 'Kurze Trainingseinheiten', 'Eigene Freilauf-Gruppen bis 40 cm'],
      price: '15,00 € pro Stunde',
    })}
    ${course({
      id: 'freilauf',
      title: 'Freilauf',
      tags: ['Freies Toben'],
      image: 'galerie-11.jpg',
      alt: 'Hunde toben ausgelassen im Schnee',
      paragraphs: [
        'Beim Freilauf dürfen die Hunde einfach mal Hund sein: rennen, spielen, schnüffeln. Wir achten darauf, dass die Gruppen zusammenpassen - Groß und Klein kommen nicht durcheinander.',
        'Du bist unsicher, ob Freilauf für deinen Hund passt? Sprich uns an, wir schauen gemeinsam.',
      ],
      facts: ['Fr 15:00 Freilauf bis 40 cm', 'So 10:00 Freilauf bis 40 cm', 'So 13:15 Freilauf mit Wiesenpass'],
      price: '5,00 € pro Hund',
    })}
    ${course({
      id: 'social-walk',
      title: 'Social Walk',
      tags: ['1. Sonntag im Monat, 14:00'],
      image: 'social-walk-01.jpg',
      alt: 'Gruppe läuft mit Hunden spazieren',
      paragraphs: [
        'Geführte Spaziergänge, bei denen ihr lernt, entspannt in der Gruppe unterwegs zu sein: ruhiges Tempo, klare Regeln, viel Abstand.',
        'Ideal für Hunde, die bei Begegnungen noch unsicher oder aufgeregt sind - und für Menschen, die einfach gemeinsam mit Gleichgesinnten unterwegs sein wollen.',
      ],
      facts: ['Ruhiges Tempo', 'Begegnungen üben', 'Ohne Leinenziehen'],
      price: '10,00 € pro Familie/Hund',
    })}
  </div>
</section>

<section class="bg-cream-2" id="sport">
  <div class="wrap">
    <div class="section-head">
      <p class="eyebrow">Gruppe 3</p>
      <h2>Sport &amp; Spiel</h2>
      <p class="lead">Beschäftigung, die Körper und Kopf fordert - vom Parcours bis zur Präzisionsarbeit.</p>
    </div>
    ${course({
      id: 'hoopers',
      title: 'Hoopers',
      tags: ['Für Jederhund', 'Donnerstags 15:00'],
      image: 'anlage-05.jpg',
      alt: 'Trainingsgelände mit Geräten',
      paragraphs: [
        'Hoopers ist eine Hundesportart, bei der ihr einen Hindernisparcours aus Hoops, Tunneln, Tonnen und Gates fehlerfrei bewältigt. Eine reibungslose Zusammenarbeit und Geschicklichkeit im Team sind die Grundlagen.',
        'Geeignet für Jedermann und „Jederhund" - Alter, Rasse und Größe spielen kaum eine Rolle. Auch für Hunde, die nicht (mehr) springen dürfen, und für Hundeführer, die nicht mehr ganz so gut zu Fuß sind.',
      ],
      facts: ['Donnerstags 15:00 Uhr', 'Kein Springen nötig'],
      price: '15,00 € pro Stunde',
    })}
    ${course({
      id: 'longieren',
      title: 'Longieren',
      tags: ['Bindung', 'Freitags 18:00'],
      image: 'longieren-01.jpg',
      alt: 'Hund läuft im Kreis um die Hundeführerin',
      paragraphs: [
        'Beim Longieren läuft der Hund auf einem Kreis um dich herum - gelenkt mit Körpersprache, Stimme und Signalen. Das Ziel: Bindung stärken, Aufmerksamkeit und Gehorsam fördern, Hund körperlich und geistig auslasten.',
        'Ursprünglich aus dem Pferdesport, heute eine abwechslungsreiche Beschäftigung für fast alle Hunde - unabhängig von Alter, Rasse oder Größe.',
      ],
      facts: ['Freitags 18:00 Uhr', 'Körpersprache schulen'],
      price: '15,00 € pro Stunde',
    })}
    ${course({
      id: 'agility',
      title: 'Agility',
      tags: ['Tempo &amp; Teamwork', 'Di &amp; Fr 16:30'],
      image: 'galerie-21.jpg',
      alt: 'Hund springt im Schnee',
      paragraphs: [
        'Gemeinsam einen Hindernisparcours aus Hürden, Tunnel, Slalom und Co. meistern - mit Tempo, Präzision und jeder Menge Teamwork.',
        'Die Geräte werden Schritt für Schritt und altersgerecht aufgebaut, damit dein Hund sicher und motiviert läuft. Anfänger starten in einer eigenen Gruppe, Vorkenntnisse brauchst du keine.',
      ],
      facts: ['Dienstags &amp; freitags 16:30 Uhr', 'Anfänger willkommen'],
      price: '15,00 € pro Stunde',
    })}
    ${course({
      id: 'degility',
      title: 'Degility®',
      tags: ['Ohne Wettkampf', 'Di, Fr &amp; Sa'],
      image: 'degility-01.jpg',
      alt: 'Hund balanciert über einen Degility-Parcours',
      paragraphs: [
        'Degility kombiniert Elemente aus Agility, Obedience und Geschicklichkeit - ohne Schnelligkeit oder Wettkampf. Im Vordergrund stehen Spaß und Teamwork zwischen Hund und Mensch.',
        'Geeignet für Hunde aller Rassen, Größen und Altersklassen, auch für Hunde mit Handicap oder gesundheitlichen Einschränkungen. <strong>Neu:</strong> Für Einsteiger gibt es den Rookie-Kurs samstags um 10:00 Uhr - mindestens 3 Besuche, danach gibt es die Freigabe für die Parcours-Kurse. Geschirr und Halsband sind Pflicht.',
      ],
      facts: ['Rookie-Kurs Sa 10:00', 'Degility® Sa 11:00 &amp; Di 18:00 / Fr 15:00', 'Profi Sa 15:30'],
      prices: ['Rookie-Kurs 50,00 € einmalig', '15,00 € pro Stunde'],
    })}
    ${course({
      id: 'rally-obedience',
      title: 'Rally-Obedience',
      tags: ['Präzision', 'Dienstags 16:30'],
      image: 'galerie-36.jpg',
      alt: 'Hund wird im Schnee geführt',
      paragraphs: [
        'Der Hundeführer durchläuft mit seinem Hund einen vorgegebenen Parcours, der möglichst präzise abzuarbeiten ist. An jeder Station steht ein Schild, das zeigt, was zu tun ist und wohin es weitergeht.',
        'Das Besondere: Hund und Mensch dürfen und müssen ständig miteinander kommunizieren - der Hund darf jederzeit angesprochen, motiviert und gelobt werden. Klassische Übungen wie Sitz, Platz und Steh treffen auf Richtungswechsel, Slalom und Abrufübungen.',
      ],
      facts: ['Dienstags 16:30 Uhr'],
      price: '15,00 € pro Stunde',
    })}
  </div>
</section>

<section id="individuell">
  <div class="wrap">
    <div class="section-head">
      <p class="eyebrow">Gruppe 4</p>
      <h2>Individuell &amp; Prüfungen</h2>
      <p class="lead">Wenn es nicht in die Gruppe passt - oder wenn ein Nachweis gefragt ist.</p>
    </div>
    ${course({
      id: 'einzelstunde',
      title: 'Einzelstunde',
      tags: ['Mittwochs nach Absprache'],
      image: 'galerie-45.jpg',
      alt: 'Frauchen arbeitet mit ihrem Hund',
      paragraphs: [
        'Probleme zu Hause, beim Spaziergang - oder wo es sonst hakt? Wir besprechen, was wir in den nächsten Wochen gemeinsam erreichen wollen, und erarbeiten anhand eurer Angaben einen Trainingsplan als roten Faden.',
        'So können wir immer wieder überprüfen, wo ihr steht und wo das Training intensiviert werden sollte. <a href="kontakt.html">Termin anfragen</a> - Hausbesuche sind möglich.',
      ],
      prices: ['65,00 € auf dem Platz', '75,00 € Hausbesuch in Osnabrück', 'außerhalb zzgl. km-Pauschale'],
    })}
    ${course({
      id: 'maulkorbtraining',
      title: 'Maulkorbtraining &amp; Beratung',
      tags: ['Schritt für Schritt'],
      image: 'maulkorb-01.jpg',
      alt: 'Hund mit Maulkorb',
      paragraphs: [
        'Ein Maulkorb ist kein Makel - er kann Sicherheit geben. Wir helfen, den richtigen Korb auszuwählen, ihn positiv zu verknüpfen und die Tragezeit langsam zu steigern.',
        'Wir begleiten euch von der Anprobe über die Bestellung bis zum Tragen - denn der Hund soll sich wohlfühlen :-)',
      ],
      facts: ['Anprobe &amp; Auswahl', 'Positiv aufbauen', 'Tragezeit steigern'],
      price: '30,00 € für die Beratung',
    })}
    ${course({
      id: 'hundefuehrerschein',
      title: 'Hundeführerschein / Sachkunde',
      tags: ['Niedersachsen', 'Termine nach Absprache'],
      image: 'fuehrerschein-01.jpg',
      alt: 'D.O.Q. Test 2.0 - Informationen zur Sachkundeprüfung',
      paragraphs: [
        'Seit Juli 2013 müssen Hundebesitzer in Niedersachsen einen Sachkundenachweis erbringen - für alle Hunde, die nach dem 1. Juli 2011 angeschafft wurden, unabhängig von der Rasse. Die theoretische Prüfung ist vor der Anschaffung nötig, die praktische kannst du danach ablegen - oder ebenfalls vorher.',
        'Wir bereiten dich in Theorie und Praxis vor: Der Vorbereitungskurs enthält die theoretischen Fragebögen und Training für die praktische Prüfung. Theorie in der Hundeschule, Praxis im Stadtbereich (ca. 60 Minuten).',
      ],
      facts: ['Theorie 70,00 €', 'Praxis 70,00 €', 'Vorbereitungskurs inklusive'],
    })}
  </div>
</section>

${ctaBand('{r}', { title: 'Nicht sicher, welcher Kurs passt?', text: 'Erzähl uns von deinem Hund - wir finden das passende Angebot und sagen dir ehrlich, wenn etwas anderes besser wäre.', eyebrow: 'Beratung' })}
</main>`;

module.exports = [
  {
    file: 'kurse.html',
    html: layout({
      title: 'Kurse, Preise & Termine - Hero4Paws Hundeschule Osnabrück',
      description:
        'Alle Kurse der Hundeschule Hero4Paws in Osnabrück: Welpengruppe, Junghunde, Degility, Hoopers, Agility, Rally-Obedience, Social Walk, Freilauf, Einzelstunden, Maulkorbtraining und Hundeführerschein. Mit Preisliste und Wochenplan.',
      active: 'kurse',
      body,
    }),
  },
];
