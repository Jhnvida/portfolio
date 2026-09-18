import { ArrowUpRight, BriefcaseBusiness, Code2, Mail } from "lucide-react";
import type { Metadata } from "next";
import { Button } from "../../components/ui/Button";

export const metadata: Metadata = {
    title: "Contato",
    description: "Vamos trocar uma ideia. Canais diretos para conversar sobre projetos, ideias e tecnologia.",
};

const CONTACT_CHANNELS = [
    {
        title: "E-mail",
        value: "joao.vida.andre@gmail.com",
        description: "A melhor forma de me mandar uma mensagem direta sobre qualquer assunto.",
        href: "mailto:joao.vida.andre@gmail.com",
        icon: Mail,
        actionLabel: "Enviar mensagem",
    },
    {
        title: "GitHub",
        value: "github.com/Jhnvida",
        description: "Onde estão os códigos dos projetos, experimentos e o que estou construindo.",
        href: "https://github.com/Jhnvida",
        icon: Code2,
        actionLabel: "Ver perfil",
    },
    {
        title: "LinkedIn",
        value: "linkedin.com/in/jaoandre",
        description: "Para acompanhar minha trajetória e conectar profissionalmente.",
        href: "https://www.linkedin.com/in/jaoandre/",
        icon: BriefcaseBusiness,
        actionLabel: "Conectar",
    },
];

export default function ContactPage() {
    return (
        <main className="w-full bg-background min-h-screen pt-36 md:pt-48 pb-24">
            <div className="w-full max-w-(--container-page) mx-auto px-6 md:px-12 lg:px-24 flex flex-col">
                <div className="flex flex-col gap-6 max-w-3xl border-b border-white/10 pb-16">
                    <span className="text-xs uppercase font-mono tracking-[0.2em] text-neutral-500">Contato</span>
                    <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tighter text-white leading-[1.02]">
                        Vamos conversar.
                    </h1>
                    <p className="text-neutral-400 text-lg md:text-2xl leading-relaxed mt-4 font-light">
                        Gostou de algum projeto, quer tirar uma dúvida sobre como algo foi feito ou trocar uma ideia
                        sobre design e tecnologia? Meus canais estão sempre abertos.
                    </p>
                </div>

                <div className="py-16 md:py-24 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 border-b border-white/10">
                    {CONTACT_CHANNELS.map((channel) => {
                        const Icon = channel.icon;
                        const isExternal = channel.href.startsWith("http");

                        return (
                            <a
                                key={channel.title}
                                href={channel.href}
                                target={isExternal ? "_blank" : undefined}
                                rel={isExternal ? "noopener noreferrer" : undefined}
                                className="group flex flex-col justify-between p-8 rounded-sm bg-surface-raised border border-white/8 hover:border-white/20 transition-all duration-500"
                            >
                                <div className="flex flex-col">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="p-3 rounded-full bg-white/5 text-white/80 group-hover:text-white group-hover:bg-white/10 transition-colors">
                                            <Icon size={22} />
                                        </div>
                                        <ArrowUpRight
                                            size={18}
                                            className="text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                                        />
                                    </div>

                                    <h2 className="text-xl font-medium text-white mb-2">{channel.title}</h2>
                                    <p className="text-sm font-mono text-neutral-400 mb-4 break-all">{channel.value}</p>
                                    <p className="text-sm text-neutral-400 leading-relaxed">{channel.description}</p>
                                </div>

                                <div className="mt-8 pt-4 border-t border-white/5">
                                    <span className="text-xs font-mono uppercase tracking-widest text-neutral-300 group-hover:text-white transition-colors">
                                        {channel.actionLabel} →
                                    </span>
                                </div>
                            </a>
                        );
                    })}
                </div>

                <div className="pt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <p className="text-neutral-500 text-sm">
                        Prefiro contatos diretos e sem burocracia. Respondo assim que possível.
                    </p>
                    <Button href="/work" variant="secondary" className="px-6 py-3 text-sm">
                        Ver projetos
                    </Button>
                </div>
            </div>
        </main>
    );
}
