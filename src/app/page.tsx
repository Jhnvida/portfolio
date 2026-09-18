import { Hero, Philosophy, Process, SelectedWork } from "../components/sections";

export default function Home() {
    return (
        <main className="w-full flex flex-col">
            <Hero />
            <SelectedWork />
            <Philosophy />
            <Process />
        </main>
    );
}
