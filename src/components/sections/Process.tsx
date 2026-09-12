"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface ProcessStep {
    id: string;
    number: string;
    title: string;
    description: string;
}

const PROCESS_STEPS: ProcessStep[] = [
    {
        id: "discovery",
        number: "01",
        title: "Descoberta & Arquitetura",
        description:
            "Entendimento profundo do escopo e mapeamento da arquitetura de dados e UX antes da primeira linha de código.",
    },
    {
        id: "engineering",
        number: "02",
        title: "Engenharia & Performance",
        description:
            "Desenvolvimento full-stack robusto, priorizando código limpo, lógica escalável e altíssima performance estrutural.",
    },
    {
        id: "refinement",
        number: "03",
        title: "Refinamento & Interação",
        description:
            "Polimento visual cirúrgico e implementação de microinterações fluidas com GSAP, unindo estética premium e funcionalidade.",
    },
    {
        id: "deploy",
        number: "04",
        title: "Deploy & Evolução",
        description:
            "Lançamento impecável, otimização contínua de métricas (SEO/Performance) e suporte analítico para garantir escala.",
    },
];

export function Process() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(
        () => {
            if (!sectionRef.current || !containerRef.current) return;

            gsap.set(stepsRef.current, { opacity: 1, y: 0 });

            stepsRef.current.forEach((step, i) => {
                if (!step) return;
                const elements = step.querySelectorAll("span, h3, p");
                gsap.set(elements, {
                    opacity: i === 0 ? 1 : 0,
                    y: i === 0 ? 0 : window.innerHeight * 0.4,
                });
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: `+=${PROCESS_STEPS.length * 80}%`,
                    pin: true,
                    scrub: 0.5,
                    anticipatePin: 1,
                },
            });

            PROCESS_STEPS.forEach((_, index) => {
                if (index < PROCESS_STEPS.length - 1) {
                    const currentStep = stepsRef.current[index];
                    const nextStep = stepsRef.current[index + 1];

                    if (!currentStep || !nextStep) return;

                    const currentElements = currentStep.querySelectorAll("span, h3, p");
                    const nextElements = nextStep.querySelectorAll("span, h3, p");

                    tl.to(
                        currentElements,
                        {
                            opacity: 0,
                            y: -(window.innerHeight * 0.4),
                            duration: 1,
                            stagger: 0.1,
                            ease: "none",
                        },
                        `step${index}`,
                    ).to(
                        nextElements,
                        {
                            opacity: 1,
                            y: 0,
                            duration: 1,
                            stagger: 0.1,
                            ease: "none",
                        },
                        `step${index}+=0.1`,
                    );
                }
            });
        },
        { scope: sectionRef },
    );

    return (
        <section ref={sectionRef} className="w-full h-screen bg-background relative overflow-hidden flex flex-col">
            <div className="w-full max-w-(--container-page) mx-auto px-6 md:px-12 lg:px-24 pt-24 md:pt-32 relative z-10 mb-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-4">
                            Como eu trabalho
                        </h2>

                        <p className="text-neutral-400 text-lg max-w-xl">
                            Um processo disciplinado que une arquitetura técnica e obsessão visual para entregar
                            produtos de alto padrão.
                        </p>
                    </div>
                </div>
            </div>

            <div ref={containerRef} className="flex-1 w-full relative flex items-center justify-center">
                <div className="w-full max-w-(--container-page) mx-auto px-6 md:px-12 lg:px-24 relative h-full max-h-100">
                    {PROCESS_STEPS.map((step, index) => (
                        <div
                            key={step.id}
                            ref={(el) => {
                                stepsRef.current[index] = el;
                            }}
                            className="absolute inset-0 flex flex-col justify-center pointer-events-none px-6 md:px-12 lg:px-24"
                        >
                            <div className="max-w-2xl pointer-events-auto">
                                <span className="text-5xl md:text-7xl font-bold text-white/10 mb-6 block font-mono">
                                    {step.number}
                                </span>

                                <h3 className="text-3xl md:text-4xl font-semibold text-white mb-4 leading-tight">
                                    {step.title}
                                </h3>

                                <p className="text-neutral-400 text-lg md:text-xl leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
