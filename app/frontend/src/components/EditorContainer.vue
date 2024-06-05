<script setup lang="ts">
import { useEditor } from '@/lib/editor/editor';
import { onMounted, ref } from 'vue'

const editor = useEditor();
const editorContainerRef = ref<HTMLDivElement>()

// Injects a stylesheet to the toolbar to remove one of the options.
// Since shadowroot styles can't be overriden, need to observe and wait until the element
// is loaded in the DOM, and inject the style to the shadow root directly.
const observer = new MutationObserver(function (_, observer) {
  let toolbar = document.querySelector('edgeless-toolbar')
  if (toolbar) {
    var sheet = new CSSStyleSheet
    sheet.replaceSync( `edgeless-template-button { visibility: hidden; width: 0;}`)
    toolbar!.shadowRoot!.adoptedStyleSheets.push(sheet)
    observer.disconnect()
  }
});

onMounted(() => {
  editorContainerRef.value && editorContainerRef.value.appendChild(editor)
  observer.observe(editor.getRootNode(), { subtree: true, childList: true });
})
</script>

<template>
  <div class="editor-container" ref="editorContainerRef"></div>
</template>

