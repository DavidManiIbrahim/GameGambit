'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function VerificationPage() {
    const [code, setCode] = useState(['', '', '', '']);

    const handleChange = (index, value) => {
        if (value.length > 1) return;
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Auto focus next
        if (value && index < 3) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
        }
    };

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 font-sans">
            <div className="w-full max-w-[500px] bg-[#121212] rounded-[32px] p-8 md:p-12 border border-white/5">
                <div className="text-center mb-10">
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">Verification Code</h1>
                    <p className="text-gray-500 font-medium text-base">Confirm your email</p>
                </div>

                <div className="space-y-10 flex flex-col items-center">
                    <div className="flex gap-4 justify-center">
                        {code.map((digit, idx) => (
                            <input
                                key={idx}
                                id={`otp-${idx}`}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(idx, e.target.value)}
                                className="w-16 h-16 bg-[#1c1c1c]/50 border border-white/10 rounded-2xl text-center text-2xl font-bold text-white focus:outline-none focus:border-purple-500/50 transition-colors"
                                onKeyDown={(e) => {
                                    if (e.key === 'Backspace' && !digit && idx > 0) {
                                        const prevInput = document.getElementById(`otp-${idx - 1}`);
                                        prevInput?.focus();
                                    }
                                }}
                            />
                        ))}
                    </div>

                    <Link href="/create-profile" className="w-full block">
                        <button className="w-full bg-[#B03EE1] text-white rounded-full py-4 font-bold text-lg hover:bg-[#c04ef1] transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(176,62,225,0.3)]">
                            Continue
                        </button>
                    </Link>

                    <p className="text-sm text-gray-500">
                        Didn&apos;t receive a code? <button className="text-purple-500 font-medium hover:text-purple-400 transition-colors hover:underline underline-offset-4 decoration-purple-500/30">Resend</button>
                    </p>
                </div>
            </div>
        </div>
    );
}
