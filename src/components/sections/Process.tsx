"use client";

import { PROCESS_STEPS } from "../../data/process";
import { useProcess } from "../../hooks/animations/useProcess";
import { SectionHeader } from "../ui/SectionHeader";

export function Process() {
    const { sectionRef, containerRef } = useProcess();

    return (
        <section
            id="process"
            ref={sectionRef}
            className="w-full h-screen bg-background relative overflow-hidden flex flex-col"
        >
            <SectionHeader title="Como eu trabalho" className="pt-24 md:pt-32 relative z-10" />

            <div ref={containerRef} className="flex-1 w-full relative flex items-center justify-center">
                <div className="w-full max-w-(--container-page) mx-auto px-6 md:px-12 lg:px-24 relative h-full max-h-100">
                    {PROCESS_STEPS.map((step, index) => (
                        <div
                            key={step.id}
                            className="process-step absolute inset-0 flex flex-col justify-center pointer-events-none px-6 md:px-12 lg:px-24"
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
