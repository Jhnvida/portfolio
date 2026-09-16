import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { RefObject } from "react";

export function useMagnetic(ref: RefObject<HTMLElement | null>, strength: number = 0.3) {
    useGSAP(
        () => {
            const element = ref.current;
            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference) and (hover: hover)", () => {
                if (!element) return;

                const xTo = gsap.quickTo(element, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
                const yTo = gsap.quickTo(element, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

                const handleMouseMove = (e: MouseEvent) => {
                    const rect = element.getBoundingClientRect();

                    const currentX = (gsap.getProperty(element, "x") as number) || 0;
                    const currentY = (gsap.getProperty(element, "y") as number) || 0;

                    const centerX = rect.left - currentX + rect.width / 2;
                    const centerY = rect.top - currentY + rect.height / 2;

                    const distanceX = e.clientX - centerX;
                    const distanceY = e.clientY - centerY;

                    xTo(distanceX * strength);
                    yTo(distanceY * strength);
                };

                const handleMouseLeave = () => {
                    xTo(0);
                    yTo(0);
                };

                element.addEventListener("mousemove", handleMouseMove);
                element.addEventListener("mouseleave", handleMouseLeave);

                return () => {
                    element.removeEventListener("mousemove", handleMouseMove);
                    element.removeEventListener("mouseleave", handleMouseLeave);
                };
            });
        },
        { scope: ref, dependencies: [strength] },
    );
}
