import {defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons/Document'
import {seoFieldset, seoFields} from './shared'
import {pageBuilder} from './pageBuilder'

const pageFields = [
  defineField({
    name: 'title',
    title: 'Seitentitel',
    type: 'string',
    description: 'Erscheint als Überschrift (H1), in der Navigation und im Browser-Tab',
    validation: (r) => r.required(),
  }),
  defineField({name: 'eyebrow', title: 'Kicker (Handschrift)', type: 'string'}),
  defineField({name: 'lead', title: 'Einleitung', type: 'text', rows: 3}),
  defineField({
    name: 'sections',
    title: 'Abschnitte',
    type: 'pageBuilder',
    description:
      'Bausteine per Plus hinzufügen, am Griff verschieben, über das Menü duplizieren oder löschen',
  }),
  ...seoFields,
]

const singletonPage = (name: string, title: string) =>
  defineType({
    name,
    title,
    type: 'document',
    icon: DocumentIcon,
    fieldsets: [seoFieldset],
    fields: pageFields,
    preview: {prepare: () => ({title})},
  })

export const homePage = singletonPage('homePage', 'Startseite')
export const aboutPage = singletonPage('aboutPage', 'Über uns')
export const eventsPage = singletonPage('eventsPage', 'Events & Specials')
export const hairPage = singletonPage('hairPage', 'Hero4Hair')
export const contactPage = singletonPage('contactPage', 'Kontakt & Anfahrt')

export const customPage = defineType({
  name: 'customPage',
  title: 'Freie Seite',
  type: 'document',
  icon: DocumentIcon,
  fieldsets: [seoFieldset],
  fields: [
    ...pageFields,
    defineField({
      name: 'slug',
      title: 'Adresse (URL)',
      type: 'slug',
      options: {source: 'title'},
      validation: (r) => r.required(),
    }),
  ],
  preview: {select: {title: 'title', subtitle: 'slug.current'}},
})
