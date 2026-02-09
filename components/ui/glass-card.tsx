"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface GlassCardProps {
    children: React.ReactNode
    className?: string
    animate?: boolean
}

export const GlassCard = ({ children, className, animate = true }: GlassCardProps) => {
    return (
        <motion.div
            initial={animate ? { y: 0 } : false}
            animate={animate ? { y: [0, -10, 0] } : false}
            transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }}
            className={cn(
                "relative p-6 rounded-3xl glass-card group overflow-hidden",
                className
            )}
        >
            {/* Border Gradient Overlay */}
            <div className="absolute inset-0 p-[1px] rounded-3xl bg-gradient-to-br from-white/20 via-transparent to-white/10 pointer-events-none -z-10" />

            {/* Glow Effect on Hover */}
            <div className="absolute -inset-24 bg-accent/20 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    )
}
