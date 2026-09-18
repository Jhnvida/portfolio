"use client";

import { useProgressRail } from "../../hooks/animations/useProgressRail";
import { useSmoothScroll } from "../providers/SmoothScrollProvider";

const SECTIONS = [
    { id: "hero", label: "Início" },
    { id: "work", label: "Projetos" },
    { id: "process", label: "Como crio" },
    { id: "explorations", label: "Explorações" },
    { id: "contact", label: "Contato" },
];

export function SectionProgressRail() {
    const lenis = useSmoothScroll();

    const { containerRef } = useProgressRail(SECTIONS.map((s) => s.id));

    const handleScrollTo = (id: string) => {
        const section = document.getElementById(id);
        if (lenis && section) {
            lenis.scrollTo(section, { offset: 0, duration: 1.5 });
        } else if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div
            ref={containerRef}
            className="hidden md:flex flex-col items-center gap-2 fixed right-8 lg:right-12 top-1/2 -translate-y-1/2 z-50 pointer-events-auto"
        >
            {SECTIONS.map(({ id, label }) => (
                <div key={id} className="relative flex flex-col items-center justify-center">
                    <button
                        onClick={() => handleScrollTo(id)}
                        className="group relative flex items-center justify-center w-10 py-1.5 focus:outline-none cursor-pointer"
                        aria-label={`Ir para ${label}`}
                    >
                        <div
                            data-dash-indicator={id}
                            className="w-px bg-white/15 rounded-full pointer-events-none"
                            style={{ height: "16px" }}
                        />

                        <div className="absolute right-8 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] pointer-events-none whitespace-nowrap">
                            {label}
                        </div>
                    </button>
                </div>
            ))}
        </div>
    );
}
