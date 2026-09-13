import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { PROCESS_STEPS } from "../data/process";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useProcess() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(
        () => {
            if (!sectionRef.current || !containerRef.current) return;

            gsap.set(stepsRef.current, { opacity: 1, y: 0 });

            stepsRef.current.forEach((step, i) => {
                if (!step) return;
                const elements = step.querySelectorAll("span, h3, p");
                gsap.set(elements, {
                    opacity: i === 0 ? 1 : 0,
                    y: i === 0 ? 0 : window.innerHeight * 0.4,
                });
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: `+=${PROCESS_STEPS.length * 80}%`,
                    pin: true,
                    pinType: "fixed",
                    scrub: true,
                    invalidateOnRefresh: true,
                },
            });

            tl.to({}, { duration: 0.2 });

            PROCESS_STEPS.forEach((_, index) => {
                if (index < PROCESS_STEPS.length - 1) {
                    const currentStep = stepsRef.current[index];
                    const nextStep = stepsRef.current[index + 1];

                    if (!currentStep || !nextStep) return;

                    const currentElements = currentStep.querySelectorAll("span, h3, p");
                    const nextElements = nextStep.querySelectorAll("span, h3, p");

                    tl.to(
                        currentElements,
                        {
                            opacity: 0,
                            y: () => -(window.innerHeight * 0.4),
                            duration: 0.8,
                            stagger: 0.05,
                            ease: "power2.inOut",
                        },
                        `step${index}`,
                    ).fromTo(
                        nextElements,
                        {
                            opacity: 0,
                            y: () => window.innerHeight * 0.4,
                        },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            stagger: 0.05,
                            ease: "power2.out",
                            immediateRender: false,
                        },
                        `step${index}+=0.4`,
                    );
                }
            });
        },
        { scope: sectionRef },
    );

    return { sectionRef, containerRef, stepsRef };
}
