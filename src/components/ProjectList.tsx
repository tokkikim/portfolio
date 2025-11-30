'use client';

import { useState, useEffect } from 'react';
import { FadeIn, StaggerContainer, StaggerItem } from './MotionWrapper';
import Link from 'next/link';

interface Project {
    id: string;
    title: string;
    description: string;
    link: string;
    backgroundImage?: string;
}

interface ProjectListProps {
    projects: Project[];
    isAdmin: boolean;
}

export default function ProjectList({ projects, isAdmin }: ProjectListProps) {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [showWarning, setShowWarning] = useState(false);

    // Show warning when a project is selected
    useEffect(() => {
        if (selectedProject) {
            setShowWarning(true);
            const timer = setTimeout(() => {
                setShowWarning(false);
            }, 3000); // Show for 3 seconds
            return () => clearTimeout(timer);
        }
    }, [selectedProject]);

    // Prevent background scroll when modal is open
    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedProject]);

    return (
        <>
            <StaggerContainer className="grid-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {projects.map((project, index) => {
                    const isLocked = !isAdmin && index > 0;

                    return (
                        <StaggerItem
                            key={project.id}
                            className="glass"
                            style={{
                                padding: '2rem',
                                minHeight: '300px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-end',
                                background: project.backgroundImage ? `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.9)), url(${project.backgroundImage})` : 'rgba(255, 255, 255, 0.03)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                transition: 'transform 0.3s ease',
                                position: 'relative',
                                overflow: 'hidden',
                                filter: isLocked ? 'grayscale(30%)' : 'none',
                                pointerEvents: isLocked ? 'none' : 'auto',
                            }}
                        >
                            {isLocked && (
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    background: 'rgba(0, 0, 0, 0.05)',
                                    backdropFilter: 'none',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    zIndex: 20,
                                    color: '#fff',
                                    textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                                }}>
                                    <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔒</div>
                                    <span style={{ fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem' }}>Locked</span>
                                </div>
                            )}

                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', opacity: isLocked ? 0.5 : 1 }}>{project.title}</h3>
                            <p style={{ color: '#aaa', marginBottom: '1rem', opacity: isLocked ? 0.5 : 1 }}>{project.description}</p>

                            <button
                                onClick={() => setSelectedProject(project)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    padding: 0,
                                    color: 'var(--primary)',
                                    fontWeight: 'bold',
                                    opacity: isLocked ? 0.5 : 1,
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    fontSize: '1rem'
                                }}
                            >
                                Learn More &rarr;
                            </button>
                        </StaggerItem>
                    );
                })}
            </StaggerContainer>

            {/* Project Modal */}
            {selectedProject && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    zIndex: 100,
                    background: 'rgba(0, 0, 0, 0.8)',
                    backdropFilter: 'blur(5px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem'
                }} onClick={() => setSelectedProject(null)}>
                    <div style={{
                        width: '90%',
                        height: '90%',
                        background: '#111',
                        border: '1px solid var(--glass-border)',
                        borderRadius: '1rem',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative'
                    }} onClick={(e) => e.stopPropagation()}>

                        {/* Header */}
                        <div style={{
                            padding: '1rem 2rem',
                            borderBottom: '1px solid var(--glass-border)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            background: 'rgba(255,255,255,0.05)'
                        }}>
                            <h3 style={{ margin: 0 }}>{selectedProject.title}</h3>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <a
                                    href={selectedProject.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        fontSize: '0.9rem',
                                        color: 'var(--primary)',
                                        textDecoration: 'none'
                                    }}
                                >
                                    Open in New Tab ↗
                                </a>
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: '#fff',
                                        fontSize: '1.5rem',
                                        cursor: 'pointer'
                                    }}
                                >
                                    ×
                                </button>
                            </div>
                        </div>

                        {/* Content (Iframe) */}
                        <div style={{ flex: 1, position: 'relative', background: '#fff' }}>
                            {/* Warning Overlay */}
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                background: 'rgba(0, 0, 0, 0.7)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                zIndex: 10,
                                opacity: showWarning ? 1 : 0,
                                pointerEvents: 'none', // Allow clicks to pass through after it fades
                                transition: 'opacity 0.5s ease-in-out',
                            }}>
                                <div style={{
                                    background: 'rgba(0, 0, 0, 0.8)',
                                    padding: '1.5rem 2rem',
                                    borderRadius: '1rem',
                                    textAlign: 'center',
                                    maxWidth: '80%',
                                    boxShadow: '0 0 30px rgba(0, 240, 255, 0.2)'
                                }}>
                                    <p style={{ color: '#fff', fontSize: '1.1rem', lineHeight: 1.5, margin: 0 }}>
                                        ⓘ 권한 문제로 일부 기능이 동작되지 않는 경우<br />
                                        우측상단의 <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Open in New Tab</span>을 이용하세요.
                                    </p>
                                </div>
                            </div>

                            <iframe
                                src={selectedProject.link}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    border: 'none'
                                }}
                                title={selectedProject.title}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
