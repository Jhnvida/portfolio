"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { createContext, ReactNode, useContext, useEffect, useRef } from "react";

const SmoothScrollContext = createContext<{ getLenis: () => Lenis | null }>({
    getLenis: () => null,
});

export function SmoothScroll({ children }: { children: ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        const lenis = new Lenis({
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

        lenisRef.current = lenis;

        let rafId: number;

        function raf(time: number) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    useEffect(() => {
        if (lenisRef.current) {
            lenisRef.current.scrollTo(0, { immediate: true });
        } else {
            window.scrollTo(0, 0);
        }
    }, [pathname]);

    return (
        <SmoothScrollContext.Provider value={{ getLenis: () => lenisRef.current }}>
            {children}
        </SmoothScrollContext.Provider>
    );
}

export function useLenis() {
    const { getLenis } = useContext(SmoothScrollContext);
    return getLenis();
}
