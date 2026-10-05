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
    previewImage?: string;
    stackedOnMobile?: boolean;
}

export function ListRow({
    title,
    leading,
    badge,
    subtitle,
    value,
    href,
    muted,
    className,
    previewImage,
    stackedOnMobile = false,
}: ListRowProps) {
    const content = (
        <>
            {leading && <span className="flex h-[1.5em] shrink-0 items-center">{leading}</span>}
            <span className="flex min-w-0 flex-1 flex-col">
                <span
                    className={cn(
                        stackedOnMobile
                            ? "flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2.5"
                            : "flex items-center gap-2.5",
                    )}
                >
                    <span
                        className={cn(
                            "transition-colors duration-200",
                            stackedOnMobile ? "sm:truncate" : "truncate",
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
                            "h-px min-w-6 flex-1 transition-colors duration-200",
                            stackedOnMobile && "hidden sm:block",
                            muted ? "bg-line/60" : "bg-line",
                            href && "group-hover:bg-ink-3/60",
                        )}
                    />
                    {value && (
                        <span
                            className={cn(
                                "tabular transition-colors duration-200",
                                stackedOnMobile
                                    ? "sm:shrink-0 break-words text-ink-2 sm:text-ink"
                                    : "shrink-0",
                                muted ? "text-ink-3" : "text-ink",
                            )}
                        >
                            {value}
                        </span>
                    )}
                </span>
                {subtitle && (
                    <span
                        className={cn(
                            "text-ink-3 transition-colors duration-200",
                            href && "group-hover:text-ink-2",
                        )}
                    >
                        {subtitle}
                    </span>
                )}
            </span>
        </>
    );

    const classes = cn("group flex gap-2.5 py-[7px] text-list", className);

    if (href) {
        return (
            <Link
                href={href}
                data-preview-image={previewImage}
                className={cn(
                    classes,
                    "-mx-2 rounded-lg px-2 cursor-pointer transition-colors duration-200 hover:bg-surface/70 active:bg-surface-strong",
                )}
            >
                {content}
            </Link>
        );
    }

    return <div className={cn(classes, "cursor-default")}>{content}</div>;
}
