const fs = require('fs')
const path = require('path')

const ROOT = 'C:/Dev/Test/OpenCodeDeepSeek/Hero4Paws-Website'
const content = JSON.parse(fs.readFileSync(path.join(ROOT, 'tools', 'sanity', 'content.json'), 'utf8'))
const OUT_DIR = path.join(ROOT, 'studio', 'import')
const OUT = path.join(OUT_DIR, 'content.ndjson')
fs.mkdirSync(OUT_DIR, {recursive: true})

let keyCounter = 0
const strip = (s) =>
  (s || '')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#8239;|&#x202f;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

function spansFromHtml(html) {
  const markDefs = []
  const children = []
  const re = /<strong>(.*?)<\/strong>|<a href="([^"]+)"[^>]*>(.*?)<\/a>|<br\s*\/?>|([^<]+)/gis
  let m
  while ((m = re.exec(html || ''))) {
    if (m[1] !== undefined) {
      children.push({_type: 'span', _key: `s${keyCounter++}`, text: strip(m[1]), marks: ['strong']})
    } else if (m[2] !== undefined) {
      const key = `link${keyCounter++}`
      markDefs.push({_key: key, _type: 'link', href: m[2], blank: false})
      children.push({_type: 'span', _key: `s${keyCounter++}`, text: strip(m[3]), marks: [key]})
    } else if (m[4] !== undefined) {
      children.push({_type: 'span', _key: `s${keyCounter++}`, text: strip(m[4]), marks: []})
    }
  }
  if (!children.length) children.push({_type: 'span', _key: `s${keyCounter++}`, text: '', marks: []})
  return {children, markDefs}
}

function pt(paragraphs) {
  const list = (Array.isArray(paragraphs) ? paragraphs : [paragraphs]).filter((p) => strip(p))
  return list.map((html, i) => {
    const {children, markDefs} = spansFromHtml(html)
    return {_type: 'block', _key: `blk${keyCounter++}`, style: 'normal', markDefs, children}
  })
}

const asset = (file) =>
  'image@file:///' + path.join(ROOT, 'assets', 'img', file).replace(/\\/g, '/')

const image = (file, alt) => ({
  _type: 'image',
  _sanityAsset: asset(file),
  alt: alt || undefined,
})

const docs = []
const push = (doc) => docs.push(doc)

const fixIds = (value) => {
  if (Array.isArray(value)) return value.map(fixIds)
  if (value && typeof value === 'object') {
    const out = {}
    for (const [k, v] of Object.entries(value)) {
      out[k] = k === '_id' || k === '_ref' ? String(v).replace(/\./g, '-') : fixIds(v)
    }
    return out
  }
  return value
}

const slugId = (prefix, slug) => `${prefix}.${slug}`

const courseSlug = (id) => id
const courseIds = content.courses.map((c) => slugId('course', courseSlug(c.id)))

const groupSlugs = ['welpen', 'kleine', 'sport', 'individuell']
content.courseGroups.forEach((g, i) => {
  push({
    _id: slugId('group', groupSlugs[i]),
    _type: 'courseGroup',
    title: g.title.replace(/^Gruppe \d+: /, ''),
    slug: {_type: 'slug', current: groupSlugs[i]},
    lead: g.lead,
    position: i + 1,
  })
})

const priceId = (slug) => `price.${slug}`
const priceSlugFromLabel = (label) =>
  strip(label)
    .toLowerCase()
    .replace(/[äöüß]/g, (c) => ({ä: 'ae', ö: 'oe', ü: 'ue', ß: 'ss'})[c])
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const priceDoc = (slug, title, labels, note, category, position) => ({
  _id: priceId(slug),
  _type: 'priceItem',
  title,
  category,
  labels,
  note: note || undefined,
  position,
})

content.prices.forEach((p, i) => {
  push(priceDoc(priceSlugFromLabel(p.title), p.title, p.labels, p.note, 'kurse', i + 1))
})

