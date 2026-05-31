'use client'

import {
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Copy,
  RotateCw,
} from 'lucide-react'

type Props = {
  password: string
  copied: boolean
  onCopy: () => void
  onRegenerate: () => void
  onPrev: () => void
  onNext: () => void
  onOpenHistory: () => void
  onPasswordChange: (value: string) => void
  canPrev: boolean
  canNext: boolean
  position: number
  total: number
}

export function PasswordDisplay({
  password,
  copied,
  onCopy,
  onRegenerate,
  onPrev,
  onNext,
  onOpenHistory,
  onPasswordChange,
  canPrev,
  canNext,
  position,
  total,
}: Props) {
  return (
    <div className="w-full">
      {/* Toolbar */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-y-2">
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase tracking-wider text-muted-foreground">
            Your password
          </span>
          {total > 0 && (
            <span className="font-mono text-xs tabular-nums text-muted-foreground">
              {position}/{total}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onPrev}
            disabled={!canPrev}
            aria-label="Previous password"
            className="flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-muted-foreground"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={!canNext}
            aria-label="Next password"
            className="flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-muted-foreground"
          >
            <ChevronRight size={18} />
          </button>

          <span className="mx-1 h-5 w-px bg-border" aria-hidden />

          <button
            type="button"
            onClick={onOpenHistory}
            aria-label="Open history"
            className="flex h-9 items-center gap-2 rounded-md px-2.5 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
          >
            <Clock size={18} />
            <span className="hidden md:inline">History</span>
          </button>
          <button
            type="button"
            onClick={onRegenerate}
            aria-label="Regenerate password"
            className="flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
          >
            <RotateCw size={18} />
          </button>
          <button
            type="button"
            onClick={onCopy}
            aria-label="Copy password"
            className="flex h-9 items-center gap-2 rounded-md px-2.5 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
          >
            <span className="relative flex size-5 items-center justify-center">
              <Copy
                size={18}
                className={`absolute transition-all duration-200 ${copied ? 'scale-50 opacity-0' : 'scale-100 opacity-100'
                  }`}
              />
              <Check
                size={18}
                className={`absolute text-accent transition-all duration-200 ${copied ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
                  }`}
                strokeWidth={3}
              />
            </span>
            <span className="hidden sm:inline">
              {copied ? 'Copied' : 'Copy'}
            </span>
          </button>
        </div>
      </div>

      {/* Password textarea — border-bottom only, animated focus line */}
      <div className="group/field relative">
        <textarea
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          rows={1}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          placeholder="Select at least one option"
          className="animate-fade-up w-full resize-none overflow-hidden bg-transparent pb-2 pt-1 font-mono text-[clamp(1.5rem,7vw,4rem)] font-medium leading-[1.05] tracking-tight text-foreground placeholder:text-muted-foreground outline-none border-b border-border"
          onInput={(e) => {
            const el = e.currentTarget
            el.style.height = 'auto'
            el.style.height = `${el.scrollHeight}px`
          }}
        />
        {/* Animated active line: scales from left on focus */}
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-foreground transition-transform duration-500 ease-out group-focus-within/field:scale-x-100"
        />
      </div>
    </div>
  )
}