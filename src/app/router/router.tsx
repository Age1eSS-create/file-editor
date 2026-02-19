import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routerTree'
import type { User } from '@/entities/user'

export interface RouterContext {
  currentUser: User | null
}

export const router = createRouter({
  routeTree,
  context: {
    currentUser: null,
  } satisfies RouterContext,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
