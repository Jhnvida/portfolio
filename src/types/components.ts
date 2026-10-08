import { ElementType, HTMLAttributes, ReactNode } from "react";
import { CaseBlock, Project, ProjectSummary } from "./project";

export interface ListRowProps {
    title: ReactNode;
    leading?: ReactNode;
    badge?: ReactNode;
    subtitle?: ReactNode;
    value?: ReactNode;
    href?: string;
    onClick?: () => void;
    muted?: boolean;
    className?: string;
    previewImage?: string;
    stackedOnMobile?: boolean;
}

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "link";

export type ButtonProps = {
    href?: string;
    onClick?: () => void;
    children?: ReactNode;
    variant?: ButtonVariant;
    external?: boolean;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    className?: string;
    icon?: ReactNode;
    endIcon?: ReactNode;
    title?: string;
    "aria-label"?: string;
};

export type IconButtonProps = {
    onClick?: () => void;
    href?: string;
    external?: boolean;
    children: ReactNode;
    "aria-label": string;
    title?: string;
    className?: string;
    disabled?: boolean;
};

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
    onBack?: () => void;
}

export interface EditorialProps {
    block: Extract<CaseBlock, { type: "editorial" }>;
}

export interface MediaProps {
    block: Extract<CaseBlock, { type: "media" }>;
}

export interface NextProjectProps {
    nextProject?: ProjectSummary;
    prevProject?: ProjectSummary;
    currentNumber?: number;
    totalProjects?: number;
    currentSlug: string;
    onSelectProject?: (slug: string) => void;
}

export interface ProjectListProps {
    children: ReactNode;
    projects: ProjectSummary[];
    onHoverProject?: (image: string | null) => void;
}
