'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PenLine, CalendarDays, User } from 'lucide-react'
import HubPinIcon from './HubPinIcon'

const tabs = [
  { href: '/discover', icon: 'pin'    as const },
  { href: '/book',     icon: PenLine },
  { href: '/calendar', icon: CalendarDays },
  { href: '/profile',  icon: User },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[240px]">
      <nav className="bg-[#0f1f38]/90 backdrop-blur-md border border-[#1e3a5f] rounded-full px-2 py-2 flex items-center justify-around shadow-2xl shadow-black/60">
        {tabs.map(({ href, icon: Icon }) => {
          const active = pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center justify-center w-12 h-10 rounded-full transition-all ${
                active ? 'bg-[#93c5fd]/15' : ''
              }`}
            >
              {Icon === 'pin' ? (
                <HubPinIcon active={active} />
              ) : (
                <Icon
                  size={22}
                  className={active ? 'text-[#93c5fd]' : 'text-[#2d4a6e]'}
                  strokeWidth={active ? 2.5 : 1.8}
                />
              )}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
