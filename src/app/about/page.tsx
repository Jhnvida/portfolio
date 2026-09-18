import type { Metadata } from "next";
import { Button } from "../../components/ui/Button";

export const metadata: Metadata = {
    title: "Sobre",
    description:
        "Conheça quem está por trás dos projetos: curiosidade, aprendizado contínuo e paixão por construir para a web.",
};

const TOOLS_AND_TECH = [
    { category: "Desenvolvimento", items: ["React", "Next.js", "TypeScript", "JavaScript (ESNext)", "Node.js"] },
    {
        category: "Estilo & Motion",
        items: ["Tailwind CSS", "GSAP", "Motion / Framer", "CSS Moderno", "Design Responsivo"],
    },
    { category: "Ferramentas & Fluxo", items: ["Git & GitHub", "Vite", "Figma", "VS Code", "Vercel"] },
];

export default function AboutPage() {
    return (
        <main className="w-full bg-background min-h-screen pt-36 md:pt-48 pb-24">
            <div className="w-full max-w-(--container-page) mx-auto px-6 md:px-12 lg:px-24 flex flex-col">
                <div className="flex flex-col gap-6 max-w-4xl border-b border-white/10 pb-16">
                    <span className="text-xs uppercase font-mono tracking-[0.2em] text-neutral-500">Sobre mim</span>
                    <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tighter text-white leading-[1.02]">
                        Construo coisas por curiosidade, gosto de aprender fazendo.
                    </h1>
                    <p className="text-neutral-400 text-lg md:text-2xl leading-relaxed mt-4 font-light max-w-3xl">
                        Sou uma pessoa comum que gosta de tecnologia, design e desenvolvimento. Encontrei no código uma
                        forma de tirar ideias da cabeça e transformar imaginação em projetos reais que funcionam na
                        tela.
                    </p>
                </div>

                <div className="py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 border-b border-white/10">
                    <div className="lg:col-span-4">
                        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                            Minha visão
                        </h2>
                    </div>

                    <div className="lg:col-span-8 flex flex-col gap-8 max-w-3xl">
                        <p className="text-lg md:text-xl text-neutral-300 leading-relaxed">
                            Não sou uma agência nem pretendo fingir que tenho dezenas de clientes comerciais. A maior
                            parte do que você vê por aqui nasceu do interesse genuíno de experimentar: uma biblioteca
                            que eu queria testar, um conceito visual que me chamou atenção ou uma ideia que pareceu
                            divertido colocar no mundo.
                        </p>
                        <p className="text-lg md:text-xl text-neutral-300 leading-relaxed">
                            Apesar disso, levo muito a sério a qualidade de tudo que faço. Gosto de pensar na
                            usabilidade, no ritmo das animações, no conforto visual e na clareza do código. Para mim, um
                            projeto pessoal merece o mesmo esmero e carinho de qualquer software de ponta.
                        </p>
                    </div>
                </div>

                <div className="py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 border-b border-white/10">
                    <div className="lg:col-span-4">
                        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                            Como aprendo
                        </h2>
                    </div>

                    <div className="lg:col-span-8 flex flex-col gap-8 max-w-3xl">
                        <p className="text-lg md:text-xl text-neutral-300 leading-relaxed">
                            Meu processo de aprendizado sempre foi mão na massa. Em vez de apenas ler documentações de
                            forma passiva, prefiro criar um projeto do zero para resolver uma questão prática. É nesse
                            movimento de construir, quebrar, consertar e refinar que a evolução acontece.
                        </p>
                        <p className="text-lg md:text-xl text-neutral-300 leading-relaxed">
                            Estou construindo minha trajetória passo a passo, explorando com entusiasmo as
                            possibilidades da web contemporânea e sempre aberto a aprender novos conceitos e técnicas.
                        </p>
                    </div>
                </div>

                <div className="py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 border-b border-white/10">
                    <div className="lg:col-span-4">
                        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                            O que gosto de usar
                        </h2>
                    </div>

                    <div className="lg:col-span-8 flex flex-col gap-10">
                        {TOOLS_AND_TECH.map((group) => (
                            <div key={group.category} className="flex flex-col gap-3">
                                <h3 className="text-sm font-mono text-neutral-400 uppercase tracking-wider">
                                    {group.category}
                                </h3>
                                <div className="flex flex-wrap gap-2.5">
                                    {group.items.map((item) => (
                                        <span
                                            key={item}
                                            className="px-4 py-2 text-sm bg-white/3 border border-white/8 rounded-full text-neutral-200"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pt-16 md:pt-24 flex flex-col items-start gap-6 max-w-2xl">
                    <h2 className="text-2xl md:text-4xl font-medium tracking-tight text-white">
                        Quer trocar uma ideia?
                    </h2>
                    <p className="text-neutral-400 text-base md:text-lg leading-relaxed">
                        Se você gostou de algum projeto, tem uma dúvida sobre como algo foi construído ou simplesmente
                        quer falar sobre tecnologia e design, fique à vontade para me mandar uma mensagem.
                    </p>
                    <div className="flex flex-wrap gap-4 mt-2">
                        <Button href="/contact" variant="primary" className="px-6 py-3 text-sm">
                            Entrar em contato
                        </Button>
                        <Button href="/work" variant="secondary" className="px-6 py-3 text-sm">
                            Ver meus projetos
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
}
