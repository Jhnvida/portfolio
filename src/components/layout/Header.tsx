"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSmoothScroll } from "../providers/SmoothScrollProvider";

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const lenis = useSmoothScroll();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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

                <nav className="hidden md:flex flex-none gap-8 text-sm font-medium">
                    <Link
                        href="/work"
                        className="hover:text-white text-gray-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm px-1"
                    >
                        Trabalho
                    </Link>
                    <Link
                        href="/about"
                        className="hover:text-white text-gray-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm px-1"
                    >
                        Sobre
                    </Link>
                    <Link
                        href="/services"
                        className="hover:text-white text-gray-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm px-1"
                    >
                        Serviços
                    </Link>
                </nav>

                <div className="hidden md:flex flex-1 justify-end items-center gap-4 text-sm font-medium">
                    <div className="flex gap-4 mr-4">
                        <button className="cursor-pointer hover:text-white text-gray-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm px-1">
                            PT
                        </button>
                        <button className="cursor-pointer hover:text-white text-gray-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm px-1">
                            EN
                        </button>
                    </div>

                    <Link
                        href="/contact"
                        className="px-5 py-2.5 bg-white text-black font-medium hover:bg-neutral-200 transition-colors rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    >
                        Contato
                    </Link>
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

            <div
                id="mobile-menu"
                className={`fixed inset-0 bg-neutral-950/95 backdrop-blur-xl flex flex-col justify-center items-center gap-8 transition-all duration-500 md:hidden -z-10 ${
                    isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
                }`}
            >
                <nav className="flex flex-col items-center gap-8 text-2xl font-medium">
                    <Link
                        href="/work"
                        className="hover:text-white text-gray-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm px-2"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Trabalho
                    </Link>
                    <Link
                        href="/about"
                        className="hover:text-white text-gray-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm px-2"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Sobre
                    </Link>
                    <Link
                        href="/services"
                        className="hover:text-white text-gray-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm px-2"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Serviços
                    </Link>
                    <Link
                        href="/contact"
                        className="mt-4 px-8 py-4 bg-white text-black font-medium hover:bg-neutral-200 transition-colors rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Contato
                    </Link>
                </nav>

                <div className="flex gap-6 mt-8 text-lg font-medium">
                    <button className="cursor-pointer hover:text-white text-gray-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm px-2">
                        PT
                    </button>
                    <button className="cursor-pointer hover:text-white text-gray-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm px-2">
                        EN
                    </button>
                </div>
            </div>
        </header>
    );
}
