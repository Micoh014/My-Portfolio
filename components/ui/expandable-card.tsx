'use client'

import { useState } from 'react'
import { ArrowUpRight, X } from 'lucide-react'
import { cn } from '@/lib/utils'

type ExpandableCardProps = { title: string; src: string; description: string; children: React.ReactNode; className?: string; classNameExpanded?: string }

export function ExpandableCard({ title, src, description, children, className, classNameExpanded }: ExpandableCardProps) {
  const [open, setOpen] = useState(false)
  return <>
    <button type="button" className={cn('expandable-card', className)} onClick={() => setOpen(true)} aria-label={`Open ${title} case study`}>
      <img src={src} alt="" /><span><small>{description}</small><strong>{title}</strong></span><ArrowUpRight size={18} aria-hidden="true" />
    </button>
    {open && <div className="expandable-overlay" role="dialog" aria-modal="true" aria-label={`${title} case study`}><div className={cn('expandable-panel', classNameExpanded)}><button className="expandable-close" type="button" onClick={() => setOpen(false)} aria-label="Close case study"><X size={18} /></button><img src={src} alt={`${title} project preview`} /><p className="project-type">{description}</p><h3>{title}</h3><div className="expandable-copy">{children}</div></div></div>}
  </>
}
