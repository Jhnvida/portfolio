"use client";

import { ReactNode, useRef } from "react";
import { gsap, useGSAP } from "../../lib/motion";

interface CaseHeroMotionProps {
    children: ReactNode;
}

export function CaseHeroMotion({ children }: CaseHeroMotionProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!containerRef.current) return;

            const backBtn = containerRef.current.querySelector<HTMLElement>("[data-case-back]");
            const metaBadge = containerRef.current.querySelector<HTMLElement>("[data-case-meta]");
            const title = containerRef.current.querySelector<HTMLElement>("[data-case-title]");
            const summary = containerRef.current.querySelector<HTMLElement>("[data-case-summary]");
            const rows = containerRef.current.querySelector<HTMLElement>("[data-case-rows]");
            const action = containerRef.current.querySelector<HTMLElement>("[data-case-action]");

            const parts = [backBtn, metaBadge, title, summary, rows, action].filter(
                (el): el is HTMLElement => el !== null,
            );

            if (parts.length === 0) return;

            const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            if (prefersReducedMotion) {
                gsap.set(parts, { opacity: 1, y: 0, clearProps: "all" });
                return;
            }

            gsap.set(parts, { opacity: 0, y: 12 });

            const tl = gsap.timeline({
                defaults: {
                    ease: "power3.out",
                    duration: 0.7,
                },
            });

            tl.to(parts, {
                opacity: 1,
                y: 0,
                stagger: 0.09,
                clearProps: "transform,opacity",
            });
        },
        { scope: containerRef },
    );

    return (
        <div ref={containerRef} className="col-span-4 sm:col-span-8 lg:col-span-12 flex flex-col">
            {children}
        </div>
    );
}
