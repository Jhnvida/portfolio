"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useScrollState } from "../../hooks/useScrollState";
import { useSmoothScroll } from "../providers/SmoothScrollProvider";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";

export function Header() {
    const isScrolled = useScrollState();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const lenis = useSmoothScroll();

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
            lenis?.stop();
        } else {
            document.body.style.overflow = "unset";
            lenis?.start();
        }
        return () => {
            document.body.style.overflow = "unset";
            lenis?.start();
        };
    }, [isMenuOpen, lenis]);

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 flex justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isScrolled ? "pt-4 px-4" : "pt-0 px-0"
            }`}
        >
            <div
                className={`flex justify-between items-center w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isScrolled
                        ? "max-w-4xl mx-auto py-3.5 px-6 md:px-8 bg-white/3 backdrop-blur-xl border border-white/8 shadow-2xl rounded-full"
                        : "max-w-(--container-page) mx-auto py-8 px-6 md:px-12 lg:px-24 bg-transparent border-transparent"
                }`}
            >
                <div className="flex justify-start z-50">
                    <Link
                        href="/"
                        className="font-heading font-medium text-xl md:text-2xl tracking-tighter text-white hover:text-white/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        João Vida
                    </Link>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    <DesktopNav />

                    <Link
                        href="/contact"
                        className="group flex items-center gap-1.5 text-[13px] md:text-sm font-medium text-neutral-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm px-2 py-1"
                    >
                        <span>Contato</span>
                        <ArrowUpRight
                            size={16}
                            className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 opacity-70 group-hover:opacity-100"
                        />
                    </Link>
                </div>

                <div className="flex md:hidden z-50">
                    <button
                        className="p-2 text-neutral-300 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-full bg-white/3 border border-white/8"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-menu"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            <MobileNav isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </header>
    );
}
