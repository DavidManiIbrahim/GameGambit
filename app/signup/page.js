'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';

export default function SignupPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 font-sans">
            {/* Main Card */}
            <div className="w-full max-w-[850px] bg-[#121212] rounded-[32px] p-8 md:p-12 border border-white/5 relative overflow-hidden">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Sign Up</h1>
                    <p className="text-gray-500 font-medium text-lg">Join the Fight!</p>
                </div>

                <form className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        {/* Username */}
                        <div className="space-y-2">
                            <label className="text-gray-400 text-sm font-medium ml-1">Username</label>
                            <input
                                type="text"
                                placeholder="Choose a username"
                                className="w-full bg-[#1c1c1c]/50 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 transition-colors"
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-gray-400 text-sm font-medium ml-1">Email Address</label>
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full bg-[#1c1c1c]/50 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 transition-colors"
                            />
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <label className="text-gray-400 text-sm font-medium ml-1">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="w-full bg-[#1c1c1c]/50 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 transition-colors pr-12"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            <p className="text-[11px] text-gray-600 leading-tight mt-1 pl-1">
                                Password must be at least 7 characters, include a special character and a number
                            </p>
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-2">
                            <label className="text-gray-400 text-sm font-medium ml-1">Confirm Password</label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="w-full bg-[#1c1c1c]/50 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 transition-colors pr-12"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            <p className="text-[11px] text-gray-600 leading-tight mt-1 pl-1">
                                Confirm password must match password
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 ml-1 mt-4">
                        <input
                            type="checkbox"
                            id="age-check"
                            className="w-4 h-4 rounded border-white/10 bg-white/5 text-purple-600 focus:ring-purple-500 focus:ring-offset-0 cursor-pointer"
                        />
                        <label htmlFor="age-check" className="text-gray-500 text-xs cursor-pointer select-none">
                            I am 18+ years old
                        </label>
                    </div>
                </form>

                <div className="flex flex-col md:flex-row items-center justify-between mt-10 gap-6">
                    <p className="text-gray-400 text-sm">
                        Already have an account? <Link href="/signin" className="text-purple-500 hover:text-purple-400 font-medium transition-colors">Sign in</Link>
                    </p>
                    <Link href="/verify" className="w-full md:w-auto">
                        <button className="w-full md:w-auto bg-[#B03EE1] text-white rounded-full px-16 py-3.5 font-bold text-base hover:bg-[#c04ef1] transition-all active:scale-95 shadow-[0_0_20px_rgba(176,62,225,0.3)]">
                            Continue
                        </button>
                    </Link>
                </div>

                <div className="mt-14 relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-transparent"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-transparent px-2 text-gray-500 font-medium">Or Sign up with</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-8">
                    <button className="flex items-center justify-center bg-[#0F0F0F] hover:bg-[#1a1a1a] border border-white/5 rounded-xl py-4 transition-all group">
                        <svg className="w-6 h-6" viewBox="0 0 24 24">
                            <path
                                fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                            />
                            <path
                                fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>
                    </button>
                    <button className="flex items-center justify-center bg-[#0F0F0F] hover:bg-[#1a1a1a] border border-white/5 rounded-xl py-4 transition-all group">
                        <svg className="w-6 h-6" viewBox="0 0 127.14 96.36">
                            <path
                                fill="#5865F2"
                                d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.22,85.25,68.42,68.42,0,0,1,28.68,80.18a48.09,48.09,0,0,0,4.06-3.15,75.44,75.44,0,0,0,61.68,0c1.43,1.14,2.78,2.2,4.06,3.15a68.42,68.42,0,0,1-10.54,5.07,77.7,77.7,0,0,0,6.51,11.11,105.73,105.73,0,0,0,32.17-16.15h0C129.46,52,120.35,28.41,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5.09-12.73,11.41-12.73S54.08,46,53.86,53,48.77,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5.09-12.73,11.41-12.73S96.08,46,95.86,53,90.77,65.69,84.69,65.69Z"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            <footer className="mt-8 text-center text-gray-600 text-[13px] max-w-sm leading-relaxed px-4">
                By creating a new account, you agree to Game Gambit's <Link href="/terms" className="text-purple-500 underline decoration-purple-500/30 underline-offset-4 hover:decoration-purple-500 transition-all">Terms & Conditions</Link> and confirm you are 18+
            </footer>
        </div>
    );
}
