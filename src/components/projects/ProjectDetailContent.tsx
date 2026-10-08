import { getProjectBySlug } from "../../data/projects";
import { Grid } from "../layout/Grid";
import { Button } from "../ui/Button";
import { Editorial } from "./Editorial";
import { Hero } from "./Hero";
import { Media } from "./Media";

interface ProjectDetailContentProps {
    slug: string;
    onBackToWork?: () => void;
    onSelectProject?: (slug: string) => void;
}

export function ProjectDetailContent({ slug, onBackToWork }: ProjectDetailContentProps) {
    const project = getProjectBySlug(slug);

    if (!project) {
        return (
            <div className="w-full py-20 text-center">
                <p className="text-body text-ink-2">Projeto não encontrado.</p>
                {onBackToWork && (
                    <div className="mt-4">
                        <Button variant="secondary" onClick={onBackToWork}>
                            Voltar para o arquivo
                        </Button>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="w-full">
            <Grid className="px-0 sm:px-0 md:px-0 max-w-none">
                <div className="col-span-4 sm:col-span-8 lg:col-span-12 flex flex-col gap-10 sm:gap-14">
                    <Hero project={project} onBack={onBackToWork} />

                    {project.content.map((block, idx) => {
                        if (block.type === "editorial") {
                            return <Editorial key={idx} block={block} />;
                        }

                        if (block.type === "media") {
                            return <Media key={idx} block={block} />;
                        }

                        return null;
                    })}
                </div>
            </Grid>
        </div>
    );
}
