import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function useProgressRail(sectionIds: string[]) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            ScrollTrigger.refresh();

            sectionIds.forEach((id) => {
                const section = document.getElementById(id);
                const indicator = document.querySelector(`[data-dash-indicator="${id}"]`);

                if (section && indicator) {
                    gsap.set(indicator, {
                        height: 16,
                        backgroundColor: "rgba(255, 255, 255, 0.15)",
                    });

                    ScrollTrigger.create({
                        trigger: section,
                        start: "top center",
                        end: "bottom center",
                        onToggle: (self) => {
                            gsap.to(indicator, {
                                height: self.isActive ? 36 : 16,
                                backgroundColor: self.isActive ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.15)",
                                duration: 0.5,
                                ease: "power2.out",
                                overwrite: "auto",
                            });
                        },
                    });
                }
            });
        },
        { scope: containerRef, dependencies: [sectionIds] },
    );

    return { containerRef };
}
