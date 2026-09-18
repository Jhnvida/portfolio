"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { Project } from "../../types";
import { ProjectCard } from "../ui/ProjectCard";

gsap.registerPlugin(ScrollTrigger);

interface WorkViewProps {
    projects: Project[];
}

export function WorkView({ projects }: WorkViewProps) {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                const headerTl = gsap.timeline({
                    defaults: { ease: "power4.out" },
                });

                headerTl
                    .from("[data-work-tag]", {
                        y: 10,
                        opacity: 0,
                        duration: 0.6,
                    })
                    .from(
                        "[data-work-mask-title]",
                        {
                            yPercent: 105,
                            duration: 0.9,
                        },
                        "-=0.45",
                    )
                    .from(
                        "[data-work-desc]",
                        {
                            y: 14,
                            opacity: 0,
                            duration: 0.7,
                        },
                        "-=0.55",
                    )
                    .fromTo(
                        "[data-work-header-hairline]",
                        { scaleX: 0 },
                        {
                            scaleX: 1,
                            transformOrigin: "left center",
                            duration: 0.9,
                            ease: "power3.inOut",
                        },
                        "-=0.5",
                    );

                const cards = containerRef.current?.querySelectorAll("[data-work-card]");
                if (cards) {
                    cards.forEach((card) => {
                        gsap.from(card, {
                            scrollTrigger: {
                                trigger: card,
                                start: "top 85%",
                                once: true,
                            },
                            y: 28,
                            opacity: 0,
                            duration: 0.85,
                            ease: "power4.out",
                        });
                    });
                }
            });
        },
        { scope: containerRef },
    );

    return (
        <main ref={containerRef} className="w-full flex flex-col">
            <div className="w-full px-6 md:px-8 pt-16 md:pt-24 pb-12 md:pb-16 relative">
                <span data-work-tag className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-4 block">
                    Meus Projetos
                </span>

                <div className="overflow-hidden pb-1 mb-4">
                    <h1
                        data-work-mask-title
                        className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-neutral-100 leading-tight"
                    >
                        Projetos e criações.
                    </h1>
                </div>

                <p data-work-desc className="text-base md:text-lg text-neutral-400 leading-relaxed max-w-xl">
                    Uma seleção de projetos autorais e estudos de caso desenvolvidos com rigor visual, microinterações
                    cuidadas e foco na experiência real de quem usa.
                </p>
            </div>

            <div data-work-header-hairline className="w-full h-[1px] bg-neutral-800/60 origin-left" />

            <div className="w-full px-6 md:px-8 py-12 md:py-16">
                <div className="grid grid-cols-1 gap-8">
                    {projects.map((project, index) => (
                        <div key={project.id} data-work-card>
                            <ProjectCard project={project} priority={index === 0} />
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
