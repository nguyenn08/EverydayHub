export default function DesignsPage() {
  return (
    <div className="bg-[#0a1628] min-h-screen px-4 py-14 max-w-[430px] mx-auto">
      <h1 className="text-2xl font-bold text-white mb-1">Logo Concepts</h1>
      <p className="text-[#8ba3c7] text-sm mb-10">Round 2 — tighter spacing, more everyday marks</p>

      {/* ── EVERYDAY OBJECT MARKS ── */}
      <Section label="Everyday Object Marks">
        <div className="grid grid-cols-3 gap-3">

          {/* Hub Pin */}
          <IconCard label="Hub Pin" sub="Your city, one pin">
            <HubPin ringStroke="#93c5fd" dotFill="#93c5fd" />
          </IconCard>

          {/* Key */}
          <IconCard label="Key" sub="Unlock your day">
            <svg width="52" height="30" viewBox="0 0 52 30" fill="none">
              <circle cx="12" cy="15" r="11" stroke="#93c5fd" strokeWidth="2.5" fill="none"/>
              <circle cx="12" cy="15" r="4" fill="#93c5fd"/>
              <rect x="22" y="13" width="26" height="4" rx="2" fill="white"/>
              <rect x="38" y="17" width="3.5" height="6"  rx="1.2" fill="white"/>
              <rect x="44" y="17" width="3.5" height="8"  rx="1.2" fill="white"/>
            </svg>
          </IconCard>

          {/* Open Book */}
          <IconCard label="Open Book" sub="Knowledge at your door">
            <svg width="50" height="40" viewBox="0 0 50 40" fill="none">
              <path d="M25 6 C25 6 12 5 7 9 L4 36 C4 36 14 33 25 36 Z"
                fill="#0f1f38" stroke="#1e3a5f" strokeWidth="1.5"/>
              <path d="M25 6 C25 6 38 5 43 9 L46 36 C46 36 36 33 25 36 Z"
                fill="#0f1f38" stroke="#93c5fd" strokeWidth="1.5" opacity="0.6"/>
              <rect x="23" y="4" width="4" height="34" rx="2" fill="#93c5fd"/>
              <line x1="10" y1="14" x2="22" y2="13" stroke="#1e3a5f" strokeWidth="1.2"/>
              <line x1="9"  y1="19" x2="21" y2="18" stroke="#1e3a5f" strokeWidth="1.2"/>
              <line x1="9"  y1="24" x2="21" y2="23" stroke="#1e3a5f" strokeWidth="1.2"/>
            </svg>
          </IconCard>

          {/* Wheel Hub — literal "hub" of a wheel */}
          <IconCard label="Wheel Hub" sub="Hub — the center of all things">
            <svg width="46" height="46" viewBox="0 0 46 46" fill="none">
              <circle cx="23" cy="23" r="20" stroke="#1e3a5f" strokeWidth="2.5" fill="none"/>
              <line x1="23" y1="23" x2="23" y2="3"  stroke="#162840" strokeWidth="1.5"/>
              <line x1="23" y1="23" x2="40" y2="13" stroke="#162840" strokeWidth="1.5"/>
              <line x1="23" y1="23" x2="40" y2="33" stroke="#162840" strokeWidth="1.5"/>
              <line x1="23" y1="23" x2="23" y2="43" stroke="#162840" strokeWidth="1.5"/>
              <line x1="23" y1="23" x2="6"  y2="33" stroke="#162840" strokeWidth="1.5"/>
              <line x1="23" y1="23" x2="6"  y2="13" stroke="#162840" strokeWidth="1.5"/>
              <circle cx="23" cy="23" r="7" fill="#93c5fd"/>
              <circle cx="23" cy="23" r="3" fill="#0a1628"/>
            </svg>
          </IconCard>

          {/* Compass */}
          <IconCard label="Compass" sub="Your daily direction">
            <svg width="46" height="46" viewBox="0 0 46 46" fill="none">
              <circle cx="23" cy="23" r="20" stroke="#1e3a5f" strokeWidth="1.5" fill="none"/>
              <polygon points="23,4 19.5,21 23,18.5 26.5,21" fill="#93c5fd"/>
              <polygon points="23,42 19.5,25 23,27.5 26.5,25" fill="#2d4a6e"/>
              <circle cx="41" cy="23" r="2" fill="#2d4a6e"/>
              <circle cx="5"  cy="23" r="2" fill="#2d4a6e"/>
              <circle cx="23" cy="23" r="3" fill="#93c5fd"/>
            </svg>
          </IconCard>

          {/* Daily Ring */}
          <IconCard label="Daily Ring" sub="Schedule your whole life">
            <svg width="46" height="46" viewBox="0 0 46 46" fill="none">
              <circle cx="23" cy="23" r="19" stroke="#1e3a5f" strokeWidth="2" fill="none"/>
              <circle cx="23" cy="23" r="19" stroke="#93c5fd" strokeWidth="2" fill="none"
                strokeDasharray="30 90" strokeDashoffset="0"/>
              <line x1="23" y1="23" x2="23" y2="9"  stroke="#93c5fd" strokeWidth="2.5" strokeLinecap="round"/>
              <line x1="23" y1="23" x2="32" y2="17" stroke="white"   strokeWidth="2"   strokeLinecap="round"/>
              <circle cx="23" cy="23" r="2.5" fill="#93c5fd"/>
            </svg>
          </IconCard>

        </div>
      </Section>

      {/* ── EH BADGE — COLORWAYS ── */}
      <Section label="EH Badge — Colorways">
        <p className="text-[#8ba3c7] text-xs -mt-2 mb-4 leading-relaxed">
          One fixed template — same size, weight, and now a tighter E↔H gap.
          Only the palette changes between cards.
        </p>
        <div className="grid grid-cols-2 gap-4">

          <IconCard label="Powder & White" sub="Classic — cool, neutral, balanced">
            <EHBadge eFill="#93c5fd" hFill="white" />
          </IconCard>

          <IconCard label="Reversed" sub="White E, powder blue H">
            <EHBadge eFill="white" hFill="#93c5fd" />
          </IconCard>

          <IconCard label="Mono Blue" sub="One hue — depth from opacity, not color">
            <EHBadge eFill="#93c5fd" hFill="#93c5fd" hOpacity={0.4} />
          </IconCard>

          <IconCard label="Ghost White" sub="Both white — quiet, minimal depth">
            <EHBadge eFill="white" hFill="white" hOpacity={0.35} />
          </IconCard>

          <IconCard label="Gold Pop" sub="Warm amber E against cool navy">
            <EHBadge eFill="#fbbf24" hFill="white" />
          </IconCard>

          <IconCard label="Coral Pop" sub="Warm coral E — energetic contrast">
            <EHBadge eFill="#fb7185" hFill="white" />
          </IconCard>

          <IconCard label="Mint Duo" sub="Two cool accents — blue + mint">
            <EHBadge eFill="#93c5fd" hFill="#34d399" />
          </IconCard>

          <IconCard label="Ice Gradient" sub="E fades from powder blue to white">
            <EHBadge
              eFill="url(#iceGrad)"
              hFill="white"
              defs={
                <linearGradient id="iceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#93c5fd" />
                  <stop offset="100%" stopColor="white" />
                </linearGradient>
              }
            />
          </IconCard>

        </div>
      </Section>

      {/* ── WORDMARKS ── */}
      <Section label="Wordmarks — W2 Base + Variants">
        <div className="flex flex-col gap-3">

          {/* W2 — the liked one */}
          <WideCard label="W2 ★" sub="everyday bold + accent line + HUB spaced">
            <svg width="180" height="58" viewBox="0 0 180 58" fill="none">
              <text x="0" y="28" fontFamily="-apple-system,BlinkMacSystemFont,sans-serif"
                fontSize="24" fontWeight="800" fill="white">everyday</text>
              <rect x="0" y="34" width="48" height="1.5" rx="1" fill="#93c5fd" opacity="0.55"/>
              <text x="0" y="56" fontFamily="-apple-system,BlinkMacSystemFont,sans-serif"
                fontSize="14" fontWeight="400" fill="#93c5fd" letterSpacing="6">HUB</text>
            </svg>
          </WideCard>

          {/* W2b — live dot + shorter line */}
          <WideCard label="W2b" sub="Live dot leading the line — pulse feel">
            <svg width="180" height="58" viewBox="0 0 180 58" fill="none">
              <text x="0" y="28" fontFamily="-apple-system,BlinkMacSystemFont,sans-serif"
                fontSize="24" fontWeight="800" fill="white">everyday</text>
              <circle cx="3" cy="36" r="2.5" fill="#93c5fd"/>
              <rect x="9" y="35" width="39" height="1.5" rx="1" fill="#93c5fd" opacity="0.45"/>
              <text x="0" y="56" fontFamily="-apple-system,BlinkMacSystemFont,sans-serif"
                fontSize="14" fontWeight="400" fill="#93c5fd" letterSpacing="6">HUB</text>
            </svg>
          </WideCard>

          {/* W2c — underline only under HUB */}
          <WideCard label="W2c" sub="Line under HUB only — underlines the brand name">
            <svg width="180" height="60" viewBox="0 0 180 60" fill="none">
              <text x="0" y="26" fontFamily="-apple-system,BlinkMacSystemFont,sans-serif"
                fontSize="24" fontWeight="800" fill="white">everyday</text>
              <text x="0" y="52" fontFamily="-apple-system,BlinkMacSystemFont,sans-serif"
                fontSize="14" fontWeight="400" fill="#93c5fd" letterSpacing="6">HUB</text>
              <rect x="0" y="56" width="34" height="1.5" rx="1" fill="#93c5fd" opacity="0.5"/>
            </svg>
          </WideCard>

          {/* W3 — thin everyday + bold HUB reversed weights */}
          <WideCard label="W3" sub="Thin everyday, bold HUB — flipped hierarchy">
            <svg width="180" height="58" viewBox="0 0 180 58" fill="none">
              <text x="0" y="28" fontFamily="-apple-system,BlinkMacSystemFont,sans-serif"
                fontSize="24" fontWeight="300" fill="#8ba3c7">everyday</text>
              <rect x="0" y="34" width="48" height="1.5" rx="1" fill="#93c5fd" opacity="0.35"/>
              <text x="0" y="56" fontFamily="-apple-system,BlinkMacSystemFont,sans-serif"
                fontSize="16" fontWeight="800" fill="white" letterSpacing="5">HUB</text>
            </svg>
          </WideCard>

          {/* W4 — HUB as pill chip */}
          <WideCard label="W4" sub="HUB as a chip badge — feels native to the app">
            <div className="flex items-baseline gap-3">
              <svg width="140" height="32" viewBox="0 0 140 32" fill="none">
                <text x="0" y="26" fontFamily="-apple-system,BlinkMacSystemFont,sans-serif"
                  fontSize="26" fontWeight="800" fill="white">everyday</text>
              </svg>
              <div className="bg-[#93c5fd] text-[#0a1628] text-xs font-black px-3 py-1 rounded-full tracking-[0.2em] shrink-0">
                HUB
              </div>
            </div>
          </WideCard>

          {/* W5 — accent first letter */}
          <WideCard label="W5" sub="Accent 'e' — first letter in powder blue">
            <svg width="180" height="58" viewBox="0 0 180 58" fill="none">
              <text x="0"  y="28" fontFamily="-apple-system,BlinkMacSystemFont,sans-serif"
                fontSize="24" fontWeight="800" fill="#93c5fd">e</text>
              <text x="15" y="28" fontFamily="-apple-system,BlinkMacSystemFont,sans-serif"
                fontSize="24" fontWeight="800" fill="white">veryday</text>
              <rect x="0" y="34" width="48" height="1.5" rx="1" fill="#93c5fd" opacity="0.4"/>
              <text x="0" y="56" fontFamily="-apple-system,BlinkMacSystemFont,sans-serif"
                fontSize="14" fontWeight="400" fill="#93c5fd" letterSpacing="6">HUB</text>
            </svg>
          </WideCard>

        </div>
      </Section>

      {/* ── BADGE + W2 LOCKUP — TIGHTER EH ── */}
      <Section label="Badge + W2 Lockup">
        <div className="bg-[#0f1f38] border border-[#1e3a5f] rounded-2xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[#93c5fd] text-[10px] font-bold bg-[#93c5fd]/10 px-2 py-0.5 rounded-full">Badge + W2</span>
            <p className="text-[#8ba3c7] text-xs">EH pulled in tighter — small, deliberate gap</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-[52px] h-[52px]"><EHBadge eFill="#93c5fd" hFill="white" /></div>
            <W2Wordmark />
          </div>
        </div>
      </Section>

      {/* ── HUB PIN — INNER COLOR VARIATIONS ── */}
      <Section label="Hub Pin + W2 — Inner Color Variations">
        <p className="text-[#8ba3c7] text-xs -mt-2 mb-4 leading-relaxed">
          Same pin outline every time — only the inner ring and center dot change.
        </p>
        <div className="flex flex-col gap-3">

          <PinLockup name="Classic" sub="Blue ring, blue center — the original">
            <HubPin ringStroke="#93c5fd" dotFill="#93c5fd" />
          </PinLockup>

          <PinLockup name="White Core" sub="Blue ring, white center — crisp pop">
            <HubPin ringStroke="#93c5fd" dotFill="white" />
          </PinLockup>

          <PinLockup name="Mint Core" sub="Blue ring, mint center — fresh accent">
            <HubPin ringStroke="#93c5fd" dotFill="#34d399" />
          </PinLockup>

          <PinLockup name="Gold Core" sub="Blue ring, gold center — warm pop">
            <HubPin ringStroke="#93c5fd" dotFill="#fbbf24" />
          </PinLockup>

          <PinLockup name="Soft Glow" sub="Translucent ring fill — gentle glow halo">
            <HubPin ringStroke="#93c5fd" ringFill="#93c5fd" ringFillOpacity={0.15} dotFill="#93c5fd" />
          </PinLockup>

          <PinLockup name="Ghost Ring" sub="Faded ring, solid center — layered depth">
            <HubPin ringStroke="#93c5fd" ringStrokeOpacity={0.35} dotFill="#93c5fd" />
          </PinLockup>

        </div>
      </Section>

      <p className="text-center text-[#2d4a6e] text-xs mt-4 pb-10">
        Pick your favorite combo — I'll wire it everywhere.
      </p>
    </div>
  )
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <p className="text-[#93c5fd] text-xs font-bold uppercase tracking-widest mb-5">{label}</p>
      {children}
    </section>
  )
}

