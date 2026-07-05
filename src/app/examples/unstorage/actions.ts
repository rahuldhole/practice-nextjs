'use server';

import { kvStorage } from '@/services/storage';
import { revalidatePath } from 'next/cache';

export async function setKvValue(key: string, value: string) {
  if (!key) throw new Error('Key is required');
  await kvStorage.setItem(key, value);
  revalidatePath('/examples/unstorage');
}

export async function getKvValue(key: string) {
  if (!key) return null;
  const value = await kvStorage.getItem(key);
  return value as string | null;
}

export async function removeKvValue(key: string) {
  if (!key) throw new Error('Key is required');
  await kvStorage.removeItem(key);
  revalidatePath('/examples/unstorage');
}
