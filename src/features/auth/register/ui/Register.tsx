import { useRegister } from '../model'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'

export const Register = () => {
	const { 
		registerData, 
		setRegisterData, 
		handleRegister, 
		isLoading, 
		error,
		isSuccess 
	} = useRegister()
	
	return <Card>
			<CardHeader>
				<CardTitle>Создать аккаунт</CardTitle>
				<CardDescription>
					Заполните форму для создания нового аккаунта
				</CardDescription>
			</CardHeader>
			<form onSubmit={handleRegister} className="space-y-4">
				{error && (
					<div className="bg-destructive/10 text-destructive px-4 py-2 rounded-md text-sm">
						{error}
					</div>
				)}
				{isSuccess && (
					<div className="bg-green-500/10 text-green-600 px-4 py-2 rounded-md text-sm">
						✅ Регистрация успешна! Добро пожаловать!
					</div>
				)}
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
					<Button type="submit" className="w-full" disabled={isLoading}>
						{isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
					</Button>
					<p className="text-sm text-muted-foreground text-center">
						Регистрируясь, вы соглашаетесь с условиями использования
					</p>
				</CardFooter>
			</form>
		</Card>
}