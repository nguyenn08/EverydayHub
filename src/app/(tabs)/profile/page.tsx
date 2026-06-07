'use client'

import { useState } from 'react'
import {
  ChevronRight, MapPin, Bell, CreditCard, Heart,
  HelpCircle, Briefcase, LogOut, Settings, Star, X, Check,
} from 'lucide-react'
import Toast from '@/components/Toast'

const stats = [
  { label: "Appointments", value: "12" },
  { label: "Saved Places", value: "8" },
  { label: "Reviews", value: "5" },
]

const accountItems = [
  { icon: Settings,   label: "Personal Info",     sub: "Name, email, phone" },
  { icon: CreditCard, label: "Payment Methods",   sub: "Manage cards & billing" },
  { icon: Bell,       label: "Notifications",     sub: "Deals, reminders, updates" },
]

const activityItems = [
  { icon: Heart, label: "Saved Places", sub: "8 businesses you've bookmarked" },
  { icon: Star,  label: "Your Reviews", sub: "5 reviews · helps the community" },
]

const supportItems = [
  { icon: HelpCircle, label: "Help & Support", sub: "FAQs, contact, report an issue" },
]

export default function ProfilePage() {
  const [name, setName] = useState('John Doe')
  const [draftName, setDraftName] = useState(name)
  const [editing, setEditing] = useState(false)
  const [showSignOut, setShowSignOut] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  function flash(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(null), 2000)
  }

  function startEditing() {
    setDraftName(name)
    setEditing(true)
  }

  function saveName() {
    const trimmed = draftName.trim()
    if (trimmed) setName(trimmed)
    setEditing(false)
    flash('Profile updated')
  }

  function cancelEditing() {
    setDraftName(name)
    setEditing(false)
  }

  const initials = name.trim().split(/\s+/).map(p => p[0]).slice(0, 2).join('').toUpperCase() || 'JD'

  return (
    <div className="flex flex-col bg-[#0a1628] min-h-screen">

      {/* Header */}
      <div className="px-5 pt-14 md:pt-8 pb-5 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white tracking-tight">Profile</h1>
        <button
          onClick={() => flash('Settings — coming soon')}
          className="text-[#8ba3c7] hover:text-white transition-colors active:scale-90"
        >
          <Settings size={20} strokeWidth={1.8} />
        </button>
      </div>

      {/* Identity card */}
      <div className="px-4">
        <div className="bg-[#0f1f38] border border-[#1e3a5f] rounded-3xl p-5 flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#93c5fd] to-blue-400 flex items-center justify-center shrink-0">
            <span className="text-[#0a1628] font-bold text-xl">{initials}</span>
          </div>
          <div className="min-w-0 flex-1">
            {editing ? (
              <input
                value={draftName}
                onChange={e => setDraftName(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') saveName()
                  if (e.key === 'Escape') cancelEditing()
                }}
                autoFocus
                className="bg-[#162040] text-white font-bold text-base rounded-lg px-2.5 py-1.5 outline-none border border-[#93c5fd]/50 w-full"
              />
            ) : (
              <p className="text-white font-bold text-lg leading-tight truncate">{name}</p>
            )}
            <div className="flex items-center gap-1 mt-1">
              <MapPin size={11} className="text-[#93c5fd] shrink-0" />
              <span className="text-[#8ba3c7] text-xs truncate">Berea, Ohio</span>
            </div>
          </div>
          {editing ? (
            <div className="flex items-center gap-1.5 shrink-0">
              <button onClick={saveName} className="text-[#0a1628] bg-[#93c5fd] p-2 rounded-xl active:scale-90 transition-transform">
                <Check size={14} strokeWidth={2.5} />
              </button>
              <button onClick={cancelEditing} className="text-[#8ba3c7] bg-[#162040] p-2 rounded-xl active:scale-90 transition-transform">
                <X size={14} strokeWidth={2.5} />
              </button>
            </div>
          ) : (
            <button
              onClick={startEditing}
              className="ml-auto text-[#93c5fd] text-xs font-semibold bg-[#93c5fd]/10 px-3.5 py-2 rounded-xl shrink-0 active:scale-95 transition-transform"
            >
              Edit
            </button>
          )}
        </div>
      </div>

      {/* Stats row */}
      <div className="px-4 mt-4">
        <div className="bg-[#0f1f38] border border-[#1e3a5f] rounded-3xl p-4 flex items-center justify-around">
          {stats.map((s, i) => (
            <button
              key={s.label}
              onClick={() => flash(`${s.label} — coming soon`)}
              className={`flex flex-col items-center gap-0.5 flex-1 ${i > 0 ? 'border-l border-[#1e3a5f]' : ''}`}
            >
              <span className="text-white font-bold text-lg">{s.value}</span>
              <span className="text-[#8ba3c7] text-[11px]">{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Become a business CTA */}
      <button onClick={() => flash('Business onboarding — coming soon')} className="px-4 mt-5 w-full text-left">
        <div className="bg-gradient-to-br from-[#0f2a4a] to-[#0f1f38] border border-[#93c5fd]/30 rounded-3xl p-5 flex items-center gap-4 active:scale-[0.99] transition-transform">
          <div className="w-11 h-11 rounded-2xl bg-[#93c5fd]/15 flex items-center justify-center shrink-0">
            <Briefcase size={20} className="text-[#93c5fd]" strokeWidth={1.8} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-sm">List your business</p>
            <p className="text-[#8ba3c7] text-xs mt-0.5">Reach local customers on EverydayHub — free to get started</p>
          </div>
          <ChevronRight size={18} className="text-[#93c5fd] shrink-0" />
        </div>
      </button>

      {/* Menu sections */}
      <div className="flex flex-col gap-6 mt-7 pb-8">
        <MenuSection title="Account" items={accountItems} onSelect={flash} />
        <MenuSection title="Activity" items={activityItems} onSelect={flash} />
        <MenuSection title="Support" items={supportItems} onSelect={flash} />

        <div className="px-4">
          <button
            onClick={() => setShowSignOut(true)}
            className="w-full flex items-center justify-center gap-2 text-red-400 bg-[#0f1f38] border border-[#1e3a5f] rounded-2xl py-3.5 font-semibold text-sm active:scale-[0.98] transition-transform"
          >
            <LogOut size={16} strokeWidth={1.8} />
            Sign Out
          </button>
        </div>

        <p className="text-center text-[#2d4a6e] text-xs">EverydayHub · v0.1 · Berea, OH</p>
      </div>

      {/* Sign-out confirmation modal */}
      {showSignOut && (
        <div
          className="fixed inset-0 z-[90] bg-black/50 flex items-center justify-center px-6"
          onClick={() => setShowSignOut(false)}
        >
          <div
            onClick={e => e.stopPropagation()}
            className="bg-[#0f1f38] border border-[#1e3a5f] rounded-3xl p-6 w-full max-w-xs"
          >
            <p className="text-white font-bold text-lg">Sign out?</p>
            <p className="text-[#8ba3c7] text-sm mt-1.5">You can always sign back in later.</p>
            <div className="flex gap-2 mt-5">
              <button
                onClick={() => setShowSignOut(false)}
                className="flex-1 text-[#8ba3c7] bg-[#162040] rounded-xl py-2.5 text-sm font-semibold active:scale-95 transition-transform"
              >
                Cancel
              </button>
              <button
                onClick={() => { setShowSignOut(false); flash('Signed out — auth coming soon') }}
                className="flex-1 text-red-400 bg-red-400/10 rounded-xl py-2.5 text-sm font-semibold active:scale-95 transition-transform"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      <Toast message={toast ?? ''} show={!!toast} />
    </div>
  )
}

function MenuSection({ title, items, onSelect }: {
  title: string
  items: { icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>; label: string; sub: string }[]
  onSelect: (msg: string) => void
}) {
  return (
    <div>
      <p className="text-[#93c5fd] text-xs font-bold uppercase tracking-widest px-5 mb-3">{title}</p>
      <div className="bg-[#0f1f38] border border-[#1e3a5f] rounded-2xl mx-4 overflow-hidden">
        {items.map(({ icon: Icon, label, sub }, i) => (
          <button
            key={label}
            onClick={() => onSelect(`${label} — coming soon`)}
            className={`w-full flex items-center gap-3.5 px-4 py-3.5 text-left active:bg-[#162040] transition-colors ${
              i < items.length - 1 ? 'border-b border-[#162040]' : ''
            }`}
          >
            <div className="w-9 h-9 rounded-xl bg-[#162040] flex items-center justify-center shrink-0">
              <Icon size={16} className="text-[#93c5fd]" strokeWidth={1.8} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium">{label}</p>
              <p className="text-[#8ba3c7] text-xs mt-0.5 truncate">{sub}</p>
            </div>
            <ChevronRight size={16} className="text-[#1e3a5f] shrink-0" />
          </button>
        ))}
      </div>
    </div>
  )
}
