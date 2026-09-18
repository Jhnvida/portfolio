import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "../../types";
import { Badge } from "./Badge";

interface ProjectCardProps {
    project: Project;
    priority?: boolean;
}

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
    return (
        <article>
            <Link
                href={`/work/${project.slug}`}
                className="group flex flex-col gap-5 p-5 md:p-6 rounded-none border border-neutral-800/80 bg-neutral-900/30 hover:border-neutral-700 hover:bg-neutral-900/50 transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400"
            >
                <div className="relative w-full aspect-16/10 rounded-none overflow-hidden border border-neutral-800/80 bg-neutral-950">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        priority={priority}
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 768px, 896px"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                    />
                </div>

                <div className="flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <h3 className="text-xl md:text-2xl font-medium tracking-tight text-neutral-100 group-hover:text-white transition-colors">
                                    {project.title}
                                </h3>
                                <span className="text-xs font-mono text-neutral-500">· {project.year}</span>
                            </div>
                            <p className="text-xs text-neutral-400 font-mono">
                                {project.category || project.client} — {project.role || project.impact}
                            </p>
                        </div>

                        <div className="p-2 rounded-none border border-neutral-800 text-neutral-400 group-hover:text-white group-hover:border-neutral-600 transition-colors shrink-0">
                            <ArrowUpRight size={16} />
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        {project.stack.map((tech) => (
                            <Badge key={tech} variant="outline" className="text-[11px] py-0.5 px-2.5 text-neutral-400 rounded-none">
                                {tech}
                            </Badge>
                        ))}
                    </div>
                </div>
            </Link>
        </article>
    );
}
