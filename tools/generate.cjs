/* Seiten-Generator: schreibt alle HTML-Dateien ins Projekt.
   Aufruf: node tools/generate.cjs */

const fs = require('fs');
const path = require('path');

const kursPages = require('./content-kurse.cjs');
const eventPages = require('./content-events.cjs');
const homePages = require('./content-home.cjs');
const { pages: mainPages, galerie } = require('./content-main.cjs');

const ROOT = path.resolve(__dirname, '..');
const imgDir = path.join(ROOT, 'assets', 'img');

const galerieItems = fs
  .readdirSync(imgDir)
  .filter((f) => /^galerie-\d+\.jpg$/.test(f))
  .sort()
  .map((f) => ({
    src: f,
    thumb: 'thumbs/' + f,
    alt: 'Bild aus dem Training der Hundeschule Hero4Paws in Osnabrück',
  }));

const kleineItems = fs
  .readdirSync(imgDir)
  .filter((f) => /^kleine-helden-\d+\.jpg$/.test(f))
  .sort()
  .map((f) => ({
    src: f,
    thumb: 'thumbs/' + f,
    alt: 'Kleine Helden - kleine Hunde beim Training bei Hero4Paws',
  }));

const all = [
  ...homePages,
  ...kursPages,
  ...eventPages,
  ...mainPages(),
  { file: 'galerie.html', html: galerie(galerieItems, kleineItems) },
];

let count = 0;
for (const p of all) {
  const dest = path.join(ROOT, p.file);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, p.html, 'utf8');
  count++;
  console.log('written', p.file);
}
console.log(`\n${count} Seiten geschrieben. Galerie: ${galerieItems.length} Bilder, Kleine Helden: ${kleineItems.length} Bilder.`);
