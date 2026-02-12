import { createRootRoute, createRoute } from '@tanstack/react-router'
import { RootLayout } from './RootLayout'
import { AuthPage } from '@/pages/auth'
import { HomePage } from '@/pages/home'

export const rootRoute = createRootRoute({
  component: RootLayout,
})

export const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: AuthPage,
})

export const editorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/editor',
  component: HomePage,
})

export const routeTree = rootRoute.addChildren([
  authRoute,
  editorRoute,
])
