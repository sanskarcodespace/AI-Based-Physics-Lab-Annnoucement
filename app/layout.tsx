import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { NoiseOverlay } from "@/components/noise-overlay";
import { ThemeProvider } from "@/components/theme-provider";
import { BackgroundShell } from "@/components/background-shell";
import { NeonToaster } from "@/components/ui/neon-toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Premium SaaS Platform",
  description: "Next-generation SaaS application with 3D elements",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen overflow-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 animate-grid pointer-events-none" />
            <BackgroundShell />
            <NoiseOverlay />

            {/* Main Content */}
            <main className="relative z-10">
              {children}
            </main>
          </div>
          <NeonToaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
