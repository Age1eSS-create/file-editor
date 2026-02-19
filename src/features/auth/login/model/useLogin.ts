import { useState } from 'react'
import { useShallow } from 'zustand/react/shallow'
import type { LoginData } from '../types/loginData'
import { useUserStore } from '@/shared/store'

interface UseLoginReturn {
  loginData: LoginData
  setLoginData: (data: LoginData) => void
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
  isLoading: boolean
  error: string | null
  isSuccess: boolean
}

/**
 * Хук для обработки входа пользователя
 */
export const useLogin = (): UseLoginReturn => {
	const [loginData, setLoginData] = useState<LoginData>({ email: '',password: '' })
	
	const [isSuccess, setIsSuccess] = useState(false)

	const { login, isLoading, error, clearError } = useUserStore(
		useShallow((state) => ({
			login: state.login,
			isLoading: state.isLoading,
			error: state.error,
			clearError: state.clearError,
		}))
	)

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		clearError()
		setIsSuccess(false)

		try {
			await login(loginData.email, loginData.password)
			
			setIsSuccess(true)
			
			// Очищаем форму после успешного входа
			setLoginData({
				email: '',
				password: '',
			})

			console.log('✅ Вход успешен!')
		} catch (err) {
			console.error('❌ Ошибка входа:', err)
			// Ошибка уже установлена в store
		}
	}

	return {
		loginData,
		setLoginData,
		handleLogin,
		isLoading,
		error,
		isSuccess,
	}
}
