import { openDB } from 'idb'
import type { DBSchema, IDBPDatabase } from 'idb'
import type { CreateUserDTO, User } from '@/entities/user'

interface UserDBSchema extends DBSchema {
	users: {
		key: string
		value: User
		indexes: {
			'by-email': string
		}
	}
}

const DB_NAME = 'file-editor-db'
const DB_VERSION = 1
const USERS_STORE = 'users'

let dbInstance: IDBPDatabase<UserDBSchema> | null = null

/**
 * Инициализация базы данных
 */
export const initDB = async (): Promise<IDBPDatabase<UserDBSchema>> => {
	if (dbInstance) {
		return dbInstance
	}

	dbInstance = await openDB<UserDBSchema>(DB_NAME, DB_VERSION, {
		upgrade(db) {
			// Создаем хранилище пользователей
			if (!db.objectStoreNames.contains(USERS_STORE)) {
				const store = db.createObjectStore(USERS_STORE, {
					keyPath: 'id',
				})
				// Создаем индекс по email для быстрого поиска
				store.createIndex('by-email', 'email', { unique: true })
			}
		},
	})

	return dbInstance
}

/**
 * Создание нового пользователя
 */
export const createUser = async (userData: CreateUserDTO): Promise<User> => {
	const db = await initDB()
	
	// Проверяем, существует ли пользователь с таким email
	const existingUser = await getUserByEmail(userData.email)
	if (existingUser) {
		throw new Error('Пользователь с таким email уже существует')
	}

	const user: User = {
		id: crypto.randomUUID(),
		...userData,
		createdAt: new Date(),
		updatedAt: new Date(),
	}

	await db.add(USERS_STORE, user)
	return user
}

/**
 * Получение пользователя по email
 */
export const getUserByEmail = async (email: string): Promise<User | undefined> => {
	const db = await initDB()
	return await db.getFromIndex(USERS_STORE, 'by-email', email)
}

/**
 * Получение пользователя по ID
 */
export const getUserById = async (id: string): Promise<User | undefined> => {
	const db = await initDB()
	return await db.get(USERS_STORE, id)
}

/**
 * Получение всех пользователей
 */
export const getAllUsers = async (): Promise<Array<User>> => {
	const db = await initDB()
	return await db.getAll(USERS_STORE)
}

/**
 * Обновление пользователя
 */
export const updateUser = async (id: string, updates: Partial<User>): Promise<User> => {
	const db = await initDB()
	const user = await getUserById(id)
	
	if (!user) {
		throw new Error('Пользователь не найден')
	}

	const updatedUser: User = {
		...user,
		...updates,
		updatedAt: new Date(),
	}

	await db.put(USERS_STORE, updatedUser)
	return updatedUser
}

/**
 * Удаление пользователя
 */
export const deleteUser = async (id: string): Promise<void> => {
	const db = await initDB()
	await db.delete(USERS_STORE, id)
}

/**
 * Проверка учетных данных (для входа)
 */
export const verifyCredentials = async (
	email: string,
	password: string
): Promise<User | null> => {
	const user = await getUserByEmail(email)
	
	if (!user) {
		return null
	}

	// В реальном приложении здесь должна быть проверка хешированного пароля
	if (user.password === password) {
		return user
	}

	return null
}
