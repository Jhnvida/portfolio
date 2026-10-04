"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";

interface CopyEmailButtonProps {
    email: string;
    className?: string;
}

export function CopyEmailButton({ email, className }: CopyEmailButtonProps) {
    const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(email);
            setStatus("copied");
        } catch {
            setStatus("error");
        }

        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setStatus("idle"), 2200);
    };

    const label = status === "copied" ? "Copiado" : status === "error" ? "Não foi possível copiar" : "Copiar e-mail";

    return (
        <button
            type="button"
            onClick={handleCopy}
            className={cn(
                "inline-flex h-9 cursor-pointer items-center gap-2 rounded-full bg-bg px-4 text-meta font-medium text-ink shadow-[0_0_0_1px_var(--color-line)] transition-[box-shadow,color] duration-200 hover:shadow-[0_0_0_1px_var(--color-ink-3)]",
                className,
            )}
        >
            {status === "copied" ? (
                <Check aria-hidden size={14} strokeWidth={2.25} />
            ) : (
                <Copy aria-hidden size={14} strokeWidth={2} className="text-ink-2" />
            )}
            <span aria-live="polite">{label}</span>
        </button>
    );
}
