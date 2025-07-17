"use client"

import { useCallback } from "react"
import Particles from "react-tsparticles"
import { loadSlim } from "tsparticles/slim" // Corrected import path for loadSlim

export function ParticlesBackground() {
  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine)
  }, [])

  const particlesLoaded = useCallback(async (container: any) => {
    // console.log(container);
  }, [])

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: "transparent", // Particles will float over your existing background
          },
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: {
              enable: false, // Disable click interaction
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "grab", // Particles will react to mouse hover
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 140,
              links: {
                opacity: 1,
              },
            },
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          number: {
            value: 80, // Number of particles
            density: {
              enable: true,
              area: 800,
            },
          },
          color: {
            value: ["#4079ff", "#40ffaa"], // Blue and light green colors
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: 0.5,
            random: false,
            animation: {
              enable: false,
            },
          },
          size: {
            value: 3, // Tiny particles
            random: true,
            animation: {
              enable: false,
            },
          },
          links: {
            enable: true,
            distance: 150,
            color: "#ffffff", // White lines connecting particles
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1, // Slow, gentle movement
            direction: "none",
            random: false,
            straight: false,
            outModes: {
              default: "out",
            },
            bounce: false,
          },
        },
        detectRetina: true,
      }}
      className="absolute inset-0 z-[-1]" // Position behind all content
    />
  )
}