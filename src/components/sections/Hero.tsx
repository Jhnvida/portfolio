"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "../ui/Button";

export function Hero() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                const tl = gsap.timeline({
                    defaults: { ease: "power2.out", duration: 0.8 },
                });

                tl.from("[data-hero-title]", {
                    y: 20,
                    opacity: 0,
                })
                .from(
                    "[data-hero-subtitle]",
                    {
                        y: 20,
                        opacity: 0,
                    },
                    "-=0.7"
                )
                .from(
                    "[data-hero-actions]",
                    {
                        y: 10,
                        opacity: 0,
                    },
                    "-=0.6"
                );
            });
        },
        { scope: containerRef }
    );

    return (
        <section
            ref={containerRef}
            id="hero"
            className="w-full pt-16 pb-16 md:pt-24 md:pb-24 border-b border-neutral-800/60"
        >
            <div className="w-full px-6 md:px-8 flex flex-col items-start gap-8">
                <div className="flex flex-col gap-6 max-w-2xl">
                    <h1
                        data-hero-title
                        className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-neutral-100 leading-[1.15]"
                    >
                        Construo interfaces digitais com rigor visual, código limpo e atenção obsessiva aos detalhes.
                    </h1>
                    <p
                        data-hero-subtitle
                        className="text-base md:text-lg text-neutral-400 leading-relaxed font-normal"
                    >
                        Sou João Vida, engenheiro front-end e designer de produto. Crio experiências digitais
                        autênticas unindo precisão estética, arquitetura moderna e usabilidade
                        intuitiva, sem ruídos desnecessários.
                    </p>
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
        </section>
    );
}
