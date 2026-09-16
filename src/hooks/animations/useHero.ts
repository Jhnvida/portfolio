import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

export function useHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                const words = containerRef.current?.querySelectorAll(".split-word");
                const items = gsap.utils.toArray<HTMLElement>("[data-anim]", containerRef.current);

                const tl = gsap.timeline({ delay: 0.1 });

                if (words && words.length > 0) {
                    gsap.set(words, { y: "120%", filter: "blur(12px)" });

                    tl.to(words, {
                        y: "0%",
                        filter: "blur(0px)",
                        duration: 1.4,
                        stagger: 0.04,
                        ease: "expo.out",
                    });
                }

                if (items.length) {
                    gsap.set(items, { y: 40, opacity: 0, filter: "blur(5px)" });
                    tl.to(
                        items,
                        {
                            y: 0,
                            opacity: 1,
                            filter: "blur(0px)",
                            duration: 1.4,
                            ease: "expo.out",
                            stagger: 0.1,
                        },
                        "-=1.0",
                    );
                }
            });

            mm.add("(prefers-reduced-motion: reduce)", () => {
                const words = containerRef.current?.querySelectorAll(".split-word");
                const items = gsap.utils.toArray<HTMLElement>("[data-anim]", containerRef.current);

                if (words) gsap.set(words, { y: "0%", filter: "blur(0px)" });
                if (items.length) {
                    gsap.from(items, {
                        opacity: 0,
                        duration: 1,
                        ease: "power2.out",
                        stagger: 0.1,
                    });
                }
            });
        },
        { scope: containerRef },
    );

    return { containerRef, titleRef };
}
