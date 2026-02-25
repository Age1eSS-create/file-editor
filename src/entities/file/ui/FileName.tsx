import { FileText } from 'lucide-react'
import { useFileName } from '../model/useFile'

export const FileName = () => {
	const name = useFileName()

	if (!name) return null

	return (
		<div className="flex items-center gap-2 text-sm text-stone-700">
			<FileText className="h-4 w-4 shrink-0" />
			<span className="truncate font-medium">{name}</span>
		</div>
	)
}
