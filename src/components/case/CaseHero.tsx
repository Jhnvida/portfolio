"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowLeft } from "lucide-react";
import { useRef } from "react";
import { Project } from "../../types";
import { Link } from "../providers/ViewTransitionsProvider";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

interface CaseHeroProps {
    project: Project;
}

export function CaseHero({ project }: CaseHeroProps) {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                const tl = gsap.timeline({
                    defaults: { ease: "power4.out" },
                });

                tl.from("[data-case-back]", {
                    y: 10,
                    opacity: 0,
                    duration: 0.6,
                })
                    .from(
                        "[data-case-tag]",
                        {
                            y: 10,
                            opacity: 0,
                            duration: 0.5,
                        },
                        "-=0.4",
                    )
                    .from(
                        "[data-case-mask-title]",
                        {
                            yPercent: 105,
                            duration: 0.9,
                        },
                        "-=0.4",
                    )
                    .from(
                        "[data-case-subtitle]",
                        {
                            y: 14,
                            opacity: 0,
                            duration: 0.7,
                        },
                        "-=0.55",
                    )
                    .fromTo(
                        "[data-case-hairline]",
                        { scaleX: 0 },
                        {
                            scaleX: 1,
                            transformOrigin: "left center",
                            duration: 0.9,
                            ease: "power3.inOut",
                        },
                        "-=0.5",
                    )
                    .from(
                        "[data-case-meta-item]",
                        {
                            y: 14,
                            opacity: 0,
                            stagger: 0.06,
                            duration: 0.65,
                        },
                        "-=0.6",
                    )
                    .fromTo(
                        "[data-case-hairline-2]",
                        { scaleX: 0 },
                        {
                            scaleX: 1,
                            transformOrigin: "left center",
                            duration: 0.9,
                            ease: "power3.inOut",
                        },
                        "-=0.5",
                    )
                    .from(
                        "[data-case-footer]",
                        {
                            y: 10,
                            opacity: 0,
                            duration: 0.6,
                        },
                        "-=0.6",
                    )
                    .fromTo(
                        "[data-case-bottom-hairline]",
                        { scaleX: 0 },
                        {
                            scaleX: 1,
                            transformOrigin: "left center",
                            duration: 0.9,
                            ease: "power3.inOut",
                        },
                        "-=0.6",
                    );
            });
        },
        { scope: containerRef },
    );

    return (
        <section
            ref={containerRef}
            className="relative w-full flex flex-col justify-start pt-10 sm:pt-12 md:pt-16 pb-10 sm:pb-12 md:pb-16"
        >
            <div className="w-full px-6 md:px-8 flex flex-col items-start gap-8">
                <div data-case-back>
                    <Link
                        href="/work"
                        className="inline-flex items-center gap-2 min-h-11 text-xs font-mono tracking-wide text-neutral-400 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 rounded-none group"
                    >
                        <ArrowLeft
                            size={14}
                            className="transition-transform duration-200 group-hover:-translate-x-0.5"
                        />
                        <span>Voltar para projetos</span>
                    </Link>
                </div>

                <div className="flex flex-col gap-3 max-w-3xl">
                    <span data-case-tag className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                        Estudo de caso autoral
                    </span>

                    <div className="overflow-hidden pb-1.5">
                        <h1
                            data-case-mask-title
                            className="text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight text-neutral-100 leading-[1.2] sm:leading-[1.15]"
                        >
                            {project.title}
                        </h1>
                    </div>

                    <p data-case-subtitle className="text-base md:text-lg text-neutral-400 leading-relaxed">
                        {project.role || project.impact}
                    </p>
                </div>

                <div data-case-hairline className="w-full h-px bg-neutral-800/70 origin-left" />

                <div className="grid grid-cols-2 sm:grid-cols-4 w-full gap-4 sm:gap-6">
                    <div data-case-meta-item className="flex flex-col gap-1.5">
                        <span className="text-xs uppercase tracking-wider text-neutral-500 font-mono">Origem</span>
                        <span className="text-sm md:text-base text-neutral-200 font-medium">
                            {project.category || project.client}
                        </span>
                    </div>

                    <div data-case-meta-item className="flex flex-col gap-1.5">
                        <span className="text-xs uppercase tracking-wider text-neutral-500 font-mono">Ano</span>
                        <span className="text-sm md:text-base text-neutral-200 font-medium">{project.year}</span>
                    </div>

                    <div data-case-meta-item className="flex flex-col gap-1.5">
                        <span className="text-xs uppercase tracking-wider text-neutral-500 font-mono">Foco</span>
                        <span className="text-sm md:text-base text-neutral-200 font-medium">{project.impact}</span>
                    </div>

                    <div data-case-meta-item className="flex flex-col gap-1.5">
                        <span className="text-xs uppercase tracking-wider text-neutral-500 font-mono">Papel</span>
                        <span className="text-sm md:text-base text-neutral-200 font-medium">{project.role}</span>
                    </div>
                </div>

                <div data-case-hairline-2 className="w-full h-px bg-neutral-800/70 origin-left" />

                <div
                    data-case-footer
                    className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                    <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-xs uppercase tracking-wider text-neutral-500 font-mono mr-2">Stack</span>

                        {project.stack.map((tech) => (
                            <Badge key={tech} variant="outline" className="text-xs py-0.5 px-2.5 rounded-none">
                                {tech}
                            </Badge>
                        ))}
                    </div>

                    {project.githubUrl && (
                        <div>
                            <Button
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="secondary"
                                size="sm"
                                showArrow
                            >
                                Ver código no GitHub
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            <div
                data-case-bottom-hairline
                className="absolute bottom-0 left-0 w-full h-px bg-neutral-800/60 origin-left"
            />
        </section>
    );
}
