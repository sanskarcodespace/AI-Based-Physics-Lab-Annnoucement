"use client"

import React, { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { scheduleSchema, type ScheduleItem } from "@/lib/validations/schedule"
import { useScheduleStore } from "@/lib/store/use-schedule-store"
import { PremiumModal } from "@/components/ui/3d-modal"
import { NeonButton } from "@/components/ui/neon-button"
import { TranslucentInput } from "@/components/ui/translucent-input"
import { Volume2, Play } from "lucide-react"

interface ScheduleModalProps {
    isOpen: boolean
    onClose: () => void
    editingItem: ScheduleItem | null
}

export const ScheduleModal = ({ isOpen, onClose, editingItem }: ScheduleModalProps) => {
    const { addItem, updateItem } = useScheduleStore()
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(scheduleSchema),
        defaultValues: editingItem || {
            time: "",
            message: "",
            language: "English",
            voice: "",
            active: true,
        }
    })

    useEffect(() => {
        if (editingItem) {
            reset(editingItem)
        } else {
            reset({
                time: "",
                message: "",
                language: "English",
                voice: "",
                active: true,
            })
        }
    }, [editingItem, reset])

    useEffect(() => {
        const loadVoices = () => {
            setVoices(window.speechSynthesis.getVoices())
        }
        loadVoices()
        window.speechSynthesis.onvoiceschanged = loadVoices
    }, [])

    const onSubmit = (data: any) => {
        if (editingItem) {
            updateItem(editingItem.id, data)
        } else {
            addItem(data)
        }
        onClose()
    }

    const handlePreview = () => {
        const message = (document.getElementById("message-area") as HTMLTextAreaElement)?.value
        const voiceName = (document.getElementById("voice-select") as HTMLSelectElement)?.value

        if (!message) return

        const utterance = new SpeechSynthesisUtterance(message)
        if (voiceName) {
            const selectedVoice = voices.find(v => v.name === voiceName)
            if (selectedVoice) utterance.voice = selectedVoice
        }
        window.speechSynthesis.speak(utterance)
    }

    return (
        <PremiumModal
            isOpen={isOpen}
            onClose={onClose}
            title={editingItem ? "Edit Announcement" : "Add Announcement"}
            className="max-w-2xl"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <TranslucentInput
                        label="Time (HH:MM)"
                        placeholder="08:00"
                        {...register("time")}
                        error={errors.time?.message as string}
                    />
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">Language</label>
                        <select
                            {...register("language")}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-accent/50 text-foreground"
                        >
                            <option value="English">English</option>
                            <option value="Spanish">Spanish</option>
                            <option value="French">French</option>
                            <option value="Hindi">Hindi</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Announcement Message</label>
                    <textarea
                        id="message-area"
                        {...register("message")}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-accent/50 min-h-[120px] transition-all text-foreground"
                        placeholder="Enter the automated announcement text..."
                    />
                    {errors.message && <p className="text-xs text-rose-500 font-medium">{errors.message.message as string}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Digital Voice Selector</label>
                    <div className="flex gap-2">
                        <select
                            id="voice-select"
                            {...register("voice")}
                            className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-accent/50 text-foreground"
                        >
                            <option value="">Default System Voice</option>
                            {voices.map((voice) => (
                                <option key={voice.name} value={voice.name}>
                                    {voice.name} ({voice.lang})
                                </option>
                            ))}
                        </select>
                        <button
                            type="button"
                            onClick={handlePreview}
                            className="px-4 rounded-xl bg-accent text-background font-bold flex items-center gap-2 hover:bg-accent/80 transition-all shrink-0"
                        >
                            <Play size={16} fill="black" /> Speak
                        </button>
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-6">
                    <NeonButton variant="outline" type="button" onClick={onClose}>
                        Cancel
                    </NeonButton>
                    <NeonButton type="submit">
                        {editingItem ? "Update Schedule" : "Save Schedule"}
                    </NeonButton>
                </div>
            </form>
        </PremiumModal>
    )
}
