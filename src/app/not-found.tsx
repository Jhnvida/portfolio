import { AnimatedHeading } from "@/components/ui/animated-heading";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Página não encontrada",
    description: "A página solicitada não foi encontrada.",
};

export default function NotFound() {
    return (
        <div className="w-full max-w-360 mx-auto px-6 md:px-10 lg:px-12 xl:px-16 pt-16 sm:pt-20 md:pt-28 pb-24 sm:pb-32 flex flex-col justify-center min-h-[55vh]">
            <div className="max-w-xl space-y-6">
                <span className="font-heading text-4xl sm:text-5xl text-neutral-400 tabular-nums select-none block">
                    404
                </span>

                <div className="space-y-4">
                    <AnimatedHeading className="font-heading text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-neutral-950 leading-[1.15]">
                        Nada por aqui.
                    </AnimatedHeading>

                    <p className="font-sans text-sm sm:text-base leading-relaxed text-neutral-700">
                        O caminho que você tentou acessar não leva a nenhuma página. Pode ser um link antigo ou apenas
                        um erro de digitação.
                    </p>
                </div>

                <div className="pt-6 border-t border-neutral-200/80 font-sans text-xs sm:text-sm">
                    <Link
                        href="/"
                        className="group inline-flex items-center gap-2 font-medium text-neutral-950 underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-neutral-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
                    >
                        <ArrowLeft
                            aria-hidden="true"
                            className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-0.5"
                        />
                        <span>Voltar para o início</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
