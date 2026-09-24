"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export function Philosophy() {
    const containerRef = useRef<HTMLElement>(null);

    const pillars = [
        {
            number: "01",
            title: "Interfaces & Usabilidade",
            description:
                "Design centrado na experiência humana real. Tipografia calibrada com entrelinha confortável, contraste balanceado e microinterações que enriquecem o fluxo sem gerar sobrecarga visual.",
        },
        {
            number: "02",
            title: "Código Limpo & Performance",
            description:
                "Arquitetura front-end contemporânea com Next.js, React e TypeScript estrito. Componentes modulares, carregamento veloz e eliminação sistemática de dependências redundantes.",
        },
        {
            number: "03",
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
                        start: "top 88%",
                        once: true,
                        fastScrollEnd: true,
                        preventOverlaps: true,
                    },
                    defaults: { ease: "power4.out" },
                });

                headerTl
                    .from("[data-philosophy-tag]", {
                        y: 10,
                        opacity: 0,
                        duration: 0.6,
                        clearProps: "all",
                    })
                    .from(
                        "[data-philosophy-mask-title]",
                        {
                            yPercent: 105,
                            duration: 0.9,
                            clearProps: "transform",
                        },
                        "-=0.45",
                    )
                    .from(
                        "[data-philosophy-desc]",
                        {
                            y: 14,
                            opacity: 0,
                            duration: 0.7,
                            clearProps: "all",
                        },
                        "-=0.55",
                    );

                const pillarElements = containerRef.current?.querySelectorAll("[data-philosophy-pillar]");
                if (pillarElements) {
                    pillarElements.forEach((pillar) => {
                        const hairline = pillar.querySelector("[data-pillar-hairline]");
                        const content = pillar.querySelector("[data-pillar-content]");

                        const pillarTl = gsap.timeline({
                            scrollTrigger: {
                                trigger: pillar,
                                start: "top 88%",
                                once: true,
                                fastScrollEnd: true,
                                preventOverlaps: true,
                            },
                        });

                        if (hairline) {
                            pillarTl.fromTo(
                                hairline,
                                { scaleX: 0 },
                                {
                                    scaleX: 1,
                                    transformOrigin: "left center",
                                    duration: 0.85,
                                    ease: "power3.inOut",
                                    clearProps: "all",
                                },
                            );
                        }

                        if (content) {
                            pillarTl.from(
                                content,
                                {
                                    y: 16,
                                    opacity: 0,
                                    duration: 0.7,
                                    ease: "power4.out",
                                    clearProps: "all",
                                },
                                hairline ? "-=0.55" : 0,
                            );
                        }
                    });
                }

                gsap.fromTo(
                    "[data-philosophy-bottom-hairline]",
                    { scaleX: 0 },
                    {
                        scaleX: 1,
                        transformOrigin: "left center",
                        duration: 0.85,
                        ease: "power3.inOut",
                        clearProps: "all",
                        scrollTrigger: {
                            trigger: "[data-philosophy-bottom-hairline]",
                            start: "top 92%",
                            once: true,
                            fastScrollEnd: true,
                        },
                    },
                );
            });
        },
        { scope: containerRef },
    );

    return (
        <section ref={containerRef} id="philosophy" className="w-full pt-12 sm:pt-16 md:pt-24 relative scroll-mt-12">
            <div className="w-full px-6 md:px-8 pb-12 sm:pb-16 md:pb-24">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
                    <div
                        data-philosophy-header
                        className="md:col-span-5 md:sticky md:top-24 flex flex-col gap-3 pb-4 md:pb-0"
                    >
                        <span
                            data-philosophy-tag
                            className="text-xs font-mono uppercase tracking-widest text-neutral-500"
                        >
                            Filosofia & Abordagem
                        </span>

                        <div className="overflow-hidden pb-1">
                            <h2
                                data-philosophy-mask-title
                                className="text-2xl md:text-3xl font-medium tracking-tight text-neutral-100 leading-snug"
                            >
                                Menos artifícios, mais consistência e usabilidade.
                            </h2>
                        </div>

                        <p
                            data-philosophy-desc
                            className="text-sm md:text-base text-neutral-400 max-w-sm leading-relaxed"
                        >
                            Princípios claros que orientam cada decisão de interface, ritmo tipográfico e arquitetura de
                            software.
                        </p>
                    </div>

                    <div className="md:col-span-7 flex flex-col">
                        {pillars.map((pillar, index) => (
                            <div
                                key={pillar.title}
                                data-philosophy-pillar
                                className="flex flex-col py-6 sm:py-8 first:pt-0 last:pb-0"
                            >
                                {index > 0 && (
                                    <div
                                        data-pillar-hairline
                                        className="w-full h-px bg-neutral-800/60 mb-6 sm:mb-8 origin-left"
                                    />
                                )}

                                <div data-pillar-content className="flex flex-col gap-3">
                                    <div className="flex items-baseline gap-3">
                                        <span className="text-xs font-mono text-neutral-500 select-none">
                                            {pillar.number}
                                        </span>
                                        <h3 className="text-lg md:text-xl font-medium text-neutral-100 tracking-tight">
                                            {pillar.title}
                                        </h3>
                                    </div>

                                    <p className="text-sm md:text-base text-neutral-300 leading-relaxed font-normal pl-6">
                                        {pillar.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div
                data-philosophy-bottom-hairline
                className="absolute bottom-0 left-0 w-full h-px bg-neutral-800/60 origin-left"
            />
        </section>
    );
}
