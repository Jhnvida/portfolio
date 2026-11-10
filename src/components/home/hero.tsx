"use client";

import { MOTION } from "@/lib/motion";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export function Hero() {
    const heroRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const headingEl = headingRef.current;
        const descEl = descRef.current;
        if (!headingEl || !descEl) return;

        const originalHeadingText = headingEl.textContent || "";

        const ctx = gsap.context(() => {
            const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

            if (prefersReducedMotion) {
                gsap.set([headingEl, descEl], { y: 0, opacity: 1 });
                return;
            }

            const words = originalHeadingText.trim().split(/\s+/);
            headingEl.innerHTML = "";
            const wordSpans: HTMLElement[] = [];

            words.forEach((word, i) => {
                const span = document.createElement("span");
                span.className = "inline-block will-change-[transform,opacity]";
                span.textContent = word;
                headingEl.appendChild(span);
                wordSpans.push(span);

                if (i < words.length - 1) {
                    headingEl.appendChild(document.createTextNode(" "));
                }
            });

            const tl = gsap.timeline({
                onComplete: () => {
                    gsap.set(wordSpans, { clearProps: "transform,opacity,willChange" });
                    gsap.set(descEl, { clearProps: "transform,opacity,willChange" });
                },
            });

            tl.fromTo(
                wordSpans,
                { y: 22, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: MOTION.duration.entrance,
                    stagger: 0.038,
                    ease: MOTION.ease.entrance,
                    delay: 0.12,
                },
                0,
            );

            tl.fromTo(
                descEl,
                { y: MOTION.distance.content, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: MOTION.duration.content,
                    ease: MOTION.ease.smooth,
                },
                "-=0.55",
            );
        }, heroRef);

        return () => {
            ctx.revert();
            if (headingEl) {
                headingEl.textContent = originalHeadingText;
            }
        };
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
                        className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-neutral-950 leading-[1.12] sm:leading-[1.1] text-balance"
                    >
                        Transformando ideias em produtos digitais bem construídos.
                    </h1>

                    <p
                        ref={descRef}
                        className="font-sans text-base sm:text-lg md:text-xl text-neutral-700 leading-relaxed max-w-3xl text-pretty"
                    >
                        Unindo engenharia de software, pensamento de produto e design para criar experiências digitais
                        funcionais, consistentes e duradouras.
                    </p>
                </div>
            </div>
        </section>
    );
}
