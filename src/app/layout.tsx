import type { Metadata, Viewport } from "next";
import { Geist, Newsreader } from "next/font/google";
import { ReactNode } from "react";
import { SiteFooter } from "../components/layout/SiteFooter";
import { SiteHeader } from "../components/layout/SiteHeader";
import { SITE } from "../data/site";
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
        template: `%s / ${SITE.name}`,
        default: `${SITE.role} / ${SITE.name}`,
    },
    description: `Portfólio de ${SITE.name}, desenvolvedor full stack em ${SITE.location.city}, ${SITE.location.region}. Interfaces em React e Vue.js, sistemas em Node.js e PHP.`,
};

export const viewport: Viewport = {
    themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="pt-BR" data-scroll-behavior="smooth" className={`${geist.variable} ${newsreader.variable}`}>
            <body className="flex min-h-dvh flex-col bg-bg text-ink">
                <SiteHeader />
                <div className="flex flex-1 flex-col">{children}</div>
                <SiteFooter />
            </body>
        </html>
    );
}
