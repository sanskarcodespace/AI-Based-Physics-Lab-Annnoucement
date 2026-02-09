"use client"

import React from "react"
import { motion } from "framer-motion"
import { AnimatedLogo } from "@/components/animated-logo"
import { GlassCard } from "@/components/ui/glass-card"
import {
    BarChart3,
    Users,
    Settings,
    LogOut,
    Search,
    Bell,
    Menu,
    Brain,
    Zap,
    ShieldCheck
} from "lucide-react"

export default function AdminDashboard() {
    return (
        <div className="min-h-screen flex bg-transparent">
            {/* Sidebar */}
            <aside className="hidden lg:flex w-72 flex-col p-6 space-y-8 glass border-r border-white/5">
                <div className="flex items-center gap-3 px-2">
                    <AnimatedLogo className="scale-75" />
                    <span className="text-xl font-heading font-bold text-gradient">Admin Shell</span>
                </div>

                <nav className="flex-1 space-y-2">
                    <SidebarItem icon={<BarChart3 size={20} />} label="Analytics" active />
                    <SidebarItem icon={<Brain size={20} />} label="AI Experiments" />
                    <SidebarItem icon={<Users size={20} />} label="Researchers" />
                    <SidebarItem icon={<ShieldCheck size={20} />} label="Security" />
                    <SidebarItem icon={<Zap size={20} />} label="Workflows" />
                    <div className="pt-4 mt-4 border-t border-white/5 space-y-2">
                        <SidebarItem icon={<Settings size={20} />} label="Settings" />
                        <SidebarItem icon={<LogOut size={20} />} label="Sign Out" />
                    </div>
                </nav>

                <GlassCard className="bg-accent/10 border-accent/20" animate={false}>
                    <div className="text-xs font-heading font-bold text-accent mb-2 uppercase tracking-wider">Pro Plan</div>
                    <p className="text-xs text-muted-foreground mb-3 leading-relaxed">Unlock advanced simulations and physics models.</p>
                    <button className="text-xs font-bold text-white bg-accent px-3 py-1.5 rounded-lg hover:bg-accent/80 transition-colors">
                        Upgrade Now
                    </button>
                </GlassCard>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="h-20 flex items-center justify-between px-8 glass border-b border-white/5 sticky top-0 z-50">
                    <div className="flex items-center gap-4 flex-1">
                        <button className="lg:hidden p-2 text-muted-foreground">
                            <Menu size={20} />
                        </button>
                        <div className="relative max-w-md w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search research data..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 outline-none focus:border-accent/50 focus:ring-4 focus:ring-accent/10 transition-all text-sm"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="relative p-2 text-muted-foreground hover:text-white transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full border-2 border-background" />
                        </button>
                        <div className="flex items-center gap-3 pl-6 border-l border-white/10">
                            <div className="text-right hidden sm:block">
                                <div className="text-sm font-bold text-foreground">Dr. Aris</div>
                                <div className="text-xs text-muted-foreground">Lead Researcher</div>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-accent to-violet p-[2px]">
                                <div className="w-full h-full rounded-[10px] bg-background flex items-center justify-center font-bold text-accent">
                                    DA
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Grid */}
                <div className="p-8 space-y-8 overflow-y-auto">
                    <header>
                        <h1 className="text-3xl font-heading font-bold text-gradient">Analytics Overview</h1>
                        <p className="text-muted-foreground">Real-time simulation metrics and research status.</p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard label="Total Experiments" value="1,284" change="+12.5%" />
                        <StatCard label="Success Rate" value="98.2%" change="+0.4%" />
                        <StatCard label="Compute Load" value="64%" change="-2.1%" />
                        <StatCard label="Active Users" value="42" change="+3" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <GlassCard className="lg:col-span-2 min-h-[400px]" animate={false}>
                            <h3 className="text-xl font-heading font-bold mb-6">Simulation Velocity</h3>
                            <div className="h-64 flex items-end gap-2 px-4">
                                {[40, 70, 45, 90, 65, 80, 50, 95, 75, 60, 85, 55].map((h, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ height: 0 }}
                                        animate={{ height: `${h}%` }}
                                        transition={{ delay: i * 0.05, duration: 0.8 }}
                                        className="flex-1 bg-accent/20 border border-accent/30 rounded-t-lg"
                                    />
                                ))}
                            </div>
                        </GlassCard>

                        <GlassCard className="min-h-[400px]" animate={false}>
                            <h3 className="text-xl font-heading font-bold mb-6">Recent Activities</h3>
                            <div className="space-y-6">
                                <ActivityItem title="Physics Model Updated" time="2 hours ago" type="update" />
                                <ActivityItem title="New Simulation Group" time="5 hours ago" type="new" />
                                <ActivityItem title="Compute Threshold Met" time="1 day ago" type="alert" />
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </main>
        </div>
    )
}

function SidebarItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
    return (
        <button className={`
      w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300
      ${active
                ? "bg-accent/10 text-accent border border-accent/20"
                : "text-muted-foreground hover:bg-white/5 hover:text-white"}
    `}>
            {icon}
            <span>{label}</span>
        </button>
    )
}

function StatCard({ label, value, change }: { label: string, value: string, change: string }) {
    const isPositive = change.startsWith("+")
    return (
        <GlassCard animate={false} className="p-5">
            <div className="text-sm font-medium text-muted-foreground mb-2">{label}</div>
            <div className="flex items-end justify-between">
                <div className="text-2xl font-bold font-heading">{value}</div>
                <div className={`text-xs font-bold px-1.5 py-0.5 rounded ${isPositive ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"}`}>
                    {change}
                </div>
            </div>
        </GlassCard>
    )
}

function ActivityItem({ title, time, type }: { title: string, time: string, type: string }) {
    return (
        <div className="flex gap-4">
            <div className={`w-2 h-12 rounded-full ${type === "update" ? "bg-accent" : type === "new" ? "bg-violet" : "bg-rose-500"
                }`} />
            <div className="flex flex-col justify-center">
                <div className="text-sm font-bold text-foreground">{title}</div>
                <div className="text-xs text-muted-foreground">{time}</div>
            </div>
        </div>
    )
}
