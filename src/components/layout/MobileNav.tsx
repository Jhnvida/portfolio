import Link from "next/link";
import { HEADER_LINKS } from "../../data/navigation";
import { Button } from "../ui/Button";

interface MobileNavProps {
    isOpen: boolean;
    onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
    return (
        <div
            id="mobile-menu"
            className={`fixed inset-0 bg-neutral-950/95 backdrop-blur-xl flex flex-col justify-center items-center gap-8 transition-all duration-500 md:hidden -z-10 ${
                isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
            }`}
        >
            <nav className="flex flex-col items-center gap-8 text-2xl font-medium">
                {HEADER_LINKS.map((link) => (
                    <Link
                        key={link.label}
                        href={link.href}
                        className="hover:text-white text-gray-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm px-2"
                        onClick={onClose}
                    >
                        {link.label}
                    </Link>
                ))}

                <Button href="/contact" variant="secondary" className="mt-4 px-8 py-4" onClick={onClose}>
                    Contato
                </Button>
            </nav>
        </div>
    );
}
