"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline"
    glowColor?: string
}

export const NeonButton = React.forwardRef<HTMLButtonElement, NeonButtonProps>(
    ({ className, variant = "primary", glowColor = "#5EEAD4", children, ...props }, ref) => {
        return (
            <motion.button
                ref={ref}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ y: 0, scale: 0.98 }}
                className={cn(
                    "relative px-6 py-3 rounded-xl font-bold transition-all duration-300 overflow-hidden group outline-none min-h-[44px] min-w-[44px]",
                    variant === "primary" && "bg-accent text-background shadow-[0_0_20px_rgba(94,234,212,0.3)] hover:shadow-[0_0_30px_rgba(94,234,212,0.6)]",
                    variant === "outline" && "bg-transparent border-2 border-accent text-accent hover:bg-accent/10 shadow-[inner_0_0_10px_rgba(94,234,212,0.2)]",
                    variant === "secondary" && "bg-violet text-background shadow-[0_0_20px_rgba(167,139,250,0.3)] hover:shadow-[0_0_30px_rgba(167,139,250,0.6)]",
                    className
                )}
                {...(props as any)}
            >
                <span className="relative z-10 flex items-center justify-center gap-2">
                    {children}
                </span>

                {/* Glow Overlay */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                    style={{ backgroundColor: glowColor }}
                />

                {/* Subtle Shine Effect */}
                <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] group-hover:left-[150%] transition-all duration-700 ease-in-out" />
            </motion.button>
        )
    }
)

NeonButton.displayName = "NeonButton"
