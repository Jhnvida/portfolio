"use client";

import { useCallback, useEffect, useRef } from "react";
import { ProjectListProps } from "../../types";

export function ProjectList({ children, onHoverProject }: ProjectListProps) {
    const leaveTimerRef = useRef<NodeJS.Timeout | null>(null);

    const clearLeaveTimer = useCallback(() => {
        if (leaveTimerRef.current) {
            clearTimeout(leaveTimerRef.current);
            leaveTimerRef.current = null;
        }
    }, []);

    useEffect(() => {
        return () => {
            clearLeaveTimer();
        };
    }, [clearLeaveTimer]);

    const handlePointerOver = useCallback(
        (e: React.PointerEvent) => {
            const target = (e.target as HTMLElement).closest<HTMLElement>("[data-preview-image]");
            if (target) {
                clearLeaveTimer();
                const imageSrc = target.getAttribute("data-preview-image");
                if (imageSrc) {
                    onHoverProject?.(imageSrc);
                }
            }
        },
        [onHoverProject, clearLeaveTimer],
    );

    const handlePointerOut = useCallback(
        (e: React.PointerEvent) => {
            const related = e.relatedTarget as HTMLElement | null;
            const nextTarget = related?.closest<HTMLElement>("[data-preview-image]");
            if (!nextTarget) {
                clearLeaveTimer();
                leaveTimerRef.current = setTimeout(() => {
                    onHoverProject?.(null);
                    leaveTimerRef.current = null;
                }, 60);
            }
        },
        [onHoverProject, clearLeaveTimer],
    );

    return (
        <div onPointerOver={handlePointerOver} onPointerOut={handlePointerOut} className="relative">
            {children}
        </div>
    );
}
