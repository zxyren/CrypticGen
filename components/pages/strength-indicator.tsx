'use client'

import type { Strength } from '@/lib/password'

const STRENGTH_COLORS: Record<number, string> = {
  0: 'bg-red-500',      // NONE  (score 0)
  1: 'bg-red-500',      // WEAK  (score 1)
  2: 'bg-orange-400',   // FAIR  (score 2)
  3: 'bg-blue-400',     // STRONG (score 3)
  4: 'bg-emerald-400',  // VERY STRONG (score 4)
}

const STRENGTH_SHADOWS: Record<number, string> = {
  0: 'rgba(239,68,68,1)',   // red-500
  1: 'rgba(239,68,68,1)',   // red-500
  2: 'rgba(251,146,60,1)',  // orange-400
  3: 'rgba(96,165,250,1)',  // blue-400
  4: 'rgba(52,211,153,1)',  // emerald-400
}

export function StrengthIndicator({ strength }: { strength: Strength }) {
  const activeColor = STRENGTH_COLORS[strength.score] ?? 'bg-accent'

  const activeShadow = STRENGTH_SHADOWS[strength.score] ?? 'rgba(0,0,0,0.18)'

  const progress = `${(Math.max(0, Math.min(4, strength.score)) / 4) * 100}%`

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm whitespace-nowrap font-bold tracking-tight text-foreground sm:text-lg md:text-xl">
        {strength.label}
      </span>
      <div className="h-1 w-full rounded-full bg-white/10">
        <div
          className={`h-full rounded-full transition-all duration-300 ${activeColor}`}
          style={{ width: progress, boxShadow: `0 0px 15px ${activeShadow}` }}
        />
      </div>
    </div>
  )
}
