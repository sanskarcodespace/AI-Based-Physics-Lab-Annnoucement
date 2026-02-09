"use client"

import React, { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, PerspectiveCamera } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import { ParticlesGrid } from "@/three/particles-grid"
import { FloatingElements } from "@/three/floating-elements"

const SceneContent = () => {
    const { mouse, viewport } = useThree()
    const groupRef = useRef<THREE.Group>(null)

    useFrame(() => {
        if (!groupRef.current) return
        // Parallax movement based on mouse
        const x = (mouse.x * viewport.width) / 20
        const y = (mouse.y * viewport.height) / 20
        groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, x, 0.05)
        groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, y, 0.05)
    })

    return (
        <group ref={groupRef}>
            <ParticlesGrid />
            <FloatingElements />
        </group>
    )
}

export const ThreeSceneBackground = () => {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    if (isMobile) return null // Fallback to CSS gradient in layout

    return (
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
            <Canvas
                shadows
                gl={{ antialias: false, stencil: false, depth: true }}
                dpr={[1, 2]} // Performance: clamp DPR
            >
                <Suspense fallback={null}>
                    <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />

                    {/* Lighting */}
                    <ambientLight intensity={0.2} />
                    <pointLight position={[10, 10, 10]} intensity={1} color="#5EEAD4" />
                    <Environment preset="city" />

                    <SceneContent />

                    {/* Post Processing */}
                    <EffectComposer>
                        <Bloom
                            luminanceThreshold={0.5}
                            mipmapBlur
                            intensity={1.5}
                            radius={0.4}
                        />
                    </EffectComposer>
                </Suspense>
            </Canvas>
        </div>
    )
}
