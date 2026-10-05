"use client";

import { ReactNode, useRef } from "react";
import { gsap, useGSAP } from "../../lib/motion";

interface AboutMotionProps {
    children: ReactNode;
}

export function AboutMotion({ children }: AboutMotionProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!containerRef.current) return;

            const profileCard = containerRef.current.querySelector<HTMLElement>("[data-about-card]");
            const bioText = containerRef.current.querySelector<HTMLElement>("[data-about-bio]");
            const sections = containerRef.current.querySelectorAll<HTMLElement>("[data-about-section]");

            const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            if (prefersReducedMotion) {
                if (profileCard) gsap.set(profileCard, { opacity: 1, y: 0, clearProps: "all" });
                if (bioText) gsap.set(bioText, { opacity: 1, y: 0, clearProps: "all" });
                if (sections.length) gsap.set(sections, { opacity: 1, y: 0, clearProps: "all" });
                return;
            }

            if (profileCard) {
                gsap.set(profileCard, { opacity: 0, y: 10 });
                gsap.to(profileCard, {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    ease: "power3.out",
                    clearProps: "transform,opacity",
                });
            }

            if (bioText) {
                gsap.set(bioText, { opacity: 0, y: 10 });
                gsap.to(bioText, {
                    opacity: 1,
                    y: 0,
                    duration: 0.75,
                    delay: 0.1,
                    ease: "power3.out",
                    clearProps: "transform,opacity",
                });
            }

            sections.forEach((section) => {
                gsap.set(section, { opacity: 0, y: 12 });
                gsap.to(section, {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 88%",
                        once: true,
                    },
                    clearProps: "transform,opacity",
                });
            });
        },
        { scope: containerRef },
    );

    return (
        <div ref={containerRef} className="w-full">
            {children}
        </div>
    );
}
