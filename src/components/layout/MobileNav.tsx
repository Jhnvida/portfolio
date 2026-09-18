"use client";

import { ArrowUpRight, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { HEADER_LINKS } from "../../data/navigation";
import { cn } from "../../lib/utils";
import { Link } from "../providers/ViewTransitionsProvider";

interface MobileNavProps {
    isOpen: boolean;
    onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    if (!mounted || !isOpen) return null;

    return createPortal(
        <div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navegação principal"
            className="fixed inset-0 z-50 bg-[#050505] flex flex-col justify-between md:hidden touch-manipulation"
        >
            <div className="w-full border-b border-neutral-800/60 bg-[#050505] pt-[env(safe-area-inset-top,0px)]">
                <div className="w-full px-6 md:px-8 py-3.5 sm:py-4 flex items-center justify-between">
                    <Link
                        href="/"
                        className="font-heading font-semibold text-base tracking-tight text-neutral-100 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 rounded-none min-h-11 flex items-center touch-manipulation"
                        onClick={() => {
                            if (pathname === "/") {
                                onClose();
                            } else {
                                setTimeout(onClose, 100);
                            }
                        }}
                    >
                        João Vida
                    </Link>

                    <button
                        type="button"
                        className="min-h-11 min-w-11 flex items-center justify-center p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 rounded-none border border-neutral-800 touch-manipulation"
                        onClick={onClose}
                        aria-label="Fechar menu"
                    >
                        <X size={18} />
                    </button>
                </div>
            </div>

            <nav className="flex-1 flex flex-col justify-center px-6 md:px-8 gap-3 py-8">
                {HEADER_LINKS.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.label}
                            href={link.href}
                            aria-current={isActive ? "page" : undefined}
                            className={cn(
                                "flex items-center justify-between min-h-12 py-3.5 px-2 text-2xl font-medium tracking-tight transition-colors border-b border-neutral-800/50 touch-manipulation",
                                isActive ? "text-white font-semibold" : "text-neutral-400 hover:text-white",
                            )}
                            onClick={() => {
                                if (pathname === link.href) {
                                    onClose();
                                } else {
                                    setTimeout(onClose, 100);
                                }
                            }}
                        >
                            <span>{link.label}</span>
                            <ArrowUpRight size={20} className="text-neutral-500 opacity-60" />
                        </Link>
                    );
                })}
            </nav>

            <div className="w-full px-6 md:px-8 py-6 pb-[calc(2rem+env(safe-area-inset-bottom,0px))] border-t border-neutral-800/40 text-xs font-mono text-neutral-500 flex items-center justify-between">
                <span>João Vida</span>
                <span>Design & Front-End</span>
            </div>
        </div>,
        document.body,
    );
}
