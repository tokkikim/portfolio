import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), 'src', 'data', 'portfolio.json');
        const jsonData = await fs.readFile(filePath, 'utf-8');
        const data = JSON.parse(jsonData);

        // Upload to Firestore under collection 'portfolio', document 'main'
        await setDoc(doc(db, "portfolio", "main"), data);

        return NextResponse.json({ success: true, message: "Data seeded successfully!" });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
