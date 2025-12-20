'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';

export default function ResetPasswordPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 font-sans">
            <div className="w-full max-w-[500px] bg-[#121212] rounded-[32px] p-8 md:p-12 border border-white/5">
                <div className="text-center mb-10">
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">Create New Password</h1>
                    <p className="text-gray-500 font-medium text-base">Recover your account</p>
                </div>

                <form className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-gray-400 text-sm font-medium ml-1">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                className="w-full bg-[#1c1c1c]/50 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 transition-colors pr-12"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        <p className="text-[10px] text-gray-600 leading-tight mt-1 pl-1">
                            Password must be at least 7 characters, include a special character and a number
                        </p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-gray-400 text-sm font-medium ml-1">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Re-enter your password"
                                className="w-full bg-[#1c1c1c]/50 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 transition-colors pr-12"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                            >
                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        <p className="text-[10px] text-gray-600 leading-tight mt-1 pl-1">
                            Password must match
                        </p>
                    </div>

                    <Link href="/signin" className="w-full block">
                        <button className="w-full bg-[#B03EE1] text-white rounded-full py-4 font-bold text-lg hover:bg-[#c04ef1] transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(176,62,225,0.3)] mt-2">
                            Continue
                        </button>
                    </Link>
                </form>
            </div>
        </div>
    );
}
