'use client';

import { FadeIn, StaggerContainer, StaggerItem } from './MotionWrapper';

interface CareerItem {
    id: number;
    year: string;
    role: string;
    title: string;
    details: string[];
}

interface CareerSectionProps {
    data: CareerItem[];
}

export default function CareerSection({ data }: CareerSectionProps) {
    return (
        <section className="section" style={{ position: 'relative', overflow: 'hidden' }}>
            <div className="container">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>

                    {/* Section Title */}
                    <FadeIn>
                        <div style={{ marginBottom: '2rem' }}>
                            <h2 style={{
                                fontSize: '3rem',
                                fontWeight: 'bold',
                                lineHeight: 1.2,
                                background: 'linear-gradient(to right, #fff, #aaa)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>
                                쉬지 않고<br />
                                함께 성장해온<br />
                                동반자
                            </h2>
                        </div>
                    </FadeIn>

                    {/* Timeline Structure (Grid Layout) */}
                    <div style={{ position: 'relative' }}>
                        <StaggerContainer className="career-list" style={{ display: 'flex', flexDirection: 'column' }}>
                            {data.map((item, index) => (
                                <StaggerItem key={item.id} style={{
                                    display: 'grid',
                                    gridTemplateColumns: '120px 60px 1fr', // [Year] [Line/Dot] [Card]
                                    gap: '0',
                                    position: 'relative'
                                }}>

                                    {/* 1. Left: Year & Role */}
                                    <div style={{
                                        textAlign: 'right',
                                        paddingTop: '1.5rem', // Align with card header
                                        paddingRight: '0.5rem'
                                    }}>
                                        <div style={{
                                            fontSize: '1.5rem',
                                            fontWeight: 'bold',
                                            color: '#fff',
                                            lineHeight: 1
                                        }}>
                                            {item.year}
                                        </div>
                                        <div style={{
                                            fontSize: '0.85rem',
                                            color: '#aaa',
                                            marginTop: '0.5rem',
                                            lineHeight: 1.4
                                        }}>
                                            {item.role}
                                        </div>
                                    </div>

                                    {/* 2. Center: Timeline Line & Dot */}
                                    <div style={{
                                        position: 'relative',
                                        display: 'flex',
                                        justifyContent: 'center'
                                    }}>
                                        {/* Vertical Line */}
                                        <div style={{
                                            position: 'absolute',
                                            top: 0,
                                            bottom: index === data.length - 1 ? 'auto' : 0, // Stop line at last item's dot? No, let's extend to bottom of card for flow, or stop. Let's extend full height for continuity except last.
                                            height: index === data.length - 1 ? '2rem' : '100%', // Short line for last item
                                            width: '2px',
                                            background: 'rgba(255,255,255,0.2)',
                                            zIndex: 0
                                        }}></div>

                                        {/* Dot */}
                                        <div style={{
                                            width: '16px',
                                            height: '16px',
                                            borderRadius: '50%',
                                            background: '#fff',
                                            border: '3px solid #000', // Contrast with line
                                            boxShadow: '0 0 10px rgba(255,255,255,0.5)',
                                            zIndex: 1,
                                            marginTop: '1.8rem' // Align with Year text and Card Header
                                        }}></div>
                                    </div>

                                    {/* 3. Right: Card */}
                                    <div style={{
                                        paddingBottom: '3rem' // Space between items
                                    }}>
                                        <div style={{
                                            border: '1px solid var(--glass-border)',
                                            borderRadius: '0.5rem',
                                            overflow: 'hidden',
                                            background: 'rgba(20, 20, 20, 0.6)',
                                            backdropFilter: 'blur(10px)',
                                            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                                        }}
                                            className="career-card"
                                        >
                                            {/* Card Header */}
                                            <div style={{
                                                background: 'linear-gradient(90deg, #0052D4, #4364F7)',
                                                padding: '1rem 1.5rem',
                                                fontWeight: 'bold',
                                                fontSize: '1.2rem',
                                                color: 'white'
                                            }}>
                                                {item.title}
                                            </div>

                                            {/* Card Body */}
                                            <div style={{ padding: '1.5rem' }}>
                                                <ul style={{
                                                    listStyle: 'none',
                                                    padding: 0,
                                                    margin: 0,
                                                    display: 'grid',
                                                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                                    gap: '0.8rem'
                                                }}>
                                                    {item.details.map((detail, i) => (
                                                        <li key={i} style={{
                                                            color: '#ddd',
                                                            fontSize: '0.95rem',
                                                            lineHeight: 1.5,
                                                            display: 'flex',
                                                            alignItems: 'start',
                                                            gap: '0.5rem'
                                                        }}>
                                                            <span style={{
                                                                color: '#4364F7',
                                                                marginTop: '4px',
                                                                fontSize: '0.8rem'
                                                            }}>●</span>
                                                            {detail}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    </div>

                </div>
            </div>
        </section>
    );
}
