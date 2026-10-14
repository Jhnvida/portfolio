import { Hero } from "@/components/home/hero";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "João André — Desenvolvedor de Software",
    description:
        "Portfólio de João André — Desenvolvedor de Software com foco em desenvolvimento web com React, TypeScript, Node.js e PHP.",
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: "João André — Desenvolvedor de Software",
        description:
            "Portfólio de João André — Desenvolvedor de Software com foco em desenvolvimento web com React, TypeScript, Node.js e PHP.",
        url: "/",
    },
    twitter: {
        title: "João André — Desenvolvedor de Software",
        description:
            "Portfólio de João André — Desenvolvedor de Software com foco em desenvolvimento web com React, TypeScript, Node.js e PHP.",
    },
};

export default function HomePage() {
    return (
        <div className="flex flex-col">
            <Hero />
        </div>
    );
}
