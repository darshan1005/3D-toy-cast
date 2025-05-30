import { dbName, FormStore } from "./DBConstants";

const openDB = async (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = (event): void => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(FormStore)) {
        db.createObjectStore(FormStore);
      }
    };

    request.onsuccess = (): void => resolve(request.result);
    request.onerror = (): void => reject(request.error);
  });
};

export const clearOrderFormStore = async (): Promise<void> => {
  const db = await openDB();
  const trasaction = db.transaction(FormStore, 'readwrite');
  const store = trasaction.objectStore(FormStore);
  store.clear();
};

export const setOrderForm = async (key: string, value: unknown): Promise<void> => {
  const db = await openDB();
  const transaction = db.transaction(FormStore, 'readwrite');
  const store = transaction.objectStore(FormStore);
  store.put(value, key);
};

export const getOrderForm = async (key: string): Promise<unknown | null> => {
  const db = await openDB();
  return new Promise(resolve => {
    const transaction = db.transaction(FormStore, 'readonly');
    const store = transaction.objectStore(FormStore);
    const request = store.get(key);

    request.onsuccess = (): void => resolve(request.result);
    request.onerror = (): void => resolve(null);
  });
};

export const removeOrderForm = async (key: string): Promise<void> => {
  const db = await openDB();
  const transaction = db.transaction(FormStore, 'readwrite');
  const store = transaction.objectStore(FormStore);
  store.delete(key);
};