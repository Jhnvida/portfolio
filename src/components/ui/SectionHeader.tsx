import { forwardRef } from "react";
import { cn } from "../../lib/utils";

export interface SectionHeaderProps {
    title: string;
    className?: string;
}

export const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(({ title, className = "" }, ref) => {
    return (
        <div className={cn("w-full max-w-(--container-page) mx-auto px-6 md:px-12 lg:px-24 mb-12", className)}>
            <div ref={ref}>
                <p data-header-anim className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
                    {title}
                </p>
            </div>
        </div>
    );
});

SectionHeader.displayName = "SectionHeader";
