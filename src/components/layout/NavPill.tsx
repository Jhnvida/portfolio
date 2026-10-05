"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "../../data/site";
import { cn } from "../../lib/utils";

function isActive(pathname: string, href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavPill() {
    const pathname = usePathname();

    return (
        <nav aria-label="Principal">
            <ul className="flex items-center gap-0.5">
                {NAV_LINKS.map((link) => {
                    const active = isActive(pathname, link.href);
                    return (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                aria-current={active ? "page" : undefined}
                                className={cn(
                                    "relative inline-flex h-8 items-center rounded-full px-2.5 sm:px-3 text-meta transition-colors duration-200 before:absolute before:content-[''] before:-inset-y-1.5 before:inset-x-0 sm:before:hidden",
                                    active ? "bg-surface-strong font-medium text-ink" : "text-ink-2 hover:text-ink",
                                )}
                            >
                                {link.label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
