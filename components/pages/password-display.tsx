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
import { Button } from '../ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

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
            <span className="font-mono tabular-nums text-muted-foreground">
              {position}/{total}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon-lg" onClick={onPrevAction} disabled={!canPrev} className="group">
            <ChevronLeft size={18} className='group-active:-translate-x-0.5 transition-all duration-200' />
          </Button>
          <Button variant="ghost" size="icon-lg" onClick={onNextAction} disabled={!canNext} className="group">
            <ChevronRight size={18} className='group-active:translate-x-0.5 transition-all duration-200' />
          </Button>

          <span className="mx-1 h-5 w-px bg-border" aria-hidden />

          <Button variant="ghost" size="lg" onClick={onOpenHistoryAction} className="group">
            <Clock size={18} className="group-hover:-rotate-360 transition-all duration-300" />
            <span className="hidden md:inline group-hover:text-accent">History</span>
          </Button>
          <Button variant="ghost" size="icon-lg" onClick={onRegenerateAction} className="group">
            <RotateCw size={18} className="transition-all duration-300 group-active:rotate-90" />
          </Button>
          <Button variant="ghost" size="lg" onClick={onCopyAction} aria-label="Copy password">
            <span className="relative flex size-4 items-center justify-center">
              <Copy size={18} className={`absolute transition-all duration-300 ${copied ? 'scale-0' : 'scale-100'}`} />
              <Check size={18} className={`absolute text-accent transition-all duration-300 ${copied ? 'scale-100' : 'scale-0'}`} />
            </span>
            <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
          </Button>
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
          className="w-full resize-none overflow-hidden bg-transparent pt-1 font-mono text-2xl md:text-3xl lg:text-5xl font-medium leading-[1.1] tracking-tight text-foreground placeholder:text-muted-foreground/40 outline-none"
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