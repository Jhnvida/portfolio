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
        <Link
            href={`/work/${project.slug}`}
            className="group project-card block mb-24 md:mb-32 lg:mb-40 focus:outline-none"
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center">
                <div
                    className={`project-img w-full relative aspect-4/5 md:aspect-video lg:aspect-4/3 overflow-hidden bg-white/5 rounded-sm lg:col-span-7 ${
                        isEven ? "lg:order-1" : "lg:order-2 lg:col-start-6"
                    }`}
                >
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        priority={priority}
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                    />
                </div>

                <div
                    className={`project-content flex flex-col lg:col-span-4 ${
                        isEven ? "lg:order-2 lg:col-start-9" : "lg:order-1 lg:col-start-1"
                    }`}
                >
                    <div className="flex flex-col gap-2 mb-8 md:mb-12">
                        <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-neutral-500 font-mono">
                            {formattedIndex} // {project.category}
                        </span>

                        <h3 className="text-4xl md:text-5xl font-medium tracking-tighter text-white leading-[1.1] md:leading-[1.1] transition-colors group-hover:text-white/80">
                            {project.title}
                        </h3>

                        <p className="text-sm md:text-base text-neutral-400 font-medium mt-1">
                            Client: <span className="text-neutral-300">{project.client}</span>
                        </p>
                    </div>

                    <div className="flex flex-col gap-8 md:gap-10">
                        <p className="text-sm md:text-base text-neutral-400 leading-relaxed max-w-md">
                            {project.impact}
                        </p>

                        <div>
                            <Button
                                as="div"
                                variant="secondary"
                                showArrow
                                className="px-5 py-2.5 text-xs md:text-sm md:px-6 md:py-3 transition-colors group-hover:bg-white/5"
                            >
                                Ver projeto
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
