import { AnimatedHeading } from "@/components/ui/animated-heading";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Projetos",
    description:
        "Projetos e módulos web desenvolvidos por João André utilizando TypeScript, React, Node.js e bancos de dados SQL.",
    alternates: {
        canonical: "/projects",
    },
    openGraph: {
        title: "João André — Projetos",
        description:
            "Projetos e módulos web desenvolvidos por João André utilizando TypeScript, React, Node.js e bancos de dados SQL.",
        url: "/projects",
        type: "website",
    },
    twitter: {
        title: "João André — Projetos",
        description:
            "Projetos e módulos web desenvolvidos por João André utilizando TypeScript, React, Node.js e bancos de dados SQL.",
    },
};

export default function ProjectsPage() {
    return (
        <div className="mx-auto flex max-w-355 flex-col items-center justify-center px-6 py-28 md:py-36 text-center">
            <AnimatedHeading className="font-heading text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-neutral-950">
                Projetos
            </AnimatedHeading>
        </div>
    );
}
