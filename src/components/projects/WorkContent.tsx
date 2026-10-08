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
                    <h1
                        {...enter(0)}
                        className="text-display sm:text-[2.25rem] font-medium text-ink tracking-[-0.03em] pb-10 sm:pb-12"
                    >
                        Projetos
                    </h1>

                    <ProjectList projects={projects}>
                        <div className="flex flex-col">
                            {projects.map((project, idx) => (
                                <button
                                    key={project.id}
                                    type="button"
                                    onClick={onSelectProject ? () => onSelectProject(project.slug) : undefined}
                                    data-preview-image={project.image}
                                    {...enter(1 + idx)}
                                    className="group w-full text-left py-8 sm:py-10 border-b border-line/60 transition-colors duration-200 cursor-pointer block first:border-t first:border-line/60"
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-y-2 gap-x-6">
                                        <div className="flex items-baseline gap-4 sm:gap-6">
                                            <span className="text-meta font-mono text-ink-3 tabular shrink-0">
                                                {String(idx + 1).padStart(2, "0")}
                                            </span>
                                            <h2 className="text-title sm:text-[1.625rem] font-medium text-ink tracking-tight transition-colors duration-200 group-hover:text-ink-2">
                                                {project.title}
                                            </h2>
                                        </div>
                                        <span className="text-meta font-mono text-ink-3 tabular pl-8 sm:pl-0">
                                            {project.year}
                                        </span>
                                    </div>

                                    <p className="text-body text-ink-2 mt-2 pl-8 sm:pl-10 max-w-2xl leading-relaxed">
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
