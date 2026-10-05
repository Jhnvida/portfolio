import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/utils";

type ButtonProps = {
    href: string;
    children: ReactNode;
    variant?: "primary" | "secondary";
    external?: boolean;
    className?: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">;

const VARIANTS = {
    primary: "bg-ink text-bg hover:bg-ink/85",
    secondary: "bg-bg text-ink shadow-[0_0_0_1px_var(--color-line)] hover:shadow-[0_0_0_1px_var(--color-ink-3)]",
} as const;

export function Button({ href, children, variant = "primary", external = false, className, ...rest }: ButtonProps) {
    const classes = cn(
        "group inline-flex h-9 items-center justify-center gap-1.5 rounded-full px-4 text-meta font-medium whitespace-nowrap",
        "transition-[background-color,box-shadow,transform] duration-200 active:scale-[0.97] active:duration-150",
        VARIANTS[variant],
        className,
    );

    if (external) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...rest}>
                {children}
                <ArrowUpRight
                    aria-hidden
                    size={14}
                    strokeWidth={2}
                    className="-mr-1 opacity-60 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
            </a>
        );
    }

    return (
        <Link href={href} className={classes} {...rest}>
            {children}
        </Link>
    );
}
