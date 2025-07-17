"use client"

import { useEffect, useState } from "react"

export function Background3DModel() {
  // State to ensure the iframe only renders on the client side
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null // Render nothing on the server
  }

  return (
    <div className="fixed inset-0 overflow-hidden z-[-2]">
      <iframe
        title="Lowpoly Dogs Pack"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; fullscreen; xr-spatial-tracking"
        xr-spatial-tracking
        execution-while-out-of-viewport
        execution-while-not-rendered
        web-share
        className="w-full h-full transform scale-[1.5] origin-center pointer-events-none" // Scale to make dogs bigger
        src="https://sketchfab.com/models/183ca044e42543a68fa0ec5ef9b7584d/embed?autostart=1&camera=0&preload=1&transparent=1&ui_hint=0"
      >
      </iframe>
    </div>
  )
}