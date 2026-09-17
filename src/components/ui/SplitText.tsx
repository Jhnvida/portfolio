import React from "react";
import { cn } from "../../lib/utils";

type SplitTextProps = {
    text: string;
    className?: string;
    wordClassName?: string;
};

export function SplitText({ text, className, wordClassName }: SplitTextProps) {
    const words = text.split(" ");

    return (
        <span className={cn("inline-block", className)} aria-label={text}>
            {words.map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block whitespace-nowrap" aria-hidden="true">
                    <span className="inline-block overflow-hidden pb-[0.3em] mb-[-0.3em] pt-[0.1em] mt-[-0.1em]">
                        <span
                            className={cn("inline-block split-word will-change-transform leading-tight", wordClassName)}
                        >
                            {word}
                        </span>
                    </span>

                    {wordIndex < words.length - 1 && <span className="inline-block">&nbsp;</span>}
                </span>
            ))}
        </span>
    );
}
