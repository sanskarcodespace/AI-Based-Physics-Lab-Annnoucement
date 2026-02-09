"use client"

import React from "react"
import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/glass-card"
import { TranslucentInput } from "@/components/ui/translucent-input"
import { NeonButton } from "@/components/ui/neon-button"
import { AnimatedLogo } from "@/components/animated-logo"
import { toast } from "sonner"
import Link from "next/link"

export default function LoginPage() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        toast.info("Backend authentication not implemented yet.")
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
            {/* Floating Hero Text Background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none">
                <h1 className="text-[20vw] font-black font-heading rotate-12 leading-none">
                    ADVANCED<br />LABS
                </h1>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-md z-10"
            >
                <div className="flex flex-col items-center mb-10 space-y-4">
                    <AnimatedLogo className="scale-125" />
                    <div className="text-center space-y-2">
                        <h2 className="text-3xl font-heading font-bold text-gradient">Welcome Back</h2>
                        <p className="text-muted-foreground font-sans">Secure login to your research dashboard</p>
                    </div>
                </div>

                <GlassCard className="p-8 border-white/10 shadow-2xl perspective-1000 rotate-x-1" animate={false}>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <TranslucentInput
                            label="Email Address"
                            type="email"
                            placeholder="name@example.com"
                            required
                            autoFocus
                        />
                        <div className="space-y-1">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-muted-foreground">Password</label>
                                <Link href="#" className="text-xs text-accent hover:underline">Forgot password?</Link>
                            </div>
                            <TranslucentInput
                                type="password"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="remember"
                                className="w-4 h-4 rounded border-white/10 bg-white/5 text-accent focus:ring-accent/20"
                            />
                            <label htmlFor="remember" className="text-sm text-muted-foreground select-none">
                                Remember for 30 days
                            </label>
                        </div>

                        <NeonButton type="submit" className="w-full py-4 text-lg">
                            Sign In
                        </NeonButton>
                    </form>

                    <div className="mt-8 pt-8 border-t border-white/5 text-center space-y-4">
                        <p className="text-sm text-muted-foreground">
                            Don't have an account?{" "}
                            <Link href="#" className="text-accent font-bold hover:underline">Get Started</Link>
                        </p>
                    </div>
                </GlassCard>
            </motion.div>
        </div>
    )
}
