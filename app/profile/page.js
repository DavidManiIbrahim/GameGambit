'use client';

import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import {
    Pencil,
    Twitch,
    Youtube,
    Link as LinkIcon,
    Gamepad2
} from 'lucide-react';

export default function ProfilePage() {
    const { data: session } = useSession();

    const userInitials = session?.user?.name
        ?.split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase() || '??';

    return (
        <div className="max-w-[1000px] mx-auto space-y-10 pb-20 pt-6">

            {/* Account Information Card */}
            <div className="bg-[#121212] border border-white/5 rounded-[40px] px-10 py-12 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-[100px]"></div>

                <div className="flex flex-col items-center gap-4 relative z-10 shrink-0">
                    <div className="w-32 h-32 rounded-full border-4 border-white/20 p-1.5 transition-transform group-hover:scale-105 duration-500 overflow-hidden relative">
                        {session?.user?.image ? (
                            <img src={session.user.image} alt={session.user.name} className="w-full h-full object-cover rounded-full" />
                        ) : (
                            <div className="w-full h-full bg-green-500 rounded-full flex items-center justify-center text-3xl font-black text-black">
                                {userInitials}
                            </div>
                        )}
                    </div>
                    <div className="bg-white/5 text-gray-500 text-[10px] font-black px-3 py-1 rounded-full border border-white/5 uppercase tracking-widest">
                        Rookie
                    </div>
                    <h2 className="text-2xl font-black text-white tracking-tight">
                        {session?.user?.name || 'Loading...'}
                    </h2>
                </div>

                <div className="flex-1 w-full space-y-8 relative z-10">
                    <div className="flex justify-between items-center">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-700 font-black">Account information</p>
                        <Link href="/profile/edit" className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
                            <span className="text-xs font-bold underline decoration-purple-500/30 underline-offset-4">Edit info</span>
                            <Pencil size={14} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6">
                        <div className="space-y-1">
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Wallet</p>
                            <p className="text-sm font-bold text-gray-600 font-mono italic">Not connected</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Email Address</p>
                            <p className="text-sm font-bold text-gray-300">
                                {session?.user?.email || 'N/A'}
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button className="text-[13px] font-bold text-purple-500 hover:text-purple-400 transition-colors">
                            Change Password
                        </button>
                    </div>
                </div>
            </div>

            {/* Top Games Section placeholder */}
            <div className="bg-[#121212] border border-white/5 rounded-[40px] p-10 space-y-10">
                <div className="text-center">
                    <p className="text-[10px] uppercase font-bold text-gray-700 tracking-[0.2em]">Top Games</p>
                </div>

                <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center">
                        <Gamepad2 size={24} className="text-gray-800" />
                    </div>
                    <p className="text-gray-600 font-bold text-sm">Play games to see your top picks</p>
                </div>

                {/* Stats */}
                <div className="pt-10 border-t border-white/5">
                    <p className="text-[10px] uppercase font-bold text-gray-700 tracking-[0.2em] text-center mb-10">Stats Overview</p>
                    <div className="flex justify-around items-center bg-white/3 rounded-[32px] p-8 border border-white/5">
                        <div className="text-center space-y-1">
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Wins</p>
                            <p className="text-2xl font-black text-white">0</p>
                        </div>
                        <div className="w-px h-10 bg-white/5"></div>
                        <div className="text-center space-y-1">
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Losses</p>
                            <p className="text-2xl font-black text-white">0</p>
                        </div>
                        <div className="w-px h-10 bg-white/5"></div>
                        <div className="text-center space-y-1">
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Win Ratio</p>
                            <p className="text-2xl font-black text-gray-700">0%</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Social Links placeholders */}
                <div className="bg-[#121212] border border-white/5 rounded-[40px] p-10 space-y-8">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-gray-700 font-black">Social Links</p>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between text-gray-600 group cursor-pointer hover:text-white transition-colors">
                            <div className="flex items-center gap-4">
                                <Twitch size={18} />
                                <span className="text-sm font-bold italic">Not linked</span>
                            </div>
                            <LinkIcon size={14} className="opacity-40" />
                        </div>
                        <div className="flex items-center justify-between text-gray-600 group cursor-pointer hover:text-white transition-colors">
                            <div className="flex items-center gap-4">
                                <Youtube size={18} />
                                <span className="text-sm font-bold italic">Not linked</span>
                            </div>
                            <LinkIcon size={14} className="opacity-40" />
                        </div>
                    </div>
                </div>

                {/* Rank placeholder */}
                <div className="bg-[#121212] border border-white/5 rounded-[40px] p-10 flex flex-col items-center justify-center text-center relative overflow-hidden group min-h-[300px]">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-gray-600 font-black mb-10">Season Rank</p>
                    <div className="w-24 h-24 rounded-full bg-white/5 border border-white/5 flex items-center justify-center mb-6">
                        <span className="text-4xl grayscale opacity-30">🌑</span>
                    </div>
                    <h3 className="text-gray-500 font-black tracking-widest uppercase text-sm">Unranked</h3>
                </div>
            </div>

        </div>
    );
}
