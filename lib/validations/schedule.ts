import { z } from "zod"

export const scheduleSchema = z.object({
    time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:MM)"),
    message: z.string().min(1, "Message is required").max(500, "Message too long"),
    language: z.string().min(1, "Language selection is required"),
    voice: z.string().optional(),
    active: z.boolean().default(true),
})

export type ScheduleItem = z.infer<typeof scheduleSchema> & { id: string }
