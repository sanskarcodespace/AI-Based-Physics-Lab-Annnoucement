import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { TTSEngine } from "@/lib/services/tts-engine"
import { scheduler } from "@/lib/services/scheduler"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { type, message } = body

        // 1. Activate Scheduler Override
        scheduler.setOverride(true)

        // 2. Synthesize High-Priority Audio
        const audioUrl = await TTSEngine.synthesize({
            text: message,
            voice: undefined, // Default system voice for emergencies
            rate: 140 // Slightly slower and more urgent
        })

        // 3. Create Critical Log Entry
        await prisma.logEntry.create({
            data: {
                timestamp: new Date().toTimeString().slice(0, 8),
                module: "EMERGENCY",
                level: "critical",
                message: `EMERGENCY BROADCAST [${type}]: "${message}" [Audio: ${audioUrl}]`
            }
        })

        return NextResponse.json({ success: true, audioUrl })
    } catch (error) {
        console.error("Emergency API Error:", error)
        return NextResponse.json({ error: "Failed to broadcast emergency" }, { status: 500 })
    }
}

export async function DELETE() {
    // Reset override
    scheduler.setOverride(false)
    return NextResponse.json({ success: true, message: "Emergency override cleared" })
}
