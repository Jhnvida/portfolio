"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowUpRight, BriefcaseBusiness, Code2, Mail } from "lucide-react";
import { useRef } from "react";
import { Button } from "../ui/Button";

const CONTACT_CHANNELS = [
    {
        title: "E-mail",
        value: "joao.vida.andre@gmail.com",
        description: "Melhor canal para propostas de projetos, colaborações ou mensagens diretas.",
        href: "mailto:joao.vida.andre@gmail.com",
        icon: Mail,
        actionLabel: "Enviar e-mail",
    },
    {
        title: "GitHub",
        value: "github.com/Jhnvida",
        description: "Repositórios com códigos-fonte, experimentos e projetos em andamento.",
        href: "https://github.com/Jhnvida",
        icon: Code2,
        actionLabel: "Explorar código",
    },
    {
        title: "LinkedIn",
        value: "linkedin.com/in/jaoandre/",
        description: "Rede profissional para acompanhar trajetória e histórico de trabalho.",
        href: "https://www.linkedin.com/in/jaoandre/",
        icon: BriefcaseBusiness,
        actionLabel: "Conectar perfil",
    },
];

export function ContactView() {
    const containerRef = useRef<HTMLElement>(null);

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
                })
                    .from(
                        "[data-contact-mask-title]",
                        {
                            yPercent: 105,
                            duration: 0.8,
                        },
                        "-=0.35",
                    )
                    .from(
                        "[data-contact-desc]",
                        {
                            y: 14,
                            opacity: 0,
                            duration: 0.6,
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
                        },
                        "-=0.4",
                    )
                    .from(
                        "[data-contact-card]",
                        {
                            y: 20,
                            opacity: 0,
                            duration: 0.7,
                            stagger: 0.07,
                            clearProps: "transform,opacity",
                        },
                        "-=0.5",
                    )
                    .fromTo(
                        "[data-contact-footer-hairline]",
                        { scaleX: 0 },
                        {
                            scaleX: 1,
                            transformOrigin: "left center",
                            duration: 0.8,
                            ease: "power3.inOut",
                        },
                        "-=0.4",
                    )
                    .from(
                        "[data-contact-footer]",
                        {
                            y: 14,
                            opacity: 0,
                            duration: 0.6,
                            clearProps: "transform,opacity",
                        },
                        "-=0.5",
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
                    Gostou de algum projeto, quer tirar uma dúvida sobre como algo foi construído ou conversar sobre uma
                    oportunidade de trabalho? Meus canais estão abertos.
                </p>
            </div>

            <div data-contact-header-hairline className="w-full h-px bg-neutral-800/60 origin-left" />

            <div className="w-full px-6 md:px-8 py-10 sm:py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                    {CONTACT_CHANNELS.map((channel) => {
                        const Icon = channel.icon;
                        const isExternal = channel.href.startsWith("http");

                        return (
                            <a
                                key={channel.title}
                                data-contact-card
                                href={channel.href}
                                target={isExternal ? "_blank" : undefined}
                                rel={isExternal ? "noopener noreferrer" : undefined}
                                className="group flex flex-col justify-between p-5 sm:p-6 rounded-none border border-neutral-800/80 bg-neutral-900/30 hover:border-neutral-700 hover:bg-neutral-900/50 transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400"
                            >
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center justify-between">
                                        <div className="p-2.5 rounded-none bg-neutral-950 border border-neutral-800 text-neutral-300 group-hover:text-white transition-colors duration-200">
                                            <Icon size={18} />
                                        </div>

                                        <ArrowUpRight
                                            size={16}
                                            className="text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1 pt-2">
                                        <h2 className="text-lg font-medium text-neutral-200 group-hover:text-white transition-colors duration-200">
                                            {channel.title}
                                        </h2>
                                        <p className="text-xs font-mono text-neutral-400 break-all">{channel.value}</p>
                                    </div>

                                    <p className="text-xs md:text-sm text-neutral-400 leading-relaxed pt-1">
                                        {channel.description}
                                    </p>
                                </div>

                                <div className="mt-6 pt-4 border-t border-neutral-800/60">
                                    <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 group-hover:text-white transition-colors duration-200">
                                        {channel.actionLabel} →
                                    </span>
                                </div>
                            </a>
                        );
                    })}
                </div>
            </div>

            <div data-contact-footer-hairline className="w-full h-px bg-neutral-800/60 origin-left" />

            <div
                data-contact-footer
                className="w-full px-6 md:px-8 py-10 sm:py-12 md:py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
            >
                <p className="text-xs md:text-sm text-neutral-500 max-w-md">
                    Prefiro conversas transparentes, diretas e sem burocracia. Respondo tão rápido quanto possível.
                </p>
                <Button href="/work" variant="secondary" size="md">
                    Ver projetos
                </Button>
            </div>
        </main>
    );
}
