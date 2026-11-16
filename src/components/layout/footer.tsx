"use client";

import { useSmoothScroll } from "@/components/providers/smooth-scroll-provider";
import { SITE_CONFIG } from "@/data";
import { MOTION } from "@/lib/motion";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, CustomEase);
    try {
        CustomEase.create("tickerEase", "0.16, 1, 0.3, 1");
    } catch {}
}

export function Footer() {
    const pathname = usePathname();
    const { scrollTo, lenis } = useSmoothScroll();
    const footerRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const slot1Ref = useRef<HTMLSpanElement>(null);
    const slot2Ref = useRef<HTMLSpanElement>(null);
    const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const email = SITE_CONFIG.email;
    const confirmedText = "Te vejo em breve";

    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger, CustomEase);

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) {
            if (contentRef.current) {
                gsap.set(contentRef.current, { opacity: 1, y: 0 });
            }
            return;
        }

        const footerEl = footerRef.current;
        const contentEl = contentRef.current;
        const mainEl = document.getElementById("main-content");

        if (!footerEl || !contentEl || !mainEl) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                contentEl,
                {
                    opacity: 0.2,
                    y: -10,
                },
                {
                    opacity: 1,
                    y: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: mainEl,
                        start: "bottom bottom",
                        end: () => `+=${footerEl.offsetHeight}`,
                        scrub: 0.25,
                        invalidateOnRefresh: true,
                    },
                },
            );
        });

        const resizeObserver = new ResizeObserver(() => {
            ScrollTrigger.refresh();
        });

        resizeObserver.observe(footerEl);

        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 120);

        return () => {
            clearTimeout(timer);
            resizeObserver.disconnect();
            ctx.revert();
        };
    }, []);

    const handleClickEmail = async (e?: React.MouseEvent) => {
        if (e) e.preventDefault();

        try {
            await navigator.clipboard.writeText(email);
        } catch {
            const input = document.createElement("input");
            input.value = email;
            document.body.appendChild(input);
            input.select();
            document.execCommand("copy");
            document.body.removeChild(input);
        }

        if (resetTimeoutRef.current) {
            clearTimeout(resetTimeoutRef.current);
        }

        if (typeof window !== "undefined") {
            window.dispatchEvent(
                new CustomEvent("cursor:set", {
                    detail: { mode: "copy", text: "Copiado!" },
                }),
            );
        }

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (!isCopied) {
            setIsCopied(true);

            if (slot1Ref.current && slot2Ref.current && !prefersReducedMotion) {
                gsap.killTweensOf([slot1Ref.current, slot2Ref.current]);

                const tl = gsap.timeline();
                tl.to(
                    slot1Ref.current,
                    {
                        yPercent: -100,
                        opacity: 0,
                        duration: 0.45,
                        ease: "tickerEase",
                    },
                    0,
                );
                tl.fromTo(
                    slot2Ref.current,
                    {
                        yPercent: 100,
                        opacity: 0,
                    },
                    {
                        yPercent: 0,
                        opacity: 1,
                        duration: 0.45,
                        ease: "tickerEase",
                    },
                    0,
                );
            } else if (slot1Ref.current && slot2Ref.current) {
                gsap.set(slot1Ref.current, { yPercent: -100, opacity: 0 });
                gsap.set(slot2Ref.current, { yPercent: 0, opacity: 1 });
            }
        }

        resetTimeoutRef.current = setTimeout(() => {
            setIsCopied(false);

            if (typeof window !== "undefined") {
                window.dispatchEvent(
                    new CustomEvent("cursor:set", {
                        detail: { mode: "copy", text: "Copiar e-mail" },
                    }),
                );
            }

            if (slot1Ref.current && slot2Ref.current && !prefersReducedMotion) {
                gsap.killTweensOf([slot1Ref.current, slot2Ref.current]);

                const tl = gsap.timeline();
                tl.to(
                    slot2Ref.current,
                    {
                        yPercent: -100,
                        opacity: 0,
                        duration: 0.45,
                        ease: "tickerEase",
                    },
                    0,
                );
                tl.fromTo(
                    slot1Ref.current,
                    {
                        yPercent: 100,
                        opacity: 0,
                    },
                    {
                        yPercent: 0,
                        opacity: 1,
                        duration: 0.45,
                        ease: "tickerEase",
                    },
                    0,
                );
            } else if (slot1Ref.current && slot2Ref.current) {
                gsap.set(slot1Ref.current, { yPercent: 0, opacity: 1 });
                gsap.set(slot2Ref.current, { yPercent: 100, opacity: 0 });
            }
        }, 3200);
    };

    const handleBackToTop = (e: React.MouseEvent) => {
        e.preventDefault();
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (lenis) {
            lenis.scrollTo(0, { duration: prefersReducedMotion ? 0 : MOTION.duration.scroll });
        } else {
            scrollTo(0);
            window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
        }
    };

    const handleScrollToSection = (e: React.MouseEvent, targetId: string) => {
        if (pathname === "/") {
            e.preventDefault();
            const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                if (lenis) {
                    lenis.scrollTo(targetEl, { duration: prefersReducedMotion ? 0 : MOTION.duration.scroll });
                } else {
                    targetEl.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
                }
            }
        }
    };

    const handleScrollToContact = (e: React.MouseEvent) => {
        e.preventDefault();
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const targetEl = document.getElementById("contato-info") || footerRef.current;

        if (lenis) {
            lenis.scrollTo("bottom", { duration: prefersReducedMotion ? 0 : MOTION.duration.scroll });
        } else if (targetEl) {
            targetEl.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
        } else {
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: prefersReducedMotion ? "auto" : "smooth",
            });
        }
    };

    useEffect(() => {
        if (slot2Ref.current) {
            gsap.set(slot2Ref.current, { yPercent: 100, opacity: 0 });
        }

        const s1 = slot1Ref.current;
        const s2 = slot2Ref.current;

        return () => {
            if (resetTimeoutRef.current) {
                clearTimeout(resetTimeoutRef.current);
            }
            if (s1) gsap.killTweensOf(s1);
            if (s2) gsap.killTweensOf(s2);
        };
    }, []);

    const linkClass =
        "text-neutral-600 hover:text-neutral-950 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-subtle rounded-xs select-none";

    return (
        <footer
            ref={footerRef}
            id="contato"
            aria-label="Contato e encerramento"
            className="sticky bottom-0 z-0 w-full bg-surface-subtle text-neutral-950 pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-16 sm:pb-20 md:pb-24 lg:pb-28 border-t border-neutral-200/80 scroll-mt-20 overflow-hidden"
        >
            <div
                ref={contentRef}
                className="max-w-360 mx-auto w-full px-6 md:px-10 lg:px-12 xl:px-16 will-change-[opacity,transform] space-y-12 sm:space-y-16 md:space-y-20"
            >
                {/* Elemento de E-mail em Evidência com Rolling Ticker */}
                <div id="contato-info" className="scroll-mt-12 focus:outline-none" tabIndex={-1}>
                    <button
                        type="button"
                        onClick={handleClickEmail}
                        data-cursor="copy"
                        data-cursor-text={isCopied ? "Copiado!" : "Copiar e-mail"}
                        title="Copiar e-mail"
                        aria-label={`Copiar e-mail: ${email}`}
                        className="group relative block text-left font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-neutral-950 transition-colors duration-200 hover:text-neutral-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-4 rounded-xs select-none"
                    >
                        {/* Container com altura delimitada e overflow hidden para o efeito slot machine */}
                        <span className="relative block overflow-hidden leading-[1.12] sm:leading-[1.1] py-1">
                            {/* Slot 1: E-mail */}
                            <span
                                ref={slot1Ref}
                                className="block will-change-[transform,opacity] break-all sm:break-normal"
                            >
                                {email}
                            </span>

                            {/* Slot 2: Confirmação ("Te vejo em breve") */}
                            <span
                                ref={slot2Ref}
                                aria-hidden={!isCopied}
                                className="absolute inset-0 block will-change-[transform,opacity] select-none pointer-events-none opacity-0"
                            >
                                {confirmedText}
                            </span>
                        </span>
                    </button>
                </div>

                {/* Grade de Links e Informações */}
                <div className="pt-8 sm:pt-10 border-t border-neutral-200/80 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 justify-between">
                    <div className="md:col-span-7 space-y-1">
                        <p className="font-sans text-xs sm:text-sm text-neutral-600">
                            Baseado em {SITE_CONFIG.location}.
                        </p>
                        <p className="font-sans text-xs sm:text-sm font-medium text-neutral-950">
                            Disponível para novos projetos.
                        </p>
                    </div>

                    <div className="md:col-span-5 grid grid-cols-2 gap-8 sm:gap-12">
                        <nav
                            aria-label="Navegação do rodapé"
                            className="flex flex-col space-y-2.5 sm:space-y-3 font-sans text-xs sm:text-sm"
                        >
                            <Link href="/" prefetch={true} onClick={handleBackToTop} className={linkClass}>
                                Início
                            </Link>

                            <Link
                                href="/#projetos"
                                prefetch={true}
                                onClick={(e) => handleScrollToSection(e, "projetos")}
                                className={linkClass}
                            >
                                Projetos
                            </Link>

                            <Link
                                href="/#sobre"
                                prefetch={true}
                                onClick={(e) => handleScrollToSection(e, "sobre")}
                                className={linkClass}
                            >
                                Sobre
                            </Link>

                            <Link href="#contato-info" onClick={handleScrollToContact} className={linkClass}>
                                Contato
                            </Link>

                            <button type="button" onClick={handleBackToTop} className={`text-left ${linkClass}`}>
                                Voltar ao topo
                            </button>
                        </nav>

                        <nav
                            aria-label="Redes sociais"
                            className="flex flex-col space-y-2.5 sm:space-y-3 font-sans text-xs sm:text-sm"
                        >
                            <a
                                href={SITE_CONFIG.social.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={linkClass}
                            >
                                LinkedIn
                            </a>

                            <a
                                href={SITE_CONFIG.social.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={linkClass}
                            >
                                GitHub
                            </a>
                        </nav>
                    </div>
                </div>
            </div>
        </footer>
    );
}
