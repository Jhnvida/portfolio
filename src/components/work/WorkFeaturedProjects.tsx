"use client";

import Image from "next/image";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";
import { Project } from "../../types";

interface WorkFeaturedProjectsProps {
    children: ReactNode;
    projects: Project[];
}

const PREVIEW_WIDTH = 280;
const PREVIEW_HEIGHT = 199;
const OFFSET_X = 20;
const OFFSET_Y = 20;
const VIEWPORT_PADDING = 16;
const LERP_FACTOR = 0.2;

export function WorkFeaturedProjects({ children, projects }: WorkFeaturedProjectsProps) {
    const previewRef = useRef<HTMLDivElement>(null);
    const [activeImage, setActiveImage] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    const isVisibleRef = useRef(false);
    const hasPositionRef = useRef(false);
    const targetPos = useRef({ x: 0, y: 0 });
    const currentPos = useRef({ x: 0, y: 0 });
    const rafId = useRef<number | null>(null);

    const checkSupport = useCallback(() => {
        if (typeof window === "undefined") return false;
        const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        return hasFinePointer && !prefersReducedMotion;
    }, []);

    const calculatePosition = useCallback((clientX: number, clientY: number) => {
        let x = clientX + OFFSET_X;
        let y = clientY + OFFSET_Y;

        if (typeof window !== "undefined") {
            if (x + PREVIEW_WIDTH > window.innerWidth - VIEWPORT_PADDING) {
                x = clientX - PREVIEW_WIDTH - OFFSET_X;
            }
            if (y + PREVIEW_HEIGHT > window.innerHeight - VIEWPORT_PADDING) {
                y = clientY - PREVIEW_HEIGHT - OFFSET_Y;
            }

            x = Math.max(VIEWPORT_PADDING, x);
            y = Math.max(VIEWPORT_PADDING, y);
        }

        return { x, y };
    }, []);

    const animate = useCallback(() => {
        function loop() {
            currentPos.current.x += (targetPos.current.x - currentPos.current.x) * LERP_FACTOR;
            currentPos.current.y += (targetPos.current.y - currentPos.current.y) * LERP_FACTOR;

            if (previewRef.current) {
                previewRef.current.style.transform = `translate3d(${currentPos.current.x.toFixed(1)}px, ${currentPos.current.y.toFixed(1)}px, 0)`;
            }

            const dx = Math.abs(targetPos.current.x - currentPos.current.x);
            const dy = Math.abs(targetPos.current.y - currentPos.current.y);

            if (dx > 0.1 || dy > 0.1 || isVisibleRef.current) {
                rafId.current = requestAnimationFrame(loop);
            } else {
                rafId.current = null;
            }
        }

        loop();
    }, []);

    const startRaf = useCallback(() => {
        if (rafId.current === null) {
            rafId.current = requestAnimationFrame(animate);
        }
    }, [animate]);

    useEffect(() => {
        const handleWindowBlur = () => {
            setIsVisible(false);
            isVisibleRef.current = false;
        };

        window.addEventListener("blur", handleWindowBlur);
        return () => {
            window.removeEventListener("blur", handleWindowBlur);
            if (rafId.current !== null) {
                cancelAnimationFrame(rafId.current);
            }
        };
    }, []);

    const handlePointerOver = (e: React.PointerEvent) => {
        if (!checkSupport()) return;
        const target = (e.target as HTMLElement).closest<HTMLElement>("[data-preview-image]");
        if (target) {
            const imageSrc = target.getAttribute("data-preview-image");
            if (imageSrc) {
                setActiveImage(imageSrc);
                setIsVisible(true);
                isVisibleRef.current = true;

                const { x, y } = calculatePosition(e.clientX, e.clientY);
                if (!hasPositionRef.current) {
                    currentPos.current = { x, y };
                    targetPos.current = { x, y };
                    hasPositionRef.current = true;
                    if (previewRef.current) {
                        previewRef.current.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
                    }
                } else {
                    targetPos.current = { x, y };
                }
                startRaf();
            }
        }
    };

    const handlePointerOut = (e: React.PointerEvent) => {
        const related = e.relatedTarget as HTMLElement | null;
        const nextTarget = related?.closest<HTMLElement>("[data-preview-image]");
        if (!nextTarget) {
            setIsVisible(false);
            isVisibleRef.current = false;
            hasPositionRef.current = false;
        }
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!isVisibleRef.current || !checkSupport()) return;
        const { x, y } = calculatePosition(e.clientX, e.clientY);
        targetPos.current = { x, y };
        startRaf();
    };

    return (
        <div
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
            onPointerMove={handlePointerMove}
            className="relative"
        >
            {children}

            <div
                ref={previewRef}
                aria-hidden="true"
                className="pointer-events-none fixed top-0 left-0 z-30 hidden [@media(hover:hover)_and_(pointer:fine)]:block"
                style={{ willChange: "transform" }}
            >
                <div
                    className={cn(
                        "relative w-70 aspect-45/32 overflow-hidden rounded-media bg-surface shadow-xl shadow-ink/8 border border-line/80",
                        "transition-[opacity,transform,scale] duration-240 ease-out origin-center",
                        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-[0.94]",
                    )}
                >
                    {projects.map((project) => (
                        <Image
                            key={project.id}
                            src={project.image}
                            alt=""
                            fill
                            priority
                            sizes="280px"
                            className={cn(
                                "object-cover transition-opacity duration-200",
                                activeImage === project.image ? "opacity-100" : "opacity-0",
                            )}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
