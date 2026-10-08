import { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/utils";

interface SectionProps extends HTMLAttributes<HTMLElement> {
    as?: ElementType;
    children: ReactNode;
    className?: string;
    bottomLine?: boolean;
    topLine?: boolean;
}

export function Section({
    as: Component = "section",
    children,
    className,
    bottomLine = true,
    topLine = false,
    ...rest
}: SectionProps) {
    const frameClass = cn(bottomLine && "section-frame-bottom", topLine && "section-frame-top");

    return (
        <Component className={cn("relative w-full", frameClass, className)} {...rest}>
            {children}
        </Component>
    );
}
