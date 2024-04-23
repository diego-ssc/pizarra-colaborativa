import type { BlockSpec } from '@blocksuite/block-std';
import { literal, unsafeStatic } from 'lit/static-html.js';
import { RootBlockSchema } from '@blocksuite/blocks/src/root-block/root-model';
import { EdgelessRootService } from '@blocksuite/blocks/src/root-block/edgeless/edgeless-root-service';
import {
  type EdgelessRootBlockWidgetName,
} from '@blocksuite/blocks/src/root-block/index';
import {
  SurfaceRefBlockSchema,
  SurfaceRefBlockService,
} from '@blocksuite/blocks/src/surface-ref-block/index';
import { AttachmentBlockSchema } from '@blocksuite/blocks/src/attachment-block/attachment-model';
import { AttachmentService } from '@blocksuite/blocks/src/attachment-block/attachment-service';
import { CodeBlockSchema } from '@blocksuite/blocks/src/code-block/code-model';
import { DataViewBlockSchema } from '@blocksuite/blocks/src/data-view-block/index';
import { DatabaseBlockSchema } from '@blocksuite/blocks/src/database-block/database-model';
import { DatabaseService } from '@blocksuite/blocks/src/database-block/database-service';
import { DividerBlockSchema } from '@blocksuite/blocks/src/divider-block/divider-model';
import { EmbedFigmaBlockSpec } from '@blocksuite/blocks/src/embed-figma-block/embed-figma-spec';
import { EmbedGithubBlockSpec } from '@blocksuite/blocks/src/embed-github-block/index';
import { EmbedHtmlBlockSpec } from '@blocksuite/blocks/src/embed-html-block/embed-html-spec';
import { EmbedLinkedDocBlockSpec } from '@blocksuite/blocks/src/embed-linked-doc-block/embed-linked-doc-spec';
import { EmbedLoomBlockSpec } from '@blocksuite/blocks/src/embed-loom-block/embed-loom-spec';
import { EmbedSyncedDocBlockSpec } from '@blocksuite/blocks/src/embed-synced-doc-block/embed-synced-doc-spec';
import { EmbedYoutubeBlockSpec } from '@blocksuite/blocks/src/embed-youtube-block/embed-youtube-spec';
import { ImageBlockSchema } from '@blocksuite/blocks/src/image-block/image-model';
import { ImageService } from '@blocksuite/blocks/src/image-block/index';
import { BookmarkService } from '@blocksuite/blocks/src/bookmark-block/bookmark-service';
import { BookmarkBlockSchema } from '@blocksuite/blocks/src/bookmark-block/index';
import { SurfaceBlockSchema } from '@blocksuite/blocks/src/surface-block/surface-model';
import { SurfaceService } from '@blocksuite/blocks/src/surface-block/surface-service';
import { FrameBlockSchema } from '@blocksuite/blocks/src/frame-block/frame-model';
import { ListBlockSchema } from '@blocksuite/blocks/src/list-block/list-model';
import { ListService } from '@blocksuite/blocks/src/list-block/list-service';
import { NoteBlockSchema } from '@blocksuite/blocks/src/note-block/note-model';
import { NoteService } from '@blocksuite/blocks/src/note-block/index';
import { ParagraphBlockSchema } from '@blocksuite/blocks/src/paragraph-block/paragraph-model';
import { ParagraphService } from '@blocksuite/blocks/src/paragraph-block/paragraph-service';
import { AFFINE_DOC_REMOTE_SELECTION_WIDGET } from '@blocksuite/blocks/src/root-block/widgets/doc-remote-selection/doc-remote-selection';
import { AFFINE_DRAG_HANDLE_WIDGET } from '@blocksuite/blocks/src/root-block/widgets/drag-handle/drag-handle';
import { AFFINE_EDGELESS_REMOTE_SELECTION_WIDGET } from '@blocksuite/blocks/src/root-block/widgets/edgeless-remote-selection/index';
import { AFFINE_EDGELESS_ZOOM_TOOLBAR_WIDGET } from '@blocksuite/blocks/src/root-block/widgets/edgeless-zoom-toolbar/index';
import { AFFINE_FORMAT_BAR_WIDGET } from '@blocksuite/blocks/src/root-block/widgets/format-bar/format-bar';
import { AFFINE_INNER_MODAL_WIDGET } from '@blocksuite/blocks/src/root-block/widgets/inner-modal/inner-modal';
import { AFFINE_LINKED_DOC_WIDGET } from '@blocksuite/blocks/src/root-block/widgets/linked-doc/index';
import { AFFINE_MODAL_WIDGET } from '@blocksuite/blocks/src/root-block/widgets/modal/modal';
import { AFFINE_PIE_MENU_WIDGET } from '@blocksuite/blocks/src/root-block/widgets/pie-menu/index';
import { AFFINE_SLASH_MENU_WIDGET } from '@blocksuite/blocks/src/root-block/widgets/slash-menu/index';
import { EMBED_CARD_TOOLBAR } from '@blocksuite/blocks/src/root-block/widgets/embed-card-toolbar/embed-card-toolbar';

