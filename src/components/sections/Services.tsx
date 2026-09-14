"use client";

import { SERVICES } from "../../data/services";
import { Button } from "../ui/Button";
import { SectionHeader } from "../ui/SectionHeader";

export function Services() {
    return (
        <section id="services" className="w-full bg-background relative overflow-hidden flex flex-col py-24 md:py-32">
            <SectionHeader title="Serviços" className="relative z-10 mb-12" />

            <div className="w-full max-w-(--container-page) mx-auto px-6 md:px-12 lg:px-24">
                <div className="flex flex-col border-t border-white/10">
                    {SERVICES.map((service, index) => {
                        const formattedIndex = (index + 1).toString().padStart(2, "0");

                        return (
                            <div
                                key={service.id}
                                className="group relative border-b border-white/10 py-12 md:py-16 flex flex-col lg:flex-row items-baseline gap-6 lg:gap-12 transition-colors hover:bg-white/2 cursor-default"
                            >
                                <span className="text-sm font-mono text-neutral-500 w-12 shrink-0">
                                    {formattedIndex}
                                </span>

                                <div className="flex flex-col gap-4">
                                    <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest block lg:hidden">
                                        {service.tags}
                                    </p>
                                    <h3 className="text-4xl md:text-5xl lg:text-7xl font-medium tracking-tighter text-neutral-400 transition-colors group-hover:text-white">
                                        {service.title}
                                    </h3>
                                </div>

                                <div className="lg:ml-auto lg:opacity-0 lg:translate-y-4 transition-all duration-500 ease-out lg:group-hover:opacity-100 lg:group-hover:translate-y-0 flex flex-col gap-6 max-w-md mt-6 lg:mt-0">
                                    <p className="text-sm md:text-base text-neutral-400 leading-relaxed">
                                        {service.description}
                                    </p>

                                    <div>
                                        <Button href="/contact" variant="secondary" className="px-6 py-3 text-sm">
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
