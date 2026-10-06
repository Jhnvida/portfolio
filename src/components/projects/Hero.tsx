import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { enter } from "../../lib/motion";
import { HeroProps } from "../../types";
import { Grid } from "../layout/Grid";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { ListRow } from "../ui/ListRow";

export function Hero({ project }: HeroProps) {
    return (
        <header className="w-full pt-12 pb-16 sm:pt-16 sm:pb-20">
            <Grid>
                <div className="col-span-4 sm:col-span-8 lg:col-span-12 flex flex-col">
                    <div {...enter(0)} className="mb-10">
                        <Link
                            href="/work"
                            className="group inline-flex items-center gap-2 text-meta text-ink-2 transition-colors duration-200 hover:text-ink"
                        >
                            <ArrowLeft
                                size={14}
                                className="transition-transform duration-200 group-hover:-translate-x-0.5"
                            />
                            <span>Voltar para projetos</span>
                        </Link>
                    </div>

                    <div className="flex flex-col gap-4 max-w-176">
                        <div {...enter(1)} className="flex items-center gap-2.5">
                            <span className="text-meta text-ink-3">{project.category}</span>
                            <Badge>{project.year}</Badge>
                        </div>

                        <h1 {...enter(2)} className="text-display font-medium text-ink">
                            {project.title}
                        </h1>

                        <p {...enter(3)} className="text-body text-ink-2 leading-relaxed">
                            {project.summary}
                        </p>
                    </div>

                    <div {...enter(4)} className="mt-10 flex flex-col border-t border-line pt-2">
                        <ListRow title="Papel" value={project.role} stackedOnMobile />
                        {project.impact && <ListRow title="Foco" value={project.impact} stackedOnMobile />}
                        <ListRow title="Tecnologias" value={project.stack.join(" · ")} stackedOnMobile />
                    </div>

                    {project.githubUrl && (
                        <div {...enter(5)} className="mt-8">
                            <Button href={project.githubUrl} external variant="secondary">
                                Ver código no GitHub
                            </Button>
                        </div>
                    )}
                </div>
            </Grid>
        </header>
    );
}
