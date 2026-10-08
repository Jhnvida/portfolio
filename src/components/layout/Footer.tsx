import { ArrowUpRight } from "lucide-react";
import { CONTACT_ANCHOR, SITE, SOCIAL_LINKS } from "../../data/site";
import { Button } from "../ui/Button";
import { Grid } from "./Grid";
import { Section } from "./Section";

export function Footer() {
    const year = new Date().getFullYear();

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
                            href={`mailto:${SITE.email}`}
                            variant="primary"
                            endIcon={
                                <ArrowUpRight
                                    aria-hidden
                                    size={14}
                                    strokeWidth={2}
                                    className="opacity-70 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                />
                            }
                        >
                            {SITE.email}
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
