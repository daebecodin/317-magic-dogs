import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ParticlesBackground } from "@/components/particles-background"
import { Background3DModel } from "@/components/background-3d-model" // Import the new component

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SafeDawgs - Saving Dogs Through Smarter Rescue Matching",
  description:
    "We connect at-risk dogs in high-kill shelters with a network of vetted, loving animal rescues. Together, we can give every dog a chance at a happy life.",
  keywords: "dog rescue, animal shelter, pet adoption, dog matching, rescue organizations",
  authors: [{ name: "SafeDawgs Team" }],
  openGraph: {
    title: "SafeDawgs - Saving Dogs Through Smarter Rescue Matching",
    description: "Connecting at-risk dogs with loving rescue organizations",
    type: "website",
    url: "https://safedawgs.com",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Background3DModel /> {/* Add the 3D model background here */}
        <ParticlesBackground />
        <div className="min-h-screen flex flex-col relative z-0"> {/* Ensure content is above particles */}
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}