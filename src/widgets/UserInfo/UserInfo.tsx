import { useCurrentUser, useIsAuthenticated } from '@/entities/user'
import { useUserStore } from '@/shared/store'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import { router } from '@/app/router/router'

export const UserInfo = () => {
  const currentUser = useCurrentUser()
  const isAuthenticated = useIsAuthenticated()
  const logout = useUserStore((state) => state.logout)

  if (!isAuthenticated) {
	return null
  }

  const handleLogout = () => {
    logout()
    router.navigate({ to: '/' })
  }

  return (
	<Card className="mb-4">
	  <CardHeader>
		<CardTitle>Текущий пользователь</CardTitle>
		<CardDescription>Информация о вашем профиле</CardDescription>
	  </CardHeader>
	  <CardContent className="space-y-2">
		<div>
		  <span className="font-semibold">Имя:</span> {currentUser?.name}
		</div>
		<div>
		  <span className="font-semibold">Email:</span> {currentUser?.email}
		</div>
		<div>
		  <span className="font-semibold">ID:</span> {currentUser?.id}
		</div>
		<Button 
		  onClick={handleLogout} 
		  variant="destructive" 
		  size="sm" 
		  className="mt-4"
		>
		  Выйти
		</Button>
	  </CardContent>
	</Card>
  )
}
