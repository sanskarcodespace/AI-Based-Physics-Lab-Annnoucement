"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AlertCircle, ShieldAlert, Flame, Biohazard, Lock, CheckCircle2, Volume2 } from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"
import { NeonButton } from "@/components/ui/neon-button"

const PRESETS = [
    { id: 'fire', label: 'FIRE ALERT', icon: Flame, message: 'Emergency. Fire detected. Please evacuate the laboratory immediately and proceed to the assembly point.', color: 'text-orange-500' },
    { id: 'leak', label: 'CHEMICAL LEAK', icon: Biohazard, message: 'Critical Warning. Chemical leak detected. Don protective gear and evacuate sector 7.', color: 'text-green-500' },
    { id: 'lockdown', label: 'LOCKDOWN', icon: Lock, message: 'Security Alert. Unauthorized entry detected. Commencing complete laboratory lockdown.', color: 'text-red-500' },
    { id: 'clear', label: 'ALL CLEAR', icon: CheckCircle2, message: 'Attention. The emergency has been resolved. Normal laboratory operations may resume.', color: 'text-emerald-500' },
]

export default function EmergencyPage() {
    const [activeEmergency, setActiveEmergency] = useState<string | null>(null)
    const [isBroadcasting, setIsBroadcasting] = useState(false)

    const handleBroadcast = async (preset: typeof PRESETS[0]) => {
        setIsBroadcasting(true)
        setActiveEmergency(preset.id)

        try {
            const res = await fetch('/api/emergency', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: preset.id.toUpperCase(), message: preset.message })
            })

            const data = await res.json()
            if (data.audioUrl) {
                const audio = new Audio(data.audioUrl)
                audio.play()
            }
        } catch (error) {
            console.error("Emergency broadcast failed:", error)
        } finally {
            setTimeout(() => setIsBroadcasting(false), 3000)
        }
    }

    const clearEmergency = async () => {
        await fetch('/api/emergency', { method: 'DELETE' })
        setActiveEmergency(null)
    }

    return (
        <div className="space-y-8 p-6">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center border border-red-500/50 animate-pulse">
                    <ShieldAlert className="w-6 h-6 text-red-500" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold font-space text-red-500 tracking-tight">EMERGENCY BROADCAST SYSTEM</h1>
                    <p className="text-slate-400">High-priority laboratory intervention and override control</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Control */}
                <div className="lg:col-span-2 space-y-6">
                    <GlassCard className="relative overflow-hidden group min-h-[400px] flex flex-col items-center justify-center border-red-500/20 bg-red-950/10">
                        <div className="absolute inset-0 bg-gradient-to-t from-red-500/5 to-transparent pointer-events-none" />

                        <AnimatePresence>
                            {isBroadcasting && (
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1.5, opacity: 1 }}
                                    exit={{ scale: 2, opacity: 0 }}
                                    className="absolute w-64 h-64 bg-red-500/10 rounded-full blur-3xl pointer-events-none"
                                />
                            )}
                        </AnimatePresence>

                        <div className="relative text-center space-y-8">
                            <motion.div
                                animate={isBroadcasting ? { scale: [1, 1.1, 1] } : {}}
                                transition={{ repeat: Infinity, duration: 1 }}
                            >
                                <AlertCircle className={`w-32 h-32 mx-auto ${isBroadcasting ? 'text-red-500' : 'text-red-900'} transition-colors duration-500`} />
                            </motion.div>

                            <div className="space-y-4">
                                <h2 className="text-4xl font-space font-bold text-slate-200">BROADCAST INTERRUPT</h2>
                                <p className="text-slate-400 max-w-md mx-auto">Clicking any preset below will immediately override the current schedule and broadcast across all laboratory sectors.</p>
                            </div>

                            {activeEmergency && (
                                <motion.button
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    onClick={clearEmergency}
                                    className="text-red-500 border border-red-500/30 px-6 py-2 rounded-full hover:bg-red-500/10 transition-colors font-mono uppercase tracking-widest text-sm"
                                >
                                    Clear System Override
                                </motion.button>
                            )}
                        </div>
                    </GlassCard>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {PRESETS.map((preset) => (
                            <GlassCard
                                key={preset.id}
                                className={`cursor-pointer hover:border-slate-400/50 transition-all border-slate-800 ${activeEmergency === preset.id ? 'border-red-500/50 bg-red-500/5' : ''}`}
                                onClick={() => handleBroadcast(preset)}
                            >
                                <div className="flex flex-col items-center gap-4 text-center">
                                    <preset.icon className={`w-8 h-8 ${preset.color}`} />
                                    <span className="font-space font-bold text-xs tracking-tighter text-slate-300">{preset.label}</span>
                                </div>
                            </GlassCard>
                        ))}
                    </div>
                </div>

                {/* Sidebar Status */}
                <div className="space-y-6">
                    <GlassCard className="border-slate-800">
                        <h3 className="text-lg font-space font-bold text-slate-200 mb-6 flex items-center gap-2">
                            <Volume2 className="w-5 h-5 text-red-500" />
                            LIVE FEEDBACK
                        </h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-slate-500 uppercase tracking-widest">Network Status</span>
                                <span className="text-emerald-500 font-mono">ENCRYPTED</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-slate-500 uppercase tracking-widest">Override State</span>
                                <span className={activeEmergency ? "text-red-500 font-mono" : "text-slate-600 font-mono"}>
                                    {activeEmergency ? "PENDING OVERRIDE" : "STANDBY"}
                                </span>
                            </div>
                            <div className="h-[2px] bg-slate-800 w-full" />
                            <div className="space-y-2">
                                <p className="text-[10px] text-slate-500 uppercase tracking-widest">Current Protocol</p>
                                <p className="text-sm font-mono text-slate-300">
                                    {activeEmergency ? `PROTOCOL_${activeEmergency.toUpperCase()}_v.104` : 'IDLE_SENTRY_MODE'}
                                </p>
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard className="border-slate-800 overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-3xl rounded-full" />
                        <h3 className="text-slate-400 text-xs font-mono mb-4 italic">AUDIT_LOG_STREAM</h3>
                        <div className="space-y-3 font-mono text-[10px]">
                            <div className="text-slate-500 flex justify-between">
                                <span>[23:27:10] SYS_INIT</span>
                                <span className="text-blue-500">READY</span>
                            </div>
                            <div className="text-slate-500 flex justify-between">
                                <span>[23:28:05] OVERRIDE_CHK</span>
                                <span className="text-slate-600">PASSED</span>
                            </div>
                            {activeEmergency && (
                                <div className="text-red-400 flex justify-between animate-pulse">
                                    <span>[NOW] BROADCAST_EMG</span>
                                    <span className="text-red-500">BUS_ACTIVE</span>
                                </div>
                            )}
                        </div>
                    </GlassCard>
                </div>
            </div>
        </div>
    )
}
