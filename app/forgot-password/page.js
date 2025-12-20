'use client';

import React from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 font-sans">
            <div className="w-full max-w-[500px] bg-[#121212] rounded-[32px] p-8 md:p-12 border border-white/5">
                <div className="text-center mb-10">
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">Forgot Password?</h1>
                    <p className="text-gray-500 font-medium text-base">Recover your account</p>
                </div>

                <form className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-gray-400 text-sm font-medium ml-1">Email Address</label>
                        <input
                            type="email"
                            placeholder="Enter your account email"
                            className="w-full bg-[#1c1c1c]/50 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 transition-colors"
                        />
                    </div>

                    <Link href="/verify" className="w-full block">
                        <button className="w-full bg-[#B03EE1] text-white rounded-full py-4 font-bold text-lg hover:bg-[#c04ef1] transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(176,62,225,0.3)] mt-2">
                            Continue
                        </button>
                    </Link>
                </form>

                <div className="text-center mt-8">
                    <Link href="/signin" className="text-gray-500 hover:text-white text-sm transition-colors">
                        Back to Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
}
