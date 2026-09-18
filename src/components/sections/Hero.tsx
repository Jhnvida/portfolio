"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { Button } from "../ui/Button";

export function Hero() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                const tl = gsap.timeline({
                    defaults: { ease: "power4.out" },
                });

                tl.from("[data-hero-mask-line]", {
                    yPercent: 105,
                    duration: 0.95,
                    stagger: 0.07,
                })
                    .from(
                        "[data-hero-subtitle]",
                        {
                            yPercent: 105,
                            opacity: 0.3,
                            duration: 0.85,
                        },
                        "-=0.65",
                    )
                    .from(
                        "[data-hero-actions]",
                        {
                            y: 12,
                            opacity: 0,
                            duration: 0.7,
                        },
                        "-=0.55",
                    )
                    .fromTo(
                        "[data-hero-hairline]",
                        { scaleX: 0 },
                        {
                            scaleX: 1,
                            transformOrigin: "left center",
                            duration: 0.9,
                            ease: "power3.inOut",
                        },
                        "-=0.6",
                    );
            });
        },
        { scope: containerRef },
    );

    return (
        <section ref={containerRef} id="hero" className="w-full pt-16 md:pt-24 relative">
            <div className="w-full px-6 md:px-8 flex flex-col items-start gap-8 pb-16 md:pb-24">
                <div className="flex flex-col gap-6 max-w-2xl">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-neutral-100 leading-[1.15]">
                        <span className="block overflow-hidden pb-1">
                            <span data-hero-mask-line className="block">
                                Construo interfaces digitais
                            </span>
                        </span>
                        <span className="block overflow-hidden pb-1">
                            <span data-hero-mask-line className="block">
                                com rigor visual, código limpo
                            </span>
                        </span>
                        <span className="block overflow-hidden pb-1">
                            <span data-hero-mask-line className="block">
                                e atenção obsessiva aos detalhes.
                            </span>
                        </span>
                    </h1>
                    <div className="overflow-hidden">
                        <p
                            data-hero-subtitle
                            className="text-base md:text-lg text-neutral-400 leading-relaxed font-normal"
                        >
                            Sou João Vida, engenheiro front-end e designer de produto. Crio experiências digitais
                            autênticas unindo precisão estética, arquitetura moderna e usabilidade intuitiva, sem ruídos
                            desnecessários.
                        </p>
                    </div>
                </div>

                <div data-hero-actions className="flex flex-wrap items-center gap-3 pt-2">
                    <Button href="#work" variant="primary" showArrow size="md">
                        Ver projetos
                    </Button>
                    <Button href="/about" variant="secondary" size="md">
                        Sobre mim
                    </Button>
                </div>
            </div>

            <div data-hero-hairline className="absolute bottom-0 left-0 w-full h-[1px] bg-neutral-800/60 origin-left" />
        </section>
    );
}
