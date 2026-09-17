"use client";

import { PROJECTS } from "../../data/projects";
import { useSelectedWork } from "../../hooks/animations/useSelectedWork";
import { Button } from "../ui/Button";
import { ProjectCard } from "../ui/ProjectCard";

export function SelectedWork() {
    const { sectionRef, headerRef, trackRef } = useSelectedWork();

    return (
        <section id="work" className="w-full bg-background relative overflow-hidden">
            <div ref={sectionRef} className="w-full pt-24 pb-0 md:pb-24 relative">
                <div className="relative w-full max-w-(--container-page) mx-auto flex flex-col md:flex-row md:items-center justify-between px-6 md:px-12 lg:px-24 mb-12">
                    <div ref={headerRef} className="flex-1">
                        <p
                            data-header-anim
                            className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400"
                        >
                            Trabalhos Selecionados
                        </p>
                    </div>

                    <div data-header-anim className="mt-6 md:mt-0 hidden md:block">
                        <Button href="/work" variant="ghost" className="px-5 py-2.5 text-xs md:text-sm">
                            Explorar todos os cases
                        </Button>
                    </div>
                </div>

                <div className="w-full relative">
                    <div
                        ref={trackRef}
                        className="flex gap-4 md:gap-8 lg:gap-12 px-6 md:px-12 lg:px-24 w-full md:w-max overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none no-scrollbar pb-12 md:pb-0"
                    >
                        {PROJECTS.map((project, index) => (
                            <ProjectCard key={project.id} project={project} priority={index < 2} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
