import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useProcess() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!sectionRef.current || !containerRef.current || !lineRef.current) return;

            const steps = gsap.utils.toArray<HTMLElement>(".process-step");
            if (steps.length === 0) return;

            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                gsap.fromTo(
                    lineRef.current,
                    { scaleY: 0 },
                    {
                        scaleY: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top center",
                            end: "bottom center",
                            scrub: true,
                        },
                    },
                );

                steps.forEach((step) => {
                    const numberIndicator = step.querySelector(".process-number");

                    ScrollTrigger.create({
                        trigger: step,
                        start: "top center+=100",
                        end: "bottom center",
                        onToggle: (self) => {
                            gsap.to(step, {
                                opacity: self.isActive ? 1 : 0.3,
                                scale: self.isActive ? 1 : 0.95,
                                duration: 0.6,
                                ease: "power2.out",
                            });

                            if (numberIndicator) {
                                gsap.to(numberIndicator, {
                                    color: self.isActive ? "#ffffff" : "rgba(255,255,255,0.2)",
                                    duration: 0.6,
                                    ease: "power2.out",
                                });
                            }
                        },
                    });
                });
            });

            mm.add("(prefers-reduced-motion: reduce)", () => {
                gsap.set(steps, { opacity: 1, scale: 1 });
            });
        },
        { scope: sectionRef },
    );

    return { sectionRef, containerRef, lineRef };
}
