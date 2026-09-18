import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseEditorialBlock } from "../../../components/case/CaseEditorialBlock";
import { CaseHero } from "../../../components/case/CaseHero";
import { CaseMediaBlock } from "../../../components/case/CaseMediaBlock";
import { PROJECTS } from "../../../data/projects";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
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

export default async function WorkDetailsPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const currentIndex = PROJECTS.findIndex((p) => p.slug === slug);

    if (currentIndex === -1) {
        notFound();
    }

    const project = PROJECTS[currentIndex];
    const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

    return (
        <main className="w-full flex flex-col">
            <CaseHero project={project} />

            <div className="w-full flex flex-col">
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

            <div className="w-full px-6 md:px-8 py-12 md:py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-neutral-800/60">
                <Link
                    href="/work"
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
                >
                    <ArrowLeft size={14} />
                    <span>Todos os projetos</span>
                </Link>

                {nextProject && nextProject.slug !== project.slug && (
                    <Link
                        href={`/work/${nextProject.slug}`}
                        className="group flex flex-col items-start sm:items-end"
                    >
                        <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-1">
                            Próximo projeto
                        </span>
                        <span className="text-lg md:text-xl font-medium text-neutral-200 group-hover:text-white transition-colors inline-flex items-center gap-1.5">
                            {nextProject.title}
                            <ArrowRight
                                size={16}
                                className="transition-transform group-hover:translate-x-1"
                            />
                        </span>
                    </Link>
                )}
            </div>
        </main>
    );
}