function IconCard({ label, sub, children }: { label: string; sub: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#0f1f38] border border-[#1e3a5f] rounded-2xl p-4 flex flex-col items-center gap-3">
      <div className="flex items-center justify-center min-h-[56px]">{children}</div>
      <div className="text-center">
        <p className="text-white text-xs font-semibold">{label}</p>
        <p className="text-[#8ba3c7] text-[10px] mt-0.5 leading-snug">{sub}</p>
      </div>
    </div>
  )
}

function WideCard({ label, sub, children }: { label: string; sub: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#0f1f38] border border-[#1e3a5f] rounded-2xl p-5 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="text-[#93c5fd] text-[10px] font-bold bg-[#93c5fd]/10 px-2 py-0.5 rounded-full">{label}</span>
        <p className="text-[#8ba3c7] text-xs">{sub}</p>
      </div>
      <div className="overflow-x-auto no-scrollbar">{children}</div>
    </div>
  )
}

/** Pairs a Hub Pin variant with the unchanged W2 wordmark in a labeled card. */
function PinLockup({ name, sub, children }: { name: string; sub: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#0f1f38] border border-[#1e3a5f] rounded-2xl p-5 flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-[#93c5fd] text-[10px] font-bold bg-[#93c5fd]/10 px-2 py-0.5 rounded-full">{name}</span>
        <p className="text-[#8ba3c7] text-xs">{sub}</p>
      </div>
      <div className="flex items-center gap-4">
        {children}
        <W2Wordmark />
      </div>
    </div>
  )
}

