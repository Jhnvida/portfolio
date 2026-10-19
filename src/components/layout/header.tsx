"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const NAV_ITEMS = [
    { id: "inicio", label: "Início" },
    { id: "projetos", label: "Projetos" },
    { id: "sobre", label: "Sobre" },
] as const;

type HomeSection = "inicio" | "projetos" | "sobre" | "outro";

export function Header() {
    const headerRef = useRef<HTMLElement>(null);
    const pathname = usePathname();
    const [isFloating, setIsFloating] = useState(false);
    const isFloatingRef = useRef(false);
    const [activeHomeSection, setActiveHomeSection] = useState<HomeSection>("inicio");

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

            if (pathname === "/" && currentScroll < 150) {
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
            const projetosEl = document.getElementById("projetos");
            const sobreEl = document.getElementById("sobre");

            if (!projetosEl || !sobreEl) {
                retryTimeout = setTimeout(setupObserver, 80);
                return;
            }

            const visibleMap: Record<string, number> = {
                projetos: 0,
                sobre: 0,
            };

            observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        const id = entry.target.id;
                        if (entry.isIntersecting) {
                            visibleMap[id] = entry.intersectionRatio;
                        } else {
                            visibleMap[id] = 0;
                        }
                    });

                    const currentScroll = window.scrollY || document.documentElement.scrollTop || 0;
                    if (currentScroll < 150) {
                        setActiveHomeSection("inicio");
                        return;
                    }

                    const windowHeight = window.innerHeight;
                    const documentHeight = document.documentElement.scrollHeight;
                    const isNearBottom = currentScroll + windowHeight >= documentHeight - 100;

                    if (visibleMap.sobre > 0.05 || isNearBottom) {
                        setActiveHomeSection("sobre");
                    } else if (visibleMap.projetos > 0) {
                        setActiveHomeSection("projetos");
                    } else {
                        const sobreRect = sobreEl.getBoundingClientRect();
                        const projetosRect = projetosEl.getBoundingClientRect();
                        if (sobreRect.top <= 250 && sobreRect.bottom >= 100) {
                            setActiveHomeSection("sobre");
                        } else if (projetosRect.top <= 250 && projetosRect.bottom >= 100) {
                            setActiveHomeSection("projetos");
                        } else if (projetosRect.top > 250) {
                            setActiveHomeSection("inicio");
                        }
                    }
                },
                {
                    rootMargin: "-80px 0px -20% 0px",
                    threshold: [0, 0.05, 0.2, 0.5],
                },
            );

            observer.observe(projetosEl);
            observer.observe(sobreEl);
        };

        setupObserver();

        return () => {
            if (retryTimeout) clearTimeout(retryTimeout);
            if (observer) observer.disconnect();
        };
    }, [pathname]);

    const isItemActive = (itemId: (typeof NAV_ITEMS)[number]["id"]) => {
        if (pathname !== "/") {
            return itemId === "projetos";
        }

        return activeHomeSection === itemId;
    };

    const handleLogoClick = (e: React.MouseEvent) => {
        if (pathname === "/") {
            e.preventDefault();
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

    const handleNavItemClick = (e: React.MouseEvent, itemId: HomeSection) => {
        if (pathname === "/") {
            e.preventDefault();
            const globalLenis = (
                window as unknown as {
                    __lenis?: { scrollTo: (target: HTMLElement | number, opts?: { duration?: number }) => void };
                }
            ).__lenis;

            if (itemId === "inicio") {
                if (globalLenis && typeof globalLenis.scrollTo === "function") {
                    globalLenis.scrollTo(0, { duration: 1.15 });
                } else {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                }
                return;
            }

            const targetEl = document.getElementById(itemId);
            if (targetEl) {
                if (globalLenis && typeof globalLenis.scrollTo === "function") {
                    globalLenis.scrollTo(targetEl, { duration: 1.15 });
                } else {
                    targetEl.scrollIntoView({ behavior: "smooth" });
                }
            }
        } else {
            if (itemId !== "inicio") {
                try {
                    sessionStorage.setItem("scrollToSection", itemId);
                } catch {}
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
                        ? "w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] max-w-xl sm:max-w-155 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-white border border-neutral-200 shadow-[0_8px_30px_rgb(0,0,0,0.06),0_1px_3px_rgb(0,0,0,0.04)]"
                        : "w-full max-w-355 px-6 md:px-10 py-2 sm:py-2.5 rounded-2xl bg-transparent border border-transparent shadow-none"
                }`}
            >
                <Link
                    href="/"
                    prefetch={true}
                    onClick={handleLogoClick}
                    className="font-heading text-sm sm:text-[15px] font-semibold tracking-tight text-neutral-950 transition-colors duration-200 ease-out hover:text-neutral-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:rounded-sm shrink-0 min-h-11 sm:min-h-0 inline-flex items-center"
                    aria-label="Página inicial de João André"
                >
                    João André
                </Link>

                <nav
                    className="flex items-center gap-1.5 sm:gap-2 text-[13px] sm:text-sm font-sans font-medium"
                    aria-label="Navegação principal"
                >
                    {NAV_ITEMS.map((item) => {
                        const isActive = isItemActive(item.id);
                        return (
                            <Link
                                key={item.id}
                                href="/"
                                prefetch={true}
                                onClick={(e) => handleNavItemClick(e, item.id)}
                                className={`relative rounded-full px-3.5 sm:px-4 py-2 sm:py-1.5 min-h-9.5 sm:min-h-0 inline-flex items-center justify-center transition-colors duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-1 after:absolute after:-inset-1 after:content-[''] sm:after:hidden ${
                                    isActive
                                        ? "bg-neutral-100 text-neutral-950 font-medium"
                                        : "text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100"
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
