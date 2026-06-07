import { Plus, Clock, MapPin, ChevronRight } from 'lucide-react'

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
  return (
    <div className="flex flex-col bg-[#0a1628] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-14 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Calendar</h1>
          <p className="text-[#8ba3c7] text-sm mt-0.5">Your appointments</p>
        </div>
        <button className="bg-[#93c5fd] text-[#0a1628] p-2.5 rounded-full">
          <Plus size={18} strokeWidth={2.5} />
        </button>
      </div>

      <div className="flex flex-col gap-6 pb-6">
        {/* Upcoming */}
        <div>
          <p className="text-white font-semibold px-4 mb-3">Upcoming</p>
          <div className="flex flex-col gap-3 px-4">
            {upcoming.map((appt, i) => (
              <div key={i} className="bg-[#0f1f38] rounded-2xl p-4 border border-[#1e3a5f]">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#162040] border border-[#1e3a5f] flex items-center justify-center shrink-0">
                    <span className="text-white font-bold text-sm">{appt.initials}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-white font-semibold">{appt.service}</p>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${statusStyle[appt.status]}`}>
                        {appt.status}
                      </span>
                    </div>
                    <p className="text-[#93c5fd] text-xs mt-0.5">{appt.business}</p>
                  </div>
                  <ChevronRight size={18} className="text-[#1e3a5f]" />
                </div>

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
              </div>
            ))}
          </div>
        </div>

        <div className="h-px bg-[#1e3a5f] mx-4" />

        {/* History */}
        <div>
          <p className="text-white font-semibold px-4 mb-3">Service History</p>
          <div className="flex flex-col">
            {history.map((h, i) => (
              <div
                key={i}
                className={`flex items-center gap-4 px-4 py-4 ${i < history.length - 1 ? 'border-b border-[#0f1f38]' : ''}`}
              >
                <div className="w-10 h-10 rounded-full bg-[#0f1f38] border border-[#1e3a5f] flex items-center justify-center shrink-0">
                  <span className="text-white text-xs font-bold">{h.initials}</span>
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">{h.service}</p>
                  <p className="text-[#8ba3c7] text-xs mt-0.5">{h.business} · {h.date}</p>
                </div>
                <span className="text-white font-semibold text-sm">{h.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
