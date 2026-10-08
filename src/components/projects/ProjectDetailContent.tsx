import { getNextProject, getProjectBySlug } from "../../data/projects";
import { Button } from "../ui/Button";
import { Editorial } from "./Editorial";
import { Hero } from "./Hero";
import { Media } from "./Media";
import { NextProject } from "./NextProject";

interface ProjectDetailContentProps {
    slug: string;
    onBackToWork?: () => void;
    onSelectProject?: (slug: string) => void;
}

export function ProjectDetailContent({ slug, onBackToWork, onSelectProject }: ProjectDetailContentProps) {
    const project = getProjectBySlug(slug);

    if (!project) {
        return (
            <div className="py-20 text-center">
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

    const nextProject = getNextProject(project.slug);

    return (
        <div className="flex flex-col items-center w-full">
            <Hero project={project} onBack={onBackToWork} />

            <div className="w-full flex flex-col">
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

            <NextProject nextProject={nextProject} currentSlug={project.slug} onSelectProject={onSelectProject} />
        </div>
    );
}
