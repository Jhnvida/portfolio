import type { Metadata } from "next";
import { AboutView } from "../../components/about/AboutView";
import { LayoutGrid } from "../../components/layout/LayoutGrid";
import { Page } from "../../components/layout/Page";

export const metadata: Metadata = {
    title: "Sobre",
    description: "Trajetória profissional, formação acadêmica e competências técnicas de João Vida.",
};

export default function AboutPage() {
    return (
        <Page className="flex flex-col pt-16 pb-24 sm:pt-24 sm:pb-32">
            <LayoutGrid>
                <div className="col-span-4 sm:col-span-8 lg:col-span-12">
                    <AboutView />
                </div>
            </LayoutGrid>
        </Page>
    );
}
