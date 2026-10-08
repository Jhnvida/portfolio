import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { NextProjectProps } from "../../types";

export function NextProject({
    nextProject,
    prevProject,
    currentNumber,
    totalProjects,
    currentSlug,
    onSelectProject,
}: NextProjectProps) {
    if (!nextProject || nextProject.slug === currentSlug) return null;

    const hasDistinctPrev = Boolean(
        prevProject && prevProject.slug !== currentSlug && prevProject.slug !== nextProject.slug,
    );

    const renderCard = (project: typeof nextProject, direction: "prev" | "next") => {
        const isNext = direction === "next";
        const content = (
            <div className="flex flex-col gap-1.5 min-w-0">
                <span className="text-meta uppercase tracking-[0.08em] text-ink-3 flex items-center gap-1.5">
                    {!isNext && (
                        <ArrowLeft
                            size={12}
                            strokeWidth={2}
                            className="transition-transform duration-200 group-hover:-translate-x-0.5"
                        />
                    )}
                    {isNext ? "Próximo projeto" : "Projeto anterior"}
                    {isNext && (
                        <ArrowRight
                            size={12}
                            strokeWidth={2}
                            className="transition-transform duration-200 group-hover:translate-x-0.5"
                        />
                    )}
                </span>
                <span className="text-title font-medium text-ink transition-colors duration-200 group-hover:text-ink-2 truncate">
                    {project.title}
                </span>
                <span className="text-meta text-ink-3">
                    {project.category} <span className="text-ink-3/60">·</span>{" "}
                    <span className="font-mono tabular">{project.year}</span>
                </span>
            </div>
        );

        if (onSelectProject) {
            return (
                <button
                    key={project.slug}
                    type="button"
                    onClick={() => onSelectProject(project.slug)}
                    className="group flex flex-1 flex-col justify-between p-4 sm:p-5 rounded-lg border border-line/60 bg-surface/30 hover:bg-surface/70 hover:border-line transition-all duration-200 text-left cursor-pointer"
                >
                    {content}
                </button>
            );
        }

        return (
            <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className="group flex flex-1 flex-col justify-between p-4 sm:p-5 rounded-lg border border-line/60 bg-surface/30 hover:bg-surface/70 hover:border-line transition-all duration-200 text-left"
            >
                {content}
            </Link>
        );
    };

    return (
        <nav
            aria-label="Navegação entre projetos"
            className="flex flex-col border-t border-line/60 pt-8 sm:pt-10 pb-8 sm:pb-12"
        >
            <div className="flex items-center justify-between pb-5">
                <span className="text-meta tracking-[0.08em] uppercase text-ink-3">Navegar pelo arquivo</span>
                {currentNumber && totalProjects && (
                    <span className="text-meta font-mono text-ink-3 tabular">
                        {String(currentNumber).padStart(2, "0")} / {String(totalProjects).padStart(2, "0")}
                    </span>
                )}
            </div>

            <div className={`grid gap-4 ${hasDistinctPrev ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}>
                {hasDistinctPrev && prevProject && renderCard(prevProject, "prev")}
                {renderCard(nextProject, "next")}
            </div>
        </nav>
    );
}
