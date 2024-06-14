import { Store } from '@tauri-apps/plugin-store'
export const store = new Store('store.bin')

export async function setStore(key: string, value: unknown) {
  await store.set(key, value)
  store.save()
}

export async function getStore<T = string>(key: string) {
  const data = await store.get<T>(key)
  return data
}

export default store
