"use client";

import { ReactNode, useRef } from "react";
import { gsap, useGSAP } from "../../lib/motion";

interface CaseEditorialMotionProps {
    children: ReactNode;
}

export function CaseEditorialMotion({ children }: CaseEditorialMotionProps) {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            if (!sectionRef.current) return;

            const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            if (prefersReducedMotion) {
                gsap.set(sectionRef.current, { opacity: 1, y: 0, clearProps: "all" });
                return;
            }

            gsap.set(sectionRef.current, { opacity: 0, y: 14 });

            gsap.to(sectionRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.75,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                    once: true,
                },
                clearProps: "transform,opacity",
            });
        },
        { scope: sectionRef },
    );

    return (
        <section ref={sectionRef} className="w-full py-10 sm:py-14">
            {children}
        </section>
    );
}
