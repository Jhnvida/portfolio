"use client";

import { motion, Variants } from "motion/react";
import Link from "next/link";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export function Hero() {
    return (
        <div className="w-full max-w-(--container-page) mx-auto px-6 md:px-12 lg:px-24 flex-1 flex items-center">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 w-full"
            >
                <div>
                    <motion.h1
                        variants={itemVariants}
                        className="text-white text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.1]"
                    >
                        Engenharia de software focada em interfaces refinadas.
                    </motion.h1>
                    <motion.p
                        variants={itemVariants}
                        className="text-neutral-400 text-lg max-w-xl mt-6 leading-relaxed"
                    >
                        Desenvolvimento full-stack especializado em produtos digitais de alto desempenho, unindo
                        arquitetura robusta e estética premium.
                    </motion.p>
                    <motion.div variants={itemVariants}>
                        <Link
                            href="/work"
                            className="inline-block mt-8 px-6 py-3 bg-white text-black font-medium hover:bg-neutral-200 transition-colors"
                        >
                            Ver trabalhos
                        </Link>
                    </motion.div>
                </div>

                <div className="hidden lg:block" />
            </motion.div>
        </div>
    );
}
