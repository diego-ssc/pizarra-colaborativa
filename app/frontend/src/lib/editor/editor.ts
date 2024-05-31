import '@blocksuite/presets/themes/affine.css'
import { AffineSchemas } from '@blocksuite/blocks'
import { AffineEditorContainer } from '@blocksuite/presets'
// eslint-disable-next-line no-unused-vars
import { Schema, DocCollection, Doc, createIndexeddbStorage, type BlobStorage } from '@blocksuite/store'
import { inject, type App, provide } from 'vue';
import { getSpecs } from './specs';
import { createAPIBlobStorage } from './api-blob-storage';
import type { APIClient } from '../api/client';
import {
  EdgelessEditorBlockSpecs,
} from '@blocksuite/blocks';

export const EDITOR_INJECTION_KEY = 'blocksuite-editor'
const COLLECTION_INJECTION_KEY = 'blocksuite-collection'

export function createEditor(): AffineEditorContainer {
  let editor = new AffineEditorContainer()
  const specs = EdgelessEditorBlockSpecs
  editor.edgelessSpecs = specs
  editor.mode = 'edgeless'
  return editor
}

export class BlocksuiteCollection {
  collection: DocCollection


  constructor(client: APIClient) {
    const blobStorages: ((id: string) => BlobStorage)[] = [
      createIndexeddbStorage,
      createAPIBlobStorage(client),
    ];
    const schema = new Schema().register(AffineSchemas)
    this.collection = new DocCollection({ schema, blobStorages })
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
    app.provide(COLLECTION_INJECTION_KEY, this)
  }
}

export function provideEditor(editor: AffineEditorContainer) {
  provide(EDITOR_INJECTION_KEY, editor);
}

export function useEditor(): AffineEditorContainer {
  return inject<AffineEditorContainer>(EDITOR_INJECTION_KEY)!;
}

export function useCollection(): BlocksuiteCollection {
  return inject<BlocksuiteCollection>(COLLECTION_INJECTION_KEY)!;
}

export function createCollection(client: APIClient): BlocksuiteCollection {
  return new BlocksuiteCollection(client)
}
