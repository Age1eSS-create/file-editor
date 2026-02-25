export interface FileData {
	id: string
	name: string
	extension: string
	content: string
	size: number
	createdAt: Date
	updatedAt: Date
}

export const ALLOWED_EXTENSIONS = ['.txt', '.md'] as const

export type AllowedExtension = (typeof ALLOWED_EXTENSIONS)[number]
