"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const SmoothScrollContext = createContext<Lenis | null>(null);

export function useSmoothScroll(): Lenis | null {
    return useContext(SmoothScrollContext);
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
    const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
    const pathname = usePathname();
    const isPopStateRef = useRef(false);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.0,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            touchMultiplier: 1.5,
        });

        queueMicrotask(() => setLenisInstance(lenis));

        lenis.on("scroll", ScrollTrigger.update);

        const update = (time: number) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(update);
        gsap.ticker.lagSmoothing(0);

        const handlePopState = () => {
            isPopStateRef.current = true;
        };

        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
            lenis.destroy();
            gsap.ticker.remove(update);
        };
    }, []);

    useEffect(() => {
        if (!lenisInstance) return;

        if (isPopStateRef.current) {
            isPopStateRef.current = false;
            requestAnimationFrame(() => {
                ScrollTrigger.refresh();
            });
            return;
        }

        if (window.location.hash) {
            const target = document.querySelector(window.location.hash);
            if (target) {
                lenisInstance.scrollTo(target as HTMLElement, { immediate: true });
            }
        } else {
            lenisInstance.scrollTo(0, { immediate: true });
        }

        requestAnimationFrame(() => {
            ScrollTrigger.refresh();
        });
    }, [pathname, lenisInstance]);

    return <SmoothScrollContext.Provider value={lenisInstance}>{children}</SmoothScrollContext.Provider>;
}
