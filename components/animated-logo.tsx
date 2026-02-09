"use client"

import React from "react"
import { motion } from "framer-motion"

export const AnimatedLogo = ({ className }: { className?: string }) => {
    return (
        <motion.div
            className={className}
            initial="hidden"
            animate="visible"
        >
            <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-[0_0_8px_rgba(94,234,212,0.5)]"
            >
                <motion.path
                    d="M24 4L4 14V34L24 44L44 34V14L24 4Z"
                    stroke="#5EEAD4"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    variants={{
                        hidden: { pathLength: 0, opacity: 0 },
                        visible: {
                            pathLength: 1,
                            opacity: 1,
                            transition: { duration: 1.5, ease: "easeInOut" }
                        }
                    }}
                />
                <motion.path
                    d="M24 12V36M12 24H36"
                    stroke="#A78BFA"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    variants={{
                        hidden: { pathLength: 0, opacity: 0 },
                        visible: {
                            pathLength: 1,
                            opacity: 1,
                            transition: { duration: 1.2, delay: 0.5, ease: "easeInOut" }
                        }
                    }}
                />
                <motion.circle
                    cx="24"
                    cy="24"
                    r="4"
                    fill="#5EEAD4"
                    variants={{
                        hidden: { scale: 0, opacity: 0 },
                        visible: {
                            scale: 1,
                            opacity: 1,
                            transition: { type: "spring", damping: 12, delay: 1.2 }
                        }
                    }}
                />
            </svg>
        </motion.div>
    )
}
