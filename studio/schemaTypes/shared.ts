import {defineArrayMember, defineField, defineType} from 'sanity'

export const linkType = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({
      name: 'href',
      title: 'URL',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'blank',
      title: 'In neuem Tab öffnen',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})

export const iconList = [
  {title: 'Pfote', value: 'paw'},
  {title: 'Herz', value: 'heart'},
  {title: 'Standort', value: 'pin'},
  {title: 'Uhr', value: 'clock'},
  {title: 'Gruppe', value: 'users'},
  {title: 'Kalender', value: 'calendar'},
  {title: 'Schere', value: 'scissors'},
  {title: 'Häkchen', value: 'check'},
]

export const seoFieldset = {
  name: 'seo',
  title: 'SEO',
  options: {collapsible: true, collapsed: true},
}

export const seoFields = [
  defineField({
    name: 'seoTitle',
    title: 'SEO-Titel',
    type: 'string',
    fieldset: 'seo',
    description: 'Titel für Google, ca. 55 bis 60 Zeichen',
  }),
  defineField({
    name: 'seoDescription',
    title: 'SEO-Beschreibung',
    type: 'text',
    fieldset: 'seo',
    rows: 3,
    validation: (rule) => rule.max(160).warning('Maximal 160 Zeichen'),
  }),
]

export const richText = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    description,
    type: 'array',
    of: [
      defineArrayMember({
        type: 'block',
        marks: {annotations: [defineArrayMember({type: 'link'})]},
      }),
    ],
  })

export const textList = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    description,
    type: 'array',
    of: [defineArrayMember({type: 'string'})],
    options: {layout: 'tags'},
  })
