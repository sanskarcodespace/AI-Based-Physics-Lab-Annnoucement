"use client"

import React, { useState } from "react"
import { NeonButton } from "@/components/ui/neon-button"
import { GlassCard } from "@/components/ui/glass-card"
import { TranslucentInput } from "@/components/ui/translucent-input"
import { PremiumModal } from "@/components/ui/3d-modal"
import { toast } from "sonner"
import { Sparkles, Send, Bell, Layers, MousePointer2 } from "lucide-react"

export default function DesignSystemPage() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <div className="container max-w-6xl py-24 space-y-24">
            {/* Header */}
            <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-heading font-bold text-gradient">Design System</h1>
                <p className="text-xl text-muted-foreground font-sans">Premium UI components built for speed and aesthetics.</p>
            </div>

            {/* Buttons */}
            <section className="space-y-8">
                <h2 className="text-2xl font-heading font-bold flex items-center gap-2">
                    <MousePointer2 className="text-accent" /> Buttons
                </h2>
                <div className="flex flex-wrap gap-6">
                    <NeonButton onClick={() => toast.success("Primary glow activated!")}>
                        Primary Neon
                    </NeonButton>
                    <NeonButton variant="secondary" onClick={() => toast.info("Secondary pulse!")}>
                        Secondary Glow
                    </NeonButton>
                    <NeonButton variant="outline">
                        Neon Outline
                    </NeonButton>
                    <NeonButton className="rounded-full px-8">
                        Rounded Neon
                    </NeonButton>
                </div>
            </section>

            {/* Cards */}
            <section className="space-y-8">
                <h2 className="text-2xl font-heading font-bold flex items-center gap-2">
                    <Layers className="text-accent" /> Glassmorphism Cards
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <GlassCard>
                        <div className="space-y-4">
                            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center border border-accent/30">
                                <Sparkles className="text-accent" />
                            </div>
                            <h3 className="text-xl font-heading font-bold">Floating Card</h3>
                            <p className="text-muted-foreground text-sm font-sans">
                                Subtle floating animation with premium glassmorphism effects.
                            </p>
                        </div>
                    </GlassCard>

                    <GlassCard className="border-violet/30">
                        <div className="space-y-4">
                            <div className="w-12 h-12 rounded-xl bg-violet/20 flex items-center justify-center border border-violet/30">
                                <Send className="text-violet" />
                            </div>
                            <h3 className="text-xl font-heading font-bold">Gradient Border</h3>
                            <p className="text-muted-foreground text-sm font-sans">
                                Dynamic borders that respond to hover states.
                            </p>
                        </div>
                    </GlassCard>

                    <GlassCard animate={false}>
                        <div className="space-y-4">
                            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                                <Bell className="text-white" />
                            </div>
                            <h3 className="text-xl font-heading font-bold">Static Glass</h3>
                            <p className="text-muted-foreground text-sm font-sans">
                                High-contrast glassmorphism without the motion.
                            </p>
                        </div>
                    </GlassCard>
                </div>
            </section>

            {/* Inputs */}
            <section className="space-y-8">
                <h2 className="text-2xl font-heading font-bold flex items-center gap-2">
                    Inputs
                </h2>
                <div className="max-w-md space-y-6">
                    <TranslucentInput
                        label="Email Address"
                        placeholder="Enter your email"
                    />
                    <TranslucentInput
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        error="This field is required"
                    />
                </div>
            </section>

            {/* Modals & Toasts */}
            <section className="space-y-8">
                <h2 className="text-2xl font-heading font-bold">Modals & Toasts</h2>
                <div className="flex gap-6">
                    <NeonButton onClick={() => setIsModalOpen(true)}>
                        Open 3D Modal
                    </NeonButton>
                    <NeonButton variant="outline" onClick={() => toast.success("Settings saved successfully!")}>
                        Show Success Toast
                    </NeonButton>
                    <NeonButton variant="outline" onClick={() => toast.error("Connection failed. Retrying...")}>
                        Show Error Toast
                    </NeonButton>
                </div>
            </section>

            {/* Modal Integration */}
            <PremiumModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Premium Component"
            >
                <p className="text-muted-foreground font-sans leading-relaxed">
                    This is a custom built modal with backdrop blur and a 3D scale-in animation.
                    It uses Framer Motion for high-performance physics-based motion.
                </p>
                <div className="flex justify-end gap-3 pt-4">
                    <NeonButton variant="outline" onClick={() => setIsModalOpen(false)}>
                        Close
                    </NeonButton>
                    <NeonButton onClick={() => {
                        toast.success("Action confirmed!")
                        setIsModalOpen(false)
                    }}>
                        Confirm
                    </NeonButton>
                </div>
            </PremiumModal>
        </div>
    )
}
