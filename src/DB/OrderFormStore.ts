import { FormStore, openDB } from './DB'

export const clearOrderFormStore = async (): Promise<void> => {
  const db = await openDB()
  const transaction = db.transaction(FormStore, 'readwrite')
  const store = transaction.objectStore(FormStore)
  store.clear()
}

export const setOrderForm = async (
  key: string,
  value: unknown,
  expiryMinutes?: number,
): Promise<void> => {
  const db = await openDB()
  const transaction = db.transaction(FormStore, 'readwrite')
  const store = transaction.objectStore(FormStore)
  const expiresAt = expiryMinutes ? Date.now() + expiryMinutes * 60 * 1000 : null
  store.put({ value, expiresAt }, key)
}

export const getOrderForm = async (key: string): Promise<unknown | null> => {
  const db = await openDB()
  return new Promise(resolve => {
    const transaction = db.transaction(FormStore, 'readonly')
    const store = transaction.objectStore(FormStore)
    const request = store.get(key)
    request.onsuccess = (): void => {
      const result = request.result
      if (!result) return resolve(null)
      if (result.expiresAt && Date.now() > result.expiresAt) {
        // expired, remove it
        const delTx = db.transaction(FormStore, 'readwrite')
        delTx.objectStore(FormStore).delete(key)
        return resolve(null)
      }
      resolve(result.value)
    }
    request.onerror = (): void => resolve(null)
  })
}

export const removeOrderForm = async (key: string): Promise<void> => {
  const db = await openDB()
  const transaction = db.transaction(FormStore, 'readwrite')
  const store = transaction.objectStore(FormStore)
  store.delete(key)
}
