"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

export function Hero() {
    const heroRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

            if (prefersReducedMotion) {
                gsap.set(headingRef.current, { y: 0, opacity: 1 });
                return;
            }

            if (headingRef.current) {
                gsap.fromTo(
                    headingRef.current,
                    { y: 24, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", clearProps: "transform,opacity" },
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
            className="w-full min-h-[48vh] sm:min-h-[52vh] py-20 sm:py-28 md:py-32 flex flex-col justify-center px-6 md:px-10 lg:px-12 xl:px-16"
        >
            <div className="w-full max-w-5xl text-left">
                <h1
                    ref={headingRef}
                    className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-normal tracking-tight text-neutral-950 leading-[1.16] sm:leading-[1.14]"
                >
                    Ei, pensando em criar algo incrível?
                    <br />
                    Vamos tirar essa ideia do papel.
                </h1>
            </div>
        </section>
    );
}
