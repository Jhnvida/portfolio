export const MOTION = {
    ease: {
        entrance: "power3.out",
        micro: "power2.out",
        sharedElement: "cubic-bezier(0.2, 0.8, 0.2, 1)",
        exit: "power2.in",
    },

    duration: {
        instant: 0.08,
        fast: 0.18,
        normal: 0.25,
        content: 0.65,
        entrance: 0.75,
        sharedElement: 0.7,
        scroll: 1.1,
    },

    distance: {
        micro: 2,
        subtle: 8,
        content: 16,
        section: 20,
    },
} as const;

export const CSS_EASE = {
    micro: "cubic-bezier(0.16, 1, 0.3, 1)",
    standard: "cubic-bezier(0.22, 1, 0.36, 1)",
    smooth: "cubic-bezier(0.25, 1, 0.5, 1)",
} as const;
