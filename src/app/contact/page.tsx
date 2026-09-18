import { ArrowUpRight, Code2, Mail } from "lucide-react";
import type { Metadata } from "next";
import { Button } from "../../components/ui/Button";

export const metadata: Metadata = {
    title: "Contato",
    description: "Canais diretos para conversar sobre projetos, ideias e desenvolvimento web com João Vida.",
};

function LinkedInIcon({ size = 18 }: { size?: number }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
        </svg>
    );
}

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
        value: "linkedin.com/in/jaoandre",
        description: "Rede profissional para acompanhar trajetória e histórico de trabalho.",
        href: "https://www.linkedin.com/in/jaoandre/",
        icon: LinkedInIcon,
        actionLabel: "Conectar perfil",
    },
];

export default function ContactPage() {
    return (
        <main className="w-full flex flex-col">
            <div className="w-full px-6 md:px-8 pt-16 md:pt-24 pb-12 md:pb-16 border-b border-neutral-800/60">
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-4 block">
                    Contato
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-neutral-100 mb-6 leading-tight">
                    Vamos conversar.
                </h1>
                <p className="text-base md:text-lg text-neutral-400 leading-relaxed max-w-xl font-normal">
                    Gostou de algum projeto, quer tirar uma dúvida sobre como algo foi construído ou conversar sobre uma oportunidade de trabalho? Meus canais estão abertos.
                </p>
            </div>

            <div className="w-full px-6 md:px-8 py-12 md:py-16 border-b border-neutral-800/60">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
                    {CONTACT_CHANNELS.map((channel) => {
                        const Icon = channel.icon;
                        const isExternal = channel.href.startsWith("http");

                        return (
                            <a
                                key={channel.title}
                                href={channel.href}
                                target={isExternal ? "_blank" : undefined}
                                rel={isExternal ? "noopener noreferrer" : undefined}
                                className="group flex flex-col justify-between p-6 rounded-none border border-neutral-800/80 bg-neutral-900/30 hover:border-neutral-700 hover:bg-neutral-900/50 transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400"
                            >
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center justify-between">
                                        <div className="p-2.5 rounded-none bg-neutral-950 border border-neutral-800 text-neutral-300 group-hover:text-white transition-colors">
                                            <Icon size={18} />
                                        </div>
                                        <ArrowUpRight
                                            size={16}
                                            className="text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1 pt-2">
                                        <h2 className="text-lg font-medium text-neutral-200 group-hover:text-white transition-colors">
                                            {channel.title}
                                        </h2>
                                        <p className="text-xs font-mono text-neutral-400 break-all">
                                            {channel.value}
                                        </p>
                                    </div>

                                    <p className="text-xs md:text-sm text-neutral-400 leading-relaxed pt-1">
                                        {channel.description}
                                    </p>
                                </div>

                                <div className="mt-6 pt-4 border-t border-neutral-800/60">
                                    <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 group-hover:text-white transition-colors">
                                        {channel.actionLabel} →
                                    </span>
                                </div>
                            </a>
                        );
                    })}
                </div>
            </div>

            <div className="w-full px-6 md:px-8 py-12 md:py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
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
