"use client";

import { ReactNode, useRef } from "react";
import { gsap, useGSAP } from "../../lib/motion";

interface CaseImageRevealProps {
    children: ReactNode;
    className?: string;
}

export function CaseImageReveal({ children, className }: CaseImageRevealProps) {
    const frameRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!frameRef.current) return;

            const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            if (prefersReducedMotion) {
                gsap.set(frameRef.current, {
                    clipPath: "inset(0% 0% 0% 0%)",
                    opacity: 1,
                    clearProps: "all",
                });
                return;
            }

            gsap.set(frameRef.current, {
                clipPath: "inset(0% 0% 100% 0%)",
                opacity: 0.85,
            });

            gsap.to(frameRef.current, {
                clipPath: "inset(0% 0% 0% 0%)",
                opacity: 1,
                duration: 1.05,
                ease: "power3.inOut",
                scrollTrigger: {
                    trigger: frameRef.current,
                    start: "top 85%",
                    once: true,
                },
                clearProps: "clipPath,opacity",
            });
        },
        { scope: frameRef },
    );

    return (
        <div ref={frameRef} className={className}>
            {children}
        </div>
    );
}
