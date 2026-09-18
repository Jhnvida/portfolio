"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ProjectCard } from "../ui/ProjectCard";
import { Project } from "../../types";

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
                gsap.from("[data-work-header]", {
                    y: 20,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power2.out",
                });

                const cards = containerRef.current?.querySelectorAll("[data-work-card]");
                if (cards) {
                    cards.forEach((card) => {
                        gsap.from(card, {
                            scrollTrigger: {
                                trigger: card,
                                start: "top 85%",
                                once: true,
                            },
                            y: 24,
                            opacity: 0,
                            duration: 0.8,
                            ease: "power2.out",
                        });
                    });
                }
            });
        },
        { scope: containerRef }
    );

    return (
        <main ref={containerRef} className="w-full flex flex-col">
            <div
                data-work-header
                className="w-full px-6 md:px-8 pt-16 md:pt-24 pb-12 md:pb-16 border-b border-neutral-800/60"
            >
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-4 block">
                    Arquivo de Projetos
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-neutral-100 mb-4 leading-tight">
                    Projetos e criações.
                </h1>
                <p className="text-base md:text-lg text-neutral-400 leading-relaxed max-w-xl">
                    Uma seleção de projetos autorais e estudos de caso desenvolvidos com rigor visual, microinterações cuidadas e foco na experiência real de quem usa.
                </p>
            </div>

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
