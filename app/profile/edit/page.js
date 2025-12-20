'use client';

import React from 'react';
import Link from 'next/link';
import { Camera, CheckCircle2, ChevronDown, Check } from 'lucide-react';

export default function EditProfilePage() {
    return (
        <div className="max-w-[900px] mx-auto space-y-8 pb-20 pt-10">

            <div className="bg-[#121212] border border-white/5 rounded-[40px] p-10 md:p-14 space-y-12">
                <div className="text-center">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-gray-600 font-black">Edit Account Information</p>
                </div>

                <div className="flex flex-col items-center gap-6">
                    <div className="relative group cursor-pointer">
                        <div className="w-32 h-32 bg-[#222222] rounded-full flex items-center justify-center border-2 border-white/5 group-hover:border-purple-500/50 transition-all overflow-hidden relative">
                            <Camera size={32} className="text-gray-600 group-hover:text-white transition-colors" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="text-[10px] font-bold text-white uppercase tracking-widest">Change</span>
                            </div>
                        </div>
                    </div>
                    <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest">Profile image</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <label className="text-[11px] uppercase tracking-widest text-gray-600 font-black ml-1">Username</label>
                        <input
                            type="text"
                            placeholder="Username"
                            className="w-full bg-[#0d0d0d] border border-white/5 rounded-[20px] px-6 py-4.5 text-white placeholder:text-gray-800 focus:outline-none focus:border-purple-500/50 transition-all"
                        />
                    </div>
                    <div className="space-y-3">
                        <label className="text-[11px] uppercase tracking-widest text-gray-600 font-black ml-1">Email Address</label>
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="Email"
                                defaultValue="James@secreteagent.com"
                                className="w-full bg-[#0d0d0d] border border-white/5 rounded-[20px] px-6 py-4.5 text-white placeholder:text-gray-800 focus:outline-none focus:border-purple-500/50 transition-all pr-24"
                            />
                            <div className="absolute top-1/2 -translate-y-1/2 right-4 flex items-center gap-1.5 bg-green-500/10 text-green-500 px-3 py-1.5 rounded-full border border-green-500/20">
                                <span className="text-[10px] font-black uppercase tracking-widest">Verified</span>
                                <CheckCircle2 size={12} strokeWidth={3} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="text-[11px] uppercase tracking-widest text-gray-600 font-black ml-1">Wallet</label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="0xc..."
                            className="w-full bg-[#0d0d0d] border border-white/5 rounded-[20px] px-6 py-4.5 text-white/40 placeholder:text-gray-800 focus:outline-none"
                            readOnly
                        />
                        <button className="absolute top-1/2 -translate-y-1/2 right-4 flex items-center gap-2 bg-white/5 hover:bg-white/10 text-gray-400 px-4 py-2 rounded-full border border-white/5 transition-all text-[11px] font-black uppercase tracking-widest">
                            Disconnect
                            <Check size={14} />
                        </button>
                    </div>
                </div>

                <div className="space-y-8 pt-6">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-gray-600 font-black">Streaming links</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className="text-[11px] uppercase tracking-widest text-gray-600 font-black ml-1">Youtube</label>
                            <input
                                type="text"
                                placeholder="Edit youtube link"
                                className="w-full bg-[#0d0d0d] border border-white/5 rounded-[20px] px-6 py-4.5 text-white placeholder:text-gray-800 focus:outline-none focus:border-purple-500/50 transition-all"
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[11px] uppercase tracking-widest text-gray-600 font-black ml-1">Tiktok</label>
                            <input
                                type="text"
                                placeholder="Edit tiktok link"
                                className="w-full bg-[#0d0d0d] border border-white/5 rounded-[20px] px-6 py-4.5 text-white placeholder:text-gray-800 focus:outline-none focus:border-purple-500/50 transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-[11px] uppercase tracking-widest text-gray-600 font-black ml-1">Twitch</label>
                        <input
                            type="text"
                            placeholder="Edit twitch link"
                            className="w-full bg-[#0d0d0d] border border-white/5 rounded-[20px] px-6 py-4.5 text-white placeholder:text-gray-800 focus:outline-none focus:border-purple-500/50 transition-all"
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center gap-6">
                <button className="w-full bg-[#B03EE1] text-white rounded-[24px] py-5 font-bold text-lg hover:bg-[#c04ef1] transition-all active:scale-[0.98] shadow-[0_0_25px_rgba(176,62,225,0.25)]">
                    Update
                </button>
                <Link href="/profile" className="text-purple-500 hover:text-purple-400 text-sm font-bold transition-colors">
                    Discard
                </Link>
            </div>

        </div>
    );
}
