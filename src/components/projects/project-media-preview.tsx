"use client";

import { useState } from "react";

interface ProjectMediaPreviewProps {
    imageSrc?: string;
    title: string;
    aspectRatio?: string;
}

export function ProjectMediaPreview({ imageSrc, title, aspectRatio = "aspect-16/10" }: ProjectMediaPreviewProps) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);
    const showPlaceholder = !imageSrc || imageError || !imageLoaded;

    return (
        <div
            className={`relative w-full ${aspectRatio} overflow-hidden rounded-xl md:rounded-2xl border border-neutral-200/80 bg-neutral-100/70`}
        >
            {!imageError && imageSrc && (
                <img
                    src={imageSrc}
                    alt={`Interface do projeto ${title}`}
                    className={`h-full w-full object-cover transform-gpu transition-opacity duration-500 ease-out ${
                        imageLoaded ? "opacity-100" : "opacity-0 absolute inset-0 pointer-events-none"
                    }`}
                    loading="lazy"
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageError(true)}
                />
            )}

            {showPlaceholder && (
                <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-linear-to-br from-neutral-100/80 via-neutral-50/70 to-neutral-100/90"
                />
            )}
        </div>
    );
}
