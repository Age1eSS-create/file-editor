import { AuthProvider } from './providers/AuthProvider'
import { AppRouterProvider } from './providers/RouterProvider'

function InnerApp() {
  return <AppRouterProvider />
}

export function App() {
  return (
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  )
}