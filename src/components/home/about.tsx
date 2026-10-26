"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

export function About() {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) return;

        const sectionEl = sectionRef.current;
        const contentEl = contentRef.current;
        if (!sectionEl || !contentEl) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                contentEl,
                { opacity: 0, y: 32 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionEl,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                },
            );
        }, sectionEl);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="sobre"
            aria-label="Sobre João André"
            className="relative w-full bg-surface-subtle text-neutral-950 py-24 sm:py-32 md:py-40 scroll-mt-12 overflow-hidden"
        >
            <div
                ref={contentRef}
                className="max-w-360 mx-auto w-full px-6 md:px-10 lg:px-12 xl:px-16 will-change-[opacity,transform]"
            >
                <div className="max-w-3xl mx-auto space-y-12 sm:space-y-16">
                    <div className="space-y-6">
                        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-neutral-950">
                            Sobre
                        </h2>

                        <p className="font-sans text-base sm:text-lg md:text-xl text-neutral-700 leading-relaxed font-normal text-pretty">
                            Encaro o desenvolvimento de software como um ofício que une pensamento de produto, atenção
                            ao design e cuidado com as pessoas que vão utilizar cada ferramenta.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-x-10 sm:gap-x-16 md:gap-x-20 gap-y-10 sm:gap-y-12">
                        <div className="space-y-1.5">
                            <span className="font-heading text-4xl sm:text-5xl md:text-6xl font-normal text-neutral-950 tracking-tight block">
                                100%
                            </span>
                            <span className="font-sans text-xs sm:text-sm text-neutral-500 leading-snug block">
                                Código autoral & sob medida
                            </span>
                        </div>

                        <div className="space-y-1.5">
                            <span className="font-heading text-4xl sm:text-5xl md:text-6xl font-normal text-neutral-950 tracking-tight block">
                                03
                            </span>
                            <span className="font-sans text-xs sm:text-sm text-neutral-500 leading-snug block">
                                Projetos em destaque no portfólio
                            </span>
                        </div>

                        <div className="space-y-1.5">
                            <span className="font-heading text-4xl sm:text-5xl md:text-6xl font-normal text-neutral-950 tracking-tight block">
                                Full-stack
                            </span>
                            <span className="font-sans text-xs sm:text-sm text-neutral-500 leading-snug block">
                                Da concepção à entrega final
                            </span>
                        </div>

                        <div className="space-y-1.5">
                            <span className="font-heading text-4xl sm:text-5xl md:text-6xl font-normal text-neutral-950 tracking-tight block">
                                SP
                            </span>
                            <span className="font-sans text-xs sm:text-sm text-neutral-500 leading-snug block">
                                Jaguariúna & Campinas (remoto)
                            </span>
                        </div>
                    </div>

                    <div className="space-y-6 font-sans text-sm sm:text-base leading-relaxed text-neutral-700">
                        <p>
                            Sou o João André, desenvolvedor de software. Encaro cada projeto não como uma simples
                            entrega de tarefas, mas como a construção de algo que precisa fazer sentido prático, ser
                            intuitivo de usar e permanecer estável ao longo do tempo.
                        </p>

                        <p>
                            Gosto de entender a fundo o problema antes de propor qualquer solução. Em vez de adicionar
                            complexidade desnecessária ou recorrer a fórmulas prontas, busco clareza: entender quem vai
                            usar o sistema, onde estão os pontos de atrito e qual é o caminho mais direto para entregar
                            uma experiência simples e confiável.
                        </p>

                        <p>
                            Acredito que o melhor trabalho acontece quando há cuidado com o todo, desde a lógica interna
                            de funcionamento até os pequenos detalhes com que as pessoas interagem na tela. Assumir o
                            processo do início ao fim me permite manter essa coerência, garantindo que o propósito
                            original do projeto seja preservado em cada etapa.
                        </p>

                        <p>
                            Valorizo relações diretas, comunicação transparente e o compromisso de colocar no ar
                            produtos dos quais eu possa me orgulhar. Busco sempre criar soluções que combinem solidez na
                            construção e sensibilidade visual, respeitando o tempo e a atenção de quem está do outro
                            lado.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
