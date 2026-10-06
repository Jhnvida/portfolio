"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CONTACT_ANCHOR, SITE } from "../../data/site";
import { cn } from "../../lib/utils";
import { useLenis } from "../providers/SmoothScroll";
import { ThemeToggle } from "../ui/ThemeToggle";
import { NavPill } from "./NavPill";

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const lenis = useLenis();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 35);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });

        let unsubscribeLenis: (() => void) | undefined;
        if (lenis) {
            const lenisHandler = (e: { scroll: number }) => {
                setIsScrolled(e.scroll > 35);
            };
            lenis.on("scroll", lenisHandler);
            unsubscribeLenis = () => lenis.off("scroll", lenisHandler);
        }

        return () => {
            window.removeEventListener("scroll", handleScroll);
            unsubscribeLenis?.();
        };
    }, [lenis]);

    return (
        <header
            style={{ viewTransitionName: "site-header" }}
            className="sticky top-0 z-50 w-full pointer-events-none pt-[max(0.75rem,env(safe-area-inset-top))] sm:pt-[max(1rem,env(safe-area-inset-top))] pb-2 sm:pb-3"
        >
            <div
                className={cn(
                    "pointer-events-auto mx-auto flex items-center justify-between",
                    "transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isScrolled
                        ? [
                              "w-[calc(100%-1.5rem)] sm:w-[calc(100%-2.5rem)] max-w-[52rem]",
                              "px-5 sm:px-7 py-2.5 sm:py-3",
                              "mt-1.5 sm:mt-2.5",
                              "rounded-full",
                              "bg-[#141413]/92 dark:bg-[#141413]/92 backdrop-blur-md",
                              "border border-white/10 dark:border-white/15",
                              "shadow-xl shadow-black/25",
                          ]
                        : [
                              "w-full max-w-[var(--grid-max-width)]",
                              "px-4 sm:px-6 py-3.5 sm:py-4",
                              "mt-0",
                              "rounded-full",
                              "bg-transparent",
                              "border border-transparent",
                              "shadow-none",
                          ],
                )}
            >
                <div className="flex-1 flex items-center justify-start shrink-0">
                    <Link
                        href="/"
                        aria-label={`${SITE.name}, página inicial`}
                        className="group inline-flex items-center py-1"
                    >
                        <span
                            className={cn(
                                "font-medium tracking-tight inline-flex items-center leading-normal transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
                                isScrolled
                                    ? "text-[1.0625rem] sm:text-[1.125rem] text-white group-hover:opacity-75"
                                    : "text-[1.1875rem] sm:text-[1.25rem] text-ink group-hover:opacity-70",
                            )}
                        >
                            {SITE.name}
                            <span
                                className={cn(
                                    "ml-0.5 font-normal transition-colors duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
                                    isScrolled ? "text-neutral-500" : "text-ink-3",
                                )}
                            >
                                .
                            </span>
                        </span>
                    </Link>
                </div>

                <div className="flex items-center justify-center shrink-0">
                    <NavPill isFloating={isScrolled} viewTransition={true} />
                </div>

                <div className="flex-1 flex items-center justify-end gap-1.5 sm:gap-2.5 shrink-0">
                    <ThemeToggle
                        className={cn(
                            "transition-colors duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
                            isScrolled
                                ? "text-neutral-400 hover:text-white hover:bg-white/10"
                                : "text-ink-2 hover:text-ink hover:bg-surface-strong/60",
                        )}
                    />
                    <a
                        href={`#${CONTACT_ANCHOR}`}
                        className={cn(
                            "group inline-flex items-center gap-1.5 sm:gap-2 rounded-full font-medium transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] whitespace-nowrap",
                            isScrolled
                                ? "h-8.5 px-3.5 sm:px-4 text-xs sm:text-meta bg-white text-neutral-900 hover:bg-neutral-100 shadow-sm hover:scale-[1.02] active:scale-[0.98]"
                                : "h-9 px-3.5 sm:px-4 text-meta bg-surface-strong/70 text-ink hover:bg-surface-strong hover:text-ink",
                        )}
                    >
                        <span className="hidden min-[380px]:inline">Contato</span>
                        <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[2.2] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                </div>
            </div>
        </header>
    );
}
