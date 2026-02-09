import { create } from "zustand"
import { persist } from "zustand/middleware"
import { ScheduleItem } from "../validations/schedule"

interface ScheduleStore {
    items: ScheduleItem[]
    addItem: (item: Omit<ScheduleItem, "id">) => void
    updateItem: (id: string, item: Partial<ScheduleItem>) => void
    deleteItem: (id: string) => void
    toggleItem: (id: string) => void
}

export const useScheduleStore = create<ScheduleStore>()(
    persist(
        (set) => ({
            items: [
                {
                    id: "1",
                    time: "08:00",
                    message: "Daily lab induction starting in 5 minutes.",
                    language: "English",
                    voice: "Google UK English Male",
                    active: true
                },
                {
                    id: "2",
                    time: "12:00",
                    message: "Lunch break protocol initiated.",
                    language: "English",
                    voice: "Google UK English Female",
                    active: true
                },
            ],
            addItem: (item) => set((state) => ({
                items: [...state.items, { ...item, id: Math.random().toString(36).substring(7) }]
            })),
            updateItem: (id, updatedItem) => set((state) => ({
                items: state.items.map((item) => item.id === id ? { ...item, ...updatedItem } : item)
            })),
            deleteItem: (id) => set((state) => ({
                items: state.items.filter((item) => item.id !== id)
            })),
            toggleItem: (id) => set((state) => ({
                items: state.items.map((item) => item.id === id ? { ...item, active: !item.active } : item)
            }))
        }),
        {
            name: "lab-schedule-storage",
        }
    )
)
