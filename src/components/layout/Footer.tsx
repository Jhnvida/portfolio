import { ArrowUpRight } from "lucide-react";
import { CONTACT_ANCHOR, SITE, SOCIAL_LINKS } from "../../data/site";
import { ThemeToggle } from "../ui/ThemeToggle";
import { Grid } from "./Grid";
import { Section } from "./Section";

export function Footer() {
    const year = new Date().getFullYear();

    return (
        <Section
            as="footer"
            id={CONTACT_ANCHOR}
            className="pt-20 sm:pt-28 pb-[max(2.5rem,env(safe-area-inset-bottom))]"
        >
            <Grid>
                <div className="col-span-4 sm:col-span-8 lg:col-span-12 flex flex-col items-center text-center">
                    <span className="text-meta tracking-[0.08em] uppercase text-ink-3 mb-6">Contato</span>

                    <h2 className="text-[clamp(1.75rem,1.25rem+2vw,2.75rem)] font-medium text-ink tracking-[-0.03em] leading-[1.2]">
                        Vamos conversar.
                    </h2>

                    <div className="mt-6 mb-12">
                        <a
                            href={`mailto:${SITE.email}`}
                            className="group inline-flex items-center gap-1.5 text-[clamp(1.0625rem,0.9rem+0.8vw,1.375rem)] font-medium tracking-[-0.015em] text-ink-2 hover:text-ink transition-colors duration-200"
                        >
                            <span>{SITE.email}</span>
                            <ArrowUpRight
                                aria-hidden
                                size={14}
                                strokeWidth={2}
                                className="opacity-50 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            />
                        </a>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-meta text-ink-2 mb-16">
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

                    <div className="flex items-center justify-center gap-3 text-meta text-ink-3">
                        <span>
                            © {year} {SITE.name}
                        </span>
                        <span aria-hidden className="text-line select-none">
                            ·
                        </span>
                        <ThemeToggle />
                    </div>
                </div>
            </Grid>
        </Section>
    );
}
