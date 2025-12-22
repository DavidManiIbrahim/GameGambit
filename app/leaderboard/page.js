'use client';

import React from 'react';
import Image from 'next/image';
import {
    Trophy,
    MapPin,
    Calendar,
    ChevronDown,
    Twitch,
    Youtube,
    MessageCircle
} from 'lucide-react';

export default function LeaderboardPage() {
    const tableData = Array(6).fill({
        rank: '1st',
        username: 'Kingfisher22',
        tier: 'Veteran',
        wn: '30/12',
        rate: '80%',
        earned: '1241 $SOL'
    });

    return (
        <div className="max-w-[1200px] mx-auto space-y-8 pb-20">

            {/* Filters Area */}
            <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-3 bg-[#121212] border border-white/5 px-5 py-3 rounded-2xl cursor-pointer hover:bg-white/5 transition-all group">
                    <Trophy size={18} className="text-gray-500 group-hover:text-purple-400" />
                    <span className="text-sm font-bold text-gray-400">Select Game</span>
                    <ChevronDown size={16} className="text-gray-600" />
                </div>

                <div className="flex items-center gap-3 bg-[#121212] border border-white/5 px-5 py-3 rounded-2xl cursor-pointer hover:bg-white/5 transition-all group">
                    <MapPin size={18} className="text-gray-500 group-hover:text-purple-400" />
                    <span className="text-sm font-bold text-gray-400">Lagos</span>
                    <ChevronDown size={16} className="text-gray-600" />
                </div>

                <div className="flex items-center gap-3 bg-[#121212] border border-white/5 px-5 py-3 rounded-2xl cursor-pointer hover:bg-white/5 transition-all group">
                    <Calendar size={18} className="text-gray-500 group-hover:text-purple-400" />
                    <span className="text-sm font-bold text-gray-400">All time</span>
                    <ChevronDown size={16} className="text-gray-600" />
                </div>
            </div>

            {/* Spotlight Canvas */}
            <div className="w-full aspect-[11/3] relative rounded-[40px] overflow-hidden bg-gradient-to-r from-[#B03EE1] via-[#9d4edd] to-[#00d4ff] flex items-center px-12 md:px-20 shadow-[0_0_50px_rgba(176,62,225,0.2)]">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>

                <div className="relative z-10 flex w-full items-center justify-between">
                    <div className="flex flex-col gap-2">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">Spotlight</p>
                        <h2 className="text-7xl font-black text-white italic tracking-tighter">#1</h2>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                        <div className="relative">
                            <div className="w-32 h-32 rounded-full border-4 border-white/20 p-1">
                                <div className="w-full h-full bg-orange-400 rounded-full overflow-hidden relative">
                                    <Image src="/mascot.png" alt="Profile" fill className="object-cover grayscale opacity-80" />
                                </div>
                            </div>
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-yellow-500/20 text-yellow-500 text-[9px] font-black px-4 py-1.5 rounded-full border border-yellow-500/30 uppercase tracking-widest whitespace-nowrap shadow-xl">
                                Peak
                            </div>
                        </div>
                        <h3 className="text-3xl font-black text-white tracking-tight">Kingfisher22</h3>
                    </div>

                    <div className="flex gap-6 items-center">
                        <MessageCircle size={20} className="text-white hover:scale-110 transition-transform cursor-pointer" />
                        <Youtube size={20} className="text-white hover:scale-110 transition-transform cursor-pointer" />
                        <Twitch size={20} className="text-white hover:scale-110 transition-transform cursor-pointer" />
                    </div>
                </div>
            </div>

            {/* Leaderboard Table Container */}
            <div className="bg-[#121212] border border-white/5 rounded-[40px] p-8 md:p-10 space-y-8">
                <div className="flex justify-between items-center">
                    <h4 className="text-lg font-bold text-white tracking-tight">Leaderboad</h4>
                    <p className="text-[10px] uppercase font-bold text-gray-600 tracking-widest">Top 10 Lagos</p>
                </div>

                <div className="w-full">
                    <div className="grid grid-cols-6 text-[10px] uppercase tracking-[0.2em] text-gray-700 font-black pb-6 border-b border-white/5 px-4 mb-4">
                        <span>No.</span>
                        <span className="col-span-1">Username</span>
                        <span className="text-center">Rank</span>
                        <span className="text-center">W/N</span>
                        <span className="text-center">Win rate</span>
                        <span className="text-right">Total SOL Earned</span>
                    </div>

                    <div className="space-y-2">
                        {tableData.map((row, idx) => (
                            <div key={idx} className="grid grid-cols-6 items-center py-5 px-4 rounded-2xl hover:bg-white/5 transition-all group cursor-pointer">
                                <span className="text-sm font-bold text-gray-500 group-hover:text-gray-300">{row.rank}</span>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-green-500/20 relative flex items-center justify-center p-0.5">
                                        <div className="w-full h-full bg-orange-400 rounded-full overflow-hidden"></div>
                                        <div className="absolute top-0 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#121212]"></div>
                                    </div>
                                    <span className="text-sm font-black text-gray-300 group-hover:text-white">{row.username}</span>
                                </div>
                                <div className="flex justify-center">
                                    <span className="bg-orange-500/10 text-orange-500 text-[10px] font-black px-4 py-1.5 rounded-full border border-orange-500/20 uppercase tracking-widest">
                                        {row.tier}
                                    </span>
                                </div>
                                <span className="text-sm font-bold text-gray-400 text-center">{row.wn}</span>
                                <span className="text-sm font-black text-green-500 text-center">{row.rate}</span>
                                <span className="text-sm font-black text-white text-right font-mono tracking-tighter">{row.earned}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}
