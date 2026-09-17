"use client";

import { useWorkPage } from "../../hooks/animations/useWorkPage";
import { SplitText } from "../ui/SplitText";
import { ProjectCard } from "../ui/ProjectCard";
import { PROJECTS } from "../../data/projects";

export function WorkShowcase() {
    const { containerRef } = useWorkPage();

    return (
        <div ref={containerRef} className="w-full bg-background">
            <div className="relative w-full min-h-[85vh] flex flex-col justify-start overflow-hidden bg-background pt-32 md:pt-40 lg:pt-48 pb-16 md:pb-24">
                <div className="relative z-10 w-full max-w-(--container-page) mx-auto px-6 md:px-12 lg:px-24 flex flex-col items-start">
                    <h1 className="text-white text-5xl md:text-7xl lg:text-8xl xl:text-[7rem] font-medium tracking-tighter leading-none md:leading-[0.95] max-w-full lg:max-w-6xl mix-blend-difference wrap-break-word">
                        <SplitText text="Trabalho selecionado." />
                    </h1>

                    <div className="mt-12 md:mt-16 w-full border-t border-white/10 pt-8" data-hero-anim>
                        <p className="text-neutral-400 text-lg md:text-xl max-w-2xl leading-relaxed">
                            Uma exploração aprofundada em engenharia front-end e design interativo. Projetos que unem
                            estética premium, performance extrema e arquitetura escalável.
                        </p>
                    </div>
                </div>
            </div>

            <div className="w-full max-w-(--container-page) mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-24">
                <div className="flex flex-col gap-24 md:gap-32 items-center">
                    {PROJECTS.map((project, index) => (
                        <ProjectCard key={project.id} project={project} priority={index < 2} layout="stack" />
                    ))}
                </div>
            </div>
        </div>
    );
}
