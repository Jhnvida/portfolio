import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

if (typeof window !== "undefined") {
    gsap.registerPlugin(CustomEase);
    try {
        CustomEase.create("sharedElement", "0.22, 1, 0.36, 1");
        CustomEase.create("tickerEase", "0.16, 1, 0.3, 1");
        CustomEase.create("editorialEntrance", "0.16, 1, 0.3, 1");
        CustomEase.create("smoothOut", "0.25, 1, 0.5, 1");
    } catch {}
}

export const MOTION = {
    ease: {
        entrance: "power3.out",
        smooth: "power3.out",
        micro: "power2.out",
        sharedElement: "sharedElement",
        ticker: "tickerEase",
        editorial: "editorialEntrance",
        exit: "power2.in",
    },

    duration: {
        instant: 0.08,
        fast: 0.2,
        normal: 0.3,
        content: 0.65,
        entrance: 0.85,
        sharedElement: 0.44,
        scroll: 1.05,
    },

    distance: {
        micro: 2,
        subtle: 6,
        content: 14,
        section: 18,
    },
} as const;

export const CSS_EASE = {
    micro: "cubic-bezier(0.16, 1, 0.3, 1)",
    standard: "cubic-bezier(0.22, 1, 0.36, 1)",
    smooth: "cubic-bezier(0.25, 1, 0.5, 1)",
} as const;
