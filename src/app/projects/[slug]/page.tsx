import { AnimatedHeading } from "@/components/ui/animated-heading";
import { getProjectBySlug, PROJECTS } from "@/data/projects";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface ProjectPageProps {
    params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
    return PROJECTS.map((project) => ({
        slug: project.slug,
    }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        return {
            title: "Projeto não encontrado",
        };
    }

    return {
        title: project.title,
        description: `${project.title} — ${project.context} (${project.year}).`,
    };
}

async function ProjectContent({ params }: ProjectPageProps) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    return (
        <>
            <p className="font-sans text-xs font-medium text-neutral-600 mb-3">
                {project.context} · {project.year}
            </p>

            <AnimatedHeading className="font-heading text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-neutral-950 leading-[1.2] sm:leading-[1.18]">
                {project.title}
            </AnimatedHeading>
        </>
    );
}

export default function ProjectDetailPage({ params }: ProjectPageProps) {
    return (
        <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-start justify-center px-6 md:px-10 py-20 sm:py-24 md:py-28 text-left">
            <Link
                href="/#projetos"
                data-cursor="back"
                data-cursor-text="Voltar"
                className="group mb-8 inline-flex items-center gap-2 font-sans text-xs font-medium text-neutral-600 py-2 sm:py-1 -ml-1 px-1 transition-colors duration-200 ease-out hover:text-neutral-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-1 focus-visible:rounded-sm"
            >
                <ArrowLeft
                    aria-hidden="true"
                    className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 ease-out group-hover:-translate-x-0.5"
                />
                <span>Voltar para projetos</span>
            </Link>

            <Suspense
                fallback={
                    <div aria-hidden="true" className="w-full space-y-3">
                        <div className="h-4 w-48 rounded-sm bg-neutral-100" />
                        <div className="h-9 w-3/4 rounded-sm bg-neutral-100" />
                    </div>
                }
            >
                <ProjectContent params={params} />
            </Suspense>
        </main>
    );
}
