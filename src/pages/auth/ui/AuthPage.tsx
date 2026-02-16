import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs'
import { Login } from '@/features/auth/login'
import { Register } from '@/features/auth/register'

export const AuthPage = () => {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-100 to-stone-200 p-4">
			<div className="w-full max-w-md">
				<Tabs defaultValue="login" className="w-full">
					<TabsList className="grid w-full grid-cols-2">
						<TabsTrigger value="login">Вход</TabsTrigger>
						<TabsTrigger value="register">Регистрация</TabsTrigger>
					</TabsList>
					<TabsContent value="login">
						<Login />
					</TabsContent>
					<TabsContent value="register">
						<Register />
					</TabsContent>
				</Tabs>
			</div>
		</div>
	)
}