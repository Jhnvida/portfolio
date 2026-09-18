"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "../providers/ViewTransitionsProvider";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMenuOpen]);

    return (
        <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#050505]/85 border-b border-neutral-800/60">
            <div className="w-full px-6 md:px-8 py-4 flex items-center justify-between">
                <Link
                    href="/"
                    className="font-heading font-semibold text-base tracking-tight text-neutral-100 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 rounded-none"
                    onClick={() => setIsMenuOpen(false)}
                >
                    João Vida
                </Link>

                <div className="hidden md:flex items-center gap-6">
                    <DesktopNav />
                </div>

                <div className="flex md:hidden items-center">
                    <button
                        className="p-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 rounded-none border border-neutral-800"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-menu"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>
            </div>

            <MobileNav isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </header>
    );
}
