import type { Project, ProjectSummary } from "../../types/project";
import { ourJourneyProject } from "./items/our-journey";
import { portfolioProject } from "./items/portfolio";

const PROJECTS: Project[] = [portfolioProject, ourJourneyProject];

function toSummary(project: Project): ProjectSummary {
    return {
        id: project.id,
        title: project.title,
        summary: project.summary,
        category: project.category,
        client: project.client,
        role: project.role,
        impact: project.impact,
        image: project.image,
        slug: project.slug,
        stack: project.stack,
        year: project.year,
        githubUrl: project.githubUrl,
        featured: project.featured,
    };
}

export function getAllProjects(): ProjectSummary[] {
    return PROJECTS.map(toSummary);
}

export function getFeaturedProjects(): ProjectSummary[] {
    return PROJECTS.filter((project) => project.featured).map(toSummary);
}

export function getProjectBySlug(slug: string): Project | undefined {
    return PROJECTS.find((project) => project.slug === slug);
}

export function getNextProject(currentSlug: string): ProjectSummary | undefined {
    const currentIndex = PROJECTS.findIndex((project) => project.slug === currentSlug);
    if (currentIndex === -1) return undefined;

    const nextIndex = (currentIndex + 1) % PROJECTS.length;
    return toSummary(PROJECTS[nextIndex]);
}

export function getPreviousProject(currentSlug: string): ProjectSummary | undefined {
    const currentIndex = PROJECTS.findIndex((project) => project.slug === currentSlug);
    if (currentIndex === -1) return undefined;

    const prevIndex = (currentIndex - 1 + PROJECTS.length) % PROJECTS.length;
    return toSummary(PROJECTS[prevIndex]);
}

export function getProjectNavigation(currentSlug: string) {
    const currentIndex = PROJECTS.findIndex((project) => project.slug === currentSlug);
    if (currentIndex === -1) return null;

    const total = PROJECTS.length;
    const prevIndex = (currentIndex - 1 + total) % total;
    const nextIndex = (currentIndex + 1) % total;

    return {
        currentIndex,
        currentNumber: currentIndex + 1,
        total,
        prevProject: toSummary(PROJECTS[prevIndex]),
        nextProject: toSummary(PROJECTS[nextIndex]),
    };
}
