import {defineField, defineType} from 'sanity'
import {PlayIcon} from '@sanity/icons/Play'

export const deployRequest = defineType({
  name: 'deployRequest',
  title: 'Website-Freigabe',
  type: 'document',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'requestedAt',
      title: 'Angefordert am',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
    defineField({name: 'requestedBy', title: 'Angefordert von', type: 'string', readOnly: true}),
    defineField({
      name: 'note',
      title: 'Notiz',
      type: 'text',
      rows: 2,
      description: 'Optional: Was wurde geaendert?',
    }),
  ],
  preview: {select: {title: 'requestedBy', subtitle: 'requestedAt'}},
})
