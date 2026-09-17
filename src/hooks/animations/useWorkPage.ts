import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useWorkPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                const words = containerRef.current?.querySelectorAll(".split-word");
                const items = gsap.utils.toArray<HTMLElement>("[data-hero-anim]", containerRef.current);

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

                if (items.length > 0) {
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

                const cards = gsap.utils.toArray<HTMLElement>(".project-card", containerRef.current);

                cards.forEach((card) => {
                    gsap.from(card, {
                        opacity: 0,
                        y: 60,
                        scale: 0.96,
                        duration: 1.2,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 85%",
                        },
                    });

                    const parallaxBg = card.querySelector(".parallax-bg");
                    if (parallaxBg) {
                        gsap.fromTo(
                            parallaxBg,
                            { yPercent: -15 },
                            {
                                yPercent: 15,
                                ease: "none",
                                scrollTrigger: {
                                    trigger: card,
                                    start: "top bottom",
                                    end: "bottom top",
                                    scrub: true,
                                },
                            },
                        );
                    }
                });
            });

            mm.add("(prefers-reduced-motion: reduce)", () => {
                const words = containerRef.current?.querySelectorAll(".split-word");
                const items = gsap.utils.toArray<HTMLElement>("[data-hero-anim]", containerRef.current);
                const cards = gsap.utils.toArray<HTMLElement>(".project-card", containerRef.current);

                if (words) gsap.set(words, { y: "0%", filter: "blur(0px)" });
                if (items.length) {
                    gsap.from(items, {
                        opacity: 0,
                        duration: 1,
                        ease: "power2.out",
                        stagger: 0.1,
                    });
                }
                if (cards.length) {
                    gsap.from(cards, {
                        opacity: 0,
                        duration: 1,
                        ease: "power2.out",
                        stagger: 0.1,
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top 80%",
                        },
                    });
                }
            });
        },
        { scope: containerRef },
    );

    return { containerRef };
}
