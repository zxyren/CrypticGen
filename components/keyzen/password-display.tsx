'use client'

import {
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Copy,
  RotateCw,
} from 'lucide-react'
import { useState, useEffect } from 'react'

type Props = {
  password: string
  copied: boolean
  genKey: number
  onCopyAction: () => void
  onRegenerateAction: () => void
  onPrevAction: () => void
  onNextAction: () => void
  onOpenHistoryAction: () => void
  onPasswordChangeAction: (value: string) => void
  canPrev: boolean
  canNext: boolean
  position: number
  total: number
}

export function PasswordDisplay({
  password,
  copied,
  genKey,
  onCopyAction,
  onRegenerateAction,
  onPrevAction,
  onNextAction,
  onOpenHistoryAction,
  onPasswordChangeAction,
  canPrev,
  canNext,
  position,
  total,
}: Props) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <div className="w-full">
      {/* Toolbar */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-y-2">
        <div className="flex items-center gap-3">
          <span className="mb-1 uppercase tracking-wide text-muted-foreground">
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
            onClick={onPrevAction}
            disabled={!canPrev}
            aria-label="Previous password"
            className="flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-muted-foreground"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={onNextAction}
            disabled={!canNext}
            aria-label="Next password"
            className="flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-muted-foreground"
          >
            <ChevronRight size={18} />
          </button>

          <span className="mx-1 h-5 w-px bg-border" aria-hidden />

          <button
            type="button"
            onClick={onOpenHistoryAction}
            aria-label="Open history"
            className="flex h-9 items-center gap-2 rounded-md px-2.5 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
          >
            <Clock size={18} />
            <span className="hidden md:inline">History</span>
          </button>
          <button
            type="button"
            onClick={onRegenerateAction}
            aria-label="Regenerate password"
            className="flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
          >
            <RotateCw size={18} />
          </button>
          <button
            type="button"
            onClick={onCopyAction}
            aria-label="Copy password"
            className="flex h-9 items-center gap-2 rounded-md px-2.5 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
          >
            <span className="relative flex size-5 items-center justify-center">
              <Copy
                size={18}
                className={`absolute transition-all duration-200 ${copied ? 'scale-50 opacity-0' : 'scale-100 opacity-100'}`}
              />
              <Check
                size={18}
                className={`absolute text-accent transition-all duration-200 ${copied ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}
                strokeWidth={3}
              />
            </span>
            <span className="hidden sm:inline">
              {copied ? 'Copied' : 'Copy'}
            </span>
          </button>
        </div>
      </div>

      <div key={genKey} className="group/pw relative">
        <textarea
          value={password}
          onChange={(e) => onPasswordChangeAction(e.target.value)}
          rows={2}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          placeholder={mounted ? 'Type your password...' : 'Generating...'}
          className="w-full resize-none overflow-hidden bg-transparent pt-1 font-mono text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight text-foreground placeholder:text-muted-foreground/40 outline-none"
          onInput={(e) => {
            const el = e.currentTarget
            el.style.height = 'auto'
            el.style.height = `${el.scrollHeight}px`
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-border" />
        <div className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-foreground transition-transform duration-300 ease-in-out group-focus-within/pw:scale-x-100" />
      </div>
    </div>
  )
}