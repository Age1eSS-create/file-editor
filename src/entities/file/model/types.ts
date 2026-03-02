export interface FileData {
	id: string
	name: string
	extension: string
	content: string
	size: number
	createdAt: Date
	updatedAt: Date
}

export const ALLOWED_EXTENSIONS = ['.txt', '.md', '.js', '.ts', '.jsx', '.tsx', '.json', '.html', '.css', '.scss', '.sass', '.less', '.styl', '.stylus'] as const

export type AllowedExtension = (typeof ALLOWED_EXTENSIONS)[number]