/**
 * Single source of truth for the EH badge's geometry — size, corner radius,
 * letter weight, and the E/H gap stay identical across every colorway so
 * comparisons are apples-to-apples. Only fills/opacity vary per call site.
 * Letters sit closer together than the first pass — a small, deliberate gap.
 */
function EHBadge({ eFill, hFill, eOpacity = 1, hOpacity = 1, defs }: {
  eFill: string
  hFill: string
  eOpacity?: number
  hOpacity?: number
  defs?: React.ReactNode
}) {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      {defs && <defs>{defs}</defs>}
      <rect width="64" height="64" rx="18" fill="#0f1f38"/>
      <rect x="1" y="1" width="62" height="62" rx="17" stroke="#1e3a5f" strokeWidth="1.5"/>
      <text x="22" y="32" textAnchor="middle" dominantBaseline="central"
        fontFamily="-apple-system,BlinkMacSystemFont,sans-serif" fontSize="30" fontWeight="900"
        fill={eFill} opacity={eOpacity}>E</text>
      <text x="40" y="32" textAnchor="middle" dominantBaseline="central"
        fontFamily="-apple-system,BlinkMacSystemFont,sans-serif" fontSize="30" fontWeight="900"
        fill={hFill} opacity={hOpacity}>H</text>
    </svg>
  )
}

