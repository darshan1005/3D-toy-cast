export const dbName = '3DTOYCASTDB';
export const ToyStore = 'ToysData';
export const FrameStore = 'FrameData';
export const FormStore = 'FormData';

export const openDB = async (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1)

    request.onupgradeneeded = (event): void => {
      const db = (event.target as IDBOpenDBRequest).result
      if (!db.objectStoreNames.contains(FrameStore)) {
        db.createObjectStore(FrameStore)
      }
      if (!db.objectStoreNames.contains(ToyStore)) {
        db.createObjectStore(ToyStore)
      }
      if (!db.objectStoreNames.contains(FormStore)) {
        db.createObjectStore(FormStore)
      }
    }

    request.onsuccess = (): void => resolve(request.result)
    request.onerror = (): void => reject(request.error)
  })
}