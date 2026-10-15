import { AnimatedHeading } from "@/components/ui/animated-heading";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Projetos",
    description:
        "Trabalhos e projetos desenvolvidos por João André: atuação em sistemas corporativos, integrações de serviços e aplicações web.",
    alternates: {
        canonical: "/projects",
    },
    openGraph: {
        title: "João André — Projetos",
        description: "Sistemas corporativos, integrações e aplicações web desenvolvidas por João André.",
        url: "/projects",
        type: "website",
    },
    twitter: {
        title: "João André — Projetos",
        description: "Sistemas corporativos, integrações e aplicações web desenvolvidas por João André.",
    },
};

export default function ProjectsPage() {
    return (
        <div className="mx-auto flex min-h-[55vh] max-w-3xl flex-col items-start justify-center px-6 md:px-10 py-20 sm:py-24 md:py-28 text-left">
            <AnimatedHeading className="font-heading text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-neutral-950">
                Projetos
            </AnimatedHeading>
        </div>
    );
}
