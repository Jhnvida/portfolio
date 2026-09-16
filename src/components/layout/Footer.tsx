"use client";

import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FOOTER_LINKS, SOCIAL_LINKS } from "../../data/navigation";
import { Button } from "../ui/Button";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Footer() {
    const ctaRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                if (!ctaRef.current) return;

                gsap.fromTo(
                    ctaRef.current,
                    { scale: 0.9, opacity: 0, y: 50 },
                    {
                        scale: 1,
                        opacity: 1,
                        y: 0,
                        ease: "none",
                        scrollTrigger: {
                            trigger: ctaRef.current,
                            start: "top 95%",
                            end: "center center",
                            scrub: true,
                        },
                    },
                );
            });
        },
        { scope: ctaRef },
    );

    return (
        <footer
            id="contact"
            className="w-full border-t border-white/10 bg-background pt-16 pb-12 md:pt-24 md:pb-16 overflow-hidden flex flex-col relative"
        >
            <div className="w-full max-w-(--container-page) mx-auto px-6 md:px-12 lg:px-24 z-10 flex flex-col relative pt-8 md:pt-12">
                <div
                    ref={ctaRef}
                    className="w-full min-h-[50vh] flex flex-col items-center justify-center text-center py-28 md:py-36 mb-24 md:mb-32 rounded-3xl bg-surface-raised/40 border border-white/5 relative overflow-hidden backdrop-blur-md"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-white/4 via-transparent to-transparent pointer-events-none" />

                    <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-medium tracking-tighter text-white leading-[1.05] max-w-5xl mb-8 relative z-10">
                        Vamos construir algo <br className="hidden md:block" />
                        <span className="text-neutral-500 italic">memorável</span> juntos?
                    </h2>

                    <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mb-12 relative z-10">
                        Se você busca uma engenharia de ponta aliada a uma estética premium, meu inbox está sempre
                        aberto para novos desafios.
                    </p>

                    <Button
                        href="/contact"
                        variant="primary"
                        showArrow
                        className="px-10 py-5 text-base md:text-lg relative z-10 shadow-[0_0_40px_-10px_rgba(255,255,255,0.2)]"
                    >
                        Iniciar projeto
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-12 lg:gap-8">
                    <div className="lg:col-span-5 flex flex-col">
                        <Link
                            href="/"
                            className="font-heading font-bold text-2xl tracking-tight text-white mb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm"
                        >
                            João Vida
                        </Link>

                        <p className="text-neutral-400 text-base md:text-lg max-w-sm leading-relaxed mb-8">
                            Engenharia de software focada em interfaces refinadas. Desenvolvimento full-stack unindo
                            arquitetura robusta e estética premium.
                        </p>

                        <div className="flex flex-wrap items-center gap-4">
                            {SOCIAL_LINKS.map((social) => (
                                <Button
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    variant="dark"
                                    className="px-5 py-2.5 text-sm"
                                >
                                    {social.label}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div className="hidden lg:block lg:col-span-3"></div>

                    <div className="lg:col-span-2 flex flex-col">
                        <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 mb-6">
                            Navegação
                        </h4>

                        <ul className="flex flex-col gap-4">
                            {FOOTER_LINKS.navigation.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-neutral-400 hover:text-white transition-colors text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm px-1"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-2 flex flex-col">
                        <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 mb-6">
                            Contato
                        </h4>

                        <ul className="flex flex-col gap-4">
                            {FOOTER_LINKS.contact.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-neutral-400 hover:text-white transition-colors text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm px-1"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="w-full absolute bottom-0 left-0 pointer-events-none flex justify-center items-end select-none translate-y-1/3">
                <span className="text-[15vw] font-bold text-white/2 tracking-tighter whitespace-nowrap">JOÃO VIDA</span>
            </div>
        </footer>
    );
}
