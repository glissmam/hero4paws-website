import {defineType} from 'sanity'
import {blockTypes} from './blocks'

export const pageBuilder = defineType({
  name: 'pageBuilder',
  title: 'Seitenabschnitte',
  type: 'array',
  of: [...blockTypes.map((block) => ({type: block.name}))],
  options: {insertMenu: {views: [{name: 'list'}]}},
})
