import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { registerWorkPinHandlers } from "../../lib/workPinBridge";

gsap.registerPlugin(ScrollTrigger);

export function useProgressRail(sectionIds: string[]) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const createdTriggers: ScrollTrigger[] = [];
            let activeId: string | null = null;
            const getIndicator = (id: string) => document.querySelector<HTMLElement>(`[data-dash-indicator="${id}"]`);

            const animateIndicator = (el: HTMLElement, active: boolean) => {
                gsap.to(el, {
                    height: active ? 36 : 16,
                    backgroundColor: active ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.15)",
                    duration: 0.5,
                    ease: "power2.out",
                    overwrite: "auto",
                });
            };

            const activate = (id: string) => {
                if (activeId === id) return;

                if (activeId !== null) {
                    const prev = getIndicator(activeId);
                    if (prev) animateIndicator(prev, false);
                }

                activeId = id;
                const el = getIndicator(id);
                if (el) animateIndicator(el, true);
            };

            const deactivate = (id: string) => {
                if (activeId !== id) return;
                activeId = null;
                const el = getIndicator(id);
                if (el) animateIndicator(el, false);
            };

            sectionIds.forEach((id) => {
                const el = getIndicator(id);
                if (el) gsap.set(el, { height: 16, backgroundColor: "rgba(255, 255, 255, 0.15)" });
            });

            const unregisterWorkPin = registerWorkPinHandlers({
                onEnter: () => activate("work"),
                onLeave: () => deactivate("work"),
                onEnterBack: () => activate("work"),
                onLeaveBack: () => deactivate("work"),

                onPinSetupDone: (pinCreated) => {
                    if (!pinCreated) {
                        const workEl = document.getElementById("work");
                        if (workEl) {
                            createdTriggers.push(
                                ScrollTrigger.create({
                                    trigger: workEl,
                                    start: "top center",
                                    end: "bottom center",
                                    onEnter: () => activate("work"),
                                    onLeave: () => deactivate("work"),
                                    onEnterBack: () => activate("work"),
                                    onLeaveBack: () => deactivate("work"),
                                }),
                            );
                        }
                    }

                    sectionIds
                        .filter((id) => id !== "work")
                        .forEach((id) => {
                            const el = document.getElementById(id);
                            if (!el) return;
                            createdTriggers.push(
                                ScrollTrigger.create({
                                    trigger: el,
                                    start: id === "contact" ? "top 75%" : "top center",
                                    end: id === "contact" ? "bottom bottom" : "bottom center",
                                    onEnter: () => activate(id),
                                    onLeave: () => deactivate(id),
                                    onEnterBack: () => activate(id),
                                    onLeaveBack: () => deactivate(id),
                                })
                            );
                        });
                },
            });

            return () => {
                createdTriggers.forEach((st) => st.kill());
                unregisterWorkPin();
            };
        },
        { scope: containerRef, dependencies: [sectionIds] },
    );

    return { containerRef };
}