const hairPrices = content.hair.prices
  .map((line) => {
    const m = line.match(/^(.*?):\s*(.*)$/)
    return m ? {title: strip(m[1]), label: strip(m[2])} : {title: strip(line), label: ''}
  })
  .filter((p) => p.label && !/termin/i.test(p.title))
hairPrices.forEach((p, i) => {
  push(priceDoc(priceSlugFromLabel(p.title), p.title, [p.label], '', 'hair', i + 1))
})

const krimiPrice = content.events.krimi?.price || '40,00 € pro Mensch-Hund-Team'
push(priceDoc('krimiwanderung', 'Krimiwanderung', [krimiPrice], content.events.krimi?.priceNote || '', 'events', 1))
const clubPrice = content.events.clubs?.cards?.[0]?.price || '15,00 € pro Woche'
push(priceDoc('paws-club', 'Kids- & Teens-Paws-Club', [clubPrice], '', 'events', 2))

const priceByLabel = {}
for (const d of docs.filter((x) => x._type === 'priceItem')) {
  for (const label of d.labels) priceByLabel[strip(label)] = d._id
}

const coursePriceRefs = (labels) => {
  const refs = []
  for (const label of labels) {
    const clean = strip(label).replace(/^(Rookie-Kurs|Kursstunde)\s+/i, '')
    const hit = Object.keys(priceByLabel).find(
      (k) => clean === k || clean.includes(k) || k.includes(clean)
    )
    if (hit && !refs.includes(priceByLabel[hit])) refs.push(priceByLabel[hit])
  }
  return refs
}

const courseToGroup = {
  welpengruppe: 'welpen',
  junghunde: 'welpen',
  hab8: 'welpen',
  halb8: 'welpen',
  'kleine-helden': 'kleine',
  freilauf: 'kleine',
  'social-walk': 'kleine',
  hoopers: 'sport',
  longieren: 'sport',
  agility: 'sport',
  degility: 'sport',
  'rally-obedience': 'sport',
  einzelstunde: 'individuell',
  maulkorbtraining: 'individuell',
  hundefuehrerschein: 'individuell',
}

const featured = ['welpengruppe', 'junghunde', 'kleine-helden', 'degility', 'longieren', 'social-walk']

content.courses.forEach((c, i) => {
  const imageFile = (c.image || '').split('/').pop()
  push({
    _id: slugId('course', courseSlug(c.id)),
    _type: 'course',
    title: c.title,
    slug: {_type: 'slug', current: courseSlug(c.id)},
    group: {_type: 'reference', _ref: slugId('group', courseToGroup[c.id] || 'welpen')},
    tags: c.tags.map(strip),
    teaser: strip(c.intro[0] || '').slice(0, 200),
    intro: pt(c.intro),
    facts: c.facts.map(strip),
    prices: coursePriceRefs(c.prices).map((ref) => ({_type: 'reference', _ref: ref, _key: ref})),
    image: imageFile ? image(imageFile, c.alt) : undefined,
    featuredOnHome: featured.includes(c.id),
    position: i + 1,
  })
})

content.schedule.forEach((s, i) => {
  const anchor = (s.anchor || '').split('#').pop()
  const linked = s.anchor && s.anchor.includes('#') ? courseIds.includes(slugId('course', anchor)) : false
  push({
    _id: `schedule.${i + 1}`,
    _type: 'scheduleEntry',
    day: s.day,
    time: s.time,
    title: s.title,
    course: linked ? {_type: 'reference', _ref: slugId('course', anchor)} : undefined,
    position: i + 1,
  })
})

const ev = content.events
const eventDoc = (slug, {title, category, eyebrow, lead, body, facts, price, imageFile, imageAlt, position}) => ({
  _id: `event.${slug}`,
  _type: 'event',
  title,
  slug: {_type: 'slug', current: slug},
  category,
  eyebrow: eyebrow || undefined,
  lead: lead || undefined,
  body: body ? pt(body) : undefined,
  facts: (facts || []).map(strip),
  price: price ? {_type: 'reference', _ref: price} : undefined,
  image: imageFile ? image(imageFile, imageAlt) : undefined,
  position,
})

