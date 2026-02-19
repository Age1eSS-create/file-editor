import { RouterProvider } from '@tanstack/react-router'
import { router } from '../router/router'
import { useCurrentUser } from '@/entities/user'

export function AppRouterProvider() {
  const currentUser = useCurrentUser()
  return <RouterProvider router={router} context={{ currentUser }} />
}
