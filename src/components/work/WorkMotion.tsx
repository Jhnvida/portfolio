"use client";

import { ReactNode, useRef } from "react";
import { gsap, useGSAP } from "../../lib/motion";

interface WorkMotionProps {
    children: ReactNode;
}

export function WorkMotion({ children }: WorkMotionProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!containerRef.current) return;

            const headerFeatured = containerRef.current.querySelector<HTMLElement>("[data-work-header-featured]");
            const featuredItems = containerRef.current.querySelectorAll<HTMLElement>("[data-work-item-featured]");
            const archiveDivider = containerRef.current.querySelector<HTMLElement>("[data-work-divider]");
            const headerArchive = containerRef.current.querySelector<HTMLElement>("[data-work-header-archive]");
            const archiveItems = containerRef.current.querySelectorAll<HTMLElement>("[data-work-item-archive]");

            const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            if (prefersReducedMotion) {
                if (headerFeatured) gsap.set(headerFeatured, { opacity: 1, y: 0, clearProps: "all" });
                if (featuredItems.length) gsap.set(featuredItems, { opacity: 1, y: 0, clearProps: "all" });
                if (archiveDivider) gsap.set(archiveDivider, { opacity: 1, scaleX: 1, clearProps: "all" });
                if (headerArchive) gsap.set(headerArchive, { opacity: 1, y: 0, clearProps: "all" });
                if (archiveItems.length) gsap.set(archiveItems, { opacity: 1, y: 0, clearProps: "all" });
                return;
            }

            const tl = gsap.timeline({
                defaults: {
                    ease: "power3.out",
                },
            });

            if (headerFeatured) {
                gsap.set(headerFeatured, { opacity: 0, y: 10 });
                tl.to(headerFeatured, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    clearProps: "transform,opacity",
                });
            }

            if (featuredItems.length > 0) {
                gsap.set(featuredItems, { opacity: 0, y: 10 });
                tl.to(
                    featuredItems,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.65,
                        stagger: 0.08,
                        clearProps: "transform,opacity",
                    },
                    "-=0.4",
                );
            }

            if (archiveDivider) {
                gsap.set(archiveDivider, { scaleX: 0, transformOrigin: "left center" });
                tl.to(
                    archiveDivider,
                    {
                        scaleX: 1,
                        duration: 0.75,
                        ease: "power2.out",
                        clearProps: "transform",
                    },
                    "-=0.3",
                );
            }

            if (headerArchive) {
                gsap.set(headerArchive, { opacity: 0, y: 10 });
                tl.to(
                    headerArchive,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.55,
                        clearProps: "transform,opacity",
                    },
                    "-=0.45",
                );
            }

            if (archiveItems.length > 0) {
                gsap.set(archiveItems, { opacity: 0, y: 10 });
                tl.to(
                    archiveItems,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        stagger: 0.06,
                        clearProps: "transform,opacity",
                    },
                    "-=0.35",
                );
            }
        },
        { scope: containerRef },
    );

    return (
        <div ref={containerRef} className="col-span-4 sm:col-span-8 lg:col-span-12 flex flex-col">
            {children}
        </div>
    );
}
