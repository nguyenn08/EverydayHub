'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PenLine, CalendarDays, User, MapPin } from 'lucide-react'
import HubPinIcon from './HubPinIcon'

const tabs = [
  { href: '/discover', label: 'Discover', icon: 'pin' as const },
  { href: '/book',     label: 'Book',     icon: PenLine },
  { href: '/calendar', label: 'Calendar', icon: CalendarDays },
  { href: '/profile',  label: 'Profile',  icon: User },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex flex-col w-60 shrink-0 px-4 py-8 sticky top-0 h-dvh">
      <Link href="/discover" className="px-3 mb-12 inline-block">
        <p className="text-white font-extrabold text-4xl tracking-tight leading-none">everyday</p>
        <div className="w-20 h-[3.5px] bg-gradient-to-r from-[#93c5fd] to-white rounded-full mt-3 mb-2.5" />
        <p className="text-[#93c5fd] text-base font-medium tracking-[0.35em]">HUB</p>
      </Link>

      <nav className="flex flex-col gap-1">
        {tabs.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3.5 px-3.5 py-3 rounded-2xl transition-all ${
                active ? 'bg-[#93c5fd]/10 text-[#93c5fd]' : 'text-[#8ba3c7] hover:bg-[#0f1f38]'
              }`}
            >
              {Icon === 'pin'
                ? <HubPinIcon active={active} size={21} />
                : <Icon size={21} strokeWidth={active ? 2.4 : 1.8} />}
              <span className={`text-[15px] ${active ? 'font-semibold' : 'font-medium'}`}>{label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto px-3.5 py-3 flex items-center gap-2 text-[#4a6488] text-xs">
        <MapPin size={13} />
        Berea, Ohio
      </div>
    </aside>
  )
}
