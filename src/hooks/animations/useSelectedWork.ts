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

                if (galleryRef.current && sectionRef.current && gridContainerRef.current) {
                    const getScrollAmount = () => {
                        const galleryWidth = galleryRef.current?.scrollWidth || 0;
                        const gridWidth = gridContainerRef.current?.offsetWidth || 0;
                        return -(galleryWidth - gridWidth);
                    };

                    const tl = gsap.timeline();

                    tl.to(galleryRef.current, {
                        x: getScrollAmount,
                        ease: "none",
                    });

                    ScrollTrigger.create({
                        trigger: sectionRef.current,
                        start: "top top",
                        end: () =>
                            `+=${(galleryRef.current?.scrollWidth || 0) - (gridContainerRef.current?.offsetWidth || 0)}`,
                        pin: true,
                        pinType: "fixed",
                        animation: tl,
                        scrub: true,
                        invalidateOnRefresh: true,
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

                if (gridContainerRef.current) {
                    gsap.set(gridContainerRef.current, { overflowX: "auto", paddingBottom: "24px" });
                }
                if (sectionRef.current) {
                    gsap.set(sectionRef.current, { height: "auto", minHeight: "100vh", paddingBottom: "100px" });
                }
            });
        },
        { scope: sectionRef },
    );

    return { sectionRef, headerRef, galleryRef, gridContainerRef };
}
