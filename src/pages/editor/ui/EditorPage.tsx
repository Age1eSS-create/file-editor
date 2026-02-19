import { Upload } from 'lucide-react'
import { useRef } from 'react'
import { Header } from '@/widgets/header'
import { Button } from '@/shared/ui/button'

export function EditorPage() {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      console.log('Выбран файл:', file.name)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-stone-100 to-stone-200 gap-4">
      <Header />
      <div className="flex flex-col items-center justify-center flex-1 gap-4">
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
        <Button onClick={handleUploadClick} className="gap-2">
          <Upload className="w-4 h-4" />
          Загрузить файл
        </Button>
      </div>
    </div>
  )
}
