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
                    backgroundColor: 'var(--secondary)',
                    y: -2,
                },
            }}
            whileHover="hover"
            className="cursor-pointer space-y-3 rounded-xl border border-border bg-card p-4 lg:p-6"
        >
            <motion.span
                variants={{
                    hover: {
                        backgroundColor: 'var(--primary)',
                        color: '#ffffff',
                    },
                }}
                className="inline-block rounded-[8px] bg-primary/10 p-2 text-primary"
            >
                <Icon className="text-[28px]" />
            </motion.span>
            <h2 className="dv-h3">{title}</h2>
            <p className="dv-body text-muted-foreground">{content}</p>
        </motion.li>
    )
}
