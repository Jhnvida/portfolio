"use client";

import gsap from "gsap";
import { ArrowLeft, ArrowUpRight, Check, ChevronDown, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export type CursorMode = "default" | "pointer" | "project" | "copy" | "external" | "back" | "expand";

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

        gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50, display: "none" });

        xTo.current = gsap.quickTo(cursorRef.current, "x", { duration: 0.09, ease: "power3.out" });
        yTo.current = gsap.quickTo(cursorRef.current, "y", { duration: 0.09, ease: "power3.out" });

        const evaluateTarget = (target: HTMLElement | null) => {
            if (!target) return;

            const copyEl = target.closest('[data-cursor="copy"]') as HTMLElement | null;
            if (copyEl) {
                const customText = copyEl.getAttribute("data-cursor-text") || "Clique para copiar";
                setCursorText(customText);
                setMode("copy");
                modeRef.current = "copy";
                return;
            }

            const projectEl = target.closest('[data-cursor="project"]') as HTMLElement | null;
            if (projectEl) {
                const customText = projectEl.getAttribute("data-cursor-text") || "Ver projeto";
                setCursorText(customText);
                setMode("project");
                modeRef.current = "project";
                return;
            }

            const externalEl = target.closest('[data-cursor="external"]') as HTMLElement | null;
            if (externalEl) {
                const customText = externalEl.getAttribute("data-cursor-text") || "Abrir link";
                setCursorText(customText);
                setMode("external");
                modeRef.current = "external";
                return;
            }

            const backEl = target.closest('[data-cursor="back"]') as HTMLElement | null;
            if (backEl) {
                const customText = backEl.getAttribute("data-cursor-text") || "Voltar";
                setCursorText(customText);
                setMode("back");
                modeRef.current = "back";
                return;
            }

            const expandEl = target.closest('[data-cursor="expand"]') as HTMLElement | null;
            if (expandEl) {
                const customText = expandEl.getAttribute("data-cursor-text") || "Carregar mais";
                setCursorText(customText);
                setMode("expand");
                modeRef.current = "expand";
                return;
            }

            const interactiveEl = target.closest(
                'a, button, [role="button"], input, select, textarea, label, [data-cursor="pointer"]',
            );
            if (interactiveEl) {
                setMode("pointer");
                modeRef.current = "pointer";
                return;
            }

            setMode("default");
            modeRef.current = "default";
        };

        const handleMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };

            if (!cursorRef.current) return;

            if (!hasMoved.current || !isVisibleRef.current) {
                hasMoved.current = true;
                isVisibleRef.current = true;
                gsap.set(cursorRef.current, { x: e.clientX, y: e.clientY, display: "block" });
                const target = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
                evaluateTarget(target);
            }

            xTo.current?.(e.clientX);
            yTo.current?.(e.clientY);
        };

        const handleMouseDown = (e: MouseEvent) => {
            if (e.button !== 0 || !pillRef.current) return;
            isPressedRef.current = true;
            const isPill = ["project", "copy", "external", "back", "expand"].includes(modeRef.current);
            gsap.to(pillRef.current, {
                scale: isPill ? 0.93 : 0.82,
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
                duration: 0.18,
                ease: "back.out(2)",
                overwrite: "auto",
            });

            requestAnimationFrame(() => {
                const target = document.elementFromPoint(mousePos.current.x, mousePos.current.y) as HTMLElement | null;
                evaluateTarget(target);
            });
        };

        const handleBlurOrLeave = () => {
            isVisibleRef.current = false;
            if (isPressedRef.current && pillRef.current) {
                isPressedRef.current = false;
                gsap.to(pillRef.current, {
                    scale: 1,
                    duration: 0.15,
                    ease: "power2.out",
                    overwrite: "auto",
                });
            }
            if (cursorRef.current) {
                gsap.set(cursorRef.current, { display: "none" });
            }
        };

        const handleScroll = () => {
            if (!hasMoved.current) return;
            const target = document.elementFromPoint(mousePos.current.x, mousePos.current.y) as HTMLElement | null;
            evaluateTarget(target);
        };

        const handleWindowLeave = () => {
            handleBlurOrLeave();
        };

        const handleWindowEnter = (e: MouseEvent) => {
            if (cursorRef.current && hasMoved.current) {
                isVisibleRef.current = true;
                gsap.set(cursorRef.current, { x: e.clientX, y: e.clientY, display: "block" });
                xTo.current?.(e.clientX);
                yTo.current?.(e.clientY);
                const target = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
                evaluateTarget(target);
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
                modeRef.current = customEvent.detail.mode;
            }
            if (customEvent.detail?.text) {
                setCursorText(customEvent.detail.text);
            }
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("blur", handleBlurOrLeave);
        window.addEventListener("scroll", handleScroll, { passive: true });
        document.addEventListener("mouseleave", handleWindowLeave);
        document.addEventListener("mouseenter", handleWindowEnter as EventListener);
        document.addEventListener("mouseover", handleMouseOver, { passive: true });
        window.addEventListener("cursor-state-change", handleCustomState as EventListener);
        window.addEventListener("cursor:set", handleCustomState as EventListener);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("blur", handleBlurOrLeave);
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("mouseleave", handleWindowLeave);
            document.removeEventListener("mouseenter", handleWindowEnter as EventListener);
            document.removeEventListener("mouseover", handleMouseOver);
            window.removeEventListener("cursor-state-change", handleCustomState as EventListener);
            window.removeEventListener("cursor:set", handleCustomState as EventListener);
        };
    }, [isEnabled]);

    useEffect(() => {
        if (!isEnabled || !pillRef.current || !contentRef.current) return;

        gsap.killTweensOf([pillRef.current, contentRef.current]);

        const isPill = ["project", "copy", "external", "back", "expand"].includes(mode);

        if (isPill) {
            const measuredWidth = Math.max(contentRef.current.scrollWidth + 28, 90);

            gsap.to(pillRef.current, {
                width: measuredWidth,
                height: 32,
                scale: isPressedRef.current ? 0.93 : 1,
                padding: "5px 14px",
                borderRadius: 9999,
                backgroundColor: "#0a0a0a",
                duration: 0.25,
                ease: "power3.out",
                overwrite: "auto",
            });

            gsap.to(contentRef.current, {
                opacity: 1,
                scale: 1,
                duration: 0.2,
                ease: "power2.out",
                overwrite: "auto",
            });

            if (mode === "copy" && cursorText === "Copiado!") {
                gsap.fromTo(
                    pillRef.current,
                    { scale: 0.94 },
                    { scale: 1, duration: 0.28, ease: "back.out(1.8)", overwrite: "auto" },
                );
            }
        } else {
            const isPointer = mode === "pointer";

            gsap.to(pillRef.current, {
                width: isPointer ? 18 : 9,
                height: isPointer ? 18 : 9,
                scale: isPressedRef.current ? 0.82 : 1,
                padding: 0,
                borderRadius: 9999,
                backgroundColor: "#0a0a0a",
                duration: isPointer ? 0.2 : 0.22,
                ease: "power2.out",
                overwrite: "auto",
            });

            gsap.to(contentRef.current, {
                opacity: 0,
                scale: 0.75,
                duration: 0.15,
                ease: "power2.in",
                overwrite: "auto",
            });
        }
    }, [mode, cursorText, isEnabled]);

    if (!isEnabled) return null;

    const isCopiedState = mode === "copy" && cursorText === "Copiado!";

    return (
        <div ref={cursorRef} aria-hidden="true" className="pointer-events-none fixed top-0 left-0 z-99999 select-none">
            <div
                ref={pillRef}
                className="flex items-center justify-center overflow-hidden rounded-full shadow-xs will-change-[width,height,transform]"
                style={{ width: 9, height: 9, backgroundColor: "#0a0a0a" }}
            >
                <div
                    ref={contentRef}
                    className="flex items-center gap-1.5 whitespace-nowrap text-[11px] font-sans font-medium text-white antialiased pointer-events-none select-none"
                    style={{ transform: "scale(0.75)", opacity: 0 }}
                >
                    {mode === "copy" ? (
                        isCopiedState ? (
                            <Check className="h-3.5 w-3.5 stroke-[2.5] text-emerald-400 shrink-0" aria-hidden="true" />
                        ) : (
                            <Copy className="h-3.5 w-3.5 stroke-2 shrink-0" aria-hidden="true" />
                        )
                    ) : mode === "back" ? (
                        <ArrowLeft className="h-3.5 w-3.5 stroke-[2.2] shrink-0" aria-hidden="true" />
                    ) : mode === "expand" ? (
                        <ChevronDown className="h-3.5 w-3.5 stroke-[2.2] shrink-0" aria-hidden="true" />
                    ) : (
                        <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.2] shrink-0" aria-hidden="true" />
                    )}
                    <span>{cursorText}</span>
                </div>
            </div>
        </div>
    );
}
