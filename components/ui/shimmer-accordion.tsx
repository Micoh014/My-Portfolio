'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

type ShimmerAccordionProps = { question: string; answer: string; className?: string }

export function ShimmerAccordion({ question, answer, className }: ShimmerAccordionProps) {
  return (
    <div className={cn('mt-1 text-xs', className)}>
      <p className="font-semibold text-foreground">{question}</p>
      <div className="relative mt-2 overflow-hidden rounded border border-border bg-background/60 p-2.5">
        <p className="relative z-10 text-muted-foreground leading-relaxed text-[11px]">{answer}</p>
        <motion.span aria-hidden="true" className="pointer-events-none absolute inset-0 z-0"
          style={{ background: 'linear-gradient(100deg, transparent 20%, rgba(255,255,255,0.15) 50%, transparent 80%)' }}
          initial={{ x: '-100%' }} animate={{ x: '100%' }} transition={{ duration: 0.9, ease: 'easeInOut' }} />
      </div>
    </div>
  )
}