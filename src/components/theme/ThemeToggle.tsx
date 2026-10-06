"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import { useTheme } from "./ThemeProvider";

interface ThemeToggleProps {
    className?: string;
}

const emptySubscribe = () => () => {};

export function ThemeToggle({ className }: ThemeToggleProps) {
    const { resolvedTheme, toggleTheme } = useTheme();

    const isClient = useSyncExternalStore(
        emptySubscribe,
        () => true,
        () => false,
    );

    if (!isClient) {
        return (
            <div
                className={`inline-flex h-8 w-8 items-center justify-center rounded-full opacity-0 ${className ?? ""}`}
                aria-hidden="true"
            />
        );
    }

    const isDark = resolvedTheme === "dark";

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Mudar para tema claro" : "Mudar para tema escuro"}
            title={isDark ? "Tema claro" : "Tema escuro"}
            className={`group relative inline-flex h-8 w-8 items-center justify-center rounded-full text-ink-2 transition-colors duration-200 hover:text-ink hover:bg-surface-strong/60 active:scale-95 focus-visible:outline-2 focus-visible:outline-ink ${className ?? ""}`}
        >
            <span className="relative flex h-4 w-4 items-center justify-center overflow-hidden">
                <Sun
                    size={15}
                    strokeWidth={2}
                    className={`absolute transition-all duration-300 motion-reduce:transition-none ${
                        isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
                    }`}
                />
                <Moon
                    size={15}
                    strokeWidth={2}
                    className={`absolute transition-all duration-300 motion-reduce:transition-none ${
                        isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
                    }`}
                />
            </span>
        </button>
    );
}
