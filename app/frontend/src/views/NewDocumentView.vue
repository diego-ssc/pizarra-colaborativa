<script setup lang="ts">
import { WhiteboardEndpoint, type CreateWhiteboardRequest, type CreateWhiteboardResponse } from '@/lib/api/api';
import { useAPIClient } from '@/lib/api/client';
import { useEditor } from '@/lib/editor/editor';
import { useRouter } from 'vue-router';


const editor = useEditor()
const router = useRouter()
const client = useAPIClient()

async function addDoc () {
  const res = await client.post<CreateWhiteboardRequest, CreateWhiteboardResponse>(
    WhiteboardEndpoint,
    { title: 'Pizarra sin título' },
  )
  const id = res.data.whiteBoardId
  editor.createDoc(id)
  router.push({ path: `/d/${id}` })
}

addDoc()
</script>
