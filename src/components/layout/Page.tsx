import { ReactNode, ViewTransition } from "react";

export function Page({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <ViewTransition enter="page" exit="page" default="none">
            <main className={className}>{children}</main>
        </ViewTransition>
    );
}
