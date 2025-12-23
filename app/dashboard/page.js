'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
    Gamepad2,
    UserPlus,
    History,
    TrendingUp,
    Circle,
    PackageOpen
} from 'lucide-react';

export default function DashboardPage() {
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/signin');
        } else if (status === 'authenticated' && !session?.user?.verified) {
            router.push('/verify');
        }
    }, [status, session, router]);

    if (status === 'loading' || (status === 'authenticated' && !session?.user?.verified)) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="max-w-[1200px] mx-auto space-y-10 pb-20">
            <div className="space-y-2">
                <h1 className="text-4xl font-black text-white tracking-tight">
                    Welcome back, {session?.user?.name || 'Gamer'}
                </h1>
                <p className="text-gray-500 font-medium">Ready for your next challenge?</p>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Total Earned Card */}
                <div className="bg-[#121212] border border-white/5 rounded-[40px] p-10 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-gray-600 font-black mb-4">Total Amount Earned</p>
                    <div className="bg-white/5 px-4 py-2 rounded-full border border-white/5 flex items-center gap-2 mb-6 transition-all group-hover:bg-white/10">
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">SOL</span>
                    </div>
                    <h2 className="text-5xl font-black text-white tracking-tighter">0.00 SOL</h2>
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
                            <span className="text-xl font-black text-white">0</span>
                        </div>

                        <div className="flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-500/10 rounded-xl text-green-500">
                                    <TrendingUp size={18} />
                                </div>
                                <span className="text-sm font-bold text-gray-400 group-hover:text-gray-200 transition-colors">Games Won</span>
                            </div>
                            <span className="text-xl font-black text-white">0</span>
                        </div>

                        <div className="flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-red-500/10 rounded-xl text-red-500">
                                    <Circle size={10} strokeWidth={4} />
                                </div>
                                <span className="text-sm font-bold text-gray-400 group-hover:text-gray-200 transition-colors">Games lost</span>
                            </div>
                            <span className="text-xl font-black text-white">0</span>
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

            {/* Featured Games placeholder */}
            <div className="space-y-6">
                <div className="flex justify-between items-center text-center">
                    <span className="text-xs uppercase tracking-[0.2em] text-gray-600 font-bold mx-auto">Available Games</span>
                </div>
                <div className="bg-[#121212] border border-white/5 border-dashed rounded-[40px] p-20 flex flex-col items-center justify-center text-center gap-4">
                    <div className="p-6 bg-white/5 rounded-full text-gray-600">
                        <Gamepad2 size={40} />
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-lg">Coming Soon</h3>
                        <p className="text-gray-500 text-sm max-w-xs mx-auto">We are currently integrating top-tier games into the platform. Stay tuned!</p>
                    </div>
                </div>
            </div>

            {/* Rank and Leaderboard placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Leaderboard */}
                <div className="bg-[#121212] border border-white/5 rounded-[40px] p-8 md:p-10 flex flex-col min-h-[400px]">
                    <div className="flex justify-between items-center mb-10">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-600 font-black">Leaderboard</p>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
                        <Trophy size={48} className="text-gray-800" />
                        <p className="text-gray-600 font-bold text-sm">Season has not started yet</p>
                    </div>
                </div>

                {/* Rank Card */}
                <div className="bg-[#121212] border border-white/5 rounded-[40px] p-10 flex flex-col items-center justify-center text-center relative overflow-hidden group min-h-[400px]">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-gray-600 font-black mb-10">Your Rank</p>
                    <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
                        <div className="w-32 h-32 rounded-full bg-white/5 border border-white/5 flex items-center justify-center">
                            <span className="text-4xl">🌑</span>
                        </div>
                        <h3 className="text-gray-400 font-black tracking-widest mt-4">UNRANKED</h3>
                        <p className="text-gray-600 text-[11px] font-bold uppercase tracking-tight">Play 5 matches to get ranked</p>
                    </div>
                </div>
            </div>

            {/* Match History placeholder */}
            <div className="bg-[#121212] border border-white/5 rounded-[40px] p-8 md:p-10">
                <div className="text-center mb-10">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-gray-600 font-black">Match History</p>
                </div>
                <div className="flex flex-col items-center justify-center py-20 text-center gap-4 border border-white/5 border-dashed rounded-[32px]">
                    <PackageOpen size={48} className="text-gray-800" />
                    <p className="text-gray-600 font-bold text-sm">No matches played yet</p>
                </div>
            </div>
        </div>
    );
}

// Missing icon used above
function Trophy({ size, className }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
            <path d="M4 22h16" />
            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
        </svg>
    );
}
