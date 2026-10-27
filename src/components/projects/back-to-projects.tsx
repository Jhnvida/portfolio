"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function BackToProjectsLink({ className = "" }: { className?: string }) {
    const handleClick = () => {
        try {
            sessionStorage.setItem("scrollToSection", "projetos");
        } catch {}
    };

    return (
        <Link
            href="/"
            prefetch={true}
            onClick={handleClick}
            className={`group inline-flex items-center gap-2 text-xs sm:text-sm font-sans font-medium text-neutral-600 transition-colors duration-200 hover:text-neutral-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 ${className}`}
        >
            <ArrowLeft
                aria-hidden="true"
                className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 ease-out group-hover:-translate-x-0.5"
            />
            <span>Voltar para projetos</span>
        </Link>
    );
}
