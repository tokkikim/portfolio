'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminPage() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('/api/portfolio')
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handleSave = async () => {
        setSaving(true);
        setMessage('');
        try {
            const res = await fetch('/api/portfolio', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (res.ok) {
                setMessage('Saved successfully!');
            } else {
                setMessage('Failed to save.');
            }
        } catch (err) {
            console.error(err);
            setMessage('Error saving data.');
        }
        setSaving(false);
    };

    const handleHeroChange = (field: string, value: string) => {
        setData({ ...data, hero: { ...data.hero, [field]: value } });
    };

    const handleProjectChange = (index: number, field: string, value: string) => {
        const newProjects = [...data.projects];
        newProjects[index] = { ...newProjects[index], [field]: value };
        setData({ ...data, projects: newProjects });
    };

    if (loading) return <div className="container section">Loading...</div>;
    if (!data) return <div className="container section">Error loading data.</div>;

    return (
        <div className="container section">
            <div className="glass" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem' }}>Admin Dashboard</h1>
                    <Link href="/" style={{ color: 'var(--primary)' }}>Back to Home</Link>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--secondary)' }}>Hero Section</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <label>
                            Title:
                            <input
                                type="text"
                                value={data.hero.title}
                                onChange={(e) => handleHeroChange('title', e.target.value)}
                                style={{ width: '100%', padding: '0.5rem', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--glass-border)', color: 'white', marginTop: '0.5rem' }}
                            />
                        </label>
                        <label>
                            Subtitle:
                            <textarea
                                value={data.hero.subtitle}
                                onChange={(e) => handleHeroChange('subtitle', e.target.value)}
                                style={{ width: '100%', padding: '0.5rem', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--glass-border)', color: 'white', marginTop: '0.5rem', minHeight: '100px' }}
                            />
                        </label>
                    </div>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--secondary)' }}>Projects</h2>
                    {data.projects.map((project: any, index: number) => (
                        <div key={project.id} style={{ marginBottom: '1.5rem', padding: '1rem', border: '1px solid var(--glass-border)', borderRadius: '0.5rem' }}>
                            <h3 style={{ marginBottom: '0.5rem' }}>Project {index + 1}</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <input
                                    type="text"
                                    placeholder="Title"
                                    value={project.title}
                                    onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                                    style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white' }}
                                />
                                <textarea
                                    placeholder="Description"
                                    value={project.description}
                                    onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                                    style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white' }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        style={{
                            padding: '1rem 2rem',
                            background: 'var(--primary)',
                            color: 'black',
                            border: 'none',
                            borderRadius: '0.5rem',
                            fontWeight: 'bold',
                            cursor: saving ? 'not-allowed' : 'pointer',
                            opacity: saving ? 0.7 : 1
                        }}
                    >
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                    {message && <span style={{ color: message.includes('success') ? 'green' : 'red' }}>{message}</span>}
                </div>
            </div>
        </div>
    );
}
