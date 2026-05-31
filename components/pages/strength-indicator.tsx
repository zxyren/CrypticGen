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

  return (
    <div className="flex items-center gap-4">
      <span className="text-md font-bold tracking-tight text-foreground sm:text-xl md:text-2xl">
        {strength.label}
      </span>
      <div className="flex flex-1 items-center gap-1.5">
        {[1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength.score ? activeColor : 'bg-white/10'
              }`}
          />
        ))}
      </div>
    </div>
  )
}
