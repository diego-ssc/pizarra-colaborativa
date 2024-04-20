#!/usr/bin/env node

import * as env from 'lib0/environment'
import * as api from '../../src/api.js'

const redisPrefix = env.getConf('redis-prefix') || 'y'
const postgresUrl = env.getConf('postgres')
const s3Endpoint = env.getConf('s3-endpoint')

let store
if (s3Endpoint) {
  console.log('using s3 store')
  const { createS3Storage } = await import('../../src/storage/s3.js')
  const bucketName = 'ydocs'
  store = createS3Storage(bucketName)
  try {
    // make sure the bucket exists
    await store.client.makeBucket(bucketName)
  } catch (e) {}
} else if (postgresUrl) {
  console.log('using postgres store')
  const { createPostgresStorage } = await import('../../src/storage/postgres.js')
  store = await createPostgresStorage()
} else {
  console.log('ATTENTION! using in-memory store')
  const { createMemoryStorage } = await import('../../src/storage/memory.js')
  store = createMemoryStorage()
}

api.createWorker(store, redisPrefix)
