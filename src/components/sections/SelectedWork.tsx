"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { MOCK_PROJECTS } from "../../data/projects";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function SelectedWork() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const galleryRef = useRef<HTMLDivElement>(null);
    const gridContainerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (headerRef.current) {
                const elements = headerRef.current.querySelectorAll("[data-header-anim]");
                gsap.from(elements, {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "expo.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    },
                });
            }

            if (galleryRef.current && sectionRef.current && gridContainerRef.current) {
                const getScrollAmount = () => {
                    let galleryWidth = galleryRef.current?.scrollWidth || 0;
                    let gridWidth = gridContainerRef.current?.offsetWidth || 0;
                    return -(galleryWidth - gridWidth);
                };

                const tween = gsap.to(galleryRef.current, {
                    x: getScrollAmount,
                    ease: "none",
                });

                ScrollTrigger.create({
                    trigger: sectionRef.current,
                    start: "top top",
                    end: () =>
                        `+=${(galleryRef.current?.scrollWidth || 0) - (gridContainerRef.current?.offsetWidth || 0)}`,
                    pin: true,
                    animation: tween,
                    scrub: 1,
                    invalidateOnRefresh: true,
                });
            }
        },
        { scope: sectionRef },
    );

    return (
        <section
            ref={sectionRef}
            className="w-full h-screen overflow-hidden flex flex-col justify-center bg-background relative"
        >
            <div className="w-full max-w-(--container-page) mx-auto px-6 md:px-12 lg:px-24 mb-12">
                <div ref={headerRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full">
                    <div>
                        <h2
                            data-header-anim
                            className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-4"
                        >
                            Trabalhos Selecionados
                        </h2>
                        <p data-header-anim className="text-neutral-400 text-lg max-w-xl">
                            Uma amostra de projetos onde engenharia robusta encontra design de alto padrão para gerar
                            impacto real de negócios.
                        </p>
                    </div>
                    <div data-header-anim className="flex lg:justify-end lg:items-end">
                        <Link
                            href="/work"
                            className="group inline-flex items-center gap-2 text-white font-medium hover:text-neutral-300 transition-colors"
                        >
                            Ver todos os projetos
                            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="w-full relative mt-8">
                <div ref={gridContainerRef} className="w-full max-w-(--container-page) mx-auto overflow-visible">
                    <div ref={galleryRef} className="flex gap-6 px-6 md:px-12 lg:px-24 w-max">
                        {MOCK_PROJECTS.map((project) => (
                            <Link
                                key={project.id}
                                href={project.link}
                                className="group relative shrink-0 w-[85vw] md:w-[50vw] lg:w-[35vw] h-[55vh] md:h-[65vh] overflow-hidden focus:outline-none focus:ring-2 focus:ring-white/20"
                            >
                                <div
                                    className="absolute inset-0 bg-neutral-900 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105"
                                    style={{ backgroundImage: `url(${project.image})` }}
                                />

                                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="absolute inset-x-0 bottom-0 p-8 md:p-10 flex flex-col justify-end">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="text-xs font-mono uppercase tracking-widest text-neutral-300">
                                            {project.client}
                                        </span>
                                        <span className="w-1 h-1 bg-neutral-600" />
                                        <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                                            {project.category}
                                        </span>
                                    </div>

                                    <h3 className="text-2xl md:text-3xl font-semibold text-white leading-tight mb-6 transform transition-transform duration-500 group-hover:-translate-y-2">
                                        {project.title}
                                    </h3>

                                    <div className="flex items-center justify-between opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                                        <span className="inline-block px-4 py-2 border border-white/20 bg-white/5 backdrop-blur-md text-sm font-medium text-white">
                                            {project.impact}
                                        </span>
                                        <div className="w-12 h-12 bg-white text-black flex items-center justify-center transform transition-transform duration-500 hover:scale-110">
                                            <ArrowUpRight className="w-6 h-6" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
