export type Theme = "light" | "dark";
export type RawTheme = Theme | "system";

export interface ThemeContextType {
    theme: Theme;
    resolvedTheme: Theme;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
}
