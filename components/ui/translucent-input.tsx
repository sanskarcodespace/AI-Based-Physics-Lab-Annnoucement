"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface TranslucentInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
}

export const TranslucentInput = React.forwardRef<HTMLInputElement, TranslucentInputProps>(
    ({ className, label, error, ...props }, ref) => {
        return (
            <div className="w-full space-y-2 group">
                {label && (
                    <label className="text-sm font-medium text-muted-foreground group-focus-within:text-accent transition-colors">
                        {label}
                    </label>
                )}
                <div className="relative">
                    <input
                        ref={ref}
                        className={cn(
                            "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none transition-all duration-300",
                            "focus:bg-white/10 focus:border-accent/50 focus:ring-4 focus:ring-accent/10 focus:shadow-[0_0_20px_rgba(94,234,212,0.1)]",
                            "placeholder:text-muted-foreground/50 text-foreground",
                            error && "border-destructive/50 focus:border-destructive/50 focus:ring-destructive/10",
                            className
                        )}
                        {...props}
                    />

                    {/* Subtle Glow Overlay */}
                    <div className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 shadow-[inset_0_0_15px_rgba(94,234,212,0.05)]" />
                </div>
                {error && (
                    <p className="text-xs text-destructive font-medium animate-in fade-in slide-in-from-top-1">
                        {error}
                    </p>
                )}
            </div>
        )
    }
)

TranslucentInput.displayName = "TranslucentInput"
