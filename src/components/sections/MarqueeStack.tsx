"use client";

import { STACK_ITEMS } from "../../data/navigation";
import { useMarquee } from "../../hooks/animations/useMarquee";

const MARQUEE_ITEMS = [...STACK_ITEMS, ...STACK_ITEMS, ...STACK_ITEMS, ...STACK_ITEMS];

export function MarqueeStack() {
    const { trackRef } = useMarquee();

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
                    <div ref={trackRef} className="flex w-max">
                        <ul className="flex items-center text-xs sm:text-sm text-neutral-400 tracking-wide">
                            {MARQUEE_ITEMS.map((item, index) => (
                                <li key={index} className="border-r border-white/10 px-8 whitespace-nowrap">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
