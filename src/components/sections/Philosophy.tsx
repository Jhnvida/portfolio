"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

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
                const headerTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: "[data-philosophy-header]",
                        start: "top 85%",
                        once: true,
                    },
                    defaults: { ease: "power4.out" },
                });

                headerTl
                    .from("[data-philosophy-tag]", {
                        y: 10,
                        opacity: 0,
                        duration: 0.6,
                    })
                    .from(
                        "[data-philosophy-mask-title]",
                        {
                            yPercent: 105,
                            duration: 0.9,
                        },
                        "-=0.45",
                    )
                    .from(
                        "[data-philosophy-desc]",
                        {
                            y: 14,
                            opacity: 0,
                            duration: 0.7,
                        },
                        "-=0.55",
                    )
                    .fromTo(
                        "[data-philosophy-hairline]",
                        { scaleX: 0 },
                        {
                            scaleX: 1,
                            transformOrigin: "left center",
                            duration: 0.9,
                            ease: "power3.inOut",
                        },
                        "-=0.5",
                    )
                    .from(
                        "[data-philosophy-card]",
                        {
                            y: 20,
                            opacity: 0,
                            duration: 0.8,
                            stagger: 0.08,
                            ease: "power4.out",
                        },
                        "-=0.6",
                    );

                gsap.fromTo(
                    "[data-philosophy-bottom-hairline]",
                    { scaleX: 0 },
                    {
                        scaleX: 1,
                        transformOrigin: "left center",
                        duration: 0.9,
                        ease: "power3.inOut",
                        scrollTrigger: {
                            trigger: "[data-philosophy-bottom-hairline]",
                            start: "top 95%",
                            once: true,
                        },
                    },
                );
            });
        },
        { scope: containerRef },
    );

    return (
        <section ref={containerRef} id="philosophy" className="w-full pt-12 sm:pt-16 md:pt-24 relative">
            <div className="w-full px-6 md:px-8 flex flex-col gap-8 sm:gap-10 pb-12 sm:pb-16 md:pb-24">
                <div data-philosophy-header className="flex flex-col gap-2">
                    <span data-philosophy-tag className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                        Filosofia & Abordagem
                    </span>

                    <div className="overflow-hidden pb-1">
                        <h2
                            data-philosophy-mask-title
                            className="text-2xl md:text-3xl font-medium tracking-tight text-neutral-100"
                        >
                            Menos artifícios, mais consistência e usabilidade.
                        </h2>
                    </div>

                    <p data-philosophy-desc className="text-sm md:text-base text-neutral-400 max-w-xl leading-relaxed">
                        Princípios claros que orientam cada decisão de interface, ritmo tipográfico e arquitetura de
                        software.
                    </p>
                </div>

                <div data-philosophy-hairline className="w-full h-px bg-neutral-800/60 origin-left" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                    {pillars.map((pillar) => (
                        <div
                            key={pillar.title}
                            data-philosophy-card
                            className="flex flex-col gap-3 p-5 sm:p-6 rounded-none border border-neutral-800/70 bg-neutral-900/20 hover:border-neutral-700/80 transition-colors duration-200"
                        >
                            <h3 className="text-lg font-medium text-neutral-200 tracking-tight">{pillar.title}</h3>
                            <p className="text-sm text-neutral-400 leading-relaxed">{pillar.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div
                data-philosophy-bottom-hairline
                className="absolute bottom-0 left-0 w-full h-px bg-neutral-800/60 origin-left"
            />
        </section>
    );
}
