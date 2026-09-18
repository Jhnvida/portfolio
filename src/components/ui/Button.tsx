import { ArrowUpRight } from "lucide-react";
import { Link } from "../providers/ViewTransitionsProvider";
import React, { ReactNode } from "react";
import { cn } from "../../lib/utils";

type ButtonBaseProps = {
    children: ReactNode;
    className?: string;
    showArrow?: boolean;
    variant?: "primary" | "secondary" | "dark" | "ghost";
    size?: "sm" | "md" | "lg";
};

type ButtonAsLinkProps = ButtonBaseProps & {
    href: string;
    as?: never;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

type ButtonAsElementProps = ButtonBaseProps & {
    href?: never;
    as?: "button" | "div" | "span";
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
    React.HTMLAttributes<HTMLDivElement>;

export type ButtonProps = ButtonAsLinkProps | ButtonAsElementProps;

export function Button({
    children,
    className,
    showArrow = false,
    variant = "primary",
    size = "md",
    ...props
}: ButtonProps) {
    const sizeClasses = {
        sm: "px-3.5 py-1.5 text-xs",
        md: "px-5 py-2.5 text-sm",
        lg: "px-6 py-3.5 text-base",
    }[size];

    const variantClasses = {
        primary: "bg-white text-black hover:bg-neutral-200 border border-transparent shadow-sm",
        secondary:
            "bg-neutral-900/40 text-neutral-200 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/80 hover:text-white",
        dark: "bg-transparent text-neutral-300 border border-neutral-800 hover:border-neutral-600 hover:text-white",
        ghost: "bg-transparent text-neutral-400 hover:text-white hover:bg-neutral-900/50",
    }[variant];

    const sharedClasses = cn(
        "inline-flex items-center justify-center font-medium tracking-tight transition-all duration-200 group cursor-pointer select-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400",
        sizeClasses,
        variantClasses,
        className,
    );

    const content = (
        <span className="inline-flex items-center gap-2">
            {children}
            {showArrow && (
                <ArrowUpRight
                    size={size === "sm" ? 14 : 16}
                    className="shrink-0 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 text-current opacity-70 group-hover:opacity-100"
                />
            )}
        </span>
    );

    if ("href" in props && props.href !== undefined) {
        const { href, ...rest } = props as ButtonAsLinkProps;
        return (
            <Link href={href} className={sharedClasses} {...rest}>
                {content}
            </Link>
        );
    }

    const { as = "button", ...rest } = props as ButtonAsElementProps;
    const Tag = as;

    return React.createElement(
        Tag,
        {
            className: sharedClasses,
            ...(rest as React.HTMLAttributes<HTMLElement>),
        },
        content,
    );
}

Button.displayName = "Button";
