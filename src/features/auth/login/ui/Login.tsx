import { useState } from 'react'
import type { LoginData } from '../types/loginData'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card'
import { Label } from '@/shared/ui/label'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'

export const Login = () => {
	const [loginData, setLoginData] = useState<LoginData>({ email: '', password: '' })

	const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		console.log('Вход:', loginData)
		// Здесь будет логика авторизации
	}

	return <Card>
		<CardHeader>
		<CardTitle>Вход в систему</CardTitle>
		<CardDescription>
			Введите ваш email и пароль для входа
		</CardDescription>
		</CardHeader>
		<form onSubmit={handleLogin} className="space-y-4">
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
			<Button type="submit" className="w-full">
			Войти
			</Button>
			<Button type="button" variant="link" className="text-sm">
			Забыли пароль?
			</Button>
		</CardFooter>
		</form>
	</Card>

}