"use client";

import { PROJECTS, type ProjectItem } from "@/data/projects";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const INITIAL_VISIBLE_COUNT = 2;

function ProjectCard({ project, isPreview = false }: { project: ProjectItem; isPreview?: boolean }) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const showPlaceholder = !project.imageSrc || imageError || !imageLoaded;

    const cardContent = (
        <div className="relative w-full aspect-16/10 sm:aspect-video flex items-center justify-center overflow-hidden">
            {!imageError && project.imageSrc && (
                <img
                    src={project.imageSrc}
                    alt={`Interface do projeto ${project.title}`}
                    className={`h-full w-full object-cover transform-gpu transition-[transform,opacity] duration-500 ease-out group-hover:scale-[1.015] ${
                        imageLoaded ? "opacity-100" : "opacity-0 absolute inset-0 pointer-events-none"
                    }`}
                    loading="lazy"
                    onLoad={() => {
                        setImageLoaded(true);
                        ScrollTrigger.refresh();
                    }}
                    onError={() => setImageError(true)}
                />
            )}

            {showPlaceholder && (
                <div
                    aria-hidden="true"
                    className="absolute inset-0 rounded-xl md:rounded-2xl bg-linear-to-br from-neutral-100/80 via-neutral-50/70 to-neutral-100/90"
                />
            )}

            <div className="absolute top-0 inset-x-0 z-10 p-5 sm:p-7 md:p-8 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                <span className="font-heading text-base sm:text-lg font-medium tracking-tight text-neutral-950 transition-colors duration-200 group-hover:text-neutral-600">
                    {project.title}
                </span>
                <span className="font-sans text-xs text-neutral-500 shrink-0">
                    {project.context} · {project.year}
                </span>
            </div>
        </div>
    );

    if (isPreview) {
        return (
            <div
                aria-hidden="true"
                className="relative block w-full overflow-hidden rounded-xl md:rounded-2xl bg-neutral-100/70 border border-neutral-200/70 pointer-events-none select-none"
            >
                {cardContent}
            </div>
        );
    }

    return (
        <article className="group relative block w-full">
            <Link
                href={`/projects/${project.slug}`}
                prefetch={true}
                data-cursor="project"
                data-cursor-text="Ver projeto"
                className="relative block w-full overflow-hidden rounded-xl md:rounded-2xl bg-neutral-100/70 border border-neutral-200/70 transition-colors duration-200 ease-out hover:border-neutral-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
                aria-label={`Conhecer o projeto: ${project.title}`}
            >
                {cardContent}
            </Link>
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
                    { y: 20, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.7,
                        stagger: 0.1,
                        ease: "power3.out",
                        clearProps: "transform,opacity",
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
            <div className="flex flex-col gap-12 sm:gap-16 md:gap-20">
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
                <div className="relative mt-12 sm:mt-16 md:mt-20">
                    <div className="h-36 sm:h-48 md:h-60 overflow-hidden">
                        <ProjectCard project={nextPeekProject} isPreview />
                    </div>

                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 z-20 bg-linear-to-b from-white/0 via-white/80 to-white"
                    />

                    <div className="absolute inset-x-0 bottom-3 sm:bottom-5 z-30 flex justify-center">
                        <button
                            type="button"
                            onClick={() => setIsExpanded(true)}
                            className="cursor-pointer rounded-full border border-neutral-200/90 bg-white px-5 py-2 sm:px-6 sm:py-2.5 text-xs sm:text-[13px] font-sans font-medium text-neutral-700 shadow-[0_4px_20px_rgb(0,0,0,0.04)] transition-[background-color,border-color,color,transform] duration-200 ease-out hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-950 active:scale-[0.98] inline-flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
                        >
                            Carregar mais
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}
