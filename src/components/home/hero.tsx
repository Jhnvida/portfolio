"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useEffect, useRef } from "react";

export function Hero() {
    const heroRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

            if (prefersReducedMotion) {
                gsap.set([headingRef.current, ctaRef.current], { opacity: 1, y: 0 });
                return;
            }

            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            if (headingRef.current) {
                tl.fromTo(
                    headingRef.current,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.75, clearProps: "transform,opacity" },
                );
            }

            if (ctaRef.current) {
                tl.fromTo(
                    ctaRef.current,
                    { y: 16, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.7, clearProps: "transform,opacity" },
                    "-=0.55",
                );
            }

            if (heroRef.current && contentRef.current) {
                gsap.to(contentRef.current, {
                    scale: 0.93,
                    opacity: 0.25,
                    y: -30,
                    ease: "none",
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                    },
                });
            }
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={heroRef}
            className="sticky top-0 z-0 -mt-20 sm:-mt-24 pt-28 sm:pt-32 pb-16 flex min-h-[85svh] md:min-h-[88svh] w-full flex-col items-center justify-center bg-surface-subtle px-6 text-center"
        >
            <div ref={contentRef} className="mx-auto max-w-2xl transform-gpu will-change-transform">
                <h1
                    ref={headingRef}
                    className="font-heading text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-neutral-950 leading-[1.2] sm:leading-[1.18]"
                >
                    Ei, pensando em criar algo incrível?
                    <br />
                    Vamos tirar essa ideia do papel.
                </h1>

                <div
                    ref={ctaRef}
                    className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-[13px] font-sans font-medium"
                >
                    <a
                        href="#contato"
                        className="cursor-pointer rounded-full bg-neutral-950 px-5 py-2.5 text-white transition-[background-color,transform] duration-200 ease-out hover:bg-neutral-800 active:scale-[0.98] inline-flex items-center justify-center min-h-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
                        aria-label="Ir para a seção de contato e conversar sobre um projeto"
                    >
                        Conversar sobre um projeto
                    </a>

                    <Link
                        href="/about"
                        className="rounded-full border border-neutral-200/80 bg-white px-5 py-2.5 text-neutral-800 transition-[background-color,border-color,color,transform] duration-200 ease-out hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-950 active:scale-[0.98] inline-flex items-center justify-center min-h-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
                        aria-label="Conhecer mais sobre minha postura profissional e trajetória"
                    >
                        Conhecer o trabalho
                    </Link>
                </div>
            </div>
        </section>
    );
}
