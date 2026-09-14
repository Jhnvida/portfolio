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
            });
        },
        { scope: sectionRef },
    );

    return { sectionRef, headerRef };
}
