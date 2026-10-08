import { enter } from "../../lib/motion";
import { HeroProps } from "../../types";
import { Grid } from "../layout/Grid";
import { Button } from "../ui/Button";
import { ListRow } from "../ui/ListRow";

export function Hero({ project }: HeroProps) {
    return (
        <header className="w-full pt-2 pb-10 sm:pt-4 sm:pb-14">
            <Grid>
                <div className="col-span-4 sm:col-span-8 lg:col-span-12 flex flex-col">
                    <div className="flex flex-col gap-3 max-w-xl pb-10 sm:pb-12">
                        <div {...enter(0)} className="text-meta text-ink-3">
                            <span className="font-mono tabular">{project.year}</span>
                            <span className="mx-2">·</span>
                            <span>{project.category}</span>
                        </div>

                        <h1
                            {...enter(1)}
                            className="text-display sm:text-[2.25rem] font-medium text-ink tracking-[-0.03em]"
                        >
                            {project.title}
                        </h1>

                        <p {...enter(2)} className="text-body text-ink-2 leading-relaxed mt-1">
                            {project.summary}
                        </p>
                    </div>

                    <div {...enter(3)} className="flex flex-col border-t border-line/40 pt-2">
                        <ListRow title="Papel" value={project.role} stackedOnMobile />
                        {project.impact && <ListRow title="Foco" value={project.impact} stackedOnMobile />}
                        <ListRow title="Tecnologias" value={project.stack.join(" · ")} stackedOnMobile />
                    </div>

                    {project.githubUrl && (
                        <div {...enter(4)} className="pt-8">
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
