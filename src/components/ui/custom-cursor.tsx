"use client";

import gsap from "gsap";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export type CursorMode = "default" | "pointer" | "project" | "copy";

export function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const pillRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const xTo = useRef<gsap.QuickToFunc | null>(null);
    const yTo = useRef<gsap.QuickToFunc | null>(null);
    const hasMoved = useRef(false);
    const mousePos = useRef({ x: 0, y: 0 });

    const [mode, setMode] = useState<CursorMode>("default");
    const [cursorText, setCursorText] = useState("Ver projeto");
    const [isEnabled, setIsEnabled] = useState(false);

    useEffect(() => {
        const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 768px)");
        const motionQuery = window.matchMedia("(prefers-reduced-motion: no-preference)");

        const updateEnabledState = () => {
            const shouldEnable = pointerQuery.matches && motionQuery.matches;
            setIsEnabled(shouldEnable);

            if (shouldEnable) {
                document.documentElement.classList.add("custom-cursor-enabled");
            } else {
                document.documentElement.classList.remove("custom-cursor-enabled");
            }
        };

        updateEnabledState();

        const handlePointerChange = () => updateEnabledState();
        const handleMotionChange = () => updateEnabledState();

        pointerQuery.addEventListener("change", handlePointerChange);
        motionQuery.addEventListener("change", handleMotionChange);

        return () => {
            pointerQuery.removeEventListener("change", handlePointerChange);
            motionQuery.removeEventListener("change", handleMotionChange);
            document.documentElement.classList.remove("custom-cursor-enabled");
        };
    }, []);

    useEffect(() => {
        if (!isEnabled || !cursorRef.current) return;

        gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50, opacity: 0 });

        xTo.current = gsap.quickTo(cursorRef.current, "x", { duration: 0.12, ease: "power2.out" });
        yTo.current = gsap.quickTo(cursorRef.current, "y", { duration: 0.12, ease: "power2.out" });

        const evaluateTarget = (target: HTMLElement | null) => {
            if (!target) return;

            const copyEl = target.closest('[data-cursor="copy"]') as HTMLElement | null;
            if (copyEl) {
                const customText = copyEl.getAttribute("data-cursor-text") || "Clique para copiar";
                setCursorText(customText);
                setMode("copy");
                return;
            }

            const projectEl = target.closest('[data-cursor="project"]') as HTMLElement | null;
            if (projectEl) {
                const customText = projectEl.getAttribute("data-cursor-text") || "Ver projeto";
                setCursorText(customText);
                setMode("project");
                return;
            }

            const interactiveEl = target.closest(
                'a, button, [role="button"], input, select, textarea, label, [data-cursor="pointer"]',
            );
            if (interactiveEl) {
                setMode("pointer");
                return;
            }

            setMode("default");
        };

        const handleMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };

            if (!hasMoved.current) {
                hasMoved.current = true;
                if (cursorRef.current) {
                    gsap.set(cursorRef.current, { x: e.clientX, y: e.clientY });
                    gsap.to(cursorRef.current, { opacity: 1, duration: 0.2, ease: "power2.out" });
                }
            } else {
                xTo.current?.(e.clientX);
                yTo.current?.(e.clientY);
            }
        };

        const handleScroll = () => {
            if (!hasMoved.current) return;
            const target = document.elementFromPoint(mousePos.current.x, mousePos.current.y) as HTMLElement | null;
            evaluateTarget(target);
        };

        const handleWindowLeave = () => {
            if (cursorRef.current) {
                gsap.to(cursorRef.current, { opacity: 0, duration: 0.2, ease: "power2.out" });
            }
        };

        const handleWindowEnter = () => {
            if (cursorRef.current && hasMoved.current) {
                gsap.to(cursorRef.current, { opacity: 1, duration: 0.2, ease: "power2.out" });
            }
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement | null;
            evaluateTarget(target);
        };

        const handleCustomState = (e: Event) => {
            const customEvent = e as CustomEvent<{ mode?: CursorMode; text?: string }>;
            if (customEvent.detail?.mode) {
                setMode(customEvent.detail.mode);
            }
            if (customEvent.detail?.text) {
                setCursorText(customEvent.detail.text);
            }
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        window.addEventListener("scroll", handleScroll, { passive: true });
        document.addEventListener("mouseleave", handleWindowLeave);
        document.addEventListener("mouseenter", handleWindowEnter);
        document.addEventListener("mouseover", handleMouseOver, { passive: true });
        window.addEventListener("cursor-state-change", handleCustomState as EventListener);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("mouseleave", handleWindowLeave);
            document.removeEventListener("mouseenter", handleWindowEnter);
            document.removeEventListener("mouseover", handleMouseOver);
            window.removeEventListener("cursor-state-change", handleCustomState as EventListener);
        };
    }, [isEnabled]);

    useEffect(() => {
        if (!isEnabled || !pillRef.current || !contentRef.current) return;

        const isPill = mode === "project" || mode === "copy";

        if (isPill) {
            const measuredWidth = contentRef.current.scrollWidth > 0 ? contentRef.current.scrollWidth + 28 : 120;

            gsap.to(pillRef.current, {
                width: measuredWidth,
                height: 32,
                padding: "5px 13px",
                borderRadius: 9999,
                backgroundColor: "#0a0a0a",
                duration: 0.26,
                ease: "power3.out",
                overwrite: "auto",
            });

            gsap.to(contentRef.current, {
                opacity: 1,
                scale: 1,
                duration: 0.2,
                delay: 0.04,
                ease: "power2.out",
                overwrite: "auto",
            });

            if (mode === "copy" && cursorText === "Copiado!") {
                gsap.fromTo(pillRef.current, { scale: 0.94 }, { scale: 1, duration: 0.3, ease: "back.out(2)" });
            }
        } else {
            const isPointer = mode === "pointer";

            gsap.to(pillRef.current, {
                width: isPointer ? 18 : 9,
                height: isPointer ? 18 : 9,
                padding: 0,
                borderRadius: 9999,
                backgroundColor: isPointer ? "rgba(10, 10, 10, 0.4)" : "#0a0a0a",
                duration: isPointer ? 0.2 : 0.22,
                ease: "power2.out",
                overwrite: "auto",
            });

            gsap.to(contentRef.current, {
                opacity: 0,
                scale: 0.7,
                duration: 0.15,
                ease: "power2.in",
                overwrite: "auto",
            });
        }
    }, [mode, cursorText, isEnabled]);

    if (!isEnabled) return null;

    const isCopiedState = mode === "copy" && cursorText === "Copiado!";
    const isCopyState = mode === "copy";

    return (
        <div
            ref={cursorRef}
            aria-hidden="true"
            className="pointer-events-none fixed top-0 left-0 z-99999 will-change-transform select-none"
        >
            <div
                ref={pillRef}
                className="flex items-center justify-center overflow-hidden rounded-full shadow-xs will-change-[width,height,transform]"
                style={{ width: 9, height: 9, backgroundColor: "#0a0a0a" }}
            >
                <div
                    ref={contentRef}
                    className="flex items-center gap-1.5 whitespace-nowrap text-[11px] font-sans font-medium text-white will-change-[opacity,transform]"
                    style={{ opacity: 0, transform: "scale(0.7)" }}
                >
                    {isCopiedState ? (
                        <Check className="h-3.5 w-3.5 stroke-[2.5] text-emerald-400 shrink-0" aria-hidden="true" />
                    ) : isCopyState ? (
                        <Copy className="h-3.5 w-3.5 stroke-2 shrink-0" aria-hidden="true" />
                    ) : (
                        <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.2] shrink-0" aria-hidden="true" />
                    )}
                    <span>{cursorText}</span>
                </div>
            </div>
        </div>
    );
}
