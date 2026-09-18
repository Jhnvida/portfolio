"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { useMagnetic } from "../../hooks/animations/useMagnetic";
import { cn } from "../../lib/utils";

type ButtonBaseProps = {
    children: React.ReactNode;
    className?: string;
    showArrow?: boolean;
    variant?: "primary" | "secondary" | "dark" | "ghost";
};

type ButtonAsLinkProps = ButtonBaseProps & { href: string; as?: never } & Omit<
        React.AnchorHTMLAttributes<HTMLAnchorElement>,
        "href"
    >;

type ButtonAsElementProps = ButtonBaseProps & {
    href?: never;
    as?: "button" | "a" | "div" | "span";
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
    React.HTMLAttributes<HTMLDivElement>;

type ButtonProps = ButtonAsLinkProps | ButtonAsElementProps;

function useFlairEffect(elementRef: React.RefObject<HTMLElement | null>) {
    const flairRef = useRef<HTMLSpanElement | null>(null);

    useEffect(() => {
        const btn = elementRef.current;
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
    }, [elementRef]);

    return { flairRef };
}

function ButtonFlair({
    variant,
    flairRef,
}: {
    variant: ButtonProps["variant"];
    flairRef: React.RefObject<HTMLSpanElement | null>;
}) {
    return (
        <span
            ref={flairRef}
            className={cn(
                "absolute z-0 block aspect-square w-[150%] rounded-full pointer-events-none",
                variant === "primary" ? "bg-neutral-300" : "bg-white/10",
            )}
            style={{
                transform: "translate(-50%, -50%) scale(0)",
                left: "50%",
                top: "50%",
            }}
        />
    );
}

function ButtonContent({ children, showArrow }: { children: React.ReactNode; showArrow: boolean }) {
    return (
        <span className="relative z-10 flex items-center">
            {children}
            {showArrow && (
                <span className="relative flex h-5 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] w-0 opacity-0 -translate-x-2 group-hover:w-5 group-hover:opacity-100 group-hover:ml-2 group-hover:translate-x-0">
                    <ArrowUpRight className="absolute transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-full group-hover:-translate-y-full" />
                    <ArrowUpRight className="absolute -translate-x-full translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-0 group-hover:translate-y-0" />
                </span>
            )}
        </span>
    );
}

export function Button({ children, className, showArrow = true, variant = "primary", ...props }: ButtonProps) {
    const buttonRef = useRef<HTMLElement>(null);
    const { flairRef } = useFlairEffect(buttonRef);
    useMagnetic(buttonRef, 0.4);

    const sharedClassName = cn(
        "relative inline-flex items-center justify-center overflow-hidden rounded-full font-medium transition-colors px-6 py-3 tracking-wide",
        variant === "primary"
            ? "bg-white text-black hover:bg-neutral-200 border border-transparent"
            : variant === "dark" || variant === "secondary"
              ? "bg-transparent text-white border border-white/20 hover:bg-white/5"
              : "bg-transparent text-neutral-400 hover:text-white hover:bg-white/5",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        "group",
        className,
    );

    if ("href" in props && props.href !== undefined) {
        const { href, ...rest } = props as ButtonAsLinkProps;
        return (
            <Link
                href={href}
                ref={buttonRef as unknown as React.Ref<HTMLAnchorElement>}
                className={sharedClassName}
                {...rest}
            >
                <ButtonFlair variant={variant} flairRef={flairRef} />
                <ButtonContent showArrow={showArrow}>{children}</ButtonContent>
            </Link>
        );
    }

    const { as, ...rest } = props as ButtonAsElementProps;
    const Tag = as ?? "button";

    return React.createElement(
        Tag,
        {
            ref: buttonRef,
            className: sharedClassName,
            ...(rest as React.HTMLAttributes<HTMLElement>),
        },
        <ButtonFlair variant={variant} flairRef={flairRef} />,
        <ButtonContent showArrow={showArrow}>{children}</ButtonContent>,
    );
}

Button.displayName = "Button";
