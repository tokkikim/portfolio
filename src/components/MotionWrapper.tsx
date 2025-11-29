'use client';

import { motion } from 'framer-motion';
import { CSSProperties } from 'react';

interface MotionProps {
    children: React.ReactNode;
    className?: string;
    style?: CSSProperties;
}

interface FadeInProps extends MotionProps {
    delay?: number;
}

export const FadeIn = ({ children, delay = 0, className = '', style }: FadeInProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
            className={className}
            style={style}
        >
            {children}
        </motion.div>
    );
};

export const StaggerContainer = ({ children, className = '', style }: MotionProps) => {
    return (
        <motion.div
            initial="hidden"
            animate="show"
            variants={{
                hidden: { opacity: 0 },
                show: {
                    opacity: 1,
                    transition: {
                        staggerChildren: 0.2
                    }
                }
            }}
            className={className}
            style={style}
        >
            {children}
        </motion.div>
    );
};

export const StaggerItem = ({ children, className = '', style }: MotionProps) => {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
            }}
            className={className}
            style={style}
        >
            {children}
        </motion.div>
    );
};

