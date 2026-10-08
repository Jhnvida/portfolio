"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { createContext, ReactNode, useCallback, useContext, useEffect, useRef } from "react";

interface SmoothScrollContextType {
    getLenis: () => Lenis | null;
    getPageLenis: () => Lenis | null;
    getModalLenis: () => Lenis | null;
    registerModalScroll: (wrapper: HTMLElement, content?: HTMLElement) => () => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
    getLenis: () => null,
    getPageLenis: () => null,
    getModalLenis: () => null,
    registerModalScroll: () => () => {},
});

export function SmoothScroll({ children }: { children: ReactNode }) {
    const pageLenisRef = useRef<Lenis | null>(null);
    const modalLenisRef = useRef<Lenis | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        const pageLenis = new Lenis({
            duration: 0.95,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            syncTouch: false,
            wheelMultiplier: 1.0,
            touchMultiplier: 1.0,
            autoResize: true,
            anchors: true,
            respectReducedMotion: true,
        });

        pageLenisRef.current = pageLenis;

        let rafId: number;

        function raf(time: number) {
            if (modalLenisRef.current) {
                modalLenisRef.current.raf(time);
            } else if (pageLenisRef.current) {
                pageLenisRef.current.raf(time);
            }
            rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            pageLenis.destroy();
            pageLenisRef.current = null;
        };
    }, []);

    useEffect(() => {
        if (pageLenisRef.current) {
            pageLenisRef.current.scrollTo(0, { immediate: true });
        } else {
            window.scrollTo(0, 0);
        }
    }, [pathname]);

    const registerModalScroll = useCallback((wrapper: HTMLElement, content?: HTMLElement) => {
        pageLenisRef.current?.stop();

        const modalLenis = new Lenis({
            wrapper,
            content: content || (wrapper.firstElementChild as HTMLElement) || wrapper,
            eventsTarget: wrapper,
            duration: 0.95,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            syncTouch: false,
            wheelMultiplier: 1.0,
            touchMultiplier: 1.0,
            autoResize: true,
            anchors: true,
            respectReducedMotion: true,
        });

        modalLenisRef.current = modalLenis;

        return () => {
            modalLenis.destroy();
            if (modalLenisRef.current === modalLenis) {
                modalLenisRef.current = null;
            }
            pageLenisRef.current?.start();
        };
    }, []);

    const contextValue: SmoothScrollContextType = {
        getLenis: () => modalLenisRef.current || pageLenisRef.current,
        getPageLenis: () => pageLenisRef.current,
        getModalLenis: () => modalLenisRef.current,
        registerModalScroll,
    };

    return <SmoothScrollContext.Provider value={contextValue}>{children}</SmoothScrollContext.Provider>;
}

export function useLenis() {
    const { getLenis } = useContext(SmoothScrollContext);
    return getLenis();
}

export function useSmoothScroll() {
    return useContext(SmoothScrollContext);
}
