"use client";

import gsap from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const NAV_ITEMS = [
    { href: "/", label: "Início" },
    { href: "/#projetos", label: "Projetos" },
    { href: "/about", label: "Sobre" },
] as const;

export function Header() {
    const headerRef = useRef<HTMLElement>(null);
    const pathname = usePathname();
    const [isFloating, setIsFloating] = useState(false);
    const isFloatingRef = useRef(false);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion || !headerRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(headerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.65, ease: "power3.out" });
        }, headerRef);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const ENTER_THRESHOLD = 50;
        const LEAVE_THRESHOLD = 20;

        const checkScroll = () => {
            const currentScroll = window.scrollY || document.documentElement.scrollTop || 0;

            if (!isFloatingRef.current && currentScroll > ENTER_THRESHOLD) {
                isFloatingRef.current = true;
                setIsFloating(true);
            } else if (isFloatingRef.current && currentScroll < LEAVE_THRESHOLD) {
                isFloatingRef.current = false;
                setIsFloating(false);
            }
        };

        checkScroll();

        window.addEventListener("scroll", checkScroll, { passive: true });

        const globalLenis = (
            window as unknown as {
                __lenis?: {
                    on: (event: string, cb: () => void) => void;
                    off: (event: string, cb: () => void) => void;
                };
            }
        ).__lenis;

        if (globalLenis && typeof globalLenis.on === "function") {
            globalLenis.on("scroll", checkScroll);
        }

        return () => {
            window.removeEventListener("scroll", checkScroll);
            if (globalLenis && typeof globalLenis.off === "function") {
                globalLenis.off("scroll", checkScroll);
            }
        };
    }, [pathname]);

    return (
        <header
            ref={headerRef}
            className={`sticky top-0 z-40 w-full pointer-events-none transition-[padding] duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                isFloating ? "py-3 sm:py-4" : "pt-10 sm:pt-14 pb-4"
            }`}
        >
            <div
                className={`mx-auto flex items-center justify-between pointer-events-auto transition-[max-width,width,padding,background-color,border-color,box-shadow,border-radius] duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                    isFloating
                        ? "w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] max-w-xl sm:max-w-2xl px-3.5 sm:px-6 py-1.5 sm:py-2 rounded-full bg-white/85 backdrop-blur-md border border-neutral-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.06),0_1px_3px_rgb(0,0,0,0.04)]"
                        : "w-full max-w-355 px-6 md:px-10 py-0 rounded-2xl bg-transparent border border-transparent shadow-none"
                }`}
            >
                <Link
                    href="/"
                    prefetch={true}
                    className="font-heading text-xs sm:text-sm font-semibold tracking-tight text-neutral-950 transition-opacity duration-200 ease-out hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950/20 focus-visible:rounded-sm shrink-0"
                    aria-label="Página inicial de João André"
                >
                    João André
                </Link>

                <nav
                    className="flex items-center gap-1 sm:gap-1.5 text-xs font-sans font-medium"
                    aria-label="Navegação principal"
                >
                    {NAV_ITEMS.map((item) => {
                        const isActive =
                            item.href === "/#projetos" ? pathname.startsWith("/projects") : pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                prefetch={true}
                                className={`rounded-full px-2.5 sm:px-3 py-1 transition-colors duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950/20 ${
                                    isActive
                                        ? "bg-neutral-100 text-neutral-950"
                                        : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50/80"
                                }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </header>
    );
}
