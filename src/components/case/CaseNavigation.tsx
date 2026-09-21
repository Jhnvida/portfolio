"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";
import { Project } from "../../types";
import { Link } from "../providers/ViewTransitionsProvider";

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
                    ease: "power4.out",
                });

                gsap.fromTo(
                    "[data-nav-hairline]",
                    { scaleX: 0 },
                    {
                        scaleX: 1,
                        transformOrigin: "left center",
                        duration: 0.9,
                        ease: "power3.inOut",
                        scrollTrigger: {
                            trigger: "[data-nav-hairline]",
                            start: "top 95%",
                            once: true,
                        },
                    },
                );
            });
        },
        { scope: containerRef },
    );

    return (
        <div ref={containerRef} className="w-full relative">
            <div className="w-full px-6 md:px-8 py-12 md:py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <Link
                    href="/work"
                    className="inline-flex items-center gap-2 text-xs font-mono tracking-wide text-neutral-400 hover:text-white transition-colors duration-200 group"
                >
                    <ArrowLeft size={14} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
                    <span>Todos os projetos</span>
                </Link>

                {nextProject && nextProject.slug !== currentSlug && (
                    <Link href={`/work/${nextProject.slug}`} className="group flex flex-col items-start sm:items-end">
                        <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-1">
                            Próximo projeto
                        </span>

                        <span className="text-lg md:text-xl font-medium text-neutral-200 group-hover:text-white transition-colors duration-200 inline-flex items-center gap-1.5">
                            {nextProject.title}
                            <ArrowRight
                                size={16}
                                className="transition-transform duration-200 group-hover:translate-x-1"
                            />
                        </span>
                    </Link>
                )}
            </div>

            <div data-nav-hairline className="absolute bottom-0 left-0 w-full h-px bg-neutral-800/60 origin-left" />
        </div>
    );
}
