import { createRootRouteWithContext, createRoute, redirect } from '@tanstack/react-router'
import { RootLayout } from './RootLayout'
import type { RouterContext } from './router'
import { AuthPage } from '@/pages/auth'
import { EditorPage } from '@/pages/editor'
import { ProfilePage } from '@/pages/profile'

export const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
})

export const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: ({ context }) => {
    if (context.currentUser) {
      throw redirect({ to: '/editor' })
    }
  },
  component: AuthPage,
})

export const editorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/editor',
  beforeLoad: ({ context }) => {
    if (!context.currentUser) {
      throw redirect({ to: '/' })
    }
  },
  component: EditorPage,
})

export const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile',
  beforeLoad: ({ context }) => {
    if (!context.currentUser) {
      throw redirect({ to: '/' })
    }
  },
  component: ProfilePage,
})

export const routeTree = rootRoute.addChildren([
  authRoute,
  editorRoute,
  profileRoute,
])
