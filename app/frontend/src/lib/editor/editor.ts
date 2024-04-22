import '@blocksuite/presets/themes/affine.css'
import { AffineSchemas, EdgelessEditorBlockSpecs } from '@blocksuite/blocks'
import { AffineEditorContainer } from '@blocksuite/presets'
// eslint-disable-next-line no-unused-vars
import { Schema, DocCollection, Text, Doc, Slot } from '@blocksuite/store'
import { inject, provide } from 'vue';
import { getSpecs } from './specs';

export interface EditorState {
  editor: AffineEditorContainer
  collection: DocCollection
}

const specs = getSpecs()
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
