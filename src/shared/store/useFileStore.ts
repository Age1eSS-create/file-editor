import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { useChatStore } from './useChatStore'
import type { FileData } from '@/entities/file/model/types'
import { ALLOWED_EXTENSIONS } from '@/entities/file/model/types'
import { getFileById, saveFile } from '@/shared/api/db'

function getExtension(filename: string): string {
	const dotIndex = filename.lastIndexOf('.')
	return dotIndex !== -1 ? filename.slice(dotIndex).toLowerCase() : ''
}

interface FileState {
	currentFile: FileData | null
	isLoading: boolean
	error: string | null

	uploadFile: (file: File) => Promise<void>
	updateContent: (content: string) => void
	downloadFile: () => void
	clearFile: () => void
	loadFile: (id: string) => Promise<void>
}

export const useFileStore = create<FileState>()(
	devtools(
		(set, get) => ({
			currentFile: null,
			isLoading: false,
			error: null,

			uploadFile: async (file: File) => {
				set({ isLoading: true, error: null })

				try {
					const ext = getExtension(file.name)

					if (!ALLOWED_EXTENSIONS.includes(ext as (typeof ALLOWED_EXTENSIONS)[number])) {
						throw new Error(
							`Недопустимое расширение файла: ${ext}. Допустимые: ${ALLOWED_EXTENSIONS.join(', ')}`,
						)
					}

					const content = await file.text()

					const fileData: FileData = {
						id: crypto.randomUUID(),
						name: file.name,
						extension: ext,
						content,
						size: file.size,
						createdAt: new Date(),
						updatedAt: new Date(),
					}

					await saveFile(fileData)

					useChatStore.getState().clearChat()
					set({ currentFile: fileData, isLoading: false, error: null })
				} catch (error) {
					const errorMessage =
						error instanceof Error ? error.message : 'Ошибка загрузки файла'
					set({ isLoading: false, error: errorMessage })
				}
			},

			updateContent: (content: string) => {
				const { currentFile } = get()
				if (!currentFile) return

				const updatedFile: FileData = {
					...currentFile,
					content,
					updatedAt: new Date(),
				}

				set({ currentFile: updatedFile })

				saveFile(updatedFile)
			},

			downloadFile: () => {
				const { currentFile } = get()
				if (!currentFile) return

				const blob = new Blob([currentFile.content], { type: 'text/plain;charset=utf-8' })
				const url = URL.createObjectURL(blob)
				const a = document.createElement('a')
				a.href = url
				a.download = currentFile.name
				a.click()
				URL.revokeObjectURL(url)
			},

			clearFile: () => {
				set({ currentFile: null, error: null })
				useChatStore.getState().clearChat()
			},

			loadFile: async (id: string) => {
				set({ isLoading: true, error: null })

				try {
					const file = await getFileById(id)

					if (!file) {
						throw new Error('Файл не найден')
					}

					set({ currentFile: file, isLoading: false })
				} catch (error) {
					const errorMessage =
						error instanceof Error ? error.message : 'Ошибка загрузки файла'
					set({ isLoading: false, error: errorMessage })
				}
			},
		}),
		{ name: 'FileStore' },
	),
)
