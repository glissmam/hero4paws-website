import {defineArrayMember, defineField, defineType} from 'sanity'
import {BlockContentIcon} from '@sanity/icons/BlockContent'
import {BookIcon} from '@sanity/icons/Book'
import {CalendarIcon} from '@sanity/icons/Calendar'
import {DocumentIcon} from '@sanity/icons/Document'
import {HelpCircleIcon} from '@sanity/icons/HelpCircle'
import {ImageIcon} from '@sanity/icons/Image'
import {LinkIcon} from '@sanity/icons/Link'
import {StarIcon} from '@sanity/icons/Star'
import {TagIcon} from '@sanity/icons/Tag'
import {UserIcon} from '@sanity/icons/User'
import {iconList, richText, textList} from './shared'

const toneField = defineField({
  name: 'tone',
  title: 'Hintergrund',
  type: 'string',
  options: {
    list: [
      {title: 'Standard (Creme)', value: 'default'},
      {title: 'Hell (Sand)', value: 'cream'},
      {title: 'Olivgrün', value: 'olive'},
      {title: 'Dunkel', value: 'dark'},
    ],
    layout: 'radio',
  },
  initialValue: 'default',
})

const ctaFields = [
  defineField({
    name: 'primary',
    title: 'Haupt-Button',
    type: 'object',
    fields: [
      defineField({name: 'label', title: 'Text', type: 'string'}),
      defineField({name: 'href', title: 'Ziel (URL oder Pfad)', type: 'string'}),
    ],
  }),
  defineField({
    name: 'secondary',
    title: 'Zweiter Button',
    type: 'object',
    fields: [
      defineField({name: 'label', title: 'Text', type: 'string'}),
      defineField({name: 'href', title: 'Ziel (URL oder Pfad)', type: 'string'}),
    ],
  }),
]

const iconItem = defineArrayMember({
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Überschrift', type: 'string'}),
    defineField({name: 'text', title: 'Text', type: 'text', rows: 3}),
    defineField({
      name: 'icon',
      title: 'Symbol',
      type: 'string',
      options: {list: iconList, layout: 'dropdown'},
      initialValue: 'paw',
    }),
  ],
  preview: {select: {title: 'title', subtitle: 'text'}},
})

const preview = (label: string) => ({
  select: {headline: 'headline', eyebrow: 'eyebrow'},
  prepare: ({headline, eyebrow}: {headline?: string; eyebrow?: string}) => ({
    title: headline || eyebrow || label,
    subtitle: label,
  }),
})

export const hero = defineType({
  name: 'hero',
  title: 'Hero-Bereich',
  type: 'object',
  icon: BlockContentIcon,
  fields: [
    defineField({name: 'badge', title: 'Badge (klein, oben)', type: 'string'}),
    defineField({name: 'headline', title: 'Überschrift', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'headlineAccent', title: 'Hervorhebung (Handschrift)', type: 'string'}),
    defineField({name: 'lead', title: 'Einleitung', type: 'text', rows: 3}),
    textList('facts', 'Eckdaten', 'Zum Beispiel: Zugelassen nach § 11 TierSchG'),
    defineField({
      name: 'image',
      title: 'Bild (groß)',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Bildbeschreibung', type: 'string'})],
    }),
    defineField({
      name: 'imageSecondary',
      title: 'Bild (klein, überlappend)',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Bildbeschreibung', type: 'string'})],
    }),
    defineField({name: 'sticker', title: 'Sticker-Text', type: 'string'}),
    ...ctaFields,
    toneField,
  ],
  preview: preview('Hero-Bereich'),
})

export const featureGrid = defineType({
  name: 'featureGrid',
  title: 'Vorteile (Karten)',
  type: 'object',
  icon: TagIcon,
  fields: [
    defineField({name: 'eyebrow', title: 'Kicker', type: 'string'}),
    defineField({name: 'headline', title: 'Überschrift', type: 'string'}),
    defineField({name: 'lead', title: 'Einleitung', type: 'text', rows: 2}),
    defineField({name: 'items', title: 'Karten', type: 'array', of: [iconItem]}),
    defineField({
      name: 'columns',
      title: 'Spalten',
      type: 'number',
      options: {list: [2, 3, 4], layout: 'radio'},
      initialValue: 3,
    }),
    toneField,
  ],
  preview: preview('Vorteile (Karten)'),
})

