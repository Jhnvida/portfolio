import type { Metadata } from "next";
import { WorkShowcase } from "../../components/sections";

export const metadata: Metadata = {
    title: "Projetos",
    description: "Projetos autorais e experimentos desenvolvidos com cuidado no design e na engenharia web.",
};

export default function WorkPage() {
    return (
        <main className="w-full pt-32 pb-12 relative">
            <WorkShowcase />
        </main>
    );
}
