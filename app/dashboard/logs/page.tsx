"use client"

import React, { useState, useMemo, useEffect } from "react"
import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/glass-card"
import { NeonButton } from "@/components/ui/neon-button"
import { LogsTimeline, type LogEntry } from "@/components/logs/logs-timeline"
import { Search, Download, Filter, Terminal, Calendar } from "lucide-react"
import { exportToCSV } from "@/lib/utils/export-csv"
import { cn } from "@/lib/utils"

const MOCK_LOGS: LogEntry[] = [
    { id: "1", timestamp: "10:45:02", module: "CORE", status: "info", message: "Laboratory core systems initialized successfully. Establishing neural link." },
    { id: "2", timestamp: "10:45:15", module: "AUTH", status: "success", message: "Researcher Dr. Aris authenticated. Access level: LEAD." },
    { id: "3", timestamp: "10:48:30", module: "PHYSICS", status: "warning", message: "Gravitational constant variance detected in chamber B-4. Adjusting dampers." },
    { id: "4", timestamp: "10:50:11", module: "SAFETY", status: "info", message: "Automated announcement triggered: 'Daily induction starting in 5 minutes'." },
    { id: "5", timestamp: "10:52:45", module: "COMPUTE", status: "success", message: "Parallel simulation 'Omega-7' reached 40% completion without entropy spikes." },
    { id: "6", timestamp: "11:02:12", module: "CORE", status: "error", message: "Coolant pressure drop in primary reactor manifold. Redirecting reserve flow." },
    { id: "7", timestamp: "11:05:00", module: "SAFETY", status: "success", message: "Reactor cooling stable. Manual override released." },
    { id: "8", timestamp: "11:15:22", module: "VOICE", status: "info", message: "Synthesized 'Google UK English Male' profile loaded for high-priority alerts." },
    { id: "9", timestamp: "11:20:45", module: "PHYSICS", status: "warning", message: "Waveform collapse observed in quantum observation tank 2." },
    { id: "10", timestamp: "11:30:10", module: "AUTH", status: "info", message: "System maintenance log rotation complete." },
]

export default function LogsPage() {
    const [logs, setLogs] = useState<LogEntry[]>([])
    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState<string>("ALL")
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const res = await fetch('/api/logs')
                const data = await res.json()
                setLogs(data)
            } catch (error) {
                console.error("Failed to fetch logs:", error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchLogs()
        // Poll for new logs every 30 seconds
        const interval = setInterval(fetchLogs, 30000)
        return () => clearInterval(interval)
    }, [])

    const filteredLogs = useMemo(() => {
        return logs.filter(log => {
            const matchesSearch = log.message.toLowerCase().includes(search.toLowerCase()) ||
                log.module.toLowerCase().includes(search.toLowerCase())
            const matchesFilter = filter === "ALL" || log.status.toUpperCase() === filter
            return matchesSearch && matchesFilter
        })
    }, [logs, search, filter])

    const handleExport = () => {
        exportToCSV(filteredLogs, `lab_logs_${new Date().toISOString().split('T')[0]}.csv`)
    }

    return (
        <div className="space-y-10">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                    <h2 className="text-3xl font-heading font-bold text-gradient flex items-center gap-3">
                        <Terminal className="text-accent" /> System Telemetry Logs
                    </h2>
                    <p className="text-muted-foreground font-sans">Audit trail of all autonomous laboratory activities and security events.</p>
                </div>
                <NeonButton onClick={handleExport} variant="outline" className="flex items-center gap-2">
                    <Download size={18} /> Export Data
                </NeonButton>
            </header>

            {/* Filters Bar */}
            <GlassCard className="p-4" animate={false}>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <input
                            type="text"
                            placeholder="Search by message or module..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 outline-none focus:border-accent/50 transition-all font-sans text-sm"
                        />
                    </div>

                    <div className="flex gap-2">
                        {["ALL", "SUCCESS", "INFO", "WARNING", "ERROR"].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={cn(
                                    "px-4 py-2.5 rounded-xl border text-[10px] font-bold tracking-widest uppercase transition-all",
                                    filter === f
                                        ? "bg-accent/10 border-accent/20 text-accent shadow-[0_0_15px_rgba(94,234,212,0.1)]"
                                        : "bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10"
                                )}
                            >
                                {f}
                            </button>
                        ))}
                    </div>

                    <div className="md:border-l border-white/10 md:pl-4 flex items-center gap-2">
                        <Calendar size={18} className="text-muted-foreground" />
                        <span className="text-xs font-bold text-foreground">Today</span>
                        <Filter size={14} className="text-muted-foreground" />
                    </div>
                </div>
            </GlassCard>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 space-y-4">
                    <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                    <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest">Accessing Audit Trail...</p>
                </div>
            ) : (
                <LogsTimeline logs={filteredLogs} />
            )}

            <footer className="pt-10 flex justify-between items-center text-muted-foreground">
                <div className="text-xs font-mono">
                    Showing {filteredLogs.length} of {logs.length} entries
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] uppercase tracking-widest font-bold">Live Monitoring Active</span>
                </div>
            </footer>
        </div>
    )
}
