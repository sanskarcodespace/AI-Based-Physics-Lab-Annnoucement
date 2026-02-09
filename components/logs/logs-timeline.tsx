"use client"

import React, { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { CheckCircle2, AlertCircle, Info, XCircle, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

export type LogStatus = "success" | "warning" | "error" | "info"

export interface LogEntry {
    id: string
    timestamp: string
    message: string
    status: LogStatus
    module: string
}

interface LogsTimelineProps {
    logs: LogEntry[]
}

export const LogsTimeline = ({ logs }: LogsTimelineProps) => {
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [logs])

    return (
        <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto pr-4 space-y-6 custom-scrollbar scroll-smooth min-h-[500px] max-h-[70vh]"
        >
            <div className="relative border-l-2 border-white/5 ml-4 pl-8 space-y-12 py-4">
                {logs.map((log, index) => (
                    <motion.div
                        key={log.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="relative"
                    >
                        {/* Timeline Dot/Icon */}
                        <div className={cn(
                            "absolute -left-[45px] top-0 p-1 rounded-full border-4 border-[#0B1020] z-10 bg-[#0B1020]",
                            getStatusColor(log.status)
                        )}>
                            {getStatusIcon(log.status)}
                        </div>

                        {/* Log Content */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-mono font-bold text-muted-foreground bg-white/5 px-2 py-0.5 rounded border border-white/10 uppercase tracking-tighter">
                                    {log.module}
                                </span>
                                <span className="text-[10px] font-mono text-muted-foreground/60 flex items-center gap-1">
                                    <Clock size={10} /> {log.timestamp}
                                </span>
                                <StatusBadge status={log.status} />
                            </div>
                            <p className="text-sm text-foreground/80 font-sans leading-relaxed">
                                {log.message}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

function StatusBadge({ status }: { status: LogStatus }) {
    const styles = {
        success: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
        warning: "bg-amber-500/10 text-amber-500 border-amber-500/20",
        error: "bg-rose-500/10 text-rose-500 border-rose-500/20",
        info: "bg-sky-500/10 text-sky-500 border-sky-500/20",
    }

    return (
        <span className={cn(
            "text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded border",
            styles[status]
        )}>
            {status}
        </span>
    )
}

function getStatusIcon(status: LogStatus) {
    switch (status) {
        case "success": return <CheckCircle2 size={16} />
        case "warning": return <AlertCircle size={16} />
        case "error": return <XCircle size={16} />
        case "info": return <Info size={16} />
    }
}

function getStatusColor(status: LogStatus) {
    switch (status) {
        case "success": return "text-emerald-500"
        case "warning": return "text-amber-500"
        case "error": return "text-rose-500"
        case "info": return "text-sky-500"
    }
}
