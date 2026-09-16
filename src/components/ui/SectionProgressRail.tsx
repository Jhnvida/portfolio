"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useSmoothScroll } from "../providers/SmoothScrollProvider";

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
    { id: "hero", label: "Início" },
    { id: "work", label: "Trabalhos" },
    { id: "process", label: "Processo" },
    { id: "services", label: "Serviços" },
    { id: "contact", label: "Contato" },
];

export function SectionProgressRail() {
    const containerRef = useRef<HTMLDivElement>(null);
    const lenis = useSmoothScroll();

    useGSAP(
        () => {
            ScrollTrigger.refresh();

            SECTIONS.forEach(({ id }) => {
                const section = document.getElementById(id);
                const line = document.querySelector(`[data-progress-indicator="${id}"]`);
                const dot = document.querySelector(`[data-dot-indicator="${id}"]`);

                if (section) {
                    const tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: section,
                            start: "top center",
                            end: "bottom center",
                            scrub: true,
                            refreshPriority: -1,
                            onToggle: (self) => {
                                if (dot) {
                                    gsap.to(dot, {
                                        backgroundColor: self.isActive ? "#ffffff" : "rgba(255, 255, 255, 0.2)",
                                        scale: self.isActive ? 1.5 : 1,
                                        boxShadow: self.isActive ? "0 0 12px rgba(255,255,255,0.4)" : "none",
                                        duration: 0.3,
                                        ease: "power2.out",
                                    });
                                }
                            },
                        },
                    });

                    if (line) {
                        tl.fromTo(line, { scaleY: 0 }, { scaleY: 1, ease: "none" }, 0);
                    }
                }
            });
        },
        { scope: containerRef, dependencies: [] },
    );

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
            className="hidden md:flex flex-col items-center fixed left-8 top-1/2 -translate-y-1/2 z-50 pointer-events-auto"
        >
            {SECTIONS.map(({ id, label }, index) => {
                const isLast = index === SECTIONS.length - 1;

                return (
                    <div key={id} className="relative flex flex-col items-center">
                        <button
                            onClick={() => handleScrollTo(id)}
                            className="group relative flex items-center justify-center w-8 h-8 focus:outline-none"
                            aria-label={`Ir para ${label}`}
                        >
                            <div
                                data-dot-indicator={id}
                                className="w-1.25 h-1.25 rounded-full bg-white/20 transition-colors"
                            />

                            <div className="absolute left-8 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] pointer-events-none whitespace-nowrap">
                                {label}
                            </div>
                        </button>

                        {!isLast && (
                            <div className="w-px h-10 lg:h-14 bg-white/10 relative">
                                <div
                                    data-progress-indicator={id}
                                    className="absolute top-0 left-0 w-full h-full bg-white origin-top"
                                    style={{ transform: "scaleY(0)" }}
                                />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
