import { dbName, uploadStore } from "./DBConstants";

const openDB = async (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = (event): void => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(uploadStore)) {
        db.createObjectStore(uploadStore);
      }
    };

    request.onsuccess = (): void => resolve(request.result);
    request.onerror = (): void => reject(request.error);
  });
};

export const clearUploadStore = async (): Promise<void> => {
  const db = await openDB();
  const trasaction = db.transaction(uploadStore, 'readwrite');
  const store = trasaction.objectStore(uploadStore);
  store.clear();
};

export const setUploadItem = async (key: string, value: unknown): Promise<void> => {
  const db = await openDB();
  const transaction = db.transaction(uploadStore, 'readwrite');
  const store = transaction.objectStore(uploadStore);
  store.put(value, key);
};

export const getUploadedItem = async (key: string): Promise<unknown | null> => {
  const db = await openDB();
  return new Promise(resolve => {
    const transaction = db.transaction(uploadStore, 'readonly');
    const store = transaction.objectStore(uploadStore);
    const request = store.get(key);

    request.onsuccess = (): void => resolve(request.result);
    request.onerror = (): void => resolve(null);
  });
};

export const removeUloadedItem = async (key: string): Promise<void> => {
  const db = await openDB();
  const transaction = db.transaction(uploadStore, 'readwrite');
  const store = transaction.objectStore(uploadStore);
  store.delete(key);
};