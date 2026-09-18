import type { Metadata } from "next";
import { ContactView } from "../../components/contact/ContactView";

export const metadata: Metadata = {
    title: "Contato",
    description: "Canais diretos para conversar sobre projetos, ideias e desenvolvimento web com João Vida.",
};

export default function ContactPage() {
    return <ContactView />;
}
