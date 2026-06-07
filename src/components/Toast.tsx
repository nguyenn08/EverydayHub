'use client'

export default function Toast({ message, show }: { message: string; show: boolean }) {
  return (
    <div
      className={`fixed bottom-28 md:bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-[#0f1f38] border border-[#1e3a5f] text-white text-sm font-medium px-5 py-3 rounded-2xl shadow-2xl shadow-black/50 transition-all duration-300 whitespace-nowrap ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
      }`}
    >
      {message}
    </div>
  )
}
