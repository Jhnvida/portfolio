"use client";

import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useSyncExternalStore } from "react";
import { Theme, ThemeContextType } from "../../types";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const STORAGE_KEY = "portfolio-theme";

function getStoredTheme(): Theme | null {
    if (typeof window === "undefined") return null;
    try {
        const item = localStorage.getItem(STORAGE_KEY);
        return item === "light" || item === "dark" ? item : null;
    } catch {
        return null;
    }
}

function applyThemeToDOM(newTheme: Theme, withTransition = true) {
    if (typeof document === "undefined") return;
    const root = document.documentElement;

    if (withTransition) {
        root.classList.add("theme-transitioning");
    }

    if (newTheme === "dark") {
        root.classList.add("dark");
    } else {
        root.classList.remove("dark");
    }

    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
        metaTheme.setAttribute("content", newTheme === "dark" ? "#0f0f0e" : "#ffffff");
    }

    if (withTransition) {
        window.setTimeout(() => {
            root.classList.remove("theme-transitioning");
        }, 250);
    }
}

let themeListeners: Array<() => void> = [];

function subscribe(callback: () => void) {
    themeListeners.push(callback);
    return () => {
        themeListeners = themeListeners.filter((l) => l !== callback);
    };
}

function notify() {
    themeListeners.forEach((l) => l());
}

export function ThemeProvider({ children }: { children: ReactNode }) {
    const theme = useSyncExternalStore<Theme>(
        subscribe,
        () => getStoredTheme() ?? "light",
        () => "light",
    );

    useEffect(() => {
        applyThemeToDOM(theme, false);
    }, [theme]);

    const setTheme = useCallback((newTheme: Theme) => {
        try {
            localStorage.setItem(STORAGE_KEY, newTheme);
        } catch {}
        applyThemeToDOM(newTheme, true);
        notify();
    }, []);

    const toggleTheme = useCallback(() => {
        const next = theme === "dark" ? "light" : "dark";
        setTheme(next);
    }, [theme, setTheme]);

    const value = useMemo(
        () => ({
            theme,
            resolvedTheme: theme,
            setTheme,
            toggleTheme,
        }),
        [theme, setTheme, toggleTheme],
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
