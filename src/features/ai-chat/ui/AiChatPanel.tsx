import { useEffect, useRef } from 'react'
import { Bot, Loader2 } from 'lucide-react'
import { useChatStore } from '@/shared/store'
import { ChatMessage } from './ChatMessage'
import { ChatInput } from './ChatInput'

export const AiChatPanel = () => {
	const messages = useChatStore((s) => s.messages)
	const isStreaming = useChatStore((s) => s.isStreaming)
	const scrollRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		scrollRef.current?.scrollTo({
			top: scrollRef.current.scrollHeight,
			behavior: 'smooth',
		})
	}, [messages.length, isStreaming])

	return (
		<div className="flex h-full flex-col rounded-lg border border-stone-200 bg-stone-50 shadow-sm">
			<div className="flex items-center gap-2 border-b border-stone-200 px-4 py-2.5">
				<Bot className="h-4 w-4 text-amber-600" />
				<span className="text-sm font-medium text-stone-700">ИИ-ассистент</span>
			</div>

			<div ref={scrollRef} className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
				{messages.length === 0 && (
					<div className="flex flex-1 flex-col items-center justify-center gap-2 text-stone-400">
						<Bot className="h-8 w-8" />
						<p className="text-center text-sm">
							Задайте вопрос по файлу или запустите анализ
						</p>
					</div>
				)}

				{messages.map((msg) => (
					<ChatMessage key={msg.id} message={msg} />
				))}

				{isStreaming && (
					<div className="flex items-center gap-2 text-sm text-stone-500">
						<Loader2 className="h-4 w-4 animate-spin" />
						ИИ думает...
					</div>
				)}
			</div>

			<ChatInput />
		</div>
	)
}
