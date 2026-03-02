import { GoogleGenerativeAI } from '@google/generative-ai'

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string

const genAI = new GoogleGenerativeAI(API_KEY)

const SYSTEM_PROMPT = `Ты — ИИ-ассистент, встроенный в текстовый редактор файлов.
Тебе доступно содержимое файла, который открыт у пользователя.
Ты можешь:
- Анализировать содержимое файла
- Отвечать на вопросы по файлу
- Проводить code review
- Предлагать улучшения и исправления

Если пользователь просит внести изменения в файл, ты ДОЛЖЕН вернуть полное обновлённое содержимое файла, обернув его в специальные маркеры:
<<<FILE_UPDATE>>>
...полное содержимое файла с изменениями...
<<<END_FILE_UPDATE>>>

Маркеры должны быть на отдельных строках. Вне маркеров ты можешь добавить пояснение к изменениям.
Если изменений нет — просто отвечай текстом, без маркеров.
Отвечай на русском, если пользователь пишет на русском.`

export interface GeminiMessage {
	role: 'user' | 'model'
	parts: Array<{ text: string }>
}

export interface GeminiResponse {
	text: string
	fileUpdate: string | null
}

function buildHistory(
	chatHistory: Array<GeminiMessage>,
	fileContent: string,
	fileName: string,
): Array<GeminiMessage> {
	const fileContext: GeminiMessage = {
		role: 'user',
		parts: [
			{
				text: `Файл "${fileName}" открыт в редакторе. Вот его содержимое:\n\`\`\`\n${fileContent}\n\`\`\``,
			},
		],
	}

	const ack: GeminiMessage = {
		role: 'model',
		parts: [
			{
				text: 'Понял, я вижу содержимое файла. Готов помочь с анализом, вопросами или изменениями.',
			},
		],
	}

	return [fileContext, ack, ...chatHistory]
}

const FILE_UPDATE_RE = /<<<FILE_UPDATE>>>\n([\s\S]*?)\n<<<END_FILE_UPDATE>>>/

function parseResponse(raw: string): GeminiResponse {
	const match = FILE_UPDATE_RE.exec(raw)

	if (match) {
		const fileUpdate = match[1]
		const text = raw.replace(FILE_UPDATE_RE, '').trim()
		return { text: text || 'Изменения готовы к применению.', fileUpdate }
	}

	return { text: raw, fileUpdate: null }
}

const MODELS = ['gemini-2.5-flash', 'gemini-2.5-flash-lite', 'gemini-1.5-flash'] as const
const MAX_RETRIES = 2

function extractRetryDelay(error: unknown): number | null {
	const msg = error instanceof Error ? error.message : String(error)
	const match = /retry in ([\d.]+)s/i.exec(msg)
	return match ? Math.ceil(Number.parseFloat(match[1]) * 1000) : null
}

function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

async function tryModel(
	modelName: string,
	history: Array<GeminiMessage>,
	userMessage: string,
): Promise<GeminiResponse | null> {
	const model = genAI.getGenerativeModel({
		model: modelName,
		systemInstruction: SYSTEM_PROMPT,
	})

	for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
		try {
			const chat = model.startChat({ history })
			const result = await chat.sendMessage(userMessage)
			return parseResponse(result.response.text())
		} catch (error: unknown) {
			const is429 = error instanceof Error && error.message.includes('429')
			if (!is429) throw error

			const delay = extractRetryDelay(error)
			if (delay && attempt < MAX_RETRIES) {
				await sleep(delay)
				continue
			}
			return null
		}
	}
	return null
}

export async function sendMessage(
	chatHistory: Array<GeminiMessage>,
	fileContent: string,
	fileName: string,
	userMessage: string,
): Promise<GeminiResponse> {
	const history = buildHistory(chatHistory, fileContent, fileName)

	for (const modelName of MODELS) {
		const result = await tryModel(modelName, history, userMessage)
		if (result) return result
	}

	throw new Error(
		'Все модели Gemini недоступны (превышена квота). Попробуйте позже или проверьте биллинг API-ключа.',
	)
}