const fileOf = (src) => (src || '').split('/').pop()

if (ev.krimi) {
  push(
    eventDoc('krimiwanderung-mit-hund', {
      title: 'Krimiwanderung mit Hund',
      category: 'krimiwanderung',
      eyebrow: ev.krimi.eyebrow,
      lead: strip(ev.krimi.lead || ev.krimi.paragraphs[0] || ''),
      body: ev.krimi.paragraphs.slice(1),
      facts: [...(ev.krimi.lists?.[0] || []), ...(ev.krimi.lists?.[1] || [])].map(strip),
      price: priceId('krimiwanderung'),
      imageFile: fileOf(ev.krimi.image),
      imageAlt: ev.krimi.imageAlt,
      position: 1,
    })
  )
}
if (ev.dogdance) {
  push(
    eventDoc('dog-dance', {
      title: 'Dog Dance',
      category: 'dog-dance',
      eyebrow: ev.dogdance.eyebrow,
      lead: strip(ev.dogdance.paragraphs[0] || ''),
      facts: (ev.dogdance.lists?.[0] || []).map(strip),
      imageFile: fileOf(ev.dogdance.image),
      imageAlt: ev.dogdance.imageAlt,
      position: 2,
    })
  )
}
;(ev.clubs?.cards || []).forEach((card, i) => {
  push(
    eventDoc(i === 0 ? 'kids-paws-club' : 'teens-paws-club', {
      title: card.title.replace(/\s*\(.*\)$/, ''),
      category: 'club',
      eyebrow: card.meta,
      lead: strip(card.text),
      facts: [card.meta, card.price].filter(Boolean).map(strip),
      price: priceId('paws-club'),
      imageFile: fileOf(card.image),
      imageAlt: card.imageAlt,
      position: 3 + i,
    })
  )
})
if (ev.seminare) {
  push(
    eventDoc('seminare', {
      title: 'Seminare & Workshops',
      category: 'seminar',
      eyebrow: ev.seminare.eyebrow,
      lead: strip(ev.seminare.paragraphs[0] || ''),
      body: ev.seminare.paragraphs.slice(1),
      position: 5,
    })
  )
}
if (ev.stammtisch) {
  push(
    eventDoc('stammtisch', {
      title: 'Stammtisch',
      category: 'stammtisch',
      eyebrow: ev.stammtisch.eyebrow,
      lead: strip(ev.stammtisch.paragraphs[0] || ''),
      facts: (ev.stammtisch.lists?.[0] || []).map(strip),
      position: 6,
    })
  )
}

const galleryPlan = []
fs.readdirSync(path.join(ROOT, 'assets', 'img'))
  .filter((f) => /^galerie-\d+\.jpg$/.test(f))
  .sort()
  .forEach((f, i) => galleryPlan.push({file: f, category: 'training', position: i + 1}))
fs.readdirSync(path.join(ROOT, 'assets', 'img'))
  .filter((f) => /^kleine-helden-\d+\.jpg$/.test(f))
  .sort()
  .forEach((f, i) => galleryPlan.push({file: f, category: 'kleine-helden', position: i + 1}))
;['anlage-01.jpg', 'anlage-05.jpg', 'anlage-06.jpg', 'anlage-07.jpg', 'anlage-08.jpg', 'anlage-09.jpg', 'anlage-11.jpg', 'anlage-12.jpg', 'anlage-02.jpg', 'anlage-03.jpg', 'anlage-04.jpg', 'anlage-10.jpg'].forEach(
  (f, i) => galleryPlan.push({file: f, category: 'anlage', position: i + 1})
)
;['presse-01.webp', 'presse-02.webp', 'presse-03.webp'].forEach((f, i) =>
  galleryPlan.push({file: f, category: 'presse', position: i + 1})
)

