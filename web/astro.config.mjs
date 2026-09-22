import {defineConfig} from 'astro/config'
import sanity from '@sanity/astro'

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID || 'o59e3962'
const dataset = process.env.PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  site: 'https://glissmam.github.io',
  base: '/hero4paws-website/',
  integrations: [
    sanity({
      projectId,
      dataset,
      useCdn: false,
      apiVersion: '2026-09-22',
    }),
  ],
})
