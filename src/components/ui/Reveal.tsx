"use client";

import { useEffect, useRef } from "react";
import { RevealProps } from "../../types";

export function Reveal({ children, as: Tag = "div", stagger = false, variant, ...rest }: RevealProps) {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        if (stagger) {
            el.querySelectorAll<HTMLElement>("[data-reveal-item]").forEach((item, i) => {
                item.style.setProperty("--i", String(i));
            });
        }

        if (typeof IntersectionObserver === "undefined") {
            el.dataset.reveal = "visible";
            return;
        }

        el.dataset.reveal = "ready";
        let isFirstCallback = true;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting || entry.boundingClientRect.bottom < 0) {
                    if (isFirstCallback && entry.isIntersecting) {
                        el.style.setProperty("--reveal-offset", "200ms");
                    }
                    el.dataset.reveal = "visible";
                    observer.disconnect();
                }
                isFirstCallback = false;
            },
            { rootMargin: "0px 0px -12% 0px" },
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [stagger]);

    return (
        <Tag
            ref={ref}
            data-reveal="idle"
            data-reveal-item={stagger ? undefined : ""}
            data-reveal-variant={variant}
            {...rest}
        >
            {children}
        </Tag>
    );
}
