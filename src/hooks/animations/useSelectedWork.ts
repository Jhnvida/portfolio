import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useSelectedWork() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                if (headerRef.current) {
                    const elements = headerRef.current.querySelectorAll("[data-header-anim]");
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

                const cards = gsap.utils.toArray<HTMLElement>(".project-card");
                if (cards.length > 0) {
                    cards.forEach((card) => {
                        const img = card.querySelector(".project-img");
                        const content = card.querySelector(".project-content");

                        const tl = gsap.timeline({
                            scrollTrigger: {
                                trigger: card,
                                start: "top 85%",
                            },
                        });

                        tl.fromTo(
                            img,
                            { scale: 1.05, opacity: 0.5, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
                            {
                                scale: 1,
                                opacity: 1,
                                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                                duration: 1.2,
                                ease: "power4.out",
                            },
                        ).fromTo(
                            content,
                            { y: 20, opacity: 0 },
                            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
                            "-=0.8",
                        );
                    });
                }
            });

            mm.add("(prefers-reduced-motion: reduce)", () => {
                if (headerRef.current) {
                    const elements = headerRef.current.querySelectorAll("[data-header-anim]");
                    gsap.from(elements, {
                        opacity: 0,
                        duration: 0.8,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 85%",
                        },
                    });
                }

                const cards = gsap.utils.toArray<HTMLElement>(".project-card");
                if (cards.length > 0) {
                    cards.forEach((card) => {
                        gsap.from(card, {
                            opacity: 0,
                            duration: 0.8,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: card,
                                start: "top 85%",
                            },
                        });
                    });
                }
            });
        },
        { scope: sectionRef },
    );

    return { sectionRef, headerRef };
}
