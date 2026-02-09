import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { scheduler } from "@/lib/services/scheduler"

export const dynamic = "force-dynamic"

export async function GET() {
    // Initialize scheduler on first API hit lazily
    scheduler.start()

    try {
        const schedules = await prisma.scheduleItem.findMany({
            orderBy: { time: 'asc' }
        })
        return NextResponse.json(schedules)
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch schedules" }, { status: 500 })
    }
}

export async function POST(request: Request) {
    scheduler.start()
    try {
        const body = await request.json()
        const { id, time, message, language, voice, active } = body

        if (id) {
            // Update
            const updated = await prisma.scheduleItem.update({
                where: { id },
                data: { time, message, language, voice, active }
            })
            return NextResponse.json(updated)
        } else {
            // Create
            const created = await prisma.scheduleItem.create({
                data: { time, message, language, voice, active: active ?? true }
            })
            return NextResponse.json(created)
        }
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Failed to save schedule" }, { status: 500 })
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')
        if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 })

        await prisma.scheduleItem.delete({ where: { id } })
        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete" }, { status: 500 })
    }
}
