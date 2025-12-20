'use client';

import React from 'react';
import Link from 'next/link';
import { Twitch, Youtube, Link as LinkIcon } from 'lucide-react';

export default function CounterOfferPage() {
    return (
        <div className="flex flex-col md:flex-row items-stretch justify-center gap-8 w-full max-w-5xl mx-auto py-12">

            {/* Opponent Profile Card */}
            <div className="flex-1 bg-[#121212] border border-white/5 rounded-[40px] overflow-hidden flex flex-col items-center">
                {/* Profile Header Gradient */}
                <div className="w-full h-40 bg-gradient-to-br from-[#ff00ff]/30 via-[#9d4edd]/30 to-[#00d4ff]/30 relative flex flex-col items-center justify-center">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-black mb-12">Opponent</p>

                    <div className="absolute -bottom-14 flex flex-col items-center">
                        <div className="w-28 h-28 bg-[#121212] rounded-full p-1.5 border border-white/5 relative">
                            <div className="w-full h-full rounded-full overflow-hidden bg-orange-400">
                                <img src="/mascot.png" alt="Avatar" className="w-full h-full object-cover grayscale opacity-80" />
                            </div>
                            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-[#B03EE1]/20 text-[#B03EE1] text-[8px] font-black px-3 py-1 rounded-full border border-[#B03EE1]/30 uppercase tracking-widest whitespace-nowrap">
                                Veteran
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16 pb-12 w-full px-8 text-center">
                    <h2 className="text-2xl font-black text-white tracking-tight mb-8">Kingfisher22</h2>

                    <div className="space-y-6">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-700 font-black">Stats</p>
                        <div className="flex justify-around items-center bg-white/5 rounded-3xl p-6 border border-white/5">
                            <div className="flex flex-col gap-1">
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Wins</p>
                                <p className="text-xl font-black text-white">12</p>
                            </div>
                            <div className="w-px h-8 bg-white/5"></div>
                            <div className="flex flex-col gap-1">
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Losses</p>
                                <p className="text-xl font-black text-white">4</p>
                            </div>
                            <div className="w-px h-8 bg-white/5"></div>
                            <div className="flex flex-col gap-1">
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Win Ratio</p>
                                <p className="text-xl font-black text-green-500">30%</p>
                            </div>
                        </div>

                        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-700 font-black mt-8">Links</p>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between text-gray-400 group cursor-pointer hover:text-white transition-colors px-2">
                                <div className="flex items-center gap-3">
                                    <Twitch size={18} className="text-[#9146FF]" />
                                    <span className="text-sm font-medium">Discord username</span>
                                </div>
                                <LinkIcon size={14} className="opacity-40 group-hover:opacity-100" />
                            </div>
                            <div className="flex items-center justify-between text-gray-400 group cursor-pointer hover:text-white transition-colors px-2">
                                <div className="flex items-center gap-3">
                                    <Youtube size={18} className="text-[#FF0000]" />
                                    <span className="text-sm font-medium">Discord username</span>
                                </div>
                                <LinkIcon size={14} className="opacity-40 group-hover:opacity-100" />
                            </div>
                            <div className="flex items-center justify-between text-gray-400 group cursor-pointer hover:text-white transition-colors px-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-4.5 h-4.5">📱</div>
                                    <span className="text-sm font-medium ml-0.5">Discord username</span>
                                </div>
                                <LinkIcon size={14} className="opacity-40 group-hover:opacity-100" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Counter Offer Card */}
            <div className="flex-1 space-y-8 flex flex-col">
                <div className="flex-1 bg-[#121212] border border-white/5 rounded-[40px] p-10 flex flex-col justify-center items-center text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#B03EE1]/5 blur-[80px]"></div>

                    <p className="text-[10px] uppercase tracking-[0.2em] text-gray-600 font-bold mb-8">Kingfisher22 counteroffer</p>

                    <div className="flex items-center gap-3 mb-10">
                        <span className="text-5xl font-black text-white tracking-tighter">1 SOL</span>
                    </div>

                    <div className="w-full space-y-6 pt-10 border-t border-white/5">
                        <div className="flex items-center gap-4 bg-white/5 rounded-2xl p-4 border border-white/5">
                            <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center overflow-hidden">
                                <img src="https://m.media-amazon.com/images/I/71uV6W9B6CL.png" alt="COD" className="w-full h-full object-cover" />
                            </div>
                            <div className="text-left">
                                <p className="font-bold text-sm text-gray-300">Call of Duty</p>
                                <div className="flex gap-4 text-[10px] text-gray-600 font-bold uppercase mt-1">
                                    <span>vs Kingfisher22</span>
                                    <span className="ml-auto">Lagos</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                    <Link href="/lounge/stake" className="block w-full">
                        <button className="w-full bg-[#B03EE1] text-white rounded-full py-4 font-bold text-lg hover:bg-[#c04ef1] transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(176,62,225,0.3)]">
                            Accept
                        </button>
                    </Link>
                    <Link href="/lounge" className="block w-full">
                        <button className="w-full bg-transparent border border-white/10 text-white rounded-full py-4 font-bold text-lg hover:border-[#B03EE1]/50 transition-all active:scale-[0.98]">
                            Counter Offer
                        </button>
                    </Link>
                    <Link href="/lounge" className="w-full py-2 text-purple-500/80 hover:text-purple-400 text-sm font-medium transition-colors block mx-auto underline decoration-purple-500/20 underline-offset-4 text-center">
                        Reject
                    </Link>
                </div>
            </div>

        </div>
    );
}
