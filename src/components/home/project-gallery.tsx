"use client";

import { PROJECTS, type ProjectItem } from "@/data/projects";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const INITIAL_VISIBLE_COUNT = 2;

function ProjectCard({ project, isPreview = false }: { project: ProjectItem; isPreview?: boolean }) {
    const [imageError, setImageError] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);
    const hasImage = Boolean(project.imageSrc && !imageError);

    useEffect(() => {
        if (imgRef.current) {
            if (imgRef.current.complete) {
                if (imgRef.current.naturalWidth === 0) {
                    setImageError(true);
                } else {
                    ScrollTrigger.refresh();
                }
            }
        }
    }, []);

    const mediaElement = (
        <div
            data-shared-image-container
            className="relative w-full aspect-16/10 flex items-center justify-center overflow-hidden rounded-xl md:rounded-2xl bg-neutral-100 border border-neutral-200/80 transition-colors duration-300 ease-out group-hover/card:border-neutral-300"
        >
            {hasImage ? (
                <img
                    ref={imgRef}
                    src={project.imageSrc}
                    alt={`Interface do projeto ${project.title}`}
                    className="h-full w-full object-cover transform-gpu transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-[1.015]"
                    onLoad={() => {
                        ScrollTrigger.refresh();
                    }}
                    onError={() => setImageError(true)}
                />
            ) : (
                <div aria-hidden="true" className="w-full h-full bg-neutral-100" />
            )}
        </div>
    );

    if (isPreview) {
        return (
            <div aria-hidden="true" className="relative block w-full aspect-16/10 pointer-events-none select-none">
                {mediaElement}
            </div>
        );
    }

    return (
        <article className="group relative block w-full">
            <Link
                href={`/${project.slug}`}
                prefetch={true}
                data-shared-project={project.slug}
                data-cursor="project"
                data-cursor-text="Ver projeto"
                className="group/card block focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-4 rounded-xl md:rounded-2xl"
                aria-label={`Ver detalhes do projeto: ${project.title}`}
            >
                {mediaElement}

                <div className="mt-5 sm:mt-6 flex flex-col gap-2">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                        <h3 className="font-heading text-xl sm:text-2xl font-medium tracking-tight text-neutral-950 transition-colors duration-200 ease-out group-hover/card:text-neutral-700">
                            {project.title}
                        </h3>

                        <span className="font-sans text-xs sm:text-sm text-neutral-500 shrink-0">
                            {project.context} · {project.year}
                        </span>
                    </div>

                    {project.summary && (
                        <p className="font-sans text-sm sm:text-[15px] leading-relaxed text-neutral-600 max-w-3xl">
                            {project.summary}
                        </p>
                    )}
                </div>
            </Link>

            {project.githubUrl && (
                <div className="mt-2.5">
                    <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="external"
                        data-cursor-text="GitHub"
                        className="group/link inline-flex items-center gap-1.5 font-sans text-xs sm:text-[13px] text-neutral-500 transition-colors duration-200 hover:text-neutral-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-1 rounded-sm w-fit"
                        aria-label={`Ver repositório do projeto ${project.title} no GitHub`}
                    >
                        <span className="underline decoration-neutral-300 underline-offset-4 transition-colors group-hover/link:decoration-neutral-950">
                            Repositório no GitHub
                        </span>
                        <ArrowUpRight
                            aria-hidden="true"
                            className="h-3.5 w-3.5 shrink-0 text-neutral-400 transition-transform duration-200 ease-out group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-hover/link:text-neutral-950"
                        />
                    </a>
                </div>
            )}
        </article>
    );
}

export function ProjectGallery() {
    const [isExpanded, setIsExpanded] = useState(false);
    const extraCardsRef = useRef<(HTMLDivElement | null)[]>([]);

    const visibleProjects = isExpanded ? PROJECTS : PROJECTS.slice(0, INITIAL_VISIBLE_COUNT);
    const nextPeekProject =
        !isExpanded && PROJECTS.length > INITIAL_VISIBLE_COUNT ? PROJECTS[INITIAL_VISIBLE_COUNT] : null;

    useEffect(() => {
        if (!isExpanded) return;

        gsap.registerPlugin(ScrollTrigger);

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const targets = extraCardsRef.current.filter((el): el is HTMLDivElement => el !== null);

        if (!prefersReducedMotion && targets.length > 0) {
            const ctx = gsap.context(() => {
                gsap.fromTo(
                    targets,
                    { y: 20 },
                    {
                        y: 0,
                        duration: 0.7,
                        stagger: 0.1,
                        ease: "power3.out",
                        clearProps: "transform",
                        onComplete: () => {
                            ScrollTrigger.refresh();
                        },
                    },
                );
            });

            return () => ctx.revert();
        } else {
            ScrollTrigger.refresh();
        }
    }, [isExpanded]);

    return (
        <section
            id="projetos"
            aria-label="Projetos selecionados"
            className="mx-auto max-w-355 px-6 md:px-10 pb-24 md:pb-32 scroll-mt-24"
        >
            <div className="flex flex-col gap-14 sm:gap-20 md:gap-24">
                {visibleProjects.map((project, index) => {
                    const isExtraCard = index >= INITIAL_VISIBLE_COUNT;

                    return (
                        <div
                            key={project.slug}
                            ref={(el) => {
                                if (isExtraCard) {
                                    extraCardsRef.current[index - INITIAL_VISIBLE_COUNT] = el;
                                }
                            }}
                        >
                            <ProjectCard project={project} />
                        </div>
                    );
                })}
            </div>

            {nextPeekProject && (
                <button
                    type="button"
                    onClick={() => setIsExpanded(true)}
                    data-cursor="expand"
                    data-cursor-text="Carregar mais"
                    aria-label="Carregar mais projetos selecionados"
                    className="group relative mt-14 sm:mt-20 md:mt-24 block w-full text-left cursor-pointer overflow-hidden rounded-xl md:rounded-2xl border-0 p-0 bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
                >
                    <div className="relative h-44 sm:h-56 md:h-72 overflow-hidden mask-[linear-gradient(to_bottom,black_30%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_30%,transparent_100%)]">
                        <ProjectCard project={nextPeekProject} isPreview />
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-x-0 bottom-0 h-32 sm:h-44 bg-linear-to-t from-white via-white/80 to-transparent"
                        />
                    </div>

                    <div className="absolute inset-x-0 bottom-4 sm:bottom-6 z-30 flex justify-center pointer-events-none">
                        <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/95 backdrop-blur-md px-4 sm:px-5 py-2 text-xs sm:text-[13px] font-sans font-medium text-neutral-800 shadow-[0_4px_16px_rgb(0,0,0,0.06)] transition-all duration-300 ease-out group-hover:scale-[1.03] group-hover:shadow-[0_6px_20px_rgb(0,0,0,0.08)] group-hover:border-neutral-300">
                            <span>Carregar mais</span>
                            <ChevronDown
                                aria-hidden="true"
                                className="h-3.5 w-3.5 stroke-2 text-neutral-600 transition-transform duration-300 ease-out group-hover:translate-y-0.5"
                            />
                        </span>
                    </div>
                </button>
            )}
        </section>
    );
}
