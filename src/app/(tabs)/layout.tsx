import BottomNav from '@/components/BottomNav'
import Sidebar from '@/components/Sidebar'

export default function TabsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-[#0a1628] md:flex md:justify-center">
      <Sidebar />
      <div className="w-full max-w-[430px] md:max-w-[620px] md:border-x md:border-[#1e3a5f] mx-auto min-h-dvh relative">
        <main className="pb-28 md:pb-12">{children}</main>
        <BottomNav />
      </div>
    </div>
  )
}
