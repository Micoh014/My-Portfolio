"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Sun, Moon, Cloud, Star } from "lucide-react";
import { flushSync } from "react-dom";
import { cn } from "@/lib/utils";

interface CoolThemeToggleProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  darkMode?: boolean;
  onToggle?: (isDark: boolean) => void;
}

export function CoolThemeToggle({
  className,
  size = "md",
  darkMode: externalDarkMode,
  onToggle,
}: CoolThemeToggleProps) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Synchronize state with document.documentElement
  useEffect(() => {
    setMounted(true);
    const initialDark =
      externalDarkMode ?? document.documentElement.classList.contains("dark");
    setIsDark(initialDark);

    const observer = new MutationObserver(() => {
      const currentDark =
        document.documentElement.classList.contains("dark") ||
        document.documentElement.classList.contains("dark-mode");
      setIsDark(currentDark);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [externalDarkMode]);

  // Inject style override for view transitions if not already present
  useEffect(() => {
    let styleElement = document.getElementById(
      "toggle-theme-vt-override"
    ) as HTMLStyleElement;
    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = "toggle-theme-vt-override";
      styleElement.textContent = `
        ::view-transition-old(root),
        ::view-transition-new(root) {
          animation: none;
          mix-blend-mode: normal;
        }
      `;
      document.head.appendChild(styleElement);
    }
  }, []);

  const toggleTheme = useCallback(async () => {
    const nextDark = !isDark;

    const applyThemeChange = () => {
      setIsDark(nextDark);
      if (nextDark) {
        document.documentElement.classList.add("dark", "dark-mode");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark", "dark-mode");
        localStorage.setItem("theme", "light");
      }
      if (onToggle) onToggle(nextDark);
    };

    // If View Transitions API is not supported by the browser, fallback gracefully
    if (!buttonRef.current || !document.startViewTransition) {
      applyThemeChange();
      return;
    }

    // Trigger View Transition with Circle-Spread animation
    const transition = document.startViewTransition(() => {
      flushSync(() => {
        applyThemeChange();
      });
    });

    await transition.ready;

    const { left, top, width, height } =
      buttonRef.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top)
    );

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 500,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  }, [isDark, onToggle]);

  const sizes = {
    sm: {
      button: "w-12 h-6",
      thumb: "w-4 h-4",
      icon: "w-2.5 h-2.5",
      padding: "p-1",
      translateX: 24,
      cloudSize: "w-3 h-3",
    },
    md: {
      button: "w-16 h-8",
      thumb: "w-6 h-6",
      icon: "w-4 h-4",
      padding: "p-1",
      translateX: 32,
      cloudSize: "w-5 h-5",
    },
    lg: {
      button: "w-20 h-10",
      thumb: "w-8 h-8",
      icon: "w-5 h-5",
      padding: "p-1",
      translateX: 40,
      cloudSize: "w-6 h-6",
    },
  };

  const currentSize = sizes[size];

  if (!mounted) {
    return (
      <div
        className={cn(
          "inline-flex rounded-full bg-slate-200 dark:bg-slate-800",
          currentSize.button,
          className
        )}
      />
    );
  }

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      className={cn(
        "relative rounded-full transition-colors duration-500 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 overflow-hidden cursor-pointer select-none",
        isDark ? "bg-slate-900" : "bg-sky-300",
        currentSize.button,
        currentSize.padding,
        className
      )}
      aria-label="Toggle theme"
      type="button"
    >
      {/* Background elements (Clouds / Stars) */}
      <div className="absolute inset-0 z-0 overflow-hidden rounded-full pointer-events-none">
        {/* Light Mode Cloud */}
        <motion.div
          initial={false}
          animate={{
            opacity: isDark ? 0 : 1,
            y: isDark ? 10 : 0,
          }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 flex items-center justify-end pr-2 text-white"
        >
          <Cloud className={cn("text-white/90 fill-white/90", currentSize.cloudSize)} />
        </motion.div>

        {/* Dark Mode Stars */}
        <motion.div
          initial={false}
          animate={{
            opacity: isDark ? 1 : 0,
            y: isDark ? 0 : -10,
          }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 flex items-center justify-start pl-2"
        >
          <div className="relative w-full h-full">
            <Star
              className={cn(
                "absolute top-1 left-2 text-yellow-100 fill-yellow-100 opacity-70",
                size === "lg" ? "w-2 h-2" : "w-1 h-1"
              )}
            />
            <Star
              className={cn(
                "absolute bottom-2 left-4 text-yellow-100 fill-yellow-100 opacity-50",
                size === "lg" ? "w-3 h-3" : "w-1.5 h-1.5"
              )}
            />
            <Star
              className={cn(
                "absolute top-3 left-6 text-yellow-100 fill-yellow-100 opacity-90",
                size === "lg" ? "w-1.5 h-1.5" : "w-1 h-1"
              )}
            />
          </div>
        </motion.div>
      </div>

      {/* Toggle Thumb */}
      <motion.div
        layout
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
        className={cn(
          "relative z-10 flex items-center justify-center rounded-full shadow-md",
          isDark ? "bg-slate-800 border border-slate-700" : "bg-yellow-400 border border-yellow-300",
          currentSize.thumb
        )}
        animate={{
          x: isDark ? currentSize.translateX : 0,
        }}
      >
        <div className="relative flex items-center justify-center w-full h-full">
          {/* Sun */}
          <motion.div
            initial={false}
            animate={{
              rotate: isDark ? 180 : 0,
              scale: isDark ? 0 : 1,
              opacity: isDark ? 0 : 1,
            }}
            transition={{ duration: 0.4 }}
            className="absolute"
          >
            <Sun className={cn("text-white fill-white/20", currentSize.icon)} />
          </motion.div>

          {/* Moon */}
          <motion.div
            initial={false}
            animate={{
              rotate: isDark ? 0 : -180,
              scale: isDark ? 1 : 0,
              opacity: isDark ? 1 : 0,
            }}
            transition={{ duration: 0.4 }}
            className="absolute flex items-center justify-center"
          >
            <Moon className={cn("text-yellow-200 fill-yellow-200", currentSize.icon)} />
          </motion.div>
        </div>
      </motion.div>
    </button>
  );
}

export default CoolThemeToggle;
