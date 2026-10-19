"use client";

import { useState } from "react";

interface ProjectMediaPreviewProps {
    imageSrc?: string;
    title: string;
    aspectRatio?: string;
}

export function ProjectMediaPreview({ imageSrc, title, aspectRatio = "aspect-16/10" }: ProjectMediaPreviewProps) {
    const [imageError, setImageError] = useState(false);
    const hasImage = Boolean(imageSrc && !imageError);

    return (
        <div
            className={`relative w-full ${aspectRatio} overflow-hidden rounded-xl md:rounded-2xl border border-neutral-200 bg-neutral-100 flex items-center justify-center`}
        >
            {hasImage ? (
                <img
                    src={imageSrc}
                    alt={`Interface do projeto ${title}`}
                    className="h-full w-full object-cover transform-gpu"
                    onError={() => setImageError(true)}
                />
            ) : (
                <div aria-hidden="true" className="w-full h-full flex items-center justify-center bg-neutral-100">
                    <span className="font-heading text-xs sm:text-sm text-neutral-400 font-medium">
                        Interface do projeto em desenvolvimento
                    </span>
                </div>
            )}
        </div>
    );
}
