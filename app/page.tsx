'use client'

import { motion } from 'motion/react'
import { ArrowUpRight, GitBranch, Link2, Mail, Menu, X, MapPin, Code2, Smartphone, Monitor, Database, PenTool, ExternalLink, CheckCircle2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { BlurReveal } from '@/components/ui/blur-reveal'
import { ExpandableCard } from '@/components/ui/expandable-card'
import { HangingIdCard } from '@/components/ui/hanging-id-card'
import { CoolThemeToggle } from '@/components/ui/cool-theme-toggle'
import { StarsBackground } from '@/components/animate-ui/components/backgrounds/stars'
import { ThreeDCarousel, ThreeDCarouselItem } from '@/components/ThreeDCarousel'
import { cn } from '@/lib/utils'

const skills = [
  { label: 'Frontend', icon: Code2, items: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Tailwind CSS', 'Next.js'] },
  { label: 'Database', icon: Database, items: ['PostgreSQL', 'Supabase', 'Firebase'] },
  { label: 'Mobile', icon: Smartphone, items: ['Flutter', 'Dart', 'React Native', 'Expo'] },
  { label: 'Desktop', icon: Monitor, items: ['Electron'] },
  { label: 'Tools', icon: PenTool, items: ['Git', 'GitHub', 'VS Code', 'Figma', 'Anti-Gravity', 'Cursor'] },
]

const projectCategories: Record<'Web' | 'Mobile' | 'Desktop', ThreeDCarouselItem[]> = {
  Web: [
    {
      id: 1,
      number: "01",
      title: "PresyoFinder / PricePin",
      brand: "Web Application",
      description: "Location-aware price comparison flow that turns scattered retail price data into clearer buying decisions.",
      role: "Product design + full-stack development",
      outcome: "A location-aware comparison flow that turns scattered price data into a clearer buying decision.",
      caseStudy: "I shaped the experience around the moment a shopper needs confidence: search, compare nearby options, then save the best find. React handles the interactive interface, while Supabase and PostgreSQL provide the data foundation and Leaflet makes location useful instead of ornamental.",
      tags: ["React", "Supabase", "PostgreSQL", "Leaflet"],
      imageUrl: "/projects/presyofinder.png",
      link: "#contact",
    },
    {
      id: 2,
      number: "02",
      title: "Hertz Finance Tracker",
      brand: "Fintech Web App",
      description: "A focused budget tracking application for making everyday financial decisions clearer and calmer.",
      role: "UX direction + interface development",
      outcome: "A calmer way to understand spending without turning a daily habit into a spreadsheet.",
      caseStudy: "The design prioritizes quick capture and readable feedback. I reduced the experience to the decisions that matter most: what came in, what went out, and what is safe to spend next.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Finance"],
      imageUrl: "/projects/hertz.png",
      link: "#contact",
    },
    {
      id: 3,
      number: "03",
      title: "Interactive Portfolio V2",
      brand: "Personal Portfolio",
      description: "A modern web app with 3D physics ID card, smooth circular view transitions, and custom theme engine.",
      role: "Design system & front-end development",
      outcome: "Created a performant, high-delight portfolio with 3D physics ID card and circular view transitions.",
      caseStudy: "Built from scratch using Next.js, Framer Motion, and custom CSS variables. Features dynamic theme transitions, pendulum card physics, and clean responsive micro-interactions.",
      tags: ["Next.js", "Framer Motion", "Tailwind", "UI/UX"],
      imageUrl: "/projects/presyofinder.png",
      link: "#top",
    },
  ],
  Mobile: [
    {
      id: 4,
      number: "01",
      title: "Cheaper Comparison App",
      brand: "React Native Mobile",
      description: "A React Native mobile application built for fast, thumb-friendly product and price comparisons on the go.",
      role: "Mobile development + interaction design",
      outcome: "A mobile-first comparison experience built for fast decisions on the go.",
      caseStudy: "I focused on thumb-friendly patterns, clear product differences, and a short path from discovery to comparison. The result is an interface that keeps the useful details close without overwhelming the first screen.",
      tags: ["React Native", "Mobile", "Expo", "TypeScript"],
      imageUrl: "/projects/cheaper.png",
      link: "#contact",
    },
    {
      id: 5,
      number: "02",
      title: "Pet Village Community",
      brand: "Flutter Application",
      description: "A friendly, connected mobile community application that makes sharing pet moments welcoming and easy.",
      role: "Mobile application development",
      outcome: "A friendly community concept that makes sharing pet moments feel easy and welcoming.",
      caseStudy: "The product explores how a warm visual language and lightweight social interactions can support a niche community. I built the mobile foundation with accessibility, familiar navigation, and simple content creation in mind.",
      tags: ["Flutter", "Dart", "Firebase", "Mobile UI"],
      imageUrl: "/projects/pet-village.png",
      link: "#contact",
    },
    {
      id: 6,
      number: "03",
      title: "Waste Disposal Companion",
      brand: "IoT Mobile App",
      description: "Companion mobile application monitoring automated hardware waste segregation telemetry in real-time.",
      role: "Embedded systems + mobile UI integration",
      outcome: "A practical prototype connecting detection, physical processing, and automated control.",
      caseStudy: "This project moved beyond the screen. I connected YOLOv8-based classification with Raspberry Pi and Arduino hardware to explore a complete loop: identify material, route it, then process it with less manual intervention.",
      tags: ["Flutter", "IoT", "YOLOv8", "Computer Vision"],
      imageUrl: "/projects/pet-village.png",
      link: "#contact",
    },
  ],
  Desktop: [
    {
      id: 7,
      number: "01",
      title: "DevStation Dashboard",
      brand: "Electron Desktop",
      description: "A cross-platform Electron desktop dashboard for monitoring developer environments, microservices, and system health.",
      role: "Desktop architecture + UI design",
      outcome: "Unified local microservice monitoring into a single low-overhead desktop dashboard.",
      caseStudy: "Built to streamline developer workflows. Electron coordinates native system processes while React renders real-time CPU, memory, log streams, and service statuses.",
      tags: ["Electron", "React", "Node.js", "Desktop"],
      imageUrl: "/projects/hertz.png",
      link: "#contact",
    },
    {
      id: 8,
      number: "02",
      title: "Material Classifier GUI",
      brand: "Desktop Vision Suite",
      description: "Native desktop GUI application running computer vision models locally with hardware control & live telemetry.",
      role: "Full-stack GUI + AI integration",
      outcome: "Delivered real-time vision model feeds and hardware telemetry to desktop operators.",
      caseStudy: "Integrated PyTorch vision models with Electron IPC bridges, giving operators instant visual feedback and hardware overrides during automated sorting cycles.",
      tags: ["Electron", "Python", "Computer Vision", "Hardware"],
      imageUrl: "/projects/presyofinder.png",
      link: "#contact",
    },
  ],
}


const fadeUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.15 }, transition: { duration: 0.55 } }

