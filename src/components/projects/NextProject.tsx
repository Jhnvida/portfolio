import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ProjectSummary } from "../../types/project";
import { Grid } from "../layout/Grid";
import { Reveal } from "../ui/Reveal";

interface NextProjectProps {
    nextProject?: ProjectSummary;
    currentSlug: string;
}

export function NextProject({ nextProject, currentSlug }: NextProjectProps) {
    if (!nextProject || nextProject.slug === currentSlug) return null;

    return (
        <Reveal
            as="nav"
            aria-label="Navegação entre projetos"
            className="w-full py-16 sm:py-24 border-t border-line mt-12"
        >
            <Grid>
                <div className="col-span-4 sm:col-span-8 lg:col-span-12 flex flex-col gap-4">
                    <span className="text-meta text-ink-3">Próximo Projeto</span>

                    <Link
                        href={`/work/${nextProject.slug}`}
                        className="group flex items-baseline justify-between gap-4 py-2"
                    >
                        <div className="flex flex-col">
                            <span className="text-display font-medium text-ink transition-colors duration-200 group-hover:text-ink-2">
                                {nextProject.title}
                            </span>
                            <span className="text-meta text-ink-3">
                                {nextProject.category} — {nextProject.year}
                            </span>
                        </div>

                        <div className="flex items-center text-ink transition-transform duration-200 group-hover:translate-x-1">
                            <ArrowRight size={20} />
                        </div>
                    </Link>
                </div>
            </Grid>
        </Reveal>
    );
}
