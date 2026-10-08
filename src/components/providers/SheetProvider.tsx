"use client";

import { createContext, ReactNode, useCallback, useContext, useState } from "react";

export type SheetState =
    | null
    | { type: "work" }
    | { type: "about" }
    | { type: "project"; slug: string; returnToWork?: boolean };

interface SheetContextValue {
    sheet: SheetState;
    isOpen: boolean;
    openWork: () => void;
    openAbout: () => void;
    openProject: (slug: string, returnToWork?: boolean) => void;
    backToWork: () => void;
    closeSheet: () => void;
}

const SheetContext = createContext<SheetContextValue | null>(null);

export function SheetProvider({ children }: { children: ReactNode }) {
    const [sheet, setSheet] = useState<SheetState>(null);

    const openWork = useCallback(() => {
        setSheet({ type: "work" });
    }, []);

    const openAbout = useCallback(() => {
        setSheet({ type: "about" });
    }, []);

    const openProject = useCallback((slug: string, returnToWork = false) => {
        setSheet({ type: "project", slug, returnToWork });
    }, []);

    const backToWork = useCallback(() => {
        setSheet({ type: "work" });
    }, []);

    const closeSheet = useCallback(() => {
        setSheet(null);
    }, []);

    return (
        <SheetContext.Provider
            value={{
                sheet,
                isOpen: sheet !== null,
                openWork,
                openAbout,
                openProject,
                backToWork,
                closeSheet,
            }}
        >
            {children}
        </SheetContext.Provider>
    );
}

export function useSheet() {
    const context = useContext(SheetContext);
    if (!context) {
        throw new Error("useSheet must be used within a SheetProvider");
    }
    return context;
}
