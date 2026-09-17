"use client";

import { PROCESS_STEPS } from "../../data/process";
import { useProcess } from "../../hooks/animations/useProcess";
import { SectionHeader } from "../ui/SectionHeader";

export function Process() {
    const { sectionRef, containerRef, lineRef } = useProcess();

    return (
        <section id="process" ref={sectionRef} className="w-full bg-background relative py-24 md:py-32">
            <SectionHeader title="Processo" className="relative z-10 mb-24 md:mb-32" />

            <div
                ref={containerRef}
                className="w-full max-w-5xl mx-auto px-6 md:px-12 lg:px-24 relative flex gap-8 md:gap-16 lg:gap-24"
            >
                <div className="relative w-px shrink-0 flex flex-col items-center z-0">
                    <div className="absolute top-2 bottom-2 w-px bg-white/10">
                        <div
                            ref={lineRef}
                            className="w-full h-full bg-white origin-top"
                            style={{ transform: "scaleY(0)" }}
                        />
                    </div>
                </div>

                <div className="flex-1 flex flex-col gap-24 md:gap-32 pb-12 z-10">
                    {PROCESS_STEPS.map((step) => (
                        <div
                            key={step.id}
                            className="process-step relative flex flex-col md:flex-row gap-6 md:gap-12 origin-left"
                            style={{ opacity: 0.3, transform: "scale(0.95)" }}
                        >
                            <div className="w-12 md:w-20 shrink-0 pt-1 md:pt-2">
                                <span className="process-number text-3xl md:text-5xl font-medium tracking-tighter text-white/20 block">
                                    {step.number}
                                </span>
                            </div>

                            <div className="process-content flex-1">
                                <h3 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-6">
                                    {step.title}
                                </h3>
                                <p className="text-neutral-400 text-lg md:text-xl leading-relaxed max-w-2xl">
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