const EdgelessPageSpec: BlockSpec<EdgelessRootBlockWidgetName> = {
  schema: RootBlockSchema,
  service: EdgelessRootService,
  view: {
    component: literal`affine-edgeless-root`,
    widgets: {
      [AFFINE_MODAL_WIDGET]: literal`${unsafeStatic(AFFINE_MODAL_WIDGET)}`,
      [AFFINE_INNER_MODAL_WIDGET]: literal`${unsafeStatic(AFFINE_INNER_MODAL_WIDGET)}`,
      [AFFINE_PIE_MENU_WIDGET]: literal`${unsafeStatic(AFFINE_PIE_MENU_WIDGET)}`,
      [AFFINE_SLASH_MENU_WIDGET]: literal`${unsafeStatic(
        AFFINE_SLASH_MENU_WIDGET
      )}`,
      [AFFINE_LINKED_DOC_WIDGET]: literal`${unsafeStatic(
        AFFINE_LINKED_DOC_WIDGET
      )}`,
      [AFFINE_DRAG_HANDLE_WIDGET]: literal`${unsafeStatic(
        AFFINE_DRAG_HANDLE_WIDGET
      )}`,
      [AFFINE_FORMAT_BAR_WIDGET]: literal`${unsafeStatic(
        AFFINE_FORMAT_BAR_WIDGET
      )}`,
      [AFFINE_DOC_REMOTE_SELECTION_WIDGET]: literal`${unsafeStatic(
        AFFINE_DOC_REMOTE_SELECTION_WIDGET
      )}`,
      [AFFINE_EDGELESS_REMOTE_SELECTION_WIDGET]: literal`${unsafeStatic(
        AFFINE_EDGELESS_REMOTE_SELECTION_WIDGET
      )}`,
      [AFFINE_EDGELESS_ZOOM_TOOLBAR_WIDGET]: literal`${unsafeStatic(
        AFFINE_EDGELESS_ZOOM_TOOLBAR_WIDGET
      )}`,
    },
  },
};


export const EdgelessEditorBlockSpecs: BlockSpec[] = [
  EdgelessPageSpec,
  {
    schema: ListBlockSchema,
    view: {
      component: literal`affine-list`,
    },
    service: ListService,
  },
  {
    schema: NoteBlockSchema,
    service: NoteService,
    view: {
      component: literal`affine-note`,
    },
  },
  {
    schema: DatabaseBlockSchema,
    service: DatabaseService,
    view: {
      component: literal`affine-database`,
    },
  },
  {
    schema: DataViewBlockSchema,
    view: {
      component: literal`affine-data-view`,
    },
  },
  {
    schema: DividerBlockSchema,
    view: {
      component: literal`affine-divider`,
    },
  },
  {
    schema: CodeBlockSchema,
    view: {
      component: literal`affine-code`,
    },
  },
  {
    schema: ImageBlockSchema,
    service: ImageService,
    view: {
      component: literal`affine-image`,
      widgets: {
        imageToolbar: literal`affine-image-toolbar-widget`,
      },
    },
  },
  {
    schema: ParagraphBlockSchema,
    view: {
      component: literal`affine-paragraph`,
    },
    service: ParagraphService,
  },
  {
    schema: BookmarkBlockSchema,
    view: {
      component: literal`affine-bookmark`,
      widgets: {
        [EMBED_CARD_TOOLBAR]: literal`${unsafeStatic(EMBED_CARD_TOOLBAR)}`,
      },
    },
    service: BookmarkService,
  },
  {
    schema: AttachmentBlockSchema,
    view: {
      component: literal`affine-attachment`,
    },
    service: AttachmentService,
  },
  EmbedFigmaBlockSpec,
  EmbedGithubBlockSpec,
  EmbedYoutubeBlockSpec,
  EmbedLoomBlockSpec,
  EmbedHtmlBlockSpec,
  EmbedSyncedDocBlockSpec,
  EmbedLinkedDocBlockSpec,
  {
    schema: SurfaceBlockSchema,
    view: {
      component: literal`affine-surface`,
    },
    service: SurfaceService,
  },
  {
    schema: FrameBlockSchema,
    view: {
      component: literal`affine-frame`,
    },
  },
  {
    schema: SurfaceRefBlockSchema,
    service: SurfaceRefBlockService,
    view: {
      component: literal`affine-edgeless-surface-ref`,
    },
  },
];

export function getSpecs() {
  return EdgelessEditorBlockSpecs
}
