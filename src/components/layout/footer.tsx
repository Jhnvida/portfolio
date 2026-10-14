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
            gsap.to(textRef.current, {
                y: -6,
                opacity: 0,
                duration: 0.18,
                ease: "power2.in",
                onComplete: () => {
                    setDisplayText(nextText);
                    onTransition?.();
                    gsap.fromTo(
                        textRef.current,
                        { y: 6, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.28,
                            ease: "power3.out",
                            clearProps: "transform",
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

        const ctx = gsap.context(() => {
            const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            if (prefersReducedMotion || !cardRef.current) return;

            gsap.fromTo(
                cardRef.current,
                { y: 32, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.85,
                    ease: "power3.out",
                    clearProps: "transform",
                    scrollTrigger: {
                        trigger: cardRef.current,
                        start: "top 90%",
                        once: true,
                    },
                },
            );
        }, footerRef);

        return () => {
            if (resetTimeoutRef.current) {
                clearTimeout(resetTimeoutRef.current);
            }
            ctx.revert();
        };
    }, []);

    const isHighlightActive = isHovered || isCopied;

    return (
        <footer
            id="contato"
            ref={footerRef}
            className="relative z-10 w-full bg-white px-4 sm:px-6 md:px-10 pb-8 sm:pb-12 md:pb-16 pt-8 sm:pt-12 scroll-mt-10 min-h-[85svh] md:min-h-[90svh] flex flex-col justify-center shadow-[0_-20px_50px_rgba(0,0,0,0.02)]"
        >
            <div
                ref={cardRef}
                className="mx-auto flex min-h-110 sm:min-h-125 md:min-h-140 w-full max-w-355 flex-col items-center justify-between rounded-2xl sm:rounded-3xl md:rounded-4xl bg-[#F9F9F9] px-6 py-16 sm:py-24 md:py-28 text-center transition-all duration-300"
            >
                <div aria-hidden="true" className="w-full" />

                <div className="my-auto flex flex-col items-center justify-center">
                    <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-neutral-900">
                        Vamos trabalhar juntos
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
                            data-cursor-text={isCopied ? "Copiado!" : "Clique para copiar"}
                            className={`group font-heading text-2xl sm:text-3xl md:text-4xl font-normal sm:font-medium tracking-tight transition-colors duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/30 rounded-lg px-2 py-0.5 wrap-break-word sm:break-normal inline-flex items-center justify-center w-fit cursor-pointer ${
                                isHighlightActive ? "text-neutral-950" : "text-neutral-400"
                            }`}
                            aria-label={`Copiar endereço de e-mail ${email}`}
                        >
                            <span ref={textRef} className="inline-block will-change-transform">
                                {displayText}
                            </span>
                        </button>
                    </div>
                </div>

                <nav
                    aria-label="Links sociais e contato"
                    className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-14 text-xs sm:text-[13px] font-sans text-neutral-400"
                >
                    <a
                        href="https://www.linkedin.com/in/jaoandre"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors duration-200 ease-out hover:text-neutral-900 focus:outline-none focus-visible:underline"
                    >
                        LinkedIn
                    </a>

                    <a
                        href="https://github.com/Jhnvida"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors duration-200 ease-out hover:text-neutral-900 focus:outline-none focus-visible:underline"
                    >
                        GitHub
                    </a>

                    <a
                        href={`mailto:${email}`}
                        className="transition-colors duration-200 ease-out hover:text-neutral-900 focus:outline-none focus-visible:underline"
                    >
                        E-mail
                    </a>
                </nav>
            </div>
        </footer>
    );
}
