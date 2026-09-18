"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { Project } from "../../types";
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
                    defaults: { ease: "power2.out", duration: 0.7 },
                });

                tl.from("[data-case-back]", {
                    y: 10,
                    opacity: 0,
                })
                    .from(
                        "[data-case-header]",
                        {
                            y: 20,
                            opacity: 0,
                        },
                        "-=0.5",
                    )
                    .from(
                        "[data-case-meta]",
                        {
                            y: 15,
                            opacity: 0,
                        },
                        "-=0.5",
                    )
                    .from(
                        "[data-case-footer]",
                        {
                            y: 10,
                            opacity: 0,
                        },
                        "-=0.5",
                    );
            });
        },
        { scope: containerRef },
    );

    return (
        <section
            ref={containerRef}
            className="relative w-full flex flex-col justify-start pt-12 md:pt-16 pb-12 md:pb-16 border-b border-neutral-800/60"
        >
            <div className="w-full px-6 md:px-8 flex flex-col items-start gap-8">
                <div data-case-back>
                    <Link
                        href="/work"
                        className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 rounded-none"
                    >
                        <ArrowLeft size={14} />
                        <span>Voltar para projetos</span>
                    </Link>
                </div>

                <div data-case-header className="flex flex-col gap-3 max-w-3xl">
                    <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                        Estudo de caso autoral
                    </span>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-neutral-100 leading-[1.15]">
                        {project.title}
                    </h1>

                    <p className="text-base md:text-lg text-neutral-400 leading-relaxed">
                        {project.role || project.impact}
                    </p>
                </div>

                <div
                    data-case-meta
                    className="grid grid-cols-2 sm:grid-cols-4 w-full gap-6 border-t border-neutral-800/70 pt-8"
                >
                    <div className="flex flex-col gap-1.5">
                        <span className="text-xs uppercase tracking-wider text-neutral-500 font-mono">Origem</span>
                        <span className="text-sm md:text-base text-neutral-200 font-medium">
                            {project.category || project.client}
                        </span>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <span className="text-xs uppercase tracking-wider text-neutral-500 font-mono">Ano</span>
                        <span className="text-sm md:text-base text-neutral-200 font-medium">{project.year}</span>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <span className="text-xs uppercase tracking-wider text-neutral-500 font-mono">Foco</span>
                        <span className="text-sm md:text-base text-neutral-200 font-medium">{project.impact}</span>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <span className="text-xs uppercase tracking-wider text-neutral-500 font-mono">Repositório</span>
                        {project.githubUrl ? (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-sm font-medium text-neutral-200 hover:text-white transition-colors group"
                            >
                                <span>GitHub</span>
                                <ArrowUpRight
                                    size={14}
                                    className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                                />
                            </a>
                        ) : (
                            <span className="text-sm text-neutral-500">Privado</span>
                        )}
                    </div>
                </div>

                <div
                    data-case-footer
                    className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-neutral-800/70 pt-6"
                >
                    <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-xs font-mono text-neutral-500 mr-2">Stack:</span>

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
        </section>
    );
}
