'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export default function MatchesPage() {
    const [activeFilter, setActiveFilter] = useState('ALL');

    const history = [
        { opponent: 'Chidi356', date: 'Sat 4, March 2025 - 11:30AM', result: 'WON', amount: '+4 SOL' },
        { opponent: 'Chidi356', date: 'Sat 4, March 2025 - 11:30AM', result: 'LOST', amount: '-2 SOL' },
        { opponent: 'Chidi356', date: 'Sat 4, March 2025 - 11:30AM', result: 'LOST', amount: '-2 SOL' },
        { opponent: 'Chidi356', date: 'Sat 4, March 2025 - 11:30AM', result: 'WON', amount: '+4 SOL' },
    ];

    return (
        <div className="max-w-[1000px] mx-auto space-y-8 pb-20 pt-4">

            {/* Overview Card */}
            <div className="bg-[#121212] border border-white/5 rounded-[40px] px-10 py-6 flex justify-between items-center group">
                <p className="text-[10px] uppercase font-bold text-gray-700 tracking-[0.2em]">Stats</p>
                <p className="text-[13px] font-black text-white/50 group-hover:text-white transition-colors">Won 3 of last 7 games</p>
            </div>

            {/* Main History Container */}
            <div className="bg-[#121212] border border-white/5 rounded-[40px] p-8 md:p-12 relative">
                <div className="text-center mb-10">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 font-black">Match History</p>
                </div>

                {/* Dynamic Filter bar */}
                <div className="flex flex-col items-center gap-10">
                    <div className="w-full max-w-lg bg-[#0d0d0d] p-1.5 rounded-full border border-white/5 flex gap-1 isolate">
                        {['ALL', 'WINS', 'LOSS'].map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`flex-1 py-3 rounded-full text-[11px] font-black tracking-widest transition-all relative z-10 ${activeFilter === filter ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                                    }`}
                            >
                                {activeFilter === filter && (
                                    <div className="absolute inset-0 bg-white/5 rounded-full -z-10 border border-white/5 shadow-inner animate-in fade-in zoom-in-95 duration-200"></div>
                                )}
                                {filter}
                            </button>
                        ))}
                    </div>

                    {/* Transaction List */}
                    <div className="w-full space-y-4">
                        {history.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between p-6 bg-white/3 border border-white/5 rounded-[32px] group hover:bg-white/5 transition-all">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 bg-yellow-500 rounded-2xl overflow-hidden border border-white/10 group-hover:scale-105 transition-transform duration-300 relative">
                                        <Image src="https://m.media-amazon.com/images/I/71uV6W9B6CL.png" alt="Game" fill className="object-cover" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="font-black text-white text-lg">vs {item.opponent}</h4>
                                        <p className="text-[11px] text-gray-600 font-bold uppercase tracking-wide">{item.date}</p>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <span className={`text-[15px] font-black block group-hover:scale-110 transition-transform ${item.result === 'WON' ? 'text-green-500' : 'text-red-500'}`}>
                                        {item.result === 'WON' ? 'Won' : 'Lost'} {item.amount}
                                    </span>
                                </div>
                            </div>
                        ))}

                        {/* Separator */}
                        <div className="relative py-12">
                            <div className="absolute inset-x-0 top-1/2 h-px bg-white/5"></div>
                            <div className="relative flex justify-center">
                                <span className="bg-[#121212] px-10 text-[10px] uppercase tracking-[0.3em] font-black text-gray-700">Last Week</span>
                            </div>
                        </div>

                        {/* More History */}
                        {history.slice(0, 3).map((item, idx) => (
                            <div key={idx + 10} className="flex items-center justify-between p-6 bg-white/3 border border-white/5 rounded-[32px] group hover:bg-white/5 transition-all opacity-60 hover:opacity-100">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 bg-yellow-500 rounded-2xl overflow-hidden border border-white/10 relative">
                                        <Image src="https://m.media-amazon.com/images/I/71uV6W9B6CL.png" alt="Game" fill className="object-cover" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="font-black text-white text-lg">vs {item.opponent}</h4>
                                        <p className="text-[11px] text-gray-600 font-bold uppercase tracking-wide">{item.date}</p>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <span className="text-[15px] font-black block text-green-500">Won {item.amount}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}
