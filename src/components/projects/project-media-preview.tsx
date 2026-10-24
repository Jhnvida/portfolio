"use client";

import { usePageTransition } from "@/components/providers/page-transition-provider";
import { useEffect, useRef, useState } from "react";

interface ProjectMediaPreviewProps {
    imageSrc?: string;
    title: string;
    aspectRatio?: string;
    slug?: string;
}

export function ProjectMediaPreview({ imageSrc, title, aspectRatio = "aspect-16/10", slug }: ProjectMediaPreviewProps) {
    const [imageError, setImageError] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);
    const hasImage = Boolean(imageSrc && !imageError);

    useEffect(() => {
        if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth === 0) {
            setImageError(true);
        }
    }, []);

    const containerRef = useRef<HTMLDivElement>(null);
    const { isTransitioning, activeSlug, isDestinationReady, registerDestination } = usePageTransition();

    const isTransitionTarget = isTransitioning && Boolean(slug && activeSlug === slug);
    const shouldHideForTransition = isTransitionTarget && !isDestinationReady;

    useEffect(() => {
        if (isTransitionTarget && containerRef.current && slug) {
            registerDestination(slug, containerRef.current);
        }
    }, [isTransitionTarget, slug, registerDestination]);

    return (
        <div
            ref={containerRef}
            className={`relative w-full ${aspectRatio} overflow-hidden border border-neutral-200 bg-neutral-100 flex items-center justify-center ${
                shouldHideForTransition ? "opacity-0" : "opacity-100"
            }`}
        >
            {hasImage ? (
                <img
                    ref={imgRef}
                    src={imageSrc}
                    alt={`Interface do projeto ${title}`}
                    className="h-full w-full object-cover transform-gpu"
                    onError={() => setImageError(true)}
                />
            ) : (
                <div aria-hidden="true" className="w-full h-full bg-neutral-100" />
            )}
        </div>
    );
}
