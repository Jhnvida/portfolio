import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { CustomCursor } from "@/components/ui/custom-cursor";
import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit",
    weight: ["400", "500", "600", "700"],
    display: "swap",
});

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    weight: ["400", "500", "600"],
    display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://joaoandre.dev";

export const viewport: Viewport = {
    themeColor: "#ffffff",
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
};

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: "João André — Desenvolvedor de Software",
        template: "João André — %s",
    },
    description:
        "Desenvolvedor de software focado em sites e aplicações web. Criação de interfaces funcionais, sistemas sob medida e atenção à estabilidade técnica.",
    keywords: [
        "João André",
        "Desenvolvimento Web",
        "Desenvolvedor de Software",
        "Desenvolvedor Front-End",
        "Desenvolvedor Full-Stack",
        "React",
        "TypeScript",
        "Next.js",
        "Node.js",
        "PHP",
        "Tailwind CSS",
        "Portfólio",
    ],
    authors: [{ name: "João André", url: "https://github.com/Jhnvida" }],
    creator: "João André",
    publisher: "João André",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: "João André — Desenvolvedor de Software",
        description:
            "Desenvolvimento de sites e aplicações web com foco em clareza visual, facilidade de uso e solidez técnica.",
        url: "/",
        siteName: "João André",
        locale: "pt_BR",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "João André — Desenvolvedor de Software",
        description:
            "Desenvolvimento de sites e aplicações web com foco em clareza visual, facilidade de uso e solidez técnica.",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pt-BR" className={`${outfit.variable} ${inter.variable} h-full antialiased`}>
            <body className="flex min-h-full flex-col bg-white text-neutral-950">
                <SmoothScrollProvider>
                    <CustomCursor />
                    <Header />
                    <main className="relative z-0 flex-1">{children}</main>
                    <Footer />
                </SmoothScrollProvider>
            </body>
        </html>
    );
}
