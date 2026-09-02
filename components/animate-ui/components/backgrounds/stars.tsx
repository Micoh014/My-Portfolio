'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

type StarsBackgroundProps = React.HTMLAttributes<HTMLDivElement> & {
  starColor?: string
  starCount?: number
}

export function StarsBackground({ className, starColor = '#000', starCount = 90, ...props }: StarsBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const stars = Array.from({ length: starCount }, (_, index) => {
      const star = document.createElement('span')
      star.className = 'star-point'
      star.style.left = `${(index * 47) % 100}%`
      star.style.top = `${(index * 83) % 100}%`
      star.style.backgroundColor = starColor
      star.style.animationDelay = `${(index % 7) * -0.45}s`
      return star
    })
    element.replaceChildren(...stars)
    return () => element.replaceChildren()
  }, [starColor, starCount])

  return <div ref={ref} aria-hidden="true" className={cn('stars-background', className)} {...props} />
}

export default StarsBackground
