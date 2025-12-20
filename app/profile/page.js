'use client';

import React from 'react';
import Link from 'next/link';
import {
    History,
    TrendingUp,
    Circle,
    Pencil,
    Twitch,
    Youtube,
    Link as LinkIcon
} from 'lucide-react';

export default function ProfilePage() {
    return (
        <div className="max-w-[1000px] mx-auto space-y-10 pb-20 pt-6">

            {/* Account Information Card */}
            <div className="bg-[#121212] border border-white/5 rounded-[40px] px-10 py-12 flex items-center gap-12 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-[100px]"></div>

                <div className="flex flex-col items-center gap-4 relative z-10 shrink-0">
                    <div className="w-32 h-32 rounded-full border-4 border-white/20 p-1.5 transition-transform group-hover:scale-105 duration-500">
                        <div className="w-full h-full bg-green-500 rounded-full flex items-center justify-center text-3xl font-black text-black">
                            JB
                        </div>
                    </div>
                    <div className="bg-orange-500/10 text-orange-500 text-[10px] font-black px-3 py-1 rounded-full border border-orange-500/20 uppercase tracking-widest">
                        Veteran
                    </div>
                    <h2 className="text-2xl font-black text-white tracking-tight">Jamesbond007</h2>
                </div>

                <div className="flex-1 space-y-8 relative z-10">
                    <div className="flex justify-between items-center">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-700 font-black">Account information</p>
                        <Link href="/profile/edit" className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
                            <span className="text-xs font-bold underline decoration-purple-500/30 underline-offset-4 pointer-events-none">Edit info</span>
                            <Pencil size={14} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-y-6">
                        <div className="space-y-1">
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Wallet</p>
                            <p className="text-sm font-bold text-gray-300 font-mono">0xc1234...</p>
                        </div>
                        <div className="space-y-1 text-right md:text-left">
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Email Address</p>
                            <p className="text-sm font-bold text-gray-300">James@secreteagent.com</p>
                        </div>
                    </div>

                    <button className="text-[13px] font-bold text-purple-500 hover:text-purple-400 transition-colors">
                        Change Password
                    </button>
                </div>
            </div>

            {/* Top Games Section */}
            <div className="bg-[#121212] border border-white/5 rounded-[40px] p-10 space-y-10">
                <div className="text-center">
                    <p className="text-[10px] uppercase font-bold text-gray-700 tracking-[0.2em]">Top Games</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="group text-center space-y-4">
                            <div className="aspect-[3/4] rounded-3xl overflow-hidden border border-white/5 group-hover:border-purple-500/50 transition-all">
                                <img src="https://m.media-amazon.com/images/I/71uV6W9B6CL.png" alt="Game" className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" />
                            </div>
                            <p className="text-[10px] uppercase tracking-widest font-black text-gray-600">8 matches</p>
                        </div>
                    ))}
                </div>

                {/* Stats */}
                <div className="pt-10 border-t border-white/5">
                    <p className="text-[10px] uppercase font-bold text-gray-700 tracking-[0.2em] text-center mb-10">Stats</p>
                    <div className="flex justify-around items-center bg-white/3 rounded-[32px] p-8 border border-white/5">
                        <div className="text-center space-y-1">
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Wins</p>
                            <p className="text-2xl font-black text-white">12</p>
                        </div>
                        <div className="w-px h-10 bg-white/5"></div>
                        <div className="text-center space-y-1">
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Losses</p>
                            <p className="text-2xl font-black text-white">4</p>
                        </div>
                        <div className="w-px h-10 bg-white/5"></div>
                        <div className="text-center space-y-1">
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Win Ratio</p>
                            <p className="text-2xl font-black text-green-500">30%</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Links */}
                <div className="bg-[#121212] border border-white/5 rounded-[40px] p-10 space-y-8">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-gray-700 font-black">Links</p>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between text-gray-400 group cursor-pointer hover:text-white transition-colors">
                            <div className="flex items-center gap-4">
                                <Twitch size={18} className="text-purple-500" />
                                <span className="text-sm font-bold">Discord username</span>
                            </div>
                            <LinkIcon size={14} className="opacity-40 group-hover:opacity-100" />
                        </div>
                        <div className="flex items-center justify-between text-gray-400 group cursor-pointer hover:text-white transition-colors">
                            <div className="flex items-center gap-4">
                                <Youtube size={18} className="text-red-500" />
                                <span className="text-sm font-bold">Discord username</span>
                            </div>
                            <LinkIcon size={14} className="opacity-40 group-hover:opacity-100" />
                        </div>
                        <div className="flex items-center justify-between text-gray-400 group cursor-pointer hover:text-white transition-colors">
                            <div className="flex items-center gap-4">
                                <History size={18} className="text-blue-500" />
                                <span className="text-sm font-bold">Discord username</span>
                            </div>
                            <LinkIcon size={14} className="opacity-40 group-hover:opacity-100" />
                        </div>
                    </div>
                </div>

                {/* Rank */}
                <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-[40px] p-1 shadow-2xl overflow-hidden group">
                    <div className="h-full w-full bg-[#121212] rounded-[38px] p-8 flex flex-col items-center justify-center text-center relative overflow-hidden backdrop-blur-sm">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(176,62,225,0.05)_0%,transparent_70%)] animate-pulse"></div>

                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-black mb-8 z-10">Your Rank</p>

                        <div className="relative z-10 w-44 h-44 mb-8 transform group-hover:scale-105 transition-transform duration-700">
                            <div className="absolute inset-0 bg-purple-500/20 blur-3xl"></div>
                            <div className="relative h-full w-full bg-gradient-to-br from-purple-500 to-blue-500 rounded-3xl p-0.5 shadow-[0_0_30px_rgba(176,62,225,0.3)]">
                                <div className="h-full w-full bg-[#121212] rounded-[22px] flex flex-col items-center justify-center p-4">
                                    <div className="text-4xl mb-3">⭐</div>
                                    <div className="w-full h-px bg-white/5 mb-3"></div>
                                    <p className="text-[9px] font-black text-white/50 tracking-widest uppercase">Veteran</p>
                                </div>
                            </div>
                        </div>

                        <span className="text-[10px] font-black text-white/20 uppercase tracking-widest z-10">NFT</span>
                    </div>
                </div>
            </div>

        </div>
    );
}
