"use client";

import { useSmoothScroll } from "@/components/providers/smooth-scroll-provider";
import { SITE_CONFIG } from "@/data";
import { MOTION } from "@/lib/motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export function Header() {
    const pathname = usePathname();
    const { lenis, scrollTo } = useSmoothScroll();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        let ticking = false;

        const handleScroll = (currentY: number) => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setIsScrolled((prev) => {
                        if (!prev && currentY > 80) return true;
                        if (prev && currentY < 40) return false;
                        return prev;
                    });
                    ticking = false;
                });
                ticking = true;
            }
        };

        const initialRaf = window.requestAnimationFrame(() => {
            handleScroll(window.scrollY || document.documentElement.scrollTop);
        });

        let unsubscribeLenis: (() => void) | undefined;
        let onNativeScroll: (() => void) | undefined;

        if (lenis) {
            const onLenisScroll = (e: { scroll: number }) => {
                handleScroll(e.scroll);
            };
            lenis.on("scroll", onLenisScroll);
            unsubscribeLenis = () => lenis.off("scroll", onLenisScroll);
        } else {
            onNativeScroll = () => {
                handleScroll(window.scrollY || document.documentElement.scrollTop);
            };
            window.addEventListener("scroll", onNativeScroll, { passive: true });
        }

        return () => {
            window.cancelAnimationFrame(initialRaf);
            if (unsubscribeLenis) unsubscribeLenis();
            if (onNativeScroll) window.removeEventListener("scroll", onNativeScroll);
        };
    }, [lenis, pathname]);

    const handleBackToTop = (e: React.MouseEvent) => {
        if (pathname === "/") {
            e.preventDefault();
            const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

            if (lenis) {
                lenis.scrollTo(0, { duration: prefersReducedMotion ? 0 : MOTION.duration.scroll });
            } else {
                scrollTo(0);
                window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
            }
        }
    };

    const handleScrollToSection = (e: React.MouseEvent, targetId: string) => {
        if (pathname === "/") {
            e.preventDefault();
            const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

            if (targetId === "contato-info" || targetId === "contato") {
                if (lenis) {
                    lenis.scrollTo("bottom", { duration: prefersReducedMotion ? 0 : MOTION.duration.scroll });
                    return;
                }
            }

            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                if (lenis) {
                    lenis.scrollTo(targetEl, {
                        offset: -28,
                        duration: prefersReducedMotion ? 0 : MOTION.duration.scroll,
                    });
                } else {
                    targetEl.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
                }
            }
        }
    };

    return (
        <>
            <div
                className="w-full h-16 sm:h-18 md:h-20 pointer-events-none select-none shrink-0"
                aria-hidden="true"
            />

            <header
                aria-label="Cabeçalho do site"
                className={`fixed top-0 inset-x-0 z-50 w-full pointer-events-none flex justify-center motion-reduce:transition-none transition-[padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isScrolled ? "pt-3 sm:pt-4 px-4 sm:px-6" : "pt-6 sm:pt-8 md:pt-10 pb-4 px-0"
                }`}
            >
                <div
                    className={`pointer-events-auto flex items-center justify-between motion-reduce:transition-none transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isScrolled
                            ? "w-full max-w-[calc(100%-1rem)] sm:max-w-115 md:max-w-120 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-surface-subtle/80 backdrop-blur-md backdrop-saturate-150 border border-neutral-950/8 shadow-[0_8px_30px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)]"
                            : "w-full max-w-360 px-6 md:px-10 lg:px-12 xl:px-16 py-0 bg-transparent border border-transparent shadow-none rounded-none"
                    }`}
                >
                    <Link
                        href="/"
                        onClick={handleBackToTop}
                        className="animate-header-item font-sans font-medium text-sm sm:text-base text-neutral-950 tracking-tight transition-opacity hover:opacity-75 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-subtle rounded-full select-none whitespace-nowrap"
                        style={{ animationDelay: "50ms" }}
                        aria-label={`Página inicial de ${SITE_CONFIG.shortName}`}
                    >
                        {SITE_CONFIG.shortName}
                    </Link>

                    <nav
                        aria-label="Navegação principal"
                        className={`flex items-center font-sans transition-all duration-300 ${
                            isScrolled
                                ? "gap-1 sm:gap-1.5 text-xs sm:text-[13px]"
                                : "gap-4 sm:gap-6 md:gap-8 lg:gap-10 text-xs sm:text-sm"
                        }`}
                    >
                        <Link
                            href="/#projetos"
                            prefetch={true}
                            onClick={(e) => handleScrollToSection(e, "projetos")}
                            className={`animate-header-item transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-subtle rounded-full select-none ${
                                isScrolled
                                    ? "text-neutral-600 hover:text-neutral-950 px-2 sm:px-2.5 py-1 hover:bg-neutral-950/5"
                                    : "text-neutral-600 hover:text-neutral-950 py-1"
                            }`}
                            style={{ animationDelay: "100ms" }}
                        >
                            Trabalhos
                        </Link>

                        <Link
                            href="/#sobre"
                            prefetch={true}
                            onClick={(e) => handleScrollToSection(e, "sobre")}
                            className={`animate-header-item transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-subtle rounded-full select-none ${
                                isScrolled
                                    ? "text-neutral-600 hover:text-neutral-950 px-2 sm:px-2.5 py-1 hover:bg-neutral-950/5"
                                    : "text-neutral-600 hover:text-neutral-950 py-1"
                            }`}
                            style={{ animationDelay: "150ms" }}
                        >
                            Sobre
                        </Link>

                        <Link
                            href="/#contato-info"
                            prefetch={true}
                            onClick={(e) => handleScrollToSection(e, "contato-info")}
                            className={`animate-header-item transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-subtle rounded-full select-none ${
                                isScrolled
                                    ? "text-neutral-600 hover:text-neutral-950 px-2 sm:px-2.5 py-1 hover:bg-neutral-950/5"
                                    : "text-neutral-600 hover:text-neutral-950 py-1"
                            }`}
                            style={{ animationDelay: "200ms" }}
                        >
                            Contato
                        </Link>
                    </nav>
                </div>
            </header>
        </>
    );
}
