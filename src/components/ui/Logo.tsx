import Link from "next/link";
import { cn } from "../../lib/utils";

interface LogoProps {
    href?: string;
    className?: string;
}

export function Logo({ href, className }: LogoProps) {
    const classes = cn(
        "inline-flex items-center text-ink font-semibold text-[1.0625rem] sm:text-[1.125rem] tracking-[-0.025em] leading-none select-none",
        className,
    );

    if (href) {
        return (
            <Link href={href} aria-label="João Vida - Página Inicial" className={classes}>
                <span>João Vida</span>
            </Link>
        );
    }

    return <span className={classes}>João Vida</span>;
}
