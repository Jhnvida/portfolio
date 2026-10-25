"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
    { id: "inicio", label: "Início" },
    { id: "projetos", label: "Projetos" },
] as const;

type HomeSection = "inicio" | "projetos" | "outro";

export function Header() {
    const pathname = usePathname();
    const [activeHomeSection, setActiveHomeSection] = useState<HomeSection>("inicio");

    useEffect(() => {
        const checkScroll = () => {
            const currentScroll = window.scrollY || document.documentElement.scrollTop || 0;
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

            if (!projetosEl) {
                retryTimeout = setTimeout(setupObserver, 80);
                return;
            }

            let projetosVisibleRatio = 0;

            observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.target.id === "projetos") {
                            projetosVisibleRatio = entry.isIntersecting ? entry.intersectionRatio : 0;
                        }
                    });

                    const currentScroll = window.scrollY || document.documentElement.scrollTop || 0;
                    if (currentScroll < 150) {
                        setActiveHomeSection("inicio");
                        return;
                    }

                    if (projetosVisibleRatio > 0) {
                        setActiveHomeSection("projetos");
                    } else {
                        const projetosRect = projetosEl.getBoundingClientRect();
                        if (projetosRect.top <= 250) {
                            setActiveHomeSection("projetos");
                        } else {
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
            aria-label="Cabeçalho principal"
            className="fixed top-0 inset-x-0 z-40 w-full pointer-events-none bg-transparent py-6 sm:py-7"
        >
            <div className="w-full px-6 md:px-10 lg:px-12 xl:px-16 flex items-center justify-between">
                <Link
                    href="/"
                    prefetch={true}
                    onClick={handleLogoClick}
                    className="pointer-events-auto font-heading text-sm sm:text-base font-medium tracking-tight text-neutral-950 transition-colors duration-200 ease-out hover:text-neutral-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 shrink-0 inline-flex items-center"
                    aria-label="Página inicial de João André"
                >
                    João André
                </Link>

                <nav
                    className="pointer-events-auto flex items-center gap-1 sm:gap-2 text-xs sm:text-[13px] font-sans font-medium"
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
                                className={`relative rounded-md px-2.5 sm:px-3 py-1.5 transition-colors duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-1 ${
                                    isActive
                                        ? "text-neutral-950 font-semibold"
                                        : "text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100/50"
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
