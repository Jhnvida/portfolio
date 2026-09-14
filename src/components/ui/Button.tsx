"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { cn } from "../../lib/utils";

type ButtonProps = {
    href?: string;
    as?: "button" | "a";
    children: React.ReactNode;
    className?: string;
    showArrow?: boolean;
    variant?: "primary" | "dark";
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
    React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
    ({ href, as, children, className, showArrow = true, variant = "primary", ...props }, ref) => {
        const buttonRef = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);
        const flairRef = useRef<HTMLSpanElement>(null);

        useEffect(() => {
            const btn = buttonRef.current;
            const flair = flairRef.current;
            if (!btn || !flair) return;

            const handleMouseEnter = (e: MouseEvent) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                flair.style.left = `${x}px`;
                flair.style.top = `${y}px`;
                flair.style.transition = "none";
                flair.style.transform = "translate(-50%, -50%) scale(0)";

                flair.getBoundingClientRect();

                flair.style.transition = "transform 0.6s cubic-bezier(0.19, 1, 0.22, 1)";
                flair.style.transform = "translate(-50%, -50%) scale(2.5)";
            };

            const handleMouseLeave = (e: MouseEvent) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                flair.style.left = `${x}px`;
                flair.style.top = `${y}px`;
                flair.style.transform = "translate(-50%, -50%) scale(0)";
            };

            btn.addEventListener("mouseenter", handleMouseEnter as EventListener);
            btn.addEventListener("mouseleave", handleMouseLeave as EventListener);

            return () => {
                btn.removeEventListener("mouseenter", handleMouseEnter as EventListener);
                btn.removeEventListener("mouseleave", handleMouseLeave as EventListener);
            };
        }, []);

        const setRefs = (element: any) => {
            buttonRef.current = element;
            if (typeof ref === "function") {
                ref(element);
            } else if (ref) {
                (ref as React.RefObject<any>).current = element;
            }
        };

        const Component = href ? Link : "button";

        return (
            <Component
                href={href as any}
                ref={setRefs}
                className={cn(
                    "relative inline-flex items-center justify-center overflow-hidden rounded-full font-medium transition-colors",
                    variant === "primary"
                        ? "bg-white text-black"
                        : "bg-[#0a0a0a] text-white border border-white/10 hover:border-white/20",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                    "group",
                    className,
                )}
                {...props}
            >
                <span
                    ref={flairRef}
                    className={cn(
                        "absolute z-0 block aspect-square w-[150%] rounded-full pointer-events-none",
                        variant === "primary" ? "bg-neutral-200" : "bg-white/10",
                    )}
                    style={{
                        transform: "translate(-50%, -50%) scale(0)",
                        left: "50%",
                        top: "50%",
                    }}
                />
                <span className="relative z-10 flex items-center">
                    {children}
                    {showArrow && (
                        <span className="relative flex h-5 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] w-0 opacity-0 -translate-x-2 group-hover:w-5 group-hover:opacity-100 group-hover:ml-2 group-hover:translate-x-0">
                            <ArrowUpRight className="absolute transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-full group-hover:-translate-y-full" />
                            <ArrowUpRight className="absolute -translate-x-full translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-0 group-hover:translate-y-0" />
                        </span>
                    )}
                </span>
            </Component>
        );
    },
);

Button.displayName = "Button";
