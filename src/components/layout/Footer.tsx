import Link from "next/link";
import { FOOTER_LINKS, SOCIAL_LINKS } from "../../data/navigation";
import { Button } from "../ui/Button";

export function Footer() {
    return (
        <footer className="w-full border-t border-white/10 bg-background pt-16 pb-12 md:pt-20 md:pb-16 overflow-hidden flex flex-col relative">
            <div className="w-full max-w-(--container-page) mx-auto px-6 md:px-12 lg:px-24 z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-12 lg:gap-8">
                    <div className="lg:col-span-5 flex flex-col">
                        <Link
                            href="/"
                            className="font-heading font-bold text-2xl tracking-tight text-white mb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm"
                        >
                            João Vida
                        </Link>

                        <p className="text-neutral-400 text-base md:text-lg max-w-sm leading-relaxed mb-8">
                            Engenharia de software focada em interfaces refinadas. Desenvolvimento full-stack unindo
                            arquitetura robusta e estética premium.
                        </p>

                        <div className="flex flex-wrap items-center gap-4">
                            {SOCIAL_LINKS.map((social) => (
                                <Button
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    variant="dark"
                                    className="px-5 py-2.5 text-sm"
                                >
                                    {social.label}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div className="hidden lg:block lg:col-span-3"></div>

                    <div className="lg:col-span-2 flex flex-col">
                        <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 mb-6">
                            Navegação
                        </h4>

                        <ul className="flex flex-col gap-4">
                            {FOOTER_LINKS.navigation.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-neutral-400 hover:text-white transition-colors text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm px-1"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-2 flex flex-col">
                        <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 mb-6">
                            Contato
                        </h4>

                        <ul className="flex flex-col gap-4">
                            {FOOTER_LINKS.contact.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-neutral-400 hover:text-white transition-colors text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm px-1"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="w-full absolute bottom-0 left-0 pointer-events-none flex justify-center items-end select-none translate-y-1/3">
                <span className="text-[15vw] font-bold text-white/2 tracking-tighter whitespace-nowrap">JOÃO VIDA</span>
            </div>
        </footer>
    );
}
