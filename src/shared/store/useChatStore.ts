import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { useFileStore } from './useFileStore'
import type { GeminiMessage } from '@/shared/api/ai'
import { sendMessage } from '@/shared/api/ai'

export interface ChatMessage {
	id: string
	role: 'user' | 'assistant'
	text: string
	fileUpdate?: string
	createdAt: Date
}

interface ChatState {
	messages: Array<ChatMessage>
	isStreaming: boolean

	sendMessage: (text: string) => Promise<void>
	applyFileUpdate: (messageId: string) => void
	clearChat: () => void
}

function toGeminiHistory(messages: Array<ChatMessage>): Array<GeminiMessage> {
	return messages.map((m) => ({
		role: m.role === 'user' ? ('user' as const) : ('model' as const),
		parts: [{ text: m.text + (m.fileUpdate ? `\n<<<FILE_UPDATE>>>\n${m.fileUpdate}\n<<<END_FILE_UPDATE>>>` : '') }],
	}))
}

export const useChatStore = create<ChatState>()(
	devtools(
		(set, get) => ({
			messages: [],
			isStreaming: false,

			sendMessage: async (text: string) => {
				const fileState = useFileStore.getState()
				const currentFile = fileState.currentFile
				if (!currentFile) return

				const userMsg: ChatMessage = {
					id: crypto.randomUUID(),
					role: 'user',
					text,
					createdAt: new Date(),
				}

				set((s) => ({ messages: [...s.messages, userMsg], isStreaming: true }))

				try {
					const history = toGeminiHistory(get().messages.slice(0, -1))
					const response = await sendMessage(
						history,
						currentFile.content,
						currentFile.name,
						text,
					)

					const assistantMsg: ChatMessage = {
						id: crypto.randomUUID(),
						role: 'assistant',
						text: response.text,
						fileUpdate: response.fileUpdate ?? undefined,
						createdAt: new Date(),
					}

					set((s) => ({
						messages: [...s.messages, assistantMsg],
						isStreaming: false,
					}))
				} catch (error) {
					const errorText =
						error instanceof Error ? error.message : 'Ошибка при обращении к ИИ'

					const errorMsg: ChatMessage = {
						id: crypto.randomUUID(),
						role: 'assistant',
						text: `Ошибка: ${errorText}`,
						createdAt: new Date(),
					}

					set((s) => ({
						messages: [...s.messages, errorMsg],
						isStreaming: false,
					}))
				}
			},

			applyFileUpdate: (messageId: string) => {
				const msg = get().messages.find((m) => m.id === messageId)
				if (!msg?.fileUpdate) return

				useFileStore.getState().updateContent(msg.fileUpdate)
			},

			clearChat: () => {
				set({ messages: [], isStreaming: false })
			},
		}),
		{ name: 'ChatStore' },
	),
)
