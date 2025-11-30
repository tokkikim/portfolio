import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export async function GET() {
    try {
        const docRef = doc(db, "portfolio", "main");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return NextResponse.json(docSnap.data());
        } else {
            return NextResponse.json({ hero: {}, projects: [], career: [] });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        await setDoc(doc(db, "portfolio", "main"), body);
        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Firebase Save Error:", error);
        return NextResponse.json({ error: 'Failed to save data', details: error.message }, { status: 500 });
    }
}
