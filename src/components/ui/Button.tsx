import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { cn } from "../../lib/utils";
import { ButtonProps, IconButtonProps } from "../../types";

const VARIANTS = {
    primary: "bg-ink text-bg border border-ink hover:bg-ink/85 dark:hover:bg-ink/90 active:scale-[0.98]",
    secondary: "bg-surface text-ink border border-line hover:bg-surface-strong hover:border-ink-3 active:scale-[0.98]",
    outline: "bg-transparent text-ink border border-line hover:bg-surface hover:border-ink-2 active:scale-[0.98]",
    ghost: "bg-surface/70 text-ink border border-line/60 hover:bg-surface-strong hover:border-ink-3 active:scale-[0.98]",
    link: "bg-surface text-ink border border-line hover:bg-surface-strong hover:border-ink-3 active:scale-[0.98]",
} as const;

export function Button({
    href,
    onClick,
    children,
    variant = "secondary",
    external = false,
    disabled = false,
    type = "button",
    className,
    icon,
    endIcon,
    title,
    "aria-label": ariaLabel,
    ...rest
}: ButtonProps) {
    const classes = cn(
        "group inline-flex h-9.5 sm:h-9 items-center justify-center gap-2 rounded-full px-4.5 sm:px-5 text-meta font-medium max-w-full text-center whitespace-nowrap cursor-pointer select-none",
        "transition-[background-color,border-color,color,box-shadow,transform] duration-200 active:scale-[0.97] active:duration-150",
        "focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2",
        "disabled:opacity-40 disabled:pointer-events-none disabled:cursor-not-allowed",
        VARIANTS[variant],
        className,
    );

    const defaultEndIcon = external ? (
        <ArrowUpRight
            aria-hidden
            size={14}
            strokeWidth={2}
            className="opacity-60 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
    ) : null;

    const content = (
        <>
            {icon && <span className="inline-flex shrink-0 items-center justify-center">{icon}</span>}
            {children && <span>{children}</span>}
            {endIcon ? (
                <span className="inline-flex shrink-0 items-center justify-center">{endIcon}</span>
            ) : (
                defaultEndIcon
            )}
        </>
    );

    if (!href) {
        return (
            <button
                type={type}
                onClick={onClick}
                disabled={disabled}
                aria-label={ariaLabel}
                title={title || ariaLabel}
                className={classes}
                {...rest}
            >
                {content}
            </button>
        );
    }

    if (external) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={ariaLabel}
                title={title || ariaLabel}
                className={classes}
                {...rest}
            >
                {content}
            </a>
        );
    }

    return (
        <Link href={href} onClick={onClick} aria-label={ariaLabel} title={title || ariaLabel} className={classes} {...rest}>
            {content}
        </Link>
    );
}

export function IconButton({
    onClick,
    href,
    external = false,
    children,
    "aria-label": ariaLabel,
    title,
    className,
    disabled = false,
}: IconButtonProps) {
    const classes = cn(
        "group inline-flex h-8 w-8 sm:h-8.5 sm:w-8.5 items-center justify-center rounded-full border border-line bg-surface text-ink-2",
        "hover:text-ink hover:border-ink-3 hover:bg-surface-strong active:scale-95",
        "transition-[background-color,border-color,color,transform] duration-200 cursor-pointer select-none",
        "focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2",
        "disabled:opacity-40 disabled:pointer-events-none disabled:cursor-not-allowed",
        className,
    );

    if (href) {
        if (external) {
            return (
                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={ariaLabel}
                    title={title || ariaLabel}
                    className={classes}
                >
                    {children}
                </a>
            );
        }

        return (
            <Link href={href} aria-label={ariaLabel} title={title || ariaLabel} className={classes}>
                {children}
            </Link>
        );
    }

    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            aria-label={ariaLabel}
            title={title || ariaLabel}
            className={classes}
        >
            {children}
        </button>
    );
}
