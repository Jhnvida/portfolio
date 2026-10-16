import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function PersonalIntro() {
    return (
        <section
            aria-label="Apresentação pessoal e especialidades"
            className="mx-auto max-w-355 px-6 md:px-10 py-24 md:py-36 border-t border-neutral-200/80"
        >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-16 lg:gap-x-20">
                <div className="md:col-span-7 lg:col-span-7">
                    <p className="font-sans text-xs font-medium text-neutral-600 mb-3 sm:mb-4">Sobre</p>

                    <div className="space-y-4 font-sans text-sm sm:text-base leading-relaxed text-neutral-800 max-w-xl">
                        <p>
                            Construo sites e aplicações web combinando cuidado visual, facilidade de uso e código
                            organizado. Meu foco é entender o que cada projeto precisa para criar uma solução digital
                            prática e agradável de usar — seja uma página para apresentar um trabalho ou uma ferramenta
                            para automatizar tarefas do dia a dia.
                        </p>
                        <p>
                            Estudo Ciência da Computação na UniFAJ e acumulo quase dois anos de experiência prática na
                            Assist Soluções em TI, desenvolvendo e mantendo sistemas em produção. No dia a dia, trabalho
                            com tecnologias como TypeScript, React, Node.js e PHP, valorizando sempre a clareza na
                            comunicação, o cumprimento de prazos e o bom acabamento técnico.
                        </p>
                    </div>

                    <div className="mt-8">
                        <Link
                            href="/about"
                            className="group rounded-full border border-neutral-200/80 bg-white px-5 py-2.5 text-xs sm:text-[13px] font-sans font-medium text-neutral-800 transition-[background-color,border-color,color,transform] duration-200 ease-out hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-950 active:scale-[0.98] inline-flex items-center justify-center gap-2 min-h-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
                        >
                            <span>Conhecer minha trajetória</span>
                            <ArrowRight
                                aria-hidden="true"
                                className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                            />
                        </Link>
                    </div>
                </div>

                <div className="md:col-span-5 lg:col-span-5 flex flex-col justify-between">
                    <div>
                        <p className="font-sans text-xs font-medium text-neutral-600 mb-3 sm:mb-4">Como posso ajudar</p>
                        <ul className="space-y-4 font-sans text-sm leading-relaxed text-neutral-800">
                            <li>
                                <strong className="font-medium text-neutral-950">Criação de sites:</strong>{" "}
                                desenvolvimento de páginas para apresentar negócios, profissionais, projetos ou ideias,
                                com navegação clara e visual adaptado para celulares e computadores.
                            </li>
                            <li>
                                <strong className="font-medium text-neutral-950">Aplicações e ferramentas web:</strong>{" "}
                                construção de sistemas sob medida, painéis administrativos e rotinas para organizar
                                processos e atender necessidades específicas.
                            </li>
                            <li>
                                <strong className="font-medium text-neutral-950">Melhorias e manutenção:</strong>{" "}
                                ajustes visuais, correção de falhas, melhorias de velocidade e novas funcionalidades em
                                sites ou sistemas que já estão no ar.
                            </li>
                        </ul>
                    </div>

                    <div className="mt-10 md:mt-12">
                        <p className="font-sans text-xs font-medium text-neutral-600 mb-3 sm:mb-4">Disponibilidade</p>
                        <p className="font-sans text-sm text-neutral-700 leading-relaxed">
                            Aberto a novas oportunidades de trabalho, projetos sob medida e colaborações técnicas.
                            Disponível para atuação remota ou presencial na região de Jaguariúna e Campinas, SP.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
