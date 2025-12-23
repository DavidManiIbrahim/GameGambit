'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function VerificationPage() {
    const [email, setEmail] = useState('');
    const [sending, setSending] = useState(false);
    const [error, setError] = useState('');
    const [code, setCode] = useState(['', '', '', '', '', '']); // 6-digit
    const [cooldown, setCooldown] = useState(0);

    const handleChange = (index, value) => {
        if (value.length > 1) return;
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Auto focus next
        if (value && index < newCode.length - 1) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
        }
    };

    const send = async (type = 'send') => {
        setError('');
        if (!email) return setError('Please enter your email');
        setSending(true);
        try {
            const url = type === 'resend' ? '/api/otp/resend' : '/api/otp/send';
            const res = await fetch(url, { method: 'POST', body: JSON.stringify({ email }), headers: { 'Content-Type': 'application/json' } });
            const json = await res.json();
            if (!json.ok) {
                setError(json.error || json.reason || 'Failed to send');
            } else {
                setCooldown(Number(json.cooldown || 60));
                // start cooldown timer
                const iv = setInterval(() => {
                    setCooldown((c) => {
                        if (c <= 1) {
                            clearInterval(iv);
                            return 0;
                        }
                        return c - 1;
                    });
                }, 1000);
            }
        } catch (err) {
            setError(String(err));
        } finally {
            setSending(false);
        }
    };

    const { data: session, update } = useSession();

    const verify = async () => {
        setError('');
        const full = code.join('');
        if (full.length < code.length) return setError('Enter the full code');
        try {
            const res = await fetch('/api/otp/verify', { method: 'POST', body: JSON.stringify({ email, code: full }), headers: { 'Content-Type': 'application/json' } });
            const json = await res.json();
            if (!json.ok) {
                setError(json.error || json.reason || 'Verification failed');
            } else {
                // success — update session and redirect
                await update({ verified: true });
                window.location.href = '/dashboard';
            }
        } catch (err) {
            setError(String(err));
        }
    };

    const resend = async () => {
        if (cooldown > 0) return;
        await send('resend');
    };


    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 font-sans">
            <div className="w-full max-w-[500px] bg-[#121212] rounded-[32px] p-8 md:p-12 border border-white/5">
                <div className="text-center mb-10">
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">Verification Code</h1>
                    <p className="text-gray-500 font-medium text-base">Confirm your email</p>
                </div>

                <div className="space-y-10 flex flex-col items-center">
                    <div className="w-full mb-6">
                        <label className="text-gray-400 text-sm font-medium ml-1">Email Address</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className="w-full bg-[#1c1c1c]/50 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 transition-colors" />
                        {error && <p className="text-red-400 mt-2 text-sm">{error}</p>}
                        <div className="flex gap-2 mt-3">
                            <button onClick={() => send('send')} disabled={sending} className="bg-[#2b2b2b] text-white px-4 py-2 rounded-lg">Send code</button>
                            <button onClick={() => send('resend')} disabled={sending || cooldown > 0} className="ml-2 bg-[#0F0F0F] text-white px-4 py-2 rounded-lg">
                                {cooldown > 0 ? `Resend (${cooldown}s)` : 'Resend'}
                            </button>
                        </div>
                    </div>

                    <div className="flex gap-3 justify-center">
                        {code.map((digit, idx) => (
                            <input
                                key={idx}
                                id={`otp-${idx}`}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(idx, e.target.value)}
                                className="w-12 h-12 bg-[#1c1c1c]/50 border border-white/10 rounded-2xl text-center text-xl font-bold text-white focus:outline-none focus:border-purple-500/50 transition-colors"
                                onKeyDown={(e) => {
                                    if (e.key === 'Backspace' && !digit && idx > 0) {
                                        const prevInput = document.getElementById(`otp-${idx - 1}`);
                                        prevInput?.focus();
                                    }
                                }}
                            />
                        ))}
                    </div>

                    <button onClick={verify} className="w-full bg-[#B03EE1] text-white rounded-full py-4 font-bold text-lg hover:bg-[#c04ef1] transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(176,62,225,0.3)]">
                        Verify & Continue
                    </button>

                    <p className="text-sm text-gray-500">
                        Didn&apos;t receive a code? <button onClick={resend} disabled={cooldown > 0} className="text-purple-500 font-medium hover:text-purple-400 transition-colors hover:underline underline-offset-4 decoration-purple-500/30">{cooldown > 0 ? `Resend (${cooldown}s)` : 'Resend'}</button>
                    </p>
                </div>
            </div>
        </div>
    );
}
