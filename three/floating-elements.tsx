"use client"

import React, { useRef, useLayoutEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshWobbleMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'

export const FloatingElements = () => {
    const groupRef = useRef<THREE.Group>(null)

    useLayoutEffect(() => {
        if (!groupRef.current) return

        // Slow drifting animation using GSAP
        gsap.to(groupRef.current.position, {
            y: "+=0.5",
            x: "+=0.3",
            duration: 5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        })

        gsap.to(groupRef.current.rotation, {
            z: Math.PI * 2,
            duration: 20,
            repeat: -1,
            ease: "none"
        })
    }, [])

    return (
        <group ref={groupRef}>
            {/* Torus Knots */}
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                <mesh position={[-4, 2, -2]}>
                    <torusKnotGeometry args={[1, 0.3, 128, 16]} />
                    <MeshWobbleMaterial color="#A78BFA" factor={0.4} speed={2} transparent opacity={0.6} />
                </mesh>
            </Float>

            <Float speed={1.5} rotationIntensity={2} floatIntensity={0.5}>
                <mesh position={[5, -3, -3]}>
                    <torusKnotGeometry args={[0.7, 0.2, 128, 16]} />
                    <MeshWobbleMaterial color="#5EEAD4" factor={0.3} speed={1} transparent opacity={0.4} />
                </mesh>
            </Float>

            {/* Floating Translucent Panels */}
            {[...Array(5)].map((_, i) => (
                <Float key={i} speed={1} rotationIntensity={0.5} floatIntensity={1} position={[
                    Math.random() * 10 - 5,
                    Math.random() * 10 - 5,
                    Math.random() * -5 - 2
                ]}>
                    <mesh rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}>
                        <boxGeometry args={[2, 2, 0.05]} />
                        <meshPhysicalMaterial
                            color="#ffffff"
                            transparent
                            opacity={0.1}
                            roughness={0.1}
                            metalness={0.1}
                            transmission={0.5}
                            thickness={1}
                        />
                    </mesh>
                </Float>
            ))}
        </group>
    )
}
