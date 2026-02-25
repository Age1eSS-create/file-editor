import type { FileData } from './types'
import { useFileStore } from '@/shared/store'

export const useCurrentFile = (): FileData | null => {
	return useFileStore((state) => state.currentFile)
}

export const useFileContent = (): string | null => {
	return useFileStore((state) => state.currentFile?.content ?? null)
}

export const useFileName = (): string | null => {
	return useFileStore((state) => state.currentFile?.name ?? null)
}

export const useFileLoading = (): boolean => {
	return useFileStore((state) => state.isLoading)
}

export const useFileError = (): string | null => {
	return useFileStore((state) => state.error)
}
