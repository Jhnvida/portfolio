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
                    { y: 22, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.85, clearProps: "transform" },
                );
            }

            if (ctaRef.current) {
                tl.fromTo(
                    ctaRef.current,
                    { y: 16, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.7, clearProps: "transform" },
                    "-=0.6",
                );
            }

            if (heroRef.current && contentRef.current) {
                ScrollTrigger.create({
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    pin: true,
                    pinSpacing: false,
                    anticipatePin: 1,
                });

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
            className="relative z-0 flex min-h-[85svh] md:min-h-[88svh] w-full flex-col items-center justify-center px-6 py-16 text-center"
        >
            <div ref={contentRef} className="mx-auto max-w-2xl will-change-transform">
                <h1
                    ref={headingRef}
                    className="font-heading text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-neutral-950 leading-snug"
                >
                    João André — desenvolvendo aplicações web com React, TypeScript, Node.js e PHP.
                </h1>

                <div ref={ctaRef} className="mt-8 flex items-center justify-center gap-3 text-xs font-sans">
                    <a
                        href="#contato"
                        className="cursor-pointer rounded-full bg-neutral-950 px-4 py-2 text-white transition-all duration-200 ease-out hover:opacity-85 active:scale-98 inline-block"
                        aria-label="Ir para a seção de contato no rodapé"
                    >
                        Copiar e-mail
                    </a>

                    <Link
                        href="/about"
                        className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-neutral-800 transition-all duration-200 ease-out hover:border-neutral-300 hover:bg-neutral-50 active:scale-98 inline-block"
                    >
                        Sobre mim
                    </Link>
                </div>
            </div>
        </section>
    );
}
