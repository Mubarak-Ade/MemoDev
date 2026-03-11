import { motion } from 'motion/react';
import type { IconType } from 'react-icons/lib';

interface FeatureCardProps {
    title: string
    icon: IconType
    content: string
}

export const FeatureCard = ({ title, icon: Icon, content }: FeatureCardProps) => {
    return (
        <motion.li
            variants={{
                hover: {
                    backgroundColor: 'var(--ink-black-2)',
                    scale: 1.05
                },
            }}
            whileHover="hover"
            className="p-8 border-accent/20 space-y-3 cursor-pointer rounded-xl border"
        >
            <motion.span
                variants={{
                    hover: {
                        backgroundColor: 'var(--color-primary)',
                        color: 'var(--color-white)',
                    },
                }}
                className="p-2.5 inline-block rounded-md text-primary bg-primary/10"
            >
                <Icon className="text-4xl" />
            </motion.span>
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="text-accent leading-6 ">{content}</p>
        </motion.li>
    )
}
