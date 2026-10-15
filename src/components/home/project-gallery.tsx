"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface ProjectItem {
    id: string;
    title: string;
    context: string;
    year: string;
    imageSrc?: string;
    aspectRatio: string;
    href: string;
}

const PROJECTS: ProjectItem[] = [
    {
        id: "assist-sistemas",
        title: "Sistemas Web & APIs REST",
        context: "Assist Soluções em TI",
        year: "2024 – 2026",
        imageSrc: "/projects/assist-sistemas.webp",
        aspectRatio: "aspect-[16/10]",
        href: "/projects",
    },
    {
        id: "fullstack-apps",
        title: "Aplicações Web Full-Stack",
        context: "TypeScript & React",
        year: "2025",
        imageSrc: "/projects/fullstack-apps.webp",
        aspectRatio: "aspect-[4/3]",
        href: "/projects",
    },
];

function ProjectCard({ project }: { project: ProjectItem }) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const showPlaceholder = !project.imageSrc || imageError || !imageLoaded;

    return (
        <article className="group flex flex-col">
            <Link
                href={project.href}
                data-cursor="project"
                data-cursor-text="Ver projeto"
                className="relative block w-full overflow-hidden rounded-xl md:rounded-2xl bg-neutral-100/70 transition-transform duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
                aria-label={`Ver detalhes do projeto: ${project.title}`}
            >
                <div
                    className={`w-full ${project.aspectRatio} relative flex items-center justify-center overflow-hidden`}
                >
                    {!imageError && project.imageSrc && (
                        <img
                            src={project.imageSrc}
                            alt={`Interface de ${project.title}`}
                            className={`h-full w-full object-cover transition-all duration-500 ease-out group-hover:scale-[1.015] ${
                                imageLoaded ? "opacity-100" : "opacity-0 absolute inset-0 pointer-events-none"
                            }`}
                            loading="lazy"
                            onLoad={() => setImageLoaded(true)}
                            onError={() => setImageError(true)}
                        />
                    )}

                    {showPlaceholder && (
                        <div
                            aria-hidden="true"
                            className="absolute inset-0 rounded-xl md:rounded-2xl border border-neutral-200/50 bg-neutral-50/60"
                        />
                    )}
                </div>
            </Link>

            <div className="mt-3.5 flex items-baseline justify-between gap-4">
                <Link
                    href={project.href}
                    className="font-heading text-base sm:text-lg font-normal tracking-tight text-neutral-950 transition-colors duration-200 hover:text-neutral-600 focus:outline-none focus-visible:underline"
                >
                    {project.title}
                </Link>
                <span className="font-sans text-xs text-neutral-400 shrink-0">
                    {project.context} · {project.year}
                </span>
            </div>
        </article>
    );
}

export function ProjectGallery() {
    const col1 = PROJECTS.filter((_, idx) => idx % 2 === 0);
    const col2 = PROJECTS.filter((_, idx) => idx % 2 === 1);

    return (
        <section aria-label="Projetos selecionados" className="mx-auto max-w-355 px-6 md:px-10 pt-4 pb-24 md:pb-32">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16">
                <div className="flex flex-col gap-16 md:gap-24">
                    {col1.map((p) => (
                        <ProjectCard key={p.id} project={p} />
                    ))}
                </div>

                <div className="flex flex-col gap-16 md:gap-24 md:pt-20 lg:pt-28">
                    {col2.map((p) => (
                        <ProjectCard key={p.id} project={p} />
                    ))}
                </div>
            </div>

            <div className="mt-16 md:mt-24 flex justify-end">
                <Link
                    href="/projects"
                    className="group inline-flex items-center gap-1.5 text-xs font-sans text-neutral-500 transition-colors duration-200 ease-out hover:text-neutral-950 focus:outline-none focus-visible:underline"
                >
                    <span>Ver todos os projetos</span>
                    <ArrowRight
                        aria-hidden="true"
                        className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                    />
                </Link>
            </div>
        </section>
    );
}
