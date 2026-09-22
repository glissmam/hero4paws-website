import {defineArrayMember, defineField, defineType} from 'sanity'
import {BookIcon} from '@sanity/icons/Book'
import {TagIcon} from '@sanity/icons/Tag'
import {CalendarIcon} from '@sanity/icons/Calendar'
import {richText, seoFieldset, seoFields, textList} from './shared'

const groupOptions = [
  {title: 'Welpen & Junghunde', value: 'welpen'},
  {title: 'Kleine Helden & Freilauf', value: 'kleine'},
  {title: 'Sport & Spiel', value: 'sport'},
  {title: 'Individuell & Prüfungen', value: 'individuell'},
]

export const courseGroup = defineType({
  name: 'courseGroup',
  title: 'Kursgruppe',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({name: 'title', title: 'Name', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'slug',
      title: 'Technischer Name',
      type: 'slug',
      options: {source: 'title'},
      validation: (r) => r.required(),
    }),
    defineField({name: 'lead', title: 'Einleitung', type: 'text', rows: 2}),
    defineField({name: 'position', title: 'Reihenfolge', type: 'number', initialValue: 1}),
  ],
  orderings: [
    {
      title: 'Reihenfolge',
      name: 'position',
      by: [{field: 'position', direction: 'asc'}],
    },
  ],
  preview: {select: {title: 'title', subtitle: 'lead'}},
})

export const course = defineType({
  name: 'course',
  title: 'Kurs',
  type: 'document',
  icon: BookIcon,
  fieldsets: [seoFieldset],
  fields: [
    defineField({name: 'title', title: 'Name', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'slug',
      title: 'Technischer Name',
      type: 'slug',
      options: {source: 'title'},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'group',
      title: 'Kursgruppe',
      type: 'reference',
      to: [{type: 'courseGroup'}],
      validation: (r) => r.required(),
    }),
    textList('tags', 'Kurz-Labels', 'Zum Beispiel: Sonntags, Bis 40 cm, Ab ca. 1 Jahr'),
    defineField({
      name: 'teaser',
      title: 'Kurztext (für Übersichtskarten)',
      type: 'text',
      rows: 2,
      validation: (r) => r.max(220).warning('Kurz halten, max. 220 Zeichen'),
    }),
    richText('intro', 'Beschreibung'),
    textList('facts', 'Eckdaten', 'Zum Beispiel: So 10:00 Welpen „Neu", 15 € pro Stunde'),
    defineField({
      name: 'prices',
      title: 'Preise',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'priceItem'}]})],
    }),
    defineField({
      name: 'image',
      title: 'Bild',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Bildbeschreibung', type: 'string'})],
    }),
    defineField({
      name: 'featuredOnHome',
      title: 'Auf der Startseite zeigen',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({name: 'position', title: 'Reihenfolge', type: 'number', initialValue: 1}),
    ...seoFields,
  ],
  orderings: [
    {
      title: 'Reihenfolge',
      name: 'position',
      by: [{field: 'position', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'title', subtitle: 'teaser', media: 'image'},
  },
})

export const priceItem = defineType({
  name: 'priceItem',
  title: 'Preis',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({name: 'title', title: 'Bezeichnung', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'category',
      title: 'Bereich',
      type: 'string',
      options: {
        list: [
          {title: 'Kurse & Training', value: 'kurse'},
          {title: 'Events & Aktionen', value: 'events'},
          {title: 'Hero4Hair (Fellpflege)', value: 'hair'},
        ],
        layout: 'radio',
      },
      initialValue: 'kurse',
      validation: (r) => r.required(),
    }),
    textList('labels', 'Preisangaben', 'Zum Beispiel: 15,00 € pro Stunde'),
    defineField({name: 'note', title: 'Hinweis', type: 'text', rows: 2}),
    defineField({name: 'position', title: 'Reihenfolge', type: 'number', initialValue: 1}),
  ],
  orderings: [
    {
      title: 'Reihenfolge',
      name: 'position',
      by: [{field: 'position', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'title', labels: 'labels'},
    prepare: ({title, labels}) => ({
      title,
      subtitle: Array.isArray(labels) ? labels.join(' · ') : labels,
    }),
  },
})

export const scheduleEntry = defineType({
  name: 'scheduleEntry',
  title: 'Wochenplan-Eintrag',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'day',
      title: 'Tag',
      type: 'string',
      options: {
        list: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'],
        layout: 'dropdown',
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'time',
      title: 'Uhrzeit',
      type: 'string',
      description: 'Zum Beispiel: 15:00',
      validation: (r) => r.required(),
    }),
    defineField({name: 'title', title: 'Kurs / Angebot', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'course',
      title: 'Zur Kursseite verlinken',
      type: 'reference',
      to: [{type: 'course'}],
    }),
    defineField({name: 'position', title: 'Reihenfolge innerhalb des Tages', type: 'number', initialValue: 1}),
  ],
  orderings: [
    {
      title: 'Tag und Zeit',
      name: 'dayTime',
      by: [
        {field: 'day', direction: 'asc'},
        {field: 'time', direction: 'asc'},
        {field: 'position', direction: 'asc'},
      ],
    },
  ],
  preview: {
    select: {title: 'title', day: 'day', time: 'time'},
    prepare: ({title, day, time}) => ({title, subtitle: `${day} · ${time}`}),
  },
})
