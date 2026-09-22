import {documentEventHandler} from '@sanity/functions'

const REPO = 'glissmam/hero4paws-website'

export const handler = documentEventHandler(async () => {
  const token = process.env.GITHUB_TOKEN
  if (!token) {
    console.error('GITHUB_TOKEN ist nicht gesetzt - Deploy abgebrochen')
    return
  }

  const response = await fetch(`https://api.github.com/repos/${REPO}/dispatches`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({event_type: 'sanity-content'}),
  })

  if (!response.ok) {
    console.error(`GitHub antwortet mit ${response.status} ${response.statusText}`)
    return
  }

  console.log('Website-Build ausgeloest')
})
