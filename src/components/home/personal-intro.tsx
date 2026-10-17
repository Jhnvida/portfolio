export function PersonalIntro() {
    return (
        <section
            id="sobre"
            aria-label="Apresentação pessoal e especialidades"
            className="mx-auto max-w-355 px-6 md:px-10 py-24 md:py-36 border-t border-neutral-200/80 scroll-mt-24 md:scroll-mt-32"
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
                            Acredito que um bom produto digital nasce do equilíbrio entre simplicidade visual e uma
                            estrutura técnica sólida por trás das telas. Com quase dois anos de experiência prática no
                            desenvolvimento e sustentação de sistemas reais em produção, construí uma abordagem pautada
                            em organização, atenção aos detalhes e responsabilidade técnica em cada etapa.
                        </p>
                        <p>
                            No dia a dia com clientes e parceiros, priorizo a transparência: comunicação direta,
                            alinhamento constante de expectativas, cumprimento rigoroso de prazos acordados e cuidado
                            com a qualidade final de cada entrega.
                        </p>
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
                        <p className="font-sans text-sm text-neutral-800 leading-relaxed">
                            Aberto a novas oportunidades de trabalho, projetos sob medida e colaborações técnicas.
                            Disponível para atuação remota ou presencial na região de Jaguariúna e Campinas, SP.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
