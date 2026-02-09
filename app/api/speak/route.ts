import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { message, voice } = body

        // Log the manual speak event
        await prisma.logEntry.create({
            data: {
                timestamp: new Date().toTimeString().slice(0, 8),
                module: "VOICE",
                level: "info",
                message: `Manual Synthesis: "${message}" [Voice: ${voice || 'default'}]`
            }
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: "Failed to log speak event" }, { status: 500 })
    }
}
