"use client";

import Lenis from "lenis";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

const SmoothScrollContext = createContext<Lenis | null>(null);

export function useSmoothScroll(): Lenis | null {
    return useContext(SmoothScrollContext);
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
    const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.0,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            touchMultiplier: 1.5,
        });

        queueMicrotask(() => setLenisInstance(lenis));

        let animationFrameId: number;

        function raf(time: number) {
            lenis.raf(time);
            animationFrameId = requestAnimationFrame(raf);
        }

        animationFrameId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(animationFrameId);
            lenis.destroy();
        };
    }, []);

    return <SmoothScrollContext.Provider value={lenisInstance}>{children}</SmoothScrollContext.Provider>;
}
