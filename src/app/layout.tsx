import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { PageTransitionContent, PageTransitionProvider } from "@/components/providers/page-transition-provider";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { CustomCursor } from "@/components/ui/custom-cursor";
import type { Metadata } from "next";
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

export const metadata: Metadata = {
    title: {
        default: "João André — Desenvolvedor de Software",
        template: "João André — %s",
    },
    description:
        "Desenvolvedor de software focado em sites e aplicações web. Criação de interfaces funcionais, sistemas sob medida e atenção à estabilidade técnica.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pt-BR" className={`${outfit.variable} ${inter.variable} h-full antialiased`}>
            <body className="flex min-h-full flex-col bg-white text-neutral-950">
                <SmoothScrollProvider>
                    <PageTransitionProvider>
                        <CustomCursor />

                        <Header />
                        <main id="main-content" className="relative z-0 flex-1 flex flex-col">
                            <PageTransitionContent>{children}</PageTransitionContent>
                        </main>
                        <Footer />
                    </PageTransitionProvider>
                </SmoothScrollProvider>
            </body>
        </html>
    );
}
