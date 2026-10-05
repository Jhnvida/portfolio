import { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/utils";

interface SectionHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    title: ReactNode;
    action?: ReactNode;
}

export function SectionHeader({ title, action, className, ...rest }: SectionHeaderProps) {
    return (
        <div className={cn("flex items-baseline justify-between mb-8 pb-3 border-b border-line", className)} {...rest}>
            <span className="text-meta text-ink-3">{title}</span>
            {action && <div>{action}</div>}
        </div>
    );
}
