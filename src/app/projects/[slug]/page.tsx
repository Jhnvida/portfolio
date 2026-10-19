import { ProjectMediaPreview } from "@/components/projects/project-media-preview";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import { getProjectBySlug, PROJECTS } from "@/data/projects";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
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
        description: `${project.title} — ${project.summary}`,
    };
}

async function ProjectContent({ params }: ProjectPageProps) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    return (
        <article className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-14 xl:gap-x-20 items-start">
                <aside className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-28 space-y-8">
                    <Link
                        href="/#projetos"
                        className="group inline-flex items-center gap-2 text-xs sm:text-[13px] font-sans font-medium text-neutral-500 transition-colors duration-200 hover:text-neutral-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
                    >
                        <ArrowLeft
                            aria-hidden="true"
                            className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 ease-out group-hover:-translate-x-0.5"
                        />
                        <span>Voltar para projetos</span>
                    </Link>

                    <div className="space-y-4">
                        <AnimatedHeading className="font-heading text-2xl sm:text-3xl font-medium tracking-tight text-neutral-950 leading-[1.2]">
                            {project.title}
                        </AnimatedHeading>

                        <p className="font-sans text-sm sm:text-base leading-relaxed text-neutral-700">
                            {project.summary}
                        </p>
                    </div>

                    <div className="space-y-3 pt-6 border-t border-neutral-200/80 font-sans text-xs sm:text-sm text-neutral-500">
                        <p>
                            {project.context} · {project.year}
                            {project.status === "Em desenvolvimento" && " · Em desenvolvimento"}
                        </p>

                        {project.githubUrl && (
                            <div className="pt-1">
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-1.5 font-medium text-neutral-950 underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-neutral-950"
                                    aria-label={`Ver repositório do projeto no GitHub`}
                                >
                                    <span>Acessar repositório no GitHub</span>
                                    <ArrowUpRight
                                        aria-hidden="true"
                                        className="h-3.5 w-3.5 shrink-0 text-neutral-500 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-neutral-950"
                                    />
                                </a>
                            </div>
                        )}
                    </div>
                </aside>

                <div className="lg:col-span-7 xl:col-span-8 space-y-12 sm:space-y-16">
                    <ProjectMediaPreview
                        imageSrc={project.imageSrc}
                        title={project.title}
                        aspectRatio={project.aspectRatio}
                    />

                    <div className="space-y-10 sm:space-y-12 max-w-2xl">
                        <section className="space-y-3">
                            <h2 className="font-heading text-lg sm:text-xl font-medium tracking-tight text-neutral-950">
                                Visão Geral
                            </h2>
                            <p className="font-sans text-sm sm:text-base leading-relaxed text-neutral-800">
                                {project.sections.overview}
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="font-heading text-lg sm:text-xl font-medium tracking-tight text-neutral-950">
                                Soluções
                            </h2>
                            <p className="font-sans text-sm sm:text-base leading-relaxed text-neutral-800">
                                {project.sections.solutions}
                            </p>
                        </section>

                        <section className="space-y-3">
                            <h2 className="font-heading text-lg sm:text-xl font-medium tracking-tight text-neutral-950">
                                Resultados
                            </h2>
                            <p className="font-sans text-sm sm:text-base leading-relaxed text-neutral-800">
                                {project.sections.results}
                            </p>
                        </section>
                    </div>
                </div>
            </div>

            <footer className="mt-16 sm:mt-24 pt-8 border-t border-neutral-200/80">
                <Link
                    href="/#projetos"
                    className="group inline-flex items-center gap-2 text-xs sm:text-[13px] font-sans font-medium text-neutral-500 transition-colors duration-200 hover:text-neutral-950"
                >
                    <ArrowLeft
                        aria-hidden="true"
                        className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 ease-out group-hover:-translate-x-0.5"
                    />
                    <span>Voltar para projetos</span>
                </Link>
            </footer>
        </article>
    );
}

export default function ProjectDetailPage({ params }: ProjectPageProps) {
    return (
        <div className="mx-auto w-full max-w-355 px-6 md:px-10 pt-10 sm:pt-14 pb-20 sm:pb-28">
            <Suspense
                fallback={
                    <div aria-hidden="true" className="w-full space-y-4">
                        <div className="h-4 w-48 rounded-sm bg-neutral-100" />
                        <div className="h-8 w-2/3 rounded-sm bg-neutral-100" />
                        <div className="h-64 sm:h-96 w-full rounded-xl bg-neutral-100" />
                    </div>
                }
            >
                <ProjectContent params={params} />
            </Suspense>
        </div>
    );
}
