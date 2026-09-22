import {useCallback, useEffect, useState} from 'react'
import {useClient} from 'sanity'

const WORKFLOW_URL = 'https://github.com/glissmam/hero4paws-website/actions/workflows/pages.yml'

const card = {
  border: '1px solid rgba(128,128,128,.35)',
  borderRadius: 8,
  padding: 16,
  marginBottom: 16,
  maxWidth: 720,
}

const button = {
  padding: '10px 16px',
  borderRadius: 6,
  border: '1px solid rgba(128,128,128,.4)',
  background: 'rgba(128,128,128,.12)',
  color: 'inherit',
  fontWeight: 600,
  fontSize: 14,
  cursor: 'pointer',
}

export function DeployTool() {
  const client = useClient({apiVersion: '2026-09-22'})
  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState('')
  const [history, setHistory] = useState<Array<Record<string, string>>>([])

  const load = useCallback(async () => {
    const docs = await client.fetch(
      `*[_type == "deployRequest"] | order(requestedAt desc)[0...5]{_id, requestedAt, requestedBy, note}`
    )
    setHistory(docs || [])
  }, [client])

  useEffect(() => {
    load().catch(() => undefined)
  }, [load])

  const deploy = useCallback(async () => {
    setBusy(true)
    setStatus('Wird angestossen ...')
    try {
      await client.create({
        _type: 'deployRequest',
        requestedAt: new Date().toISOString(),
        requestedBy: 'Studio',
      })
      setStatus('Freigabe erteilt - der Build startet. Nach etwa einer Minute ist die Website aktualisiert.')
      await load()
    } catch (error) {
      setStatus(`Fehler: ${error instanceof Error ? error.message : 'unbekannt'}`)
    } finally {
      setBusy(false)
    }
  }, [client, load])

  return (
    <div style={{padding: 24, overflow: 'auto'}}>
      <h1 style={{fontSize: 20, margin: '0 0 8px'}}>Website veröffentlichen</h1>
      <p style={{opacity: 0.75, maxWidth: 720, marginTop: 0}}>
        Entwürfe und Änderungen im Studio werden <strong>nicht automatisch</strong> veröffentlicht. Erst dieser Knopf
        baut die Website neu - mit allen Inhalten, die aktuell veröffentlicht sind.
      </p>

      <div style={card}>
        <button style={{...button, fontSize: 16}} disabled={busy} onClick={deploy}>
          {busy ? 'Bitte warten …' : 'Website veröffentlichen'}
        </button>
        {status && <p style={{marginBottom: 0}}>{status}</p>}
        <p style={{marginBottom: 0, opacity: 0.7, fontSize: 13}}>
          Dauer ca. 1 Minute. Ablauf ansehen:{' '}
          <a href={WORKFLOW_URL} target="_blank" rel="noreferrer">
            GitHub Actions
          </a>
        </p>
      </div>

      {history.length > 0 && (
        <div style={card}>
          <h2 style={{fontSize: 16, marginTop: 0}}>Letzte Freigaben</h2>
          <ul style={{margin: 0, paddingLeft: 18, fontSize: 13, opacity: 0.85}}>
            {history.map((entry) => (
              <li key={entry._id}>
                {new Date(entry.requestedAt).toLocaleString('de-DE')} - {entry.requestedBy || 'unbekannt'}
                {entry.note ? ` (${entry.note})` : ''}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
