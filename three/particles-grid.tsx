"use client"

import React, { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export const ParticlesGrid = () => {
    const count = 40
    const meshRef = useRef<THREE.Points>(null)

    const particles = useMemo(() => {
        const temp = []
        for (let i = 0; i < count; i++) {
            for (let j = 0; j < count; j++) {
                const x = (i - count / 2) * 1.5
                const y = (j - count / 2) * 1.5
                const z = 0
                temp.push(x, y, z)
            }
        }
        return new Float32Array(temp)
    }, [count])

    useFrame((state) => {
        if (!meshRef.current) return
        const time = state.clock.getElapsedTime()
        meshRef.current.rotation.z = time * 0.05

        const positions = meshRef.current.geometry.attributes.position.array as Float32Array
        for (let i = 0; i < positions.length; i += 3) {
            const x = positions[i]
            const y = positions[i + 1]
            // Subtle wave effect
            positions[i + 2] = Math.sin(time + x * 0.5) * Math.cos(time + y * 0.5) * 0.2
        }
        meshRef.current.geometry.attributes.position.needsUpdate = true
    })

    return (
        <points ref={meshRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particles.length / 3}
                    array={particles}
                    itemSize={3}
                    args={[particles, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                color="#5EEAD4"
                transparent
                opacity={0.3}
                sizeAttenuation
            />
        </points>
    )
}
