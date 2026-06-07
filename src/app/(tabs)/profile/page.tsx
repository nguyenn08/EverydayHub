import {
  ChevronRight, MapPin, Bell, CreditCard, Heart,
  HelpCircle, Briefcase, LogOut, Settings, Star,
} from 'lucide-react'

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
  return (
    <div className="flex flex-col bg-[#0a1628] min-h-screen">

      {/* Header */}
      <div className="px-5 pt-14 md:pt-8 pb-5 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white tracking-tight">Profile</h1>
        <button className="text-[#8ba3c7]">
          <Settings size={20} strokeWidth={1.8} />
        </button>
      </div>

      {/* Identity card */}
      <div className="px-4">
        <div className="bg-[#0f1f38] border border-[#1e3a5f] rounded-3xl p-5 flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#93c5fd] to-blue-400 flex items-center justify-center shrink-0">
            <span className="text-[#0a1628] font-bold text-xl">JD</span>
          </div>
          <div className="min-w-0">
            <p className="text-white font-bold text-lg leading-tight truncate">John Doe</p>
            <div className="flex items-center gap-1 mt-1">
              <MapPin size={11} className="text-[#93c5fd] shrink-0" />
              <span className="text-[#8ba3c7] text-xs truncate">Berea, Ohio</span>
            </div>
          </div>
          <button className="ml-auto text-[#93c5fd] text-xs font-semibold bg-[#93c5fd]/10 px-3.5 py-2 rounded-xl shrink-0">
            Edit
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="px-4 mt-4">
        <div className="bg-[#0f1f38] border border-[#1e3a5f] rounded-3xl p-4 flex items-center justify-around">
          {stats.map((s, i) => (
            <div key={s.label} className={`flex flex-col items-center gap-0.5 flex-1 ${i > 0 ? 'border-l border-[#1e3a5f]' : ''}`}>
              <span className="text-white font-bold text-lg">{s.value}</span>
              <span className="text-[#8ba3c7] text-[11px]">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Become a business CTA */}
      <div className="px-4 mt-5">
        <div className="bg-gradient-to-br from-[#0f2a4a] to-[#0f1f38] border border-[#93c5fd]/30 rounded-3xl p-5 flex items-center gap-4">
          <div className="w-11 h-11 rounded-2xl bg-[#93c5fd]/15 flex items-center justify-center shrink-0">
            <Briefcase size={20} className="text-[#93c5fd]" strokeWidth={1.8} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-sm">List your business</p>
            <p className="text-[#8ba3c7] text-xs mt-0.5">Reach local customers on EverydayHub — free to get started</p>
          </div>
          <ChevronRight size={18} className="text-[#93c5fd] shrink-0" />
        </div>
      </div>

      {/* Menu sections */}
      <div className="flex flex-col gap-6 mt-7 pb-8">
        <MenuSection title="Account" items={accountItems} />
        <MenuSection title="Activity" items={activityItems} />
        <MenuSection title="Support" items={supportItems} />

        <div className="px-4">
          <button className="w-full flex items-center justify-center gap-2 text-red-400 bg-[#0f1f38] border border-[#1e3a5f] rounded-2xl py-3.5 font-semibold text-sm">
            <LogOut size={16} strokeWidth={1.8} />
            Sign Out
          </button>
        </div>

        <p className="text-center text-[#2d4a6e] text-xs">EverydayHub · v0.1 · Berea, OH</p>
      </div>
    </div>
  )
}

function MenuSection({ title, items }: {
  title: string
  items: { icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>; label: string; sub: string }[]
}) {
  return (
    <div>
      <p className="text-[#93c5fd] text-xs font-bold uppercase tracking-widest px-5 mb-3">{title}</p>
      <div className="bg-[#0f1f38] border border-[#1e3a5f] rounded-2xl mx-4 overflow-hidden">
        {items.map(({ icon: Icon, label, sub }, i) => (
          <button
            key={label}
            className={`w-full flex items-center gap-3.5 px-4 py-3.5 text-left ${
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
