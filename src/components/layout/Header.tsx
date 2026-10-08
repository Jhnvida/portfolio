"use client";

import { Logo } from "../ui/Logo";
import { ThemeToggle } from "../ui/ThemeToggle";
import { Grid } from "./Grid";

export function Header() {
    return (
        <header className="header-frame bg-bg/90 backdrop-blur-md h-14 sm:h-16 transition-colors duration-200">
            <Grid className="h-full relative z-2">
                <div className="col-span-4 sm:col-span-8 lg:col-span-12 flex items-center justify-between h-full">
                    <Logo href="/" />
                    <ThemeToggle />
                </div>
            </Grid>
        </header>
    );
}
