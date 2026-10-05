"use client";

import { ReactNode, useRef } from "react";
import { gsap, useGSAP } from "../../lib/motion";

interface HomeHeroMotionProps {
    children: ReactNode;
}

export function HomeHeroMotion({ children }: HomeHeroMotionProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!containerRef.current) return;

            const parts = containerRef.current.querySelectorAll<HTMLElement>("[data-hero-part]");
            if (parts.length === 0) return;

            const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            if (prefersReducedMotion) {
                gsap.set(parts, { opacity: 1, y: 0, clearProps: "all" });
                return;
            }

            gsap.set(parts, { opacity: 0, y: 14 });

            const tl = gsap.timeline({
                defaults: {
                    ease: "power3.out",
                    duration: 0.85,
                },
            });

            tl.to(parts, {
                opacity: 1,
                y: 0,
                stagger: 0.12,
                clearProps: "transform,opacity",
            });
        },
        { scope: containerRef },
    );

    return (
        <div ref={containerRef} className="col-span-4 sm:col-span-8 lg:col-span-12 flex flex-col gap-8">
            {children}
        </div>
    );
}
