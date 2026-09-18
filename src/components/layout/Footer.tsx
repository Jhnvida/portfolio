"use client";

import { ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { FOOTER_LINKS, SOCIAL_LINKS } from "../../data/navigation";
import { Link } from "../providers/ViewTransitionsProvider";

export function Footer() {
    const pathname = usePathname();
    const isContactPage = pathname === "/contact";

    return (
        <footer id="contact" className="w-full border-t border-neutral-800/80 bg-[#050505]">
            <div className="w-full px-6 md:px-8 pt-12 md:pt-16 pb-[calc(3rem+env(safe-area-inset-bottom,0px))] md:pb-16 flex flex-col gap-12">
                {!isContactPage && (
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-neutral-800/60">
                        <div className="max-w-md flex flex-col gap-2">
                            <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                                Contato direto
                            </span>

                            <h3 className="text-xl md:text-2xl font-medium tracking-tight text-neutral-100">
                                Vamos construir algo juntos?
                            </h3>

                            <p className="text-sm text-neutral-400 leading-relaxed">
                                Aberto a conversar sobre projetos de design, engenharia front-end e explorações
                                criativas para a web.
                            </p>
                        </div>

                        <a
                            href="mailto:joao.vida.andre@gmail.com"
                            className="inline-flex items-center gap-2 min-h-11 text-sm font-medium text-neutral-200 hover:text-white group border border-neutral-800 hover:border-neutral-600 bg-neutral-900/40 px-5 py-2.5 rounded-none transition-all duration-200 w-fit"
                        >
                            <span>joao.vida.andre@gmail.com</span>
                            <ArrowUpRight
                                size={15}
                                className="text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 ease-out"
                            />
                        </a>
                    </div>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
                    <div className="flex flex-col gap-3">
                        <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">Navegação</span>

                        <ul className="flex flex-col gap-1 sm:gap-2">
                            {FOOTER_LINKS.navigation.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="inline-flex items-center min-h-9 sm:min-h-0 text-neutral-400 hover:text-neutral-100 transition-colors duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col gap-3">
                        <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">Canais</span>

                        <ul className="flex flex-col gap-1 sm:gap-2">
                            {SOCIAL_LINKS.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        target={link.href.startsWith("http") ? "_blank" : undefined}
                                        rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                        className="min-h-9 sm:min-h-0 text-neutral-400 hover:text-neutral-100 transition-colors duration-200 inline-flex items-center gap-1 group"
                                    >
                                        <span>{link.label}</span>
                                        <ArrowUpRight
                                            size={12}
                                            className="opacity-0 group-hover:opacity-70 transition-all duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                        />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col gap-3 col-span-2 sm:col-span-1">
                        <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                            Localização
                        </span>

                        <p className="text-neutral-400 leading-relaxed">
                            Jaguariúna, São Paulo
                            <br />
                            Disponível para trabalho remoto global.
                        </p>
                    </div>
                </div>

                <div className="pt-8 border-t border-neutral-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
                    <p>© {new Date().getFullYear()} João Vida. Todos os direitos reservados.</p>
                    <p className="text-neutral-600">Construído com Next.js & Tailwind CSS</p>
                </div>
            </div>
        </footer>
    );
}
