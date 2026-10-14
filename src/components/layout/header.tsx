"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function Header() {
    const pathname = usePathname();
    const [activeHash, setActiveHash] = useState<string>("");

    useEffect(() => {
        const handleHashChange = () => {
            setActiveHash(window.location.hash);
        };

        handleHashChange();
        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, []);

    const isHome = pathname === "/" && activeHash !== "#work";
    const isWork = pathname === "/" && activeHash === "#work";
    const isAbout = pathname === "/about";

    return (
        <header className="w-full pt-10 sm:pt-14 pb-4">
            <div className="mx-auto flex max-w-4xl items-center justify-between px-6">
                <Link
                    href="/"
                    prefetch={true}
                    onClick={() => setActiveHash("")}
                    className="font-heading text-sm font-semibold tracking-tight text-neutral-950 transition-opacity hover:opacity-70"
                >
                    João André
                </Link>

                <nav className="flex items-center gap-1.5 text-xs font-sans" aria-label="Navegação principal">
                    <Link
                        href="/"
                        prefetch={true}
                        onClick={() => setActiveHash("")}
                        className={`rounded-full px-3 py-1 transition-colors duration-150 ${
                            isHome
                                ? "bg-neutral-100 font-medium text-neutral-950"
                                : "text-neutral-500 hover:text-neutral-900"
                        }`}
                    >
                        Home
                    </Link>

                    <Link
                        href="/#work"
                        onClick={() => setActiveHash("#work")}
                        className={`rounded-full px-3 py-1 transition-colors duration-150 ${
                            isWork
                                ? "bg-neutral-100 font-medium text-neutral-950"
                                : "text-neutral-500 hover:text-neutral-900"
                        }`}
                    >
                        Work
                    </Link>

                    <Link
                        href="/about"
                        prefetch={true}
                        onClick={() => setActiveHash("")}
                        className={`rounded-full px-3 py-1 transition-colors duration-150 ${
                            isAbout
                                ? "bg-neutral-100 font-medium text-neutral-950"
                                : "text-neutral-500 hover:text-neutral-900"
                        }`}
                    >
                        About
                    </Link>
                </nav>
            </div>
        </header>
    );
}
