import type { BlobStorage } from "@blocksuite/store";
import type { APIClient } from "../api/client";
import { ImageByIDEndpoint, type PutImageRequest } from "../api/api";

export function createAPIBlobStorage(client: APIClient): (id: string) => BlobStorage {
  return (id: string) => {
    return {
      crud: new APIBlobStorage(client)
    }
  }
}

export class APIBlobStorage {
  constructor(private readonly client: APIClient) {}

  async get(key: string): Promise<Blob> {
    const res = await this.client.get(ImageByIDEndpoint({ id: key }))
    console.log(res.data)
    return res.data as Blob
  }

  async set(key: string, value: Blob) {
    await this.client.put<PutImageRequest, any>(ImageByIDEndpoint({ id: key }), await value.arrayBuffer())

    return key
  }

  async delete(key: string) {
  }

  async list(): Promise<string[]> {
    return []
  }
}
