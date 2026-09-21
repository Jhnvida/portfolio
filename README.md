# Portfolio — João Vida

Portfólio autoral e laboratório criativo desenvolvido para apresentar criações digitais, projetos de código aberto e estudos de caso de forma interativa. A aplicação explora animações fluidas baseadas em rolagem, transições nativas de página e tipografia expressiva, priorizando usabilidade, código limpo e atenção aos detalhes.

## Funcionalidades

- **Apresentação e Hero Interativo**: Introdução visual com animações tipográficas em camadas com GSAP e chamada de ação direta.
- **Projetos em Destaque**: Exibição dos principais projetos autorais na página inicial, com cards interativos e efeito parallax nas imagens.
- **Arquivo Completo de Projetos (`/work`)**: Listagem estruturada de todos os projetos desenvolvidos, categorizados por ano, foco e stack.
- **Estudos de Caso Detalhados (`/work/[slug]`)**: Páginas individuais com ficha técnica completa, motivação, desafios técnicos explorados, blocos editoriais e navegação sequencial entre projetos.
- **Filosofia & Abordagem**: Seção com os princípios de usabilidade, código limpo e aprendizagem contínua aplicados ao desenvolvimento de interfaces.
- **Processo Criativo ("Como eu crio")**: Apresentação detalhada das etapas de ideação, prototipagem, refinamento visual e aprendizado contínuo.
- **Sobre Mim (`/about`)**: Trajetória, visão sobre engenharia front-end e lista de tecnologias e ferramentas de trabalho utilizadas.
- **Contato Direto (`/contact`)**: Acesso descomplicado aos canais de contato (E-mail, GitHub e LinkedIn) sem formulários corporativos.
- **Rolagem Suave (Lenis + GSAP)**: Rolagem inercial suave integrada ao ScrollTrigger com respeito às preferências de movimento reduzido (`prefers-reduced-motion`).
- **Transições Suaves de Navegação**: Navegação fluida entre rotas aproveitando a View Transitions API nativa dos navegadores modernos.

## Tecnologias Utilizadas

- **Frontend:**
    - [Next.js 16](https://nextjs.org/) (App Router com Turbopack)
    - [React 19](https://react.dev/)
    - [TypeScript](https://www.typescriptlang.org/)
    - [Tailwind CSS v4](https://tailwindcss.com/) para estilização moderna
    - [GSAP 3](https://gsap.com/) e [@gsap/react](https://gsap.com/resources/React/) (com ScrollTrigger) para orquestração de animações
    - [Lenis](https://lenis.darkroom.engineering/) para rolagem inercial suave
    - [Lucide React](https://lucide.dev/) para ícones da interface
- **Ferramentas & Build:**
    - [pnpm](https://pnpm.io/) como gerenciador de pacotes
    - [ESLint](https://eslint.org/) para linting e padronização de código
    - [PostCSS](https://postcss.org/)

## Estrutura do Projeto

A estrutura de pastas principal dentro de `src/` está organizada da seguinte forma:

- `/app`: Rotas e páginas da aplicação utilizando o App Router do Next.js (`about`, `contact`, `work`, `work/[slug]`, layout base e página 404).
- `/components`: Componentes modulares reutilizáveis organizados por domínio (`about`, `case`, `contact`, `layout`, `providers`, `sections` e `ui`).
- `/data`: Estruturas de dados estáticos da aplicação (informações dos projetos, links de navegação e etapas do processo criativo).
- `/lib`: Utilitários gerais (ex: combinação de classes com `clsx` e `tailwind-merge`).
- `/types`: Definições de interfaces e tipos TypeScript do domínio.

## Pré-requisitos

Antes de iniciar, você precisará ter instalado em sua máquina:

- [Node.js](https://nodejs.org/en/) (recomendado versão 20 ou superior)
- Gerenciador de pacotes [pnpm](https://pnpm.io/) (versão 10 ou superior recomendada) ou gerenciadores equivalentes (`npm`, `yarn`)

## Instalação e Configuração

1. Clone o repositório:

    ```bash
    git clone https://github.com/Jhnvida/portfolio.git
    ```

2. Acesse a pasta do projeto:

    ```bash
    cd portfolio
    ```

3. Instale as dependências:

    ```bash
    pnpm install
    ```

> **Nota:** Este projeto não requer chaves de API ou configuração de variáveis de ambiente para execução local.

## Como Executar

Para iniciar o servidor de desenvolvimento, execute o comando:

```bash
pnpm dev
```

Acesse a aplicação no seu navegador padrão em `http://localhost:3000`.

### Outros Scripts Disponíveis

- `pnpm build`: Cria a versão de produção otimizada da aplicação.
- `pnpm start`: Inicializa o servidor executando o build de produção.
- `pnpm typecheck`: Executa a verificação estrita de tipos do TypeScript sem gerar arquivos (`tsc --noEmit`).
- `pnpm lint`: Executa a verificação de código com o ESLint.

## Como Usar

- **Página Inicial (`/`)**: Apresenta a visão geral com o Hero interativo, vitrine com os principais projetos autorais, pilares de desenvolvimento e etapas do processo de criação.
- **Arquivo de Projetos (`/work`)**: Galeria completa com todos os projetos e experimentos criados.
- **Estudo de Caso (`/work/[slug]`)**: Página detalhada de cada projeto contendo visão geral, motivações da criação, pontos técnicos explorados e link direto para o repositório no GitHub.
- **Sobre Mim (`/about`)**: Apresentação da trajetória pessoal, princípios de trabalho e catálogo de ferramentas e tecnologias.
- **Contato (`/contact`)**: Página direta com links e atalhos para os canais de comunicação (E-mail, GitHub e LinkedIn).
