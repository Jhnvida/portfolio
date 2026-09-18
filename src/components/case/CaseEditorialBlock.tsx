"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
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
                gsap.from(containerRef.current, {
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 85%",
                        once: true,
                    },
                    y: 20,
                    opacity: 0,
                    duration: 0.7,
                    ease: "power2.out",
                });
            });
        },
        { scope: containerRef }
    );

    return (
        <section ref={containerRef} className="w-full py-12 md:py-16 border-b border-neutral-800/60">
            <div className="w-full px-6 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
                    <div className="md:col-span-4">
                        {block.title && (
                            <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-500 sticky top-20">
                                {block.title}
                            </h2>
                        )}
                    </div>

                    <div className="md:col-span-8 flex flex-col gap-6">
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
        </section>
    );
}
