import { useRef } from 'react'
import { Upload } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { ALLOWED_EXTENSIONS, useFileError, useFileLoading } from '@/entities/file'
import { useFileStore } from '@/shared/store'

const ACCEPT = ALLOWED_EXTENSIONS.join(',')

export const FileUpload = () => {
	const fileInputRef = useRef<HTMLInputElement>(null)
	const uploadFile = useFileStore((s) => s.uploadFile)
	const isLoading = useFileLoading()
	const error = useFileError()

	const handleUploadClick = () => {
		fileInputRef.current?.click()
	}

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return

		await uploadFile(file)

		if (fileInputRef.current) {
			fileInputRef.current.value = ''
		}
	}

	return (
		<div className="flex flex-col items-center justify-center flex-1 gap-4">
			<input
				ref={fileInputRef}
				type="file"
				accept={ACCEPT}
				className="hidden"
				onChange={handleFileChange}
			/>
			<Button onClick={handleUploadClick} disabled={isLoading} className="gap-2">
				<Upload className="w-4 h-4" />
				{isLoading ? 'Загрузка...' : 'Загрузить файл'}
			</Button>
			{error && <p className="text-sm text-red-500">{error}</p>}
		</div>
	)
}
