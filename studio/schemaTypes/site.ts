import {defineField, defineType} from 'sanity'
import {CogIcon} from '@sanity/icons/Cog'
import {StarIcon} from '@sanity/icons/Star'
import {ImageIcon} from '@sanity/icons/Image'
import {textList} from './shared'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Website-Einstellungen',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({name: 'businessName', title: 'Name', type: 'string', initialValue: 'Hero4Paws'}),
    defineField({
      name: 'legalName',
      title: 'Offizieller Name',
      type: 'string',
      initialValue: 'Hundeschule Katja Heldt',
    }),
    defineField({
      name: 'claim',
      title: 'Claim',
      type: 'string',
      initialValue: 'Mit Herz. Mit Wissen. Für euch.',
    }),
    defineField({name: 'street', title: 'Straße und Hausnummer', type: 'string'}),
    defineField({name: 'zip', title: 'PLZ', type: 'string'}),
    defineField({name: 'city', title: 'Ort', type: 'string'}),
    defineField({
      name: 'locationNote',
      title: 'Lage-Hinweis',
      type: 'string',
      description: 'Zum Beispiel: zwischen Voxtrup und Bissendorf',
    }),
    defineField({name: 'geo', title: 'Koordinaten', type: 'geopoint'}),
    defineField({name: 'phone', title: 'Telefon', type: 'string'}),
    defineField({name: 'whatsapp', title: 'WhatsApp-Nummer (nur Ziffern, mit Ländervorwahl)', type: 'string'}),
    defineField({name: 'email', title: 'E-Mail', type: 'string'}),
    defineField({name: 'instagramUrl', title: 'Instagram', type: 'url'}),
    defineField({name: 'facebookUrl', title: 'Facebook', type: 'url'}),
    defineField({name: 'mapsUrl', title: 'Google-Maps-Link', type: 'url'}),
    defineField({name: 'footerText', title: 'Footer-Text', type: 'text', rows: 2}),
    defineField({
      name: 'taxNote',
      title: 'Steuer-Hinweis',
      type: 'string',
      initialValue: 'Als Kleinunternehmerin im Sinne von § 19 Abs. 1 UStG berechne ich keine Umsatzsteuer.',
    }),
    defineField({
      name: 'notice',
      title: 'Aktuelle Mitteilung',
      type: 'text',
      rows: 2,
      description: 'Optional: erscheint als Hinweis-Banner auf allen Seiten (z. B. Betriebsferien)',
    }),
    defineField({
      name: 'gutZuWissen',
      title: 'Gut zu wissen (Punkte)',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
  ],
  preview: {prepare: () => ({title: 'Website-Einstellungen'})},
})

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Gästebuch-Eintrag',
  type: 'document',
  icon: StarIcon,
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'quote', title: 'Zitat', type: 'text', rows: 4, validation: (r) => r.required()}),
    defineField({name: 'date', title: 'Datum', type: 'date'}),
    defineField({name: 'position', title: 'Reihenfolge', type: 'number', initialValue: 1}),
  ],
  orderings: [
    {title: 'Reihenfolge', name: 'position', by: [{field: 'position', direction: 'asc'}]},
    {title: 'Datum (neu zuerst)', name: 'date', by: [{field: 'date', direction: 'desc'}]},
  ],
  preview: {select: {title: 'name', subtitle: 'quote'}},
})

export const galleryImage = defineType({
  name: 'galleryImage',
  title: 'Galerie-Bild',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Bild',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Bildbeschreibung', type: 'string'})],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Bereich',
      type: 'string',
      options: {
        list: [
          {title: 'Aus dem Training', value: 'training'},
          {title: 'Kleine Helden', value: 'kleine-helden'},
          {title: 'Die Anlage', value: 'anlage'},
          {title: 'Presse', value: 'presse'},
        ],
        layout: 'radio',
      },
      initialValue: 'training',
      validation: (r) => r.required(),
    }),
    defineField({name: 'caption', title: 'Bildunterschrift', type: 'string'}),
    defineField({name: 'position', title: 'Reihenfolge', type: 'number', initialValue: 1}),
  ],
  orderings: [{title: 'Reihenfolge', name: 'position', by: [{field: 'position', direction: 'asc'}]}],
  preview: {select: {title: 'caption', subtitle: 'category', media: 'image'}},
})

export const event = defineType({
  name: 'event',
  title: 'Event / Aktion',
  type: 'document',
  icon: StarIcon,
  fields: [
    defineField({name: 'title', title: 'Name', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'slug',
      title: 'Technischer Name',
      type: 'slug',
      options: {source: 'title'},
    }),
    defineField({
      name: 'category',
      title: 'Art',
      type: 'string',
      options: {
        list: [
          {title: 'Krimiwanderung', value: 'krimiwanderung'},
          {title: 'Dog Dance', value: 'dog-dance'},
          {title: 'Kids- / Teens-Club', value: 'club'},
          {title: 'Seminar / Workshop', value: 'seminar'},
          {title: 'Stammtisch', value: 'stammtisch'},
          {title: 'Sonstiges', value: 'sonstiges'},
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({name: 'eyebrow', title: 'Überschrift (klein)', type: 'string'}),
    defineField({name: 'lead', title: 'Einleitung', type: 'text', rows: 3}),
    defineField({
      name: 'body',
      title: 'Beschreibung',
      type: 'array',
      of: [{type: 'block'}],
    }),
    textList('facts', 'Eckdaten', 'Zum Beispiel: Donnerstags 15:00 bis 15:45 Uhr, 15 € pro Woche'),
    defineField({
      name: 'price',
      title: 'Preis',
      type: 'reference',
      to: [{type: 'priceItem'}],
    }),
    defineField({
      name: 'image',
      title: 'Bild / Flyer',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Bildbeschreibung', type: 'string'})],
    }),
    defineField({name: 'position', title: 'Reihenfolge', type: 'number', initialValue: 1}),
  ],
  orderings: [{title: 'Reihenfolge', name: 'position', by: [{field: 'position', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'category', media: 'image'}},
})
