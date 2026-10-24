"use client";

import { SITE_CONFIG } from "@/data";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

export function Footer() {
    const textRef = useRef<HTMLSpanElement>(null);
    const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const email = SITE_CONFIG.email;
    const initialText = SITE_CONFIG.emailDisplay;
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
                duration: 0.16,
                ease: "power2.in",
                onComplete: () => {
                    setDisplayText(nextText);
                    onTransition?.();
                    if (!textRef.current) return;
                    gsap.fromTo(
                        textRef.current,
                        { y: 6 },
                        {
                            y: 0,
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

        resetTimeoutRef.current = setTimeout(() => {
            animateTextChange(initialText, () => setIsCopied(false));
        }, 3200);
    };

    useEffect(() => {
        const textEl = textRef.current;
        return () => {
            if (resetTimeoutRef.current) {
                clearTimeout(resetTimeoutRef.current);
            }
            if (textEl) {
                gsap.killTweensOf(textEl);
            }
        };
    }, []);

    const isHighlightActive = isHovered || isCopied;

    return (
        <footer
            id="contato"
            aria-label="Contato e encerramento"
            className="relative z-35 w-full bg-[#fafafa] px-6 md:px-10 lg:px-12 xl:px-16 pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-24 border-t border-neutral-200/70 scroll-mt-20"
        >
            <div className="w-full flex flex-col justify-between min-h-[35vh]">
                <div className="text-left max-w-4xl">
                    <p className="font-sans text-xs uppercase tracking-widest font-semibold text-neutral-500 mb-4 sm:mb-6">
                        Vamos conversar sobre o seu projeto?
                    </p>

                    <button
                        type="button"
                        onClick={handleClickEmail}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onFocus={() => setIsHovered(true)}
                        onBlur={() => setIsHovered(false)}
                        onTouchStart={() => setIsHovered(true)}
                        data-cursor="copy"
                        data-cursor-text="Copiar e-mail"
                        className={`text-left font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight transition-colors duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-4 rounded-sm cursor-pointer p-0 select-text ${
                            isHighlightActive ? "text-neutral-950" : "text-neutral-800 hover:text-neutral-950"
                        }`}
                        aria-label={`Copiar e-mail de ${SITE_CONFIG.shortName} para contato: ${email}`}
                    >
                        <span ref={textRef} className="inline-block will-change-transform">
                            {displayText}
                        </span>
                    </button>
                </div>

                <nav
                    aria-label="Links de redes sociais e contato"
                    className="mt-16 sm:mt-24 flex flex-wrap items-center gap-6 sm:gap-8 text-xs sm:text-[13px] font-sans font-medium text-neutral-600"
                >
                    <a
                        href={SITE_CONFIG.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="external"
                        data-cursor-text="LinkedIn"
                        className="transition-colors duration-200 ease-out hover:text-neutral-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-1 rounded-sm"
                    >
                        LinkedIn
                    </a>

                    <a
                        href={SITE_CONFIG.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="external"
                        data-cursor-text="GitHub"
                        className="transition-colors duration-200 ease-out hover:text-neutral-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-1 rounded-sm"
                    >
                        GitHub
                    </a>

                    <a
                        href={`mailto:${email}`}
                        data-cursor="external"
                        data-cursor-text="Enviar e-mail"
                        className="transition-colors duration-200 ease-out hover:text-neutral-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-1 rounded-sm"
                    >
                        E-mail
                    </a>
                </nav>
            </div>
        </footer>
    );
}
