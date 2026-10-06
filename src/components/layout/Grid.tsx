import { cn } from "../../lib/utils";
import { GridProps } from "../../types";

export function Grid({ children, as: Component = "div", className }: GridProps) {
    return (
        <Component
            className={cn(
                "mx-auto w-full max-w-240 px-6 sm:px-8",
                "grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12",
                "gap-x-5 sm:gap-x-6",
                className,
            )}
        >
            {children}
        </Component>
    );
}
