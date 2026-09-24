"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { Project } from "../../types";
import { Link } from "../providers/ViewTransitionsProvider";

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
                        clearProps: "all",
                    })
                    .from(
                        "[data-work-mask-title]",
                        {
                            yPercent: 105,
                            duration: 0.9,
                            clearProps: "transform",
                        },
                        "-=0.45",
                    )
                    .from(
                        "[data-work-desc]",
                        {
                            y: 14,
                            opacity: 0,
                            duration: 0.7,
                            clearProps: "all",
                        },
                        "-=0.55",
                    )
                    .fromTo(
                        "[data-work-header-hairline]",
                        { scaleX: 0 },
                        {
                            scaleX: 1,
                            transformOrigin: "left center",
                            duration: 0.85,
                            ease: "power3.inOut",
                        },
                        "-=0.5",
                    );

                const rows = containerRef.current?.querySelectorAll("[data-work-row]");
                if (rows) {
                    gsap.from(rows, {
                        scrollTrigger: {
                            trigger: "[data-work-table]",
                            start: "top 88%",
                            once: true,
                            fastScrollEnd: true,
                            preventOverlaps: true,
                        },
                        y: 16,
                        opacity: 0,
                        duration: 0.7,
                        stagger: 0.08,
                        ease: "power4.out",
                        clearProps: "all",
                    });
                }

                gsap.fromTo(
                    "[data-work-bottom-hairline]",
                    { scaleX: 0 },
                    {
                        scaleX: 1,
                        transformOrigin: "left center",
                        duration: 0.85,
                        ease: "power3.inOut",
                        clearProps: "all",
                        scrollTrigger: {
                            trigger: "[data-work-bottom-hairline]",
                            start: "top 92%",
                            once: true,
                            fastScrollEnd: true,
                        },
                    },
                );
            });
        },
        { scope: containerRef },
    );

    return (
        <main ref={containerRef} className="w-full flex flex-col">
            <div className="w-full px-6 md:px-8 pt-12 sm:pt-16 md:pt-24 pb-10 sm:pb-12 md:pb-16 relative">
                <span data-work-tag className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-4 block">
                    Arquivo de Projetos
                </span>

                <div className="overflow-hidden pb-1.5 mb-4">
                    <h1
                        data-work-mask-title
                        className="text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight text-neutral-100 leading-[1.2] sm:leading-tight"
                    >
                        Índice de trabalhos & explorações.
                    </h1>
                </div>

                <p
                    data-work-desc
                    className="text-base md:text-lg text-neutral-400 leading-relaxed max-w-2xl font-normal"
                >
                    Catálogo técnico de projetos autorais e estudos de caso desenvolvidos com rigor visual,
                    microinterações cuidadas e documentação aprofundada de processo.
                </p>
            </div>

            <div data-work-header-hairline className="w-full h-px bg-neutral-800/60 origin-left" />

            <div data-work-table className="w-full px-6 md:px-8 py-10 sm:py-12 md:py-16">
                <div className="hidden md:grid grid-cols-12 gap-4 pb-4 px-2 text-xs font-mono uppercase tracking-wider text-neutral-500">
                    <div className="col-span-1">Ano</div>
                    <div className="col-span-4">Projeto</div>
                    <div className="col-span-3">Papel & Foco</div>
                    <div className="col-span-3">Tecnologias</div>
                    <div className="col-span-1 text-right">Estudo</div>
                </div>

                <div className="flex flex-col">
                    {projects.map((project) => (
                        <div key={project.id} data-work-row className="flex flex-col">
                            <div className="w-full h-px bg-neutral-800/60 origin-left" />

                            <Link
                                href={`/work/${project.slug}`}
                                className="group py-6 md:py-7 px-2 -mx-2 flex flex-col md:grid md:grid-cols-12 md:items-baseline gap-2 md:gap-4 transition-colors duration-200 hover:bg-neutral-900/20 rounded-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400"
                            >
                                <div className="md:col-span-1 font-mono text-xs text-neutral-500 group-hover:text-neutral-400 transition-colors">
                                    {project.year}
                                </div>

                                <div className="md:col-span-4 flex flex-col gap-0.5">
                                    <div className="flex items-center gap-2">
                                        <h2 className="text-lg md:text-xl font-medium text-neutral-100 group-hover:text-white transition-colors duration-200">
                                            {project.title}
                                        </h2>
                                        <ArrowUpRight
                                            size={16}
                                            className="md:hidden text-neutral-500 group-hover:text-white transition-colors shrink-0"
                                        />
                                    </div>
                                    <span className="text-xs font-mono text-neutral-500">
                                        {project.category || project.client}
                                    </span>
                                </div>

                                <div className="md:col-span-3 text-sm text-neutral-300 font-normal leading-relaxed pt-1 md:pt-0">
                                    {project.role || project.impact}
                                </div>

                                <div className="md:col-span-3 font-mono text-xs text-neutral-400 pt-1 md:pt-0">
                                    {project.stack.join(" · ")}
                                </div>

                                <div className="hidden md:flex md:col-span-1 justify-end items-center text-neutral-500 group-hover:text-white transition-colors duration-200">
                                    <ArrowUpRight
                                        size={18}
                                        className="transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                    />
                                </div>
                            </Link>
                        </div>
                    ))}

                    <div data-work-bottom-hairline className="w-full h-px bg-neutral-800/60 origin-left" />
                </div>

                <div className="pt-8 text-xs font-mono text-neutral-500 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span>{projects.length} projetos documentados</span>
                    <span>Cada estudo de caso detalha a motivação, arquitetura e stack</span>
                </div>
            </div>
        </main>
    );
}
