'use client'

import { Check } from 'lucide-react'

type Props = {
  label: string
  checked: boolean
  onChangeAction: (checked: boolean) => void
  disabled?: boolean
}

export function OptionCheckbox({ label, checked, onChangeAction, disabled }: Props) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChangeAction(!checked)}
      className="group flex items-center gap-3 py-2 text-left transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
    >
      <span
        className={`flex size-6 shrink-0 items-center justify-center rounded-sm border transition-all duration-200 ${checked
          ? 'border-transparent bg-accent'
          : 'border-white/20 bg-transparent group-hover:border-white/40'
          }`}
      >
        <Check
          className={`size-4 text-white transition-all duration-200 ${checked ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
            }`}
          strokeWidth={3}
        />
      </span>
      <span
        className={`text-base tracking-tight transition-colors ${checked ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
          }`}
      >
        {label}
      </span>
    </button>
  )
}
