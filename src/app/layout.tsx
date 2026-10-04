import type { Metadata, Viewport } from "next";
import { Geist, Newsreader } from "next/font/google";
import { ReactNode } from "react";
import { SiteFooter } from "../components/layout/SiteFooter";
import { SiteHeader } from "../components/layout/SiteHeader";
import "./globals.css";

const geist = Geist({
    subsets: ["latin"],
    variable: "--font-geist",
    display: "swap",
});

const newsreader = Newsreader({
    subsets: ["latin"],
    style: ["normal", "italic"],
    variable: "--font-serif",
    display: "swap",
});

export const metadata: Metadata = {
    title: {
        template: "%s / João Vida",
        default: "Desenvolvedor Full Stack / João Vida",
    },
    description:
        "Portfólio de João Vida, desenvolvedor full stack em Jaguariúna, SP. Interfaces em React e Vue.js, sistemas em Node.js e PHP.",
};

export const viewport: Viewport = {
    themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="pt-BR" className={`${geist.variable} ${newsreader.variable}`}>
            <body className="flex min-h-dvh flex-col bg-bg text-ink">
                <SiteHeader />
                <div className="flex flex-1 flex-col">{children}</div>
                <SiteFooter />
            </body>
        </html>
    );
}
