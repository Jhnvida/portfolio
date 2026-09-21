"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { PROCESS_STEPS } from "../../data/process";

export function Process() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                const headerTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: "[data-process-header]",
                        start: "top 85%",
                        once: true,
                    },
                    defaults: { ease: "power4.out" },
                });

                headerTl
                    .from("[data-process-tag]", {
                        y: 10,
                        opacity: 0,
                        duration: 0.6,
                    })
                    .from(
                        "[data-process-mask-title]",
                        {
                            yPercent: 105,
                            duration: 0.9,
                        },
                        "-=0.45",
                    )
                    .from(
                        "[data-process-desc]",
                        {
                            y: 14,
                            opacity: 0,
                            duration: 0.7,
                        },
                        "-=0.55",
                    );

                const items = containerRef.current?.querySelectorAll("[data-process-item]");
                if (items) {
                    items.forEach((item) => {
                        const line = item.querySelector("[data-process-line]");
                        const content = item.querySelector("[data-process-content]");

                        const itemTl = gsap.timeline({
                            scrollTrigger: {
                                trigger: item,
                                start: "top 85%",
                                once: true,
                            },
                        });

                        if (line) {
                            itemTl.fromTo(
                                line,
                                { scaleX: 0 },
                                {
                                    scaleX: 1,
                                    transformOrigin: "left center",
                                    duration: 0.9,
                                    ease: "power3.inOut",
                                },
                            );
                        }

                        if (content) {
                            itemTl.from(
                                content,
                                {
                                    y: 18,
                                    opacity: 0,
                                    duration: 0.7,
                                    ease: "power4.out",
                                },
                                "-=0.6",
                            );
                        }
                    });
                }

                gsap.fromTo(
                    "[data-process-bottom-hairline]",
                    { scaleX: 0 },
                    {
                        scaleX: 1,
                        transformOrigin: "left center",
                        duration: 0.9,
                        ease: "power3.inOut",
                        scrollTrigger: {
                            trigger: "[data-process-bottom-hairline]",
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
        <section ref={containerRef} id="process" className="w-full pt-12 sm:pt-16 md:pt-24 relative">
            <div className="w-full px-6 md:px-8 flex flex-col gap-8 sm:gap-10 pb-12 sm:pb-16 md:pb-24">
                <div data-process-header className="flex flex-col gap-2">
                    <span data-process-tag className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                        Processo Criativo
                    </span>

                    <div className="overflow-hidden pb-1">
                        <h2
                            data-process-mask-title
                            className="text-2xl md:text-3xl font-medium tracking-tight text-neutral-100"
                        >
                            Como eu crio
                        </h2>
                    </div>

                    <p data-process-desc className="text-sm md:text-base text-neutral-400 max-w-xl leading-relaxed">
                        Um fluxo transparente e iterativo que conecta imaginação inicial, prototipagem rápida e refino
                        visual contínuo.
                    </p>
                </div>

                <div className="flex flex-col">
                    {PROCESS_STEPS.map((step) => (
                        <div key={step.id} data-process-item className="flex flex-col">
                            <div data-process-line className="w-full h-px bg-neutral-800/60 origin-left" />

                            <div
                                data-process-content
                                className="py-6 md:py-7 flex flex-col md:flex-row md:items-baseline justify-between gap-3 md:gap-8 group transition-colors duration-200 hover:bg-neutral-900/10 px-2 -mx-2 rounded-none"
                            >
                                <div className="md:w-5/12 shrink-0">
                                    <h3 className="text-base md:text-lg font-medium text-neutral-200 group-hover:text-white transition-colors duration-200">
                                        {step.title}
                                    </h3>
                                </div>

                                <div className="md:w-7/12">
                                    <p className="text-sm md:text-base text-neutral-400 leading-relaxed max-w-lg">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div data-process-line className="w-full h-px bg-neutral-800/60 origin-left" />
                </div>
            </div>

            <div
                data-process-bottom-hairline
                className="absolute bottom-0 left-0 w-full h-px bg-neutral-800/60 origin-left"
            />
        </section>
    );
}
