import { CONTACT_ANCHOR, SITE, SOCIAL_LINKS } from "../../data/site";

export function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="w-full px-2 sm:px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
            <section
                id={CONTACT_ANCHOR}
                aria-labelledby="contact-title"
                className="mx-auto flex min-h-96 sm:min-h-128 w-full max-w-240 scroll-mt-4 flex-col rounded-panel bg-surface"
            >
                <div className="flex flex-1 flex-col items-center justify-center py-14 px-4 sm:py-20 sm:px-6 text-center">
                    <div className="flex flex-col items-center gap-3 max-w-xl">
                        <h2 id="contact-title" className="text-display font-medium text-ink">
                            Vamos conversar sobre o seu projeto
                        </h2>

                        <p className="max-w-lg text-body text-ink-2 leading-relaxed">
                            Tem uma ideia em mente, precisa de um novo site ou quer tirar alguma dúvida? Fique à vontade
                            para me mandar uma mensagem.
                        </p>

                        <a
                            href={`mailto:${SITE.email}`}
                            className="mt-2 max-w-full break-all text-[clamp(1.0625rem,0.8rem+1.5vw,2.125rem)] leading-tight font-medium tracking-[-0.028em] text-ink-2 transition-colors duration-200 hover:text-ink"
                        >
                            {SITE.email}
                        </a>
                    </div>
                </div>

                <div className="border-t border-line/60 py-5 px-4 sm:py-6 sm:px-8">
                    <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 sm:gap-y-0 gap-x-5 sm:gap-x-6 items-center text-meta text-ink-3">
                        <div className="col-span-4 sm:col-span-4 lg:col-span-6 flex justify-center sm:justify-start">
                            <p>
                                © {year} {SITE.name}
                            </p>
                        </div>

                        <div className="col-span-4 sm:col-span-4 lg:col-span-6 flex justify-center sm:justify-end">
                            <ul className="flex flex-wrap items-center justify-center sm:justify-end gap-1">
                                {SOCIAL_LINKS.map((link) => {
                                    const external = link.href.startsWith("http");
                                    return (
                                        <li key={link.label}>
                                            <a
                                                href={link.href}
                                                target={external ? "_blank" : undefined}
                                                rel={external ? "noopener noreferrer" : undefined}
                                                className="inline-flex h-9 items-center rounded-full px-3 text-ink-2 transition-colors duration-200 hover:text-ink"
                                            >
                                                {link.label}
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </footer>
    );
}
