"use client";

import { Check, Copy } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { CONTACT_ANCHOR, SITE, SOCIAL_LINKS } from "../../data/site";
import { Button } from "../ui/Button";
import { Grid } from "./Grid";
import { Section } from "./Section";

export function Footer() {
    const year = new Date().getFullYear();
    const [copied, setCopied] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleCopy = useCallback(async () => {
        if (typeof window === "undefined" || !navigator.clipboard?.writeText) {
            return;
        }

        try {
            await navigator.clipboard.writeText(SITE.email);
            setCopied(true);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);

            timeoutRef.current = setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch {
        }
    }, []);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    return (
        <Section
            as="footer"
            id={CONTACT_ANCHOR}
            bottomLine={true}
            className="scroll-mt-14 sm:scroll-mt-16 pt-16 sm:pt-24 pb-[max(3rem,env(safe-area-inset-bottom)+1.5rem)]"
        >
            <Grid>
                <div className="col-span-4 sm:col-span-8 lg:col-span-12 flex flex-col items-start text-left">
                    <span className="text-meta tracking-[0.08em] uppercase text-ink-3 mb-4 sm:mb-5">Contato</span>

                    <h2 className="text-display font-medium text-ink">Vamos conversar?</h2>

                    <p className="mt-3 sm:mt-4 text-lead text-ink-2 max-w-lg leading-relaxed">
                        Se você precisa de um site ou quer trocar uma ideia, me manda um e-mail.
                    </p>

                    <div className="mt-8 sm:mt-10">
                        <Button
                            type="button"
                            onClick={handleCopy}
                            variant="primary"
                            aria-label={
                                copied ? "E-mail copiado para a área de transferência" : `Copiar e-mail: ${SITE.email}`
                            }
                            title={copied ? "Copiado!" : "Copiar e-mail"}
                            endIcon={
                                <span
                                    className="relative flex items-center justify-center h-3.5 w-3.5 shrink-0"
                                    aria-hidden="true"
                                >
                                    <Copy
                                        size={13}
                                        strokeWidth={2}
                                        className={`absolute inset-0 m-auto transition-all duration-200 ${
                                            copied
                                                ? "opacity-0 scale-50 rotate-45"
                                                : "opacity-70 scale-100 rotate-0 group-hover:opacity-100"
                                        }`}
                                    />
                                    <Check
                                        size={13}
                                        strokeWidth={2.5}
                                        className={`absolute inset-0 m-auto transition-all duration-200 text-emerald-400 ${
                                            copied ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 -rotate-45"
                                        }`}
                                    />
                                </span>
                            }
                        >
                            <span>{SITE.email}</span>
                            <span className="sr-only" aria-live="polite">
                                {copied ? " (E-mail copiado!)" : ""}
                            </span>
                        </Button>
                    </div>

                    <div className="divider-dashed mt-16 sm:mt-24 mb-8 sm:mb-10" />

                    <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 text-meta">
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-ink-2">
                            {SOCIAL_LINKS.filter((l) => !l.href.startsWith("mailto:")).map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-ink transition-colors duration-200"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>

                        <div className="flex items-center text-ink-3">
                            <span>
                                © {year} {SITE.name}
                            </span>
                        </div>
                    </div>
                </div>
            </Grid>
        </Section>
    );
}
