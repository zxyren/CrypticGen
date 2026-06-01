'use client'

import { useCallback, useEffect, useState } from 'react'
import { Check, Copy, Trash2, X } from 'lucide-react'
import { Button } from '../ui/button'

export type HistoryEntry = { id: number; password: string }

type Props = {
  open: boolean
  onCloseAction: () => void
  history: HistoryEntry[]
  currentId: number | null
  onSelectAction: (id: number) => void
  onClearAction: () => void
}

export function HistoryModal({ open, onCloseAction, history, currentId, onSelectAction, onClearAction }: Props) {
  const [copiedId, setCopiedId] = useState<number | null>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onCloseAction() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onCloseAction])

  const handleCopy = useCallback(async (entry: HistoryEntry) => {
    try {
      await navigator.clipboard.writeText(entry.password)
      setCopiedId(entry.id)
      window.setTimeout(() => setCopiedId(null), 1400)
    } catch { }
  }, [])

  if (!open) return null

  const ordered = [...history].reverse()

  return (
    <div role="dialog" aria-modal="true" aria-label="Password history" className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <button type="button" aria-label="Close" onClick={onCloseAction} className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm" />

      <div className="animate-fade-up relative z-10 flex w-full flex-col overflow-hidden rounded-t-2xl border border-border bg-surface sm:max-w-lg sm:rounded-2xl" style={{ maxHeight: '85dvh' }}>
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-border px-4 py-3 sm:px-6">
          <div className="flex items-center text-lg gap-2">
            <span className="font-semibold text-foreground">History</span>
            <span className="font-mono text-sm text-muted-foreground">{history.length}</span>
          </div>
          <div className="flex items-center gap-1">
            {history.length > 0 && (
              <Button variant="danger" size="icon-lg" onClick={onClearAction} title="Clear history">
                <Trash2 size={16} />
              </Button>
            )}
            <Button variant="ghost" size="icon-lg" onClick={onCloseAction} title="Close">
              <X size={16} />
            </Button>
          </div>
        </div>

        {/* List */}
        {ordered.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-1 py-16 text-center">
            <p className="text-sm text-muted-foreground">No passwords yet.</p>
            <p className="text-xs text-muted-foreground/60">Generated passwords will appear here.</p>
          </div>
        ) : (
          <ul className="flex-1 divide-y divide-border overflow-y-auto [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb:hover]:bg-white/20">
            {ordered.map((entry) => {
              const isCurrent = entry.id === currentId
              const isCopied = entry.id === copiedId
              return (
                <li key={entry.id} className={`flex items-center gap-2 px-4 py-3 transition-colors sm:px-6 ${isCurrent ? 'bg-accent/10' : 'hover:bg-white/5'}`}>
                  <button
                    type="button"
                    onClick={() => { onSelectAction(entry.id); onCloseAction() }}
                    className="flex min-w-0 flex-1 items-center gap-2.5 text-left outline-none"
                  >
                    <span className={`truncate font-mono text-sm ${isCurrent ? 'text-accent' : 'text-foreground'}`}>
                      {entry.password}
                    </span>
                  </button>
                  <Button variant="ghost" size="icon-lg" onClick={() => handleCopy(entry)}>
                    <span className="relative flex size-4 items-center justify-center">
                      <Copy size={14} className={`absolute transition-all duration-300 ${isCopied ? 'scale-0' : 'scale-100'}`} />
                      <Check size={14} className={`absolute text-accent transition-all duration-300 ${isCopied ? 'scale-100' : 'scale-0'}`} strokeWidth={3} />
                    </span>
                  </Button>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}