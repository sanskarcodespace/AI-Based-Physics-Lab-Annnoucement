"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Calendar,
    Terminal,
    Settings,
    AlertTriangle,
    BarChart3,
    ChevronLeft,
    ChevronRight,
    LayoutDashboard
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
    { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
    { icon: Calendar, label: "Schedule", href: "/dashboard/schedule" },
    { icon: Terminal, label: "Logs", href: "/dashboard/logs" },
    { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
    { icon: AlertTriangle, label: "Emergency", href: "/dashboard/emergency", variant: "danger" },
]

export const DashboardNav = () => {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const pathname = usePathname()

    return (
        <>
            {/* Desktop Sidebar */}
            <aside
                className={cn(
                    "hidden lg:flex flex-col glass border-r border-white/5 transition-all duration-500 relative z-50",
                    isCollapsed ? "w-20" : "w-64"
                )}
            >
                <div className="flex-1 py-8 px-4 space-y-2">
                    {navItems.map((item) => (
                        <NavItem
                            key={item.href}
                            {...item}
                            active={pathname === item.href}
                            collapsed={isCollapsed}
                        />
                    ))}
                </div>

                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="absolute -right-3 top-10 w-6 h-6 rounded-full bg-accent text-background flex items-center justify-center shadow-[0_0_10px_rgba(94,234,212,0.5)] scale-100 hover:scale-110 transition-transform"
                >
                    {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                </button>
            </aside>

            {/* Mobile Bottom Nav */}
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 glass border-t border-white/10 z-[100] px-4 flex items-center justify-around backdrop-blur-2xl">
                {navItems.slice(0, 5).map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "p-2 rounded-xl transition-all duration-300",
                            pathname === item.href ? "text-accent bg-accent/10" : "text-muted-foreground"
                        )}
                    >
                        <item.icon size={24} />
                    </Link>
                ))}
                <Link href="/dashboard/emergency" className="p-2 rounded-xl text-rose-500 bg-rose-500/10">
                    <AlertTriangle size={24} />
                </Link>
            </nav>
        </>
    )
}

function NavItem({ icon: Icon, label, href, active, collapsed, variant }: any) {
    return (
        <Link href={href}>
            <motion.div
                className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group",
                    active
                        ? "bg-accent/10 text-accent border border-accent/20"
                        : "text-muted-foreground hover:bg-white/5 hover:text-white",
                    variant === "danger" && !active && "text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
                )}
            >
                <Icon size={20} className={cn("shrink-0", active && "drop-shadow-[0_0_5px_rgba(94,234,212,0.5)]")} />
                {!collapsed && (
                    <span className="font-medium overflow-hidden whitespace-nowrap">{label}</span>
                )}
                {collapsed && (
                    <div className="absolute left-20 px-2 py-1 bg-accent text-background text-xs font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-[60]">
                        {label}
                    </div>
                )}
            </motion.div>
        </Link>
    )
}
