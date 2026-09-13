import type { Metadata } from "next";
import { MOCK_PROJECTS } from "../../../data/projects";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const project = MOCK_PROJECTS.find((p) => p.slug === slug);

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

    return (
        <main className="w-full max-w-(--container-page) mx-auto min-h-screen pt-24 pb-12 px-6 md:px-12 lg:px-24"></main>
    );
}
