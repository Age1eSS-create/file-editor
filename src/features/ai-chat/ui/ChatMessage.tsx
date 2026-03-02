import { Check, Bot, User } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import type { ChatMessage as ChatMessageType } from '@/shared/store/useChatStore'
import { useChatStore } from '@/shared/store'

interface ChatMessageProps {
	message: ChatMessageType
}

function renderText(text: string) {
	const parts = text.split(/(```[\s\S]*?```)/g)

	return parts.map((part) => {
		const key = `${part.length}-${part.slice(0, 32)}`

		if (part.startsWith('```') && part.endsWith('```')) {
			const content = part.slice(3, -3)
			const newlineIdx = content.indexOf('\n')
			const code = newlineIdx !== -1 ? content.slice(newlineIdx + 1) : content

			return (
				<pre
					key={key}
					className="my-2 overflow-x-auto rounded-md bg-stone-900 p-3 text-xs text-stone-100"
				>
					<code>{code}</code>
				</pre>
			)
		}

		return (
			<span key={key} className="whitespace-pre-wrap">
				{part}
			</span>
		)
	})
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
	const applyFileUpdate = useChatStore((s) => s.applyFileUpdate)
	const isUser = message.role === 'user'

	return (
		<div className={`flex gap-2.5 ${isUser ? 'flex-row-reverse' : ''}`}>
			<div
				className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
					isUser ? 'bg-stone-700 text-white' : 'bg-amber-100 text-amber-700'
				}`}
			>
				{isUser ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
			</div>

			<div
				className={`flex max-w-[85%] flex-col gap-1.5 rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
					isUser
						? 'bg-stone-700 text-white'
						: 'bg-white text-stone-800 shadow-sm border border-stone-200'
				}`}
			>
				<div>{renderText(message.text)}</div>

				{message.fileUpdate && (
					<Button
						size="sm"
						variant="outline"
						className="mt-1 gap-1.5 self-start border-emerald-300 text-emerald-700 hover:bg-emerald-50"
						onClick={() => applyFileUpdate(message.id)}
					>
						<Check className="h-3.5 w-3.5" />
						Применить изменения
					</Button>
				)}
			</div>
		</div>
	)
}
