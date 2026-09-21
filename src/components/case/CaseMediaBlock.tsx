"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";
import { CaseBlock } from "../../types";

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
                gsap.from("[data-media-wrapper]", {
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 85%",
                        once: true,
                    },
                    y: 24,
                    opacity: 0,
                    duration: 0.85,
                    ease: "power4.out",
                });

                gsap.fromTo(
                    "[data-media-hairline]",
                    { scaleX: 0 },
                    {
                        scaleX: 1,
                        transformOrigin: "left center",
                        duration: 0.9,
                        ease: "power3.inOut",
                        scrollTrigger: {
                            trigger: "[data-media-hairline]",
                            start: "top 95%",
                            once: true,
                        },
                    },
                );
            });

            mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => {
                const images = containerRef.current?.querySelectorAll<HTMLElement>("[data-parallax-image]");
                images?.forEach((img) => {
                    const cardWrapper = img.parentElement;
                    gsap.fromTo(
                        img,
                        { yPercent: -9, scale: 1.22 },
                        {
                            yPercent: 9,
                            scale: 1.22,
                            ease: "none",
                            scrollTrigger: {
                                trigger: cardWrapper || containerRef.current,
                                start: "top bottom",
                                end: "bottom top",
                                scrub: true,
                            },
                        },
                    );
                });
            });

            mm.add("(prefers-reduced-motion: no-preference) and (max-width: 767px)", () => {
                const images = containerRef.current?.querySelectorAll<HTMLElement>("[data-parallax-image]");
                images?.forEach((img) => {
                    const cardWrapper = img.parentElement;
                    gsap.fromTo(
                        img,
                        { yPercent: -6, scale: 1.15 },
                        {
                            yPercent: 6,
                            scale: 1.15,
                            ease: "none",
                            scrollTrigger: {
                                trigger: cardWrapper || containerRef.current,
                                start: "top bottom",
                                end: "bottom top",
                                scrub: true,
                            },
                        },
                    );
                });
            });
        },
        { scope: containerRef },
    );

    if (layout === "full") {
        const item = items[0];
        return (
            <section ref={containerRef} className="w-full pt-8 md:pt-12 relative">
                <div data-media-wrapper className="w-full px-6 md:px-8 flex flex-col gap-3 pb-8 md:pb-12">
                    <div className="relative w-full aspect-16/10 rounded-none overflow-hidden border border-neutral-800/80 bg-neutral-950">
                        <div data-parallax-image className="absolute inset-0 w-full h-full will-change-transform">
                            <Image
                                src={item.src}
                                alt={item.alt || "Case media"}
                                fill
                                priority
                                sizes="(max-width: 768px) 100vw, 896px"
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {item.alt && <span className="text-xs font-mono text-neutral-500 px-1">{item.alt}</span>}
                </div>

                <div
                    data-media-hairline
                    className="absolute bottom-0 left-0 w-full h-px bg-neutral-800/60 origin-left"
                />
            </section>
        );
    }

    if (layout === "grid-2") {
        return (
            <section ref={containerRef} className="w-full pt-8 md:pt-12 relative">
                <div data-media-wrapper className="w-full px-6 md:px-8 pb-8 md:pb-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                        {items.map((item, idx) => (
                            <div key={idx} className="flex flex-col gap-2">
                                <div className="relative w-full aspect-4/3 rounded-none overflow-hidden border border-neutral-800/80 bg-neutral-950">
                                    <div
                                        data-parallax-image
                                        className="absolute inset-0 w-full h-full will-change-transform"
                                    >
                                        <Image
                                            src={item.src}
                                            alt={item.alt || `Case detail ${idx + 1}`}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 440px"
                                            className="object-cover"
                                        />
                                    </div>
                                </div>

                                {item.alt && (
                                    <span className="text-xs font-mono text-neutral-500 px-1">{item.alt}</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div
                    data-media-hairline
                    className="absolute bottom-0 left-0 w-full h-px bg-neutral-800/60 origin-left"
                />
            </section>
        );
    }

    const item = items[0];
    return (
        <section ref={containerRef} className="w-full pt-8 md:pt-12 relative">
            <div data-media-wrapper className="w-full px-6 md:px-8 flex flex-col gap-2 pb-8 md:pb-12">
                <div className="relative w-full aspect-video rounded-none overflow-hidden border border-neutral-800/80 bg-neutral-950">
                    <div data-parallax-image className="absolute inset-0 w-full h-full will-change-transform">
                        <Image
                            src={item.src}
                            alt={item.alt || "Case media"}
                            fill
                            sizes="(max-width: 768px) 100vw, 896px"
                            className="object-cover"
                        />
                    </div>
                </div>

                {item.alt && <span className="text-xs font-mono text-neutral-500 px-1">{item.alt}</span>}
            </div>

            <div data-media-hairline className="absolute bottom-0 left-0 w-full h-px bg-neutral-800/60 origin-left" />
        </section>
    );
}