export const textImage = defineType({
  name: 'textImage',
  title: 'Text mit Bild',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({name: 'eyebrow', title: 'Kicker', type: 'string'}),
    defineField({name: 'headline', title: 'Überschrift', type: 'string'}),
    richText('body', 'Text'),
    textList('items', 'Aufzählung (Punkte)', 'Optional, erscheint mit Pfoten-Punkten'),
    defineField({
      name: 'image',
      title: 'Bild',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Bildbeschreibung', type: 'string'})],
    }),
    defineField({
      name: 'imageSecondary',
      title: 'Zweites Bild (klein, überlappend)',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Bildbeschreibung', type: 'string'})],
    }),
    defineField({
      name: 'layout',
      title: 'Bildposition',
      type: 'string',
      options: {
        list: [
          {title: 'Bild rechts', value: 'imageRight'},
          {title: 'Bild links', value: 'imageLeft'},
        ],
        layout: 'radio',
      },
      initialValue: 'imageRight',
    }),
    ...ctaFields,
    toneField,
  ],
  preview: preview('Text mit Bild'),
})

export const courseHighlights = defineType({
  name: 'courseHighlights',
  title: 'Kurs-Auswahl',
  type: 'object',
  icon: BookIcon,
  fields: [
    defineField({name: 'eyebrow', title: 'Kicker', type: 'string'}),
    defineField({name: 'headline', title: 'Überschrift', type: 'string'}),
    defineField({name: 'lead', title: 'Einleitung', type: 'text', rows: 2}),
    defineField({
      name: 'courses',
      title: 'Kurse',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'course'}]})],
      validation: (r) => r.max(6).warning('Für die Übersicht eignen sich maximal 6 Karten'),
    }),
    ...ctaFields,
    toneField,
  ],
  preview: preview('Kurs-Auswahl'),
})

export const courseGroupSection = defineType({
  name: 'courseGroupSection',
  title: 'Kursgruppe (alle Kurse der Gruppe)',
  type: 'object',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'group',
      title: 'Kursgruppe',
      type: 'reference',
      to: [{type: 'courseGroup'}],
      validation: (r) => r.required(),
    }),
    defineField({name: 'eyebrow', title: 'Kicker', type: 'string'}),
    defineField({name: 'headline', title: 'Überschrift', type: 'string'}),
    defineField({name: 'lead', title: 'Einleitung', type: 'text', rows: 2}),
    toneField,
  ],
  preview: {
    select: {group: 'group.title', eyebrow: 'eyebrow'},
    prepare: ({group, eyebrow}: {group?: string; eyebrow?: string}) => ({
      title: group || eyebrow || 'Kursgruppe',
      subtitle: 'Kursgruppe',
    }),
  },
})

export const priceList = defineType({
  name: 'priceList',
  title: 'Preisliste',
  type: 'object',
  icon: TagIcon,
  fields: [
    defineField({name: 'eyebrow', title: 'Kicker', type: 'string'}),
    defineField({name: 'headline', title: 'Überschrift', type: 'string'}),
    defineField({name: 'lead', title: 'Einleitung', type: 'text', rows: 2}),
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
    }),
    toneField,
  ],
  preview: preview('Preisliste'),
})

export const schedule = defineType({
  name: 'schedule',
  title: 'Wochenplan',
  type: 'object',
  icon: CalendarIcon,
  fields: [
    defineField({name: 'eyebrow', title: 'Kicker', type: 'string'}),
    defineField({name: 'headline', title: 'Überschrift', type: 'string'}),
    defineField({name: 'lead', title: 'Einleitung', type: 'text', rows: 2}),
    defineField({name: 'note', title: 'Hinweis unter der Tabelle', type: 'text', rows: 2}),
    defineField({
      name: 'showDownload',
      title: 'Kursplan-Download zeigen',
      type: 'boolean',
      initialValue: true,
    }),
    toneField,
  ],
  preview: preview('Wochenplan'),
})

export const eventList = defineType({
  name: 'eventList',
  title: 'Events & Aktionen',
  type: 'object',
  icon: StarIcon,
  fields: [
    defineField({name: 'eyebrow', title: 'Kicker', type: 'string'}),
    defineField({name: 'headline', title: 'Überschrift', type: 'string'}),
    defineField({name: 'lead', title: 'Einleitung', type: 'text', rows: 2}),
    defineField({
      name: 'events',
      title: 'Events (Auswahl)',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'event'}]})],
    }),
    toneField,
  ],
  preview: preview('Events & Aktionen'),
})

