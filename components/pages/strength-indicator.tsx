'use client'

import type { Strength } from '@/lib/password'

const STRENGTH_COLORS: Record<number, string> = {
  0: 'bg-red-500',      // NONE  (score 0)
  1: 'bg-red-500',      // WEAK  (score 1)
  2: 'bg-orange-400',   // FAIR  (score 2)
  3: 'bg-blue-400',     // STRONG (score 3)
  4: 'bg-emerald-400',  // VERY STRONG (score 4)
}

export function StrengthIndicator({ strength }: { strength: Strength }) {
  const activeColor = STRENGTH_COLORS[strength.score] ?? 'bg-accent'

  const progress = `${(Math.max(0, Math.min(4, strength.score)) / 4) * 100}%`

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm whitespace-nowrap font-bold tracking-tight text-foreground sm:text-lg md:text-xl">
        {strength.label}
      </span>
      <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full rounded-full transition-all duration-300 ${activeColor}`}
          style={{ width: progress }}
        />
      </div>
    </div>
  )
}
