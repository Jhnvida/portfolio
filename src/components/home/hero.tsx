"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

export function Hero() {
    const heroRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

            if (prefersReducedMotion) {
                gsap.set([headingRef.current, descRef.current], { y: 0, opacity: 1 });
                return;
            }

            const elements = [headingRef.current, descRef.current].filter(Boolean);

            if (elements.length > 0) {
                gsap.fromTo(
                    elements,
                    { y: 22, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.85,
                        stagger: 0.14,
                        ease: "power3.out",
                        clearProps: "transform,opacity",
                    },
                );
            }
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={heroRef}
            id="inicio"
            aria-label="Introdução do portfólio"
            className="w-full min-h-[70vh] sm:min-h-[76vh] md:min-h-[82vh] flex flex-col justify-center pt-8 sm:pt-12 md:pt-16 pb-16 sm:pb-24 md:pb-32"
        >
            <div className="max-w-360 mx-auto w-full px-6 md:px-10 lg:px-12 xl:px-16">
                <div className="w-full max-w-4xl lg:max-w-5xl text-left space-y-6 sm:space-y-8">
                    <h1
                        ref={headingRef}
                        className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-normal tracking-tight text-neutral-950 leading-[1.18] sm:leading-[1.14] text-balance"
                    >
                        Transformando ideias em produtos digitais bem construídos.
                    </h1>

                    <p
                        ref={descRef}
                        className="font-sans text-base sm:text-lg md:text-xl text-neutral-600 leading-relaxed max-w-3xl text-pretty"
                    >
                        Unindo engenharia de software, pensamento de produto e design para criar experiências digitais
                        funcionais, consistentes e duradouras.
                    </p>
                </div>
            </div>
        </section>
    );
}
