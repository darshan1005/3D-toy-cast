import { openDB, DBSchema, IDBPDatabase } from 'idb'

interface ToyDataProps {
  id: string
  name: string
  image: string
  description: string
  price: number
  type: string
}

interface FrameDataProps {
  id: number
  type: string
  material: string
  dimensions: {
    width: number
    height: number
    depth: number
  }
  weight: number
  description: string
  image: any
  price: number
}

interface ToysDBSchema extends DBSchema {
  toys: {
    key: string
    value: ToyDataProps
  }
}

interface FramesDBSchema extends DBSchema {
  frames: {
    key: string
    value: FrameDataProps
  }
}

export const getToysDB = async (): Promise<IDBPDatabase<ToysDBSchema>> => {
  return await openDB<ToysDBSchema>('ToysDB', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('toys')) {
        db.createObjectStore('toys', { keyPath: 'id' })
      }
    },
  })
}

export const getFramesDB = async (): Promise<IDBPDatabase<FramesDBSchema>> => {
  return await openDB<FramesDBSchema>('FramesDB', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('frames')) {
        db.createObjectStore('frames', { keyPath: 'id' })
      }
    },
  })
}
