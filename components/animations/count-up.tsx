"use client"
import { useEffect, useRef } from "react"
import { animate, useInView } from "framer-motion"

type CounterProps = {
  from?: number
  to: number
  animationOptions?: any
}

export function CountUp({ to, from = 0, animationOptions }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (inView && ref.current) {
      const node = ref.current
      const controls = animate(from, to, {
        duration: 1.5,
        ease: "easeOut",
        ...animationOptions,
        onUpdate(value) {
          node.textContent = Math.round(value).toLocaleString()
        },
      })
      return () => controls.stop()
    }
  }, [inView, from, to, animationOptions])

  return <span ref={ref} />
}