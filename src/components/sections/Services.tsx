"use client";

import { SERVICES } from "../../data/services";
import { useServices } from "../../hooks/animations/useServices";
import { Button } from "../ui/Button";
import { SectionHeader } from "../ui/SectionHeader";

export function Services() {
    const { containerRef } = useServices();

    return (
        <section id="services" className="w-full bg-background relative overflow-hidden flex flex-col py-24 md:py-32">
            <SectionHeader title="Serviços" className="relative z-10" />

            <div
                ref={containerRef}
                className="w-full max-w-(--container-page) mx-auto px-6 md:px-12 lg:px-24 mt-12 pb-32"
            >
                <div className="flex flex-col gap-16 md:gap-32">
                    {SERVICES.map((service, index) => {
                        return (
                            <div
                                key={service.id}
                                className="service-card sticky w-full h-auto min-h-[50vh] md:min-h-[60vh] rounded-3xl border border-white/10 bg-surface-raised flex flex-col justify-between p-8 md:p-12 lg:p-16 shadow-2xl origin-top"
                                style={{ top: `calc(6rem + ${index * 1.5}rem)` }}
                            >
                                <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-16 md:mb-0">
                                    <span className="text-sm font-mono text-neutral-500 w-12">{service.number}</span>

                                    <p className="text-sm font-medium text-neutral-400 tracking-wider uppercase text-left md:text-right">
                                        {service.tags}
                                    </p>
                                </div>

                                <div className="flex flex-col gap-8">
                                    <h3 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-white leading-[1.1] max-w-4xl">
                                        {service.title}
                                    </h3>

                                    <div className="h-px w-full bg-white/5 my-2" />

                                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 lg:gap-16">
                                        <p className="text-neutral-400 text-base md:text-xl max-w-2xl leading-relaxed">
                                            {service.description}
                                        </p>

                                        <Button
                                            href="/contact"
                                            className="shrink-0 px-8 py-4 text-sm md:text-base focus-visible:ring-offset-surface-raised"
                                        >
                                            {service.ctaLabel}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
