"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { useRef, useState } from "react";

const CHANNELS = [
    {
        id: "github",
        tag: "Código & Repositórios",
        title: "GitHub",
        handle: "github.com/Jhnvida",
        href: "https://github.com/Jhnvida",
        description: "Códigos-fonte, protótipos e implementações de projetos autorais.",
    },
    {
        id: "linkedin",
        tag: "Rede Profissional",
        title: "LinkedIn",
        handle: "linkedin.com/in/jaoandre",
        href: "https://www.linkedin.com/in/jaoandre/",
        description: "Trajetória profissional, histórico de trabalho e conexões no setor.",
    },
];

export function ContactView() {
    const containerRef = useRef<HTMLElement>(null);
    const [copied, setCopied] = useState(false);

    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText("joao.vida.andre@gmail.com");
            setCopied(true);
            setTimeout(() => setCopied(false), 2400);
        } catch {
            setCopied(false);
        }
    };

    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                const tl = gsap.timeline({
                    defaults: { ease: "power4.out" },
                });

                tl.from("[data-contact-tag]", {
                    y: 10,
                    opacity: 0,
                    duration: 0.5,
                    clearProps: "all",
                })
                    .from(
                        "[data-contact-mask-title]",
                        {
                            yPercent: 105,
                            duration: 0.8,
                            clearProps: "transform",
                        },
                        "-=0.35",
                    )
                    .from(
                        "[data-contact-desc]",
                        {
                            y: 14,
                            opacity: 0,
                            duration: 0.6,
                            clearProps: "all",
                        },
                        "-=0.45",
                    )
                    .fromTo(
                        "[data-contact-header-hairline]",
                        { scaleX: 0 },
                        {
                            scaleX: 1,
                            transformOrigin: "left center",
                            duration: 0.8,
                            ease: "power3.inOut",
                            clearProps: "all",
                        },
                        "-=0.4",
                    )
                    .from(
                        "[data-contact-sidebar]",
                        {
                            y: 16,
                            opacity: 0,
                            duration: 0.7,
                            clearProps: "all",
                        },
                        "-=0.5",
                    )
                    .from(
                        "[data-contact-channel]",
                        {
                            y: 16,
                            opacity: 0,
                            duration: 0.7,
                            stagger: 0.08,
                            clearProps: "all",
                        },
                        "-=0.6",
                    );
            });
        },
        { scope: containerRef },
    );

    return (
        <main ref={containerRef} className="w-full flex flex-col">
            <div className="w-full px-6 md:px-8 pt-12 sm:pt-16 md:pt-24 pb-10 sm:pb-12 md:pb-16 relative">
                <span
                    data-contact-tag
                    className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-4 block"
                >
                    Contato
                </span>

                <div className="overflow-hidden pb-1.5 mb-6">
                    <h1
                        data-contact-mask-title
                        className="text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight text-neutral-100 leading-[1.2] sm:leading-tight"
                    >
                        Vamos conversar.
                    </h1>
                </div>

                <p
                    data-contact-desc
                    className="text-base md:text-lg text-neutral-400 leading-relaxed max-w-xl font-normal"
                >
                    Aberto a dialogar sobre projetos de engenharia front-end, design de interfaces ou novas
                    oportunidades profissionais.
                </p>
            </div>

            <div data-contact-header-hairline className="w-full h-px bg-neutral-800/60 origin-left" />

            <div className="w-full px-6 md:px-8 py-12 sm:py-16 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-start">
                    <div data-contact-sidebar className="md:col-span-5 md:sticky md:top-24 flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <span className="text-xs font-mono uppercase tracking-wider text-neutral-500">
                                Comunicação Direta
                            </span>
                            <p className="text-sm md:text-base text-neutral-300 leading-relaxed font-normal">
                                Prefiro conversas transparentes, sem camadas de burocracia. Se tiver uma proposta, uma
                                dúvida técnica ou quiser falar sobre uma ideia, basta enviar uma mensagem.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 pt-4 border-t border-neutral-800/60 font-mono text-xs text-neutral-400">
                            <div className="flex items-center justify-between">
                                <span className="text-neutral-500">Localização</span>
                                <span className="text-neutral-300">Jaguariúna, SP · Brasil</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-neutral-500">Fuso Horário</span>
                                <span className="text-neutral-300">BRT (UTC-3)</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-neutral-500">Disponibilidade</span>
                                <span className="text-neutral-300">Trabalho Remoto</span>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-7 flex flex-col">
                        <div
                            data-contact-channel
                            className="flex flex-col pb-8 sm:pb-10 border-b border-neutral-800/60"
                        >
                            <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2">
                                Canal Principal
                            </span>

                            <a
                                href="mailto:joao.vida.andre@gmail.com"
                                className="text-xl sm:text-2xl md:text-3xl font-medium text-neutral-100 hover:text-white tracking-tight break-all transition-colors duration-200"
                            >
                                joao.vida.andre@gmail.com
                            </a>

                            <div className="flex items-center gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={handleCopyEmail}
                                    className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-neutral-300 hover:text-white border border-neutral-800 hover:border-neutral-700 bg-neutral-900/40 rounded-none transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400"
                                    aria-label="Copiar endereço de e-mail"
                                >
                                    {copied ? (
                                        <>
                                            <Check size={13} className="text-emerald-400" />
                                            <span className="text-emerald-400">
                                                Copiado para a área de transferência
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy size={13} className="text-neutral-400" />
                                            <span>Copiar e-mail</span>
                                        </>
                                    )}
                                </button>

                                <a
                                    href="mailto:joao.vida.andre@gmail.com"
                                    className="inline-flex items-center gap-1 text-xs font-mono text-neutral-400 hover:text-neutral-200 transition-colors duration-200"
                                >
                                    <span>Abrir no cliente</span>
                                    <ArrowUpRight size={13} />
                                </a>
                            </div>
                        </div>

                        {CHANNELS.map((channel) => (
                            <a
                                key={channel.id}
                                data-contact-channel
                                href={channel.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex flex-col py-6 sm:py-8 border-b border-neutral-800/60 transition-colors duration-200 hover:bg-neutral-900/10 px-2 -mx-2 rounded-none"
                            >
                                <div className="flex items-baseline justify-between gap-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs font-mono text-neutral-500">{channel.tag}</span>
                                        <h2 className="text-lg md:text-xl font-medium text-neutral-200 group-hover:text-white transition-colors duration-200">
                                            {channel.title}
                                        </h2>
                                    </div>

                                    <div className="flex items-center text-neutral-500 group-hover:text-white transition-colors duration-200 shrink-0">
                                        <ArrowUpRight
                                            size={18}
                                            className="transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                        />
                                    </div>
                                </div>

                                <p className="text-xs font-mono text-neutral-400 pt-2">{channel.handle}</p>

                                <p className="text-sm text-neutral-400 leading-relaxed pt-1 max-w-md">
                                    {channel.description}
                                </p>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
