'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    Gamepad2,
    UserPlus,
    History,
    CheckCircle2,
    TrendingUp,
    Circle
} from 'lucide-react';

export default function DashboardPage() {
    const leaderboardData = [
        { pos: '1st', name: 'Mary Gbobo', rate: '80%' },
        { pos: '2nd', name: 'Esther Amakiri', rate: '79%' },
        { pos: '3rd', name: 'Joseph Seiyefa', rate: '78%' },
        { pos: '4th', name: 'Rebecca Kalio', rate: '76%' },
        { pos: '5th', name: 'James Inatimi', rate: '72%' },
    ];

    return (
        <div className="max-w-[1200px] mx-auto space-y-10 pb-20">

            <div className="space-y-2">
                <h1 className="text-4xl font-black text-white tracking-tight">Welcome to Game Gambit</h1>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Total Earned Card */}
                <div className="bg-[#121212] border border-white/5 rounded-[40px] p-10 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-gray-600 font-black mb-4">Total Amount Earned</p>
                    <div className="bg-white/5 px-4 py-2 rounded-full border border-white/5 flex items-center gap-2 mb-6 transition-all group-hover:bg-white/10">
                        <Image src="https://solana.com/favicon-32x32.png" width={14} height={14} className="invert" alt="" />
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">SOL</span>
                    </div>
                    <h2 className="text-5xl font-black text-white tracking-tighter">30.00 SOL</h2>
                </div>

                {/* Game Stats Card */}
                <div className="bg-[#121212] border border-white/5 rounded-[40px] p-10 space-y-8">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-gray-600 font-black">Your Stats</p>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-orange-500/10 rounded-xl text-orange-500">
                                    <History size={18} />
                                </div>
                                <span className="text-sm font-bold text-gray-400 group-hover:text-gray-200 transition-colors">Games Played</span>
                            </div>
                            <span className="text-xl font-black text-white">123</span>
                        </div>

                        <div className="flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-500/10 rounded-xl text-green-500">
                                    <TrendingUp size={18} />
                                </div>
                                <span className="text-sm font-bold text-gray-400 group-hover:text-gray-200 transition-colors">Games Won</span>
                            </div>
                            <span className="text-xl font-black text-white">99</span>
                        </div>

                        <div className="flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-red-500/10 rounded-xl text-red-500">
                                    <Circle size={10} strokeWidth={4} />
                                </div>
                                <span className="text-sm font-bold text-gray-400 group-hover:text-gray-200 transition-colors">Games lost</span>
                            </div>
                            <span className="text-xl font-black text-white">33</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link href="/lounge" className="block">
                    <button className="w-full bg-[#B03EE1] text-white rounded-[24px] py-5 font-bold text-lg hover:bg-[#c04ef1] transition-all active:scale-[0.98] shadow-[0_0_25px_rgba(176,62,225,0.25)] flex items-center justify-center gap-3">
                        Start a New Match <Gamepad2 size={22} strokeWidth={2.5} />
                    </button>
                </Link>
                <button className="w-full bg-[#121212] border border-white/10 text-white rounded-[24px] py-5 font-bold text-lg hover:bg-[#1a1a1a] transition-all active:scale-[0.98] flex items-center justify-center gap-3">
                    Invite a Friend <UserPlus size={22} />
                </button>
            </div>

            {/* Featured Games */}
            <div className="space-y-6">
                <div className="flex justify-between items-center text-center">
                    <span className="text-xs uppercase tracking-[0.2em] text-gray-600 font-bold mx-auto">Featured Games</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="group cursor-pointer">
                            <div className="aspect-[3/4] rounded-[24px] overflow-hidden border border-white/5 group-hover:border-purple-500/50 transition-all relative">
                                <Image
                                    src="https://m.media-amazon.com/images/I/71uV6W9B6CL.png"
                                    alt="Game"
                                    fill
                                    className="object-cover grayscale transition-all group-hover:grayscale-0 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                            </div>
                            <p className="mt-4 text-[11px] font-bold text-gray-500 text-center tracking-wide group-hover:text-white transition-colors">Call of Duty Mobile</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Rank and Leaderboard */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Leaderboard */}
                <div className="bg-[#121212] border border-white/5 rounded-[40px] p-8 md:p-10 flex flex-col">
                    <div className="flex justify-between items-center mb-10">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-600 font-black">Leaderboad</p>
                        <span className="text-[10px] uppercase font-bold text-gray-600">Top 10 Lagos</span>
                    </div>

                    <div className="space-y-6 flex-1">
                        <div className="grid grid-cols-3 text-[10px] uppercase tracking-[0.15em] text-gray-700 font-black px-2">
                            <span>Position</span>
                            <span>Name</span>
                            <span className="text-right">Win rate</span>
                        </div>

                        <div className="space-y-2">
                            {leaderboardData.map((user, idx) => (
                                <div key={idx} className="grid grid-cols-3 items-center py-4 px-2 rounded-2xl hover:bg-white/5 transition-colors group">
                                    <span className="text-sm font-bold text-gray-500 group-hover:text-gray-300">{user.pos}</span>
                                    <span className="text-sm font-black text-gray-300 group-hover:text-white">{user.name}</span>
                                    <span className="text-sm font-bold text-gray-300 group-hover:text-green-500 text-right">{user.rate}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-10 pt-10 border-t border-white/5 flex justify-between items-center">
                        <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Your Position</span>
                        <span className="text-sm font-black text-purple-500">#124th in Lagos</span>
                    </div>
                </div>

                {/* Rank Card */}
                <div className="bg-gradient-to-br from-[#8E2DE2] to-[#4A00E0] rounded-[40px] p-10 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)] animate-pulse"></div>

                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-black mb-10 z-10">Your Rank</p>

                    <div className="relative z-10 mb-10">
                        {/* Badge Visual */}
                        <div className="w-56 h-56 relative animate-bounce-slow">
                            <div className="absolute inset-0 bg-white/20 blur-[80px] rounded-full"></div>
                            <div className="relative w-full h-full flex items-center justify-center p-4">
                                <div className="w-full h-full bg-[#121212]/30 backdrop-blur-md rounded-3xl border border-white/20 transform rotate-45 flex items-center justify-center overflow-hidden">
                                    <div className="transform -rotate-45 flex flex-col items-center gap-2">
                                        <div className="text-4xl">⭐</div>
                                        <div className="bg-purple-600 px-4 py-1.5 rounded-lg border border-white/20 shadow-xl mt-4">
                                            <span className="text-[10px] font-black tracking-[0.2em] text-white uppercase">VETERAN</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <span className="text-[10px] font-black text-white/60 uppercase tracking-widest z-10">NFT</span>
                </div>
            </div>

            {/* Match History */}
            <div className="bg-[#121212] border border-white/5 rounded-[40px] p-8 md:p-10">
                <div className="text-center mb-10">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-gray-600 font-black">Match History</p>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between p-6 bg-white/5 border border-white/5 rounded-[32px] group hover:border-purple-500/30 transition-all cursor-pointer">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-yellow-500 rounded-2xl overflow-hidden border border-white/10 relative">
                                <Image src="https://m.media-amazon.com/images/I/71uV6W9B6CL.png" alt="Match" fill className="object-cover" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="font-black text-white group-hover:text-purple-400 transition-colors">vs Chidi356</h4>
                                <p className="text-xs text-gray-500 font-bold">Sat 4, March 2025 - 11:30AM</p>
                            </div>
                        </div>

                        <div className="text-right">
                            <span className="text-sm font-black text-green-500 block mb-1">Won +4 SOL</span>
                            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Won 3 of last 7 games</p>
                        </div>
                    </div>
                </div>

                <div className="mt-10 pt-10 border-t border-white/5 flex justify-between items-center text-[10px] uppercase font-black text-gray-700 tracking-[0.2em]">
                    <span>Stats</span>
                    <span>Won 3 of last 7 games</span>
                </div>
            </div>

        </div>
    );
}
