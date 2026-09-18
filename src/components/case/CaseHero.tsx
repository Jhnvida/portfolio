"use client";

import { Project } from "../../types";
import { SplitText } from "../ui/SplitText";
import { useHero } from "../../hooks/animations/useHero";

interface CaseHeroProps {
    project: Project;
}

export function CaseHero({ project }: CaseHeroProps) {
    const { containerRef } = useHero();

    return (
        <section
            ref={containerRef}
            className="relative w-full flex flex-col justify-start bg-background pt-32 md:pt-40 lg:pt-48 pb-16 md:pb-24"
        >
            <div className="w-full max-w-(--container-page) mx-auto px-6 md:px-12 lg:px-24 flex flex-col items-start relative z-10">
                <h1 className="text-white text-5xl md:text-7xl lg:text-8xl xl:text-[7rem] font-medium tracking-tighter leading-none md:leading-[0.95] max-w-full lg:max-w-6xl mix-blend-difference wrap-break-word">
                    <SplitText text={project.title} />
                </h1>

                <div
                    className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 w-full gap-8 md:gap-12 border-t border-white/10 pt-8"
                    data-anim
                >
                    <div className="flex flex-col gap-2">
                        <span className="text-xs uppercase tracking-widest text-neutral-500 font-mono">Cliente</span>
                        <span className="text-base md:text-lg text-white font-medium">{project.client}</span>
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="text-xs uppercase tracking-widest text-neutral-500 font-mono">Ano</span>
                        <span className="text-base md:text-lg text-white font-medium">{project.year}</span>
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="text-xs uppercase tracking-widest text-neutral-500 font-mono">Papel</span>
                        <span className="text-base md:text-lg text-white font-medium">{project.impact}</span>
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="text-xs uppercase tracking-widest text-neutral-500 font-mono">Stack</span>
                        <span className="text-base md:text-lg text-neutral-400">
                            {project.stack.slice(0, 3).join(", ")}
                            {project.stack.length > 3 && " ..."}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
