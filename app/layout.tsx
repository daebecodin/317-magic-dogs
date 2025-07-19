import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import "../styles/PixelTransition.css"
import "../styles/CircularGallery.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ParticlesBackground } from "@/components/particles-background"
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "OnlyPets - Helping Every Pet Find Their Forever Home",
  description:
    "We connect at-risk pets in high-kill shelters with a network of vetted, loving animal rescues. Together, we can give every pet a chance at a happy life.",
  keywords: "pet rescue, animal shelter, pet adoption, pet matching, rescue organizations, dogs, cats, rabbits, birds, reptiles, onlypets",
  authors: [{ name: "OnlyPets Team" }],
  openGraph: {
    title: "OnlyPets - Helping Every Pet Find Their Forever Home",
    description: "Connecting at-risk pets with loving rescue organizations",
    type: "website",
    url: "https://onlypets.com",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3040479527190148"
          crossOrigin="anonymous"></script>
      </head>
      <body className={inter.className} suppressHydrationWarning={true}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <ParticlesBackground />
          <div className="min-h-screen flex flex-col relative z-0">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}