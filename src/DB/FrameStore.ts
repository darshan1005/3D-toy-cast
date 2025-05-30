import { dbName, FrameStore } from "./DBConstants";

const openDB = async (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = (event): void => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(FrameStore)) {
        db.createObjectStore(FrameStore);
      }
    };

    request.onsuccess = (): void => resolve(request.result);
    request.onerror = (): void => reject(request.error);
  });
};

export const clearFrameStore = async (): Promise<void> => {
  const db = await openDB();
  const trasaction = db.transaction(FrameStore, 'readwrite');
  const store = trasaction.objectStore(FrameStore);
  store.clear();
};

export const setFrameItem = async (key: string, value: unknown): Promise<void> => {
  const db = await openDB();
  const transaction = db.transaction(FrameStore, 'readwrite');
  const store = transaction.objectStore(FrameStore);
  store.put(value, key);
};

export const getFrameItem = async (key: string): Promise<unknown | null> => {
  const db = await openDB();
  return new Promise(resolve => {
    const transaction = db.transaction(FrameStore, 'readonly');
    const store = transaction.objectStore(FrameStore);
    const request = store.get(key);

    request.onsuccess = (): void => resolve(request.result);
    request.onerror = (): void => resolve(null);
  });
};

export const removeFrameItem = async (key: string): Promise<void> => {
  const db = await openDB();
  const transaction = db.transaction(FrameStore, 'readwrite');
  const store = transaction.objectStore(FrameStore);
  store.delete(key);
};