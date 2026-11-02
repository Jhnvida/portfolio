# Portfólio — João André

Portfólio minimalista, editorial e de alta performance desenvolvido com **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, **GSAP** e **Lenis**, com foco em microinterações fluidas, tipografia refinada e animações orquestradas na GPU.

---

[![Next.js 16](https://img.shields.io/badge/Next.js-16.4-black?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.3-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.3-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/Motion-GSAP_3-88CE02?style=flat&logo=greensock&logoColor=white)](https://greensock.com/gsap/)
[![Lenis](https://img.shields.io/badge/Scroll-Lenis-black?style=flat)](https://github.com/darkroomengineering/lenis)
[![pnpm](https://img.shields.io/badge/Package_Manager-pnpm-F69220?style=flat&logo=pnpm&logoColor=white)](https://pnpm.io/)
[![Licença Privada](https://img.shields.io/badge/License-Privado-lightgrey?style=flat)](#licença)

---

## Sumário

- [Visão Geral](#visão-geral)
- [Funcionalidades Principais](#funcionalidades-principais)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e Execução](#instalação-e-execução)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Padrões de Versionamento](#padrões-de-versionamento)
- [Licença](#licença)

---

## Visão Geral

O projeto consiste no portfólio pessoal e espaço editorial do desenvolvedor **João André**. Desenvolvido com base no Next.js 16 e Turbopack, a aplicação combina uma experiência visual minimalista inspirada no design suíço com rigor técnico de engenharia de interface:

- **Performance Extrema:** Construído sobre Server Components e renderização estática otimizada do App Router.
- **Microinterações e Motion:** Sincronização avançada entre o cursor customizado interativo, rolagem inercial através do Lenis e animações de scroll disparadas com GSAP ScrollTrigger.
- **Arquitetura Orientada a Dados:** Conteúdos de projetos, biografia e links de contato centralizados e tipados dentro do diretório `src/data/`.

---

## Funcionalidades Principais

- **Seção Hero Editorial:** Título animado com divisão por caracteres/linhas, revelação suave e navegação rápida para o conteúdo principal.
- **Galeria de Projetos em Destaque:** Exibição imersiva dos principais trabalhos desenvolvidos, com tags tecnológicas, resumos e links de visualização.
- **Páginas de Detalhes Dinâmicas (`/[slug]`):** Roteamento dinâmico no Next.js App Router para apresentação aprofundada de estudos de caso, desafios técnicos e soluções de cada projeto.
- **Cursor Customizado Adaptativo:** Cursor interativo com efeito de rastreamento (_trailing_) fluido e inversão de contraste ao sobrepor elementos interativos.
- **Rolagem Suave (Smooth Scroll):** Integração contínua do Lenis com a timeline do GSAP para uma navegação agradável sem perdas de frame.
- **Sobre e Trajetória:** Apresentação da carreira profissional, filosofia de desenvolvimento e tecnologias dominadas.
- **Footer Reveal:** Rodapé dinâmico com links sociais, canais de contato e transição de revelação ao final da página.

---

## Tecnologias Utilizadas

### Core & Framework

- **[Next.js 16](https://nextjs.org/):** Framework React com App Router, Turbopack e Server Components.
- **[React 19](https://react.dev/):** Renderização de componentes funcionais de última geração.
- **[TypeScript](https://www.typescriptlang.org/):** Tipagem ponta a ponta para projetos, rotas e estados de movimento.

### Estilização & Design

- **[Tailwind CSS v4](https://tailwindcss.com/):** Novo motor atômico com suporte direto ao Turbopack (`@tailwindcss/turbopack`).
- **[Lucide React](https://lucide.dev/):** Conjunto consistente de ícones vetoriais.

### Animações & Experiência

- **[GSAP 3](https://greensock.com/gsap/):** Biblioteca para orquestração de animações em linha do tempo e ScrollTrigger.
- **[Lenis](https://github.com/darkroomengineering/lenis):** Gerenciador de rolagem suave moderno e acessível.

### Qualidade de Código

- **[ESLint 9](https://eslint.org/):** Análise estática com o pacote oficial `eslint-config-next`.

---

## Estrutura do Projeto

```text
portfolio/
├── public/                 # Recursos públicos e imagens estáticas
├── src/
│   ├── app/                # Rotas do Next.js App Router
│   │   ├── [slug]/         # Página dinâmica de detalhes do projeto
│   │   ├── favicon.ico     # Ícone do site
│   │   ├── globals.css     # Folha de estilos globais e tema Tailwind v4
│   │   ├── layout.tsx      # Layout raiz com provedores de scroll e cursor
│   │   └── page.tsx        # Página inicial (Home)
│   ├── components/         # Componentes React organizados por domínio
│   │   ├── home/           # Seções da página inicial (Hero, About, ProjectGallery)
│   │   ├── layout/         # Componentes globais de layout (Header, Footer)
│   │   ├── projects/       # Componentes de projetos e visualização de mídia
│   │   ├── providers/      # Provedores de contexto (SmoothScroll, Transitions)
│   │   ├── transitions/    # Tipagens e controladores de transição de página
│   │   └── ui/             # Primitivas visuais (AnimatedHeading, CustomCursor)
│   ├── data/               # Fontes de dados tipadas (projects.ts, site-config.ts)
│   └── lib/                # Configurações de bibliotecas (motion.ts com GSAP)
├── eslint.config.mjs       # Configuração do ESLint
├── next.config.ts          # Configurações do Next.js
├── package.json            # Dependências e scripts do projeto
├── pnpm-lock.yaml          # Bloqueio de versões do pnpm
└── tsconfig.json           # Configuração do compilador TypeScript
```

---

## Pré-requisitos

Para executar o projeto localmente, você precisará de:

- [Node.js](https://nodejs.org/) (versão 20.0.0 ou superior recomendada)
- [pnpm](https://pnpm.io/) (versão 10 ou superior recomendada)

---

## Instalação e Execução

1. **Clone o repositório:**

    ```bash
    git clone https://github.com/Jhnvida/portfolio.git
    cd portfolio
    ```

2. **Instale as dependências:**

    ```bash
    pnpm install
    ```

3. **Inicie o servidor de desenvolvimento com Turbopack:**

    ```bash
    pnpm dev
    ```

4. **Acesse no navegador:**
   Abra [http://localhost:3000](http://localhost:3000).

---

## Scripts Disponíveis

| Comando      | Descrição                                                        |
| ------------ | ---------------------------------------------------------------- |
| `pnpm dev`   | Inicia o servidor de desenvolvimento do Next.js com Turbopack.   |
| `pnpm build` | Cria a compilação de produção altamente otimizada.               |
| `pnpm start` | Inicializa o servidor executando a compilação gerada pelo build. |
| `pnpm lint`  | Executa a verificação estática de código com o ESLint.           |

---

## Padrões de Versionamento

Este repositório adota rigorosamente a convenção do [Conventional Commits](https://www.conventionalcommits.org/pt-br/):

- `feat:` Novas seções, componentes de animação ou dados.
- `fix:` Correções de bugs de layout ou quebras de rolagem.
- `docs:` Modificações na documentação técnica.
- `style:` Ajustes finos de espaçamento, tipografia ou cores.
- `refactor:` Refatorações sem alteração visual ou comportamental externa.
- `perf:` Otimizações em transições de GPU ou renderização do Next.js.
- `chore:` Atualizações de dependências e tooling do projeto.

---

## Licença

Este repositório é de uso pessoal e privado. Todos os direitos de design, layout e código são reservados ao autor.
