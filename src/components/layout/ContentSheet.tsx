"use client";

import { ArrowLeft, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { getAllProjects } from "../../data/projects";
import { AboutContent } from "../about/AboutContent";
import { ProjectDetailContent } from "../projects/ProjectDetailContent";
import { ProjectPreviewStage } from "../projects/ProjectPreviewStage";
import { WorkContent } from "../projects/WorkContent";
import { useSheet } from "../providers/SheetProvider";
import { useSmoothScroll } from "../providers/SmoothScroll";

export function ContentSheet() {
    const { sheet, isOpen, closeSheet, backToWork, openProject } = useSheet();
    const { getLenis, registerModalScroll } = useSmoothScroll();
    const allProjects = getAllProjects();
    const contentScrollRef = useRef<HTMLDivElement>(null);
    const contentInnerRef = useRef<HTMLDivElement>(null);
    const dialogRef = useRef<HTMLElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const triggerElementRef = useRef<HTMLElement | null>(null);
    const [isClosing, setIsClosing] = useState(false);
    const [hoveredImage, setHoveredImage] = useState<string | null>(null);

    const handleClose = useCallback(() => {
        setIsClosing(true);
        setHoveredImage(null);
        setTimeout(() => {
            closeSheet();
            setIsClosing(false);
            triggerElementRef.current?.focus?.();
        }, 360);
    }, [closeSheet, setHoveredImage]);

    useEffect(() => {
        if (isOpen && !isClosing) {
            if (typeof document !== "undefined") {
                triggerElementRef.current = document.activeElement as HTMLElement | null;
            }
            const originalOverflow = document.body.style.overflow;
            document.body.style.overflow = "hidden";

            let cleanupModalScroll: (() => void) | undefined;
            if (contentScrollRef.current) {
                cleanupModalScroll = registerModalScroll(
                    contentScrollRef.current,
                    contentInnerRef.current ?? undefined,
                );
            }

            const focusTimer = setTimeout(() => {
                closeButtonRef.current?.focus();
            }, 60);

            return () => {
                clearTimeout(focusTimer);
                cleanupModalScroll?.();
                document.body.style.overflow = originalOverflow;
            };
        }
    }, [isOpen, isClosing, registerModalScroll]);

    const activeSlug = sheet?.type === "project" ? sheet.slug : null;
    const activeType = sheet?.type ?? null;
    useEffect(() => {
        if (contentScrollRef.current) {
            const activeLenis = getLenis();
            if (activeLenis) {
                activeLenis.scrollTo(0, { immediate: true });
            } else {
                contentScrollRef.current.scrollTo(0, 0);
            }
        }
    }, [activeSlug, activeType, getLenis]);

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                e.preventDefault();
                handleClose();
            }
        },
        [handleClose],
    );

    useEffect(() => {
        if (!isOpen) return;
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, handleKeyDown]);

    if (!isOpen && !isClosing) {
        return null;
    }

    const isProject = sheet?.type === "project";
    const canBackToWork = isProject && sheet.returnToWork;

    return (
        <div className="fixed inset-0 z-50 pointer-events-none">
            <div
                onClick={handleClose}
                aria-hidden="true"
                className={`fixed inset-0 z-40 bg-ink/20 dark:bg-black/60 backdrop-blur-[2px] transition-opacity duration-360 ease-out pointer-events-auto ${
                    isClosing ? "opacity-0" : "opacity-100"
                }`}
            />

            {sheet?.type === "work" && (
                <ProjectPreviewStage targetImage={hoveredImage} projects={allProjects} isDrawerClosing={isClosing} />
            )}

            <section
                ref={dialogRef}
                tabIndex={-1}
                role="dialog"
                aria-modal="true"
                aria-label={
                    sheet?.type === "work"
                        ? "Arquivo de Projetos"
                        : sheet?.type === "about"
                          ? "Sobre Mim"
                          : "Detalhes do Projeto"
                }
                className={`fixed inset-y-0 right-0 z-50 flex flex-col bg-bg text-ink border-l border-line/70 dark:border-line/40 shadow-[-16px_0_48px_rgba(0,0,0,0.06)] dark:shadow-[-24px_0_64px_rgba(0,0,0,0.5)] pointer-events-auto outline-none
                    w-full sm:w-[88vw] md:w-[68vw] lg:w-[54vw] xl:w-[48vw] max-w-220
                    ${isClosing ? "animate-panel-out" : "animate-panel-in"}`}
            >
                <header className="sticky top-0 z-30 w-full bg-bg/95 backdrop-blur-md border-b border-line/60 dark:border-line/40 px-6 sm:px-10 md:px-12 h-14 sm:h-16 flex items-center justify-between shrink-0">
                    <div className="flex items-center min-w-0">
                        {canBackToWork ? (
                            <button
                                type="button"
                                onClick={backToWork}
                                className="group inline-flex items-center gap-2 text-meta uppercase tracking-[0.08em] text-ink-2 hover:text-ink transition-colors cursor-pointer"
                            >
                                <ArrowLeft
                                    size={14}
                                    strokeWidth={2}
                                    className="transition-transform duration-200 group-hover:-translate-x-1"
                                />
                                <span>Arquivo</span>
                            </button>
                        ) : (
                            <span className="text-meta uppercase tracking-[0.08em] text-ink-3 font-medium select-none truncate">
                                {sheet?.type === "work"
                                    ? "Arquivo de Projetos"
                                    : sheet?.type === "about"
                                      ? "Sobre Mim"
                                      : "Projeto"}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                        <button
                            ref={closeButtonRef}
                            type="button"
                            onClick={handleClose}
                            aria-label="Fechar painel"
                            title="Fechar (Esc)"
                            className="group flex items-center gap-1.5 px-2 py-1.5 -mr-1.5 rounded-md text-ink-2 hover:text-ink hover:bg-surface/80 transition-colors cursor-pointer text-meta"
                        >
                            <span className="hidden sm:inline font-mono text-[10px] text-ink-3 group-hover:text-ink-2 border border-line/80 px-1 py-0.2 rounded select-none">
                                ESC
                            </span>
                            <X size={16} strokeWidth={2} />
                        </button>
                    </div>
                </header>

                <div
                    ref={contentScrollRef}
                    className="flex-1 overflow-y-auto overscroll-contain w-full pt-8 pb-[max(5rem,env(safe-area-inset-bottom)+2rem)] sm:pt-10 sm:pb-24 px-6 sm:px-10 md:px-12"
                >
                    <div ref={contentInnerRef} className="w-full">
                        {sheet?.type === "work" && (
                            <WorkContent
                                onSelectProject={(slug) => openProject(slug, true)}
                                onHoverProject={setHoveredImage}
                            />
                        )}

                        {sheet?.type === "about" && <AboutContent />}

                        {sheet?.type === "project" && (
                            <ProjectDetailContent
                                slug={sheet.slug}
                                onBackToWork={sheet.returnToWork ? backToWork : undefined}
                                onSelectProject={(slug) => openProject(slug, sheet.returnToWork)}
                            />
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
