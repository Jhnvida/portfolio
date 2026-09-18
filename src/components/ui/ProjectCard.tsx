import Image from "next/image";
import Link from "next/link";
import { cn } from "../../lib/utils";
import { Project } from "../../types";
import { Button } from "./Button";

interface ProjectCardProps {
    project: Project;
    priority?: boolean;
    layout?: "rail" | "stack";
}

export function ProjectCard({ project, priority = false, layout = "rail" }: ProjectCardProps) {
    const layoutClasses = layout === "rail" ? "w-[85vw] md:w-[70vw] shrink-0 snap-center" : "w-full max-w-6xl mx-auto";

    return (
        <Link
            href={`/work/${project.slug}`}
            className={cn(
                "project-card group relative h-[60vh] md:h-[75vh] rounded-sm overflow-hidden block focus:outline-none bg-surface-raised border border-white/5",
                layoutClasses,
            )}
        >
            <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
                <div className="parallax-bg absolute inset-0 w-[120%] h-[120%] left-[-10%] top-[-10%]">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        priority={priority}
                        sizes="(max-width: 768px) 85vw, 70vw"
                        className="object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-700 ease-out"
                    />
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-[#050505]/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-700" />
            </div>

            <div className="absolute inset-0 p-6 md:p-10 lg:p-14 flex flex-col justify-end">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 transform md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]">
                    <div className="flex flex-col max-w-2xl">
                        <h3 className="text-3xl md:text-5xl lg:text-[4rem] font-medium tracking-tighter text-white leading-[1.05] mb-4 md:mb-6">
                            {project.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-neutral-300">
                            <span className="font-medium text-white">{project.category || project.client}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                            <span className="text-neutral-400">{project.role || project.impact}</span>
                        </div>
                    </div>

                    <div className="mt-4 md:mt-0">
                        <Button
                            as="div"
                            variant="secondary"
                            showArrow
                            className="px-6 py-3 text-sm md:opacity-0 md:-translate-x-4 md:group-hover:opacity-100 md:group-hover:translate-x-0 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]"
                        >
                            Ver projeto
                        </Button>
                    </div>
                </div>
            </div>
        </Link>
    );
}
