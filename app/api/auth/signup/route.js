import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongo';
import bcrypt from 'bcryptjs';

export async function POST(req) {
    try {
        const { username, email, password } = await req.json();

        if (!username || !email || !password) {
            return NextResponse.json({ ok: false, error: 'missing_fields' }, { status: 400 });
        }

        const db = await getDb();
        const users = db.collection('users');

        // Check if user exists
        const existing = await users.findOne({
            $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }]
        });

        if (existing) {
            return NextResponse.json({
                ok: false,
                error: existing.email === email.toLowerCase() ? 'email_taken' : 'username_taken'
            }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            username, // keep original casing for display if needed, but search is case-insensitive usually or lowercase
            usernameLower: username.toLowerCase(),
            email: email.toLowerCase(),
            password: hashedPassword,
            createdAt: new Date(),
            verified: false,
            role: 'user'
        };

        await users.insertOne(newUser);

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error('Signup error:', err);
        return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 });
    }
}
