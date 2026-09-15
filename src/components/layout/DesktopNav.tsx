"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HEADER_LINKS } from "../../data/navigation";

export function DesktopNav() {
    const pathname = usePathname();

    return (
        <nav className="hidden md:flex flex-none gap-8 text-sm font-medium">
            {HEADER_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                    <Link
                        key={link.label}
                        href={link.href}
                        aria-current={isActive ? "page" : undefined}
                        className={`relative transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm px-1 py-1 ${
                            isActive ? "text-white" : "text-neutral-300 hover:text-white"
                        }`}
                    >
                        {link.label}
                    </Link>
                );
            })}
        </nav>
    );
}
