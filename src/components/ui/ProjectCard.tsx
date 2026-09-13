import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "../../types";

interface ProjectCardProps {
    project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
    return (
        <Link
            href={`/work/${project.slug}`}
            className="group relative shrink-0 w-[85vw] md:w-[50vw] lg:w-[35vw] h-[55vh] md:h-[65vh] overflow-hidden rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/20"
        >
            <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="absolute inset-x-0 bottom-0 p-8 md:p-10 flex flex-col justify-end transform translate-y-18 transition-transform duration-500 ease-out group-hover:translate-y-0">
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-mono uppercase tracking-widest text-neutral-300">
                        {project.client}
                    </span>

                    <span className="w-1 h-1 rounded-full bg-neutral-600" />

                    <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                        {project.category}
                    </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-semibold text-white leading-tight mb-6">{project.title}</h3>

                <div className="flex items-center justify-between opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <span className="inline-block px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-sm font-medium text-white">
                        {project.impact}
                    </span>

                    <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center transform transition-transform duration-500 hover:scale-110">
                        <ArrowUpRight className="w-6 h-6" />
                    </div>
                </div>
            </div>
        </Link>
    );
}
