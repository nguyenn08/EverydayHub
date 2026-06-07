'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Clock, MapPin, ChevronRight, ChevronDown } from 'lucide-react'
import Toast from '@/components/Toast'

const upcoming = [
  {
    service: "Haircut",
    business: "Fades & Co.",
    initials: "FC",
    date: "Tomorrow",
    time: "2:00 PM",
    duration: "30 min",
    address: "123 Main St",
    status: "confirmed",
  },
  {
    service: "Beard Trim",
    business: "Kings Cuts",
    initials: "KC",
    date: "Sat, Jun 14",
    time: "11:00 AM",
    duration: "20 min",
    address: "456 Oak Ave",
    status: "pending",
  },
]

const history = [
  { service: "Haircut",    business: "Fades & Co.", initials: "FC", date: "May 18", price: "$25" },
  { service: "Haircut",    business: "Fades & Co.", initials: "FC", date: "Apr 27", price: "$25" },
  { service: "Beard Trim", business: "Kings Cuts",  initials: "KC", date: "Apr 10", price: "$15" },
]

const statusStyle: Record<string, string> = {
  confirmed: 'text-green-400 bg-green-400/10',
  pending:   'text-yellow-400 bg-yellow-400/10',
}

export default function CalendarPage() {
  const [expanded, setExpanded] = useState<number | null>(null)
  const [cancelled, setCancelled] = useState<Set<number>>(new Set())
  const [toast, setToast] = useState<string | null>(null)

  function flash(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(null), 2200)
  }

  function toggle(i: number) {
    setExpanded(prev => (prev === i ? null : i))
  }

  function cancel(i: number, business: string) {
    setCancelled(prev => new Set(prev).add(i))
    setExpanded(null)
    flash(`Cancelled your appointment at ${business}`)
  }

  function reschedule(business: string) {
    flash(`Reschedule for ${business} — coming soon`)
  }

  const visibleCount = upcoming.filter((_, i) => !cancelled.has(i)).length

  return (
    <div className="flex flex-col bg-[#0a1628] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-14 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Calendar</h1>
          <p className="text-[#8ba3c7] text-sm mt-0.5">Your appointments</p>
        </div>
        <Link
          href="/book"
          className="bg-[#93c5fd] text-[#0a1628] p-2.5 rounded-full active:scale-90 transition-transform"
        >
          <Plus size={18} strokeWidth={2.5} />
        </Link>
      </div>

      <div className="flex flex-col gap-6 pb-6">
        {/* Upcoming */}
        <div>
          <p className="text-white font-semibold px-4 mb-3">Upcoming</p>
          <div className="flex flex-col gap-3 px-4">
            {visibleCount === 0 && (
              <p className="text-[#4a6488] text-sm text-center py-6">
                No upcoming appointments. <Link href="/book" className="text-[#93c5fd] underline">Book one now</Link>
              </p>
            )}
            {upcoming.map((appt, i) => {
              if (cancelled.has(i)) return null
              const open = expanded === i
              return (
                <div key={i} className="bg-[#0f1f38] rounded-2xl p-4 border border-[#1e3a5f]">
                  <button onClick={() => toggle(i)} className="w-full flex items-center gap-3 text-left">
                    <div className="w-11 h-11 rounded-full bg-[#162040] border border-[#1e3a5f] flex items-center justify-center shrink-0">
                      <span className="text-white font-bold text-sm">{appt.initials}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-white font-semibold">{appt.service}</p>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${statusStyle[appt.status]}`}>
                          {appt.status}
                        </span>
                      </div>
                      <p className="text-[#93c5fd] text-xs mt-0.5">{appt.business}</p>
                    </div>
                    {open
                      ? <ChevronDown size={18} className="text-[#93c5fd] shrink-0" />
                      : <ChevronRight size={18} className="text-[#1e3a5f] shrink-0" />}
                  </button>

                  <div className="mt-3 pt-3 border-t border-[#162040] flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 text-[#8ba3c7] text-xs">
                      <Clock size={12} className="text-[#93c5fd]" />
                      {appt.date} · {appt.time} · {appt.duration}
                    </div>
                    <div className="flex items-center gap-2 text-[#8ba3c7] text-xs">
                      <MapPin size={12} className="text-[#93c5fd]" />
                      {appt.address}
                    </div>
                  </div>

                  {open && (
                    <div className="mt-3 pt-3 border-t border-[#162040] flex gap-2">
                      <button
                        onClick={() => reschedule(appt.business)}
                        className="flex-1 text-[#93c5fd] text-xs font-semibold bg-[#93c5fd]/10 rounded-xl py-2.5 active:scale-95 transition-transform"
                      >
                        Reschedule
                      </button>
                      <button
                        onClick={() => cancel(i, appt.business)}
                        className="flex-1 text-red-400 text-xs font-semibold bg-red-400/10 rounded-xl py-2.5 active:scale-95 transition-transform"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="h-px bg-[#1e3a5f] mx-4" />

        {/* History */}
        <div>
          <p className="text-white font-semibold px-4 mb-3">Service History</p>
          <div className="flex flex-col">
            {history.map((h, i) => (
              <button
                key={i}
                onClick={() => flash(`${h.service} at ${h.business} · ${h.date} · ${h.price}`)}
                className={`flex items-center gap-4 px-4 py-4 text-left active:bg-[#0f1f38] transition-colors ${i < history.length - 1 ? 'border-b border-[#0f1f38]' : ''}`}
              >
                <div className="w-10 h-10 rounded-full bg-[#0f1f38] border border-[#1e3a5f] flex items-center justify-center shrink-0">
                  <span className="text-white text-xs font-bold">{h.initials}</span>
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">{h.service}</p>
                  <p className="text-[#8ba3c7] text-xs mt-0.5">{h.business} · {h.date}</p>
                </div>
                <span className="text-white font-semibold text-sm">{h.price}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <Toast message={toast ?? ''} show={!!toast} />
    </div>
  )
}
