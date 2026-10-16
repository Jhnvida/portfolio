"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

export function Footer() {
    const footerRef = useRef<HTMLElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const email = "joao.vida.andre@gmail.com";
    const initialText = "joao.vida.andre (at) gmail.com";
    const confirmedText = "Te vejo em breve";

    const [displayText, setDisplayText] = useState(initialText);
    const [isCopied, setIsCopied] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const animateTextChange = (nextText: string, onTransition?: () => void) => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (textRef.current && !prefersReducedMotion) {
            gsap.killTweensOf(textRef.current);
            gsap.to(textRef.current, {
                y: -6,
                opacity: 0,
                duration: 0.16,
                ease: "power2.in",
                onComplete: () => {
                    setDisplayText(nextText);
                    onTransition?.();
                    if (!textRef.current) return;
                    gsap.fromTo(
                        textRef.current,
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

    const handleClickEmail = async (e: React.MouseEvent) => {
        e.preventDefault();

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

        window.dispatchEvent(
            new CustomEvent("cursor-state-change", {
                detail: { mode: "copy", text: "Copiado!" },
            }),
        );

        resetTimeoutRef.current = setTimeout(() => {
            window.dispatchEvent(
                new CustomEvent("cursor-state-change", {
                    detail: { text: "Clique para copiar" },
                }),
            );

            animateTextChange(initialText, () => setIsCopied(false));
        }, 3200);
    };

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const getResponsiveMetrics = () => {
            const width = typeof window !== "undefined" ? window.innerWidth : 1200;
            let targetPadding = 32;
            let targetRadius = 36;

            if (width < 640) {
                targetPadding = 12;
                targetRadius = 24;
            } else if (width < 1024) {
                targetPadding = 24;
                targetRadius = 32;
            } else {
                targetPadding = Math.max(32, (width - 1420) / 2);
                targetRadius = 40;
            }

            return { targetPadding, targetRadius };
        };

        const ctx = gsap.context(() => {
            const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            if (!footerRef.current || !cardRef.current) return;

            if (prefersReducedMotion) {
                const { targetPadding, targetRadius } = getResponsiveMetrics();
                gsap.set(footerRef.current, {
                    paddingLeft: targetPadding,
                    paddingRight: targetPadding,
                });
                gsap.set(cardRef.current, {
                    borderTopLeftRadius: targetRadius,
                    borderTopRightRadius: targetRadius,
                });
                return;
            }

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top bottom",
                    end: "bottom bottom",
                    scrub: true,
                    invalidateOnRefresh: true,
                },
            });

            tl.fromTo(
                footerRef.current,
                {
                    paddingLeft: 0,
                    paddingRight: 0,
                },
                {
                    paddingLeft: () => getResponsiveMetrics().targetPadding,
                    paddingRight: () => getResponsiveMetrics().targetPadding,
                    ease: "none",
                },
                0,
            ).fromTo(
                cardRef.current,
                {
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                },
                {
                    borderTopLeftRadius: () => getResponsiveMetrics().targetRadius,
                    borderTopRightRadius: () => getResponsiveMetrics().targetRadius,
                    ease: "none",
                },
                0,
            );
        }, footerRef);

        const textEl = textRef.current;

        return () => {
            if (resetTimeoutRef.current) {
                clearTimeout(resetTimeoutRef.current);
            }
            if (textEl) {
                gsap.killTweensOf(textEl);
            }
            ctx.revert();
        };
    }, []);

    const isHighlightActive = isHovered || isCopied;

    return (
        <footer
            id="contato"
            ref={footerRef}
            className="relative z-10 flex min-h-[60vh] md:min-h-[65vh] w-full flex-col justify-end bg-white scroll-mt-10 overflow-hidden"
        >
            <div
                ref={cardRef}
                className="mx-auto flex min-h-[60vh] md:min-h-[65vh] w-full flex-col items-center justify-between bg-surface-subtle px-6 py-10 sm:py-12 md:py-14 text-center overflow-hidden"
            >
                <div aria-hidden="true" className="w-full" />

                <div className="my-auto flex flex-col items-center justify-center">
                    <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-normal tracking-tight text-neutral-600">
                        Vamos conversar sobre o seu projeto?
                    </h2>

                    <div className="mt-3 sm:mt-4 flex flex-col items-center w-fit mx-auto">
                        <button
                            type="button"
                            onClick={handleClickEmail}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            onFocus={() => setIsHovered(true)}
                            onBlur={() => setIsHovered(false)}
                            onTouchStart={() => setIsHovered(true)}
                            data-cursor="copy"
                            data-cursor-text={isCopied ? "Copiado!" : "Copiar e-mail"}
                            className={`group font-heading text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight transition-colors duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 rounded-lg px-2.5 py-1 wrap-break-word sm:break-normal inline-flex items-center justify-center w-fit cursor-pointer ${
                                isHighlightActive ? "text-neutral-950" : "text-neutral-700 hover:text-neutral-950"
                            }`}
                            aria-label={`Copiar e-mail de João André para contato: ${email}`}
                        >
                            <span ref={textRef} className="inline-block will-change-transform">
                                {displayText}
                            </span>
                        </button>
                    </div>
                </div>

                <nav
                    aria-label="Links sociais e contato"
                    className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 md:gap-12 text-xs sm:text-[13px] font-sans font-medium text-neutral-600"
                >
                    <a
                        href="https://www.linkedin.com/in/jaoandre"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 sm:py-1 px-1 transition-colors duration-200 ease-out hover:text-neutral-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-1 focus-visible:rounded-sm"
                    >
                        LinkedIn
                    </a>

                    <a
                        href="https://github.com/Jhnvida"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 sm:py-1 px-1 transition-colors duration-200 ease-out hover:text-neutral-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-1 focus-visible:rounded-sm"
                    >
                        GitHub
                    </a>

                    <a
                        href={`mailto:${email}`}
                        className="py-2.5 sm:py-1 px-1 transition-colors duration-200 ease-out hover:text-neutral-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-1 focus-visible:rounded-sm"
                    >
                        E-mail
                    </a>
                </nav>
            </div>
        </footer>
    );
}