export const galleryGrid = defineType({
  name: 'galleryGrid',
  title: 'Galerie',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({name: 'eyebrow', title: 'Kicker', type: 'string'}),
    defineField({name: 'headline', title: 'Überschrift', type: 'string'}),
    defineField({name: 'lead', title: 'Einleitung', type: 'text', rows: 2}),
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
    }),
    defineField({
      name: 'limit',
      title: 'Anzahl Bilder',
      type: 'number',
      initialValue: 8,
      validation: (r) => r.min(1).max(60),
    }),
    ...ctaFields,
    toneField,
  ],
  preview: preview('Galerie'),
})

export const testimonials = defineType({
  name: 'testimonials',
  title: 'Gästebuch-Stimmen',
  type: 'object',
  icon: UserIcon,
  fields: [
    defineField({name: 'eyebrow', title: 'Kicker', type: 'string'}),
    defineField({name: 'headline', title: 'Überschrift', type: 'string'}),
    defineField({name: 'lead', title: 'Einleitung', type: 'text', rows: 2}),
    defineField({
      name: 'limit',
      title: 'Anzahl Stimmen',
      type: 'number',
      initialValue: 4,
      validation: (r) => r.min(1).max(12),
    }),
    toneField,
  ],
  preview: preview('Gästebuch-Stimmen'),
})

export const factRow = defineType({
  name: 'factRow',
  title: 'Zahlen & Fakten',
  type: 'object',
  icon: TagIcon,
  fields: [
    defineField({name: 'eyebrow', title: 'Kicker', type: 'string'}),
    defineField({name: 'headline', title: 'Überschrift', type: 'string'}),
    defineField({
      name: 'items',
      title: 'Fakten',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'value', title: 'Wert', type: 'string'}),
            defineField({name: 'label', title: 'Bezeichnung', type: 'string'}),
          ],
          preview: {select: {title: 'value', subtitle: 'label'}},
        }),
      ],
    }),
    toneField,
  ],
  preview: preview('Zahlen & Fakten'),
})

export const faq = defineType({
  name: 'faq',
  title: 'Häufige Fragen',
  type: 'object',
  icon: HelpCircleIcon,
  fields: [
    defineField({name: 'eyebrow', title: 'Kicker', type: 'string'}),
    defineField({name: 'headline', title: 'Überschrift', type: 'string'}),
    defineField({name: 'lead', title: 'Einleitung', type: 'text', rows: 2}),
    defineField({
      name: 'items',
      title: 'Fragen',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'question', title: 'Frage', type: 'string'}),
            defineField({name: 'answer', title: 'Antwort', type: 'text', rows: 4}),
          ],
          preview: {select: {title: 'question', subtitle: 'answer'}},
        }),
      ],
    }),
    toneField,
  ],
  preview: preview('Häufige Fragen'),
})

export const ctaBand = defineType({
  name: 'ctaBand',
  title: 'Handlungsaufforderung (Band)',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({name: 'eyebrow', title: 'Kicker', type: 'string'}),
    defineField({name: 'headline', title: 'Überschrift', type: 'string'}),
    defineField({name: 'text', title: 'Text', type: 'text', rows: 2}),
    ...ctaFields,
    toneField,
  ],
  preview: {
    select: {headline: 'headline', eyebrow: 'eyebrow'},
    prepare: ({headline, eyebrow}: {headline?: string; eyebrow?: string}) => ({
      title: headline || eyebrow || 'Band',
      subtitle: 'Handlungsaufforderung',
    }),
  },
})

export const richTextSection = defineType({
  name: 'richTextSection',
  title: 'Freier Text',
  type: 'object',
  icon: DocumentIcon,
  fields: [
    defineField({name: 'headline', title: 'Überschrift', type: 'string'}),
    richText('body', 'Text'),
    defineField({
      name: 'width',
      title: 'Breite',
      type: 'string',
      options: {
        list: [
          {title: 'Standard', value: 'default'},
          {title: 'Schmal (Lesetext)', value: 'narrow'},
        ],
        layout: 'radio',
      },
      initialValue: 'narrow',
    }),
    toneField,
  ],
  preview: preview('Freier Text'),
})

export const blockTypes = [
  hero,
  featureGrid,
  textImage,
  courseHighlights,
  courseGroupSection,
  priceList,
  schedule,
  eventList,
  galleryGrid,
  testimonials,
  factRow,
  faq,
  ctaBand,
  richTextSection,
]
