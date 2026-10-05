"use client";

import { ReactNode, useRef } from "react";
import { gsap, useGSAP } from "../../lib/motion";

interface HomeSectionMotionProps {
    children: ReactNode;
    className?: string;
}

export function HomeSectionMotion({ children, className }: HomeSectionMotionProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!containerRef.current) return;

            const header = containerRef.current.querySelector<HTMLElement>(
                "[data-home-section-header], [data-home-work-header]",
            );
            const items = containerRef.current.querySelectorAll<HTMLElement>(
                "[data-home-section-item], [data-home-work-item]",
            );
            const footer = containerRef.current.querySelector<HTMLElement>(
                "[data-home-section-footer], [data-home-work-footer]",
            );

            const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            if (prefersReducedMotion) {
                if (header) gsap.set(header, { opacity: 1, y: 0, clearProps: "all" });
                if (items.length) gsap.set(items, { opacity: 1, y: 0, clearProps: "all" });
                if (footer) gsap.set(footer, { opacity: 1, y: 0, clearProps: "all" });
                return;
            }

            const elementsToAnimate: HTMLElement[] = [];
            if (header) elementsToAnimate.push(header);
            items.forEach((item) => elementsToAnimate.push(item));
            if (footer) elementsToAnimate.push(footer);

            gsap.set(elementsToAnimate, { opacity: 0, y: 12 });

            gsap.to(elementsToAnimate, {
                opacity: 1,
                y: 0,
                duration: 0.7,
                stagger: 0.08,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%",
                    once: true,
                },
                clearProps: "transform,opacity",
            });
        },
        { scope: containerRef },
    );

    return (
        <div ref={containerRef} className={className || "col-span-4 sm:col-span-8 lg:col-span-12 flex flex-col"}>
            {children}
        </div>
    );
}

export { HomeSectionMotion as HomeWorkMotion };
