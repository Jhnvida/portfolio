import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

export function useHero() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const h1 = containerRef.current?.querySelector("h1");
            const items = gsap.utils.toArray<HTMLElement>("[data-anim]:not(h1)", containerRef.current);
            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                const tl = gsap.timeline();

                if (h1) {
                    gsap.set(h1, {
                        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
                        y: 40,
                        opacity: 1,
                    });

                    tl.to(h1, {
                        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                        y: 0,
                        duration: 1.2,
                        ease: "power4.out",
                    });
                }

                if (items.length) {
                    tl.from(
                        items,
                        {
                            opacity: 0,
                            y: 20,
                            duration: 1,
                            ease: "power3.out",
                            stagger: 0.1,
                        },
                        "-=0.6",
                    );
                }
            });

            mm.add("(prefers-reduced-motion: reduce)", () => {
                const allItems = gsap.utils.toArray<HTMLElement>("[data-anim]", containerRef.current);
                gsap.from(allItems, {
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
