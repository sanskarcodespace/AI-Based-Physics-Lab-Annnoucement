import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Seeding database...')

    // Clear existing data
    await prisma.scheduleItem.deleteMany()
    await prisma.logEntry.deleteMany()
    await prisma.systemState.deleteMany()

    // Seed Schedule Items
    const scheduleItems = [
        {
            time: '09:00',
            message: 'Laboratory systems initialized. Morning maintenance complete.',
            language: 'English',
            voice: 'en-US-Standard-C',
            active: true,
        },
        {
            time: '12:00',
            message: 'Mid-day status check. All simulation parameters within normal limits.',
            language: 'English',
            voice: 'en-US-Standard-D',
            active: true,
        },
        {
            time: '17:00',
            message: 'Closing procedures initiated. Secure all experimental apparatus.',
            language: 'English',
            voice: 'en-US-Standard-B',
            active: true,
        },
    ]

    for (const item of scheduleItems) {
        await prisma.scheduleItem.create({ data: item })
    }

    // Seed Initial Logs
    const logs = [
        {
            timestamp: new Date().toISOString(),
            level: 'INFO',
            message: 'System cold boot successful.',
            module: 'CORE',
        },
        {
            timestamp: new Date().toISOString(),
            level: 'SUCCESS',
            message: 'Database connection established.',
            module: 'DB',
        },
        {
            timestamp: new Date().toISOString(),
            level: 'WARNING',
            message: 'Thermal sensors calibrated.',
            module: 'SENSORS',
        },
    ]

    for (const log of logs) {
        await prisma.logEntry.create({ data: log })
    }

    // Seed System State
    await prisma.systemState.create({
        data: {
            key: 'last_broadcast',
            value: new Date().toISOString(),
        },
    })

    console.log('✅ Seeding complete.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
