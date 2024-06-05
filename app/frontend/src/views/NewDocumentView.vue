<script setup lang="ts">
import { WhiteboardEndpoint, type CreateWhiteboardRequest, type CreateWhiteboardResponse } from '@/lib/api/api';
import { useAPIClient } from '@/lib/api/client';
import { useCollection } from '@/lib/editor/editor';
import { useRouter } from 'vue-router';


const collection = useCollection()
const router = useRouter()
const client = useAPIClient()

async function addDoc () {
  const res = await client.post<CreateWhiteboardRequest, CreateWhiteboardResponse>(
    WhiteboardEndpoint,
    { title: 'Pizarra sin titulo' },
  )
  const id = res.data.whiteBoardId
  collection.createDoc(id)
  router.push({ path: `/d/${id}` })
}

addDoc()
</script>
