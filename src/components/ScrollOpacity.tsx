'use client';

import { useScroll, useTransform, motion } from 'framer-motion';

export default function ScrollOpacity({ children }: { children: React.ReactNode }) {
    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [0, 400], [1, 0]); // Fade out as user scrolls down

    return (
        <motion.div style={{ opacity, width: '100%' }}>
            {children}
        </motion.div>
    );
}
