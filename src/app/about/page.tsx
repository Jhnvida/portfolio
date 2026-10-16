import { AnimatedHeading } from "@/components/ui/animated-heading";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sobre",
    description: "Conheça a trajetória, a visão de desenvolvimento e a abordagem de trabalho de João André.",
};

export default function AboutPage() {
    return (
        <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-start justify-center px-6 md:px-10 py-20 sm:py-24 md:py-28 text-left">
            <AnimatedHeading className="font-heading text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-neutral-950 leading-[1.2] sm:leading-[1.18]">
                Sobre
            </AnimatedHeading>
        </div>
    );
}
