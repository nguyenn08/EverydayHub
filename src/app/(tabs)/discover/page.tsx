'use client'

import { useState } from 'react'
import { Bell, MapPin, Bookmark, Share2, Navigation, X } from 'lucide-react'
import Toast from '@/components/Toast'

const stories = [
  { name: "Berea Barber",    initials: "BB", isNew: false },
  { name: "Cornerstone",     initials: "CN", isNew: true  },
  { name: "Mike's B&G",      initials: "MG", isNew: false },
  { name: "Jo Jo Carloni's", initials: "JC", isNew: false },
  { name: "Upper Deck",      initials: "UD", isNew: true  },
  { name: "Parkway Barber",  initials: "PB", isNew: false },
]

const notifications = [
  { text: "Mike's Bar & Grille just joined EverydayHub — see what's on tap this week.", time: "2h ago" },
  { text: "Berea Barber Shop opened new booking slots for this weekend.", time: "5h ago" },
  { text: "Reminder: Live at the Lake kicks off Saturday at Coe Lake Park, 7 PM.", time: "1d ago" },
]

interface Post {
  business: string
  initials: string
  meta: string
  tag: string
  tagColor: string
  body: string
  filter: string[]
  imageUrl?: string
}

const allPosts: Post[] = [
  {
    business: "Live at the Lake",
    initials: "LL",
    meta: "Coe Lake Park · 3h",
    tag: "Summer Series · Saturdays",
    tagColor: "text-purple-300",
    body: "🎶 Free outdoor concerts at Coe Lake Park all summer long — bring a chair, grab dinner from a food truck, and catch live music under the stars.",
    filter: ["Events", "New"],
    imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=400&fit=crop&auto=format",
  },
  {
    business: "The Cornerstone Brewing Co.",
    initials: "CN",
    meta: "Front St · 5h",
    tag: "Brewpub · Local Favorite",
    tagColor: "text-[#93c5fd]",
    body: "🍺 House-brewed drafts, wood-fired pizza, and a menu built for sharing — one of Berea's go-to spots for catching the game with a crowd.",
    filter: ["Eats", "Nightlife", "Sports"],
    imageUrl: "https://images.unsplash.com/photo-1559818488-89c85b8b60bc?w=600&h=400&fit=crop&auto=format",
  },
  {
    business: "Mike's Bar & Grille",
    initials: "MG",
    meta: "0.5 mi · 8h",
    tag: "Neighborhood Pub",
    tagColor: "text-[#93c5fd]",
    body: "🍻 A deep craft beer lineup, solid cocktails, and classic pub fare — the kind of bar where regulars have their usual spot.",
    filter: ["Eats", "Nightlife"],
    imageUrl: "https://images.unsplash.com/photo-1575037614876-c38a4d44f5b8?w=600&h=400&fit=crop&auto=format",
  },
  {
    business: "Berea Farmers Market",
    initials: "FM",
    meta: "Downtown Berea · 11h",
    tag: "Saturdays · 50th Year",
    tagColor: "text-green-300",
    body: "🌿 Local produce, baked goods, and handmade crafts from area vendors — every Saturday morning, now celebrating 50 years running.",
    filter: ["Events", "New"],
    imageUrl: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&h=400&fit=crop&auto=format",
  },
  {
    business: "Berea Barber Shop",
    initials: "BB",
    meta: "N Rocky River Dr · 1d",
    tag: "Licensed Barbers & Stylists",
    tagColor: "text-[#93c5fd]",
    body: "✂️ Licensed barbers and cosmetologists working on every hair type and style — a Rocky River Drive staple for sharp, dependable cuts.",
    filter: [],
    imageUrl: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&h=400&fit=crop&auto=format",
  },
  {
    business: "CLE Market Berea",
    initials: "CM",
    meta: "Coe Lake Park · 4h",
    tag: "Pop-Up Market",
    tagColor: "text-green-300",
    body: "🛍️ A rotating pop-up market at Coe Lake featuring local makers, food vendors, and small businesses from across Berea and the west side.",
    filter: ["Events", "New"],
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&auto=format",
  },
  {
    business: "Jo Jo Carloni's Italian",
    initials: "JC",
    meta: "1.2 mi · 1d",
    tag: "Italian · Pizzeria",
    tagColor: "text-[#93c5fd]",
    body: "🍕 Family-style Italian and wood-fired pizza in the heart of Berea — a regular stop for date nights and Friday pizza runs.",
    filter: ["Eats"],
    imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop&auto=format",
  },
  {
    business: "Upper Deck Bar & Grill",
    initials: "UD",
    meta: "Main St · 2d",
    tag: "Live Music · Karaoke",
    tagColor: "text-[#93c5fd]",
    body: "🎤 Live music and karaoke nights that turn into the whole bar singing along — a Berea night-out staple.",
    filter: ["Nightlife"],
    imageUrl: "https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?w=600&h=400&fit=crop&auto=format",
  },
  {
    business: "Parkway Barber & Styling",
    initials: "PB",
    meta: "Parkway Shops · 2d",
    tag: "50+ Years in Berea",
    tagColor: "text-[#93c5fd]",
    body: "✂️ Classic barbershop cuts, modern styles, and hot lather neck and face shaves — keeping Berea looking sharp for over five decades.",
    filter: [],
    imageUrl: "https://images.unsplash.com/photo-1622286342621-4bd78ef4da25?w=600&h=400&fit=crop&auto=format",
  },
  {
    business: "Cleveland Browns",
    initials: "CB",
    meta: "Browns Facility · 6h",
    tag: "Open to Public",
    tagColor: "text-orange-300",
    body: "🏈 Training camp practices are open to the public this week at the Berea facility. Free admission, gates open 9 AM — bring the family.",
    filter: ["Sports", "Events"],
    imageUrl: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=600&h=400&fit=crop&auto=format",
  },
  {
    business: "Baldwin Wallace Athletics",
    initials: "BW",
    meta: "George Finnie Stadium · 1d",
    tag: "Sat · Home Opener",
    tagColor: "text-yellow-300",
    body: "🐝 Yellow Jackets host their home opener Saturday. Tailgate starts at noon, kickoff at 2 PM — alumni and community welcome.",
    filter: ["Sports", "Events"],
    imageUrl: "https://images.unsplash.com/photo-1508098682722-e99c643e7f0b?w=600&h=400&fit=crop&auto=format",
  },
  {
    business: "Berea-Midpark Titans",
    initials: "BM",
    meta: "Titans Stadium · 2d",
    tag: "Friday · 7 PM",
    tagColor: "text-purple-300",
    body: "🏈 Friday night lights are back — Titans host their rivalry game this week. Student section gates open at 6, kickoff at 7.",
    filter: ["Sports", "Events"],
    imageUrl: "https://images.unsplash.com/photo-1567108483195-de5d8b88b739?w=600&h=400&fit=crop&auto=format",
  },
]

