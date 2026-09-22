import {CogIcon} from '@sanity/icons/Cog'
import {BookIcon} from '@sanity/icons/Book'
import {CalendarIcon} from '@sanity/icons/Calendar'
import {DocumentIcon} from '@sanity/icons/Document'
import {ImageIcon} from '@sanity/icons/Image'
import {StarIcon} from '@sanity/icons/Star'
import {TagIcon} from '@sanity/icons/Tag'
import {UserIcon} from '@sanity/icons/User'
import {PlayIcon} from '@sanity/icons/Play'
import {DeployTool} from './tools/DeployTool'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes, singletonTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Hero4Paws Website',

  projectId: 'o59e3962',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Inhalte')
          .items([
            S.listItem()
              .title('Website-Einstellungen')
              .icon(CogIcon)
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.divider(),
            S.listItem()
              .title('Startseite')
              .icon(DocumentIcon)
              .child(S.document().schemaType('homePage').documentId('homePage')),
            S.listItem()
              .title('Über uns')
              .icon(DocumentIcon)
              .child(S.document().schemaType('aboutPage').documentId('aboutPage')),
            S.listItem()
              .title('Events & Specials')
              .icon(DocumentIcon)
              .child(S.document().schemaType('eventsPage').documentId('eventsPage')),
            S.listItem()
              .title('Hero4Hair')
              .icon(DocumentIcon)
              .child(S.document().schemaType('hairPage').documentId('hairPage')),
            S.listItem()
              .title('Kurse & Preise')
              .icon(DocumentIcon)
              .child(S.document().schemaType('kursePage').documentId('kursePage')),
            S.listItem()
              .title('Galerie & Presse')
              .icon(DocumentIcon)
              .child(S.document().schemaType('galeriePage').documentId('galeriePage')),
            S.listItem()
              .title('Kontakt & Anfahrt')
              .icon(DocumentIcon)
              .child(S.document().schemaType('contactPage').documentId('contactPage')),
            S.divider(),
            S.documentTypeListItem('course').title('Kurse').icon(BookIcon),
            S.documentTypeListItem('courseGroup').title('Kursgruppen').icon(TagIcon),
            S.documentTypeListItem('priceItem').title('Preise').icon(TagIcon),
            S.documentTypeListItem('scheduleEntry').title('Wochenplan').icon(CalendarIcon),
            S.documentTypeListItem('event').title('Events & Aktionen').icon(StarIcon),
            S.documentTypeListItem('galleryImage').title('Galerie-Bilder').icon(ImageIcon),
            S.documentTypeListItem('testimonial').title('Gästebuch').icon(UserIcon),
            S.divider(),
            S.documentTypeListItem('customPage').title('Weitere Seiten').icon(DocumentIcon),
          ]),
    }),
    visionTool(),
    {
      name: 'deploy-tool',
      tools: [
        {
          name: 'deploy-website',
          title: 'Website veroeffentlichen',
          icon: PlayIcon,
          component: DeployTool,
        },
      ],
    },
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    actions: (prev, context) =>
      singletonTypes.has(context.schemaType)
        ? prev.filter(
            ({action}) =>
              action != null && ['publish', 'discardChanges', 'restore'].includes(action)
          )
        : prev,
    newDocumentOptions: (prev) =>
      prev.filter((template) => !singletonTypes.has(template.templateId)),
  },
})
