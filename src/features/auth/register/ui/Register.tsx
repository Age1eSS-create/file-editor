import { useState } from 'react'
import type { RegisterData } from '../types/registerData'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card'
import { Label } from '@/shared/ui/label'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'

export const Register = () => {
	const [registerData, setRegisterData] = useState<RegisterData>({ name: '', email: '', password: '', confirmPassword: '' })

	const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		console.log('Регистрация:', registerData)
		// Здесь будет логика регистрации
	}
	return <Card>
			<CardHeader>
				<CardTitle>Создать аккаунт</CardTitle>
				<CardDescription>
					Заполните форму для создания нового аккаунта
				</CardDescription>
			</CardHeader>
			<form onSubmit={handleRegister} className="space-y-4">
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="register-name">Имя</Label>
						<Input
							id="register-name"
							type="text"
							placeholder="Иван Иванов"
							value={registerData.name}
							onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
							required
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="register-email">Email</Label>
						<Input
							id="register-email"
							type="email"
							placeholder="name@example.com"
							value={registerData.email}
							onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
							required
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="register-password">Пароль</Label>
						<Input
							id="register-password"
							type="password"
							placeholder="••••••••"
							value={registerData.password}
							onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
							required
							minLength={6}
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="register-confirm-password">Подтвердите пароль</Label>
						<Input
							id="register-confirm-password"
							type="password"
							placeholder="••••••••"
							value={registerData.confirmPassword}
							onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
							required
							minLength={6}
						/>
					</div>
				</CardContent>
				<CardFooter className="flex flex-col gap-4">
					<Button type="submit" className="w-full">
						Зарегистрироваться
					</Button>
					<p className="text-sm text-muted-foreground text-center">
						Регистрируясь, вы соглашаетесь с условиями использования
					</p>
				</CardFooter>
			</form>
		</Card>
}