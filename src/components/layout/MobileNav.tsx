"use client";

import { ArrowUpRight } from "lucide-react";
import { Link } from "../providers/ViewTransitionsProvider";
import { usePathname } from "next/navigation";
import { HEADER_LINKS } from "../../data/navigation";
import { cn } from "../../lib/utils";

interface MobileNavProps {
    isOpen: boolean;
    onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
    const pathname = usePathname();

    if (!isOpen) return null;

    return (
        <div
            id="mobile-menu"
            className="fixed inset-0 top-[57px] z-50 bg-[#050505]/95 backdrop-blur-xl flex flex-col p-6 md:hidden border-b border-neutral-800 animate-in fade-in duration-200"
        >
            <nav className="flex flex-col gap-4 text-xl font-medium pt-4">
                {HEADER_LINKS.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.label}
                            href={link.href}
                            aria-current={isActive ? "page" : undefined}
                            className={cn(
                                "flex items-center justify-between py-2 transition-colors",
                                isActive ? "text-white font-semibold" : "text-neutral-400 hover:text-white",
                            )}
                            onClick={onClose}
                        >
                            <span>{link.label}</span>
                            <ArrowUpRight size={18} className="opacity-40" />
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
