'use client'

import { motion } from 'motion/react'
import { ArrowUpRight, GitBranch, Link2, Mail, Menu, X, MapPin, Code2, Smartphone, Monitor, Database, PenTool, ExternalLink, CheckCircle2, Wrench } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { BlurReveal } from '@/components/ui/blur-reveal'
import { ExpandableCard } from '@/components/ui/expandable-card'
import { HangingIdCard } from '@/components/ui/hanging-id-card'
import { StarsBackground } from '@/components/animate-ui/components/backgrounds/stars'
import { ThreeDCarousel, ThreeDCarouselItem } from '@/components/ThreeDCarousel'
import { cn } from '@/lib/utils'
import CoolSlideGallery from "@/components/lightswind/cool-slide-gallery"
import { TypingText } from '@/components/lightswind/typing-text';
import { Switch } from "@/components/lightswind/switch"
import { useRef } from 'react' // add useRef to your existing React import line
import { SiUdemy } from "react-icons/si"
import { FaAws } from "react-icons/fa"

const slides = [
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    title: "Alpine Summit",
    subtitle: "Swiss Alps, 2024",
    badge: "Featured",
  },
  {
    src: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800",
    title: "Forest Trail",
    subtitle: "Oregon, USA",
    badge: "Nature",
  },
];

export function Demo() {
  return (
    <div className="w-full h-[560px] flex items-center justify-center">
      <CoolSlideGallery
        slides={slides}
        cardWidth={360}
        cardHeight={420}
        showTitle
        showArrows
        showDots
        draggable
        autoplay={false}
        easing="smooth"
        onSlideChange={(i, slide) => console.log("Active:", slide.title)}
      />
    </div>
  );
}

const skills = [
  { label: 'Frontend', icon: Code2, items: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Tailwind CSS', 'Next.js', 'ESLint', 'Prettier'] },
  { label: 'Database', icon: Database, items: ['Node.js', 'PostgreSQL', 'Supabase', 'Firebase', 'SQLite', 'Express'] },
  { label: 'Mobile', icon: Smartphone, items: ['Flutter', 'Dart', 'React Native', 'Expo'] },
  { label: 'Desktop', icon: Monitor, items: ['Electron'] },
  { label: 'AI Tools', icon: Wrench, items: ['Claude Code', 'Codex', 'Cursor', 'V0'] },
  { label: 'Developer Tools', icon: PenTool, items: ['Git', 'GitHub', 'VS Code', 'Figma', 'Anti-Gravity'] },
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

  ],
  Mobile: [
    {
      id: 3,
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
      id: 4,
      number: "02",
      title: "Pet Village",
      brand: "Mobile Application",
      description: "A mobile app that helps pet owners find product deals, special offers, and pet care content.",
      role: "Mobile application development and UI design",
      outcome: "Gave Pet Village customers one simple place to browse deals, sign in, and connect with the brand.",
      caseStudy: "Built with Flutter for Android and iOS. The app shows live product deals from WooCommerce, promotions and videos, customer accounts, notifications, and a rewards section for future use.",
      screenshots: [
    { src: "/projects/Pet Village/Onboard.jpg", label: "Onboard" },
    { src: "/projects/Pet Village/Home.jpg", label: "Home" },
    { src: "/projects/Pet Village/Home 2.jpg", label: "Home 2" },
    { src: "/projects/Pet Village/All.jpg", label: "All" },
    { src: "/projects/Pet Village/Time Limited Deals.jpg", label: "Time Limited Deals" },
    { src: "/projects/Pet Village/Others.jpg", label: "Others" },
    { src: "/projects/Pet Village/Pet Food.jpg", label: "Pet Food" },
    { src: "/projects/Pet Village/Small Pet Treats.jpg", label: "Small Pet Treats" },
    { src: "/projects/Pet Village/Travel Essential.jpg", label: "Travel Essential" },
     { src: "/projects/Pet Village/Reward.jpg", label: "Reward" },
    { src: "/projects/Pet Village/Account.jpg", label: "Account" },

  ],
      tags: ["Flutter", "Dart", "Firebase", "WooCommerce", "REST API"],
      imageUrl: "/projects/Pet Village/Onboard.jpg",
      link: "#contact",
    }
  ],
  Desktop: [
    {
      id: 5,
      number: "01",
      title: "Inventory System",
      brand: "Electron Desktop Application",
      description: "A desktop app for a shop to manage products, stock, sales, and staff.",
      role: "Full-stack development+ UI design",
      outcome: "Made it easier to track stock, sales, profit, and low-stock items in one place.",
      caseStudy: "Built for a small shop. Staff can add products, record stock deliveries and sales, print receipts, scan barcodes, manage returns, and view reports. The app works offline and saves data in a local SQLite database.",
      screenshots: [
    { src: "/projects/Inventory System/Dashboard.png", label: "Dashboard" },
    { src: "/projects/Inventory System/Sell.png", label: "Sell" },
    { src: "/projects/Inventory System/Return.png", label: "Returns" },
    { src: "/projects/Inventory System/Products.png", label: "Products" },
    { src: "/projects/Inventory System/Purchase Order.png", label: "Purchase Orders" },
    { src: "/projects/Inventory System/Adjust Stock.png", label: "Adjust Stock" },
    { src: "/projects/Inventory System/Customers.png", label: "Customers" },
    { src: "/projects/Inventory System/Reports.png", label: "Reports" },
    { src: "/projects/Inventory System/Settings.png", label: "Settings" },
    { src: "/projects/Inventory System/Stock In.png", label: "Stock In" },
  ],
      tags: ["Electron", "React", "Node.js", "Express", "SQLite"],
      imageUrl: "/projects/Inventory System/Intro.png",
      link: "#contact",
    },
  ],
}

