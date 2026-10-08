import { enter } from "../../lib/motion";
import { HeroProps } from "../../types";
import { Button } from "../ui/Button";
import { ListRow } from "../ui/ListRow";

export function Hero({ project }: HeroProps) {
    return (
        <header className="flex flex-col gap-12 sm:gap-16">
            <div className="flex flex-col gap-4">
                <span {...enter(0)} className="text-meta tracking-[0.08em] uppercase text-ink-3 pb-2">
                    {project.category} <span className="text-ink-3/60">·</span>{" "}
                    <span className="font-mono tabular">{project.year}</span>
                </span>

                <h1 {...enter(1)} className="text-display sm:text-[2.25rem] font-medium text-ink tracking-[-0.03em]">
                    {project.title}
                </h1>

                <p
                    {...enter(2)}
                    className="text-ink font-medium text-body sm:text-[1.125rem] leading-relaxed max-w-3xl"
                >
                    {project.summary}
                </p>
            </div>

            <div {...enter(3)} className="flex flex-col border-t border-line/60 pt-8 sm:pt-10">
                <span className="text-meta tracking-[0.08em] uppercase text-ink-3 pb-6">Ficha Técnica</span>

                <div className="flex flex-col">
                    <ListRow title="Papel" value={project.role} stackedOnMobile />
                    {project.impact && <ListRow title="Foco" value={project.impact} stackedOnMobile />}
                    <ListRow title="Tecnologias" value={project.stack.join(" · ")} stackedOnMobile />
                </div>

                {project.githubUrl && (
                    <div {...enter(4)} className="pt-6 sm:pt-8 flex justify-start">
                        <Button href={project.githubUrl} external variant="secondary">
                            Ver código no GitHub
                        </Button>
                    </div>
                )}
            </div>
        </header>
    );
}
