"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { EXPERIENCES } from "../../data/experience";

const TOOLS_AND_TECH = [
    {
        category: "Desenvolvimento Front-End",
        items: ["React", "Next.js", "TypeScript", "JavaScript (ESNext)", "Node.js"],
    },
    {
        category: "Design & Estilo",
        items: ["Tailwind CSS", "Design Systems", "Figma", "CSS Moderno", "Acessibilidade"],
    },
    {
        category: "Ferramentas & Fluxo",
        items: ["Git & GitHub", "Vite", "VS Code", "Turbopack", "Vercel"],
    },
];

export function AboutView() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                const headerTl = gsap.timeline({
                    defaults: { ease: "power4.out" },
                });

                headerTl
                    .from("[data-about-tag]", {
                        y: 10,
                        opacity: 0,
                        duration: 0.6,
                        clearProps: "all",
                    })
                    .from(
                        "[data-about-mask-title]",
                        {
                            yPercent: 105,
                            duration: 0.9,
                            clearProps: "transform",
                        },
                        "-=0.45",
                    )
                    .from(
                        "[data-about-desc]",
                        {
                            y: 14,
                            opacity: 0,
                            duration: 0.7,
                            clearProps: "all",
                        },
                        "-=0.55",
                    );

                const sections = containerRef.current?.querySelectorAll("[data-about-section]");
                if (sections) {
                    sections.forEach((sec) => {
                        const lines = sec.querySelectorAll("[data-about-hairline]");
                        const content = sec.querySelector("[data-about-content]");

                        const secTl = gsap.timeline({
                            scrollTrigger: {
                                trigger: sec,
                                start: "top 88%",
                                once: true,
                                fastScrollEnd: true,
                                preventOverlaps: true,
                            },
                        });

                        if (lines.length > 0) {
                            secTl.fromTo(
                                lines,
                                { scaleX: 0 },
                                {
                                    scaleX: 1,
                                    transformOrigin: "left center",
                                    duration: 0.9,
                                    ease: "power3.inOut",
                                    clearProps: "all",
                                },
                            );
                        }

                        if (content) {
                            secTl.from(
                                content,
                                {
                                    y: 18,
                                    opacity: 0,
                                    duration: 0.75,
                                    ease: "power4.out",
                                    clearProps: "all",
                                },
                                "-=0.6",
                            );
                        }
                    });
                }
            });
        },
        { scope: containerRef },
    );

    return (
        <main ref={containerRef} className="w-full flex flex-col">
            <div className="w-full px-6 md:px-8 pt-12 sm:pt-16 md:pt-24 pb-10 sm:pb-12 md:pb-16 relative">
                <span
                    data-about-tag
                    className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-4 block"
                >
                    Sobre Mim
                </span>
                <div className="overflow-hidden pb-1.5 mb-6">
                    <h1
                        data-about-mask-title
                        className="text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight text-neutral-100 leading-[1.2] sm:leading-tight"
                    >
                        Construo coisas por curiosidade, gosto de aprender fazendo.
                    </h1>
                </div>
                <p
                    data-about-desc
                    className="text-base md:text-lg text-neutral-400 leading-relaxed max-w-2xl font-normal"
                >
                    Sou uma pessoa curiosa que gosta de tecnologia, design de produto e engenharia web. Encontrei no
                    código uma forma de tirar ideias da cabeça e transformar conceitos em interfaces reais que funcionam
                    com naturalidade na tela.
                </p>
            </div>

            <div data-about-section className="w-full relative">
                <div data-about-hairline className="w-full h-px bg-neutral-800/60 origin-left" />

                <div data-about-content className="w-full px-6 md:px-8 py-10 sm:py-12 md:py-16">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
                        <div className="md:col-span-4">
                            <h2 className="text-xs font-mono tracking-wider text-neutral-400 md:sticky md:top-20">
                                Minha visão
                            </h2>
                        </div>

                        <div className="md:col-span-8 flex flex-col gap-6 max-w-2xl">
                            <p className="text-base md:text-lg text-neutral-300 leading-relaxed font-normal">
                                Não sou uma agência nem pretendo fingir que tenho dezenas de clientes comerciais. A
                                maior parte do que você vê por aqui nasceu do interesse genuíno de experimentar: uma
                                biblioteca que eu queria testar, um conceito visual que me chamou atenção ou uma ideia
                                que pareceu desafiador colocar no mundo.
                            </p>
                            <p className="text-base md:text-lg text-neutral-300 leading-relaxed font-normal">
                                Apesar disso, levo a sério o acabamento de tudo que produzo. Gosto de pensar na
                                usabilidade real, no conforto tipográfico e na clareza do código. Para mim, um projeto
                                autoral merece o mesmo esmero e carinho de qualquer produto digital de ponta.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div data-about-section className="w-full relative">
                <div data-about-hairline className="w-full h-px bg-neutral-800/60 origin-left" />

                <div data-about-content className="w-full px-6 md:px-8 py-10 sm:py-12 md:py-16">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
                        <div className="md:col-span-4">
                            <h2 className="text-xs font-mono tracking-wider text-neutral-400 md:sticky md:top-20">
                                Como aprendo
                            </h2>
                        </div>

                        <div className="md:col-span-8 flex flex-col gap-6 max-w-2xl">
                            <p className="text-base md:text-lg text-neutral-300 leading-relaxed font-normal">
                                Meu processo de aprendizado sempre foi mão na massa. Em vez de apenas ler documentações
                                de forma passiva, prefiro construir um projeto do zero para resolver uma questão
                                prática. É nesse movimento contínuo de construir, quebrar, consertar e refinar que a
                                evolução acontece.
                            </p>
                            <p className="text-base md:text-lg text-neutral-300 leading-relaxed font-normal">
                                Construo minha trajetória dia após dia, explorando com entusiasmo as ferramentas
                                modernas da web e sempre receptivo a novas técnicas e perspectivas de produto.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div data-about-section className="w-full relative">
                <div data-about-hairline className="w-full h-px bg-neutral-800/60 origin-left" />

                <div data-about-content className="w-full px-6 md:px-8 py-10 sm:py-12 md:py-16">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
                        <div className="md:col-span-4">
                            <h2 className="text-xs font-mono tracking-wider text-neutral-400 md:sticky md:top-20">
                                Experiência Profissional
                            </h2>
                        </div>

                        <div className="md:col-span-8 flex flex-col gap-10 max-w-2xl">
                            {EXPERIENCES.map((exp) => (
                                <div key={exp.id} className="flex flex-col gap-3">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs font-mono text-neutral-500">{exp.period}</span>
                                        <h3 className="text-base md:text-lg font-medium text-neutral-100">
                                            {exp.role}
                                        </h3>
                                        <p className="text-sm text-neutral-400 font-normal">{exp.company}</p>
                                    </div>

                                    <ul className="flex flex-col gap-2.5 pt-1">
                                        {exp.description.map((bullet, idx) => (
                                            <li
                                                key={idx}
                                                className="flex items-start gap-2.5 text-sm md:text-base text-neutral-300 leading-relaxed font-normal"
                                            >
                                                <span className="text-neutral-600 select-none pt-0.5 shrink-0">—</span>
                                                <span>{bullet}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div data-about-section className="w-full relative">
                <div data-about-hairline className="w-full h-px bg-neutral-800/60 origin-left" />

                <div data-about-content className="w-full px-6 md:px-8 py-10 sm:py-12 md:py-16">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
                        <div className="md:col-span-4">
                            <h2 className="text-xs font-mono tracking-wider text-neutral-400 md:sticky md:top-20">
                                Stack & Ferramentas
                            </h2>
                        </div>

                        <div className="md:col-span-8 flex flex-col gap-6 max-w-2xl">
                            {TOOLS_AND_TECH.map((group) => (
                                <div
                                    key={group.category}
                                    className="flex flex-col gap-2 pb-6 border-b border-neutral-800/40 last:border-b-0 last:pb-0"
                                >
                                    <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-500">
                                        {group.category}
                                    </h3>
                                    <p className="text-sm sm:text-base text-neutral-300 font-normal leading-relaxed">
                                        {group.items.join(" · ")}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div data-about-hairline className="w-full h-px bg-neutral-800/60 origin-left" />
            </div>
        </main>
    );
}
