'use client';

import { motion } from 'framer-motion';
import { CSSProperties, forwardRef } from 'react';

interface MotionProps {
    children: React.ReactNode;
    className?: string;
    style?: CSSProperties;
    [key: string]: any; // Allow additional props
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

export const StaggerContainer = forwardRef<HTMLDivElement, MotionProps>(
    ({ children, className = '', style, ...rest }, ref) => {
        return (
            <motion.div
                ref={ref}
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
                {...rest}
            >
                {children}
            </motion.div>
        );
    }
);

StaggerContainer.displayName = 'StaggerContainer';

export const StaggerItem = forwardRef<HTMLDivElement, MotionProps>(
    ({ children, className = '', style, ...rest }, ref) => {
        return (
            <motion.div
                ref={ref}
                variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 }
                }}
                className={className}
                style={style}
                {...rest}
            >
                {children}
            </motion.div>
        );
    }
);

StaggerItem.displayName = 'StaggerItem';

