'use client';

import React from 'react';
import Image from 'next/image';
import {
    Twitch,
    Youtube,
    Link as LinkIcon
} from 'lucide-react';

export default function PublicProfilePage() {
    return (
        <div className="w-full max-w-[1200px] mx-auto pb-20">

            <div className="flex flex-col gap-8">
                <h2 className="text-xl font-bold tracking-tight px-4">Public profile</h2>

                {/* Hero Banner Section */}
                <div className="w-full aspect-[11/3.5] relative rounded-[40px] overflow-hidden bg-gradient-to-r from-[#B03EE1] via-[#9d4edd] to-[#00d4ff] flex flex-col items-center justify-center shadow-[0_0_50px_rgba(176,62,225,0.2)]">
                    {/* Pattern Overlay */}
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>

                    <div className="relative z-10 flex flex-col items-center gap-4">
                        <div className="w-32 h-32 rounded-full border-4 border-[#121212] p-1 shadow-2xl">
                            <div className="w-full h-full bg-green-500 rounded-full flex items-center justify-center text-3xl font-black text-black">
                                JB
                            </div>
                        </div>
                        <div className="bg-[#B03EE1]/20 text-[#B03EE1] text-[10px] font-black px-4 py-1.5 rounded-full border border-[#B03EE1]/30 uppercase tracking-[0.2em] backdrop-blur-md">
                            Veteran
                        </div>
                        <h1 className="text-3xl font-black text-white tracking-tight">Jamesbond007</h1>
                    </div>
                </div>

                {/* Main Profile Dashboard */}
                <div className="bg-[#121212] border border-white/5 rounded-[40px] p-8 md:p-14 relative -mt-20 z-10 mx-10 shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-[100px]"></div>

                    <div className="space-y-12">
                        <div className="text-center space-y-10">
                            <p className="text-[11px] uppercase tracking-[0.2em] text-gray-700 font-bold">Top Games</p>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="group flex flex-col items-center gap-4">
                                        <div className="aspect-[3/4] w-full rounded-3xl overflow-hidden border border-white/5 shadow-xl transition-transform group-hover:scale-105 relative">
                                            <Image src="https://m.media-amazon.com/images/I/71uV6W9B6CL.png" alt="Game" fill className="object-cover" />
                                        </div>
                                        <span className="text-[10px] uppercase font-black text-gray-600 tracking-widest">8 matches</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Stats Bar */}
                        <div className="pt-12 border-t border-white/5">
                            <p className="text-[11px] uppercase tracking-[0.2em] text-gray-700 font-bold text-center mb-10">Stats</p>
                            <div className="grid grid-cols-3 items-center py-6 px-4">
                                <div className="text-center border-r border-white/5 px-4">
                                    <p className="text-[11px] text-gray-600 font-bold uppercase tracking-widest mb-2">Wins</p>
                                    <p className="text-3xl font-black text-white">12</p>
                                </div>
                                <div className="text-center border-r border-white/5 px-4">
                                    <p className="text-[11px] text-gray-600 font-bold uppercase tracking-widest mb-2">Losses</p>
                                    <p className="text-3xl font-black text-white">4</p>
                                </div>
                                <div className="text-center px-4">
                                    <p className="text-[11px] text-gray-600 font-bold uppercase tracking-widest mb-2">Win Ratio</p>
                                    <p className="text-3xl font-black text-green-500">30%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Lower Grid: Links & Rank */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-10">
                    {/* Links Card */}
                    <div className="lg:col-span-2 bg-[#121212] border border-white/5 rounded-[40px] p-10 space-y-10">
                        <p className="text-[11px] uppercase tracking-[0.2em] text-gray-700 font-bold">Links</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                            <div className="flex items-center justify-between group cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-[#9146FF]/10 rounded-xl flex items-center justify-center">
                                        <Twitch size={20} className="text-[#9146FF]" />
                                    </div>
                                    <span className="text-sm font-bold text-gray-400 group-hover:text-white transition-colors">Discord username</span>
                                </div>
                                <LinkIcon size={14} className="text-gray-700 group-hover:text-purple-400" />
                            </div>
                            <div className="flex items-center justify-between group cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-[#FF0000]/10 rounded-xl flex items-center justify-center">
                                        <Youtube size={20} className="text-[#FF0000]" />
                                    </div>
                                    <span className="text-sm font-bold text-gray-400 group-hover:text-white transition-colors">Discord username</span>
                                </div>
                                <LinkIcon size={14} className="text-gray-700 group-hover:text-purple-400" />
                            </div>
                            <div className="flex items-center justify-between group cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-xl">
                                        📱
                                    </div>
                                    <span className="text-sm font-bold text-gray-400 group-hover:text-white transition-colors">Discord username</span>
                                </div>
                                <LinkIcon size={14} className="text-gray-700 group-hover:text-purple-400" />
                            </div>
                        </div>
                    </div>

                    {/* Rank Card Replication */}
                    <div className="bg-gradient-to-br from-[#8E2DE2] to-[#4A00E0] rounded-[40px] p-10 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)] animate-pulse"></div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-black mb-8 z-10">Your Rank</p>
                        <div className="relative z-10 mb-8 w-40 h-40 transform transition-transform group-hover:scale-105">
                            <div className="absolute inset-0 bg-white/20 blur-[50px] rounded-full"></div>
                            <div className="relative h-full w-full bg-[#121212]/30 backdrop-blur-md rounded-3xl border border-white/20 flex flex-col items-center justify-center p-4">
                                <div className="text-4xl mb-3">⭐</div>
                                <div className="bg-purple-600 px-3 py-1 rounded-md border border-white/20">
                                    <span className="text-[8px] font-black tracking-widest text-white uppercase">VETERAN</span>
                                </div>
                            </div>
                        </div>
                        <span className="text-[9px] font-black text-white/40 uppercase tracking-widest z-10">NFT</span>
                    </div>
                </div>
            </div>

        </div>
    );
}