type Certificate = { title: string; issuer: string; category: string; link: string }

const certificates: Certificate[] = [
    
  { title: "Mastering AI on AWS — AI Practitioner", issuer: "AWS", category: "AI Tools", link: "https://www.udemy.com/certificate/UC-a8ad6edb-15ad-4f8d-88f6-46db70b44c91/" },
  { title: "Mastering React: React Crash Course with Mini Projects", issuer: "Udemy", category: "Frontend", link: "https://www.udemy.com/certificate/UC-ee80ca5d-bd33-4c21-b99f-8e929b7234f6/" },  
  { title: "[2025 Edition] Learn Git in Less Than 3 Hours", issuer: "Udemy", category: "Developer Tools", link: "https://www.udemy.com/certificate/UC-8e6a697f-d931-4849-9a95-831e065c0431/" },
  { title: "JavaScript Mastery From Basics to Advanced 2025", issuer: "Udemy", category: "Frontend", link: "https://www.udemy.com/certificate/UC-3198e368-4d14-445b-994b-58a25a57dfa2/" },
  { title: "GIT, Gitlab, Github Fundamentals for Software Developers", issuer: "Udemy", category: "Developer Tools", link: "https://www.udemy.com/certificate/UC-37691223-6457-46f8-94bb-9023a653b615/" },
  { title: "HTML - The Complete Guide to HTML for Beginners", issuer: "Udemy", category: "Frontend", link: "https://www.udemy.com/certificate/UC-db6d5f7b-f9a7-418b-be8b-d31ab0d6856a/" },
  { title: "The Ultimate SQL Bootcamp: Go From Zero to Hero", issuer: "Udemy", category: "Database", link: "https://www.udemy.com/certificate/UC-ee7455f1-9abb-4706-b56d-2f3ca06c618f/" },
  { title: "Web Design Course for Beginners to Intermediate", issuer: "Udemy", category: "Frontend", link: "https://www.udemy.com/certificate/UC-99f35481-12f4-4960-93e0-5a9890820cc5/" },
  { title: "Figma to Angular Mastery: Design to Code with AI", issuer: "Udemy", category: "Developer Tools", link: "https://www.udemy.com/certificate/UC-08af33d4-8ff3-4044-8c54-ef0eb5384f42/" },
  { title: "CSS Fundamentals: Comprehensive Training for Web Developers", issuer: "Udemy", category: "Frontend", link: "https://www.udemy.com/certificate/UC-0e5b2b98-0344-499d-8dcb-db07ded83f6f/" },
  { title: "Java Programming Masterclass - Beginners to Master", issuer: "Udemy", category: "Programming Language", link: "https://www.udemy.com/certificate/UC-9c21cea8-d410-4017-bcdf-7f3f863613d8/" },
  { title: "CSS - The Complete Guide to CSS for Beginners", issuer: "Udemy", category: "Frontend", link: "https://www.udemy.com/certificate/UC-aee670d0-5d60-4ad9-83e7-29b986e112e3/" },
  { title: "The Ultimate Python Developer Course: Learn Step by Step", issuer: "Udemy", category: "Programming Language", link: "https://www.udemy.com/certificate/UC-e6248a2e-4419-4f8e-97fc-0b72b8da2b06/" },
]

