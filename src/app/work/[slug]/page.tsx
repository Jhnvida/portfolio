import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Page } from "../../../components/layout/Page";
import { Editorial } from "../../../components/projects/Editorial";
import { Hero } from "../../../components/projects/Hero";
import { Media } from "../../../components/projects/Media";
import { NextProject } from "../../../components/projects/NextProject";
import { getAllProjects, getNextProject, getProjectBySlug } from "../../../data/projects";

export function generateStaticParams() {
    return getAllProjects().map((project) => ({
        slug: project.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (project) {
        return {
            title: project.title,
            description: project.summary,
        };
    }

    return {
        title: "Projeto não encontrado",
    };
}

export default async function WorkDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    const nextProject = getNextProject(project.slug);

    return (
        <Page className="flex flex-col items-center">
            <Hero project={project} />

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

            <NextProject nextProject={nextProject} currentSlug={project.slug} />
        </Page>
    );
}
