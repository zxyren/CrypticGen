import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "group/button inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all duration-200 outline-none select-none cursor-pointer disabled:pointer-events-none disabled:opacity-40 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20",
    {
        variants: {
            variant: {
                default:
                    "bg-foreground text-background hover:bg-foreground/80",
                outline:
                    "border-border bg-transparent text-muted-foreground hover:bg-white/5 hover:text-foreground",
                ghost:
                    "text-muted-foreground hover:bg-white/5 hover:text-foreground",
                accent:
                    "bg-accent text-white hover:bg-accent/80",
                danger:
                    "text-muted-foreground hover:bg-red-500/10 hover:text-red-400",
                link:
                    "text-accent underline-offset-4 hover:underline",
            },
            size: {
                default: "h-8 px-3",
                xs: "h-6 px-2 text-xs rounded-md ",
                sm: "h-7 px-2.5 text-[0.8rem] rounded-md",
                lg: "h-10 px-4 text-base",
                icon: "size-8",
                "icon-xs": "size-6 rounded-md",
                "icon-sm": "size-7 rounded-md",
                "icon-lg": "size-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

function Button({
    className,
    variant = "default",
    size = "default",
    asChild = false,
    title,
    'aria-label': ariaLabel,
    ...props
}: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean
    }) {
    const Comp = asChild ? Slot.Root : "button"
    const tooltip = title ?? ariaLabel

    const compProps = {
        'data-slot': 'button',
        'data-variant': variant,
        'data-size': size,
        'data-tooltip': tooltip ?? '',
        'aria-label': ariaLabel ?? title,
        className: cn(buttonVariants({ variant, size, className })),
        ...props,
    }

    if (tooltip) {
        return (
            <Tooltip>
                <TooltipTrigger asChild>
                    <Comp {...compProps} />
                </TooltipTrigger>
                <TooltipContent sideOffset={0}>{tooltip}</TooltipContent>
            </Tooltip>
        )
    }

    return <Comp {...compProps} />
}

export { Button, buttonVariants }