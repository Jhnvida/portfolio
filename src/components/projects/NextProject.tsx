import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { NextProjectProps } from "../../types";

export function NextProject({ nextProject, currentSlug, onSelectProject }: NextProjectProps) {
    if (!nextProject || nextProject.slug === currentSlug) return null;

    const content = (
        <>
            <div className="flex flex-col min-w-0 text-left">
                <span className="text-display font-medium text-ink transition-colors duration-200 group-hover:text-ink-2 truncate">
                    {nextProject.title}
                </span>
                <span className="text-meta text-ink-2">
                    {nextProject.category} <span className="text-ink-3">·</span>{" "}
                    <span className="tabular">{nextProject.year}</span>
                </span>
            </div>

            <div className="flex items-center text-ink transition-transform duration-200 group-hover:translate-x-1 shrink-0">
                <ArrowRight size={18} strokeWidth={2} />
            </div>
        </>
    );

    return (
        <nav
            aria-label="Navegação entre projetos"
            className="flex flex-col border-t border-line/60 pt-8 sm:pt-10 pb-8 sm:pb-12"
        >
            <span className="text-meta tracking-[0.08em] uppercase text-ink-3 pb-6">Próximo projeto</span>

            {onSelectProject ? (
                <button
                    type="button"
                    onClick={() => onSelectProject(nextProject.slug)}
                    className="group flex w-full items-center justify-between gap-4 py-2 min-h-12 cursor-pointer text-left"
                >
                    {content}
                </button>
            ) : (
                <Link
                    href={`/work/${nextProject.slug}`}
                    className="group flex items-center justify-between gap-4 py-2 min-h-12 text-left"
                >
                    {content}
                </Link>
            )}
        </nav>
    );
}
