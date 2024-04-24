<script setup lang="ts">
import { api } from '@/lib/editor/api'
import { useEditor } from '@/lib/editor/editor';
import { useRouter } from 'vue-router';


const editor = useEditor()
const router = useRouter()

async function addDoc () {
  const { id } = await api.addDocMeta()
  editor.createDoc(id)
  router.push({ path: `/d/${id}` })
}

addDoc()
</script>
