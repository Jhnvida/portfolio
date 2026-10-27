"use client";

import { useSmoothScroll } from "@/components/providers/smooth-scroll-provider";
import { SITE_CONFIG } from "@/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export function Header() {
    const pathname = usePathname();
    const { lenis, scrollTo } = useSmoothScroll();

    const handleBackToTop = (e: React.MouseEvent) => {
        if (pathname === "/") {
            e.preventDefault();
            const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

            if (lenis) {
                lenis.scrollTo(0, { duration: prefersReducedMotion ? 0 : 1.15 });
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
                    lenis.scrollTo("bottom", { duration: prefersReducedMotion ? 0 : 1.15 });
                    return;
                }
            }

            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                if (lenis) {
                    lenis.scrollTo(targetEl, {
                        offset: 0,
                        duration: prefersReducedMotion ? 0 : 1.15,
                    });
                } else {
                    targetEl.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
                }
            }
        }
    };

    const navLinkClass =
        "text-neutral-600 hover:text-neutral-950 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-subtle rounded-xs select-none py-1";

    return (
        <header
            aria-label="Cabeçalho do site"
            className="w-full bg-surface-subtle text-neutral-950 pt-6 sm:pt-8 md:pt-10 pb-4"
        >
            <div className="max-w-360 mx-auto w-full px-6 md:px-10 lg:px-12 xl:px-16 flex items-center justify-between">
                <Link
                    href="/"
                    onClick={handleBackToTop}
                    className="font-sans font-medium text-sm sm:text-base text-neutral-950 tracking-tight transition-opacity hover:opacity-75 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-subtle rounded-xs select-none"
                    aria-label={`Página inicial de ${SITE_CONFIG.shortName}`}
                >
                    {SITE_CONFIG.shortName}
                </Link>

                <nav
                    aria-label="Navegação principal"
                    className="flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 font-sans text-xs sm:text-sm"
                >
                    <Link
                        href="/#projetos"
                        prefetch={true}
                        onClick={(e) => handleScrollToSection(e, "projetos")}
                        className={navLinkClass}
                    >
                        Trabalhos
                    </Link>

                    <Link
                        href="/#sobre"
                        prefetch={true}
                        onClick={(e) => handleScrollToSection(e, "sobre")}
                        className={navLinkClass}
                    >
                        Sobre
                    </Link>

                    <Link
                        href="/#contato-info"
                        prefetch={true}
                        onClick={(e) => handleScrollToSection(e, "contato-info")}
                        className={navLinkClass}
                    >
                        Contato
                    </Link>
                </nav>
            </div>
        </header>
    );
}
