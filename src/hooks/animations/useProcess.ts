import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

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

            mm.add(
                {
                    isDesktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
                    isMobile: "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
                    isReduced: "(prefers-reduced-motion: reduce)",
                },
                (context) => {
                    const { isDesktop, isMobile, isReduced } = context.conditions as { [key: string]: boolean };

                    if (isReduced) {
                        gsap.from(steps, {
                            opacity: 0,
                            duration: 0.8,
                            stagger: 0.1,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: sectionRef.current,
                                start: "top 80%",
                            },
                        });
                        return;
                    }

                    if (isDesktop) {
                        const tl = gsap.timeline({
                            scrollTrigger: {
                                trigger: sectionRef.current,
                                start: "center center",
                                end: "+=150%",
                                pin: true,
                                scrub: 1,
                                invalidateOnRefresh: true,
                            },
                        });

                        steps.forEach((step, index) => {
                            gsap.set(step, { opacity: 0.2, y: 20 });

                            tl.to(
                                step,
                                {
                                    opacity: 1,
                                    y: 0,
                                    duration: 1,
                                    ease: "power2.out",
                                },
                                index * 0.8,
                            );
                        });

                        tl.to({}, { duration: 1.5 });
                    }

                    if (isMobile) {
                        steps.forEach((step) => {
                            gsap.set(step, { opacity: 0.2, y: 20 });

                            gsap.to(step, {
                                opacity: 1,
                                y: 0,
                                scrollTrigger: {
                                    trigger: step,
                                    start: "top 85%",
                                    end: "center center",
                                    scrub: 1,
                                },
                            });
                        });
                    }
                },
            );
        },
        { scope: sectionRef },
    );

    return { sectionRef, containerRef };
}
