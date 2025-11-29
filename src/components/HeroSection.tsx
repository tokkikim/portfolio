'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FadeIn } from '@/components/MotionWrapper';

interface HeroSectionProps {
    data: {
        title: string;
        subtitle: string;
    };
}

export default function HeroSection({ data }: HeroSectionProps) {
    const [clickCount, setClickCount] = useState(0);
    const showAdmin = clickCount >= 5;

    const handleTitleClick = () => {
        if (clickCount < 5) {
            setClickCount((prev) => prev + 1);
        }
    };

    return (
        <section className="section" style={{ alignItems: 'center', textAlign: 'center', minHeight: 'auto' }}>
            <FadeIn>
                <h1
                    onClick={handleTitleClick}
                    style={{
                        fontSize: '4rem',
                        fontWeight: 800,
                        marginBottom: '1rem',
                        background: 'linear-gradient(to right, var(--primary), var(--secondary))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        cursor: 'default',
                        userSelect: 'none'
                    }}
                >
                    {data.title}
                </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
                <p style={{ fontSize: '1.5rem', maxWidth: '600px', marginBottom: '2rem', color: '#ccc', margin: '0 auto 2rem auto' }}>
                    {data.subtitle}
                </p>
            </FadeIn>
            <FadeIn delay={0.4}>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', minHeight: '60px' }}>
                    <Link href="/#projects" className="glass" style={{ padding: '1rem 2rem', fontWeight: 'bold', transition: 'all 0.3s' }}>
                        View Projects
                    </Link>

                    {showAdmin && (
                        <Link href="/admin" className="glass" style={{ padding: '1rem 2rem', fontWeight: 'bold', transition: 'all 0.3s', borderColor: 'var(--primary)' }}>
                            Admin Portal
                        </Link>
                    )}
                </div>
            </FadeIn>
        </section>
    );
}
