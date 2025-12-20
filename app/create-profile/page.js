'use client';

import React from 'react';
import Link from 'next/link';
import { Camera, CheckCircle2 } from 'lucide-react';

export default function CreateProfilePage() {
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 font-sans py-12">
            <div className="w-full max-w-[850px] bg-[#121212] rounded-[40px] p-8 md:p-14 border border-white/5">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Create your profile</h1>
                    <p className="text-gray-500 font-medium text-lg">Complete your account</p>
                </div>

                <form className="space-y-10">
                    {/* Profile Image Upload */}
                    <div className="flex flex-col items-center">
                        <div className="relative group cursor-pointer">
                            <div className="w-32 h-32 bg-[#1c1c1c] border border-white/10 rounded-full flex items-center justify-center transition-all group-hover:border-purple-500/50">
                                <Camera className="text-gray-500 group-hover:text-purple-400 transition-colors" size={32} />
                            </div>
                            <div className="absolute top-0 right-0 p-1">
                                <div className="w-4 h-4 bg-purple-500 rounded-full border-4 border-[#121212]"></div>
                            </div>
                            <label className="absolute -left-32 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium hidden md:block">Profile image</label>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                        {/* Username */}
                        <div className="space-y-2">
                            <label className="text-gray-400 text-sm font-medium ml-1">Username</label>
                            <input
                                type="text"
                                placeholder="Username"
                                className="w-full bg-[#1c1c1c]/50 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 transition-colors"
                                defaultValue="Username"
                            />
                        </div>

                        {/* Email Address */}
                        <div className="space-y-2">
                            <label className="text-gray-400 text-sm font-medium ml-1">Email Address</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    disabled
                                    className="w-full bg-[#1c1c1c]/30 border border-white/5 rounded-2xl px-5 py-4 text-gray-500 cursor-not-allowed"
                                    defaultValue="Email"
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-green-500/10 text-green-500 px-3 py-1.5 rounded-full text-xs font-bold border border-green-500/20">
                                    Verified <CheckCircle2 size={14} />
                                </div>
                            </div>
                        </div>

                        {/* Wallet Address */}
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-gray-400 text-sm font-medium ml-1">Wallet</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="0xc..."
                                    disabled
                                    className="w-full bg-[#1c1c1c]/30 border border-white/5 rounded-2xl px-5 py-4 text-gray-500 cursor-not-allowed font-mono text-sm"
                                    defaultValue="0xc..."
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-green-500/10 text-green-500 px-3 py-1.5 rounded-full text-xs font-bold border border-green-500/20">
                                    Connected <CheckCircle2 size={14} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Streaming Links Section */}
                    <div className="space-y-6 pt-4">
                        <h3 className="text-gray-400 text-sm font-bold uppercase tracking-widest border-b border-white/5 pb-4">Streaming links</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                            <div className="space-y-2">
                                <label className="text-gray-400 text-sm font-medium ml-1">Youtube</label>
                                <input
                                    type="text"
                                    placeholder="Attach youtube link"
                                    className="w-full bg-[#1c1c1c]/50 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 transition-colors"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-gray-400 text-sm font-medium ml-1">Tiktok</label>
                                <input
                                    type="text"
                                    placeholder="Attach tiktok link"
                                    className="w-full bg-[#1c1c1c]/50 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 transition-colors"
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-gray-400 text-sm font-medium ml-1">Twitch</label>
                                <input
                                    type="text"
                                    placeholder="Attach twitch link"
                                    className="w-full bg-[#1c1c1c]/50 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 transition-colors"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 pt-6">
                        <Link href="/dashboard" className="flex-1">
                            <button className="w-full bg-[#B03EE1] text-white rounded-full py-4 font-bold text-lg hover:bg-[#c04ef1] transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(176,62,225,0.3)]">
                                Continue
                            </button>
                        </Link>
                        <Link href="/dashboard" className="flex-1">
                            <button className="w-full bg-transparent border border-white/10 text-gray-400 rounded-full py-4 font-bold text-lg hover:text-white hover:border-white/20 transition-all active:scale-[0.98]">
                                Skip
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
