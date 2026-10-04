import { ElementType, ReactNode } from "react";
import { cn } from "../../lib/utils";

interface LayoutGridProps {
    children: ReactNode;
    as?: ElementType;
    className?: string;
}

export function LayoutGrid({
    children,
    as: Component = "div",
    className,
}: LayoutGridProps) {
    return (
        <Component
            className={cn(
                "mx-auto w-full max-w-[60rem] px-6 sm:px-8",
                "grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12",
                "gap-x-5 sm:gap-x-6",
                className
            )}
        >
            {children}
        </Component>
    );
}
