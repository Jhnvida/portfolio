import type { Metadata } from "next";
import { AboutView } from "../../components/about/AboutView";

export const metadata: Metadata = {
    title: "Sobre",
    description:
        "Conheça quem está por trás dos projetos: curiosidade, aprendizado contínuo e paixão por construir para a web.",
};

export default function AboutPage() {
    return <AboutView />;
}