const categoryAlt = {
  training: 'Hundetraining bei Hero4Paws in Osnabrück',
  'kleine-helden': 'Kleine Helden - kleine Hunde beim Training bei Hero4Paws',
  anlage: 'Unsere Anlage in Osnabrück-Voxtrup',
  presse: 'Zeitungsartikel über die Hundeschule Hero4Paws',
}
galleryPlan.forEach((g, i) => {
  push({
    _id: `gallery.${String(i + 1).padStart(3, '0')}`,
    _type: 'galleryImage',
    image: image(g.file, `${categoryAlt[g.category]} (${g.position})`),
    category: g.category,
    position: g.position,
  })
})

content.testimonials.forEach((t, i) => {
  push({
    _id: `testimonial.${i + 1}`,
    _type: 'testimonial',
    name: t.name,
    quote: t.quote.replace(/^„|"$/g, '').replace(/^"|"$/g, ''),
    position: i + 1,
  })
})

push({
  _id: 'siteSettings',
  _type: 'siteSettings',
  businessName: 'Hero4Paws',
  legalName: 'Hundeschule Katja Heldt',
  claim: 'Mit Herz. Mit Wissen. Für euch.',
  street: 'Am Sonnebrink 7',
  zip: '49086',
  city: 'Osnabrück',
  locationNote: 'zwischen Voxtrup und Bissendorf',
  phone: '01573 4 777 688',
  whatsapp: '4915734777688',
  email: 'hero4paws@gmx.de',
  instagramUrl: 'https://www.instagram.com/hero4paws/',
  facebookUrl: 'https://www.facebook.com/profile.php?id=61553829191021',
  mapsUrl: 'https://maps.google.com/?q=Am+Sonnebrink+7,+49086+Osnabr%C3%BCck',
  footerText:
    'Hundeschule Katja Heldt in Osnabrück-Voxtrup - auf über 8000 m² eigener Anlage.',
  taxNote:
    'Als Kleinunternehmerin im Sinne von § 19 Abs. 1 UStG berechne ich keine Umsatzsteuer.',
  gutZuWissen: [
    'Alle Trainingszeiten findest du im Wochenplan',
    'Änderungen bei Wetter, Urlaub oder Krankheit geben wir kurzfristig bekannt',
    'Gutscheine für Kurse und Krimiwanderungen gibt es auf Anfrage',
  ],
})

const cta = (eyebrow, headline, text) => ({
  _type: 'ctaBand',
  eyebrow,
  headline,
  text,
  primary: {label: 'Kontakt aufnehmen', href: 'kontakt.html'},
  secondary: {label: '01573 4 777 688', href: 'tel:+4915734777688'},
  tone: 'olive',
})

push({
  _id: 'homePage',
  _type: 'homePage',
  title: 'Startseite',
  eyebrow: 'Hundeschule in Osnabrück-Voxtrup',
  lead: '',
  sections: [
    {
      _type: 'hero',
      _key: 'home-hero',
      badge: content.home.badge,
      headline: content.home.headline.replace(/\.$/, ''),
      headlineAccent: content.home.accent,
      lead: content.home.claim,
      facts: content.home.facts.map(strip),
      image: image('galerie-34.jpg', 'Golden Retriever im Schnee'),
      imageSecondary: image('ueber-uns-1.jpg', 'Katja Heldt mit ihren Hunden'),
      sticker: content.home.sticker,
      primary: {label: 'Kurse entdecken', href: 'kurse.html'},
      secondary: {label: 'Erstmal kennenlernen', href: 'kontakt.html'},
      tone: 'default',
    },
    {
      _type: 'featureGrid',
      _key: 'home-usps',
      eyebrow: 'So arbeiten wir',
      headline: 'Training, bei dem Hund und Mensch sich wohlfühlen',
      items: content.home.usps.map((u, i) => ({
        _key: `usp${i}`,
        title: u.title,
        text: u.text,
        icon: ['paw', 'pin', 'heart'][i] || 'paw',
      })),
      columns: 3,
      tone: 'cream',
    },
    {
      _type: 'courseHighlights',
      _key: 'home-courses',
      eyebrow: 'Unsere Kurse',
      headline: 'Für jede Pfote ist etwas dabei',
      lead: 'Von der ersten Welpenstunde bis zur anspruchsvollen Parcours-Arbeit.',
      courses: featured.map((slug, i) => ({
        _key: `c${i}`,
        _type: 'reference',
        _ref: slugId('course', slug),
      })),
      primary: {label: 'Alle Kurse, Preise & Zeiten', href: 'kurse.html'},
      tone: 'default',
    },
    {
      _type: 'eventList',
      _key: 'home-events',
      eyebrow: 'Neu bei Hero4Paws',
      headline: 'Dog Dance & Paws Clubs',
      lead: 'Bewegung, die verbindet - und Angebote für Kinder und Teens, die Hunde lieben.',
      events: ['event.dog-dance', 'event.kids-paws-club', 'event.teens-paws-club'].map((id, i) => ({
        _key: `e${i}`,
        _type: 'reference',
        _ref: id,
      })),
      tone: 'cream',
    },
    {
      _type: 'textImage',
      _key: 'home-about',
      eyebrow: 'Über mich',
      headline: '„Sei höflich zu deinem Hund."',
      body: pt([
        content.about.intro[0] || '',
        content.about.intro[1] || '',
      ]),
      items: content.about.qualification.slice(0, 3),
      image: image('ueber-uns-1.jpg', 'Katja Heldt mit ihren Hunden Berta und Henry'),
      imageSecondary: image('ueber-uns-4.jpg', 'Zwergpudel Henry'),
      layout: 'imageRight',
      primary: {label: 'Mehr über mich', href: 'ueber-uns.html'},
      tone: 'default',
    },
    {_type: 'testimonials', _key: 'home-quotes', eyebrow: 'Aus dem Gästebuch', headline: 'Das sagen unsere Menschen', limit: 4, tone: 'cream'},
    {
      _type: 'galleryGrid',
      _key: 'home-gallery',
      eyebrow: 'Galerie',
      headline: 'Momente aus dem Training',
      category: 'training',
      limit: 8,
      primary: {label: 'Zur ganzen Galerie', href: 'galerie.html'},
      tone: 'default',
    },
    {
      _type: 'faq',
      _key: 'home-faq',
      eyebrow: 'Häufige Fragen',
      headline: 'Gut zu wissen',
      items: [
        {_key: 'f1', question: 'Wie läuft die erste Stunde ab?', answer: 'Wir lernen uns und deinen Hund in Ruhe kennen, schauen uns euren Alltag an und finden heraus, welcher Kurs passt.'},
        {_key: 'f2', question: 'Was kostet eine Kursstunde?', answer: 'Eine Kursstunde (60 Minuten) kostet 15,00 €. Freilauf 5,00 €, Social Walk 10,00 €.'},
        {_key: 'f3', question: 'Muss mein Hund geimpft sein?', answer: 'Ja, der teilnehmende Hund braucht vollen Impfschutz. Eine Haftpflichtversicherung ist empfohlen.'},
        {_key: 'f4', question: 'Wo findet das Training statt?', answer: 'Auf unserer Anlage in Osnabrück zwischen Voxtrup und Bissendorf, Am Sonnebrink 7. Parkplätze sind vorhanden.'},
      ],
      tone: 'cream',
    },
    cta('Lust bekommen?', 'Dann lass uns kennenlernen!', 'Erzähl uns kurz von dir und deinem Hund - wir finden gemeinsam den passenden Kurs.'),
  ],
})

push({
  _id: 'aboutPage',
  _type: 'aboutPage',
  title: 'Über uns',
  eyebrow: 'Über mich',
  lead: 'Katja Heldt-Lewerentz, ihre Hunde und unser Gelände - die Menschen und der Ort hinter Hero4Paws.',
  sections: [
    {
      _type: 'textImage',
      _key: 'about-katja',
      eyebrow: 'Über mich',
      headline: 'Ich habe das Rad nicht neu erfunden ...',
      body: pt(content.about.intro),
      items: content.about.qualification,
      image: image('ueber-uns-1.jpg', 'Katja Heldt mit ihren Hunden Berta und Henry'),
      imageSecondary: image('ueber-uns-3.jpg', 'Zwergpudel Henry'),
      layout: 'imageLeft',
      tone: 'default',
    },
    {
      _type: 'featureGrid',
      _key: 'about-approach',
      eyebrow: 'Unser Ansatz',
      headline: '„Sei höflich zu deinem Hund."',
      lead: 'Dieser Satz von Masih Samin hat mich sehr geprägt. Ein Hund braucht Grenzen - wir vermitteln sie freundlich und höflich.',
      items: content.about.approach.map((a, i) => ({
        _key: `a${i}`,
        title: a.title,
        text: a.text,
        icon: ['paw', 'users', 'clock'][i] || 'paw',
      })),
      columns: 3,
      tone: 'cream',
    },
    {
      _type: 'textImage',
      _key: 'about-facility',
      eyebrow: 'Die Anlage',
      headline: 'Unsere Ranch am Stadtrand von Osnabrück',
      body: pt(content.about.facility),
      image: image('anlage-01.jpg', 'Überdachte Terrasse auf der Anlage'),
      layout: 'imageRight',
      primary: {label: 'Route planen', href: 'https://maps.google.com/?q=Am+Sonnebrink+7,+49086+Osnabr%C3%BCck'},
      tone: 'default',
    },
    {
      _type: 'factRow',
      _key: 'about-facts',
      items: content.about.facilityFacts.map((f, i) => ({_key: `f${i}`, value: f.value, label: f.label})),
      tone: 'cream',
    },
    {
      _type: 'galleryGrid',
      _key: 'about-gallery',
      eyebrow: 'Impressionen',
      headline: 'Rundgang über das Gelände',
      category: 'anlage',
      limit: 12,
      tone: 'default',
    },
    cta('Kennenlernen', 'Lern uns kennen', 'Am besten versteht man unsere Arbeit, wenn man dabei ist. Schreib uns oder komm zu einer Schnupperstunde vorbei.'),
  ],
})

push({
  _id: 'eventsPage',
  _type: 'eventsPage',
  title: 'Events & Specials',
  eyebrow: 'Events & Specials',
  lead: 'Krimiwanderung, Dog Dance, Clubs für Kids und Teens, Seminare und unser Stammtisch - alles, was neben dem Kursalltag passiert.',
  sections: [
    {
      _type: 'eventList',
      _key: 'events-list',
      eyebrow: 'Unsere Aktionen',
      headline: 'Das ist bei uns los',
      events: ['event.krimiwanderung-mit-hund', 'event.dog-dance', 'event.kids-paws-club', 'event.teens-paws-club', 'event.seminare', 'event.stammtisch'].map(
        (id, i) => ({_key: `e${i}`, _type: 'reference', _ref: id})
      ),
      tone: 'default',
    },
    {
      _type: 'featureGrid',
      _key: 'events-vouchers',
      eyebrow: 'Verschenken',
      headline: 'Gutscheine für Hundemenschen',
      lead: 'Ob zum Geburtstag, zu Weihnachten oder als Dankeschön: Über einen gemeinsamen Termin mit dem eigenen Hund freut sich jeder.',
      items: (content.events.gutscheine?.cards || []).map((c, i) => ({
        _key: `v${i}`,
        title: c.title,
        text: c.text,
        icon: ['heart', 'calendar', 'scissors'][i] || 'heart',
      })),
      columns: 3,
      tone: 'cream',
    },
    {
      _type: 'galleryGrid',
      _key: 'events-gallery',
      eyebrow: 'Kleine Helden',
      headline: 'Die Kleinen in Aktion',
      category: 'kleine-helden',
      limit: 8,
      tone: 'default',
    },
    cta('Mitmachen', 'Sei bei der nächsten Aktion dabei', 'Schreib uns, was dich interessiert - wir sagen dir, wann der nächste Fall, das nächste Seminar oder der nächste Club startet.'),
  ],
})

push({
  _id: 'hairPage',
  _type: 'hairPage',
  title: 'Hero4Hair',
  eyebrow: 'Fellpflege',
  lead: 'Neu ab Februar 2026: Fellpflege bei Hero4Paws - vom Bürsten bis zum Scheren.',
  sections: [
    {
      _type: 'textImage',
      _key: 'hair-intro',
      eyebrow: 'Fellpflege',
      headline: 'Rundum-Sorglos-Paket fürs Fell',
      body: pt(content.hair.intro),
      image: image('hero4hair-preisliste.jpg', 'Hero4Hair Preisliste'),
      layout: 'imageRight',
      tone: 'default',
    },
    {
      _type: 'priceList',
      _key: 'hair-prices',
      eyebrow: 'Preise',
      headline: 'Preisliste Fellpflege',
      lead: 'Termine vergeben wir individuell auf Anfrage.',
      category: 'hair',
      tone: 'cream',
    },
    cta('Hero4Hair', 'Termin für die Fellpflege', 'Schreib uns kurz, welche Rasse und Größe dein Hund hat - wir melden uns mit einem Terminvorschlag.'),
  ],
})

push({
  _id: 'contactPage',
  _type: 'contactPage',
  title: 'Kontakt & Anfahrt',
  eyebrow: 'Kontakt',
  lead: content.contact.lead,
  sections: [
    {
      _type: 'textImage',
      _key: 'contact-anfahrt',
      eyebrow: 'Anfahrt',
      headline: 'So findest du uns',
      body: pt(['Unsere Anlage liegt an der Stadtgrenze von Osnabrück, zwischen <strong>Voxtrup und Bissendorf</strong> - mitten in der Natur und trotzdem schnell erreichbar.']),
      items: content.contact.directions,
      image: image('anlage-05.jpg', 'Trainingsfeld mit Gehegen'),
      layout: 'imageRight',
      primary: {label: 'Route in Google Maps öffnen', href: 'https://maps.google.com/?q=Am+Sonnebrink+7,+49086+Osnabr%C3%BCck'},
      tone: 'default',
    },
    {
      _type: 'richTextSection',
      _key: 'contact-form-note',
      headline: 'Anfrage schicken',
      body: pt([
        'Am schnellsten erreichst du uns per WhatsApp unter <a href="https://wa.me/4915734777688">01573 4 777 688</a> oder per E-Mail an <a href="mailto:hero4paws@gmx.de">hero4paws@gmx.de</a>.',
        'Das Anfrage-Formular öffnet dein E-Mail-Programm mit den ausgefüllten Angaben - deine Daten werden dabei nicht auf der Website gespeichert.',
      ]),
      width: 'narrow',
      tone: 'cream',
    },
    cta('Wir freuen uns', 'Bis bald auf dem Platz!', 'Ob Kursanfrage, Gutschein oder Frage zu deinem Hund - schreib uns einfach.'),
  ],
})

const fixed = docs.map(fixIds)
fs.writeFileSync(OUT, fixed.map((d) => JSON.stringify(d)).join('\n') + '\n', 'utf8')
console.log('Dokumente:', fixed.length)
console.log('Typen:', Object.entries(fixed.reduce((acc, d) => ((acc[d._type] = (acc[d._type] || 0) + 1), acc), {})).map(([k, v]) => `${k}:${v}`).join(', '))
console.log('Datei:', OUT)
