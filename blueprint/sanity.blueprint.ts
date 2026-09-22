import {defineBlueprint, defineDocumentFunction} from '@sanity/blueprints'

export default defineBlueprint({
  resources: [
    defineDocumentFunction({
      name: 'rebuild-website',
      event: {on: ['create'], filter: "_type == 'deployRequest'"},
    }),
  ],
})
