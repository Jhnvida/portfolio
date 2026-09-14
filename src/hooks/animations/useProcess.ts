import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { PROCESS_STEPS } from "../../data/process";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useProcess() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!sectionRef.current || !containerRef.current) return;

            const steps = gsap.utils.toArray<HTMLElement>(".process-step");
            if (steps.length === 0) return;

            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                gsap.set(steps, { opacity: 1, y: 0 });

                steps.forEach((step, i) => {
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
                        end: "+=150%",
                        pin: true,
                        pinType: "fixed",
                        scrub: true,
                        invalidateOnRefresh: true,
                    },
                });

                tl.to({}, { duration: 0.2 });

                PROCESS_STEPS.forEach((_, index) => {
                    if (index < PROCESS_STEPS.length - 1) {
                        const currentStep = steps[index];
                        const nextStep = steps[index + 1];

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
            });

            mm.add("(prefers-reduced-motion: reduce)", () => {
                gsap.set(steps, { opacity: 1, y: 0 });

                steps.forEach((step, i) => {
                    const elements = step.querySelectorAll("span, h3, p");
                    gsap.fromTo(
                        elements,
                        { opacity: 0 },
                        {
                            opacity: 1,
                            duration: 0.8,
                            ease: "power2.out",
                            stagger: 0.1,
                            scrollTrigger: {
                                trigger: step,
                                start: "top 80%",
                            },
                        },
                    );
                });
            });
        },
        { scope: sectionRef },
    );

    return { sectionRef, containerRef };
}
