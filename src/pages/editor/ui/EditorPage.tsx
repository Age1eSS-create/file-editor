import { Download, X } from 'lucide-react'
import { FileName, useCurrentFile } from '@/entities/file'
import { FileUpload } from '@/features/file/fileUpload'
import { useFileStore } from '@/shared/store'
import { Button } from '@/shared/ui/button'
import { Header } from '@/widgets/header'

export function EditorPage() {
	const currentFile = useCurrentFile()
	const updateContent = useFileStore((s) => s.updateContent)
	const downloadFile = useFileStore((s) => s.downloadFile)
	const clearFile = useFileStore((s) => s.clearFile)

	return (
		<div className="min-h-screen flex flex-col bg-gradient-to-br from-stone-100 to-stone-200 gap-4">
			<Header />
			{currentFile ? (
				<div className="flex flex-col flex-1 gap-3 px-4 pb-4">
					<div className="flex items-center justify-between">
						<FileName />
						<div className="flex items-center gap-2">
							<Button variant="ghost" size="sm" onClick={downloadFile} className="gap-1">
								<Download className="h-4 w-4" />
								Сохранить
							</Button>
							<Button variant="ghost" size="sm" onClick={clearFile} className="gap-1">
								<X className="h-4 w-4" />
								Закрыть файл
							</Button>
						</div>
					</div>
					<textarea
						value={currentFile.content}
						onChange={(e) => updateContent(e.target.value)}
						className="flex-1 w-full resize-none rounded-md border border-stone-300 bg-white p-4 font-mono text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-stone-400"
						spellCheck={false}
					/>
				</div>
			) : (
				<FileUpload />
			)}
		</div>
	)
}
