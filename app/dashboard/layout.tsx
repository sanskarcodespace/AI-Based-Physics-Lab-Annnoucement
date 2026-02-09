"use client"

import React from "react"
import { motion } from "framer-motion"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen flex flex-col bg-transparent relative">
            <DashboardHeader />
            <div className="flex-1 flex overflow-hidden">
                <DashboardNav />
                <main className="flex-1 overflow-y-auto pb-20 lg:pb-0 relative perspective-1000">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="p-6 md:p-8 max-w-7xl mx-auto w-full"
                    >
                        {children}
                    </motion.div>
                </main>
            </div>
        </div>
    )
}
