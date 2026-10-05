import { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface SectionHeaderProps {
    title: ReactNode;
    action?: ReactNode;
    className?: string;
    "data-work-header-featured"?: boolean | string;
    "data-work-header-archive"?: boolean | string;
    "data-home-work-header"?: boolean | string;
    "data-home-section-header"?: boolean | string;
}

export function SectionHeader({ title, action, className, ...rest }: SectionHeaderProps) {
    return (
        <div className={cn("flex items-baseline justify-between mb-8 pb-3 border-b border-line", className)} {...rest}>
            <span className="text-meta text-ink-3">{title}</span>
            {action && <div>{action}</div>}
        </div>
    );
}
