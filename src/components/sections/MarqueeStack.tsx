"use client";

import { motion } from "motion/react";

const STACK_ITEMS = [
    "Next.js & React",
    "Vite & React",
    "TypeScript",
    "Node.js & APIs",
    "UI/UX Motion",
    "Arquitetura Escalável",
];

const MARQUEE_ITEMS = [...STACK_ITEMS, ...STACK_ITEMS, ...STACK_ITEMS, ...STACK_ITEMS];

export function MarqueeStack() {
    return (
        <div className="w-full border-y border-white/10 py-4 mt-20 overflow-hidden">
            <div className="w-full max-w-(--container-page) mx-auto px-6 md:px-12 lg:px-24 relative">
                <div
                    className="w-full overflow-hidden"
                    style={{
                        maskImage:
                            "linear-gradient(to right, transparent, black 80px, black calc(100% - 80px), transparent)",
                        WebkitMaskImage:
                            "linear-gradient(to right, transparent, black 80px, black calc(100% - 80px), transparent)",
                    }}
                >
                    <motion.div
                        animate={{ x: ["0%", "-25%"] }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 30,
                        }}
                        className="flex w-max"
                    >
                        <ul className="flex items-center text-xs sm:text-sm text-neutral-400 tracking-wide">
                            {MARQUEE_ITEMS.map((item, index) => (
                                <li
                                    key={index}
                                    className="border-r border-white/10 px-8 whitespace-nowrap"
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
