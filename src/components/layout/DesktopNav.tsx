"use client";

import { Link } from "../providers/ViewTransitionsProvider";
import { usePathname } from "next/navigation";
import { HEADER_LINKS } from "../../data/navigation";
import { cn } from "../../lib/utils";

export function DesktopNav() {
    const pathname = usePathname();

    return (
        <nav className="flex items-center gap-6 text-sm font-medium">
            {HEADER_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                    <Link
                        key={link.label}
                        href={link.href}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                            "relative transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 rounded-sm py-1",
                            isActive ? "text-neutral-100 font-semibold" : "text-neutral-400 hover:text-neutral-100",
                        )}
                    >
                        {link.label}
                    </Link>
                );
            })}
        </nav>
    );
}
