"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useScrollState } from "../../hooks/useScrollState";
import { useSmoothScroll } from "../providers/SmoothScrollProvider";
import { Button } from "../ui/Button";
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
            className={`fixed top-0 left-0 w-full z-50 flex justify-center transition-all duration-500 ease-out ${
                isScrolled ? "pt-4 px-4" : "pt-0 px-0"
            }`}
        >
            <div
                className={`flex justify-between items-center w-full transition-all duration-500 ease-out ${
                    isScrolled
                        ? "max-w-4xl mx-auto py-3 px-6 md:px-8 bg-neutral-950/80 backdrop-blur-lg border border-neutral-800 shadow-2xl rounded-full"
                        : "max-w-(--container-page) mx-auto py-6 px-6 md:px-12 lg:px-24 bg-transparent border-transparent"
                }`}
            >
                <div className="flex-1 flex justify-start z-50">
                    <Link
                        href="/"
                        className="font-heading font-bold text-xl tracking-tight hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        João Vida
                    </Link>
                </div>

                <DesktopNav />

                <div className="hidden md:flex flex-1 justify-end items-center gap-4 text-sm font-medium">
                    <Button href="/contact" variant="secondary" className="px-5 py-2.5">
                        Contato
                    </Button>
                </div>

                <div className="flex flex-1 justify-end md:hidden z-50">
                    <button
                        className="p-2 text-white hover:text-gray-300 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-md"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-menu"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            <MobileNav isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </header>
    );
}
