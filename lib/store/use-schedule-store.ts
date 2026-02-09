import { create } from "zustand"
import { ScheduleItem } from "../validations/schedule"

interface ScheduleStore {
    items: ScheduleItem[]
    fetchItems: () => Promise<void>
    addItem: (item: Omit<ScheduleItem, "id">) => Promise<void>
    updateItem: (id: string, item: Partial<ScheduleItem>) => Promise<void>
    deleteItem: (id: string) => Promise<void>
    toggleItem: (id: string) => Promise<void>
}

export const useScheduleStore = create<ScheduleStore>((set, get) => ({
    items: [],
    fetchItems: async () => {
        try {
            const res = await fetch('/api/schedule')
            const data = await res.json()
            set({ items: data })
        } catch (error) {
            console.error("Failed to fetch schedules:", error)
        }
    },
    addItem: async (item) => {
        try {
            const res = await fetch('/api/schedule', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item)
            })
            const newItem = await res.json()
            set((state) => ({ items: [...state.items, newItem] }))
        } catch (error) {
            console.error("Failed to add schedule:", error)
        }
    },
    updateItem: async (id, updatedItem) => {
        try {
            const res = await fetch('/api/schedule', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, ...updatedItem })
            })
            const updated = await res.json()
            set((state) => ({
                items: state.items.map((item) => item.id === id ? updated : item)
            }))
        } catch (error) {
            console.error("Failed to update schedule:", error)
        }
    },
    deleteItem: async (id) => {
        try {
            await fetch(`/api/schedule?id=${id}`, { method: 'DELETE' })
            set((state) => ({
                items: state.items.filter((item) => item.id !== id)
            }))
        } catch (error) {
            console.error("Failed to delete schedule:", error)
        }
    },
    toggleItem: async (id) => {
        const item = get().items.find(i => i.id === id)
        if (!item) return
        await get().updateItem(id, { active: !item.active })
    }
}))
