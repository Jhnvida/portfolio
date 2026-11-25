import { BackToProjectsLink } from "@/components/projects/back-to-projects";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Projeto não encontrado",
    description: "Não foi possível encontrar o projeto solicitado.",
};

export default function ProjectNotFound() {
    return (
        <div className="w-full max-w-360 mx-auto px-6 md:px-10 lg:px-12 xl:px-16 pt-16 sm:pt-20 md:pt-28 pb-24 sm:pb-32 flex flex-col justify-center min-h-[55vh]">
            <div className="max-w-xl space-y-6">
                <span className="font-heading text-4xl sm:text-5xl text-neutral-400 tabular-nums select-none block">
                    404
                </span>

                <div className="space-y-4">
                    <AnimatedHeading className="font-heading text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-neutral-950 leading-[1.15]">
                        Este projeto não está por aqui.
                    </AnimatedHeading>

                    <p className="font-sans text-sm sm:text-base leading-relaxed text-neutral-700">
                        Não encontrei nenhum trabalho com esse endereço. Ele pode ter sido renomeado, arquivado ou ainda
                        estar em desenvolvimento.
                    </p>
                </div>

                <div className="pt-6 border-t border-neutral-200/80 font-sans text-xs sm:text-sm">
                    <BackToProjectsLink />
                </div>
            </div>
        </div>
    );
}
