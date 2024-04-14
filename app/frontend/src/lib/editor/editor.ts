import '@blocksuite/presets/themes/affine.css'
import { AffineEditorContainer } from '@blocksuite/presets'
import { Doc, Schema } from '@blocksuite/store'
import { DocCollection } from '@blocksuite/store'
import { AffineSchemas } from '@blocksuite/blocks'

import { getSpecs } from './specs'
import { inject, provide } from 'vue'

const EDITOR_INJECTION_KEY = 'editorState'

export function initEditor() {
  const schema = new Schema().register(AffineSchemas)
  const collection = new DocCollection({ schema })
  const doc = collection.createDoc({ id: 'page1' })

  doc.load(() => {
    const pageBlockId = doc.addBlock('affine:page', {})
    doc.addBlock('affine:surface', {}, pageBlockId)
    const noteId = doc.addBlock('affine:note', {}, pageBlockId)
    doc.addBlock('affine:paragraph', {}, noteId)
  })

  const specs = getSpecs()

  const editor = new AffineEditorContainer()
  editor.edgelessSpecs = specs

  editor.doc = doc
  editor.slots.docLinkClicked.on(({ docId }) => {
    const target = <Doc>collection.getDoc(docId)
    editor.doc = target
  })
  editor.mode = 'edgeless'

  return { editor, collection }
}

export interface EditorState {
  editor: AffineEditorContainer
  collection: DocCollection
}

export function provideEditor() {
  provide(EDITOR_INJECTION_KEY, initEditor())
}

export function useEditor(): EditorState {
  return inject<EditorState>(EDITOR_INJECTION_KEY)!;
}
