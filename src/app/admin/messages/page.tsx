'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

interface Message {
    id: string;
    name: string;
    email: string;
    message: string;
    timestamp: any;
    status: 'read' | 'unread';
}

export default function MessagesPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [activeTab, setActiveTab] = useState<'unread' | 'read' | 'all'>('unread');
    const router = useRouter();

    useEffect(() => {
        // Check admin authentication via API
        fetch('/api/auth/check')
            .then(res => res.json())
            .then(data => {
                if (!data.isAdmin) {
                    router.push('/admin');
                    return;
                }
                setIsAuthenticated(true);

                // Real-time listener for messages
                const q = query(collection(db, 'messages'), orderBy('timestamp', 'desc'));
                const unsubscribe = onSnapshot(q, (snapshot) => {
                    const messagesData = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    })) as Message[];
                    setMessages(messagesData);
                    setLoading(false);
                });

                return () => unsubscribe();
            })
            .catch(() => {
                router.push('/admin');
            });
    }, [router]);

    const toggleStatus = async (messageId: string, currentStatus: string) => {
        const newStatus = currentStatus === 'read' ? 'unread' : 'read';
        await updateDoc(doc(db, 'messages', messageId), {
            status: newStatus
        });
    };

    const deleteMessage = async (messageId: string) => {
        if (confirm('정말 이 메시지를 삭제하시겠습니까?')) {
            await deleteDoc(doc(db, 'messages', messageId));
        }
    };

    const formatDate = (timestamp: any) => {
        if (!timestamp) return 'N/A';
        const date = timestamp.toDate();
        return new Intl.DateTimeFormat('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    if (!isAuthenticated) {
        return <div style={{ padding: '2rem', color: '#fff' }}>인증 확인 중...</div>;
    }

    if (loading) {
        return <div style={{ padding: '2rem', color: '#fff' }}>메시지 로딩 중...</div>;
    }

    const unreadCount = messages.filter(m => m.status === 'unread').length;
    const readCount = messages.filter(m => m.status === 'read').length;

    // Filter messages based on active tab
    const filteredMessages = messages.filter(msg => {
        if (activeTab === 'all') return true;
        return msg.status === activeTab;
    });

    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--background)',
            padding: '2rem'
        }}>
            <div className="container" style={{ maxWidth: '1200px' }}>
                {/* Header */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '2rem'
                }}>
                    <div>
                        <h1 style={{ fontSize: '2rem', color: '#fff', marginBottom: '0.5rem' }}>
                            받은 메시지
                        </h1>
                        <p style={{ color: '#aaa' }}>
                            총 {messages.length}개의 메시지 | 읽지 않음 {unreadCount}개
                        </p>
                    </div>
                    <button
                        onClick={() => router.push('/admin')}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '0.5rem',
                            color: '#fff',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                    >
                        ← 관리자 페이지
                    </button>
                </div>

                {/* Tabs */}
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    marginBottom: '2rem',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    paddingBottom: '0'
                }}>
                    <button
                        onClick={() => setActiveTab('unread')}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: 'transparent',
                            border: 'none',
                            borderBottom: activeTab === 'unread' ? '2px solid #fff' : '2px solid transparent',
                            color: activeTab === 'unread' ? '#fff' : '#888',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            fontWeight: activeTab === 'unread' ? 'bold' : 'normal',
                            transition: 'all 0.3s ease',
                            position: 'relative',
                            top: '1px'
                        }}
                    >
                        읽지 않음 ({unreadCount})
                    </button>
                    <button
                        onClick={() => setActiveTab('read')}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: 'transparent',
                            border: 'none',
                            borderBottom: activeTab === 'read' ? '2px solid #fff' : '2px solid transparent',
                            color: activeTab === 'read' ? '#fff' : '#888',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            fontWeight: activeTab === 'read' ? 'bold' : 'normal',
                            transition: 'all 0.3s ease',
                            position: 'relative',
                            top: '1px'
                        }}
                    >
                        읽음 ({readCount})
                    </button>
                    <button
                        onClick={() => setActiveTab('all')}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: 'transparent',
                            border: 'none',
                            borderBottom: activeTab === 'all' ? '2px solid #fff' : '2px solid transparent',
                            color: activeTab === 'all' ? '#fff' : '#888',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            fontWeight: activeTab === 'all' ? 'bold' : 'normal',
                            transition: 'all 0.3s ease',
                            position: 'relative',
                            top: '1px'
                        }}
                    >
                        전체 ({messages.length})
                    </button>
                </div>

                {/* Messages List */}
                {filteredMessages.length === 0 ? (
                    <div style={{
                        padding: '4rem 2rem',
                        textAlign: 'center',
                        color: '#666',
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '0.5rem',
                        border: '1px dashed rgba(255, 255, 255, 0.1)'
                    }}>
                        {activeTab === 'unread' && '읽지 않은 메시지가 없습니다.'}
                        {activeTab === 'read' && '읽은 메시지가 없습니다.'}
                        {activeTab === 'all' && '아직 받은 메시지가 없습니다.'}
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {filteredMessages.map((msg) => (
                            <div
                                key={msg.id}
                                style={{
                                    background: msg.status === 'unread'
                                        ? 'rgba(255, 255, 255, 0.08)'
                                        : 'rgba(255, 255, 255, 0.03)',
                                    border: '1px solid',
                                    borderColor: msg.status === 'unread'
                                        ? 'rgba(255, 255, 255, 0.2)'
                                        : 'rgba(255, 255, 255, 0.1)',
                                    borderRadius: '0.5rem',
                                    padding: '1.5rem',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {/* Message Header */}
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    marginBottom: '1rem',
                                    gap: '1rem'
                                }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.75rem',
                                            marginBottom: '0.5rem'
                                        }}>
                                            <h3 style={{ fontSize: '1.2rem', color: '#fff', margin: 0 }}>
                                                {msg.name}
                                            </h3>
                                            {msg.status === 'unread' && (
                                                <span style={{
                                                    padding: '0.25rem 0.75rem',
                                                    background: 'rgba(0, 255, 0, 0.2)',
                                                    border: '1px solid rgba(0, 255, 0, 0.4)',
                                                    borderRadius: '1rem',
                                                    fontSize: '0.75rem',
                                                    color: '#0f0',
                                                    fontWeight: 'bold'
                                                }}>
                                                    NEW
                                                </span>
                                            )}
                                        </div>
                                        <div style={{
                                            display: 'flex',
                                            gap: '1rem',
                                            fontSize: '0.9rem',
                                            color: '#aaa'
                                        }}>
                                            <span>📧 {msg.email}</span>
                                            <span>🕒 {formatDate(msg.timestamp)}</span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button
                                            onClick={() => toggleStatus(msg.id, msg.status)}
                                            style={{
                                                padding: '0.5rem 1rem',
                                                background: 'rgba(255, 255, 255, 0.1)',
                                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                                borderRadius: '0.25rem',
                                                color: '#fff',
                                                fontSize: '0.85rem',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease',
                                                whiteSpace: 'nowrap'
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'}
                                            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                                        >
                                            {msg.status === 'read' ? '읽지 않음으로' : '읽음으로'}
                                        </button>
                                        <button
                                            onClick={() => deleteMessage(msg.id)}
                                            style={{
                                                padding: '0.5rem 1rem',
                                                background: 'rgba(255, 0, 0, 0.1)',
                                                border: '1px solid rgba(255, 0, 0, 0.3)',
                                                borderRadius: '0.25rem',
                                                color: '#f00',
                                                fontSize: '0.85rem',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease'
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 0, 0, 0.2)'}
                                            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 0, 0, 0.1)'}
                                        >
                                            삭제
                                        </button>
                                    </div>
                                </div>

                                {/* Message Content */}
                                <div style={{
                                    padding: '1rem',
                                    background: 'rgba(0, 0, 0, 0.3)',
                                    borderRadius: '0.25rem',
                                    color: '#ddd',
                                    lineHeight: 1.6,
                                    whiteSpace: 'pre-wrap'
                                }}>
                                    {msg.message}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
