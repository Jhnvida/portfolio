"use client";

import { PROCESS_STEPS } from "../../data/process";
import { useProcess } from "../../hooks/animations/useProcess";
import { SectionHeader } from "../ui/SectionHeader";

export function Process() {
    const { sectionRef, containerRef } = useProcess();

    return (
        <section id="process" ref={sectionRef} className="w-full bg-background relative py-24 md:py-32">
            <SectionHeader title="Processo" className="relative z-10 mb-24" />

            <div ref={containerRef} className="w-full max-w-(--container-page) mx-auto px-6 md:px-12 lg:px-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                    {PROCESS_STEPS.map((step) => (
                        <div key={step.id} className="process-step flex flex-col gap-6 relative">
                            <span className="text-6xl md:text-[8rem] font-medium text-white/5 block leading-none tracking-tighter mb-4 md:mb-8">
                                {step.number}
                            </span>

                            <div className="flex-1 border-t border-white/10 pt-6">
                                <h3 className="text-2xl font-medium tracking-tight text-white mb-4">{step.title}</h3>

                                <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
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
