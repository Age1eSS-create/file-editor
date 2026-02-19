import { useState } from 'react'
import { useShallow } from 'zustand/react/shallow'
import type { RegisterData } from '../types/registerData'
import type { CreateUserDTO } from '@/entities/user'
import { useUserStore } from '@/shared/store'

interface UseRegisterReturn {
	registerData: RegisterData
	setRegisterData: (data: RegisterData) => void
	handleRegister: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
	isLoading: boolean
	error: string | null
	isSuccess: boolean
}

/**
 * Хук для обработки регистрации пользователя
 */
export const useRegister = (): UseRegisterReturn => {
	const [registerData, setRegisterData] = useState<RegisterData>({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	})
	const [isSuccess, setIsSuccess] = useState(false)

	const { register, isLoading, error, clearError } = useUserStore(
		useShallow((state) => ({
			register: state.register,
			isLoading: state.isLoading,
			error: state.error,
			clearError: state.clearError,
		}))
	)

	const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		clearError()
		setIsSuccess(false)

		// Валидация
		if (registerData.password !== registerData.confirmPassword) {
			// Можно добавить локальную ошибку или использовать toast
			alert('Пароли не совпадают!')
			return
		}

		if (registerData.password.length < 6) {
			alert('Пароль должен содержать минимум 6 символов!')
			return
		}

		try {
			const userData: CreateUserDTO = {
				name: registerData.name,
				email: registerData.email,
				password: registerData.password,
			}

			await register(userData)
			
			setIsSuccess(true)
			
			// Очищаем форму после успешной регистрации
			setRegisterData({
				name: '',
				email: '',
				password: '',
				confirmPassword: '',
			})

			// Можно добавить уведомление
			console.log('✅ Регистрация успешна!')
		} catch (err) {
			console.error('❌ Ошибка регистрации:', err)
			// Ошибка уже установлена в store
		}
	}

	return {
		registerData,
		setRegisterData,
		handleRegister,
		isLoading,
		error,
		isSuccess,
	}
}
