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
                        fastScrollEnd: true,
                        preventOverlaps: true,
                    },
                    y: 16,
                    opacity: 0,
                    duration: 0.7,
                    ease: "power4.out",
                    clearProps: "all",
                });

                gsap.fromTo(
                    "[data-nav-hairline]",
                    { scaleX: 0 },
                    {
                        scaleX: 1,
                        transformOrigin: "left center",
                        duration: 0.9,
                        ease: "power3.inOut",
                        clearProps: "all",
                        scrollTrigger: {
                            trigger: "[data-nav-hairline]",
                            start: "top 92%",
                            once: true,
                            fastScrollEnd: true,
                            preventOverlaps: true,
                        },
                    },
                );
            });
        },
        { scope: containerRef },
    );

    return (
        <div ref={containerRef} className="w-full relative">
            <div className="w-full px-6 md:px-8 py-16 md:py-20 flex flex-col gap-10">
                <div className="flex items-center justify-between border-b border-neutral-800/60 pb-4">
                    <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">Continuidade</span>

                    <Link
                        href="/work"
                        className="inline-flex items-center gap-2 text-xs font-mono tracking-wide text-neutral-400 hover:text-white transition-colors duration-200 group"
                    >
                        <ArrowLeft size={14} className="transition-transform duration-200 group-hover:-translate-x-1" />
                        <span>Índice de projetos</span>
                    </Link>
                </div>

                {nextProject && nextProject.slug !== currentSlug && (
                    <Link
                        href={`/work/${nextProject.slug}`}
                        className="group flex flex-col gap-3 py-6 px-4 -mx-4 border border-neutral-800/80 hover:border-neutral-700 bg-neutral-900/20 hover:bg-neutral-900/40 rounded-none transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400"
                    >
                        <div className="flex items-center justify-between text-xs font-mono text-neutral-500">
                            <span>Próximo Estudo de Caso</span>
                            <span className="text-neutral-400 font-mono">· {nextProject.year}</span>
                        </div>

                        <div className="flex items-baseline justify-between gap-4">
                            <div className="flex flex-col gap-1">
                                <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-neutral-100 group-hover:text-white transition-colors duration-200">
                                    {nextProject.title}
                                </h2>
                                <p className="text-xs sm:text-sm font-mono text-neutral-400">
                                    {nextProject.category || nextProject.client} —{" "}
                                    {nextProject.role || nextProject.impact}
                                </p>
                            </div>

                            <div className="flex items-center text-neutral-400 group-hover:text-white transition-colors duration-200 shrink-0">
                                <ArrowRight
                                    size={22}
                                    className="transition-transform duration-200 ease-out group-hover:translate-x-1.5"
                                />
                            </div>
                        </div>
                    </Link>
                )}
            </div>

            <div data-nav-hairline className="absolute bottom-0 left-0 w-full h-px bg-neutral-800/60 origin-left" />
        </div>
    );
}
