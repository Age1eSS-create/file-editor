import { useLogin } from '../model'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card'
import { Label } from '@/shared/ui/label'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'

export const Login = () => {
	const { 
		loginData, 
		setLoginData, 
		handleLogin, 
		isLoading, 
		error,
		isSuccess 
	} = useLogin()

	return <Card>
		<CardHeader>
		<CardTitle>Вход в систему</CardTitle>
		<CardDescription>
			Введите ваш email и пароль для входа
		</CardDescription>
		</CardHeader>
		<form onSubmit={handleLogin} className="space-y-4">
			{error && (
				<div className="bg-destructive/10 text-destructive px-4 py-2 rounded-md text-sm mx-6 mt-4">
					{error}
				</div>
			)}
			{isSuccess && (
				<div className="bg-green-500/10 text-green-600 px-4 py-2 rounded-md text-sm mx-6 mt-4">
					✅ Вход успешен! Добро пожаловать!
				</div>
			)}
			<CardContent className="space-y-4">
				<div className="space-y-2">
				<Label htmlFor="login-email">Email</Label>
				<Input
					id="login-email"
					type="email"
					placeholder="name@example.com"
					value={loginData.email}
					onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
					required
				/>
				</div>
				<div className="space-y-2">
				<Label htmlFor="login-password">Пароль</Label>
				<Input
					id="login-password"
					type="password"
					placeholder="••••••••"
					value={loginData.password}
					onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
					required
				/>
				</div>
			</CardContent>
			<CardFooter className="flex flex-col gap-4">
				<Button type="submit" className="w-full" disabled={isLoading}>
				{isLoading ? 'Вход...' : 'Войти'}
				</Button>
				<Button type="button" variant="link" className="text-sm">
				Забыли пароль?
				</Button>
			</CardFooter>
		</form>
	</Card>

}