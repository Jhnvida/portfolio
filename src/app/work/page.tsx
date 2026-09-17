import type { Metadata } from "next";
import { WorkShowcase } from "../../components/sections";

export const metadata: Metadata = {
    title: "Trabalhos",
    description: "Casos de estudo de projetos que unem estética premium e performance extrema.",
};

export default function WorkPage() {
    return (
        <main className="w-full pt-32 pb-12 relative">
            <WorkShowcase />
        </main>
    );
}
