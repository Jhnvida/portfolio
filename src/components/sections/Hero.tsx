"use client";

import { useHero } from "../../hooks/animations/useHero";
import { Button } from "../ui/Button";
import { SplitText } from "../ui/SplitText";

export function Hero() {
    const { containerRef, titleRef } = useHero();

    return (
        <div
            id="hero"
            className="relative w-full min-h-[85vh] flex flex-col justify-start overflow-hidden bg-background pt-32 md:pt-40 lg:pt-48 pb-16 md:pb-24"
        >
            <div
                ref={containerRef}
                className="relative z-10 w-full max-w-(--container-page) mx-auto px-6 md:px-12 lg:px-24 flex flex-col items-start"
            >
                <h1
                    ref={titleRef}
                    className="text-white text-5xl md:text-7xl lg:text-8xl xl:text-[7rem] font-medium tracking-tighter leading-none md:leading-[0.95] max-w-full lg:max-w-6xl mix-blend-difference wrap-break-word"
                >
                    <SplitText text="Gosto de criar coisas e transformar ideias em projetos para a web." />
                </h1>

                <div
                    className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 w-full gap-8 md:gap-12 border-t border-white/10 pt-8"
                    data-anim
                >
                    <p className="text-neutral-400 text-lg md:text-xl max-w-xl leading-relaxed">
                        Desenvolvedor focado em construir interfaces bem cuidadas, explorar tecnologias modernas e tirar
                        projetos do papel com atenção a cada detalhe.
                    </p>

                    <div className="flex flex-wrap md:justify-end items-center gap-4 mt-4 md:mt-0">
                        <Button href="/work" variant="primary" className="px-8 py-4 text-sm md:text-base font-medium">
                            Ver projetos
                        </Button>
                        <Button
                            href="/about"
                            variant="secondary"
                            className="px-6 py-4 text-sm md:text-base font-medium"
                        >
                            Sobre mim
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
