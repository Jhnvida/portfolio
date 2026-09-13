"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { useRef } from "react";
import { CodeCube } from "../ui/CodeCube";

gsap.registerPlugin(useGSAP);

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const items = gsap.utils.toArray<HTMLElement>("[data-anim]", containerRef.current);
            let mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                gsap.from(items, {
                    opacity: 0,
                    y: 30,
                    scale: 0.95,
                    duration: 1,
                    ease: "expo.out",
                    stagger: 0.15,
                });
            });

            mm.add("(prefers-reduced-motion: reduce)", () => {
                gsap.from(items, {
                    opacity: 0,
                    duration: 1,
                    ease: "power2.out",
                    stagger: 0.1,
                });
            });
        },
        { scope: containerRef },
    );

    return (
        <div className="w-full max-w-(--container-page) min-h-[65vh] lg:min-h-[70vh] mx-auto px-6 md:px-12 lg:px-24 flex items-center pt-24 lg:pt-0">
            <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 md:gap-12 w-full">
                <div>
                    <h1
                        data-anim
                        className="text-white text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1]"
                    >
                        Engenharia de software focada em interfaces refinadas.
                    </h1>

                    <p data-anim className="text-neutral-400 text-base md:text-lg max-w-xl mt-6 leading-relaxed">
                        Desenvolvimento full-stack especializado em produtos digitais de alto desempenho, unindo
                        arquitetura robusta e estética premium.
                    </p>

                    <div data-anim>
                        <Link
                            href="/work"
                            className="inline-block mt-8 px-6 py-3 bg-white text-black font-medium hover:bg-neutral-200 transition-colors rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                        >
                            Ver trabalhos
                        </Link>
                    </div>
                </div>

                <div data-anim className="hidden lg:flex items-center justify-center h-105">
                    <CodeCube />
                </div>
            </div>
        </div>
    );
}
