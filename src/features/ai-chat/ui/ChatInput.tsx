import { useState, useRef, useCallback } from 'react'
import { Send, FileSearch, Code } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { useChatStore } from '@/shared/store'

export const ChatInput = () => {
	const [text, setText] = useState('')
	const textareaRef = useRef<HTMLTextAreaElement>(null)
	const sendMessage = useChatStore((s) => s.sendMessage)
	const isStreaming = useChatStore((s) => s.isStreaming)

	const handleSend = useCallback(async () => {
		const trimmed = text.trim()
		if (!trimmed || isStreaming) return
		setText('')
		await sendMessage(trimmed)
	}, [text, isStreaming, sendMessage])

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault()
			handleSend()
		}
	}

	const handleQuickAction = (prompt: string) => {
		if (isStreaming) return
		sendMessage(prompt)
	}

	return (
		<div className="flex flex-col gap-2 border-t border-stone-200 bg-stone-50 p-3">
			<div className="flex gap-1.5">
				<Button
					variant="outline"
					size="sm"
					className="gap-1 text-xs"
					disabled={isStreaming}
					onClick={() => handleQuickAction('Проведи code review этого файла. Укажи проблемы, предложи улучшения.')}
				>
					<Code className="h-3 w-3" />
					Code Review
				</Button>
				<Button
					variant="outline"
					size="sm"
					className="gap-1 text-xs"
					disabled={isStreaming}
					onClick={() => handleQuickAction('Проанализируй этот файл. Опиши его назначение, структуру и ключевые моменты.')}
				>
					<FileSearch className="h-3 w-3" />
					Анализ
				</Button>
			</div>

			<div className="flex gap-2">
				<textarea
					ref={textareaRef}
					value={text}
					onChange={(e) => setText(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder="Задайте вопрос по файлу..."
					rows={2}
					disabled={isStreaming}
					className="flex-1 resize-none rounded-md border border-stone-300 bg-white px-3 py-2 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400 disabled:opacity-50"
				/>
				<Button
					size="sm"
					disabled={!text.trim() || isStreaming}
					onClick={handleSend}
					className="self-end"
				>
					<Send className="h-4 w-4" />
				</Button>
			</div>
		</div>
	)
}
