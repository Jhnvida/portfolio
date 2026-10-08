"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ProjectSummary } from "../../types";

interface ProjectPreviewStageProps {
    targetImage: string | null;
    projects: ProjectSummary[];
    isDrawerClosing: boolean;
}

export function ProjectPreviewStage({ targetImage, projects, isDrawerClosing }: ProjectPreviewStageProps) {
    const [prevTargetImage, setPrevTargetImage] = useState<string | null>(null);
    const [displayedImage, setDisplayedImage] = useState<string | null>(null);
    const [previousImage, setPreviousImage] = useState<string | null>(null);
    const [isCrossfading, setIsCrossfading] = useState(false);

    if (targetImage !== prevTargetImage) {
        setPrevTargetImage(targetImage);
        if (targetImage) {
            if (displayedImage && displayedImage !== targetImage) {
                setPreviousImage(displayedImage);
                setDisplayedImage(targetImage);
                setIsCrossfading(true);
            } else if (!displayedImage) {
                setDisplayedImage(targetImage);
                setPreviousImage(null);
                setIsCrossfading(false);
            }
        }
    }

    useEffect(() => {
        projects.forEach((proj) => {
            if (typeof window !== "undefined" && proj.image) {
                const img = new window.Image();
                img.src = proj.image;
            }
        });
    }, [projects]);

    const crossfadeTimerRef = useRef<NodeJS.Timeout | null>(null);
    useEffect(() => {
        if (isCrossfading) {
            const raf = requestAnimationFrame(() => {
                setIsCrossfading(false);
            });

            if (crossfadeTimerRef.current) clearTimeout(crossfadeTimerRef.current);
            crossfadeTimerRef.current = setTimeout(() => {
                setPreviousImage(null);
            }, 380);

            return () => {
                cancelAnimationFrame(raf);
                if (crossfadeTimerRef.current) clearTimeout(crossfadeTimerRef.current);
            };
        }
    }, [isCrossfading]);

    useEffect(() => {
        if (!targetImage || isDrawerClosing) {
            const timer = setTimeout(() => {
                setDisplayedImage(null);
                setPreviousImage(null);
            }, 260);
            return () => clearTimeout(timer);
        }
    }, [targetImage, isDrawerClosing]);

    const isVisible = Boolean(targetImage && !isDrawerClosing);

    if (!displayedImage && !isVisible) {
        return null;
    }

    return (
        <div
            aria-hidden="true"
            className="hidden md:flex fixed inset-y-0 left-0 right-[min(68vw,55rem)] lg:right-[min(54vw,55rem)] xl:right-[min(48vw,55rem)] z-45 items-center justify-center p-6 sm:p-8 lg:p-10 xl:p-14 pointer-events-none select-none"
        >
            <div
                className={`relative w-full max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl aspect-16/10 overflow-hidden rounded-2xl lg:rounded-3xl bg-surface border border-line/80 shadow-[0_24px_64px_rgba(0,0,0,0.18)] dark:shadow-[0_32px_80px_rgba(0,0,0,0.6)] motion-reduce:transform-none ${
                    isVisible
                        ? "opacity-100 translate-x-0 scale-100 transition-all duration-420 ease-panel"
                        : "opacity-0 -translate-x-6 scale-[0.97] transition-all duration-240 ease-out"
                }`}
            >
                {previousImage && (
                    <div className="absolute inset-0 z-10 pointer-events-none">
                        <Image
                            src={previousImage}
                            alt=""
                            fill
                            priority
                            quality={95}
                            sizes="(max-width: 1024px) 800px, (max-width: 1536px) 1200px, 1600px"
                            className="object-cover"
                        />
                    </div>
                )}

                {displayedImage && (
                    <div
                        className={`absolute inset-0 z-20 pointer-events-none transition-[opacity,transform,filter] duration-380 ease-panel ${
                            isCrossfading ? "opacity-0 scale-[1.02] blur-[3px]" : "opacity-100 scale-100 blur-0"
                        }`}
                    >
                        <Image
                            src={displayedImage}
                            alt=""
                            fill
                            priority
                            quality={95}
                            sizes="(max-width: 1024px) 800px, (max-width: 1536px) 1200px, 1600px"
                            className="object-cover"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
