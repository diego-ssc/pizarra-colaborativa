import '@blocksuite/presets/themes/affine.css'
import { AffineSchemas } from '@blocksuite/blocks'
import { AffineEditorContainer } from '@blocksuite/presets'
// eslint-disable-next-line no-unused-vars
import { Schema, DocCollection, Doc, createIndexeddbStorage, type BlobStorage } from '@blocksuite/store'
import { inject, type App } from 'vue';
import { getSpecs } from './specs';
import { createAPIBlobStorage } from './api-blob-storage';
import type { APIClient } from '../api/client';
import {
  EdgelessEditorBlockSpecs,
} from '@blocksuite/blocks';

export interface EditorState {
  editor: AffineEditorContainer
  collection: DocCollection
}

const EDITOR_INJECTION_KEY = 'editorState'

export interface EditorState {
  editor: AffineEditorContainer
  collection: DocCollection
  loadDoc: (id: string) => Doc
  createDoc: (id: string) => void
}

export function createCollection(client: APIClient) {
  const blobStorages: ((id: string) => BlobStorage)[] = [
    createIndexeddbStorage,
    createAPIBlobStorage(client),
  ];
  const schema = new Schema().register(AffineSchemas)
  return new DocCollection({ schema, blobStorages })
}

export class BlocksuiteEditor {
  editor: AffineEditorContainer
  collection: DocCollection


  constructor(collection: DocCollection) {
    this.collection = collection
    this.editor = new AffineEditorContainer()

    const emptyDoc = this.collection.createDoc() // empty placeholder
    const specs = EdgelessEditorBlockSpecs
    this.editor.doc = emptyDoc
    this.editor.edgelessSpecs = specs
    this.editor.mode = 'edgeless'
  }

  loadDoc(id: string) {
    const localDoc = this.collection.getDoc(id)
    if (localDoc) return localDoc

    return this.collection.createDoc({ id })
  }

  createDoc(id: string) {
    const doc = this.collection.createDoc({ id })

    doc.load(() => {
      const pageBlockId = doc.addBlock('affine:page')
      doc.addBlock('affine:surface', {}, pageBlockId)
    })
  }

  install(app: App) {
    app.provide(EDITOR_INJECTION_KEY, this as EditorState)
  }
}

export function useEditor(): EditorState {
  return inject<EditorState>(EDITOR_INJECTION_KEY)!;
}

export function createBlocksuiteEditor(collection: DocCollection): BlocksuiteEditor {
  return new BlocksuiteEditor(collection)
}
