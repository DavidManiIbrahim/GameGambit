import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongo';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/auth';

export async function GET(req) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
        }

        const db = await getDb();
        const users = db.collection('users');

        // Get a random user from the database, excluding the current user
        const randomUsers = await users.aggregate([
            { $match: { email: { $ne: session.user.email.toLowerCase() } } },
            { $sample: { size: 1 } }
        ]).toArray();

        if (randomUsers.length === 0) {
            return NextResponse.json({ ok: false, error: 'no_users_available' }, { status: 404 });
        }

        const opponent = randomUsers[0];

        return NextResponse.json({
            ok: true,
            opponent: {
                id: opponent._id.toString(),
                username: opponent.username,
                email: opponent.email,
                image: opponent.image || null,
            }
        });
    } catch (err) {
        console.error('Error finding random opponent:', err);
        return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 });
    }
}
