import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useServices() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const cards = gsap.utils.toArray<HTMLElement>(".service-card");
            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                cards.forEach((card, index) => {
                    if (index === cards.length - 1) return;

                    const title = card.querySelector("h3");

                    const tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: cards[index + 1],
                            start: "top bottom",
                            end: "top top",
                            scrub: true,
                        },
                    });

                    tl.to(card, { scale: 0.95, opacity: 0.4, ease: "none" }, 0);

                    if (title) {
                        tl.to(title, { y: -15, ease: "none" }, 0);
                    }
                });
            });

            mm.add("(prefers-reduced-motion: reduce)", () => {
                cards.forEach((card, index) => {
                    if (index === cards.length - 1) return;

                    gsap.to(card, {
                        opacity: 0.4,
                        scrollTrigger: {
                            trigger: cards[index + 1],
                            start: "top bottom",
                            end: "top top",
                            scrub: true,
                        },
                    });
                });
            });
        },
        { scope: containerRef },
    );

    return { containerRef };
}
