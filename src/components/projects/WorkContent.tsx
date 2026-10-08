import { ArrowUpRight } from "lucide-react";
import { getAllProjects } from "../../data/projects";
import { enter } from "../../lib/motion";
import { Grid } from "../layout/Grid";
import { ProjectList } from "./ProjectList";

interface WorkContentProps {
    onSelectProject?: (slug: string) => void;
}

export function WorkContent({ onSelectProject }: WorkContentProps) {
    const projects = getAllProjects();

    return (
        <div className="w-full">
            <Grid>
                <div className="col-span-4 sm:col-span-8 lg:col-span-12 flex flex-col">
                    <div className="pb-8 sm:pb-12">
                        <span className="text-meta tracking-[0.08em] uppercase text-ink-3 mb-2 sm:mb-3 block">
                            Arquivo
                        </span>
                        <h1 {...enter(0)} className="text-display font-medium text-ink">
                            Projetos
                        </h1>
                        <p className="mt-3 text-body text-ink-2 max-w-lg leading-relaxed">
                            Trabalhos desenvolvidos do conceito ao código, com foco em clareza, experiência e boas
                            práticas web.
                        </p>
                    </div>

                    <ProjectList projects={projects}>
                        <div className="flex flex-col">
                            {projects.map((project, idx) => (
                                <button
                                    key={project.id}
                                    type="button"
                                    onClick={onSelectProject ? () => onSelectProject(project.slug) : undefined}
                                    data-preview-image={project.image}
                                    {...enter(1 + idx)}
                                    className="group w-full text-left py-6 sm:py-8 border-b border-line/60 first:border-t first:border-line/60 transition-colors duration-200 cursor-pointer block hover:bg-surface/40 active:bg-surface/70 -mx-3 px-3 sm:-mx-4 sm:px-4 rounded-lg"
                                >
                                    <div className="flex items-start sm:items-baseline justify-between gap-x-4">
                                        <div className="flex items-baseline gap-3 sm:gap-5 min-w-0">
                                            <span className="text-meta font-mono text-ink-3 tabular shrink-0 select-none">
                                                {String(idx + 1).padStart(2, "0")}
                                            </span>
                                            <h2 className="text-title font-medium text-ink tracking-tight transition-colors duration-200 group-hover:text-ink">
                                                {project.title}
                                            </h2>
                                        </div>

                                        <div className="flex items-center gap-3 shrink-0">
                                            <span className="text-meta font-mono text-ink-3 tabular">
                                                {project.year}
                                            </span>
                                            <ArrowUpRight
                                                aria-hidden
                                                size={15}
                                                strokeWidth={2}
                                                className="text-ink-3 opacity-50 transition-all duration-200 group-hover:opacity-100 group-hover:text-ink group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                            />
                                        </div>
                                    </div>

                                    <p className="text-body text-ink-2 mt-2 sm:mt-2.5 pl-7 sm:pl-9 max-w-xl leading-relaxed">
                                        {project.summary}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </ProjectList>
                </div>
            </Grid>
        </div>
    );
}
