import { Outlet } from '@tanstack/react-router'

export function RootLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Здесь можно будет добавить header позже */}
      <Outlet />
    </div>
  )
}