const certCategories = Array.from(new Set(certificates.map(c => c.category)))

const fadeUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.15 }, transition: { duration: 0.55 } }

function SectionLabel({ children }: { children: React.ReactNode }) { return <p className="section-label">{children}</p> }

function IssuerBadge({ issuer }: { issuer: string }) {
  const config: Record<string, { icon: React.ElementType; bg: string; fg: string }> = {
    AWS: { icon: FaAws, bg: "#ffffff", fg: "#FF9900" },
    Udemy: { icon: SiUdemy, bg: "#ffffff", fg: "#A435F0" },
  }
  const entry = config[issuer]
  if (!entry) return null
  const Icon = entry.icon
  return (
    <span className="cert-badge" style={{ backgroundColor: entry.bg }}>
      <Icon size={18} color={entry.fg} />
    </span>
  )
}

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [activeCategory, setActiveCategory] = useState<'Web' | 'Mobile' | 'Desktop'>('Web')
  const themeToggleRef = useRef<HTMLDivElement>(null)

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
        <a href="#top" className="brand" aria-label="Micoh Angelo Ojeñar home"><span>MO</span><small>Full-Stack Developer</small></a>
        <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          {['About', 'Skills', 'Projects', 'Certificate', 'Experience'].map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>)}
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
        <div className="header-tools"><Switch
  checked={darkMode}
  onCheckedChange={setDarkMode}
  trackColor={darkMode ? '#ffffffff' : '#000000ff'}
  thumbColor={darkMode ? '#000000ff' : '#ffffffff'}
  size="sm" 
/></div>
        <button className="menu-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <section className="hero" id="top">
        <StarsBackground starColor={darkMode ? '#FFF' : '#000'} className={cn('hero-stars', darkMode ? 'hero-stars-dark' : 'hero-stars-light')} />
        <div className="hero-copy">
          <motion.p className="eyebrow" {...fadeUp}>AVAILABLE FOR OPPORTUNITIES <span className="status-dot" /></motion.p>
          <TypingText
  as="h1"
  delay={0.3}
  duration={1.5}
  fontSize="text-[clamp(54px,7.5vw,112px)]"
  fontWeight="font-[650]"
  color="text-foreground"
  letterSpacing="tracking-[-.085em]"
>
  Building useful digital things.
</TypingText>
          <motion.p className="hero-description" {...fadeUp} transition={{ delay: .16, duration: .55 }}>I&apos;m Micoh Angelo Ojeñar, a full-stack developer focused on creating modern web and mobile applications with thoughtful interfaces and solid foundations.</motion.p>
          <motion.div className="hero-actions" {...fadeUp} transition={{ delay: .24, duration: .55 }}>
  <a className="button button-dark" href="#projects">View projects <ArrowUpRight size={16} /></a>
  <a className="button button-quiet" href="#contact">Contact me</a>
  <a className="button button-quiet" href="/resume.pdf" download>Download resume</a>
