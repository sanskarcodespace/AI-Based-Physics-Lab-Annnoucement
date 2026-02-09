"use client"

import React, { useState } from "react"
import { ScheduleTable } from "@/components/schedule/schedule-table"
import { ScheduleModal } from "@/components/schedule/schedule-modal"
import { NeonButton } from "@/components/ui/neon-button"
import { Plus, BellRing } from "lucide-react"

export default function SchedulePage() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingItem, setEditingItem] = useState<any>(null)

    const handleEdit = (item: any) => {
        setEditingItem(item)
        setIsModalOpen(true)
    }

    const handleAdd = () => {
        setEditingItem(null)
        setIsModalOpen(true)
    }

    const handleClose = () => {
        setIsModalOpen(false)
        setEditingItem(null)
    }

    return (
        <div className="space-y-10">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                    <h2 className="text-3xl font-heading font-bold text-gradient flex items-center gap-3">
                        <BellRing className="text-accent" /> Announcement Schedule
                    </h2>
                    <p className="text-muted-foreground font-sans">Manage automated audio updates for the laboratory floor.</p>
                </div>
                <NeonButton onClick={handleAdd} className="flex items-center gap-2">
                    <Plus size={20} /> New Announcement
                </NeonButton>
            </header>

            <ScheduleTable onEdit={handleEdit} />

            <ScheduleModal
                isOpen={isModalOpen}
                onClose={handleClose}
                editingItem={editingItem}
            />
        </div>
    )
}
