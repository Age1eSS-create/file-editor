import { Link } from '@tanstack/react-router'
import { FileText, User } from 'lucide-react'

const navLinks = [
  { to: '/editor', label: 'Редактор', icon: FileText },
  { to: '/profile', label: 'Профиль', icon: User },
] as const

export function Header() {
  return (
    <header className="h-12 px-6 flex items-center justify-between bg-zinc-950 border-b border-zinc-800">
      <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase select-none">
        file-editor
      </span>

      <nav className="flex items-center gap-1">
        {navLinks.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium text-zinc-500 hover:text-zinc-100 transition-colors duration-150"
            activeProps={{
              className:
                'flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium text-zinc-100 bg-zinc-800 transition-colors duration-150',
            }}
          >
            <Icon size={13} strokeWidth={1.5} />
            {label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
