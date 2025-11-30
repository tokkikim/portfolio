'use client';

import { useState } from 'react';
import { FadeIn } from './MotionWrapper';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        // Validation
        if (!formData.name || !formData.email || !formData.message) {
            setStatus('error');
            setErrorMessage('모든 필드를 입력해주세요.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setStatus('error');
            setErrorMessage('올바른 이메일 주소를 입력해주세요.');
            return;
        }

        try {
            // Save to Firestore
            await addDoc(collection(db, 'messages'), {
                name: formData.name,
                email: formData.email,
                message: formData.message,
                timestamp: serverTimestamp(),
                status: 'unread'
            });

            setStatus('success');
            setFormData({ name: '', email: '', message: '' });

            // Reset success message after 5 seconds
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error) {
            console.error('Error sending message:', error);
            setStatus('error');
            setErrorMessage('메시지 전송에 실패했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <section id="contact" className="section" style={{ position: 'relative', overflow: 'hidden' }}>

            <FadeIn>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'left' }}>Contact</h2>
            </FadeIn>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '3rem',
                marginTop: '2rem'
            }}>
                {/* Email Info */}
                <FadeIn delay={0.1}>
                    <div>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#fff' }}>
                            Get in Touch
                        </h3>
                        <p style={{ color: '#aaa', lineHeight: 1.8, marginBottom: '2rem' }}>
                            프로젝트 협업이나 문의사항이 있으시면 언제든지 연락주세요.
                        </p>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            padding: '1rem',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '0.5rem'
                        }}>
                            <span style={{ fontSize: '1.5rem' }}>✉️</span>
                            <a
                                href="mailto:jjangnarana@gmail.com"
                                style={{
                                    color: '#fff',
                                    textDecoration: 'none',
                                    fontSize: '1.1rem',
                                    transition: 'color 0.3s ease'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.color = '#aaa'}
                                onMouseLeave={(e) => e.currentTarget.style.color = '#fff'}
                            >
                                jjangnarana@gmail.com
                            </a>
                        </div>
                    </div>
                </FadeIn>

                {/* Contact Form */}
                <FadeIn delay={0.2}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {/* Name */}
                        <div>
                            <label htmlFor="name" style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                color: '#fff',
                                fontSize: '0.9rem'
                            }}>
                                이름
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                disabled={status === 'loading'}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '0.5rem',
                                    color: '#fff',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    transition: 'all 0.3s ease'
                                }}
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                                }}
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                color: '#fff',
                                fontSize: '0.9rem'
                            }}>
                                이메일
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={status === 'loading'}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '0.5rem',
                                    color: '#fff',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    transition: 'all 0.3s ease'
                                }}
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                                }}
                            />
                        </div>

                        {/* Message */}
                        <div>
                            <label htmlFor="message" style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                color: '#fff',
                                fontSize: '0.9rem'
                            }}>
                                메시지
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                disabled={status === 'loading'}
                                rows={5}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '0.5rem',
                                    color: '#fff',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    transition: 'all 0.3s ease',
                                    resize: 'vertical',
                                    fontFamily: 'inherit'
                                }}
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                                }}
                            />
                        </div>

                        {/* Status Messages */}
                        {status === 'success' && (
                            <div style={{
                                padding: '1rem',
                                background: 'rgba(0, 255, 0, 0.1)',
                                border: '1px solid rgba(0, 255, 0, 0.3)',
                                borderRadius: '0.5rem',
                                color: '#0f0',
                                textAlign: 'center'
                            }}>
                                ✓ 메시지가 성공적으로 전송되었습니다!
                            </div>
                        )}

                        {status === 'error' && (
                            <div style={{
                                padding: '1rem',
                                background: 'rgba(255, 0, 0, 0.1)',
                                border: '1px solid rgba(255, 0, 0, 0.3)',
                                borderRadius: '0.5rem',
                                color: '#f00',
                                textAlign: 'center'
                            }}>
                                ✕ {errorMessage}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            style={{
                                padding: '1rem 2rem',
                                background: status === 'loading'
                                    ? 'rgba(255, 255, 255, 0.1)'
                                    : '#fff',
                                color: status === 'loading' ? '#666' : '#000',
                                border: 'none',
                                borderRadius: '0.5rem',
                                fontSize: '1rem',
                                fontWeight: 'bold',
                                cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                                transition: 'all 0.3s ease',
                                opacity: status === 'loading' ? 0.5 : 1
                            }}
                            onMouseEnter={(e) => {
                                if (status !== 'loading') {
                                    e.currentTarget.style.background = '#eee';
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (status !== 'loading') {
                                    e.currentTarget.style.background = '#fff';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }
                            }}
                        >
                            {status === 'loading' ? '전송 중...' : '메시지 보내기'}
                        </button>
                    </form>
                </FadeIn>
            </div>

        </section>
    );
}