/**
 * Hub Pin outline is fixed (shape + outer stroke) — only the inner ring and
 * center dot are configurable, so every variation reads as "the same pin."
 */
function HubPin({ ringStroke = '#93c5fd', ringStrokeOpacity = 1, ringFill = 'none', ringFillOpacity = 1, dotFill }: {
  ringStroke?: string
  ringStrokeOpacity?: number
  ringFill?: string
  ringFillOpacity?: number
  dotFill: string
}) {
  return (
    <svg width="32" height="40" viewBox="0 0 40 52" fill="none">
      <path d="M20 2C10.6 2 3 9.6 3 19C3 31.5 20 50 20 50C20 50 37 31.5 37 19C37 9.6 29.4 2 20 2Z"
        fill="#0f1f38" stroke="#93c5fd" strokeWidth="1.5"/>
      <circle cx="20" cy="19" r="9"
        stroke={ringStroke} strokeOpacity={ringStrokeOpacity} strokeWidth="1.5"
        fill={ringFill} fillOpacity={ringFillOpacity}/>
      <circle cx="20" cy="19" r="4" fill={dotFill}/>
    </svg>
  )
}

/** The liked W2 wordmark, kept identical everywhere it's used. */
function W2Wordmark() {
  return (
    <svg width="140" height="52" viewBox="0 0 140 52" fill="none">
      <text x="0" y="26" fontFamily="-apple-system,BlinkMacSystemFont,sans-serif"
        fontSize="20" fontWeight="800" fill="white">everyday</text>
      <rect x="0" y="32" width="40" height="1.5" rx="1" fill="#93c5fd" opacity="0.55"/>
      <text x="0" y="50" fontFamily="-apple-system,BlinkMacSystemFont,sans-serif"
        fontSize="12" fontWeight="400" fill="#93c5fd" letterSpacing="5">HUB</text>
    </svg>
  )
}
