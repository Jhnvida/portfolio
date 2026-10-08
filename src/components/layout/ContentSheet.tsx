"use client";

import { ArrowLeft, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { AboutContent } from "../about/AboutContent";
import { ProjectDetailContent } from "../projects/ProjectDetailContent";
import { WorkContent } from "../projects/WorkContent";
import { useSheet } from "../providers/SheetProvider";
import { useSmoothScroll } from "../providers/SmoothScroll";
import { Button, IconButton } from "../ui/Button";
import { Grid } from "./Grid";

export function ContentSheet() {
    const { sheet, isOpen, closeSheet, backToWork, openProject } = useSheet();
    const { getLenis, registerModalScroll } = useSmoothScroll();
    const contentScrollRef = useRef<HTMLDivElement>(null);
    const contentInnerRef = useRef<HTMLDivElement>(null);
    const triggerElementRef = useRef<HTMLElement | null>(null);
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = useCallback(() => {
        setIsClosing(true);
        setTimeout(() => {
            closeSheet();
            setIsClosing(false);
            triggerElementRef.current?.focus?.();
        }, 360);
    }, [closeSheet]);

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

            return () => {
                cleanupModalScroll?.();
                document.body.style.overflow = originalOverflow;
            };
        }
    }, [isOpen, isClosing, registerModalScroll]);

    useEffect(() => {
        if (contentScrollRef.current) {
            const activeLenis = getLenis();
            if (activeLenis) {
                activeLenis.scrollTo(0, { immediate: true });
            } else {
                contentScrollRef.current.scrollTo(0, 0);
            }
        }
    }, [sheet, getLenis]);

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
                className={`fixed inset-0 z-40 bg-ink/15 dark:bg-black/50 transition-opacity duration-360 ease-out-soft pointer-events-auto ${
                    isClosing ? "opacity-0" : "opacity-100"
                }`}
            />

            <section
                role="dialog"
                aria-modal="true"
                aria-label={
                    sheet?.type === "work"
                        ? "Arquivo de Projetos"
                        : sheet?.type === "about"
                          ? "Sobre Mim"
                          : "Detalhes do Projeto"
                }
                className={`fixed inset-x-0 bottom-0 top-10 sm:top-14 z-50 flex flex-col rounded-t-3xl sm:rounded-t-4xl bg-bg text-ink border-t border-x border-line/60 dark:border-line/40 shadow-[0_-8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_-12px_40px_rgba(0,0,0,0.4)] pointer-events-auto ${
                    isClosing
                        ? "translate-y-full transition-transform duration-360 ease-out-soft"
                        : "animate-[sheet-rise_380ms_var(--ease-out-soft)_forwards]"
                }`}
            >
                <header className="sticky top-0 z-30 w-full bg-bg/95 backdrop-blur-md rounded-t-3xl sm:rounded-t-4xl pt-3 pb-3 section-frame-bottom">
                    <div className="flex justify-center pb-2">
                        <div aria-hidden="true" className="h-1 w-10 sm:w-12 rounded-full bg-ink-3/20" />
                    </div>

                    <Grid>
                        <div className="col-span-4 sm:col-span-8 lg:col-span-12 flex items-center justify-between">
                            <div className="flex items-center min-w-0">
                                {canBackToWork ? (
                                    <Button
                                        variant="secondary"
                                        onClick={backToWork}
                                        icon={
                                            <ArrowLeft
                                                size={14}
                                                strokeWidth={2}
                                                className="transition-transform duration-200 group-hover:-translate-x-0.5"
                                            />
                                        }
                                    >
                                        Projetos
                                    </Button>
                                ) : (
                                    <span className="text-meta uppercase tracking-[0.08em] text-ink-3 font-medium select-none">
                                        {sheet?.type === "work"
                                            ? "Arquivo de Projetos"
                                            : sheet?.type === "about"
                                              ? "Sobre Mim"
                                              : "Projeto"}
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                                <IconButton onClick={handleClose} aria-label="Fechar" title="Fechar">
                                    <X size={15} strokeWidth={2} />
                                </IconButton>
                            </div>
                        </div>
                    </Grid>
                </header>

                <div
                    ref={contentScrollRef}
                    className="flex-1 overflow-y-auto overscroll-contain w-full pt-8 pb-[max(5rem,env(safe-area-inset-bottom)+2rem)] sm:pt-12 sm:pb-28"
                >
                    <div ref={contentInnerRef} className="w-full">
                        {sheet?.type === "work" && <WorkContent onSelectProject={(slug) => openProject(slug, true)} />}

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
