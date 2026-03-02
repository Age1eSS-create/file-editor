import { useState } from 'react'
import { Download, MessageSquare, PanelRightClose, X } from 'lucide-react'
import { FileName, useCurrentFile } from '@/entities/file'
import { FileUpload } from '@/features/file/fileUpload'
import { AiChatPanel } from '@/features/ai-chat'
import { useFileStore } from '@/shared/store'
import { Button } from '@/shared/ui/button'
import { Header } from '@/widgets/header'

export function EditorPage() {
	const currentFile = useCurrentFile()
	const updateContent = useFileStore((s) => s.updateContent)
	const downloadFile = useFileStore((s) => s.downloadFile)
	const clearFile = useFileStore((s) => s.clearFile)
	const [chatOpen, setChatOpen] = useState(false)

	return (
		<div className="min-h-screen flex flex-col bg-gradient-to-br from-stone-100 to-stone-200 gap-4">
			<Header />
			{currentFile ? (
				<div className="flex flex-col flex-1 gap-3 px-4 pb-4">
					<div className="flex items-center justify-between">
						<FileName />
						<div className="flex items-center gap-2">
							<Button
								variant={chatOpen ? 'default' : 'ghost'}
								size="sm"
								onClick={() => setChatOpen((v) => !v)}
								className="gap-1"
							>
								{chatOpen ? (
									<PanelRightClose className="h-4 w-4" />
								) : (
									<MessageSquare className="h-4 w-4" />
								)}
								ИИ-ассистент
							</Button>
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
					<div className="flex flex-1 gap-3 min-h-0">
						<textarea
							value={currentFile.content}
							onChange={(e) => updateContent(e.target.value)}
							className="flex-1 min-w-0 resize-none rounded-md border border-stone-300 bg-white p-4 font-mono text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-stone-400"
							spellCheck={false}
						/>
						{chatOpen && (
							<div className="w-[400px] shrink-0">
								<AiChatPanel />
							</div>
						)}
					</div>
				</div>
			) : (
				<FileUpload />
			)}
		</div>
	)
}
