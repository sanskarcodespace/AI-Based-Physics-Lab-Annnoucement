"use client"

import { Toaster as Sonner } from "sonner"
import { useTheme } from "next-themes"

export const NeonToaster = () => {
    const { theme = "dark" } = useTheme()

    return (
        <Sonner
            theme={theme as "light" | "dark" | "system"}
            className="toaster group"
            toastOptions={{
                classNames: {
                    toast: "group [background:rgba(18,25,53,0.8)] backdrop-blur-xl [border:1px_solid_rgba(255,255,255,0.1)] [border-left:4px_solid_#5EEAD4] text-foreground rounded-xl shadow-2xl",
                    description: "group-[.toast]:text-muted-foreground",
                    actionButton: "group-[.toast]:bg-accent group-[.toast]:text-background",
                    cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
                },
            }}
        />
    )
}
