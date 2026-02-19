import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { CreateUserDTO, User } from '@/entities/user'
import { createUser, getAllUsers, verifyCredentials } from '@/shared/api/db'

interface UserState {
  currentUser: User | null
  users: Array<User>
  isLoading: boolean
  error: string | null

  register: (userData: CreateUserDTO) => Promise<User>
  login: (email: string, password: string) => Promise<User>
  logout: () => void
  loadUsers: () => Promise<void>
  setCurrentUser: (user: User | null) => void
  clearError: () => void
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        // Начальное состояние
        currentUser: null,
        users: [],
        isLoading: false,
        error: null,

        // Регистрация нового пользователя
        register: async (userData: CreateUserDTO) => {
          set({ isLoading: true, error: null })
          
          try {
            // Проверяем совпадение паролей (если передан confirmPassword)
            const user = await createUser(userData)
            
            // Обновляем список пользователей
            const users = await getAllUsers()
            
            set({ 
              currentUser: user,
              users,
              isLoading: false,
              error: null
            })
            
            return user
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Ошибка регистрации'
            set({ isLoading: false, error: errorMessage })
            throw error
          }
        },

        // Вход пользователя
        login: async (email: string, password: string) => {
          set({ isLoading: true, error: null })
          
          try {
            const user = await verifyCredentials(email, password)
            
            if (!user) {
              throw new Error('Неверный email или пароль')
            }
            
            set({ 
              currentUser: user,
              isLoading: false,
              error: null
            })
            
            return user
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Ошибка входа'
            set({ isLoading: false, error: errorMessage })
            throw error
          }
        },

        // Выход пользователя
        logout: () => {
          set({ currentUser: null, error: null })
        },

        // Загрузка всех пользователей
        loadUsers: async () => {
          set({ isLoading: true, error: null })
          
          try {
            const users = await getAllUsers()
            set({ users, isLoading: false })
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Ошибка загрузки пользователей'
            set({ isLoading: false, error: errorMessage })
          }
        },

        // Установка текущего пользователя
        setCurrentUser: (user: User | null) => {
          set({ currentUser: user })
        },

        // Очистка ошибки
        clearError: () => {
          set({ error: null })
        },
      }),
      {
        name: 'user-storage',
        // Сохраняем только текущего пользователя в localStorage
        partialize: (state) => ({ 
          currentUser: state.currentUser 
        }),
      }
    ),
    {
      name: 'UserStore',
    }
  )
)
