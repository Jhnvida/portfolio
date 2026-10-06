import type { Metadata, Viewport } from "next";
import { Geist, Newsreader } from "next/font/google";
import { ReactNode } from "react";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { SmoothScroll } from "../components/providers/SmoothScroll";
import { ThemeProvider } from "../components/providers/Theme";
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
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#ffffff" },
        { media: "(prefers-color-scheme: dark)", color: "#0f0f0e" },
    ],
};

const themeScript = `
(function() {
    try {
        var stored = localStorage.getItem('portfolio-theme');
        var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (stored === 'dark' || (!stored && prefersDark)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="pt-BR" suppressHydrationWarning className={`${geist.variable} ${newsreader.variable}`}>
            <head>
                <script dangerouslySetInnerHTML={{ __html: themeScript }} />
            </head>
            <body className="flex min-h-dvh flex-col bg-bg text-ink">
                <ThemeProvider>
                    <SmoothScroll>
                        <Header />
                        <div className="flex flex-1 flex-col">{children}</div>
                        <Footer />
                    </SmoothScroll>
                </ThemeProvider>
            </body>
        </html>
    );
}
