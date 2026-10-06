"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "../../data/site";
import { cn } from "../../lib/utils";
import { NavPillProps } from "../../types";

function isActive(pathname: string, href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavPill({ isFloating, variant = "default", viewTransition = true }: NavPillProps) {
    const pathname = usePathname();
    const floating = isFloating !== undefined ? isFloating : variant === "floating";

    return (
        <nav aria-label="Principal">
            <ul className="flex items-center gap-0.5 sm:gap-1.5">
                {NAV_LINKS.map((link) => {
                    const active = isActive(pathname, link.href);
                    return (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                aria-current={active ? "page" : undefined}
                                className={cn(
                                    "relative inline-flex h-8 items-center rounded-full px-2.5 sm:px-3.5 text-meta transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
                                    floating
                                        ? active
                                            ? "font-medium text-white"
                                            : "text-neutral-400 hover:text-white"
                                        : active
                                          ? "font-medium text-ink"
                                          : "text-ink-2 hover:text-ink",
                                )}
                            >
                                {active && (
                                    <span
                                        aria-hidden="true"
                                        style={viewTransition ? { viewTransitionName: "nav-pill" } : undefined}
                                        className={cn(
                                            "absolute inset-0 -z-10 rounded-full transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
                                            floating ? "bg-white/15" : "bg-surface-strong",
                                        )}
                                    />
                                )}
                                <span className="relative z-10">{link.label}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
