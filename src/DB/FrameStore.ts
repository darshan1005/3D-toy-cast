import { getOrderType } from '@utils/session'
import { FrameStore, openDB } from './DB'

export const clearFrameStore = async (): Promise<void> => {
  const db = await openDB()
  const transaction = db.transaction(FrameStore, 'readwrite') // FIXED typo here
  const store = transaction.objectStore(FrameStore)
  store.clear()
}

export const setFrameItem = async (key: string, value: unknown): Promise<void> => {
  const db = await openDB()
  const transaction = db.transaction(FrameStore, 'readwrite')
  const store = transaction.objectStore(FrameStore)
  const orderType = getOrderType()
  store.put(value, `${orderType}-${key}`)
}

export const getFrameItem = async (key: string): Promise<unknown | null> => {
  const db = await openDB()
  return new Promise(resolve => {
    const transaction = db.transaction(FrameStore, 'readonly')
    const store = transaction.objectStore(FrameStore)
    const orderType = getOrderType()
    const request = store.get(`${orderType}-${key}`)

    request.onsuccess = (): void => resolve(request.result)
    request.onerror = (): void => resolve(null)
  })
}

export const removeFrameItem = async (key: string): Promise<void> => {
  const db = await openDB()
  const transaction = db.transaction(FrameStore, 'readwrite')
  const store = transaction.objectStore(FrameStore)
  const orderType = getOrderType()
  store.delete(`${orderType}-${key}`)
}
