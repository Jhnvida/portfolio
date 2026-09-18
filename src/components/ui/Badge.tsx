import { ReactNode } from "react";
import { cn } from "../../lib/utils";
import { Link } from "../providers/ViewTransitionsProvider";

interface BadgeProps {
    children: ReactNode;
    className?: string;
    variant?: "default" | "status" | "outline";
    dot?: boolean;
    dotColor?: "green" | "neutral";
    href?: string;
}

export function Badge({ children, className, variant = "default", dot = false, dotColor = "green", href }: BadgeProps) {
    const baseClasses = cn(
        "inline-flex items-center gap-2 px-3 py-1 text-xs font-mono tracking-tight rounded-none transition-all duration-200",
        variant === "default" && "bg-neutral-900/60 text-neutral-300 border border-neutral-800",
        variant === "status" && "bg-neutral-900/80 text-neutral-200 border border-neutral-800 hover:border-neutral-700",
        variant === "outline" && "bg-transparent text-neutral-400 border border-neutral-800 hover:text-neutral-200",
        className,
    );

    const content = (
        <>
            {dot && (
                <span className="relative flex h-2 w-2 shrink-0">
                    {dotColor === "green" && (
                        <>
                            <span className="animate-ping absolute inline-flex h-full w-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex h-2 w-2 bg-emerald-500" />
                        </>
                    )}
                    {dotColor === "neutral" && <span className="relative inline-flex h-2 w-2 bg-neutral-400" />}
                </span>
            )}
            <span>{children}</span>
        </>
    );

    if (href) {
        return (
            <Link
                href={href}
                className={cn(
                    baseClasses,
                    "cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400",
                )}
            >
                {content}
            </Link>
        );
    }

    return <span className={baseClasses}>{content}</span>;
}
