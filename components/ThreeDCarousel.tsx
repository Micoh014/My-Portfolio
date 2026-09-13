  "use client";

  import React, {
    useRef,
    useEffect,
    useState,
    TouchEvent,
  } from "react";
  import { ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";
  import { Card, CardContent } from "@/components/ui/card";
  import { useIsMobile } from "@/components/hooks/use-mobile";
  import { ShimmerAccordion } from '@/components/ui/shimmer-accordion'


  export interface ThreeDCarouselItem {
    id: number;
    number?: string;  
    title: string;
    brand: string;
    description: string;
    role?: string;
    outcome?: string;
    caseStudy?: string;
    tags: string[];
    imageUrl: string;
    link: string;
    screenshots?: { src: string; label: string }[]
  }

  interface ThreeDCarouselProps {
    items: ThreeDCarouselItem[];
    autoRotate?: boolean;
    rotateInterval?: number;
    cardHeight?: number;
    isMobileSwipe?: boolean;
  }

  export const ThreeDCarousel = ({
    items = [],
    autoRotate = true,
    rotateInterval = 5000,
    cardHeight = 580,
    isMobileSwipe = true,
  }: ThreeDCarouselProps) => {
    const [active, setActive] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const isMobile = useIsMobile();
    const effectiveCardHeight = isMobile ? Math.min(cardHeight, 420) : cardHeight;
    const minSwipeDistance = 50;
    const [openScreenshotId, setOpenScreenshotId] = useState<number | null>(null);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null); // add this line right after
  const [isPortraitLightbox, setIsPortraitLightbox] = useState(false);

    // Reset active index when items list changes
    useEffect(() => {
      setActive(0);
    }, [items]);

    useEffect(() => {
      if (autoRotate && isInView && !isHovering && items.length > 0) {
        const interval = setInterval(() => {
          setActive((prev) => (prev + 1) % items.length);
        }, rotateInterval);
        return () => clearInterval(interval);
      }
    }, [isInView, isHovering, autoRotate, rotateInterval, items.length]);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => setIsInView(entry.isIntersecting),
        { threshold: 0.2 }
      );
      if (carouselRef.current) {
        observer.observe(carouselRef.current);
      }
      return () => observer.disconnect();
    }, []);

    const onTouchStart = (e: TouchEvent) => {
      if (!isMobileSwipe) return;
      setTouchStart(e.targetTouches[0].clientX);
      setTouchEnd(null);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isMobileSwipe) return;
      setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
      if (!isMobileSwipe || !touchStart || !touchEnd) return;
      const distance = touchStart - touchEnd;
      if (distance > minSwipeDistance) {
        setActive((prev) => (prev + 1) % items.length);
      } else if (distance < -minSwipeDistance) {
        setActive((prev) => (prev - 1 + items.length) % items.length);
      }
    };

    const getCardTransformClass = (index: number) => {
      if (index === active) {
        return "translate-x-0 scale-100 opacity-100 z-30 shadow-2xl pointer-events-auto filter-none";
      }
      if (index === (active + 1) % items.length) {
        return "translate-x-[55%] sm:translate-x-[68%] scale-[0.88] opacity-45 z-10 pointer-events-none cursor-pointer filter blur-[0.5px]";
      }
      if (index === (active - 1 + items.length) % items.length) {
        return "-translate-x-[55%] sm:-translate-x-[68%] scale-[0.88] opacity-45 z-10 pointer-events-none cursor-pointer filter blur-[0.5px]";
      }
      return "translate-x-0 scale-75 opacity-0 z-0 pointer-events-none";
    };

    if (!items || items.length === 0) return null;

    return (
      <section
        id="ThreeDCarousel"
        className="bg-transparent w-full mx-auto flex flex-col items-center justify-center py-2 overflow-hidden select-none"
      >
        <div className="w-full max-w-5xl px-4 sm:px-6">
          <div
            className="relative h-[480px] sm:h-[560px] md:h-[620px] w-full flex items-center justify-center"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            ref={carouselRef}
          >
            {/* Card Stack Container */}
            <div className="relative w-full h-full flex items-center justify-center">
              {items.map((item, index) => {
                const isActive = index === active;
                return (
                  <div
                    key={item.id}
                    onClick={() => !isActive && setActive(index)}
                    className={`absolute w-full max-w-[350px] sm:max-w-[440px] transition-all duration-500 ease-out transform-gpu ${getCardTransformClass(
                      index
                    )}`}
                  >
                  <Card
    style={{ height: `${effectiveCardHeight}px` }}
                      className="relative overflow-hidden bg-paper text-foreground border border-border rounded-xl shadow-lg flex flex-col justify-between"
                    >
                      {/* Dim Overlay for inactive cards */}
                      {!isActive && (
                        <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px] z-30 pointer-events-none transition-opacity duration-300" />
                      )}

                      {/* Image Header */}
                      <div
  className="relative bg-slate-900 p-5 flex items-start justify-between h-40 sm:h-56 md:h-64 overflow-hidden shrink-0"
  style={{
    backgroundImage: `url(${item.imageUrl})`, 
    backgroundSize: "cover",
    backgroundPosition: "center",
    }}
  >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
                        <span className="relative z-10 font-mono text-xs font-bold text-white/80 bg-black/40 px-2 py-0.5 rounded border border-white/20">
                          {item.number || `0${index + 1}`}
                        </span>

                        <div className="absolute bottom-3 left-4 right-4 z-10">
                          <span className="inline-block px-2 py-0.5 mb-1 text-[10px] font-mono tracking-widest uppercase bg-primary text-slate-950 font-bold rounded">
                            {item.brand}
                          </span>
                          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
                            {item.title}
                          </h3>
                        </div>
                      </div>

                      {/* Card Content Body */}
                      <CardContent
    className="p-5 flex flex-col flex-grow justify-between bg-paper overflow-y-auto"
    style={{ scrollbarGutter: "stable" }}
  >
                        <div>
                          <p className="text-muted-foreground text-xs leading-relaxed mb-3">
                            {item.description}
                          </p>

                          {/* Case Study Details Section */}
                          {(item.role || item.outcome || item.caseStudy) && (
                            <div className="case-study my-2 py-2 border-y border-border flex flex-col gap-2 text-xs">
                              {item.role && (
                                <div className="grid grid-cols-[68px_1fr] gap-2">
                                  <span className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
                                    MY ROLE
                                  </span>
                                  <p className="text-foreground text-xs leading-tight">
                                    {item.role}
                                  </p>
                                </div>
                              )}

                              {item.outcome && (
                                <div className="grid grid-cols-[68px_1fr] gap-2">
                                  <span className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
                                    OUTCOME
                                  </span>
                                  <p className="text-foreground text-xs leading-tight">
                                    {item.outcome}
                                  </p>
                                </div>
                              )}
                            </div>
                          )}

  {item.caseStudy && <ShimmerAccordion question="Read case study" answer={item.caseStudy} />}
    
  {item.screenshots && item.screenshots.length > 0 && (
    <div className="mt-2">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpenScreenshotId(
            openScreenshotId === item.id ? null : item.id
          );
        }}
        className="text-left text-xs font-semibold text-foreground hover:underline cursor-pointer"
      >
        View screenshots →
      </button>

      {openScreenshotId === item.id && (
        <div className="mt-2 flex flex-wrap gap-2">
          {item.screenshots.map((s) => (
            <img
              key={s.src}
              src={s.src}
              alt={s.label}
              onClick={(e) => {
                e.stopPropagation();
                setLightboxSrc(s.src);
              }}
              className="w-14 h-10 object-cover rounded border border-border cursor-pointer hover:opacity-80 transition-opacity"
            />
          ))}
        </div>
      )}
    </div>
  )}

  </div>

  {/* Tags & Action Link Footer */}
  <div className="mt-3 pt-2 border-t border-border/60 flex items-center justify-between gap-2">
                          <div className="flex flex-wrap gap-1">
                            {item.tags.map((tag, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 bg-background text-muted-foreground border border-border rounded text-[10px] font-mono"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          <a
                            href={item.link}
                            aria-label={`Ask about ${item.title}`}
                            className="p-2 border border-border rounded hover:border-foreground hover:text-foreground text-muted-foreground transition-colors shrink-0"
                            onClick={(e) => {
                              if (!isActive) {
                                e.preventDefault();
                                setActive(index);
                              }
                            }}
                          >
                            <ExternalLink size={15} />
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>

            {/* Navigation Controls */}
            {!isMobile && items.length > 1 && (
              <>
                <button
                  className="absolute -left-2 sm:left-2 top-1/2 -translate-y-1/2 w-11 h-11 bg-paper border border-border text-foreground rounded-full flex items-center justify-center shadow-lg hover:bg-foreground hover:text-background z-40 transition-all hover:scale-110 cursor-pointer"
                  onClick={() =>
                    setActive((prev) => (prev - 1 + items.length) % items.length)
                  }
                  aria-label="Previous Project"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  className="absolute -right-2 sm:right-2 top-1/2 -translate-y-1/2 w-11 h-11 bg-paper border border-border text-foreground rounded-full flex items-center justify-center shadow-lg hover:bg-foreground hover:text-background z-40 transition-all hover:scale-110 cursor-pointer"
                  onClick={() => setActive((prev) => (prev + 1) % items.length)}
                  aria-label="Next Project"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Indicators */}
            {items.length > 1 && (
              <div className="absolute bottom-1 left-0 right-0 flex justify-center items-center space-x-2 z-40">
                {items.map((_, idx) => (
                  <button
                    key={idx}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${active === idx
                      ? "bg-foreground w-6"
                      : "bg-border hover:bg-muted-foreground w-2"
                      }`}
                    onClick={() => setActive(idx)}
                    aria-label={`Go to project ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

 {lightboxSrc && (
  <div className="expandable-overlay" onClick={() => setLightboxSrc(null)}>
    <div
      className={`expandable-panel${isPortraitLightbox ? " expandable-panel-portrait" : ""}`}
      onClick={(e) => e.stopPropagation()}
    >
      <button className="expandable-close" onClick={() => setLightboxSrc(null)} aria-label="Close">
        <X size={16} />
      </button>
      <img
        src={lightboxSrc}
        alt="Screenshot"
        className="lightbox-image"
        onLoad={(e) => {
          const img = e.currentTarget;
          const portrait = img.naturalHeight > img.naturalWidth;
          img.classList.toggle("lightbox-portrait", portrait);
          setIsPortraitLightbox(portrait);
        }}
      />
    </div>
  </div>
)}

      </section>
    );
  };

  export default ThreeDCarousel;
