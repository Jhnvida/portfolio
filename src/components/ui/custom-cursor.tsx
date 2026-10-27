"use client";

import { MOTION } from "@/lib/motion";
import gsap from "gsap";
import { ArrowLeft, ArrowUpRight, Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export type CursorMode = "default" | "pointer" | "project" | "copy" | "external" | "back" | "hidden";

export function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const pillRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const xTo = useRef<gsap.QuickToFunc | null>(null);
    const yTo = useRef<gsap.QuickToFunc | null>(null);

    const hasMoved = useRef(false);
    const isVisibleRef = useRef(false);
    const mousePos = useRef({ x: 0, y: 0 });
    const isPressedRef = useRef(false);

    const [mode, setMode] = useState<CursorMode>("default");
    const modeRef = useRef<CursorMode>("default");
    const [cursorText, setCursorText] = useState("Ver projeto");
    const cursorTextRef = useRef("Ver projeto");
    const [isDarkBg, setIsDarkBg] = useState(false);
    const isDarkBgRef = useRef(false);
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

        gsap.set(cursorRef.current, {
            xPercent: -50,
            yPercent: -50,
            display: "none",
        });

        xTo.current = gsap.quickTo(cursorRef.current, "x", { duration: 0.035, ease: "power2.out" });
        yTo.current = gsap.quickTo(cursorRef.current, "y", { duration: 0.035, ease: "power2.out" });

        const applyModeAndText = (nextMode: CursorMode, nextText?: string, nextDark?: boolean) => {
            if (nextText !== undefined && cursorTextRef.current !== nextText) {
                cursorTextRef.current = nextText;
                setCursorText(nextText);
            }
            if (modeRef.current !== nextMode) {
                modeRef.current = nextMode;
                setMode(nextMode);
            }
            if (nextDark !== undefined && isDarkBgRef.current !== nextDark) {
                isDarkBgRef.current = nextDark;
                setIsDarkBg(nextDark);
            }
        };

        const evaluateTarget = (rawTarget: EventTarget | null) => {
            let target: Element | null = null;

            if (rawTarget instanceof Element) {
                target = rawTarget;
            } else if (typeof document !== "undefined" && mousePos.current.x && mousePos.current.y) {
                const pointEl = document.elementFromPoint(mousePos.current.x, mousePos.current.y);
                if (pointEl instanceof Element) {
                    target = pointEl;
                }
            }

            if (!target || typeof target.closest !== "function") return;

            const isFormField = target.closest('input, textarea, select, [contenteditable="true"]');
            if (isFormField) {
                applyModeAndText("hidden");
                return;
            }

            const isDark = Boolean(target.closest('[data-cursor-theme="dark"], [data-theme="dark"]'));

            const copyEl = target.closest('[data-cursor="copy"]') as HTMLElement | null;
            if (copyEl) {
                const customText = copyEl.getAttribute("data-cursor-text") || "Clique para copiar";
                applyModeAndText("copy", customText, isDark);
                return;
            }

            const projectEl = target.closest('[data-cursor="project"]') as HTMLElement | null;
            if (projectEl) {
                const customText = projectEl.getAttribute("data-cursor-text") || "Ver projeto";
                applyModeAndText("project", customText, true);
                return;
            }

            const externalEl = target.closest('[data-cursor="external"]') as HTMLElement | null;
            if (externalEl) {
                const customText = externalEl.getAttribute("data-cursor-text") || "Abrir link";
                applyModeAndText("external", customText, isDark);
                return;
            }

            const backEl = target.closest('[data-cursor="back"]') as HTMLElement | null;
            if (backEl) {
                const customText = backEl.getAttribute("data-cursor-text") || "Voltar";
                applyModeAndText("back", customText, isDark);
                return;
            }

            const interactiveEl = target.closest('a, button, [role="button"], label, [data-cursor="pointer"]');
            if (interactiveEl) {
                applyModeAndText("pointer", undefined, isDark);
                return;
            }

            applyModeAndText("default", undefined, isDark);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };

            if (!cursorRef.current) return;

            if (!hasMoved.current || !isVisibleRef.current) {
                hasMoved.current = true;
                isVisibleRef.current = true;
                gsap.set(cursorRef.current, {
                    x: e.clientX,
                    y: e.clientY,
                    display: "block",
                });
                evaluateTarget(e.target as HTMLElement | null);
            }

            xTo.current?.(e.clientX);
            yTo.current?.(e.clientY);
        };

        const handleMouseDown = (e: MouseEvent) => {
            if (e.button !== 0 || !pillRef.current) return;
            isPressedRef.current = true;
            const isPill = ["project", "copy", "external", "back"].includes(modeRef.current);

            gsap.to(pillRef.current, {
                scale: isPill ? 0.94 : 0.8,
                duration: 0.08,
                ease: "power2.out",
                overwrite: "auto",
            });
        };

        const handleMouseUp = (e: MouseEvent) => {
            if (e.button !== 0 || !pillRef.current) return;
            isPressedRef.current = false;

            gsap.to(pillRef.current, {
                scale: 1,
                duration: MOTION.duration.fast,
                ease: MOTION.ease.micro,
                overwrite: "auto",
            });

            requestAnimationFrame(() => {
                const target = document.elementFromPoint(mousePos.current.x, mousePos.current.y);
                evaluateTarget(target);
            });
        };

        const handleBlurOrLeave = () => {
            isVisibleRef.current = false;
            isPressedRef.current = false;
            if (cursorRef.current) {
                gsap.set(cursorRef.current, { display: "none" });
            }
        };

        const handleWindowEnter = (e: MouseEvent) => {
            if (cursorRef.current) {
                isVisibleRef.current = true;
                hasMoved.current = true;
                mousePos.current = { x: e.clientX, y: e.clientY };
                gsap.set(cursorRef.current, {
                    x: e.clientX,
                    y: e.clientY,
                    display: "block",
                });
                xTo.current?.(e.clientX);
                yTo.current?.(e.clientY);
                const target = document.elementFromPoint(e.clientX, e.clientY);
                evaluateTarget(target);
            }
        };

        const handleMouseOver = (e: MouseEvent) => {
            evaluateTarget(e.target);
        };

        let scrollRafId: number | null = null;
        const handleScroll = () => {
            if (!hasMoved.current) return;
            if (scrollRafId !== null) return;
            scrollRafId = requestAnimationFrame(() => {
                scrollRafId = null;
                const target = document.elementFromPoint(mousePos.current.x, mousePos.current.y);
                evaluateTarget(target);
            });
        };

        const handleCustomState = (e: Event) => {
            const customEvent = e as CustomEvent<{ mode?: CursorMode; text?: string }>;
            if (customEvent.detail?.mode) {
                applyModeAndText(customEvent.detail.mode, customEvent.detail.text);
            }
            requestAnimationFrame(() => {
                if (mousePos.current.x || mousePos.current.y) {
                    const el = document.elementFromPoint(mousePos.current.x, mousePos.current.y);
                    evaluateTarget(el);
                }
            });
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("blur", handleBlurOrLeave);
        window.addEventListener("scroll", handleScroll, { passive: true });
        document.addEventListener("mouseleave", handleBlurOrLeave);
        document.addEventListener("mouseenter", handleWindowEnter as EventListener);
        document.addEventListener("mouseover", handleMouseOver, { passive: true });
        window.addEventListener("cursor-state-change", handleCustomState as EventListener);
        window.addEventListener("cursor:set", handleCustomState as EventListener);

        return () => {
            if (scrollRafId !== null) {
                cancelAnimationFrame(scrollRafId);
            }
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("blur", handleBlurOrLeave);
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("mouseleave", handleBlurOrLeave);
            document.removeEventListener("mouseenter", handleWindowEnter as EventListener);
            document.removeEventListener("mouseover", handleMouseOver);
            window.removeEventListener("cursor-state-change", handleCustomState as EventListener);
            window.removeEventListener("cursor:set", handleCustomState as EventListener);
        };
    }, [isEnabled]);

    useEffect(() => {
        if (!isEnabled || !pillRef.current || !contentRef.current) return;

        gsap.killTweensOf([pillRef.current, contentRef.current]);

        const isPill = ["project", "copy", "external", "back"].includes(mode);

        if (mode === "hidden") {
            gsap.to(pillRef.current, {
                opacity: 0,
                scale: 0.3,
                duration: 0.12,
                ease: "power2.out",
                overwrite: "auto",
            });
            gsap.to(contentRef.current, {
                opacity: 0,
                scale: 0.5,
                duration: 0.08,
                overwrite: "auto",
            });
            return;
        }

        if (isPill) {
            const measuredWidth = Math.max(contentRef.current.scrollWidth + 28, 92);

            gsap.to(pillRef.current, {
                width: measuredWidth,
                height: 32,
                scale: isPressedRef.current ? 0.94 : 1,
                padding: "5px 14px",
                borderRadius: 9999,
                backgroundColor: "#0a0a0a",
                borderColor: "rgba(255, 255, 255, 0.25)",
                borderWidth: 1,
                opacity: 1,
                duration: 0.24,
                ease: "power3.out",
                overwrite: "auto",
            });

            gsap.to(contentRef.current, {
                opacity: 1,
                scale: 1,
                duration: 0.18,
                delay: 0.04,
                ease: "power2.out",
                overwrite: "auto",
            });

            if (mode === "copy" && cursorText === "Copiado!") {
                gsap.fromTo(
                    pillRef.current,
                    { scale: 0.94 },
                    { scale: 1, duration: MOTION.duration.normal, ease: MOTION.ease.micro, overwrite: "auto" },
                );
            }
        } else if (mode === "pointer") {
            const dotColor = isDarkBg ? "#ffffff" : "#0a0a0a";
            const borderColor = isDarkBg ? "rgba(255, 255, 255, 0.4)" : "rgba(10, 10, 10, 0.2)";

            gsap.to(pillRef.current, {
                width: 16,
                height: 16,
                scale: isPressedRef.current ? 0.85 : 1,
                padding: 0,
                borderRadius: 9999,
                backgroundColor: dotColor,
                borderColor: borderColor,
                borderWidth: 0,
                opacity: 1,
                duration: 0.2,
                ease: "power2.out",
                overwrite: "auto",
            });

            gsap.to(contentRef.current, {
                opacity: 0,
                scale: 0.7,
                duration: 0.1,
                ease: "power2.in",
                overwrite: "auto",
            });
        } else {
            const dotColor = isDarkBg ? "#ffffff" : "#0a0a0a";
            const borderColor = isDarkBg ? "rgba(255, 255, 255, 0.3)" : "rgba(10, 10, 10, 0.15)";

            gsap.to(pillRef.current, {
                width: 8,
                height: 8,
                scale: isPressedRef.current ? 0.8 : 1,
                padding: 0,
                borderRadius: 9999,
                backgroundColor: dotColor,
                borderColor: borderColor,
                borderWidth: 0,
                opacity: 1,
                duration: 0.2,
                ease: "power2.out",
                overwrite: "auto",
            });

            gsap.to(contentRef.current, {
                opacity: 0,
                scale: 0.7,
                duration: 0.1,
                ease: "power2.in",
                overwrite: "auto",
            });
        }
    }, [mode, cursorText, isDarkBg, isEnabled]);

    if (!isEnabled) return null;

    const isCopiedState = mode === "copy" && cursorText === "Copiado!";

    return (
        <div
            ref={cursorRef}
            aria-hidden="true"
            className="pointer-events-none fixed top-0 left-0 z-99999 select-none transform-gpu"
            style={{ display: "none" }}
        >
            <div
                ref={pillRef}
                className="pointer-events-none flex items-center justify-center overflow-hidden rounded-full border border-white/20 shadow-sm will-change-[width,height,transform,background-color,border-color,opacity]"
                style={{
                    width: 8,
                    height: 8,
                    backgroundColor: isDarkBg ? "#ffffff" : "#0a0a0a",
                }}
            >
                <div
                    ref={contentRef}
                    className="flex items-center gap-1.5 whitespace-nowrap text-[11px] font-sans font-medium text-white antialiased pointer-events-none select-none"
                    style={{ transform: "scale(0.7)", opacity: 0 }}
                >
                    {mode === "copy" ? (
                        isCopiedState ? (
                            <Check className="h-3.5 w-3.5 stroke-[2.5] text-emerald-400 shrink-0" aria-hidden="true" />
                        ) : (
                            <Copy className="h-3.5 w-3.5 stroke-2 shrink-0" aria-hidden="true" />
                        )
                    ) : mode === "back" ? (
                        <ArrowLeft className="h-3.5 w-3.5 stroke-[2.2] shrink-0" aria-hidden="true" />
                    ) : (
                        <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.2] shrink-0" aria-hidden="true" />
                    )}
                    <span>{cursorText}</span>
                </div>
            </div>
        </div>
    );
}
