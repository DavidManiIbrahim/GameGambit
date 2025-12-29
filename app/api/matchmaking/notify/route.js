import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongo';
import { sendNotification as  } from '@/lib/mailer';

export async function POST(req) {
    try {
        const { opponentEmail, opponentUsername } = await req.json();
        if (!opponentEmail) {
            return NextResponse.json({ ok: false, error: 'missing_email' }, { status: 400 });
        }
        const subject = 'Game Gambit – Your opponent has started a match!';
        const html = `<p>Hey ${opponentUsername || ''},</p><p>Your opponent has started a match and is waiting for you. Open the app to join the game.</p>`;
        const result = await sendNotification(opponentEmail, subject, html);
        if (!result.ok) {
            return NextResponse.json({ ok: false, error: result.error }, { status: 500 });
        }
        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error('Notify error:', err);
        return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 });
    }
}
