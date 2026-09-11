"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 flex justify-center transition-all duration-500 ease-out ${
                isScrolled ? "pt-4 px-4" : "pt-0 px-0"
            }`}
        >
            <div
                className={`flex justify-between items-center w-full transition-all duration-500 ease-out overflow-hidden ${
                    isScrolled
                        ? "max-w-4xl mx-auto py-3 px-6 md:px-8 bg-neutral-950/80 backdrop-blur-lg border border-neutral-800 shadow-2xl"
                        : "max-w-(--container-page) mx-auto py-6 px-6 md:px-12 lg:px-24 bg-transparent border-transparent"
                }`}
            >
                <div className="flex-1 flex justify-start">
                    <Link
                        href="/"
                        className="font-heading font-bold text-xl tracking-tight hover:opacity-80 transition-opacity"
                    >
                        João Silva
                    </Link>
                </div>

                <nav className="hidden md:flex flex-none gap-8 text-sm font-medium">
                    <Link href="/work" className="hover:text-white text-gray-400 transition-colors">
                        Trabalhos
                    </Link>
                    <Link href="/process" className="hover:text-white text-gray-400 transition-colors">
                        Processo
                    </Link>
                    <Link href="/services" className="hover:text-white text-gray-400 transition-colors">
                        Serviços
                    </Link>
                    <Link href="/contact" className="hover:text-white text-gray-400 transition-colors">
                        Contato
                    </Link>
                </nav>

                <div className="flex-1 flex justify-end gap-4 text-sm font-medium">
                    <button className="cursor-pointer hover:text-white text-gray-400 transition-colors">PT</button>
                    <button className="cursor-pointer hover:text-white text-gray-400 transition-colors">EN</button>
                </div>
            </div>
        </header>
    );
}
