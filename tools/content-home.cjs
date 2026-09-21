/* Inhalt: index.html (Startseite) - Rumpf liegt in tools/home-body.html */

const fs = require('fs');
const path = require('path');
const { layout } = require('./layout.cjs');

const body = fs.readFileSync(path.join(__dirname, 'home-body.html'), 'utf8');

module.exports = [
  {
    file: 'index.html',
    html: layout({
      title: 'Hero4Paws - Hundeschule in Osnabrück | Krimiwanderung, Kurse & Hundeführerschein',
      description:
        'Hundeschule Hero4Paws in Osnabrück-Voxtrup: Welpengruppe, Degility, Hoopers, Krimiwanderung mit Hund, Hundeführerschein und mehr - auf über 8000 m² eigener Anlage. Mit Herz. Mit Wissen. Für euch.',
      active: 'start',
      body,
    }),
  },
];
