import { openDB } from 'idb'
import type { DBSchema, IDBPDatabase } from 'idb'
import type { FileData } from '@/entities/file'

interface FileDBSchema extends DBSchema {
	files: {
		key: string
		value: FileData
	}
}

const DB_NAME = 'file-editor-files-db'
const DB_VERSION = 1
const FILES_STORE = 'files'

let dbInstance: IDBPDatabase<FileDBSchema> | null = null

export const initFileDB = async (): Promise<IDBPDatabase<FileDBSchema>> => {
	if (dbInstance) {
		return dbInstance
	}

	dbInstance = await openDB<FileDBSchema>(DB_NAME, DB_VERSION, {
		upgrade(db) {
			if (!db.objectStoreNames.contains(FILES_STORE)) {
				db.createObjectStore(FILES_STORE, { keyPath: 'id' })
			}
		},
	})

	return dbInstance
}

export const saveFile = async (file: FileData): Promise<FileData> => {
	const db = await initFileDB()
	await db.put(FILES_STORE, file)
	return file
}

export const getFileById = async (id: string): Promise<FileData | undefined> => {
	const db = await initFileDB()
	return await db.get(FILES_STORE, id)
}

export const getAllFiles = async (): Promise<Array<FileData>> => {
	const db = await initFileDB()
	return await db.getAll(FILES_STORE)
}

export const deleteFile = async (id: string): Promise<void> => {
	const db = await initFileDB()
	await db.delete(FILES_STORE, id)
}
