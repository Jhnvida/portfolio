import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseEditorialBlock } from "../../../components/case/CaseEditorialBlock";
import { CaseHero } from "../../../components/case/CaseHero";
import { CaseMediaBlock } from "../../../components/case/CaseMediaBlock";
import { PROJECTS } from "../../../data/projects";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const project = PROJECTS.find((p) => p.slug === slug);

    if (project) {
        return {
            title: project.title,
            description: project.impact,
        };
    }

    return {
        title: "Projeto não encontrado",
    };
}

export default async function WorkDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = PROJECTS.find((p) => p.slug === slug);

    if (!project) {
        notFound();
    }

    return (
        <main className="w-full bg-background min-h-screen">
            <CaseHero project={project} />

            <div className="w-full flex flex-col pb-24">
                {project.content.map((block, idx) => {
                    if (block.type === "editorial") {
                        return <CaseEditorialBlock key={idx} block={block} />;
                    }

                    if (block.type === "media") {
                        return <CaseMediaBlock key={idx} block={block} />;
                    }

                    return null;
                })}
            </div>
        </main>
    );
}
