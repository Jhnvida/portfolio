"use client";

import { useHero } from "../../hooks/animations/useHero";
import { Button } from "../ui/Button";
import { CodeCube } from "../ui/CodeCube";

export function Hero() {
    const { containerRef } = useHero();

    return (
        <div className="w-full max-w-(--container-page) min-h-[65vh] lg:min-h-[70vh] mx-auto px-6 md:px-12 lg:px-24 flex items-center pt-24 lg:pt-0">
            <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 md:gap-12 w-full">
                <div>
                    <h1
                        data-anim
                        className="text-white text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1]"
                    >
                        Engenharia de software focada em interfaces refinadas.
                    </h1>

                    <p data-anim className="text-neutral-400 text-base md:text-lg max-w-xl mt-6 leading-relaxed">
                        Desenvolvimento full-stack de alto desempenho para produtos digitais que não aceitam
                        mediocridade técnica ou visual.
                    </p>

                    <div data-anim>
                        <Button href="/work" className="mt-8 px-6 py-3">
                            Ver trabalhos
                        </Button>
                    </div>
                </div>

                <div data-anim className="hidden lg:flex items-center justify-center h-105">
                    <CodeCube />
                </div>
            </div>
        </div>
    );
}
