//import '@blocksuite/presets/themes/affine.css'
/*import { AffineEditorContainer } from '@blocksuite/presets'
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
*/
import { AffineSchemas, EdgelessEditorBlockSpecs } from '@blocksuite/blocks'
import { AffineEditorContainer } from '@blocksuite/presets'
// eslint-disable-next-line no-unused-vars
import { Schema, DocCollection, Text, Doc, Slot } from '@blocksuite/store'
import { inject, provide } from 'vue';

const specs = EdgelessEditorBlockSpecs
const schema = new Schema().register(AffineSchemas)
export const collection = new DocCollection({ schema })
export const editor = new AffineEditorContainer()
export const emptyDoc = collection.createDoc() // empty placeholder

const EDITOR_INJECTION_KEY = 'editorState'

export interface EditorState {
  editor: AffineEditorContainer
  collection: DocCollection
}

export function provideEditor() {
  provide(EDITOR_INJECTION_KEY, { editor, collection })
}


export function useEditor(): EditorState {
  return inject<EditorState>(EDITOR_INJECTION_KEY)!;
}


export function initEditor () {
  editor.doc = emptyDoc
  editor.edgelessSpecs = specs
  editor.mode = 'edgeless'
  document.body.append(editor)

  return {
    onDocUpdated: collection.slots.docUpdated
  }
}

/** @param {string} id */
export function loadDoc (id) {
  const localDoc = collection.getDoc(id)
  if (localDoc) return localDoc

  return collection.createDoc({ id })
}

/** @param {string} id */
export function createDoc (id) {
  const doc = collection.createDoc({ id })

  doc.load(() => {
    const pageBlockId = doc.addBlock('affine:page')
    doc.addBlock('affine:surface', {}, pageBlockId)
    const noteId = doc.addBlock('affine:note', {}, pageBlockId)
    doc.addBlock(
      'affine:paragraph',
      { text: new Text('Hello World!') },
      noteId
    )
  })
}
