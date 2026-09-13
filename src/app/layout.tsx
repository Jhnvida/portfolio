import type { Metadata } from "next";
import { DM_Sans, Plus_Jakarta_Sans } from "next/font/google";
import { ReactNode } from "react";
import { Header } from "../components/layout/Header";
import { SmoothScrollProvider } from "../components/providers/SmoothScrollProvider";
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
        template: "%s / João Silva",
        default: "Full-Stack Engineer / João Silva",
    },
    description: "Engenharia de software focada em interfaces refinadas e produtos digitais de alto desempenho.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="pt-BR" className={`${plusJakartaSans.variable} ${dmSans.variable} h-full antialiased`}>
            <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-accent selection:text-accent-foreground font-sans">
                <SmoothScrollProvider>
                    <Header />
                    {children}
                </SmoothScrollProvider>
            </body>
        </html>
    );
}
