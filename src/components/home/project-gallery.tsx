"use client";

import { PROJECTS, type ProjectItem } from "@/data/projects";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function FullscreenProjectCard({
    project,
    index,
    cardRef,
    imageRef,
}: {
    project: ProjectItem;
    index: number;
    cardRef: (el: HTMLElement | null) => void;
    imageRef: (el: HTMLDivElement | null) => void;
}) {
    const [imageError, setImageError] = useState(false);
    const hasImage = Boolean(project.imageSrc && !imageError);

    return (
        <article
            ref={cardRef}
            data-project-card
            data-shared-project={project.slug}
            style={{ zIndex: (index + 1) * 10 }}
            className="group/card sticky top-0 h-dvh w-full py-4 sm:py-6 md:py-8 bg-surface-subtle"
        >
            <div className="h-full w-full max-w-360 mx-auto px-6 md:px-10 lg:px-12 xl:px-16">
                <div className="relative h-full w-full overflow-hidden bg-neutral-900">
                    <div
                        ref={imageRef}
                        data-shared-image-container
                        className="absolute inset-0 h-full w-full overflow-hidden bg-neutral-900 will-change-transform"
                    >
                        {hasImage ? (
                            <img
                                src={project.imageSrc}
                                alt={`Interface do projeto ${project.title}`}
                                className="h-full w-full object-cover object-center transform-gpu transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-[1.01]"
                                onError={() => setImageError(true)}
                            />
                        ) : (
                            <div
                                aria-hidden="true"
                                className="h-full w-full bg-neutral-800 flex items-center justify-center"
                            >
                                <span className="font-heading text-4xl sm:text-6xl font-medium text-neutral-400">
                                    {project.title}
                                </span>
                            </div>
                        )}

                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 sm:h-2/5 bg-linear-to-t from-black/80 via-black/35 to-transparent"
                        />
                    </div>

                    <Link
                        href={`/${project.slug}`}
                        prefetch={true}
                        data-shared-project={project.slug}
                        data-cursor="project"
                        data-cursor-text="Ver projeto"
                        className="absolute inset-0 z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
                        aria-label={`Ver detalhes do projeto: ${project.title}`}
                    />

                    <div className="relative z-15 flex h-full w-full flex-col justify-end px-6 py-8 sm:px-10 sm:py-10 md:px-12 md:py-12 lg:px-14 lg:py-14 text-white pointer-events-none">
                        <div className="max-w-3xl text-left pointer-events-none">
                            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white transition-colors duration-200 group-hover/card:text-white/95">
                                {project.title}
                            </h2>

                            {project.summary && (
                                <p className="mt-3 sm:mt-4 font-sans text-sm sm:text-base md:text-lg leading-relaxed text-white/80 max-w-2xl sm:max-w-3xl">
                                    {project.summary}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}

export function ProjectGallery() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardRefs = useRef<(HTMLElement | null)[]>([]);
    const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) {
            ScrollTrigger.refresh();
            return;
        }

        const ctx = gsap.context(() => {
            cardRefs.current.forEach((card, idx) => {
                if (idx === 0 || !card) return;
                const imgContainer = imageRefs.current[idx];
                if (!imgContainer) return;

                gsap.fromTo(
                    imgContainer,
                    { yPercent: -5 },
                    {
                        yPercent: 0,
                        ease: "none",
                        scrollTrigger: {
                            trigger: card,
                            start: "top bottom",
                            end: "top top",
                            scrub: true,
                        },
                    },
                );
            });
        });

        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 120);

        return () => {
            clearTimeout(timer);
            ctx.revert();
        };
    }, []);

    useEffect(() => {
        let snapTimeout: NodeJS.Timeout | null = null;
        let isProgrammatic = false;

        const handleScroll = () => {
            if (snapTimeout) {
                clearTimeout(snapTimeout);
            }

            snapTimeout = setTimeout(() => {
                if (isProgrammatic) {
                    isProgrammatic = false;
                    return;
                }

                const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                if (prefersReducedMotion) return;

                const sectionEl = sectionRef.current;
                if (!sectionEl) return;

                const globalLenis = (window as unknown as { __lenis?: Lenis }).__lenis;
                if (!globalLenis) return;

                const rect = sectionEl.getBoundingClientRect();
                const vh = window.innerHeight;
                const totalCards = PROJECTS.length;

                if (rect.top > vh * 0.4 || rect.bottom < vh * 0.5) return;

                const currentScroll = window.scrollY || document.documentElement.scrollTop;
                const sectionStartScroll = currentScroll + rect.top;

                const targetPoints: number[] = [];
                for (let i = 0; i < totalCards; i++) {
                    targetPoints.push(Math.round(sectionStartScroll + i * vh));
                }

                const lastCardTarget = targetPoints[totalCards - 1];
                if (currentScroll > lastCardTarget + 20) return;

                let closestTarget = targetPoints[0];
                let minDiff = Math.abs(currentScroll - closestTarget);

                for (let i = 1; i < targetPoints.length; i++) {
                    const diff = Math.abs(currentScroll - targetPoints[i]);
                    if (diff < minDiff) {
                        minDiff = diff;
                        closestTarget = targetPoints[i];
                    }
                }

                if (minDiff > 3 && minDiff < vh * 0.4) {
                    isProgrammatic = true;
                    globalLenis.scrollTo(closestTarget, {
                        duration: 0.32,
                        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -8 * t)),
                        onComplete: () => {
                            isProgrammatic = false;
                        },
                    });
                }
            }, 45);
        };

        const handleUserInput = () => {
            isProgrammatic = false;
            if (snapTimeout) {
                clearTimeout(snapTimeout);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("wheel", handleUserInput, { passive: true });
        window.addEventListener("touchstart", handleUserInput, { passive: true });

        return () => {
            if (snapTimeout) clearTimeout(snapTimeout);
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("wheel", handleUserInput);
            window.removeEventListener("touchstart", handleUserInput);
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            id="projetos"
            aria-label="Projetos selecionados"
            className="relative w-full bg-surface-subtle scroll-mt-0"
        >
            {PROJECTS.map((project, index) => (
                <FullscreenProjectCard
                    key={project.slug}
                    project={project}
                    index={index}
                    cardRef={(el) => {
                        cardRefs.current[index] = el;
                    }}
                    imageRef={(el) => {
                        imageRefs.current[index] = el;
                    }}
                />
            ))}
        </section>
    );
}
