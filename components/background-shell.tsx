"use client"

import dynamic from "next/dynamic";
import React, { Suspense } from "react";

const ThreeSceneBackground = dynamic(
    () => import("@/components/three-scene-background").then((mod) => mod.ThreeSceneBackground),
    { ssr: false }
);

export const BackgroundShell = () => {
    return (
        <Suspense fallback={<div className="fixed inset-0 bg-[#0B1020]" />}>
            <ThreeSceneBackground />
        </Suspense>
    );
};
