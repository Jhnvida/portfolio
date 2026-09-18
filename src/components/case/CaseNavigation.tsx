"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Project } from "../../types";

gsap.registerPlugin(ScrollTrigger);

interface CaseNavigationProps {
    nextProject?: Project;
    currentSlug: string;
}

export function CaseNavigation({ nextProject, currentSlug }: CaseNavigationProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                gsap.from(containerRef.current, {
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 90%",
                        once: true,
                    },
                    y: 16,
                    opacity: 0,
                    duration: 0.7,
                    ease: "power2.out",
                });
            });
        },
        { scope: containerRef }
    );

    return (
        <div
            ref={containerRef}
            className="w-full px-6 md:px-8 py-12 md:py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-neutral-800/60"
        >
            <Link
                href="/work"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
            >
                <ArrowLeft size={14} />
                <span>Todos os projetos</span>
            </Link>

            {nextProject && nextProject.slug !== currentSlug && (
                <Link
                    href={`/work/${nextProject.slug}`}
                    className="group flex flex-col items-start sm:items-end"
                >
                    <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-1">
                        Próximo projeto
                    </span>
                    <span className="text-lg md:text-xl font-medium text-neutral-200 group-hover:text-white transition-colors inline-flex items-center gap-1.5">
                        {nextProject.title}
                        <ArrowRight
                            size={16}
                            className="transition-transform group-hover:translate-x-1"
                        />
                    </span>
                </Link>
            )}
        </div>
    );
}
