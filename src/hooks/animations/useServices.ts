import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useServices() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            if (!sectionRef.current) return;

            const mm = gsap.matchMedia();
            const serviceCards = gsap.utils.toArray<HTMLElement>(".service-card");

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                serviceCards.forEach((card) => {
                    const glow = card.querySelector(".service-glow") as HTMLElement;

                    ScrollTrigger.create({
                        trigger: card,
                        start: "top 60%",
                        end: "bottom 40%",
                        toggleClass: "is-active",
                    });

                    if (glow) {
                        const xTo = gsap.quickTo(glow, "x", { duration: 0.6, ease: "power3.out" });
                        const yTo = gsap.quickTo(glow, "y", { duration: 0.6, ease: "power3.out" });

                        const onMouseMove = (e: MouseEvent) => {
                            const rect = card.getBoundingClientRect();
                            const x = e.clientX - rect.left - glow.offsetWidth / 2;
                            const y = e.clientY - rect.top - glow.offsetHeight / 2;
                            xTo(x);
                            yTo(y);
                        };

                        const onMouseEnter = () => {
                            gsap.to(glow, { opacity: 1, duration: 0.3, ease: "power2.out" });
                        };

                        const onMouseLeave = () => {
                            gsap.to(glow, { opacity: 0, duration: 0.5, ease: "power2.inOut" });
                        };

                        card.addEventListener("mousemove", onMouseMove);
                        card.addEventListener("mouseenter", onMouseEnter);
                        card.addEventListener("mouseleave", onMouseLeave);

                        return () => {
                            card.removeEventListener("mousemove", onMouseMove);
                            card.removeEventListener("mouseenter", onMouseEnter);
                            card.removeEventListener("mouseleave", onMouseLeave);
                        };
                    }
                });
            });

            mm.add("(prefers-reduced-motion: reduce)", () => {
                gsap.set(serviceCards, { opacity: 1, scale: 1 });
            });
        },
        { scope: sectionRef },
    );

    return { sectionRef };
}
