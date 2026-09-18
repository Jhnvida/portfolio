"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
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
                const headerTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: "[data-work-header]",
                        start: "top 85%",
                        once: true,
                    },
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

                gsap.fromTo(
                    "[data-work-hairline]",
                    { scaleX: 0 },
                    {
                        scaleX: 1,
                        transformOrigin: "left center",
                        duration: 0.9,
                        ease: "power3.inOut",
                        scrollTrigger: {
                            trigger: "[data-work-hairline]",
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
        <section ref={containerRef} id="work" className="w-full pt-16 md:pt-24 relative scroll-mt-12">
            <div className="w-full px-6 md:px-8 flex flex-col gap-10 pb-16 md:pb-24">
                <div data-work-header className="flex flex-col gap-2">
                    <span data-work-tag className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                        Projetos Selecionados
                    </span>
                    <div className="overflow-hidden pb-1">
                        <h2
                            data-work-mask-title
                            className="text-2xl md:text-3xl font-medium tracking-tight text-neutral-100"
                        >
                            Trabalhos em destaque
                        </h2>
                    </div>
                    <p data-work-desc className="text-sm md:text-base text-neutral-400 max-w-xl leading-relaxed">
                        Criações autorais e estudos de caso desenvolvidos com esmero no design, microinterações e
                        engenharia web moderna.
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

            <div data-work-hairline className="absolute bottom-0 left-0 w-full h-[1px] bg-neutral-800/60 origin-left" />
        </section>
    );
}
