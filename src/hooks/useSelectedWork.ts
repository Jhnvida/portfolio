import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useSelectedWork() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const galleryRef = useRef<HTMLDivElement>(null);
    const gridContainerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
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
                        start: "top 80%",
                    },
                });
            }

            if (galleryRef.current && sectionRef.current && gridContainerRef.current) {
                const getScrollAmount = () => {
                    const galleryWidth = galleryRef.current?.scrollWidth || 0;
                    const gridWidth = gridContainerRef.current?.offsetWidth || 0;
                    return -(galleryWidth - gridWidth);
                };

                const tween = gsap.to(galleryRef.current, {
                    x: getScrollAmount,
                    ease: "none",
                });

                ScrollTrigger.create({
                    trigger: sectionRef.current,
                    start: "top top",
                    end: () =>
                        `+=${(galleryRef.current?.scrollWidth || 0) - (gridContainerRef.current?.offsetWidth || 0)}`,
                    pin: true,
                    animation: tween,
                    scrub: 1,
                    invalidateOnRefresh: true,
                });
            }
        },
        { scope: sectionRef },
    );

    return { sectionRef, headerRef, galleryRef, gridContainerRef };
}
