import { AnimatedHeading } from "@/components/ui/animated-heading";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sobre",
    description:
        "Conheça a trajetória de João André: quase 2 anos de experiência profissional em sustentação e desenvolvimento web, bacharelado em Ciência da Computação e foco em React, TypeScript e Node.js.",
    alternates: {
        canonical: "/about",
    },
    openGraph: {
        title: "João André — Sobre",
        description:
            "Trajetória profissional, formação acadêmica e foco técnico de João André, Desenvolvedor de Software.",
        url: "/about",
        type: "profile",
    },
    twitter: {
        title: "João André — Sobre",
        description:
            "Trajetória profissional, formação acadêmica e foco técnico de João André, Desenvolvedor de Software.",
    },
};

export default function AboutPage() {
    return (
        <div className="mx-auto flex max-w-355 flex-col items-center justify-center px-6 py-28 md:py-36 text-center">
            <AnimatedHeading className="font-heading text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-neutral-950">
                Sobre
            </AnimatedHeading>
        </div>
    );
}
