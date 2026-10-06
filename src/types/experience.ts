export interface ExperienceRole {
    title: string;
    period: string;
}

export interface Experience {
    company: string;
    roles: ExperienceRole[];
}
