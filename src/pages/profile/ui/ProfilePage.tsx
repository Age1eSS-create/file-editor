import { UserInfo } from '@/widgets/UserInfo'
import { Header } from '@/widgets/header'

export function ProfilePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-stone-100 to-stone-200 gap-4">
      <Header />
      <div className="flex flex-col items-center justify-center gap-4">
        <UserInfo />
      </div>
    </div>
  )
}
