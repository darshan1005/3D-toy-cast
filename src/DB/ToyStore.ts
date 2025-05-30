import { getOrderType } from '@utils/session'
import { openDB, ToyStore } from './DB'

export const clearToyStore = async (): Promise<void> => {
  const db = await openDB()
  const transaction = db.transaction(ToyStore, 'readwrite') // FIXED typo here
  const store = transaction.objectStore(ToyStore)
  store.clear()
}

export const setToyItem = async (key: string, value: unknown): Promise<void> => {
  const db = await openDB()
  const transaction = db.transaction(ToyStore, 'readwrite')
  const store = transaction.objectStore(ToyStore)
  const orderType = getOrderType()
  store.put(value, `${orderType}-${key}`)
}

export const getToyItem = async (key: string): Promise<unknown | null> => {
  const db = await openDB()
  return new Promise(resolve => {
    const transaction = db.transaction(ToyStore, 'readonly')
    const store = transaction.objectStore(ToyStore)
    const orderType = getOrderType()
    const request = store.get(`${orderType}-${key}`)

    request.onsuccess = (): void => resolve(request.result)
    request.onerror = (): void => resolve(null)
  })
}

export const removeToyItem = async (key: string): Promise<void> => {
  const db = await openDB()
  const transaction = db.transaction(ToyStore, 'readwrite')
  const store = transaction.objectStore(ToyStore)
  const orderType = getOrderType()
  store.delete(`${orderType}-${key}`)
}
