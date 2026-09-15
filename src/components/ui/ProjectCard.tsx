"use client";

import Image from "next/image";
import Link from "next/link";
import { Project } from "../../types";
import { Button } from "./Button";

interface ProjectCardProps {
    project: Project;
    priority?: boolean;
    index: number;
}

export function ProjectCard({ project, priority = false, index }: ProjectCardProps) {
    const formattedIndex = (index + 1).toString().padStart(2, "0");
    const isEven = index % 2 === 0;

    return (
        <Link href={`/work/${project.slug}`} className="group project-card block mb-32 lg:mb-48 focus:outline-none">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-0 items-center">
                <div
                    className={`project-img w-full relative aspect-4/5 md:aspect-4/3 lg:aspect-16/11 overflow-hidden bg-white/5 rounded-sm lg:col-span-7 ${
                        isEven ? "lg:order-1" : "lg:order-2 lg:col-start-6"
                    }`}
                >
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        priority={priority}
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-black/10 transition-opacity duration-1000 group-hover:opacity-0" />
                </div>

                <div
                    className={`project-content relative flex flex-col justify-center lg:col-span-4 ${
                        isEven ? "lg:order-2 lg:col-start-9" : "lg:order-1 lg:col-start-1"
                    }`}
                >
                    <span className="absolute -top-12 -left-8 text-[10rem] md:text-[14rem] font-bold text-white/2 -z-10 select-none pointer-events-none font-mono">
                        {formattedIndex}
                    </span>

                    <div className="flex items-center gap-4 mb-8">
                        <span className="text-xs uppercase tracking-widest text-neutral-500 font-mono">
                            {formattedIndex}
                        </span>

                        <div className="w-8 h-px bg-white/10" />

                        <span className="text-xs uppercase tracking-widest text-neutral-300 font-mono">
                            {project.category}
                        </span>
                    </div>

                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter text-white leading-[1.1] transition-colors group-hover:text-white/90 mb-10 md:mb-12">
                        {project.title}
                    </h3>

                    <div className="flex flex-col pt-8 border-t border-white/10 mb-10 md:mb-12">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="flex flex-col gap-3">
                                <span className="text-[11px] uppercase tracking-widest text-neutral-500 font-mono">
                                    Cliente
                                </span>
                                <span className="text-sm md:text-base text-neutral-300 font-medium">
                                    {project.client}
                                </span>
                            </div>

                            <div className="flex flex-col gap-3">
                                <span className="text-[11px] uppercase tracking-widest text-neutral-500 font-mono">
                                    Resultado
                                </span>
                                <span className="text-base md:text-lg text-white font-medium tracking-tight">
                                    {project.impact}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <Button
                            as="div"
                            variant="secondary"
                            showArrow
                            className="px-6 py-3 text-sm transition-colors group-hover:bg-white/10 group-hover:text-white group-hover:border-white/30"
                        >
                            Ver projeto
                        </Button>
                    </div>
                </div>
            </div>
        </Link>
    );
}
