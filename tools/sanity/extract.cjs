const {chromium} = require('playwright')
const fs = require('fs')
const path = require('path')

const ROOT = 'C:/Dev/Test/OpenCodeDeepSeek/Hero4Paws-Website'
const OUT = path.join(ROOT, 'tools', 'sanity', 'content.json')
fs.mkdirSync(path.dirname(OUT), {recursive: true})

const clean = (s) => (s || '').replace(/\s+/g, ' ').trim()

;(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage({viewport: {width: 1440, height: 950}})
  const url = (f) => 'file:///' + path.join(ROOT, f).replace(/\\/g, '/')
  const data = {}

  await page.goto(url('kurse.html'), {waitUntil: 'load'})
  await page.waitForTimeout(500)

  data.courseGroups = await page.$$eval('section[id] .section-head', (heads) =>
    heads.slice(0, 4).map((h) => ({
      eyebrow: h.querySelector('.eyebrow')?.textContent.trim() || '',
      title: h.querySelector('h2')?.textContent.trim() || '',
      lead: h.querySelector('.lead')?.textContent.trim() || '',
    }))
  )

  data.courses = await page.$$eval('article.course', (nodes) =>
    nodes.map((n) => {
      const h3 = n.querySelector('h3')
      const paras = [...n.querySelectorAll('p')].filter((p) => !p.querySelector('.price-tag'))
      return {
        id: n.id,
        title: (h3?.childNodes[0]?.textContent || '').trim(),
        tags: [...(h3?.querySelectorAll('.tag') || [])].map((t) => t.textContent.trim()),
        intro: paras.map((p) => p.innerHTML.trim()),
        facts: [...n.querySelectorAll('.facts .price-tag')].map((f) => f.textContent.trim()),
        prices: [...n.querySelectorAll('p .price-tag')].map((p) => p.textContent.trim()),
        image: n.querySelector('img')?.getAttribute('src') || '',
        alt: n.querySelector('img')?.getAttribute('alt') || '',
      }
    })
  )

  data.prices = await page.$$eval('#preise .card', (cards) =>
    cards.map((c) => ({
      title: c.querySelector('h3')?.textContent.trim() || '',
      labels: [...c.querySelectorAll('.price-tag')].map((t) => t.textContent.trim()),
      note: [...c.querySelectorAll('p.muted')].map((p) => p.textContent.trim()).join(' '),
    }))
  )

  data.schedule = await page.evaluate(() => {
    const out = []
    let day = ''
    for (const tr of document.querySelectorAll('#wochenplan table.schedule tbody tr')) {
      const rs = tr.querySelector('td[rowspan]')
      if (rs) day = rs.textContent.trim()
      const tds = [...tr.querySelectorAll('td')].filter((td) => !td.hasAttribute('rowspan'))
      const time = tds[0]?.querySelector('time')?.textContent.trim() || ''
      const link = tds[1]?.querySelector('a')
      out.push({
        day,
        time,
        title: (link || tds[1])?.textContent.trim() || '',
        anchor: link?.getAttribute('href') || '',
      })
    }
    return out
  })

  await page.goto(url('index.html'), {waitUntil: 'load'})
  await page.waitForTimeout(500)
  data.testimonials = await page.$$eval('.quote-card', (cards) =>
    cards.map((c) => ({
      name: c.querySelector('.who')?.textContent.trim() || '',
      quote: c.querySelector('blockquote')?.textContent.trim() || '',
    }))
  )
  data.home = await page.evaluate(() => ({
    badge: document.querySelector('.hero-badge')?.textContent.trim() || '',
    headline: document.querySelector('.hero h1')?.childNodes[0]?.textContent.trim() || '',
    accent: document.querySelector('.hero h1 .script')?.textContent.trim() || '',
    claim: document.querySelector('.hero-claim')?.textContent.trim() || '',
    facts: [...document.querySelectorAll('.hero-facts li')].map((li) => li.textContent.trim()),
    sticker: document.querySelector('.hero-sticker')?.textContent.replace(/\s+/g, ' ').trim() || '',
    usps: [...document.querySelectorAll('.icon-card')].map((c) => ({
      title: c.querySelector('h3')?.textContent.trim() || '',
      text: c.querySelector('p')?.textContent.trim() || '',
    })),
    quote: document.querySelector('#katja, section')?.textContent ? '' : '',
  }))

  await page.goto(url('events.html'), {waitUntil: 'load'})
  await page.waitForTimeout(500)
  data.events = await page.evaluate(() => {
    const readSection = (sel) => {
      const s = document.querySelector(sel)
      if (!s) return null
      const lists = [...s.querySelectorAll('.paw-list')]
      const img = s.querySelector('img')
      return {
        id: sel.replace('#', ''),
        eyebrow: s.querySelector('.eyebrow')?.textContent.trim() || '',
        headline: s.querySelector('h2')?.textContent.trim() || '',
        lead: s.querySelector('.lead')?.textContent.trim() || '',
        paragraphs: [...s.querySelectorAll('.split > div > p')].map((p) => p.textContent.trim()),
        lists: lists.map((l) => [...l.querySelectorAll('li')].map((li) => li.textContent.trim())),
        price: s.querySelector('.info-box .price-tag')?.textContent.trim() || '',
        priceNote: s.querySelector('.info-box .muted')?.textContent.trim() || '',
        image: img?.getAttribute('src') || '',
        imageAlt: img?.getAttribute('alt') || '',
        cards: [...s.querySelectorAll('.card')].map((c) => ({
          meta: c.querySelector('.card-meta')?.textContent.trim() || '',
          title: c.querySelector('h3')?.textContent.trim() || '',
          text: c.querySelector('p.muted')?.textContent.trim() || '',
          price: c.querySelector('.price-tag')?.textContent.trim() || '',
          image: c.querySelector('img')?.getAttribute('src') || '',
          imageAlt: c.querySelector('img')?.getAttribute('alt') || '',
        })),
      }
    }
    return {
      krimi: readSection('#krimiwanderung'),
      dogdance: readSection('#dog-dance'),
      clubs: readSection('#clubs'),
      seminare: readSection('#seminare'),
      stammtisch: readSection('#stammtisch'),
      gutscheine: readSection('#gutscheine'),
    }
  })

  await page.goto(url('ueber-uns.html'), {waitUntil: 'load'})
  await page.waitForTimeout(500)
  data.about = await page.evaluate(() => ({
    title: document.querySelector('.page-head h1')?.textContent.trim() || '',
    lead: document.querySelector('.page-head .lead')?.textContent.trim() || '',
    intro: [...document.querySelectorAll('#katja .split > div:last-child > p')].map((p) => p.innerHTML.trim()),
    qualification: [...document.querySelectorAll('#katja .info-box .paw-list li')].map((li) => li.innerHTML.trim()),
    approach: [...document.querySelectorAll('#ansatz .icon-card')].map((c) => ({
      title: c.querySelector('h3')?.textContent.trim() || '',
      text: c.querySelector('p')?.textContent.trim() || '',
    })),
    facility: [...document.querySelectorAll('#anlage .split > div:first-child > p')].map((p) => p.textContent.trim()),
    facilityFacts: [...document.querySelectorAll('#anlage .fact')].map((f) => ({
      value: f.querySelector('strong')?.textContent.trim() || '',
      label: f.querySelector('span')?.textContent.trim() || '',
    })),
  }))

  await page.goto(url('hero4hair.html'), {waitUntil: 'load'})
  await page.waitForTimeout(400)
  data.hair = await page.evaluate(() => ({
    title: document.querySelector('.page-head h1')?.textContent.trim() || '',
    lead: document.querySelector('.page-head .lead')?.textContent.trim() || '',
    intro: [...document.querySelectorAll('.split > div:first-child > p')].map((p) => p.textContent.trim()),
    prices: [...document.querySelectorAll('.info-box .paw-list li')].map((li) => li.textContent.trim()),
  }))

  await page.goto(url('kontakt.html'), {waitUntil: 'load'})
  await page.waitForTimeout(400)
  data.contact = await page.evaluate(() => ({
    title: document.querySelector('.page-head h1')?.textContent.trim() || '',
    lead: document.querySelector('.page-head .lead')?.textContent.trim() || '',
    directions: [...document.querySelectorAll('#anfahrt .paw-list li')].map((li) => li.innerHTML.trim()),
    formNote: document.querySelector('#anfahrt .small.muted')?.textContent.trim() || '',
  }))

  await page.goto(url('datenschutz.html'), {waitUntil: 'load'})
  await page.waitForTimeout(300)
  data.legal = await page.evaluate(() => ({
    taxNote: document.body.innerText.match(/Als Kleinunternehmerin[^\n]*/)?.[0] || '',
  }))

  fs.writeFileSync(OUT, JSON.stringify(data, null, 2), 'utf8')
  console.log('geschrieben:', OUT)
  console.log('Kurse:', data.courses.length, '| Preise:', data.prices.length, '| Plan-Zeilen:', data.schedule.length)
  console.log('Events:', Object.keys(data.events).filter((k) => data.events[k]).join(', '))
  console.log('Zitate:', data.testimonials.length, '| USPs:', data.home.usps.length)
  await browser.close()
})()
