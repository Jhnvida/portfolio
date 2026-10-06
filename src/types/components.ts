import { AnchorHTMLAttributes, ElementType, HTMLAttributes, ReactNode } from "react";
import { CaseBlock, Project, ProjectSummary } from "./project";

export interface ListRowProps {
    title: ReactNode;
    leading?: ReactNode;
    badge?: ReactNode;
    subtitle?: ReactNode;
    value?: ReactNode;
    href?: string;
    muted?: boolean;
    className?: string;
    previewImage?: string;
    stackedOnMobile?: boolean;
}

export type ButtonProps = {
    href: string;
    children: ReactNode;
    variant?: "primary" | "secondary";
    external?: boolean;
    className?: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">;

export interface RevealProps extends HTMLAttributes<HTMLElement> {
    children: ReactNode;
    as?: ElementType;
    stagger?: boolean;
    variant?: "media";
}

export interface SectionHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    title: ReactNode;
    action?: ReactNode;
}

export interface ThemeToggleProps {
    className?: string;
}

export interface GridProps {
    children: ReactNode;
    as?: ElementType;
    className?: string;
}

export interface NavPillProps {
    isFloating?: boolean;
    variant?: "default" | "floating";
    viewTransition?: boolean;
}

export interface HeroProps {
    project: Project;
}

export interface EditorialProps {
    block: Extract<CaseBlock, { type: "editorial" }>;
}

export interface MediaProps {
    block: Extract<CaseBlock, { type: "media" }>;
}

export interface NextProjectProps {
    nextProject?: ProjectSummary;
    currentSlug: string;
}

export interface ProjectListProps {
    children: ReactNode;
    projects: ProjectSummary[];
}
