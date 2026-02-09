import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export async function GET() {
    try {
        const logs = await prisma.logEntry.findMany({
            orderBy: { createdAt: 'desc' },
            take: 100
        })
        return NextResponse.json(logs, {
            headers: {
                'Cache-Control': 'public, s-maxage=1, stale-while-revalidate=5'
            }
        })
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch logs" }, { status: 500 })
    }
}
