import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'o59e3962',
    dataset: 'production'
  },
  studioHost: 'hero4paws-website',
  deployment: {
    appId: 'gwie7ttlmpnfup3ay2quwi87',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
})
