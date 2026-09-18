import type { Metadata } from "next";
import { ProjectCard } from "../../components/ui/ProjectCard";
import { PROJECTS } from "../../data/projects";

export const metadata: Metadata = {
    title: "Projetos",
    description: "Projetos autorais e experimentos desenvolvidos com rigor estético e engenharia web moderna.",
};

export default function WorkPage() {
    return (
        <main className="w-full flex flex-col">
            <div className="w-full px-6 md:px-8 pt-16 md:pt-24 pb-12 md:pb-16 border-b border-neutral-800/60">
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-4 block">
                    Arquivo de Projetos
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-neutral-100 mb-4 leading-tight">
                    Projetos e criações.
                </h1>
                <p className="text-base md:text-lg text-neutral-400 leading-relaxed max-w-xl">
                    Uma seleção de projetos autorais e estudos de caso desenvolvidos com rigor visual, microinterações cuidadas e foco na experiência real de quem usa.
                </p>
            </div>

            <div className="w-full px-6 md:px-8 py-12 md:py-16">
                <div className="grid grid-cols-1 gap-8">
                    {PROJECTS.map((project, index) => (
                        <ProjectCard key={project.id} project={project} priority={index === 0} />
                    ))}
                </div>
            </div>
        </main>
    );
}
