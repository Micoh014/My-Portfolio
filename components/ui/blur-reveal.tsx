'use client'

import { motion } from 'motion/react'
import type { ComponentProps } from 'react'

export function BlurReveal({ delay = 0, className, children, ...props }: ComponentProps<typeof motion.span> & { delay?: number }) {
  return <motion.span className={className} initial={{ opacity: 0, filter: 'blur(10px)', y: 8 }} animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }} transition={{ delay, duration: 0.65, ease: 'easeOut' }} {...props}>{children}</motion.span>
}
