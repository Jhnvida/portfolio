import type { Metadata } from "next";
import { DM_Sans, Plus_Jakarta_Sans } from "next/font/google";
import { ReactNode } from "react";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { SmoothScrollProvider } from "../components/providers/SmoothScrollProvider";
import { ViewTransitions } from "../components/providers/ViewTransitionsProvider";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-heading",
    display: "swap",
});

const dmSans = DM_Sans({
    subsets: ["latin"],
    variable: "--font-sans",
    display: "swap",
});

export const metadata: Metadata = {
    title: {
        template: "%s / João Vida",
        default: "Criações e Desenvolvimento Web / João Vida",
    },
    description:
        "Portfólio autoral de João Vida. Design de produto digital, engenharia front-end e explorações na web com rigor técnico e cuidado estético.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html
            lang="pt-BR"
            className={`${plusJakartaSans.variable} ${dmSans.variable} h-full antialiased bg-[#050505] text-[#fafafa]`}
        >
            <body className="min-h-full bg-[#050505] text-[#fafafa] selection:bg-neutral-800 selection:text-white font-sans overflow-x-clip">
                <SmoothScrollProvider>
                    <ViewTransitions>
                        <div className="w-full bg-[#050505] min-h-dvh flex justify-center overflow-x-clip">
                            <div className="w-full max-w-4xl mx-auto min-h-dvh border-x border-neutral-800/50 bg-[#050505] flex flex-col relative overflow-x-clip">
                                <Header />
                                <div className="flex-1 flex flex-col w-full">{children}</div>
                                <Footer />
                            </div>
                        </div>
                    </ViewTransitions>
                </SmoothScrollProvider>
            </body>
        </html>
    );
}
