import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { ReactNode } from "react";
import { SmoothScrollProvider } from "../components/providers/SmoothScrollProvider";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-heading",
    display: "swap",
});

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
    display: "swap",
});

export const metadata: Metadata = {
    title: "João Silva - Full-Stack Engineer",
    description: "Crafting high-performance digital products and immersive interfaces.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="pt-BR" className={`${plusJakartaSans.variable} ${inter.variable} h-full antialiased`}>
            <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-accent selection:text-accent-foreground font-sans">
                <SmoothScrollProvider>{children}</SmoothScrollProvider>
            </body>
        </html>
    );
}
