import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface ListRowProps {
    title: ReactNode;
    leading?: ReactNode;
    badge?: ReactNode;
    subtitle?: ReactNode;
    value?: ReactNode;
    href?: string;
    muted?: boolean;
    className?: string;
}

export function ListRow({ title, leading, badge, subtitle, value, href, muted, className }: ListRowProps) {
    const content = (
        <>
            {leading && <span className="flex h-[1.5em] shrink-0 items-center">{leading}</span>}
            <span className="flex min-w-0 flex-1 flex-col">
                <span className="flex items-center gap-2.5">
                    <span
                        className={cn(
                            "truncate transition-colors duration-200",
                            muted ? "text-ink-3" : "text-ink",
                            href && "group-hover:text-ink",
                        )}
                    >
                        {title}
                    </span>
                    {badge}
                    <span
                        aria-hidden
                        className={cn(
                            "h-px min-w-6 flex-1 bg-line transition-colors duration-200",
                            href && "group-hover:bg-ink-3/60",
                        )}
                    />
                    {value && <span className="shrink-0 tabular text-ink">{value}</span>}
                </span>
                {subtitle && <span className="text-ink-3">{subtitle}</span>}
            </span>
        </>
    );

    const classes = cn("group flex gap-2.5 py-[7px] text-list", className);

    if (href) {
        return (
            <Link href={href} className={cn(classes, "-mx-2 rounded-lg px-2")}>
                {content}
            </Link>
        );
    }

    return <div className={classes}>{content}</div>;
}
