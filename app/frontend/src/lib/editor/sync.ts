// eslint-disable-next-line no-unused-vars
import { Doc } from '@blocksuite/store'
import { WebsocketProvider } from 'y-websocket'
import { authToken } from './api.js'
import { editor } from './editor.js'

const endpoint = 'ws://localhost:3002'

/** @type {WebsocketProvider | null} */
let currentProvider: WebsocketProvider | null = null
let currentDoc: Doc | null = null

/** @param {Doc} doc */
export function sync (doc: Doc, room: string) {
  if (doc === currentDoc) return
  if (currentProvider) currentProvider.destroy()

  const params = { yauth: authToken }
  const provider = new WebsocketProvider(endpoint, room, doc.spaceDoc, { params })
  provider.on('sync', () => {
    doc.load()
    editor.doc = doc
  })
  currentProvider = provider
  currentDoc = doc
}
