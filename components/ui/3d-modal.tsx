"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    title?: string
    children: React.ReactNode
    className?: string
}

export const PremiumModal = ({ isOpen, onClose, title, children, className }: ModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop with Blur */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-background/60 backdrop-blur-md"
                    />

                    {/* Modal Content with 3D Scale-in */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotateX: -10, y: 20 }}
                        animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, rotateX: 10, y: 20 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                        className={cn(
                            "relative w-full max-w-lg glass-card rounded-3xl p-8 border border-white/20 shadow-2xl z-10",
                            "perspective-1000",
                            className
                        )}
                    >
                        <div className="flex items-center justify-between mb-6">
                            {title && <h2 className="text-2xl font-heading font-bold text-gradient">{title}</h2>}
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-white/10 transition-colors text-muted-foreground hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {children}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
