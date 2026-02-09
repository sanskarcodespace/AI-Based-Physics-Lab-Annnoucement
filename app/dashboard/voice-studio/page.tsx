"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/glass-card"
import { NeonButton } from "@/components/ui/neon-button"
import {
    AudioWaveform as Waveform,
    Settings2,
    Mic2,
    Play,
    ChevronRight,
    Sparkles,
    RefreshCw,
    Clock
} from "lucide-react"
import { Canvas } from "@react-three/fiber"
import dynamic from "next/dynamic"

const Mic3D = dynamic(() => import("@/components/voice/mic-3d").then(mod => mod.Mic3D), {
    ssr: false,
    loading: () => <div className="h-full w-full flex items-center justify-center bg-white/5 animate-pulse rounded-2xl">Loading 3D Monitor...</div>
})

const WaveformCanvas = dynamic(() => import("@/components/voice/waveform-canvas").then(mod => mod.WaveformCanvas), {
    ssr: false
})

export default function VoiceStudioPage() {
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
    const [selectedVoice, setSelectedVoice] = useState("")
    const [pitch, setPitch] = useState(1)
    const [rate, setRate] = useState(1)
    const [text, setText] = useState("AI Laboratory systems are operational. Simulation parameters verified.")
    const [isSpeaking, setIsSpeaking] = useState(false)

    useEffect(() => {
        const loadVoices = () => {
            const v = window.speechSynthesis.getVoices()
            setVoices(v)
            if (v.length > 0 && !selectedVoice) setSelectedVoice(v[0].name)
        }
        loadVoices()
        window.speechSynthesis.onvoiceschanged = loadVoices
    }, [selectedVoice])

    const handleSpeak = async () => {
        if (isSpeaking) window.speechSynthesis.cancel()

        const utterance = new SpeechSynthesisUtterance(text)
        const voice = voices.find(v => v.name === selectedVoice)
        if (voice) utterance.voice = voice
        utterance.pitch = pitch
        utterance.rate = rate

        utterance.onstart = () => setIsSpeaking(true)
        utterance.onend = () => setIsSpeaking(false)
        utterance.onerror = () => setIsSpeaking(false)

        window.speechSynthesis.speak(utterance)

        // Log to backend
        try {
            await fetch('/api/speak', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text, voice: selectedVoice })
            })
        } catch (error) {
            console.error("Failed to log speak event:", error)
        }
    }

    return (
        <div className="space-y-10">
            <header className="space-y-2">
                <h2 className="text-3xl font-heading font-bold text-gradient flex items-center gap-3">
                    <Mic2 className="text-accent" /> Voice Studio
                </h2>
                <p className="text-muted-foreground font-sans">Synthesize and calibrate laboratory announcement profiles.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Controls Panel */}
                <div className="space-y-8">
                    <GlassCard className="p-8 space-y-8">
                        <div className="space-y-4">
                            <label className="text-sm font-bold text-muted-foreground flex items-center gap-2 uppercase tracking-widest">
                                <Settings2 size={16} /> Configuration
                            </label>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-muted-foreground">Voice Engine</label>
                                    <select
                                        value={selectedVoice}
                                        onChange={(e) => setSelectedVoice(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-accent/50 text-foreground transition-all"
                                    >
                                        {voices.map((v) => (
                                            <option key={v.name} value={v.name}>{v.name} ({v.lang})</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-muted-foreground flex justify-between">
                                        Pitch <span>{pitch.toFixed(1)}</span>
                                    </label>
                                    <input
                                        type="range"
                                        min="0.5"
                                        max="2"
                                        step="0.1"
                                        value={pitch}
                                        onChange={(e) => setPitch(parseFloat(e.target.value))}
                                        className="w-full accent-accent"
                                    />
                                </div>

                                <div className="space-y-2 col-span-1 md:col-span-2">
                                    <label className="text-xs font-medium text-muted-foreground flex justify-between">
                                        Speech Rate <span>{rate.toFixed(1)}x</span>
                                    </label>
                                    <input
                                        type="range"
                                        min="0.5"
                                        max="2"
                                        step="0.1"
                                        value={rate}
                                        onChange={(e) => setRate(parseFloat(e.target.value))}
                                        className="w-full accent-accent"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-bold text-muted-foreground flex items-center gap-2 uppercase tracking-widest">
                                <Waveform size={16} /> Script Input
                            </label>
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 min-h-[140px] outline-none focus:border-accent/50 text-foreground text-sm leading-relaxed"
                                placeholder="Type the announcement script here..."
                            />
                        </div>

                        <div className="h-20 bg-black/20 rounded-2xl overflow-hidden border border-white/5">
                            <WaveformCanvas isActive={isSpeaking} />
                        </div>

                        <NeonButton onClick={handleSpeak} className="w-full py-4 text-lg gap-3">
                            <Play size={20} fill="currentColor" /> {isSpeaking ? "Calibrating..." : "Test Voice Profile"}
                        </NeonButton>
                    </GlassCard>

                    <div className="grid grid-cols-2 gap-4">
                        <StatMini icon={RefreshCw} label="Models" value="12 Active" />
                        <StatMini icon={Sparkles} label="Engine" value="v4.2 AI" />
                    </div>
                </div>

                {/* Visualization Panel */}
                <div className="h-full min-h-[500px] flex flex-col gap-6">
                    <GlassCard className="flex-1 p-0 overflow-hidden relative group" animate={false}>
                        <div className="absolute top-6 left-6 z-10 space-y-1">
                            <h3 className="text-xl font-heading font-bold">Studio Monitor</h3>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                                <span className="text-[10px] uppercase tracking-widest text-accent font-bold">High Fidelity Mode</span>
                            </div>
                        </div>

                        <Canvas shadows gl={{ antialias: true }}>
                            <Mic3D />
                        </Canvas>

                        <div className="absolute bottom-6 right-6 z-10">
                            <div className="px-4 py-2 glass border-white/10 rounded-xl text-[10px] font-mono text-muted-foreground">
                                SENSORS: POSITIVE
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard className="bg-white/5 border-white/10 p-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center border border-accent/20">
                                <Clock className="text-accent" size={20} />
                            </div>
                            <div>
                                <div className="text-sm font-bold">Recent Session</div>
                                <div className="text-xs text-muted-foreground">Last generated: 12m ago</div>
                            </div>
                        </div>
                        <button className="text-xs font-bold text-accent hover:underline flex items-center gap-1">
                            View History <ChevronRight size={14} />
                        </button>
                    </GlassCard>
                </div>
            </div>
        </div>
    )
}

function StatMini({ icon: Icon, label, value }: any) {
    return (
        <GlassCard className="p-4 flex items-center gap-4" animate={false}>
            <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                <Icon size={18} className="text-muted-foreground" />
            </div>
            <div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
                <div className="font-bold text-sm">{value}</div>
            </div>
        </GlassCard>
    )
}
