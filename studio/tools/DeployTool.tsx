import {useCallback, useEffect, useState} from 'react'

const REPO = 'glissmam/hero4paws-website'
const WORKFLOW_URL = `https://github.com/${REPO}/actions/workflows/pages.yml`
const STORAGE_KEY = 'hero4paws-deploy-token'

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

async function dispatchBuild(token: string) {
  const res = await fetch(`https://api.github.com/repos/${REPO}/dispatches`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({event_type: 'sanity-content'}),
  })
  if (!res.ok) throw new Error(`GitHub antwortet mit ${res.status} ${res.statusText}`)
}

export function DeployTool() {
  const [stored, setStored] = useState('')
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState('')

  useEffect(() => {
    setStored(window.localStorage.getItem(STORAGE_KEY) || '')
  }, [])

  const save = useCallback(() => {
    const value = input.trim()
    if (!value) return
    window.localStorage.setItem(STORAGE_KEY, value)
    setStored(value)
    setInput('')
    setStatus('Token gespeichert (nur in diesem Browser).')
  }, [input])

  const clear = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY)
    setStored('')
    setStatus('Token entfernt.')
  }, [])

  const deploy = useCallback(async () => {
    setBusy(true)
    setStatus('Wird angestossen ...')
    try {
      await dispatchBuild(stored)
      setStatus('Deploy gestartet - in etwa einer Minute ist die Website aktualisiert.')
    } catch (error) {
      setStatus(`Fehler: ${error instanceof Error ? error.message : 'unbekannt'}`)
    } finally {
      setBusy(false)
    }
  }, [stored])

  return (
    <div style={{padding: 24, overflow: 'auto'}}>
      <h1 style={{fontSize: 20, margin: '0 0 8px'}}>Website veröffentlichen</h1>
      <p style={{opacity: 0.75, maxWidth: 720, marginTop: 0}}>
        Entwürfe und Änderungen im Studio werden <strong>nicht automatisch</strong> veröffentlicht. Erst dieser Knopf
        baut die Website neu - mit allen Inhalten, die aktuell veröffentlicht sind.
      </p>

      <div style={card}>
        <button style={{...button, fontSize: 16}} disabled={!stored || busy} onClick={deploy}>
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

      <div style={card}>
        <h2 style={{fontSize: 16, marginTop: 0}}>Einmalig: GitHub-Token hinterlegen</h2>
        <p style={{opacity: 0.75, fontSize: 13}}>
          Fein abgestuftes Token (Fine-grained PAT) für <code>{REPO}</code> mit der Berechtigung{' '}
          <code>Contents: Read and write</code> erstellen. Es wird nur in diesem Browser gespeichert und für den
          Deploy verwendet - nicht im Projekt oder im Code.
        </p>
        <div style={{display: 'flex', gap: 8, marginBottom: 8}}>
          <input
            type="password"
            placeholder="github_pat_…"
            value={input}
            onChange={(event) => setInput(event.currentTarget.value)}
            style={{flex: 1, padding: '8px 10px', borderRadius: 6, border: '1px solid rgba(128,128,128,.4)', background: 'transparent', color: 'inherit'}}
          />
          <button style={button} disabled={!input.trim()} onClick={save}>
            Speichern
          </button>
        </div>
        {stored && (
          <button style={{...button, borderColor: 'rgba(200,80,80,.6)'}} onClick={clear}>
            Token entfernen
          </button>
        )}
      </div>
    </div>
  )
}
