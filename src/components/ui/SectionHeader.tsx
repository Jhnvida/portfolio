import { forwardRef, ReactNode } from "react";
import { cn } from "../../lib/utils";

export interface SectionHeaderProps {
    label?: string;
    title: string;
    description?: ReactNode;
    className?: string;
}

export const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
    ({ label, title, description, className }, ref) => {
        return (
            <div ref={ref} className={cn("flex flex-col gap-2", className)}>
                {label && <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">{label}</span>}

                <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-neutral-100">{title}</h2>

                {description && (
                    <p className="text-sm md:text-base text-neutral-400 max-w-xl leading-relaxed">{description}</p>
                )}
            </div>
        );
    },
);

SectionHeader.displayName = "SectionHeader";
