import { AnimatedHeading } from "@/components/ui/animated-heading";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Sobre",
    description: "Conheça a trajetória, a visão de desenvolvimento e a abordagem de trabalho de João André.",
};

export default function AboutPage() {
    return (
        <div className="mx-auto w-full max-w-355 px-6 md:px-10 pt-12 sm:pt-16 pb-20 sm:pb-24">
            <div className="max-w-2xl sm:max-w-3xl">
                <AnimatedHeading className="font-heading text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-neutral-950 leading-[1.2] sm:leading-[1.18]">
                    Sobre
                </AnimatedHeading>

                <div className="mt-8 space-y-4 font-sans text-sm sm:text-base leading-relaxed text-neutral-800">
                    <p>
                        Acredito que um bom produto digital nasce do equilíbrio entre simplicidade visual, facilidade de
                        uso e uma estrutura sólida por trás das telas. Meu objetivo ao construir um site ou aplicação é
                        entender a fundo o propósito do projeto para entregar uma solução que faça sentido tanto para
                        quem usa quanto para quem gerencia o negócio.
                    </p>
                    <p>
                        Com quase dois anos de vivência prática desenvolvendo e sustentando sistemas em ambientes reais
                        de produção, construí uma abordagem de trabalho pautada em organização, atenção aos detalhes e
                        responsabilidade técnica em cada etapa.
                    </p>
                    <p>
                        No dia a dia com clientes e parceiros, priorizo a transparência em cada etapa: comunicação
                        direta, alinhamento constante de expectativas, cumprimento rigoroso de prazos acordados e o
                        cuidado com a qualidade final de cada entrega.
                    </p>
                </div>

                <div className="mt-10 sm:mt-12 pt-8 border-t border-neutral-200/80 flex flex-wrap items-center gap-3 text-xs sm:text-[13px] font-sans font-medium">
                    <a
                        href="/#contato"
                        className="rounded-full bg-neutral-950 px-5 py-2.5 text-xs sm:text-[13px] font-sans font-medium text-white transition-[background-color,transform] duration-200 ease-out hover:bg-neutral-800 active:scale-[0.98] inline-flex items-center justify-center min-h-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
                    >
                        Conversar sobre um projeto
                    </a>
                    <Link
                        href="/#projetos"
                        className="group rounded-full border border-neutral-200/80 bg-white px-5 py-2.5 text-xs sm:text-[13px] font-sans font-medium text-neutral-800 transition-[background-color,border-color,color,transform] duration-200 ease-out hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-950 active:scale-[0.98] inline-flex items-center justify-center gap-2 min-h-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
                    >
                        <span>Ver projetos</span>
                        <ArrowRight
                            aria-hidden="true"
                            className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
}
