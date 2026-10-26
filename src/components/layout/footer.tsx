"use client";

import { useSmoothScroll } from "@/components/providers/smooth-scroll-provider";
import { SITE_CONFIG } from "@/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

export function Footer() {
    const pathname = usePathname();
    const { scrollTo, lenis } = useSmoothScroll();
    const footerRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const emailTextRef = useRef<HTMLSpanElement>(null);
    const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const email = SITE_CONFIG.email;
    const initialText = "E-mail";
    const confirmedText = "Te vejo em breve";

    const [displayText, setDisplayText] = useState(initialText);
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

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
                    opacity: 0,
                    y: -24,
                },
                {
                    opacity: 1,
                    y: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: mainEl,
                        start: "bottom bottom",
                        end: () => `+=${footerEl.offsetHeight}`,
                        scrub: true,
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

    const animateTextChange = (nextText: string, onTransition?: () => void) => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (emailTextRef.current && !prefersReducedMotion) {
            gsap.killTweensOf(emailTextRef.current);
            gsap.to(emailTextRef.current, {
                y: -6,
                opacity: 0,
                duration: 0.16,
                ease: "power2.in",
                onComplete: () => {
                    setDisplayText(nextText);
                    onTransition?.();
                    if (!emailTextRef.current) return;
                    gsap.fromTo(
                        emailTextRef.current,
                        { y: 6, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.28,
                            ease: "power3.out",
                            clearProps: "transform,opacity",
                        },
                    );
                },
            });
        } else {
            setDisplayText(nextText);
            onTransition?.();
        }
    };

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

        if (!isCopied) {
            setIsCopied(true);
            animateTextChange(confirmedText);
        }

        resetTimeoutRef.current = setTimeout(() => {
            animateTextChange(initialText, () => setIsCopied(false));
        }, 3200);
    };

    const handleBackToTop = (e: React.MouseEvent) => {
        e.preventDefault();
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (lenis) {
            lenis.scrollTo(0, { duration: prefersReducedMotion ? 0 : 1.15 });
        } else {
            scrollTo(0);
            window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
        }
    };

    const handleScrollToSection = (e: React.MouseEvent, targetId: string) => {
        if (pathname === "/") {
            e.preventDefault();
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                if (lenis) {
                    lenis.scrollTo(targetEl, { duration: 1.15 });
                } else {
                    targetEl.scrollIntoView({ behavior: "smooth" });
                }
            }
        }
    };

    const handleScrollToContact = (e: React.MouseEvent) => {
        e.preventDefault();
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const targetEl = document.getElementById("contato-info") || footerRef.current;

        if (lenis) {
            lenis.scrollTo("bottom", { duration: prefersReducedMotion ? 0 : 1.15 });
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
        const textEl = emailTextRef.current;
        return () => {
            if (resetTimeoutRef.current) {
                clearTimeout(resetTimeoutRef.current);
            }
            if (textEl) {
                gsap.killTweensOf(textEl);
            }
        };
    }, []);

    const linkClass =
        "text-neutral-600 hover:text-neutral-950 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-subtle rounded-xs select-none";

    return (
        <footer
            ref={footerRef}
            id="contato"
            aria-label="Contato e encerramento"
            className="sticky bottom-0 z-0 w-full bg-surface-subtle text-neutral-950 pt-20 sm:pt-28 md:pt-36 lg:pt-44 xl:pt-48 pb-16 sm:pb-24 md:pb-32 lg:pb-36 xl:pb-40 border-t border-neutral-200/80 scroll-mt-20 overflow-hidden"
        >
            <div
                ref={contentRef}
                className="max-w-360 mx-auto w-full px-6 md:px-10 lg:px-12 xl:px-16 will-change-[opacity,transform]"
            >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 justify-between">
                    <div className="md:col-span-7 space-y-1">
                        <p className="font-sans text-xs sm:text-[13px] md:text-sm text-neutral-500">
                            Baseado em {SITE_CONFIG.location}.
                        </p>
                        <p className="font-sans text-xs sm:text-[13px] md:text-sm font-medium text-neutral-950">
                            Disponível para novos projetos.
                        </p>
                    </div>

                    <div className="md:col-span-5 grid grid-cols-2 gap-8 sm:gap-12">
                        <nav
                            aria-label="Navegação do rodapé"
                            className="flex flex-col space-y-2.5 sm:space-y-3 font-sans text-xs sm:text-[13px]"
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
                            id="contato-info"
                            aria-label="Redes sociais e contato direto"
                            className="flex flex-col space-y-2.5 sm:space-y-3 font-sans text-xs sm:text-[13px] scroll-mt-6 focus:outline-none"
                            tabIndex={-1}
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

                            <button
                                type="button"
                                onClick={handleClickEmail}
                                aria-label={`Copiar e-mail: ${email}`}
                                className={`text-left ${linkClass} ${
                                    isCopied ? "text-emerald-600 hover:text-emerald-700 font-medium" : ""
                                }`}
                            >
                                <span ref={emailTextRef} className="inline-block will-change-transform">
                                    {displayText}
                                </span>
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </footer>
    );
}
