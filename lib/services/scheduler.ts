import { prisma } from "../prisma"
import { TTSEngine } from "./tts-engine"

class LabScheduler {
    private interval: NodeJS.Timeout | null = null
    private isRunning = false

    start() {
        if (this.isRunning) return
        this.isRunning = true
        console.log("🚀 Lab Scheduler Started")

        // Run check every minute
        this.interval = setInterval(() => this.checkSchedule(), 60000)

        // Immediate check on start
        this.checkSchedule()
    }

    private async checkSchedule() {
        const now = new Date()
        const currentTime = now.toTimeString().slice(0, 5) // HH:MM
        const todayStr = now.toISOString().split('T')[0]

        try {
            // 1. Daily Reset Check (at midnight)
            if (currentTime === "00:00") {
                await this.performDailyReset(todayStr)
            }

            // 2. Fetch active schedules for the current time
            const schedules = await prisma.scheduleItem.findMany({
                where: {
                    time: currentTime,
                    active: true
                }
            })

            for (const schedule of schedules) {
                await this.triggerAnnouncement(schedule)
            }
        } catch (error) {
            console.error("❌ Scheduler Error:", error)
        }
    }

    private async performDailyReset(date: string) {
        const resetKey = `last_reset_${date}`
        const alreadyReset = await prisma.systemState.findUnique({
            where: { key: resetKey }
        })

        if (!alreadyReset) {
            console.log(`🧹 Performing daily reset for ${date}`)
            // Deactivate one-time schedules if needed, or just log the reset
            await prisma.systemState.create({
                data: { key: resetKey, value: "done" }
            })

            await prisma.logEntry.create({
                data: {
                    timestamp: "00:00:00",
                    module: "CORE",
                    level: "info",
                    message: "Daily system recalibration and log rotation initiated."
                }
            })
        }
    }

    private async triggerAnnouncement(schedule: any) {
        console.log(`📢 Triggering: ${schedule.message}`)

        try {
            const audioUrl = await TTSEngine.synthesize({
                text: schedule.message,
                voice: schedule.voice || undefined,
                rate: 150
            })

            await prisma.logEntry.create({
                data: {
                    timestamp: schedule.time + ":00",
                    module: "SAFETY",
                    level: "info",
                    message: `Scheduled Announcement: "${schedule.message}" [${schedule.language}] [Audio: ${audioUrl}]`
                }
            })
        } catch (error) {
            console.error("Failed to synthesize scheduled announcement:", error)
        }
    }

    stop() {
        if (this.interval) clearInterval(this.interval)
        this.isRunning = false
    }
}

// Singleton instance
export const scheduler = new LabScheduler()
