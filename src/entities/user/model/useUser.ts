import type { User } from './types'
import { useUserStore } from '@/shared/store'

/**
 * Хук для получения текущего пользователя
 */
export const useCurrentUser = (): User | null => {
	return useUserStore((state) => state.currentUser)
}

/**
 * Хук для получения всех пользователей
 */
export const useUsers = (): Array<User> => {
	return useUserStore((state) => state.users)
}

/**
 * Хук для получения состояния загрузки
 */
export const useUserLoading = (): boolean => {
	return useUserStore((state) => state.isLoading)
}

/**
 * Хук для получения ошибки
 */
export const useUserError = (): string | null => {
	return useUserStore((state) => state.error)
}

/**
 * Хук для проверки аутентификации
 */
export const useIsAuthenticated = (): boolean => {
	const currentUser = useCurrentUser()
	return currentUser !== null
}
