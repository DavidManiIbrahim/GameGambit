'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Loader2, Mail } from 'lucide-react';

export default function VerificationPage() {
    const { data: session, status, update } = useSession();
    const router = useRouter();

    const [sending, setSending] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const [error, setError] = useState('');
    const [code, setCode] = useState(['', '', '', '', '', '']); // 6-digit
    const [cooldown, setCooldown] = useState(0);
    const [mailSent, setMailSent] = useState(false);
    const sentRef = useRef(false);

    // Get email from session
    const email = session?.user?.email;

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/signin');
        } else if (status === 'authenticated' && session?.user?.verified) {
            router.push('/dashboard');
        }
    }, [status, session, router]);

    // Auto-send OTP on mount
    useEffect(() => {
        if (email && !sentRef.current && status === 'authenticated' && !session?.user?.verified) {
            sentRef.current = true;
            send('send');
        }
    }, [email, status, session]);

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
        if (!email) return;

        setError('');
        setSending(true);
        try {
            const url = type === 'resend' ? '/api/otp/resend' : '/api/otp/send';
            const res = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({ email }),
                headers: { 'Content-Type': 'application/json' }
            });
            const json = await res.json();

            if (!json.ok) {
                // Handle cooldown/too soon
                if (json.error === 'too_soon' && json.wait) {
                    setCooldown(json.wait);
                    startTimer(json.wait);
                } else {
                    setError(json.error || json.reason || 'Failed to send code');
                }
            } else {
                setMailSent(true);
                const cd = Number(json.cooldown || 60);
                setCooldown(cd);
                startTimer(cd);
            }
        } catch (err) {
            setError('Could not connect to the server. Please try again.');
        } finally {
            setSending(false);
        }
    };

    const startTimer = (seconds) => {
        const iv = setInterval(() => {
            setCooldown((c) => {
                if (c <= 1) {
                    clearInterval(iv);
                    return 0;
                }
                return c - 1;
            });
        }, 1000);
    };

    const verify = async () => {
        setError('');
        const full = code.join('');
        if (full.length < 6) return setError('Please enter the complete 6-digit code');

        setVerifying(true);
        try {
            const res = await fetch('/api/otp/verify', {
                method: 'POST',
                body: JSON.stringify({ email, code: full }),
                headers: { 'Content-Type': 'application/json' }
            });
            const json = await res.json();

            if (!json.ok) {
                setError(json.error || json.reason || 'Invalid verification code');
                setVerifying(false);
            } else {
                // success — update session and redirect
                await update({ verified: true });
                window.location.href = '/dashboard';
            }
        } catch (err) {
            setError('Verification failed. Please check your connection.');
            setVerifying(false);
        }
    };

    const resend = async () => {
        if (cooldown > 0 || sending) return;
        await send('resend');
    };

    if (status === 'loading') {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 font-sans">
            <div className="w-full max-w-[500px] bg-[#121212] rounded-[32px] p-8 md:p-12 border border-white/5 relative overflow-hidden">
                {/* Decoration */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/10 blur-[80px] rounded-full"></div>

                <div className="text-center mb-10 relative z-10">
                    <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Mail className="text-purple-500" size={32} />
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">Verify Your Email</h1>
                    <p className="text-gray-500 font-medium text-sm">
                        We&apos;ve sent a 6-digit code to <br />
                        <span className="text-gray-300 font-bold">{email || 'your email'}</span>
                    </p>
                </div>

                <div className="space-y-8 flex flex-col items-center relative z-10">
                    {error && (
                        <div className="w-full p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm font-medium text-center">
                            {error}
                        </div>
                    )}

                    <div className="flex gap-2 md:gap-3 justify-center">
                        {code.map((digit, idx) => (
                            <input
                                key={idx}
                                id={`otp-${idx}`}
                                type="text"
                                maxLength={1}
                                inputMode="numeric"
                                value={digit}
                                onChange={(e) => handleChange(idx, e.target.value)}
                                className="w-11 h-14 md:w-14 md:h-16 bg-[#1c1c1c]/50 border border-white/10 rounded-2xl text-center text-2xl font-black text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all"
                                onKeyDown={(e) => {
                                    if (e.key === 'Backspace' && !digit && idx > 0) {
                                        const prevInput = document.getElementById(`otp-${idx - 1}`);
                                        prevInput?.focus();
                                    }
                                }}
                            />
                        ))}
                    </div>

                    <div className="w-full space-y-4">
                        <button
                            onClick={verify}
                            disabled={verifying || code.join('').length < 6}
                            className="w-full bg-[#B03EE1] text-white rounded-2xl py-4 font-bold text-lg hover:bg-[#c04ef1] transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(176,62,225,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {verifying ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                'Verify & Continue'
                            )}
                        </button>

                        <div className="text-center">
                            <p className="text-sm text-gray-500 font-medium">
                                Didn&apos;t receive a code?{' '}
                                <button
                                    onClick={resend}
                                    disabled={cooldown > 0 || sending}
                                    className="text-purple-500 font-bold hover:text-purple-400 transition-colors disabled:text-gray-600"
                                >
                                    {sending ? (
                                        <Loader2 className="w-4 h-4 animate-spin inline mr-1" />
                                    ) : null}
                                    {cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend Code'}
                                </button>
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => window.location.href = '/signin'}
                        className="text-gray-600 text-[11px] font-bold uppercase tracking-widest hover:text-gray-400 transition-colors"
                    >
                        Sign in with a different account
                    </button>
                </div>
            </div>
        </div>
    );
}
