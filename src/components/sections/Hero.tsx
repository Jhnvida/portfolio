"use client";

import { useHero } from "../../hooks/animations/useHero";
import { Button } from "../ui/Button";

export function Hero() {
    const { containerRef } = useHero();

    return (
        <div className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-background pt-32 pb-16">
            <div
                ref={containerRef}
                className="relative z-10 w-full max-w-(--container-page) mx-auto px-6 md:px-12 lg:px-24 flex flex-col items-start justify-center"
            >
                <h1
                    data-anim
                    className="text-white text-5xl md:text-7xl lg:text-8xl xl:text-[7rem] font-medium tracking-tighter leading-none md:leading-[0.95] max-w-full lg:max-w-6xl mix-blend-difference wrap-break-word"
                >
                    Engenharia de software focada em interfaces refinadas.
                </h1>

                <div
                    className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 w-full gap-8 md:gap-12 border-t border-white/10 pt-8"
                    data-anim
                >
                    <p className="text-neutral-400 text-lg md:text-xl max-w-xl leading-relaxed">
                        Desenvolvimento full-stack de alto desempenho para produtos digitais que não aceitam
                        mediocridade técnica ou visual.
                    </p>

                    <div className="flex md:justify-end items-start mt-4 md:mt-0">
                        <Button href="/work" variant="primary" className="px-8 py-4 text-sm md:text-base font-medium">
                            Ver trabalhos
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
