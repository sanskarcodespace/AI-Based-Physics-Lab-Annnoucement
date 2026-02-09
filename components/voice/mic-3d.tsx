"use client"

import React, { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { MeshDistortMaterial, PerspectiveCamera, Float, MeshWobbleMaterial } from "@react-three/drei"
import * as THREE from "three"

export const Mic3D = () => {
    return (
        <div className="w-full h-[400px] relative cursor-grab active:cursor-grabbing">
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#5EEAD4" />
            <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#A78BFA" />

            <Float speed={2} rotationIntensity={1} floatIntensity={2}>
                <group scale={1.2}>
                    {/* Mic Head - Grill */}
                    <mesh position={[0, 1, 0]}>
                        <sphereGeometry args={[0.8, 32, 32]} />
                        <MeshWobbleMaterial
                            color="#2D3748"
                            factor={0.1}
                            speed={2}
                            roughness={0.1}
                            metalness={0.9}
                            emissive="#5EEAD4"
                            emissiveIntensity={0.1}
                        />
                    </mesh>

                    {/* Mic Body */}
                    <mesh position={[0, -0.8, 0]}>
                        <cylinderGeometry args={[0.4, 0.3, 2, 32]} />
                        <meshStandardMaterial
                            color="#1A202C"
                            metalness={1}
                            roughness={0.2}
                        />
                    </mesh>

                    {/* Glow Ring */}
                    <mesh position={[0, 0.2, 0]}>
                        <torusGeometry args={[0.42, 0.05, 16, 100]} />
                        <meshStandardMaterial
                            color="#5EEAD4"
                            emissive="#5EEAD4"
                            emissiveIntensity={2}
                        />
                    </mesh>

                    {/* Base Stand */}
                    <mesh position={[0, -2, 0]}>
                        <cylinderGeometry args={[0.6, 0.8, 0.3, 32]} />
                        <meshStandardMaterial
                            color="#1A202C"
                            metalness={1}
                            roughness={0.2}
                        />
                    </mesh>
                </group>
            </Float>
        </div>
    )
}
