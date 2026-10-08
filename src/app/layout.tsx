import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { ReactNode } from "react";
import { ContentSheet } from "../components/layout/ContentSheet";
import { Footer } from "../components/layout/Footer";
import { SheetProvider } from "../components/providers/SheetProvider";
import { SmoothScroll } from "../components/providers/SmoothScroll";
import { ThemeProvider } from "../components/providers/Theme";
import { SITE } from "../data/site";
import "./globals.css";

const manrope = Manrope({
    subsets: ["latin"],
    variable: "--font-manrope",
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

const themeScript = `
(function() {
    try {
        var stored = localStorage.getItem('portfolio-theme');
        if (stored === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="pt-BR" suppressHydrationWarning className={manrope.variable}>
            <head>
                <script dangerouslySetInnerHTML={{ __html: themeScript }} />
            </head>

            <body className="flex min-h-dvh flex-col bg-bg text-ink overflow-x-clip">
                <ThemeProvider>
                    <SmoothScroll>
                        <SheetProvider>
                            <div className="page-frame flex flex-1 flex-col">
                                {children}
                                <Footer />
                            </div>
                            <ContentSheet />
                        </SheetProvider>
                    </SmoothScroll>
                </ThemeProvider>
            </body>
        </html>
    );
}
