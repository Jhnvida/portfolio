"use client";

import Link from "next/link";
import { useState } from "react";

export function Hero() {
    const [copied, setCopied] = useState(false);
    const email = "joao.vida.andre@gmail.com";

    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            const input = document.createElement("input");
            input.value = email;
            document.body.appendChild(input);
            input.select();
            document.execCommand("copy");
            document.body.removeChild(input);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <section className="px-6 pt-24 pb-20 md:pt-36 md:pb-28 text-center">
            <div className="mx-auto max-w-2xl">
                <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-neutral-950 leading-snug">
                    João André — desenvolvendo aplicações web com React, TypeScript, Node.js e PHP.
                </h1>

                <div className="mt-8 flex items-center justify-center gap-3 text-xs font-sans">
                    <button
                        type="button"
                        onClick={handleCopyEmail}
                        className="cursor-pointer rounded-full bg-neutral-950 px-4 py-2 text-white transition-opacity hover:opacity-85 active:opacity-75"
                        aria-label="Copiar endereço de e-mail"
                    >
                        {copied ? "Email copiado!" : "Copy email"}
                    </button>

                    <Link
                        href="/about"
                        className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-neutral-800 transition-colors hover:border-neutral-300 hover:bg-neutral-50"
                    >
                        + Information
                    </Link>
                </div>
            </div>
        </section>
    );
}
