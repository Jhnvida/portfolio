"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function Philosophy() {
    const containerRef = useRef<HTMLElement>(null);

    const pillars = [
        {
            title: "Interfaces & Usabilidade",
            description:
                "Design centrado na experiência humana real. Tipografia calibrada com entrelinha confortável, contraste balanceado e microinterações que enriquecem o fluxo sem gerar sobrecarga visual.",
        },
        {
            title: "Código Limpo & Performance",
            description:
                "Arquitetura front-end contemporânea com Next.js, React e TypeScript estrito. Componentes modulares, carregamento veloz e eliminação sistemática de dependências redundantes.",
        },
        {
            title: "Projetos Autorais & Aprendizado",
            description:
                "Aprender construindo com mentalidade maker. Meus projetos autorais funcionam como laboratórios vivos para testar padrões da web moderna com rigor estético e técnico.",
        },
    ];

    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 85%",
                        once: true,
                    },
                });

                tl.from("[data-philosophy-header]", {
                    y: 20,
                    opacity: 0,
                    duration: 0.7,
                    ease: "power2.out",
                }).from(
                    "[data-philosophy-card]",
                    {
                        y: 24,
                        opacity: 0,
                        duration: 0.7,
                        stagger: 0.15,
                        ease: "power2.out",
                    },
                    "-=0.4"
                );
            });
        },
        { scope: containerRef }
    );

    return (
        <section
            ref={containerRef}
            id="philosophy"
            className="w-full py-16 md:py-24 border-b border-neutral-800/60"
        >
            <div className="w-full px-6 md:px-8 flex flex-col gap-10">
                <div data-philosophy-header className="flex flex-col gap-2">
                    <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                        Filosofia & Abordagem
                    </span>
                    <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-neutral-100">
                        Menos artifícios, mais consistência e usabilidade.
                    </h2>
                    <p className="text-sm md:text-base text-neutral-400 max-w-xl leading-relaxed">
                        Princípios claros que orientam cada decisão de interface, ritmo tipográfico e arquitetura de software.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 pt-2">
                    {pillars.map((pillar) => (
                        <div
                            key={pillar.title}
                            data-philosophy-card
                            className="flex flex-col gap-3 p-6 rounded-none border border-neutral-800/70 bg-neutral-900/20 hover:border-neutral-700/80 transition-colors"
                        >
                            <h3 className="text-lg font-medium text-neutral-200 tracking-tight">
                                {pillar.title}
                            </h3>
                            <p className="text-sm text-neutral-400 leading-relaxed">
                                {pillar.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
