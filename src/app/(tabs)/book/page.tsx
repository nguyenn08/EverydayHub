'use client'

import { useState } from 'react'
import { Search, Star, Clock, Users, Check } from 'lucide-react'

const categories = [
  { label: 'Hair & Barber', icon: '✂️', active: true },
  { label: 'Food & Dining', icon: '🍽️', active: true },
  { label: 'Dental',        icon: '🦷', active: false },
  { label: 'Medical',       icon: '🩺', active: false },
  { label: 'Auto',          icon: '🚗', active: false },
  { label: 'Nail & Spa',    icon: '💅', active: false },
]

const barbers = [
  { initials: "BB", name: "Berea Barber Co.",    rating: 4.9, reviews: 38,  distance: "0.4 mi", duration: "30 min", price: "$22" },
  { initials: "GC", name: "Gridiron Cuts",       rating: 4.8, reviews: 112, distance: "0.8 mi", duration: "30 min", price: "$20" },
  { initials: "MS", name: "Main Street Barbers", rating: 4.7, reviews: 204, distance: "1.1 mi", duration: "45 min", price: "$25" },
  { initials: "OF", name: "The Ohio Fade",        rating: 4.6, reviews: 19,  distance: "1.6 mi", duration: "30 min", price: "$18" },
]

const restaurants = [
  {
    initials: "TD",
    name: "The Depot Grille",
    rating: 4.8,
    reviews: 52,
    distance: "0.5 mi",
    cuisine: "American",
    priceRange: "$$",
    deal: "Just Opened",
    dealColor: "text-[#93c5fd]",
  },
  {
    initials: "MR",
    name: "Mama Rosa's Italian",
    rating: 4.7,
    reviews: 189,
    distance: "1.2 mi",
    cuisine: "Italian",
    priceRange: "$$",
    deal: "2 for $45 tonight",
    dealColor: "text-yellow-400",
  },
  {
    initials: "BR",
    name: "Berea Brewing Co.",
    rating: 4.6,
    reviews: 311,
    distance: "0.9 mi",
    cuisine: "American · Brewery",
    priceRange: "$",
    deal: "Game day tables open",
    dealColor: "text-green-400",
  },
  {
    initials: "BG",
    name: "The Bagley Grille",
    rating: 4.5,
    reviews: 27,
    distance: "1.4 mi",
    cuisine: "American",
    priceRange: "$$",
    deal: null,
    dealColor: "",
  },
  {
    initials: "FS",
    name: "Front Street Kitchen",
    rating: 4.7,
    reviews: 143,
    distance: "0.6 mi",
    cuisine: "Farm-to-Table",
    priceRange: "$$$",
    deal: "Weekend brunch",
    dealColor: "text-[#93c5fd]",
  },
]

