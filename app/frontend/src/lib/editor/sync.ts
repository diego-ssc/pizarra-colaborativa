// eslint-disable-next-line no-unused-vars
import { Doc } from '@blocksuite/store'
import { WebsocketProvider } from 'y-websocket'
import { useUserStore } from '@/stores/user.js'
import { storeToRefs } from 'pinia'
import type { AffineEditorContainer } from '@blocksuite/presets'

const endpoint = import.meta.env.VITE_BASE_WEBSOCKET_URL

/** @type {WebsocketProvider | null} */
let currentProvider: WebsocketProvider | null = null
let currentDoc: Doc | null = null

/** @param {Doc} doc */
export function sync (editor: AffineEditorContainer, doc: Doc, room: string, cb: () => void) {
  if (doc === currentDoc) {
    cb()
    return
  }

  if (currentProvider) currentProvider.destroy()

  const userStore = useUserStore()
  const { authToken } = storeToRefs(userStore)

  const params = { yauth: authToken.value }
  const provider = new WebsocketProvider(endpoint, room, doc.spaceDoc, { params })
  currentProvider = provider
  currentDoc = doc

  provider.on('sync', () => {
    doc.load()
    editor.doc = doc
    cb()
  })
}
