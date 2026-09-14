import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

export function useHero() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const items = gsap.utils.toArray<HTMLElement>("[data-anim]", containerRef.current);
            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                gsap.from(items, {
                    opacity: 0,
                    y: 30,
                    scale: 0.95,
                    duration: 1,
                    ease: "expo.out",
                    stagger: 0.15,
                });
            });

            mm.add("(prefers-reduced-motion: reduce)", () => {
                gsap.from(items, {
                    opacity: 0,
                    duration: 1,
                    ease: "power2.out",
                    stagger: 0.1,
                });
            });
        },
        { scope: containerRef },
    );

    return { containerRef };
}
