"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Shield, Clock, Zap } from "lucide-react"

export const DashboardHeader = () => {
    const [time, setTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    return (
        <header className="h-20 flex items-center justify-between px-6 glass border-b border-white/5 sticky top-0 z-[100] backdrop-blur-xl">
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center border border-accent/20">
                        <Zap className="text-accent animate-pulse" size={20} />
                    </div>
                    <div>
                        <h1 className="text-lg font-heading font-bold text-gradient">AI PHYSICS LAB</h1>
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="text-[10px] uppercase tracking-widest text-emerald-500 font-bold">System Online</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-8">
                <div className="hidden md:flex items-center gap-4 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                    <Clock className="text-muted-foreground" size={16} />
                    <span className="text-sm font-mono font-medium text-foreground tabular-nums">
                        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </span>
                </div>

                <div className="flex items-center gap-3 pl-6 border-l border-white/10">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-accent to-violet p-[1px]">
                        <div className="w-full h-full rounded-[10px] bg-[#0B1020] flex items-center justify-center font-bold text-accent">
                            DA
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
