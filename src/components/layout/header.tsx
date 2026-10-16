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

type HomeSection = "inicio" | "projetos" | "outro";

export function Header() {
    const headerRef = useRef<HTMLElement>(null);
    const pathname = usePathname();
    const [isFloating, setIsFloating] = useState(false);
    const isFloatingRef = useRef(false);
    const [activeHomeSection, setActiveHomeSection] = useState<HomeSection>("inicio");

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

            if (pathname === "/" && currentScroll < 100) {
                setActiveHomeSection("inicio");
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

    useEffect(() => {
        if (pathname !== "/") return;

        let observer: IntersectionObserver | null = null;
        let retryTimeout: NodeJS.Timeout | null = null;

        const setupObserver = () => {
            const target = document.getElementById("projetos");
            if (!target) {
                retryTimeout = setTimeout(setupObserver, 80);
                return;
            }

            observer = new IntersectionObserver(
                (entries) => {
                    const [entry] = entries;
                    if (entry.isIntersecting) {
                        setActiveHomeSection("projetos");
                    } else if (entry.boundingClientRect.top > 0) {
                        setActiveHomeSection("inicio");
                    } else {
                        setActiveHomeSection("outro");
                    }
                },
                {
                    rootMargin: "-100px 0px -35% 0px",
                    threshold: 0,
                },
            );

            observer.observe(target);
        };

        setupObserver();

        return () => {
            if (retryTimeout) clearTimeout(retryTimeout);
            if (observer) observer.disconnect();
        };
    }, [pathname]);

    const isItemActive = (href: string) => {
        if (pathname === "/about") {
            return href === "/about";
        }

        if (pathname.startsWith("/projects")) {
            return href === "/#projetos";
        }

        if (pathname === "/") {
            if (href === "/") {
                return activeHomeSection === "inicio";
            }
            if (href === "/#projetos") {
                return activeHomeSection === "projetos";
            }
            return false;
        }

        return pathname === href;
    };

    const handleLogoOrInicioClick = (href: string) => {
        if (pathname === "/" && href === "/") {
            const globalLenis = (
                window as unknown as {
                    __lenis?: { scrollTo: (target: number, opts?: { duration?: number }) => void };
                }
            ).__lenis;

            if (globalLenis && typeof globalLenis.scrollTo === "function") {
                globalLenis.scrollTo(0, { duration: 1.15 });
            } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        }
    };

    return (
        <header
            ref={headerRef}
            className={`sticky top-0 z-40 w-full pointer-events-none transition-[padding] duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                isFloating ? "py-3 sm:py-3.5" : "pt-8 sm:pt-12 pb-4"
            }`}
        >
            <div
                className={`mx-auto flex items-center justify-between pointer-events-auto transition-[max-width,width,padding,background-color,border-color,box-shadow,border-radius] duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                    isFloating
                        ? "w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] max-w-xl sm:max-w-[620px] px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-white/85 backdrop-blur-md border border-neutral-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.06),0_1px_3px_rgb(0,0,0,0.04)]"
                        : "w-full max-w-[1420px] px-6 md:px-10 py-2 sm:py-2.5 rounded-2xl bg-transparent border border-transparent shadow-none"
                }`}
            >
                <Link
                    href="/"
                    prefetch={true}
                    onClick={() => handleLogoOrInicioClick("/")}
                    className="font-heading text-sm sm:text-[15px] font-semibold tracking-tight text-neutral-950 transition-opacity duration-200 ease-out hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:rounded-sm shrink-0 min-h-[44px] sm:min-h-0 inline-flex items-center"
                    aria-label="Página inicial de João André"
                >
                    João André
                </Link>

                <nav
                    className="flex items-center gap-1.5 sm:gap-2 text-[13px] sm:text-sm font-sans font-medium"
                    aria-label="Navegação principal"
                >
                    {NAV_ITEMS.map((item) => {
                        const isActive = isItemActive(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                prefetch={true}
                                onClick={() => handleLogoOrInicioClick(item.href)}
                                className={`relative rounded-full px-3.5 sm:px-4 py-2 sm:py-1.5 min-h-[38px] sm:min-h-0 inline-flex items-center justify-center transition-colors duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-1 after:absolute after:-inset-1 after:content-[''] sm:after:hidden ${
                                    isActive
                                        ? "bg-neutral-100 text-neutral-950 font-medium"
                                        : "text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100/60"
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