export default function BookPage() {
  const [query, setQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)
  const [confirmed, setConfirmed] = useState<Set<string>>(new Set())

  function toggleCategory(label: string, active: boolean) {
    if (!active) return
    setCategoryFilter(prev => (prev === label ? null : label))
  }

  function confirm(name: string) {
    setConfirmed(prev => new Set(prev).add(name))
    setTimeout(() => {
      setConfirmed(prev => {
        const next = new Set(prev)
        next.delete(name)
        return next
      })
    }, 2200)
  }

  const q = query.trim().toLowerCase()
  const showRestaurants = categoryFilter !== 'Hair & Barber'
  const showBarbers = categoryFilter !== 'Food & Dining'

  const filteredRestaurants = restaurants.filter(r =>
    !q || r.name.toLowerCase().includes(q) || r.cuisine.toLowerCase().includes(q)
  )
  const filteredBarbers = barbers.filter(b => !q || b.name.toLowerCase().includes(q))

  const noResults =
    q.length > 0 &&
    (!showRestaurants || filteredRestaurants.length === 0) &&
    (!showBarbers || filteredBarbers.length === 0)

  return (
    <div className="flex flex-col bg-[#0a1628] min-h-screen">
      <div className="px-4 pt-14 pb-4">
        <h1 className="text-2xl font-bold text-white tracking-tight">Book</h1>
        <p className="text-[#8ba3c7] text-sm mt-0.5">📍 Berea, Ohio · What do you need?</p>

        <div className="mt-4 flex items-center gap-3 bg-[#0f1f38] rounded-xl px-4 py-3 border border-[#1e3a5f] focus-within:border-[#93c5fd]/50 transition-colors">
          <Search size={16} className="text-[#2d4a6e]" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search services or restaurants..."
            className="bg-transparent text-white text-sm placeholder:text-[#2d4a6e] outline-none flex-1 min-w-0"
          />
        </div>
      </div>

      <div className="flex flex-col gap-7 pb-8">

        {/* Categories */}
        <div>
          <p className="text-white font-semibold px-4 mb-3">Categories</p>
          <div className="flex gap-3 px-4 overflow-x-auto no-scrollbar">
            {categories.map((cat) => {
              const selected = categoryFilter === cat.label
              return (
                <button
                  key={cat.label}
                  disabled={!cat.active}
                  onClick={() => toggleCategory(cat.label, cat.active)}
                  className={`flex flex-col items-center gap-2 px-4 py-3 rounded-2xl shrink-0 border transition-all active:scale-95 ${
                    selected
                      ? 'bg-[#93c5fd] border-[#93c5fd]'
                      : cat.active
                      ? 'bg-[#93c5fd]/10 border-[#93c5fd]/40'
                      : 'bg-[#0f1f38] border-[#1e3a5f] opacity-40'
                  }`}
                >
                  <span className="text-2xl">{cat.icon}</span>
                  <span className={`text-xs font-medium whitespace-nowrap ${
                    selected ? 'text-[#0a1628]' : cat.active ? 'text-[#93c5fd]' : 'text-[#2d4a6e]'
                  }`}>
                    {cat.label}
                  </span>
                </button>
              )
            })}
          </div>
          {categoryFilter && (
            <p className="text-[#4a6488] text-xs px-4 mt-2">
              Filtering by <span className="text-[#93c5fd]">{categoryFilter}</span> — tap again to clear
            </p>
          )}
        </div>

        {noResults && (
          <p className="text-center text-[#4a6488] text-sm px-4">No results for &ldquo;{query}&rdquo;</p>
        )}

        {/* Restaurants */}
        {showRestaurants && filteredRestaurants.length > 0 && (
          <div>
            <div className="flex items-center justify-between px-4 mb-3">
              <p className="text-white font-semibold">🍽️ Dine-In &amp; Reservations</p>
              <span className="text-[#93c5fd] text-xs">Berea, OH</span>
            </div>
            <div className="flex flex-col">
              {filteredRestaurants.map((r, i) => (
                <div
                  key={r.name}
                  className={`flex items-center gap-4 px-4 py-4 ${i < filteredRestaurants.length - 1 ? 'border-b border-[#0f1f38]' : ''}`}
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#0f1f38] border border-[#1e3a5f] flex items-center justify-center shrink-0">
                    <span className="text-white font-bold text-sm">{r.initials}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold truncate">{r.name}</p>
                    <p className="text-[#8ba3c7] text-xs mt-0.5">{r.cuisine} · {r.priceRange} · {r.distance}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1">
                        <Star size={10} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-[#8ba3c7] text-xs">{r.rating} ({r.reviews})</span>
                      </div>
                      {r.deal && (
                        <>
                          <span className="text-[#1e3a5f]">·</span>
                          <span className={`text-xs font-medium ${r.dealColor}`}>{r.deal}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => confirm(r.name)}
                    disabled={confirmed.has(r.name)}
                    className={`text-xs font-bold px-3 py-2 rounded-xl shrink-0 flex items-center gap-1 transition-colors active:scale-95 ${
                      confirmed.has(r.name) ? 'bg-green-400 text-[#0a1628]' : 'bg-[#93c5fd] text-[#0a1628]'
                    }`}
                  >
                    {confirmed.has(r.name) ? <Check size={11} /> : <Users size={11} />}
                    {confirmed.has(r.name) ? 'Reserved' : 'Reserve'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Barbers */}
        {showBarbers && filteredBarbers.length > 0 && (
          <div>
            <div className="flex items-center justify-between px-4 mb-3">
              <p className="text-white font-semibold">✂️ Barbers Near You</p>
              <span className="text-[#93c5fd] text-xs">Berea, OH</span>
            </div>
            <div className="flex flex-col">
              {filteredBarbers.map((b, i) => (
                <div
                  key={b.name}
                  className={`flex items-center gap-4 px-4 py-4 ${i < filteredBarbers.length - 1 ? 'border-b border-[#0f1f38]' : ''}`}
                >
                  <div className="w-14 h-14 rounded-full bg-[#0f1f38] border border-[#1e3a5f] flex items-center justify-center shrink-0">
                    <span className="text-white font-bold">{b.initials}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold">{b.name}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Star size={11} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-[#8ba3c7] text-xs">{b.rating} · {b.reviews} reviews</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="flex items-center gap-1 text-[#2d4a6e] text-xs">
                        <Clock size={11} /> {b.duration}
                      </span>
                      <span className="text-white text-xs font-semibold">{b.price}</span>
                      <span className="text-[#2d4a6e] text-xs">{b.distance}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => confirm(b.name)}
                    disabled={confirmed.has(b.name)}
                    className={`text-xs font-bold px-4 py-2 rounded-xl shrink-0 flex items-center gap-1 transition-colors active:scale-95 ${
                      confirmed.has(b.name) ? 'bg-green-400 text-[#0a1628]' : 'bg-[#93c5fd] text-[#0a1628]'
                    }`}
                  >
                    {confirmed.has(b.name) && <Check size={11} />}
                    {confirmed.has(b.name) ? 'Booked' : 'Book'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
