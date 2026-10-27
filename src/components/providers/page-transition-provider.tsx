"use client";

import { useSmoothScroll } from "@/components/providers/smooth-scroll-provider";
import type { PageTransitionContextType, SharedElementData } from "@/components/transitions/transition-types";
import { MOTION } from "@/lib/motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname, useRouter } from "next/navigation";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

const PageTransitionContext = createContext<PageTransitionContextType>({
    isTransitioning: false,
    activeSlug: null,
    isDestinationReady: true,
    navigate: () => {},
    registerDestination: () => {},
});

export const usePageTransition = () => useContext(PageTransitionContext);

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const { lenis } = useSmoothScroll();
    const lenisRef = useRef(lenis);

    useEffect(() => {
        lenisRef.current = lenis;
    }, [lenis]);

    const [isTransitioning, setIsTransitioning] = useState(false);
    const [activeSlug, setActiveSlug] = useState<string | null>(null);
    const [isDestinationReady, setIsDestinationReady] = useState(true);
    const [activeTransition, setActiveTransition] = useState<SharedElementData | null>(null);

    const isTransitioningRef = useRef(false);
    const activeSlugRef = useRef<string | null>(null);
    const activeTransitionRef = useRef<SharedElementData | null>(null);
    const originElementRef = useRef<HTMLElement | null>(null);
    const proxyContainerRef = useRef<HTMLDivElement | null>(null);
    const isScrollPausedRef = useRef(false);

    const resolutionTimerRef = useRef<NodeJS.Timeout | null>(null);
    const animationTimerRef = useRef<NodeJS.Timeout | null>(null);
    const activeTweenRef = useRef<gsap.core.Tween | gsap.core.Timeline | null>(null);

    const safeResumeScroll = useCallback(() => {
        if (isScrollPausedRef.current) {
            isScrollPausedRef.current = false;
            const currentLenis = lenisRef.current || (window as unknown as { __lenis?: { start: () => void } }).__lenis;
            currentLenis?.start?.();
        }
    }, []);

    const pauseScroll = useCallback(() => {
        isScrollPausedRef.current = true;
        const currentLenis = lenisRef.current || (window as unknown as { __lenis?: { stop: () => void } }).__lenis;
        currentLenis?.stop?.();
    }, []);

    const safeCleanup = useCallback(() => {
        if (resolutionTimerRef.current) {
            clearTimeout(resolutionTimerRef.current);
            resolutionTimerRef.current = null;
        }
        if (animationTimerRef.current) {
            clearTimeout(animationTimerRef.current);
            animationTimerRef.current = null;
        }
        if (activeTweenRef.current) {
            activeTweenRef.current.kill();
            activeTweenRef.current = null;
        }

        if (originElementRef.current) {
            originElementRef.current.style.opacity = "";
            originElementRef.current = null;
        }

        setIsDestinationReady(true);
        setActiveTransition(null);
        activeTransitionRef.current = null;
        isTransitioningRef.current = false;
        setIsTransitioning(false);
        activeSlugRef.current = null;
        setActiveSlug(null);
        safeResumeScroll();
    }, [safeResumeScroll]);

    const performNavigate = useCallback(
        (targetHref: string) => {
            if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("cursor:set", { detail: { mode: "default" } }));
            }
            router.push(targetHref);
        },
        [router],
    );

    const registerDestination = useCallback(
        (slug: string, el: HTMLElement | null) => {
            if (!isTransitioningRef.current || activeSlugRef.current !== slug || !el) {
                return;
            }

            if (resolutionTimerRef.current) {
                clearTimeout(resolutionTimerRef.current);
                resolutionTimerRef.current = null;
            }

            const currentLenis =
                lenisRef.current ||
                (
                    window as unknown as {
                        __lenis?: { scrollTo: (y: number, opts: { immediate: boolean }) => void };
                    }
                ).__lenis;
            currentLenis?.scrollTo?.(0, { immediate: true });
            window.scrollTo(0, 0);

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    if (!isTransitioningRef.current || activeSlugRef.current !== slug || !el) {
                        return;
                    }

                    if (!proxyContainerRef.current || !activeTransitionRef.current) {
                        safeCleanup();
                        return;
                    }

                    const origin = activeTransitionRef.current.rect;
                    const originRadius = parseFloat(origin.borderRadius) || 0;
                    const proxyEl = proxyContainerRef.current;

                    animationTimerRef.current = setTimeout(() => {
                        safeCleanup();
                    }, 1500);

                    const anim = { progress: 0 };

                    const tween = gsap.to(anim, {
                        progress: 1,
                        duration: MOTION.duration.sharedElement,
                        ease: MOTION.ease.entrance,
                        onUpdate: () => {
                            if (!proxyEl || !el) return;

                            const liveDest = el.getBoundingClientRect();
                            const destStyle = window.getComputedStyle(el);
                            const destRadius = parseFloat(destStyle.borderRadius) || 0;

                            const p = anim.progress;
                            const curX = origin.left + (liveDest.left - origin.left) * p;
                            const curY = origin.top + (liveDest.top - origin.top) * p;
                            const curW = origin.width + (liveDest.width - origin.width) * p;
                            const curH = origin.height + (liveDest.height - origin.height) * p;
                            const curR = originRadius + (destRadius - originRadius) * p;

                            proxyEl.style.transform = `translate3d(${curX}px, ${curY}px, 0)`;
                            proxyEl.style.width = `${curW}px`;
                            proxyEl.style.height = `${curH}px`;
                            proxyEl.style.borderRadius = `${curR}px`;
                        },
                        onComplete: () => {
                            if (!proxyEl || !el) {
                                safeCleanup();
                                return;
                            }

                            const finalDest = el.getBoundingClientRect();
                            const finalStyle = window.getComputedStyle(el);
                            proxyEl.style.transform = `translate3d(${finalDest.left}px, ${finalDest.top}px, 0)`;
                            proxyEl.style.width = `${finalDest.width}px`;
                            proxyEl.style.height = `${finalDest.height}px`;
                            proxyEl.style.borderRadius = finalStyle.borderRadius;

                            el.style.opacity = "1";
                            setIsDestinationReady(true);

                            requestAnimationFrame(() => {
                                el.style.opacity = "";
                                safeCleanup();
                            });
                        },
                    });

                    activeTweenRef.current = tween;
                });
            });
        },
        [safeCleanup],
    );

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("cursor:set", { detail: { mode: "default" } }));
        }

        ScrollTrigger.refresh();
    }, [pathname]);

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

            if (isTransitioningRef.current) {
                e.preventDefault();
                return;
            }

            e.preventDefault();

            const projectSlug =
                anchor.getAttribute("data-shared-project") ||
                anchor.closest("[data-project-card]")?.getAttribute("data-shared-project");
            const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

            if (projectSlug && !prefersReducedMotion) {
                const mediaContainer =
                    anchor.querySelector<HTMLElement>("[data-shared-image-container]") ||
                    anchor.closest("[data-project-card]")?.querySelector<HTMLElement>("[data-shared-image-container]");
                const imgEl = mediaContainer?.querySelector<HTMLImageElement>("img");

                if (mediaContainer && imgEl) {
                    const rect = mediaContainer.getBoundingClientRect();
                    const style = window.getComputedStyle(mediaContainer);
                    const borderRadius = style.borderRadius || "0px";

                    isTransitioningRef.current = true;
                    setIsTransitioning(true);
                    activeSlugRef.current = projectSlug;
                    setActiveSlug(projectSlug);
                    setIsDestinationReady(false);

                    originElementRef.current = mediaContainer;

                    const transitionData: SharedElementData = {
                        slug: projectSlug,
                        imageSrc: imgEl.currentSrc || imgEl.src,
                        alt: imgEl.alt || "",
                        rect: {
                            top: rect.top,
                            left: rect.left,
                            width: rect.width,
                            height: rect.height,
                            borderRadius,
                        },
                    };

                    activeTransitionRef.current = transitionData;
                    setActiveTransition(transitionData);

                    mediaContainer.style.opacity = "0";

                    pauseScroll();

                    resolutionTimerRef.current = setTimeout(() => {
                        safeCleanup();
                    }, 5000);
                }
            }

            performNavigate(targetUrl.pathname + targetUrl.search + targetUrl.hash);
        };

        const handlePopState = () => {
            if (isTransitioningRef.current) {
                safeCleanup();
            }
        };

        document.addEventListener("click", handleDocumentClick, { capture: true });
        window.addEventListener("popstate", handlePopState);

        return () => {
            document.removeEventListener("click", handleDocumentClick, { capture: true });
            window.removeEventListener("popstate", handlePopState);
        };
    }, [performNavigate, pauseScroll, safeCleanup]);

    useEffect(() => {
        return () => {
            safeCleanup();
        };
    }, [safeCleanup]);

    useEffect(() => {
        if (activeTransition && proxyContainerRef.current) {
            gsap.set(proxyContainerRef.current, {
                x: activeTransition.rect.left,
                y: activeTransition.rect.top,
                width: activeTransition.rect.width,
                height: activeTransition.rect.height,
                borderRadius: activeTransition.rect.borderRadius,
            });
        }
    }, [activeTransition]);

    const contextValue = useMemo<PageTransitionContextType>(() => {
        return {
            isTransitioning,
            activeSlug,
            isDestinationReady,
            navigate: performNavigate,
            registerDestination,
        };
    }, [isTransitioning, activeSlug, isDestinationReady, performNavigate, registerDestination]);

    return (
        <PageTransitionContext.Provider value={contextValue}>
            {children}

            {activeTransition && (
                <div
                    ref={proxyContainerRef}
                    data-shared-proxy
                    aria-hidden="true"
                    className="fixed top-0 left-0 pointer-events-none z-50 overflow-hidden bg-neutral-100 border border-neutral-200 transform-gpu will-change-[transform,width,height,border-radius]"
                    style={{
                        width: activeTransition.rect.width,
                        height: activeTransition.rect.height,
                        transform: `translate3d(${activeTransition.rect.left}px, ${activeTransition.rect.top}px, 0)`,
                        borderRadius: activeTransition.rect.borderRadius,
                    }}
                >
                    <img
                        src={activeTransition.imageSrc}
                        alt={activeTransition.alt}
                        className="h-full w-full object-cover transform-gpu"
                    />
                </div>
            )}
        </PageTransitionContext.Provider>
    );
}

export function PageTransitionContent({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return <div className={`flex-1 flex flex-col w-full ${className}`}>{children}</div>;
}