function SectionLabel({ children }: { children: React.ReactNode }) { return <p className="section-label">{children}</p> }

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [activeCategory, setActiveCategory] = useState<'Web' | 'Mobile' | 'Desktop'>('Web')

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark', 'dark-mode')
      document.body.classList.add('dark', 'dark-mode')
    } else {
      document.documentElement.classList.remove('dark', 'dark-mode')
      document.body.classList.remove('dark', 'dark-mode')
    }
  }, [darkMode])
  return (
    <main className={darkMode ? 'dark-mode' : ''}>
      <header className="site-header">
        <a href="#top" className="brand" aria-label="Micoh Angelo Ojeñar home"><span>MA</span><small>Full Stack Developer</small></a>
        <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          {['About', 'Skills', 'Projects', 'Experience'].map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>)}
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
        <div className="header-tools"><CoolThemeToggle darkMode={darkMode} onToggle={(isDark) => setDarkMode(isDark)} size="sm" /><a className="header-cta" href="#contact">Let&apos;s talk <ArrowUpRight size={15} /></a></div>
        <button className="menu-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <section className="hero" id="top">
        <StarsBackground starColor={darkMode ? '#FFF' : '#000'} className={cn('hero-stars', darkMode ? 'hero-stars-dark' : 'hero-stars-light')} />
        <div className="hero-copy">
          <motion.p className="eyebrow" {...fadeUp}>AVAILABLE FOR OPPORTUNITIES <span className="status-dot" /></motion.p>
          <motion.h1 {...fadeUp} transition={{ delay: .08, duration: .55 }}><BlurReveal delay={0.08}>Building useful</BlurReveal><br /><BlurReveal delay={0.18}><em>digital things.</em></BlurReveal></motion.h1>
          <motion.p className="hero-description" {...fadeUp} transition={{ delay: .16, duration: .55 }}>I&apos;m Micoh Angelo Ojeñar, a full-stack developer focused on creating modern web and mobile applications with thoughtful interfaces and solid foundations.</motion.p>
          <motion.div className="hero-actions" {...fadeUp} transition={{ delay: .24, duration: .55 }}><a className="button button-dark" href="#projects">View projects <ArrowUpRight size={16} /></a><a className="button button-quiet" href="#contact">Contact me</a></motion.div>
          <motion.div className="socials" {...fadeUp} transition={{ delay: .32, duration: .55 }}><a href="https://github.com" target="_blank" rel="noreferrer"><GitBranch size={17} /> GitHub</a><a href="https://linkedin.com" target="_blank" rel="noreferrer"><Link2 size={17} /> LinkedIn</a><a href="#contact"><Mail size={17} /> Email</a></motion.div>
        </div>
        <motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .4, duration: .7 }} className="flex justify-center items-center py-4">
          <HangingIdCard
            name="Micoh Angelo Ojeñar"
            role="Full-Stack Developer"
            badgeId="DEV-2026"
            accentColor="#75a62d"
            avatarUrl="/profile.jpg"
            ropeLength={120}
            ropeColor={darkMode ? "#3f3f46" : "#18181b"}
          />
        </motion.div>
      </section>

      <section className="section about-section" id="about"><motion.div {...fadeUp}><SectionLabel>01 / About</SectionLabel></motion.div><div className="about-grid"><motion.h2 {...fadeUp}>A developer who cares<br /><em>how it feels to use.</em></motion.h2><motion.div className="about-body" {...fadeUp} transition={{ delay: .1, duration: .55 }}><p>I&apos;m a Computer Engineering graduate who enjoys working across the stack — from shaping an interface to designing the systems that make it work.</p><p>My work sits at the intersection of web development, mobile applications, and emerging technology. I&apos;m always learning, always building, and looking for the next real-world problem to solve.</p><div className="location"><MapPin size={16} /> Philippines <span>·</span> Open to remote</div></motion.div></div></section>

      <section className="section skills-section" id="skills"><motion.div {...fadeUp}><SectionLabel>02 / Skills</SectionLabel></motion.div><div className="skills-grid">{skills.map((skill, index) => { const Icon = skill.icon; return <motion.div className="skill-group" key={skill.label} {...fadeUp} transition={{ delay: index * .07, duration: .5 }}><div className="skill-heading"><Icon size={19} /><h3>{skill.label}</h3></div><div className="tags">{skill.items.map(item => <span key={item}>{item}</span>)}</div></motion.div> })}</div></section>

      <section className="section projects-section" id="projects">
        <motion.div className="section-intro" {...fadeUp}>
          <SectionLabel>03 / Selected work</SectionLabel>
          <h2>Featured <em>projects.</em></h2>
          <p>Real applications, experiments, and systems I&apos;ve designed and developed across platforms.</p>
        </motion.div>

        <motion.div className="flex justify-center gap-3 mb-8 flex-wrap" {...fadeUp}>
          {[
            { label: 'Web', icon: Code2 },
            { label: 'Mobile', icon: Smartphone },
            { label: 'Desktop', icon: Monitor },
          ].map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => setActiveCategory(label as 'Web' | 'Mobile' | 'Desktop')}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-semibold transition-all border cursor-pointer",
                activeCategory === label
                  ? "bg-foreground text-background border-foreground shadow-md scale-105"
                  : "bg-paper text-muted-foreground border-border hover:border-foreground hover:text-foreground"
              )}
            >
              <Icon size={15} />
              <span>{label}</span>
            </button>
          ))}
        </motion.div>

        <ThreeDCarousel items={projectCategories[activeCategory]} />
      </section>

      <section className="section experience-section" id="experience"><motion.div {...fadeUp}><SectionLabel>04 / Experience</SectionLabel></motion.div><div className="experience-row"><div><h2>People, products<br /><em>and foundations.</em></h2><p className="experience-lede">The work and education that shaped how I approach building useful software.</p></div><div className="timeline-list"><div className="timeline-item"><span className="timeline-year">2024 — 2025 · OJT</span><h3>Software Development Intern<br />PV Venture Corporation</h3><p>Supported product development across interface implementation, debugging, and practical software delivery in a collaborative team environment.</p></div><div className="timeline-item"><span className="timeline-year">EDUCATION</span><h3>Bachelor of Science in<br />Computer Engineering</h3><p>Building a foundation in software, hardware, systems, and problem solving.</p></div></div></div></section>

      <section className="section contact-section" id="contact"><motion.div {...fadeUp}><SectionLabel>05 / Contact</SectionLabel></motion.div><div className="contact-grid"><motion.div {...fadeUp}><h2>Let&apos;s build<br /><em>something together.</em></h2><p className="contact-lede">Have a project, an opportunity, or just want to say hi? My inbox is always open.</p><div className="contact-links"><a href="mailto:micoh.ojenar@example.com"><Mail size={18} /> micoh.ojenar@example.com <ArrowUpRight size={15} /></a><a href="https://github.com" target="_blank" rel="noreferrer"><GitBranch size={18} /> GitHub <ArrowUpRight size={15} /></a><a href="https://linkedin.com" target="_blank" rel="noreferrer"><Link2 size={18} /> LinkedIn <ArrowUpRight size={15} /></a></div></motion.div><motion.form className="contact-form" {...fadeUp} transition={{ delay: .1, duration: .55 }} onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}>{submitted ? <div className="form-success"><Alert><CheckCircle2 /><div><AlertTitle>Message noted.</AlertTitle><AlertDescription>This demo form isn&apos;t connected to email yet, but thanks for reaching out.</AlertDescription></div></Alert><button type="button" className="button button-dark" onClick={() => setSubmitted(false)}>Send another</button></div> : <><label>Name<input required name="name" placeholder="Your name" /></label><label>Email<input required type="email" name="email" placeholder="you@example.com" /></label><label>Message<textarea required name="message" rows={4} placeholder="Tell me a little about your project..." /></label><button className="button button-dark" type="submit">Send message <ArrowUpRight size={16} /></button><p className="form-note">This form is a demo. Prefer email? <a href="mailto:micoh.ojenar@example.com">Open your mail app instead.</a></p></>}</motion.form></div></section>

      <footer className="site-footer"><div><strong>MA.</strong><span>Micoh Angelo Ojeñar<br />Full-Stack Developer</span></div><p>© 2026 Micoh Angelo Ojeñar</p><a href="#top" className="back-top">Back to top ↑</a></footer>
    </main>
  )
}
