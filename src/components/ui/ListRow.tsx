import Link from "next/link";
import { cn } from "../../lib/utils";
import { ListRowProps } from "../../types";

export function ListRow({
    title,
    leading,
    badge,
    subtitle,
    value,
    href,
    onClick,
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
                                    ? "text-meta sm:text-list text-ink-3 sm:text-ink-2 wrap-break-word sm:shrink-0"
                                    : "shrink-0",
                                muted ? "text-ink-3" : !stackedOnMobile && "text-ink-2",
                            )}
                        >
                            {value}
                        </span>
                    )}
                </span>

                {subtitle && (
                    <span className={cn("text-ink-3 transition-colors duration-200", href && "group-hover:text-ink-2")}>
                        {subtitle}
                    </span>
                )}
            </span>
        </>
    );

    const classes = cn(
        "group flex gap-2.5 py-2.5 sm:py-2 text-list min-h-11 sm:min-h-0",
        stackedOnMobile ? "items-start sm:items-center" : "items-center",
        className,
    );

    if (onClick) {
        return (
            <button
                type="button"
                onClick={onClick}
                data-preview-image={previewImage}
                className={cn(
                    classes,
                    "-mx-2 w-[calc(100%+1rem)] rounded-lg px-2 text-left cursor-pointer transition-colors duration-200 hover:bg-surface/70 active:bg-surface-strong",
                )}
            >
                {content}
            </button>
        );
    }

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