</motion.div>
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

     <section className="section certifications-section" id="certifications">
  <motion.div className="section-intro" {...fadeUp}>
    <SectionLabel>04 / Certifications</SectionLabel>
    <h2>Credentials <em>earned.</em></h2>
  </motion.div>
  {certCategories.map((category) => (
    <div key={category} className="cert-category">
      <p className="eyebrow">{category.toUpperCase()}</p>
      <div className="cert-grid">
        {certificates.filter(c => c.category === category).map((cert) => (
          <a key={cert.title} href={cert.link} target="_blank" rel="noreferrer" className="cert-card">
  <IssuerBadge issuer={cert.issuer} />
  <h4>{cert.title}</h4>
  <span>{cert.issuer}</span>
  <p className="cert-verify">Verify <ExternalLink size={12} /></p>
</a>
        ))}
      </div>
    </div>  
  ))}
</section>

      <section className="section experience-section" id="experience"><motion.div {...fadeUp}><SectionLabel>05 / Experience</SectionLabel></motion.div><div className="experience-row"><div><h2>People, products<br /><em>and foundations.</em></h2><p className="experience-lede">The work and education that shaped how I approach building useful software.</p></div><div className="timeline-list"><div className="timeline-item"><span className="timeline-year">2024 — 2025 · OJT</span><h3>Software Development Intern<br />PV Venture Corporation</h3><p>Supported product development across interface implementation, debugging, and practical software delivery in a collaborative team environment.</p></div><div className="timeline-item"><span className="timeline-year">EDUCATION</span><h3>Bachelor of Science in<br />Computer Engineering</h3><p>Building a foundation in software, hardware, systems, and problem solving.</p></div></div></div></section>

      <section className="section contact-section" id="contact"><motion.div {...fadeUp}><SectionLabel>06 / Contact</SectionLabel></motion.div><div className="contact-grid"><motion.div {...fadeUp}><h2>Let&apos;s build<br /><em>something together.</em></h2><p className="contact-lede">Have a project, an opportunity, or just want to say hi? My inbox is always open.</p><div className="contact-links"><a href="mailto:micohangelo14@gmail.com"><Mail size={18} /> micohangelo14@gmail.com <ArrowUpRight size={15} /></a><a href="https://github.com" target="_blank" rel="noreferrer"><GitBranch size={18} /> GitHub <ArrowUpRight size={15} /></a><a href="https://linkedin.com" target="_blank" rel="noreferrer"><Link2 size={18} /> LinkedIn <ArrowUpRight size={15} /></a></div></motion.div><motion.form className="contact-form" {...fadeUp} transition={{ delay: .1, duration: .55 }} onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}>{submitted ? <div className="form-success"><Alert><CheckCircle2 /><div><AlertTitle>Message noted.</AlertTitle><AlertDescription>This demo form isn&apos;t connected to email yet, but thanks for reaching out.</AlertDescription></div></Alert><button type="button" className="button button-dark" onClick={() => setSubmitted(false)}>Send another</button></div> : <><label>Name<input required name="name" placeholder="Your name" /></label><label>Email<input required type="email" name="email" placeholder="you@example.com" /></label><label>Message<textarea required name="message" rows={4} placeholder="Tell me a little about your project..." /></label><button className="button button-dark" type="submit">Send message <ArrowUpRight size={16} /></button><p className="form-note">This form is a demo. Prefer email? <a href="mailto:micohangelo14@gmail.com">Open your mail app instead.</a></p></>}</motion.form></div></section>

      <section className="section github-section" id="github">
  <motion.div className="section-intro" {...fadeUp}>
    <SectionLabel>07 / Activity</SectionLabel>
    <h2>Building <em>in public.</em></h2>
  </motion.div>
<div className="github-chart-wrapper">
  <a href="https://github.com/Micoh014" target="_blank" rel="noreferrer">
    <img
      src={`https://ghchart.rshah.org/${darkMode ? 'c8ef52' : '191b18'}/Micoh014`}
      alt="Micoh014's GitHub contribution graph"
      className="github-chart"
    />
  </a>
</div>
</section>

      <footer className="site-footer"><div><strong>MO.</strong><span>Micoh Angelo Ojeñar<br />Full-Stack Developer</span></div><p>© 2026 Micoh Angelo Ojeñar</p><a href="#top" className="back-top">Back to top ↑</a></footer>
    </main>
  )
}
