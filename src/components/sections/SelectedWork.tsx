"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PROJECTS } from "../../data/projects";
import { Button } from "../ui/Button";
import { ProjectCard } from "../ui/ProjectCard";

gsap.registerPlugin(ScrollTrigger);

export function SelectedWork() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                gsap.from("[data-work-header]", {
                    scrollTrigger: {
                        trigger: "[data-work-header]",
                        start: "top 85%",
                        once: true,
                    },
                    y: 24,
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
                            y: 28,
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
        <section
            ref={containerRef}
            id="work"
            className="w-full py-16 md:py-24 border-b border-neutral-800/60 scroll-mt-12"
        >
            <div className="w-full px-6 md:px-8 flex flex-col gap-10">
                <div data-work-header className="flex flex-col gap-2">
                    <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                        Projetos Selecionados
                    </span>
                    <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-neutral-100">
                        Trabalhos em destaque
                    </h2>
                    <p className="text-sm md:text-base text-neutral-400 max-w-xl leading-relaxed">
                        Criações autorais e estudos de caso desenvolvidos com esmero no design, microinterações e engenharia web moderna.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8">
                    {PROJECTS.map((project, index) => (
                        <div key={project.id} data-work-card>
                            <ProjectCard project={project} priority={index === 0} />
                        </div>
                    ))}
                </div>

                <div className="pt-2 flex items-center justify-between">
                    <Button href="/work" variant="secondary" showArrow size="md">
                        Ver arquivo completo de projetos
                    </Button>
                </div>
            </div>
        </section>
    );
}
