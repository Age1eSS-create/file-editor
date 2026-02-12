import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routerTree'

export const router = createRouter({
  routeTree,
})

// Объявление типов для TypeScript
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
