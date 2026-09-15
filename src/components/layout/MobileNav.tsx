import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { HEADER_LINKS } from "../../data/navigation";

interface MobileNavProps {
    isOpen: boolean;
    onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
    return (
        <div
            id="mobile-menu"
            className={`fixed inset-0 bg-[#050505]/95 backdrop-blur-xl flex flex-col justify-center items-center gap-8 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden -z-10 ${
                isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
            }`}
        >
            <nav className="flex flex-col items-center gap-10 text-3xl font-medium tracking-tight">
                {HEADER_LINKS.map((link) => (
                    <Link
                        key={link.label}
                        href={link.href}
                        className="text-neutral-400 hover:text-white transition-colors focus-visible:outline-none"
                        onClick={onClose}
                    >
                        {link.label}
                    </Link>
                ))}

                <div className="w-12 h-px bg-white/10 my-4" />

                <Link
                    href="/contact"
                    className="flex items-center gap-2 text-xl text-neutral-300 hover:text-white transition-colors focus-visible:outline-none"
                    onClick={onClose}
                >
                    Contato
                    <ArrowUpRight size={20} className="opacity-70" />
                </Link>
            </nav>
        </div>
    );
}
