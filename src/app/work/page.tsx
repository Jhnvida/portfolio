import type { Metadata } from "next";
import { WorkView } from "../../components/work/WorkView";
import { PROJECTS } from "../../data/projects";

export const metadata: Metadata = {
    title: "Projetos",
    description: "Projetos autorais e experimentos desenvolvidos com rigor estético e engenharia web moderna.",
};

export default function WorkPage() {
    return <WorkView projects={PROJECTS} />;
}
