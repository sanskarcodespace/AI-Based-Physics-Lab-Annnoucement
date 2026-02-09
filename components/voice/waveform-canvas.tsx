"use client"

import React, { useRef, useEffect } from "react"

export const WaveformCanvas = ({ isActive }: { isActive: boolean }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const animationRef = useRef<number>(0)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let offset = 0
        const draw = () => {
            const width = canvas.width = canvas.offsetWidth
            const height = canvas.height = canvas.offsetHeight
            ctx.clearRect(0, 0, width, height)

            const centerY = height / 2
            const amplitude = isActive ? height * 0.4 : 5
            const frequency = 0.02
            const speed = isActive ? 0.2 : 0.03

            ctx.beginPath()
            ctx.lineWidth = 2
            ctx.strokeStyle = isActive ? "#5EEAD4" : "rgba(255, 255, 255, 0.1)"

            // Shadow for glow
            if (isActive) {
                ctx.shadowBlur = 15
                ctx.shadowColor = "#5EEAD4"
            }

            for (let x = 0; x < width; x++) {
                const y = centerY + Math.sin(x * frequency + offset) * amplitude * (Math.sin(offset * 0.2) * 0.5 + 0.5)
                if (x === 0) ctx.moveTo(x, y)
                else ctx.lineTo(x, y)
            }

            ctx.stroke()

            // Secondary wave
            ctx.beginPath()
            ctx.strokeStyle = isActive ? "#A78BFA" : "rgba(255, 255, 255, 0.05)"
            if (isActive) ctx.shadowColor = "#A78BFA"

            for (let x = 0; x < width; x++) {
                const y = centerY + Math.cos(x * frequency * 0.8 - offset) * amplitude * 0.6
                if (x === 0) ctx.moveTo(x, y)
                else ctx.lineTo(x, y)
            }
            ctx.stroke()

            offset += speed
            animationRef.current = requestAnimationFrame(draw)
        }

        draw()
        return () => cancelAnimationFrame(animationRef.current)
    }, [isActive])

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ filter: "drop-shadow(0 0 10px rgba(94, 234, 212, 0.3))" }}
        />
    )
}
