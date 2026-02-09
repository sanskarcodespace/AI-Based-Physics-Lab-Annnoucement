"use client"

import React from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { motion } from "framer-motion"
import {
    Activity,
    Cpu,
    FlaskConical,
    ShieldCheck,
    ArrowUpRight,
    Zap
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function DashboardPage() {
    return (
        <div className="space-y-10">
            <header className="space-y-2">
                <h2 className="text-3xl font-heading font-bold text-gradient">Lab Overview</h2>
                <p className="text-muted-foreground font-sans">Active simulations and system telemetry.</p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                    icon={Activity}
                    label="Simulation Load"
                    value="84.2%"
                    trend="+5.4%"
                    color="accent"
                />
                <MetricCard
                    icon={Cpu}
                    label="Compute Usage"
                    value="12.4 TF"
                    trend="-2.1%"
                    color="violet"
                />
                <MetricCard
                    icon={FlaskConical}
                    label="Active Experiments"
                    value="14"
                    trend="0"
                    color="accent"
                />
                <MetricCard
                    icon={ShieldCheck}
                    label="Lab Stability"
                    value="99.9%"
                    trend="+0.1%"
                    color="accent"
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <GlassCard className="lg:col-span-2 min-h-[400px]">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-heading font-bold flex items-center gap-2">
                            <Zap className="text-accent" size={20} /> Real-time Waveform
                        </h3>
                        <div className="flex gap-2">
                            <div className="px-3 py-1 bg-accent/10 border border-accent/20 rounded-lg text-xs font-bold text-accent">LIVE</div>
                        </div>
                    </div>

                    <div className="h-64 flex items-end gap-1.5 px-4 overflow-hidden">
                        {Array.from({ length: 40 }).map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${Math.random() * 60 + 20}%` }}
                                transition={{
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    duration: 0.5 + Math.random() * 1,
                                    ease: "easeInOut"
                                }}
                                className="flex-1 bg-gradient-to-t from-accent/40 to-accent/10 rounded-t-sm"
                            />
                        ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/5 grid grid-cols-3 gap-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold font-mono">1.24s</div>
                            <div className="text-[10px] uppercase text-muted-foreground tracking-wider">Latency</div>
                        </div>
                        <div className="text-center border-x border-white/5">
                            <div className="text-2xl font-bold font-mono">248</div>
                            <div className="text-[10px] uppercase text-muted-foreground tracking-wider">Nodes</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold font-mono">4.1k</div>
                            <div className="text-[10px] uppercase text-muted-foreground tracking-wider">Packets</div>
                        </div>
                    </div>
                </GlassCard>

                <div className="space-y-8">
                    <GlassCard className="p-0 overflow-hidden bg-violet/5 border-violet/20">
                        <div className="p-6 border-b border-violet/20 bg-violet/10">
                            <h3 className="font-heading font-bold flex items-center gap-2">
                                <ShieldCheck size={18} className="text-violet" /> Security Protocol
                            </h3>
                        </div>
                        <div className="p-6 space-y-4">
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Lab is currently under Level 2 security protocols. All data encryption is active.
                            </p>
                            <button className="w-full py-2 rounded-xl bg-violet/20 border border-violet/30 text-xs font-bold hover:bg-violet/30 transition-all">
                                Audit Logs
                            </button>
                        </div>
                    </GlassCard>

                    <GlassCard className="bg-white/5">
                        <h3 className="font-heading font-bold mb-6">Recent Reports</h3>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center justify-between group cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-accent" />
                                        <span className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">Lab_Report_v{i}.2</span>
                                    </div>
                                    <ArrowUpRight size={14} className="text-muted-foreground" />
                                </div>
                            ))}
                        </div>
                    </GlassCard>
                </div>
            </div>
        </div>
    )
}

function MetricCard({ icon: Icon, label, value, trend, color }: any) {
    const isPositive = trend.startsWith("+")
    const isNeutral = trend === "0"

    return (
        <GlassCard className="p-5" animate={false}>
            <div className="flex items-start justify-between mb-4">
                <div className={cn(
                    "p-2 rounded-lg border",
                    color === "accent" ? "bg-accent/10 border-accent/20 text-accent" : "bg-violet/10 border-violet/20 text-violet"
                )}>
                    <Icon size={20} />
                </div>
                {!isNeutral && (
                    <div className={cn(
                        "text-[10px] font-bold px-2 py-0.5 rounded-full",
                        isPositive ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
                    )}>
                        {trend}
                    </div>
                )}
            </div>
            <div className="space-y-1">
                <div className="text-2xl font-bold font-mono tracking-tight">{value}</div>
                <div className="text-xs text-muted-foreground font-sans uppercase tracking-wider">{label}</div>
            </div>
        </GlassCard>
    )
}
