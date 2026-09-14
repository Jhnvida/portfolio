import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

export function useMarquee() {
    const trackRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                gsap.to(trackRef.current, {
                    xPercent: -25,
                    duration: 30,
                    ease: "none",
                    repeat: -1,
                });
            });

            mm.add("(prefers-reduced-motion: reduce)", () => {
                gsap.set(trackRef.current, { xPercent: 0 });
            });
        },
        { scope: trackRef },
    );

    return { trackRef };
}
