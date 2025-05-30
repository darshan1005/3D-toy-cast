import { dbName, ToyStore } from "./DBConstants";

const openDB = async (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, 1);

        request.onupgradeneeded = (event): void => {
            const db = (event.target as IDBOpenDBRequest).result;
            if (!db.objectStoreNames.contains(ToyStore)) {
                db.createObjectStore(ToyStore);
            }
        };

        request.onsuccess = (): void => resolve(request.result);
        request.onerror = (): void => reject(request.error);
    });
};

export const clearToyStore = async (): Promise<void> => {
    const db = await openDB();
    const trasaction = db.transaction(ToyStore, 'readwrite');
    const store = trasaction.objectStore(ToyStore);
    store.clear();
};

export const setToyItem = async (key: string, value: unknown): Promise<void> => {
    const db = await openDB();
    const transaction = db.transaction(ToyStore, 'readwrite');
    const store = transaction.objectStore(ToyStore);
    store.put(value, key);
};

export const getToyItem = async (key: string): Promise<unknown | null> => {
    const db = await openDB();
    return new Promise(resolve => {
        const transaction = db.transaction(ToyStore, 'readonly');
        const store = transaction.objectStore(ToyStore);
        const request = store.get(key);

        request.onsuccess = (): void => resolve(request.result);
        request.onerror = (): void => resolve(null);
    });
};

export const removeToyItem = async (key: string): Promise<void> => {
    const db = await openDB();
    const transaction = db.transaction(ToyStore, 'readwrite');
    const store = transaction.objectStore(ToyStore);
    store.delete(key);
};