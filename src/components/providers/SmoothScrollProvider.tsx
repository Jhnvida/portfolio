"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });

        // setState is deferred to avoid the "synchronous setState in effect" lint rule.
        // queueMicrotask runs after the current effect body completes but before
        // the browser paints, so consumers get the Lenis instance on the next tick.
        queueMicrotask(() => setLenisInstance(lenis));

        lenis.on("scroll", ScrollTrigger.update);

        const update = (time: number) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(update);
        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.destroy();
            gsap.ticker.remove(update);
        };
    }, []);

    return <SmoothScrollContext.Provider value={lenisInstance}>{children}</SmoothScrollContext.Provider>;
}
