import { cn } from "../../lib/utils";
import { SectionHeaderProps } from "../../types";

export function SectionHeader({ title, action, className, ...rest }: SectionHeaderProps) {
    return (
        <div
            className={cn(
                "flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 mb-6 sm:mb-8 pb-3 border-b border-line/60",
                className,
            )}
            {...rest}
        >
            <span className="text-meta tracking-[0.08em] uppercase text-ink-3">{title}</span>
            {action && <div>{action}</div>}
        </div>
    );
}
