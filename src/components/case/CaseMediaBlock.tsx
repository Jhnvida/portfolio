"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { CaseBlock } from "../../types";

gsap.registerPlugin(ScrollTrigger);

interface CaseMediaBlockProps {
    block: Extract<CaseBlock, { type: "media" }>;
}

export function CaseMediaBlock({ block }: CaseMediaBlockProps) {
    const containerRef = useRef<HTMLElement>(null);
    const { layout, items } = block;

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
                    y: 24,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power2.out",
                });
            });
        },
        { scope: containerRef }
    );

    if (layout === "full") {
        const item = items[0];
        return (
            <section ref={containerRef} className="w-full py-8 md:py-12 border-b border-neutral-800/60">
                <div className="w-full px-6 md:px-8 flex flex-col gap-3">
                    <div className="relative w-full aspect-16/10 rounded-none overflow-hidden border border-neutral-800/80 bg-neutral-950">
                        <Image
                            src={item.src}
                            alt={item.alt || "Case media"}
                            fill
                            sizes="(max-width: 768px) 100vw, 896px"
                            className="object-cover"
                        />
                    </div>
                    {item.alt && (
                        <span className="text-xs font-mono text-neutral-500 px-1">
                            {item.alt}
                        </span>
                    )}
                </div>
            </section>
        );
    }

    if (layout === "grid-2") {
        return (
            <section ref={containerRef} className="w-full py-8 md:py-12 border-b border-neutral-800/60">
                <div className="w-full px-6 md:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                        {items.map((item, idx) => (
                            <div key={idx} className="flex flex-col gap-2">
                                <div className="relative w-full aspect-4/3 rounded-none overflow-hidden border border-neutral-800/80 bg-neutral-950">
                                    <Image
                                        src={item.src}
                                        alt={item.alt || `Case detail ${idx + 1}`}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 440px"
                                        className="object-cover"
                                    />
                                </div>
                                {item.alt && (
                                    <span className="text-xs font-mono text-neutral-500 px-1">
                                        {item.alt}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    const item = items[0];
    return (
        <section ref={containerRef} className="w-full py-8 md:py-12 border-b border-neutral-800/60">
            <div className="w-full px-6 md:px-8 flex flex-col gap-2">
                <div className="relative w-full aspect-video rounded-none overflow-hidden border border-neutral-800/80 bg-neutral-950">
                    <Image
                        src={item.src}
                        alt={item.alt || "Case media"}
                        fill
                        sizes="(max-width: 768px) 100vw, 896px"
                        className="object-cover"
                    />
                </div>
                {item.alt && (
                    <span className="text-xs font-mono text-neutral-500 px-1">
                        {item.alt}
                    </span>
                )}
            </div>
        </section>
    );
}
