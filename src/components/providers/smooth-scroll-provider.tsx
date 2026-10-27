"use client";

import { MOTION } from "@/lib/motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import React, { createContext, useContext, useEffect, useMemo, useRef } from "react";

interface SmoothScrollContextType {
    lenis: Lenis | null;
    scrollTo: (target: string | number | HTMLElement, options?: Parameters<Lenis["scrollTo"]>[1]) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
    lenis: null,
    scrollTo: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        const isReducedMotion = reducedMotionQuery.matches;

        const lenis = new Lenis({
            duration: isReducedMotion ? 0 : MOTION.duration.scroll,
            easing: isReducedMotion ? (t) => t : (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: !isReducedMotion,
            wheelMultiplier: 1,
            touchMultiplier: 1.2,
            autoRaf: false,
        });

        lenisRef.current = lenis;
        (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

        lenis.on("scroll", ScrollTrigger.update);

        const handleTicker = (time: number) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(handleTicker);
        gsap.ticker.lagSmoothing(500, 33);

        const handleAnchorClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement | null;
            const anchor = target?.closest<HTMLAnchorElement>('a[href*="#"]');
            if (!anchor) return;

            const href = anchor.getAttribute("href");
            if (!href) return;

            const hashIndex = href.indexOf("#");
            if (hashIndex === -1) return;

            const hash = href.substring(hashIndex);
            if (hash === "#" || hash === "") return;

            const isSamePage =
                anchor.pathname === window.location.pathname ||
                anchor.href.startsWith(window.location.origin + window.location.pathname);

            if (isSamePage) {
                const targetElement = document.querySelector(hash);
                if (targetElement) {
                    e.preventDefault();
                    const isFooter = targetElement.tagName === "FOOTER" || targetElement.closest("footer");
                    if (isFooter) {
                        lenis.scrollTo("bottom", {
                            duration: isReducedMotion ? 0 : MOTION.duration.scroll,
                        });
                    } else {
                        lenis.scrollTo(targetElement as HTMLElement, {
                            offset: 0,
                            duration: isReducedMotion ? 0 : MOTION.duration.scroll,
                        });
                    }
                    try {
                        window.history.replaceState(null, "", window.location.pathname + window.location.search);
                    } catch {}
                }
            }
        };

        document.addEventListener("click", handleAnchorClick);

        const handleReducedMotionChange = (e: MediaQueryListEvent) => {
            if (e.matches) {
                lenis.options.duration = 0;
                lenis.options.smoothWheel = false;
            } else {
                lenis.options.duration = MOTION.duration.scroll;
                lenis.options.smoothWheel = true;
            }
        };

        reducedMotionQuery.addEventListener("change", handleReducedMotionChange);

        return () => {
            gsap.ticker.remove(handleTicker);
            lenis.destroy();
            lenisRef.current = null;
            document.removeEventListener("click", handleAnchorClick);
            reducedMotionQuery.removeEventListener("change", handleReducedMotionChange);
            delete (window as unknown as { __lenis?: Lenis }).__lenis;
        };
    }, []);

    useEffect(() => {
        let targetId: string | null = null;
        try {
            targetId = sessionStorage.getItem("scrollToSection");
            if (targetId) {
                sessionStorage.removeItem("scrollToSection");
            }
        } catch {}

        const hash = window.location.hash;

        if (!hash && !targetId && lenisRef.current) {
            lenisRef.current.scrollTo(0, { immediate: true });
        }

        const timer = setTimeout(() => {
            ScrollTrigger.refresh();

            const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

            if (targetId) {
                const targetElement = document.getElementById(targetId);
                if (targetElement && lenisRef.current) {
                    const isFooter = targetElement.tagName === "FOOTER" || targetElement.closest("footer");
                    if (isFooter) {
                        lenisRef.current.scrollTo("bottom", {
                            duration: isReducedMotion ? 0 : MOTION.duration.scroll,
                        });
                    } else {
                        lenisRef.current.scrollTo(targetElement, {
                            offset: 0,
                            duration: isReducedMotion ? 0 : MOTION.duration.scroll,
                        });
                    }
                }
            } else if (hash) {
                const targetElement = document.querySelector<HTMLElement>(hash);
                if (targetElement && lenisRef.current) {
                    const isFooter = targetElement.tagName === "FOOTER" || targetElement.closest("footer");
                    if (isFooter) {
                        lenisRef.current.scrollTo("bottom", {
                            duration: isReducedMotion ? 0 : MOTION.duration.scroll,
                        });
                    } else {
                        lenisRef.current.scrollTo(targetElement, {
                            offset: 0,
                            duration: isReducedMotion ? 0 : MOTION.duration.scroll,
                        });
                    }
                }
                try {
                    window.history.replaceState(null, "", window.location.pathname + window.location.search);
                } catch {}
            }
        }, 80);

        return () => clearTimeout(timer);
    }, [pathname]);

    const contextValue = useMemo<SmoothScrollContextType>(() => {
        return {
            get lenis() {
                return lenisRef.current;
            },
            scrollTo: (target: string | number | HTMLElement, options?: Parameters<Lenis["scrollTo"]>[1]) => {
                if (lenisRef.current) {
                    lenisRef.current.scrollTo(target, options);
                } else if (typeof target === "string" && target.startsWith("#")) {
                    const el = document.querySelector(target);
                    el?.scrollIntoView({ behavior: "smooth" });
                }
            },
        };
    }, []);

    return <SmoothScrollContext.Provider value={contextValue}>{children}</SmoothScrollContext.Provider>;
}
