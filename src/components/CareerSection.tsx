'use client';

import { useState, useRef, useEffect } from 'react';
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
    const [activeYears, setActiveYears] = useState<Set<string>>(new Set());
    const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map());

    const toggleItem = (id: number) => {
        setExpandedItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    // IntersectionObserver to track visible items
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                setActiveYears((prevActiveYears) => {
                    const newActiveYears = new Set(prevActiveYears);
                    entries.forEach((entry) => {
                        const year = entry.target.getAttribute('data-year');
                        if (year) {
                            if (entry.isIntersecting && entry.intersectionRatio >= 0.7) {
                                newActiveYears.add(year);
                            } else {
                                newActiveYears.delete(year);
                            }
                        }
                    });
                    return newActiveYears;
                });
            },
            {
                root: scrollContainerRef.current,
                threshold: [0, 0.5, 0.7, 1],
                rootMargin: '0px'
            }
        );

        itemRefs.current.forEach((element) => {
            observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToYear = (year: string) => {
        const element = itemRefs.current.get(year);
        if (element && scrollContainerRef.current) {
            // Use scrollIntoView for reliable scrolling
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'start'
            });
        }
    };

    return (
        <section className="section" style={{ position: 'relative', overflow: 'hidden' }}>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                {/* Section Title */}
                <FadeIn>
                    <div>
                        <h2 className="career-title" style={{ fontSize: '2.5rem', marginBottom: '1.5rem', textAlign: 'left' }}>
                            Career
                        </h2>

                        {/* Year Indicator */}
                        <div className="year-indicator" style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            gap: '0',
                            marginBottom: '2.5rem',
                            position: 'relative'
                        }}>
                            {data.map((item, index) => (
                                <div key={item.id} style={{ display: 'flex', alignItems: 'center' }}>
                                    {/* Year Button */}
                                    <button
                                        onClick={() => scrollToYear(item.year)}
                                        style={{
                                            background: activeYears.has(item.year)
                                                ? '#ffffff'
                                                : 'rgba(255, 255, 255, 0.05)',
                                            border: '2px solid',
                                            borderColor: activeYears.has(item.year) ? '#000' : 'rgba(255, 255, 255, 0.2)',
                                            borderRadius: '12px',
                                            padding: '0.6rem 1.2rem',
                                            fontSize: '0.9rem',
                                            fontWeight: '600',
                                            color: activeYears.has(item.year) ? '#000' : '#fff',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                            boxShadow: activeYears.has(item.year)
                                                ? '0 4px 12px rgba(0, 0, 0, 0.15), 0 0 20px rgba(255, 255, 255, 0.2)'
                                                : '0 2px 8px rgba(0, 0, 0, 0.1)',
                                            transform: activeYears.has(item.year) ? 'scale(1.05)' : 'scale(1)',
                                            backdropFilter: 'blur(10px)',
                                            letterSpacing: '0.5px',
                                            position: 'relative',
                                            zIndex: activeYears.has(item.year) ? 2 : 1,
                                            outline: 'none'
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!activeYears.has(item.year)) {
                                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                                                e.currentTarget.style.transform = 'scale(1.05)';
                                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!activeYears.has(item.year)) {
                                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                                                e.currentTarget.style.transform = 'scale(1)';
                                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                                            }
                                        }}
                                    >
                                        {item.year}
                                    </button>

                                    {/* Connecting Line */}
                                    {index < data.length - 1 && (
                                        <div className="connecting-line" style={{
                                            width: '32px',
                                            height: '2px',
                                            background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1))',
                                            margin: '0',
                                            flexShrink: 0
                                        }}></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </FadeIn>

                {/* Timeline Structure (Horizontal Scroll Layout) */}
                <div style={{ position: 'relative' }}>
                    <style jsx global>{`
                            /* Custom Scrollbar */
                            .career-list::-webkit-scrollbar {
                                height: 8px;
                                display: block;
                            }
                            .career-list::-webkit-scrollbar-track {
                                background: rgba(255, 255, 255, 0.05);
                                border-radius: 4px;
                            }
                            .career-list::-webkit-scrollbar-thumb {
                                background: linear-gradient(90deg, #ffffff, #e0e0e0);
                                border-radius: 4px;
                            }
                            .career-list::-webkit-scrollbar-thumb:hover {
                                background: linear-gradient(90deg, #e0e0e0, #ffffff);
                            }

                            /* Mobile Responsive - Below 768px */
                            @media (max-width: 768px) {
                                /* Left align Career title */
                                .career-title {
                                    text-align: left !important;
                                }

                                /* Hide Year Indicator */
                                .year-indicator {
                                    display: none !important;
                                }

                                /* Career List - Vertical Stack */
                                .career-list {
                                    flex-direction: column !important;
                                    overflow-x: visible !important;
                                    overflow-y: visible !important;
                                    gap: 1rem !important;
                                    padding-bottom: 0 !important;
                                }

                                .career-list::-webkit-scrollbar {
                                    display: none !important;
                                }

                                /* Career Items - Full Width */
                                .career-item {
                                    min-width: 100% !important;
                                    padding-right: 0 !important;
                                }

                                /* Hide horizontal timeline dots and lines in mobile */
                                .timeline-dot-container {
                                    display: none !important;
                                }

                                /* Hide year and role in mobile */
                                .career-year-role {
                                    display: none !important;
                                }

                                /* Card adjustments */
                                .career-card-wrapper {
                                    padding-left: 0 !important;
                                    padding-right: 0 !important;
                                    opacity: 1 !important;
                                    filter: none !important;
                                }

                                /* Accordion Style */
                                .career-card {
                                    cursor: pointer;
                                }

                                .career-card-header {
                                    display: flex !important;
                                    flex-direction: column !important;
                                    align-items: flex-start !important;
                                    position: relative !important;
                                    text-align: left !important;
                                }

                                .career-card-header::after {
                                    content: '+';
                                    font-size: 1.5rem;
                                    position: absolute;
                                    right: 1.5rem;
                                    top: 50%;
                                    transform: translateY(-50%);
                                    transition: transform 0.3s ease;
                                }

                                .career-card.expanded .career-card-header::after {
                                    content: '−';
                                }

                                /* Show year and company in mobile accordion header */
                                .header-meta {
                                    display: block !important;
                                }

                                .header-title {
                                    margin-bottom: 0.5rem;
                                }

                                .career-card-body {
                                    max-height: 0;
                                    overflow: hidden;
                                    transition: max-height 0.3s ease, padding 0.3s ease;
                                    padding: 0 1.5rem !important;
                                }

                                .career-card.expanded .career-card-body {
                                    max-height: 1000px;
                                    padding: 1.5rem !important;
                                }
                            }

                            /* Extra Small Mobile - Below 480px */
                            @media (max-width: 480px) {
                                .year-indicator button {
                                    padding: 0.3rem 0.6rem !important;
                                    font-size: 0.7rem !important;
                                }

                                h2 {
                                    font-size: 2rem !important;
                                }
                            }
                        `}</style>

                    {/* Scroll Container */}
                    <StaggerContainer
                        ref={scrollContainerRef}
                        className="career-list"
                        style={{
                            display: 'flex',
                            gap: '0',
                            overflowX: 'auto',
                            paddingBottom: '2rem',
                            scrollSnapType: 'x mandatory',
                            scrollBehavior: 'smooth',
                            WebkitOverflowScrolling: 'touch',
                            scrollbarWidth: 'thin',
                            scrollbarColor: '#ffffff rgba(255, 255, 255, 0.05)'
                        }}
                    >
                        {data.map((item, index) => (
                            <StaggerItem
                                key={item.id}
                                ref={(el) => {
                                    if (el) itemRefs.current.set(item.year, el);
                                }}
                                data-year={item.year}
                                className="career-item"
                                style={{
                                    minWidth: '320px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    position: 'relative',
                                    scrollSnapAlign: 'start',
                                    paddingRight: '0'
                                }}
                            >

                                {/* 1. Top: Year & Role */}
                                <div className="career-year-role" style={{
                                    marginBottom: '1rem',
                                    textAlign: 'center'
                                }}>
                                    <div style={{
                                        fontSize: '1.5rem',
                                        fontWeight: 'bold',
                                        color: '#fff',
                                        lineHeight: 1,
                                        textShadow: activeYears.has(item.year)
                                            ? '0 0 20px rgba(255, 255, 255, 0.8)'
                                            : 'none',
                                        transition: 'all 0.3s ease'
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

                                {/* 2. Middle: Timeline Line & Dot */}
                                <div className="timeline-dot-container" style={{
                                    position: 'relative',
                                    height: '20px',
                                    marginBottom: '1.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    {/* Horizontal Line */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '50%',
                                        height: '1px',
                                        background: 'rgba(255, 255, 255, 0.3)',
                                        zIndex: 0,
                                        left: index === 0 ? '50%' : '0',
                                        width: index === 0
                                            ? '50%'
                                            : (index === data.length - 1 ? '50%' : '100%'),
                                        transition: 'all 0.3s ease'
                                    }}></div>

                                    {/* Dot */}
                                    <div style={{
                                        width: '16px',
                                        height: '16px',
                                        borderRadius: '50%',
                                        background: activeYears.has(item.year)
                                            ? '#ffffff'
                                            : '#fff',
                                        border: '3px solid',
                                        borderColor: activeYears.has(item.year) ? '#000' : '#000',
                                        boxShadow: activeYears.has(item.year)
                                            ? '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.4)'
                                            : '0 0 10px rgba(255,255,255,0.5)',
                                        zIndex: 1,
                                        transition: 'all 0.3s ease',
                                        transform: activeYears.has(item.year) ? 'scale(1.2)' : 'scale(1)'
                                    }}></div>
                                </div>

                                {/* 3. Bottom: Card */}
                                <div className="career-card-wrapper" style={{
                                    flex: 1,
                                    paddingRight: '2rem',
                                    paddingLeft: '1rem',
                                    opacity: activeYears.has(item.year) ? 1 : 0.4,
                                    filter: activeYears.has(item.year) ? 'brightness(1)' : 'brightness(0.6)',
                                    transition: 'all 0.5s ease'
                                }}>
                                    <div
                                        className={`career-card ${expandedItems.has(item.id) ? 'expanded' : ''}`}
                                        style={{
                                            border: '1px solid',
                                            borderColor: activeYears.has(item.year)
                                                ? 'rgba(255, 255, 255, 0.3)'
                                                : 'var(--glass-border)',
                                            borderRadius: '0.5rem',
                                            overflow: 'hidden',
                                            background: activeYears.has(item.year)
                                                ? 'rgba(30, 30, 30, 0.8)'
                                                : 'rgba(20, 20, 20, 0.6)',
                                            backdropFilter: 'blur(10px)',
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            transition: 'all 0.5s ease',
                                            boxShadow: activeYears.has(item.year)
                                                ? '0 8px 32px rgba(255, 255, 255, 0.1)'
                                                : 'none'
                                        }}
                                    >
                                        {/* Card Header */}
                                        <div
                                            className="career-card-header"
                                            onClick={() => toggleItem(item.id)}
                                            style={{
                                                background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
                                                padding: '1rem 1.5rem',
                                                fontWeight: 'bold',
                                                fontSize: '1.2rem',
                                                color: 'white',
                                                textAlign: 'center',
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            <div className="header-title">
                                                {item.title}
                                            </div>
                                            <div className="header-meta" style={{
                                                display: 'none',
                                                fontSize: '0.85rem',
                                                fontWeight: 'normal',
                                                color: '#aaa',
                                                marginTop: '0.5rem'
                                            }}>
                                                {item.year} | {item.role}
                                            </div>
                                        </div>

                                        {/* Card Body */}
                                        <div className="career-card-body" style={{ padding: '1.5rem', flex: 1 }}>
                                            <ul style={{
                                                listStyle: 'none',
                                                padding: 0,
                                                margin: 0,
                                                display: 'flex',
                                                flexDirection: 'column',
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
                                                            color: activeYears.has(item.year) ? '#ffffff' : '#4364F7',
                                                            marginTop: '4px',
                                                            fontSize: '0.8rem',
                                                            transition: 'all 0.3s ease'
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

        </section>
    );
}
