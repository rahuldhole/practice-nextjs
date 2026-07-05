import { createStorage } from 'unstorage';
import fsDriver from 'unstorage/drivers/fs';
import vercelKVDriver from 'unstorage/drivers/vercel-kv';
import vercelBlobDriver from 'unstorage/drivers/vercel-blob';

// Setup KV storage (Key-Value)
export const kvStorage = createStorage({
  driver: process.env.NODE_ENV === 'production'
    ? vercelKVDriver({})
    : fsDriver({ base: './.data/kv' })
});

// Setup Blob storage (Files/Binaries)
export const blobStorage = createStorage({
  driver: process.env.NODE_ENV === 'production'
    ? vercelBlobDriver({ access: 'public' })
    : fsDriver({ base: './.data/blob' })
});
