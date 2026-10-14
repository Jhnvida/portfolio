"use client";

import gsap from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function Header() {
    const headerRef = useRef<HTMLElement>(null);
    const pathname = usePathname();

    const isHome = pathname === "/";
    const isProjects = pathname === "/projects";
    const isAbout = pathname === "/about";

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion || !headerRef.current) return;

        gsap.fromTo(headerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out" });
    }, []);

    return (
        <header ref={headerRef} className="w-full pt-10 sm:pt-14 pb-4">
            <div className="mx-auto flex max-w-355 items-center justify-between px-6 md:px-10">
                <Link
                    href="/"
                    prefetch={true}
                    className="font-heading text-sm font-semibold tracking-tight text-neutral-950 transition-opacity duration-200 ease-out hover:opacity-70 focus:outline-none focus-visible:underline"
                    aria-label="Página inicial de João André"
                >
                    João André
                </Link>

                <nav className="flex items-center gap-1.5 text-xs font-sans" aria-label="Navegação principal">
                    <Link
                        href="/"
                        prefetch={true}
                        className={`rounded-full px-3 py-1 transition-colors duration-200 ease-out focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 ${
                            isHome
                                ? "bg-neutral-100 font-medium text-neutral-950"
                                : "text-neutral-500 hover:text-neutral-900"
                        }`}
                    >
                        Início
                    </Link>

                    <Link
                        href="/projects"
                        prefetch={true}
                        className={`rounded-full px-3 py-1 transition-colors duration-200 ease-out focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 ${
                            isProjects
                                ? "bg-neutral-100 font-medium text-neutral-950"
                                : "text-neutral-500 hover:text-neutral-900"
                        }`}
                    >
                        Projetos
                    </Link>

                    <Link
                        href="/about"
                        prefetch={true}
                        className={`rounded-full px-3 py-1 transition-colors duration-200 ease-out focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 ${
                            isAbout
                                ? "bg-neutral-100 font-medium text-neutral-950"
                                : "text-neutral-500 hover:text-neutral-900"
                        }`}
                    >
                        Sobre
                    </Link>
                </nav>
            </div>
        </header>
    );
}
