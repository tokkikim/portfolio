'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FadeIn } from '@/components/MotionWrapper';
import { storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function AdminPage() {
    const router = useRouter();
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

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/admin/login');
    };

    const handleHeroChange = (field: string, value: string) => {
        setData({ ...data, hero: { ...data.hero, [field]: value } });
    };

    const handleProjectChange = (index: number, field: string, value: string) => {
        const newProjects = [...data.projects];
        newProjects[index] = { ...newProjects[index], [field]: value };
        setData({ ...data, projects: newProjects });
    };

    const handleAddProject = () => {
        const newProject = {
            id: Date.now(),
            title: 'New Project',
            description: 'Description here...',
            link: '#',
            backgroundImage: ''
        };
        setData({ ...data, projects: [...data.projects, newProject] });
    };

    const handleDeleteProject = (index: number) => {
        if (confirm('Are you sure you want to delete this project?')) {
            const newProjects = data.projects.filter((_: any, i: number) => i !== index);
            setData({ ...data, projects: newProjects });
        }
    };

    if (loading) return <div className="container section">Loading...</div>;
    if (!data) return <div className="container section">Error loading data.</div>;

    return (
        <div className="container section">
            <FadeIn>
                <div className="glass" style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <h1 style={{ fontSize: '2rem' }}>Admin Dashboard</h1>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <Link href="/admin/messages" style={{ background: 'transparent', border: '1px solid var(--secondary)', color: 'var(--secondary)', padding: '0.5rem 1rem', borderRadius: '0.5rem', textDecoration: 'none', display: 'inline-block' }}>📧 Messages</Link>
                            <button onClick={handleLogout} style={{ background: 'transparent', border: '1px solid var(--primary)', color: 'var(--primary)', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer' }}>Logout</button>
                            <Link href="/" style={{ color: 'var(--primary)' }}>Back to Home</Link>
                        </div>
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
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h2 style={{ fontSize: '1.5rem', color: 'var(--secondary)' }}>Projects</h2>
                            <button
                                onClick={handleAddProject}
                                style={{ padding: '0.5rem 1rem', background: 'var(--secondary)', color: 'white', border: 'none', borderRadius: '0.5rem', cursor: 'pointer' }}
                            >
                                + Add Project
                            </button>
                        </div>

                        {data.projects.map((project: any, index: number) => (
                            <div key={project.id} style={{ marginBottom: '1.5rem', padding: '1rem', border: '1px solid var(--glass-border)', borderRadius: '0.5rem', position: 'relative' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <h3 style={{ marginBottom: '0.5rem' }}>Project {index + 1}</h3>
                                    <button
                                        onClick={() => handleDeleteProject(index)}
                                        style={{ background: 'transparent', color: '#ff6b6b', border: 'none', cursor: 'pointer' }}
                                    >
                                        Delete
                                    </button>
                                </div>
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
                                    <input
                                        type="text"
                                        placeholder="Link URL (e.g., https://example.com)"
                                        value={project.link}
                                        onChange={(e) => handleProjectChange(index, 'link', e.target.value)}
                                        style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'var(--primary)' }}
                                    />

                                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={async (e) => {
                                                const file = e.target.files?.[0];
                                                if (!file) return;

                                                try {
                                                    const storageRef = ref(storage, `projects/${project.id}/${file.name}`);
                                                    const snapshot = await uploadBytes(storageRef, file);
                                                    const downloadURL = await getDownloadURL(snapshot.ref);
                                                    handleProjectChange(index, 'backgroundImage', downloadURL);
                                                    alert('Image uploaded successfully!');
                                                } catch (error) {
                                                    console.error("Error uploading image: ", error);
                                                    alert('Failed to upload image.');
                                                }
                                            }}
                                            style={{ color: 'white' }}
                                        />
                                        {project.backgroundImage && (
                                            <img src={project.backgroundImage} alt="Preview" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Career Management Section */}
                    <div style={{ marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h2 style={{ fontSize: '1.5rem', color: 'var(--secondary)' }}>Career Timeline</h2>
                            <button
                                onClick={() => {
                                    const newCareer = {
                                        id: Date.now(),
                                        year: '2024',
                                        role: 'New Role',
                                        title: 'New Position',
                                        details: ['Detail 1']
                                    };
                                    setData({ ...data, career: [...(data.career || []), newCareer] });
                                }}
                                style={{ padding: '0.5rem 1rem', background: 'var(--secondary)', color: 'white', border: 'none', borderRadius: '0.5rem', cursor: 'pointer' }}
                            >
                                + Add Career
                            </button>
                        </div>

                        {(data.career || []).map((item: any, index: number) => (
                            <div key={item.id} style={{ marginBottom: '1.5rem', padding: '1rem', border: '1px solid var(--glass-border)', borderRadius: '0.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <h3 style={{ marginBottom: '0.5rem' }}>Timeline {index + 1}</h3>
                                    <button
                                        onClick={() => {
                                            if (confirm('Delete this career item?')) {
                                                const newCareer = data.career.filter((_: any, i: number) => i !== index);
                                                setData({ ...data, career: newCareer });
                                            }
                                        }}
                                        style={{ background: 'transparent', color: '#ff6b6b', border: 'none', cursor: 'pointer' }}
                                    >
                                        Delete
                                    </button>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <input
                                            type="text"
                                            placeholder="Year (e.g. 2012)"
                                            value={item.year}
                                            onChange={(e) => {
                                                const newCareer = [...data.career];
                                                newCareer[index] = { ...newCareer[index], year: e.target.value };
                                                setData({ ...data, career: newCareer });
                                            }}
                                            style={{ flex: 1, padding: '0.5rem', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white' }}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Role (e.g. Developer)"
                                            value={item.role}
                                            onChange={(e) => {
                                                const newCareer = [...data.career];
                                                newCareer[index] = { ...newCareer[index], role: e.target.value };
                                                setData({ ...data, career: newCareer });
                                            }}
                                            style={{ flex: 2, padding: '0.5rem', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white' }}
                                        />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Card Title"
                                        value={item.title}
                                        onChange={(e) => {
                                            const newCareer = [...data.career];
                                            newCareer[index] = { ...newCareer[index], title: e.target.value };
                                            setData({ ...data, career: newCareer });
                                        }}
                                        style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'var(--primary)', fontWeight: 'bold' }}
                                    />
                                    <textarea
                                        placeholder="Details (One per line)"
                                        value={item.details.join('\n')}
                                        onChange={(e) => {
                                            const newCareer = [...data.career];
                                            newCareer[index] = { ...newCareer[index], details: e.target.value.split('\n') };
                                            setData({ ...data, career: newCareer });
                                        }}
                                        style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#ccc', minHeight: '100px' }}
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
            </FadeIn>
        </div>
    );
}
