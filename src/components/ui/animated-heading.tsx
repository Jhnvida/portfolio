"use client";

import { MOTION } from "@/lib/motion";
import gsap from "gsap";
import React, { useEffect, useRef } from "react";

interface AnimatedHeadingProps {
    children: React.ReactNode;
    className?: string;
    as?: "h1" | "h2" | "h3" | "h4";
}

export function AnimatedHeading({ children, className = "", as: Component = "h1" }: AnimatedHeadingProps) {
    const headingRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            if (prefersReducedMotion || !headingRef.current) return;

            gsap.fromTo(
                headingRef.current,
                { opacity: 0, y: MOTION.distance.content },
                {
                    opacity: 1,
                    y: 0,
                    duration: MOTION.duration.content,
                    ease: MOTION.ease.entrance,
                    clearProps: "transform,opacity",
                },
            );
        }, headingRef);

        return () => ctx.revert();
    }, []);

    return (
        <Component ref={headingRef} className={className}>
            {children}
        </Component>
    );
}
