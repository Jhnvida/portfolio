"use client";

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
                { y: 20 },
                {
                    y: 0,
                    duration: 0.75,
                    ease: "power3.out",
                    clearProps: "transform",
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
