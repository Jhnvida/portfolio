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
                    "transition-all duration-400 ease-out-soft",
                    isScrolled
                        ? [
                              "w-[calc(100%-1rem)] sm:w-[calc(100%-2.5rem)] max-w-208",
                              "px-2.5 min-[360px]:px-3.5 sm:px-6 py-2 sm:py-2.5",
                              "mt-1.5 sm:mt-2.5",
                              "rounded-full",
                              "bg-surface/90 dark:bg-surface/85 backdrop-blur-md",
                              "border border-line/80 dark:border-line",
                              "shadow-lg shadow-ink/5 dark:shadow-2xl dark:shadow-black/40",
                          ]
                        : [
                              "w-full max-w-(--grid-max-width)",
                              "px-3.5 min-[360px]:px-4 sm:px-6 py-3 sm:py-4",
                              "mt-0",
                              "rounded-full",
                              "bg-transparent",
                              "border border-transparent",
                              "shadow-none",
                          ],
                )}
            >
                <div className="flex-1 flex items-center justify-start min-w-0">
                    <Link
                        href="/"
                        aria-label={`${SITE.name}, página inicial`}
                        className="group inline-flex items-center py-1 min-w-0"
                    >
                        <span
                            className={cn(
                                "font-medium tracking-tight inline-flex items-center leading-normal text-ink group-hover:opacity-75 transition-all duration-400 ease-out-soft truncate",
                                isScrolled
                                    ? "text-[0.9375rem] min-[360px]:text-[1rem] sm:text-[1.125rem]"
                                    : "text-[1rem] min-[360px]:text-[1.0625rem] sm:text-[1.25rem]",
                            )}
                        >
                            <span className="truncate">{SITE.name}</span>
                            <span className="ml-0.5 font-normal text-ink-3">.</span>
                        </span>
                    </Link>
                </div>

                <div className="flex items-center justify-center shrink-0 px-1 sm:px-2">
                    <NavPill isFloating={isScrolled} viewTransition={true} />
                </div>

                <div className="flex-1 flex items-center justify-end gap-1 min-[360px]:gap-1.5 sm:gap-2.5 shrink-0">
                    <ThemeToggle className="text-ink-2 hover:text-ink hover:bg-surface-strong/70 transition-colors duration-200" />
                    <a
                        href={`#${CONTACT_ANCHOR}`}
                        aria-label="Ir para seção de contato"
                        title="Contato"
                        className={cn(
                            "group inline-flex items-center justify-center rounded-full font-medium transition-all duration-400 ease-out-soft whitespace-nowrap",
                            isScrolled
                                ? "h-8.5 px-2.5 min-[430px]:px-3.5 sm:px-4 text-xs sm:text-meta bg-ink text-bg hover:opacity-90 shadow-sm active:scale-95"
                                : "h-8.5 sm:h-9 px-2.5 min-[430px]:px-3.5 sm:px-4 text-xs sm:text-meta bg-surface-strong/70 text-ink hover:bg-surface-strong hover:text-ink active:scale-95",
                        )}
                    >
                        <span className="hidden min-[430px]:inline min-[430px]:mr-1.5 sm:mr-2">Contato</span>
                        <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[2.2] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
                    </a>
                </div>
            </div>
        </header>
    );
}
