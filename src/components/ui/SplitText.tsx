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
                    <span className="inline-block overflow-hidden py-1">
                        <span className={cn("inline-block split-word will-change-transform", wordClassName)}>
                            {word}
                        </span>
                    </span>
                    {wordIndex < words.length - 1 && <span className="inline-block">&nbsp;</span>}
                </span>
            ))}
        </span>
    );
}
