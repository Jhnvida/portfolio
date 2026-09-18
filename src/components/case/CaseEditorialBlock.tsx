"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { CaseBlock } from "../../types";

gsap.registerPlugin(ScrollTrigger);

interface CaseEditorialBlockProps {
    block: Extract<CaseBlock, { type: "editorial" }>;
}

export function CaseEditorialBlock({ block }: CaseEditorialBlockProps) {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 85%",
                        once: true,
                    },
                    defaults: { ease: "power4.out" },
                });

                tl.from("[data-editorial-title]", {
                    yPercent: 105,
                    duration: 0.8,
                }).from(
                    "[data-editorial-content]",
                    {
                        y: 18,
                        opacity: 0,
                        duration: 0.8,
                    },
                    "-=0.5",
                );

                gsap.fromTo(
                    "[data-editorial-hairline]",
                    { scaleX: 0 },
                    {
                        scaleX: 1,
                        transformOrigin: "left center",
                        duration: 0.9,
                        ease: "power3.inOut",
                        scrollTrigger: {
                            trigger: "[data-editorial-hairline]",
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
        <section ref={containerRef} className="w-full pt-10 sm:pt-12 md:pt-16 relative">
            <div className="w-full px-6 md:px-8 pb-10 sm:pb-12 md:pb-16">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
                    <div className="md:col-span-4">
                        {block.title && (
                            <div className="overflow-hidden pb-1 md:sticky md:top-20">
                                <h2
                                    data-editorial-title
                                    className="text-xs font-mono uppercase tracking-widest text-neutral-500"
                                >
                                    {block.title}
                                </h2>
                            </div>
                        )}
                    </div>

                    <div data-editorial-content className="md:col-span-8 flex flex-col gap-6">
                        {block.paragraphs.map((paragraph, idx) => (
                            <p key={idx} className="text-base md:text-lg text-neutral-300 leading-relaxed font-normal">
                                {paragraph}
                            </p>
                        ))}

                        {block.list && block.list.length > 0 && (
                            <ul className="mt-4 flex flex-col gap-3 pt-4 border-t border-neutral-800/60">
                                {block.list.map((item, idx) => (
                                    <li
                                        key={idx}
                                        className="flex items-start gap-3 text-sm md:text-base text-neutral-400"
                                    >
                                        <span className="text-neutral-600 select-none pt-0.5">—</span>
                                        <span className="text-neutral-300">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>

            <div
                data-editorial-hairline
                className="absolute bottom-0 left-0 w-full h-px bg-neutral-800/60 origin-left"
            />
        </section>
    );
}
