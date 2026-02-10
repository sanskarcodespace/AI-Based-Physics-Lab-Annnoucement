"use client"

import React from "react"
import { useScheduleStore } from "@/lib/store/use-schedule-store"
import { GlassCard } from "@/components/ui/glass-card"
import { Trash2, Edit2, Volume2 } from "lucide-react"
import { cn } from "@/lib/utils"

export const ScheduleTable = ({ onEdit }: { onEdit: (item: any) => void }) => {
    const { items, deleteItem, toggleItem } = useScheduleStore()

    return (
        <GlassCard className="overflow-hidden p-0" animate={false}>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/5 bg-white/5">
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Time</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Date/Frequency</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground text-center">Type</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Announcement Message</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground text-center">Status</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {items.map((item) => (
                            <tr key={item.id} className="group hover:bg-white/[0.02] transition-colors">
                                <td className="px-6 py-4">
                                    <span className="font-mono font-bold text-accent text-lg">{item.time}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-xs font-medium text-muted-foreground bg-white/5 px-2 py-1 rounded border border-white/10">
                                        {item.date || "Daily Re-cycle"}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className={cn(
                                        "text-[10px] font-bold uppercase tracking-tighter px-2 py-0.5 rounded border",
                                        item.type === "lab_manual" ? "bg-violet/20 text-violet border-violet/30" : "bg-sky-500/10 text-sky-400 border-sky-500/20"
                                    )}>
                                        {item.type === "lab_manual" ? "Lab Manual" : "General"}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm font-sans line-clamp-1 text-foreground/80">{item.message}</p>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[9px] uppercase tracking-widest text-muted-foreground/50 font-bold px-1 bg-white/5 rounded">
                                                {item.language}
                                            </span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <button
                                        onClick={() => toggleItem(item.id)}
                                        className={cn(
                                            "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background",
                                            item.active ? "bg-accent" : "bg-white/10"
                                        )}
                                    >
                                        <span
                                            className={cn(
                                                "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                                                item.active ? "translate-x-6" : "translate-x-1"
                                            )}
                                        />
                                    </button>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => onEdit(item)}
                                            className="p-2 rounded-lg hover:bg-accent/10 text-muted-foreground hover:text-accent transition-all"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            onClick={() => deleteItem(item.id)}
                                            className="p-2 rounded-lg hover:bg-rose-500/10 text-muted-foreground hover:text-rose-500 transition-all"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {items.length === 0 && (
                <div className="py-20 text-center space-y-4">
                    <Volume2 className="mx-auto text-muted-foreground/20" size={48} />
                    <p className="text-muted-foreground italic">No scheduled announcements found.</p>
                </div>
            )}
        </GlassCard>
    )
}
