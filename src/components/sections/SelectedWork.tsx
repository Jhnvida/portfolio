"use client";

import { MOCK_PROJECTS } from "../../data/projects";
import { useSelectedWork } from "../../hooks/animations/useSelectedWork";
import { ProjectCard } from "../ui/ProjectCard";
import { SectionHeader } from "../ui/SectionHeader";

export function SelectedWork() {
    const { sectionRef, headerRef } = useSelectedWork();

    return (
        <section id="work" ref={sectionRef} className="w-full bg-background relative pt-24 pb-12">
            <SectionHeader ref={headerRef} title="Trabalhos Selecionados" />

            <div className="w-full mt-8 md:mt-12">
                <div className="w-full max-w-(--container-page) mx-auto px-6 md:px-12 lg:px-24">
                    {MOCK_PROJECTS.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} priority={index < 2} />
                    ))}
                </div>
            </div>
        </section>
    );
}
