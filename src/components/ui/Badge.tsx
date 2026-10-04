import { ReactNode } from "react";
import { cn } from "../../lib/utils";

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <span
            className={cn(
                "inline-flex h-4.5 shrink-0 items-center rounded-full px-1.5 text-[10.5px] leading-none font-medium whitespace-nowrap text-ink-2 shadow-[inset_0_0_0_1px_var(--color-line)]",
                className,
            )}
        >
            {children}
        </span>
    );
}
