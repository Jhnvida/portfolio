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
        <div className="mx-auto w-full max-w-355 px-6 md:px-10 pt-12 sm:pt-16 pb-20 sm:pb-24">
            <div className="max-w-2xl sm:max-w-3xl">
                <Link
                    href="/#projetos"
                    className="group mb-8 rounded-full border border-neutral-200/80 bg-white px-4 py-2 text-xs sm:text-[13px] font-sans font-medium text-neutral-800 transition-[background-color,border-color,color,transform] duration-200 ease-out hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-950 active:scale-[0.98] inline-flex items-center justify-center gap-2 min-h-9 sm:min-h-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
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
            </div>
        </div>
    );
}
