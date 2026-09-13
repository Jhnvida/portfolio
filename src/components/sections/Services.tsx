"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Minus, Plus } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { SERVICES } from "../../data/services";
import { SectionHeader } from "../ui/SectionHeader";

gsap.registerPlugin(useGSAP);

export function Services() {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const initialized = useRef(false);

    useGSAP(
        () => {
            const contents = gsap.utils.toArray<HTMLElement>(".service-content");

            if (!initialized.current) {
                contents.forEach((el, index) => {
                    if (index !== activeIndex) {
                        gsap.set(el, { height: 0, opacity: 0 });
                    }
                });
                initialized.current = true;
            }

            contents.forEach((el, index) => {
                const isActive = index === activeIndex;

                gsap.to(el, {
                    height: isActive ? "auto" : 0,
                    opacity: isActive ? 1 : 0,
                    duration: 0.5,
                    ease: "power2.inOut",
                });
            });
        },
        { scope: containerRef, dependencies: [activeIndex] },
    );

    return (
        <section className="w-full bg-background relative overflow-hidden flex flex-col py-24 md:py-32">
            <SectionHeader title="Serviços" className="relative z-10" />

            <div ref={containerRef} className="w-full max-w-(--container-page) mx-auto px-6 md:px-12 lg:px-24 mt-12">
                <div className="flex flex-col">
                    {SERVICES.map((service, index) => {
                        const isActive = index === activeIndex;
                        const isFirst = index === 0;
                        const isLast = index === SERVICES.length - 1;
                        const radiusClass = isFirst ? "rounded-t-2xl" : isLast ? "rounded-b-2xl" : "rounded-none";

                        return (
                            <div
                                key={service.id}
                                className={`flex flex-col group cursor-pointer transition-all duration-500 overflow-hidden ${radiusClass} ${
                                    isActive
                                        ? "bg-white/5 border border-white/10"
                                        : "border-b border-white/10 hover:bg-white/2"
                                }`}
                                onClick={() => setActiveIndex(isActive ? null : index)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault();
                                        setActiveIndex(isActive ? null : index);
                                    }
                                }}
                                tabIndex={0}
                                role="button"
                                aria-expanded={isActive}
                            >
                                <div className="w-full py-8 md:py-10 px-6 md:px-10 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                                    <span className="text-sm font-mono text-neutral-500 w-12">{service.number}</span>

                                    <div className="flex-1">
                                        <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
                                            {service.title}
                                        </h3>
                                        <p className="text-sm text-neutral-400 tracking-wide">{service.tags}</p>
                                    </div>

                                    <div className="hidden md:flex items-center justify-center w-8 h-8 rounded-full border border-white/10 text-white/50 group-hover:text-white transition-colors">
                                        {isActive ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                                    </div>
                                </div>

                                <div className="service-content overflow-hidden px-6 md:px-10">
                                    <div className="pb-8 md:pb-10 md:pl-20">
                                        <div className="h-px w-full bg-white/5 mb-8" />

                                        <p className="text-neutral-400 text-base md:text-lg max-w-2xl leading-relaxed mb-8">
                                            {service.description}
                                        </p>

                                        <Link
                                            href="/contact"
                                            className="inline-flex items-center justify-center px-6 py-3 bg-white text-black font-medium text-sm rounded-full hover:bg-neutral-200 transition-colors"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {service.ctaLabel}
                                        </Link>
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
