"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname, useRouter } from "next/navigation";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

interface PageTransitionContextType {
    isTransitioning: boolean;
    navigate: (href: string) => void;
    registerContainer: (el: HTMLDivElement | null) => void;
}

const PageTransitionContext = createContext<PageTransitionContextType>({
    isTransitioning: false,
    navigate: () => {},
    registerContainer: () => {},
});

export const usePageTransition = () => useContext(PageTransitionContext);

const MOTION_CONFIG = {
    exit: {
        duration: 0.2,
        ease: "power2.inOut",
    },
    enter: {
        duration: 0.38,
        ease: "power3.out",
        yOffset: 12,
    },
    safetyTimeoutMs: 1200,
};

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isTransitioning, setIsTransitioning] = useState(false);

    const isTransitioningRef = useRef(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const isInitialMount = useRef(true);
    const safetyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const registerContainer = useCallback((el: HTMLDivElement | null) => {
        containerRef.current = el;
    }, []);

    const performNavigate = useCallback(
        (targetHref: string) => {
            if (isTransitioningRef.current) return;

            if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("cursor:set", { detail: { mode: "default" } }));
            }

            const prefersReducedMotion =
                typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

            if (prefersReducedMotion || !containerRef.current) {
                router.push(targetHref);
                return;
            }

            isTransitioningRef.current = true;
            setIsTransitioning(true);

            if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);
            safetyTimeoutRef.current = setTimeout(() => {
                if (isTransitioningRef.current && containerRef.current) {
                    gsap.to(containerRef.current, {
                        opacity: 1,
                        duration: 0.2,
                        clearProps: "transform,opacity",
                    });
                    isTransitioningRef.current = false;
                    setIsTransitioning(false);
                }
            }, MOTION_CONFIG.safetyTimeoutMs);

            gsap.killTweensOf(containerRef.current);
            gsap.to(containerRef.current, {
                opacity: 0,
                duration: MOTION_CONFIG.exit.duration,
                ease: MOTION_CONFIG.exit.ease,
                onComplete: () => {
                    router.push(targetHref);
                },
            });
        },
        [router],
    );

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        if (safetyTimeoutRef.current) {
            clearTimeout(safetyTimeoutRef.current);
            safetyTimeoutRef.current = null;
        }

        isTransitioningRef.current = false;
        setIsTransitioning(false);

        const container = containerRef.current;
        if (!container) return;

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) {
            gsap.set(container, { opacity: 1, y: 0, clearProps: "transform,opacity" });
            return;
        }

        const hasHash = Boolean(window.location.hash);
        const startY = hasHash ? 0 : MOTION_CONFIG.enter.yOffset;

        gsap.killTweensOf(container);
        gsap.fromTo(
            container,
            {
                opacity: 0,
                y: startY,
            },
            {
                opacity: 1,
                y: 0,
                duration: MOTION_CONFIG.enter.duration,
                ease: MOTION_CONFIG.enter.ease,
                clearProps: "transform,opacity",
                onComplete: () => {
                    ScrollTrigger.refresh();
                },
            },
        );
    }, [pathname]);

    useEffect(() => {
        return () => {
            if (safetyTimeoutRef.current) {
                clearTimeout(safetyTimeoutRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const handleDocumentClick = (e: MouseEvent) => {
            if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

            const target = e.target as HTMLElement | null;
            const anchor = target?.closest<HTMLAnchorElement>("a[href]");
            if (!anchor) return;

            if (anchor.target && anchor.target !== "_self") return;
            if (anchor.hasAttribute("download")) return;
            if (anchor.getAttribute("rel")?.includes("external")) return;
            if (anchor.hasAttribute("data-no-transition")) return;

            const href = anchor.getAttribute("href");
            if (!href) return;
            if (href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) return;

            let targetUrl: URL;
            try {
                targetUrl = new URL(anchor.href, window.location.href);
            } catch {
                return;
            }

            if (targetUrl.origin !== window.location.origin) return;

            if (targetUrl.pathname === window.location.pathname && targetUrl.search === window.location.search) {
                if (targetUrl.hash) return;

                e.preventDefault();
                return;
            }

            e.preventDefault();
            performNavigate(targetUrl.pathname + targetUrl.search + targetUrl.hash);
        };

        document.addEventListener("click", handleDocumentClick, { capture: true });

        return () => {
            document.removeEventListener("click", handleDocumentClick, { capture: true });
        };
    }, [performNavigate]);

    const contextValue = useMemo<PageTransitionContextType>(() => {
        return {
            isTransitioning,
            navigate: performNavigate,
            registerContainer,
        };
    }, [isTransitioning, performNavigate, registerContainer]);

    return <PageTransitionContext.Provider value={contextValue}>{children}</PageTransitionContext.Provider>;
}

export function PageTransitionContent({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    const { registerContainer, isTransitioning } = usePageTransition();
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        registerContainer(contentRef.current);
        return () => registerContainer(null);
    }, [registerContainer]);

    return (
        <div
            ref={contentRef}
            className={`flex-1 flex flex-col w-full ${isTransitioning ? "pointer-events-none select-none" : ""} ${className}`}
        >
            {children}
        </div>
    );
}
