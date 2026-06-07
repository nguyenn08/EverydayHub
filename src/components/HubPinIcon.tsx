export default function HubPinIcon({ active, size = 22 }: { active: boolean; size?: number }) {
  const color = active ? '#93c5fd' : '#2d4a6e'
  return (
    <svg width={size} height={size} viewBox="0 0 40 52" fill="none">
      <path
        d="M20 2C10.6 2 3 9.6 3 19C3 31.5 20 50 20 50C20 50 37 31.5 37 19C37 9.6 29.4 2 20 2Z"
        fill="none"
        stroke={color}
        strokeWidth={active ? 3 : 2.2}
      />
      <circle cx="20" cy="19" r="6" fill={color} />
    </svg>
  )
}
