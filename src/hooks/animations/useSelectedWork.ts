import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useSelectedWork() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                const elements = sectionRef.current?.querySelectorAll("[data-header-anim]");
                if (elements?.length) {
                    gsap.from(elements, {
                        y: 30,
                        opacity: 0,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: "expo.out",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 85%",
                        },
                    });
                }
            });

            mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
                if (!sectionRef.current || !trackRef.current) return;

                const track = trackRef.current;
                const cards = gsap.utils.toArray<HTMLElement>(".project-card", track);

                const getScrollAmount = () => {
                    return -(track.scrollWidth - window.innerWidth);
                };

                const tween = gsap.to(track, {
                    x: getScrollAmount,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "center center",
                        end: () => `+=${track.scrollWidth}`,
                        pin: true,
                        scrub: 1,
                        invalidateOnRefresh: true,
                    },
                });

                cards.forEach((card) => {
                    const parallaxBg = card.querySelector(".parallax-bg");
                    if (parallaxBg) {
                        gsap.fromTo(
                            parallaxBg,
                            { xPercent: -10 },
                            {
                                xPercent: 10,
                                ease: "none",
                                scrollTrigger: {
                                    trigger: card,
                                    containerAnimation: tween,
                                    start: "left right",
                                    end: "right left",
                                    scrub: true,
                                },
                            },
                        );
                    }
                });
            });

            mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
                if (!trackRef.current) return;
                const cards = gsap.utils.toArray<HTMLElement>(".project-card", trackRef.current);

                cards.forEach((card) => {
                    gsap.from(card, {
                        opacity: 0,
                        y: 30,
                        duration: 0.8,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 85%",
                        },
                    });
                });
            });

            mm.add("(prefers-reduced-motion: reduce)", () => {
                const elements = sectionRef.current?.querySelectorAll("[data-header-anim]");
                if (elements?.length) gsap.set(elements, { opacity: 1, y: 0 });
                const cards = gsap.utils.toArray<HTMLElement>(".project-card");
                if (cards.length) gsap.set(cards, { opacity: 1, y: 0 });
            });
        },
        { scope: sectionRef },
    );

    return { sectionRef, headerRef, trackRef };
}
