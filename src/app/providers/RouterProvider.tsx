import { RouterProvider } from '@tanstack/react-router'
import { useEffect } from 'react'
import { router } from '../router/router'
import { useCurrentUser } from '@/entities/user'

export function AppRouterProvider() {
  const currentUser = useCurrentUser()

  useEffect(() => {
    router.invalidate();
    console.log('currentUser', currentUser)
  }, [currentUser])
  
  return <RouterProvider router={router} context={{ currentUser }} />
}