const filters = ['All', 'Events', 'Eats', 'Nightlife', 'Deals', 'New', 'Sports']

export default function DiscoverPage() {
  const [active, setActive] = useState('All')
  const [businessFilter, setBusinessFilter] = useState<string | null>(null)
  const [saved, setSaved] = useState<Set<number>>(new Set())
  const [shareFeedback, setShareFeedback] = useState<number | null>(null)
  const [showNotifications, setShowNotifications] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  function flash(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(null), 2000)
  }

  const posts = allPosts.filter(p => {
    if (businessFilter && p.initials !== businessFilter) return false
    return active === 'All' || p.filter.includes(active)
  })

  function toggleSave(i: number) {
    setSaved(prev => {
      const next = new Set(prev)
      if (next.has(i)) {
        next.delete(i)
        flash('Removed from saved')
      } else {
        next.add(i)
        flash('Saved to your places')
      }
      return next
    })
  }

  function openDirections(post: Post) {
    const query = encodeURIComponent(`${post.business}, Berea, OH`)
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank', 'noopener,noreferrer')
  }

  async function handleShare(post: Post, i: number) {
    const shareData = {
      title: post.business,
      text: post.body,
      url: typeof window !== 'undefined' ? window.location.origin + '/discover' : '',
    }
    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share(shareData)
      } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(`${post.business} — ${post.body}`)
        setShareFeedback(i)
        setTimeout(() => setShareFeedback(null), 1800)
      }
    } catch {
      // user dismissed the share sheet — nothing to do
    }
  }

  function toggleStory(initials: string) {
    setBusinessFilter(prev => (prev === initials ? null : initials))
  }

  const filteredBusinessName = businessFilter
    ? stories.find(s => s.initials === businessFilter)?.name
    : null

  return (
    <div className="flex flex-col bg-[#0a1628] min-h-screen">

      {/* Header */}
      <div className="px-5 pt-14 md:pt-8 pb-3 flex items-center justify-between relative">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Discover</h1>
          <div className="flex items-center gap-1 mt-0.5">
            <MapPin size={11} className="text-[#93c5fd]" />
            <span className="text-[#8ba3c7] text-xs">Berea, Ohio</span>
          </div>
        </div>
        <button onClick={() => setShowNotifications(v => !v)} className="relative active:scale-90 transition-transform">
          <Bell size={22} className="text-white" strokeWidth={1.8} />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#93c5fd] rounded-full border border-[#0a1628]" />
        </button>

        {showNotifications && (
          <>
            <div className="fixed inset-0 z-20" onClick={() => setShowNotifications(false)} />
            <div className="absolute right-5 top-16 z-30 w-72 bg-[#0f1f38] border border-[#1e3a5f] rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#162040]">
                <p className="text-white font-semibold text-sm">Notifications</p>
                <button onClick={() => setShowNotifications(false)} className="text-[#4a6488] hover:text-white transition-colors">
                  <X size={16} />
                </button>
              </div>
              {notifications.map((n, i) => (
                <div key={i} className="px-4 py-3 border-b border-[#162040] last:border-b-0">
                  <p className="text-[#c3d2e8] text-xs leading-relaxed">{n.text}</p>
                  <p className="text-[#4a6488] text-[10px] mt-1">{n.time}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 px-5 pb-4 overflow-x-auto no-scrollbar">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              active === f
                ? 'bg-[#93c5fd] text-[#0a1628]'
                : 'bg-[#0f1f38] text-[#8ba3c7] border border-[#1e3a5f]'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Stories */}
      <div className="flex gap-3 px-5 pb-3 overflow-x-auto no-scrollbar">
        {stories.map((s) => {
          const isSelected = businessFilter === s.initials
          const isDimmed = businessFilter !== null && !isSelected
          return (
            <button
              key={s.name}
              onClick={() => toggleStory(s.initials)}
              className={`flex flex-col items-center gap-1.5 shrink-0 transition-all active:scale-95 ${isDimmed ? 'opacity-40' : 'opacity-100'}`}
            >
              <div className={`p-[2.5px] rounded-2xl ${isSelected ? 'bg-[#93c5fd]' : s.isNew ? 'bg-gradient-to-br from-[#93c5fd] to-blue-400' : 'bg-[#1e3a5f]'}`}>
                <div className="bg-[#0a1628] p-[2px] rounded-[13px]">
                  <div className="w-14 h-14 rounded-xl bg-[#0f1f38] flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{s.initials}</span>
                  </div>
                </div>
              </div>
              <span className={`text-[10px] w-14 text-center truncate ${isSelected ? 'text-[#93c5fd] font-semibold' : 'text-[#8ba3c7]'}`}>{s.name}</span>
            </button>
          )
        })}
      </div>

      {businessFilter && (
        <div className="px-5 pb-4 flex items-center gap-2">
          <span className="text-[#8ba3c7] text-xs">Showing posts from <span className="text-[#93c5fd] font-semibold">{filteredBusinessName}</span></span>
          <button onClick={() => setBusinessFilter(null)} className="text-[#4a6488] hover:text-white transition-colors">
            <X size={13} />
          </button>
        </div>
      )}

      {/* Feed — short, scannable posts */}
      <div className="flex flex-col">
        {posts.length === 0 && (
          <p className="text-center text-[#4a6488] text-sm py-12">No posts match this filter yet.</p>
        )}
        {posts.map((post, i) => (
          <article
            key={i}
            className={`px-5 py-5 ${i < posts.length - 1 ? 'border-b border-[#0f1f38]' : ''}`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0f1f38] border border-[#1e3a5f] flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-xs">{post.initials}</span>
              </div>
              <div className="min-w-0">
                <p className="text-white font-semibold text-sm leading-tight">{post.business}</p>
                <p className="text-xs mt-0.5">
                  <span className="text-[#5a7798]">{post.meta}</span>
                  <span className="text-[#2d4a6e]"> · </span>
                  <span className={post.tagColor}>{post.tag}</span>
                </p>
              </div>
            </div>

            <p className="text-[#c3d2e8] text-[14px] leading-relaxed mt-3">
              {post.body}
            </p>

            {post.imageUrl && (
              <div className="mt-3 h-44 rounded-2xl border border-[#1e3a5f] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.imageUrl}
                  alt={post.business}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            )}

            <div className="flex items-center gap-6 mt-3.5">
              <button
                onClick={() => toggleSave(i)}
                className={`flex items-center gap-1.5 transition-colors active:scale-95 ${
                  saved.has(i) ? 'text-[#93c5fd]' : 'text-[#4a6488] hover:text-[#93c5fd]'
                }`}
              >
                <Bookmark size={15} strokeWidth={1.8} fill={saved.has(i) ? 'currentColor' : 'none'} />
                <span className="text-xs">{saved.has(i) ? 'Saved' : 'Save'}</span>
              </button>
              <button
                onClick={() => openDirections(post)}
                className="flex items-center gap-1.5 text-[#4a6488] hover:text-[#93c5fd] transition-colors active:scale-95"
              >
                <Navigation size={15} strokeWidth={1.8} />
                <span className="text-xs">Directions</span>
              </button>
              <button
                onClick={() => handleShare(post, i)}
                className="flex items-center gap-1.5 text-[#4a6488] hover:text-[#93c5fd] transition-colors active:scale-95"
              >
                <Share2 size={15} strokeWidth={1.8} />
                <span className="text-xs">{shareFeedback === i ? 'Copied!' : 'Share'}</span>
              </button>
            </div>
          </article>
        ))}
      </div>

      <Toast message={toast ?? ''} show={!!toast} />
    </div>
  )
}
