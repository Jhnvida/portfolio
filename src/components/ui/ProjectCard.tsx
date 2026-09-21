"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { Project } from "../../types";
import { Link } from "../providers/ViewTransitionsProvider";
import { Badge } from "./Badge";

interface ProjectCardProps {
    project: Project;
    priority?: boolean;
}

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
    const cardRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => {
                gsap.fromTo(
                    "[data-parallax-image]",
                    { yPercent: -9, scale: 1.22 },
                    {
                        yPercent: 9,
                        scale: 1.22,
                        ease: "none",
                        scrollTrigger: {
                            trigger: cardRef.current,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true,
                        },
                    },
                );
            });

            mm.add("(prefers-reduced-motion: no-preference) and (max-width: 767px)", () => {
                gsap.fromTo(
                    "[data-parallax-image]",
                    { yPercent: -6, scale: 1.15 },
                    {
                        yPercent: 6,
                        scale: 1.15,
                        ease: "none",
                        scrollTrigger: {
                            trigger: cardRef.current,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true,
                        },
                    },
                );
            });
        },
        { scope: cardRef },
    );

    return (
        <article ref={cardRef}>
            <Link
                href={`/work/${project.slug}`}
                className="group flex flex-col gap-4 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400"
            >
                <div className="relative w-full aspect-16/10 rounded-none overflow-hidden border border-neutral-800/80 bg-neutral-950 group-hover:border-neutral-700 transition-colors duration-200">
                    <div data-parallax-image className="absolute inset-0 w-full h-full will-change-transform">
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            priority={priority}
                            sizes="(max-width: 768px) 100vw, 896px"
                            className="object-cover transition-[filter] duration-200 group-hover:brightness-105"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2.5 pt-1">
                    <div className="flex items-baseline justify-between gap-4">
                        <div className="flex items-baseline gap-2.5">
                            <h3 className="text-xl md:text-2xl font-medium tracking-tight text-neutral-100 group-hover:text-white transition-colors duration-200">
                                {project.title}
                            </h3>
                            <span className="text-xs font-mono text-neutral-500">· {project.year}</span>
                        </div>

                        <div className="flex items-center text-neutral-500 group-hover:text-white transition-colors duration-200 shrink-0">
                            <ArrowUpRight
                                size={18}
                                className="transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            />
                        </div>
                    </div>

                    <p className="text-xs md:text-sm text-neutral-400 font-mono">
                        {project.category || project.client} — {project.role || project.impact}
                    </p>

                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        {project.stack.map((tech) => (
                            <Badge
                                key={tech}
                                variant="outline"
                                className="text-[11px] py-0.5 px-2.5 text-neutral-400 rounded-none"
                            >
                                {tech}
                            </Badge>
                        ))}
                    </div>
                </div>
            </Link>
        </article>
    );
}
