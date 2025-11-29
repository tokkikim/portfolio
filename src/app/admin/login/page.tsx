'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            if (res.ok) {
                router.push('/admin');
            } else {
                setError('Invalid password');
            }
        } catch (err) {
            setError('An error occurred');
        }
        setLoading(false);
    };

    return (
        <div className="container section" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
            <div className="glass" style={{ padding: '3rem', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Admin Login</h1>
                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            padding: '1rem',
                            background: 'rgba(255,255,255,0.1)',
                            border: '1px solid var(--glass-border)',
                            borderRadius: '0.5rem',
                            color: 'white',
                            fontSize: '1rem'
                        }}
                    />
                    {error && <p style={{ color: '#ff6b6b', fontSize: '0.9rem' }}>{error}</p>}
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            padding: '1rem',
                            background: 'var(--primary)',
                            color: 'black',
                            border: 'none',
                            borderRadius: '0.5rem',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading ? 'Checking...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
}
