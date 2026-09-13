"use client";

import { MOCK_PROJECTS } from "../../data/projects";
import { useSelectedWork } from "../../hooks/useSelectedWork";
import { ProjectCard } from "../ui/ProjectCard";
import { SectionHeader } from "../ui/SectionHeader";

export function SelectedWork() {
    const { sectionRef, headerRef, galleryRef, gridContainerRef } = useSelectedWork();

    return (
        <section
            ref={sectionRef}
            className="w-full h-screen overflow-hidden flex flex-col justify-center bg-background relative"
        >
            <SectionHeader ref={headerRef} title="Trabalhos Selecionados" />

            <div className="w-full relative mt-8">
                <div ref={gridContainerRef} className="w-full max-w-(--container-page) mx-auto overflow-visible">
                    <div ref={galleryRef} className="flex gap-6 px-6 md:px-12 lg:px-24 w-max">
                        {MOCK_PROJECTS.map((project, index) => (
                            <ProjectCard key={project.id} project={project} priority={index < 2} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
