'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import {
  generatePassword,
  getStrength,
  type CharOptions,
} from '@/lib/password'
import { PasswordDisplay } from './password-display'
import { StrengthIndicator } from './strength-indicator'
import { OptionCheckbox } from './option-checkbox'
import { HistoryModal, type HistoryEntry } from './history-modal'

const MIN_LENGTH = 8
const MAX_LENGTH = 64

const OPTION_LABELS: { key: keyof CharOptions; label: string }[] = [
  { key: 'uppercase', label: 'Uppercase' },
  { key: 'lowercase', label: 'Lowercase' },
  { key: 'numbers', label: 'Numbers' },
  { key: 'symbols', label: 'Symbols' },
]

export function Generator() {
  const [length, setLength] = useState(20)
  const [options, setOptions] = useState<CharOptions>({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  })
  const [history, setHistory] = useState<HistoryEntry[]>(() => {
    const pw = generatePassword(20, {
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: true,
    })
    return pw ? [{ id: 0, password: pw }] : []
  })
  const [index, setIndex] = useState(0)
  const [copied, setCopied] = useState(false)
  const [historyOpen, setHistoryOpen] = useState(false)
  const [genKey, setGenKey] = useState(0)

  const indexRef = useRef(0)
  const idRef = useRef(1)
  const isEditingRef = useRef(false)

  useEffect(() => {
    indexRef.current = index
  }, [index])

  const activeCount = useMemo(
    () => Object.values(options).filter(Boolean).length,
    [options],
  )

  const password = history[index]?.password ?? ''
  const currentId = history[index]?.id ?? null

  const generate = useCallback(
    (mode: 'auto' | 'commit') => {
      if (mode === 'auto' && isEditingRef.current) return

      const pw = generatePassword(length, options)
      if (!pw) return

      if (mode === 'commit') isEditingRef.current = false

      setGenKey((k) => k + 1)

      setHistory((prev) => {
        const atLatest =
          prev.length > 0 && indexRef.current === prev.length - 1
        if (mode === 'auto' && atLatest) {
          const next = [...prev]
          next[next.length - 1] = { ...next[next.length - 1], password: pw }
          return next
        }
        return [...prev, { id: idRef.current++, password: pw }]
      })
    },
    [length, options],
  )

  useEffect(() => {
    generate('auto')
  }, [generate])

  useEffect(() => {
    setIndex(history.length > 0 ? history.length - 1 : 0)
  }, [history.length])

  const handlePasswordChange = useCallback((value: string) => {
    isEditingRef.current = true
    setHistory((prev) => {
      if (prev.length === 0) return prev
      const next = [...prev]
      next[indexRef.current] = { ...next[indexRef.current], password: value }
      return next
    })
  }, [])

  const handleCopy = useCallback(async () => {
    if (!password) return
    try {
      await navigator.clipboard.writeText(password)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch { }
  }, [password])

  const goPrev = useCallback(() => {
    setIndex((i) => Math.max(0, i - 1))
  }, [])

  const goNext = useCallback(() => {
    setIndex((i) => Math.min(history.length - 1, i + 1))
  }, [history.length])

  const selectEntry = useCallback(
    (id: number) => {
      const i = history.findIndex((e) => e.id === id)
      if (i !== -1) setIndex(i)
    },
    [history],
  )

  const toggleOption = (key: keyof CharOptions, value: boolean) => {
    if (!value && activeCount === 1) return
    isEditingRef.current = false
    setOptions((prev) => ({ ...prev, [key]: value }))
  }

  const commit = useCallback(() => generate('commit'), [generate])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (historyOpen) return
      const target = e.target as HTMLElement
      const isTyping =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      if (isTyping) return
      if (e.code === 'Space') {
        e.preventDefault()
        commit()
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'c') {
        if (!window.getSelection()?.toString()) handleCopy()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [commit, handleCopy, historyOpen])

  const strength = useMemo(() => getStrength(length, options), [length, options])
  const progress = ((length - MIN_LENGTH) / (MAX_LENGTH - MIN_LENGTH)) * 100

  return (
    <div className="flex flex-col gap-14 sm:gap-16 lg:gap-20">
      <section className="flex flex-col gap-8">
        <PasswordDisplay
          password={password}
          copied={copied}
          genKey={genKey}
          onCopyAction={handleCopy}
          onRegenerateAction={commit}
          onPrevAction={goPrev}
          onNextAction={goNext}
          onOpenHistoryAction={() => setHistoryOpen(true)}
          onPasswordChangeAction={handlePasswordChange}
          canPrev={index > 0}
          canNext={index < history.length - 1}
          position={history.length === 0 ? 0 : index + 1}
          total={history.length}
        />
        <StrengthIndicator strength={strength} />
      </section>

      <section className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
        <div className="flex flex-col gap-6">
          <div className="flex items-end justify-between">
            <span className="uppercase tracking-wide text-muted-foreground">
              Length
            </span>
            <span className="font-mono text-2xl font-medium tabular-nums text-foreground">
              {length}
            </span>
          </div>
          <input
            type="range"
            min={MIN_LENGTH}
            max={MAX_LENGTH}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="keyzen-slider"
            style={{ ['--range-progress' as string]: `${progress}%` }}
            aria-label="Password length"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{MIN_LENGTH}</span>
            <span>{MAX_LENGTH}</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="mb-1 uppercase tracking-wide text-muted-foreground">
            Characters
          </span>
          <div className="grid grid-cols-2 gap-x-6">
            {OPTION_LABELS.map(({ key, label }) => (
              <OptionCheckbox
                key={key}
                label={label}
                checked={options[key]}
                onChangeAction={(v) => toggleOption(key, v)}
              />
            ))}
          </div>
        </div>
      </section>

      <button
        type="button"
        onClick={commit}
        className="group flex w-full cursor-pointer items-center justify-between gap-4 rounded-2xl bg-foreground px-6 py-6 text-left text-background transition-all duration-300 hover:bg-accent hover:text-white sm:px-10 sm:py-8"
      >
        <span className="text-xl font-extrabold tracking-tight sm:text-3xl md:text-4xl">
          GENERATE PASSWORD
        </span>
        <ArrowRight className="size-6 shrink-0 transition-transform duration-300 group-hover:translate-x-2 sm:size-8" />
      </button>

      <HistoryModal
        open={historyOpen}
        onCloseAction={() => setHistoryOpen(false)}
        history={history}
        currentId={currentId}
        onSelectAction={selectEntry}
      />
    </div>
  )
}