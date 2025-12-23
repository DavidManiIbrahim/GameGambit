'use client';

import React, { useState } from 'react';
import { PackageOpen } from 'lucide-react';

export default function MatchesPage() {
    const [activeFilter, setActiveFilter] = useState('ALL');

    return (
        <div className="max-w-[1000px] mx-auto space-y-8 pb-20 pt-4">

            {/* Overview Card */}
            <div className="bg-[#121212] border border-white/5 rounded-[40px] px-10 py-6 flex justify-between items-center group">
                <p className="text-[10px] uppercase font-bold text-gray-700 tracking-[0.2em]">Summary</p>
                <p className="text-[13px] font-black text-white/50 group-hover:text-white transition-colors">Start your journey today</p>
            </div>

            {/* Main History Container */}
            <div className="bg-[#121212] border border-white/5 rounded-[40px] p-8 md:p-12 relative min-h-[600px] flex flex-col">
                <div className="text-center mb-10">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 font-black">History</p>
                </div>

                {/* Filter bar */}
                <div className="flex flex-col items-center gap-10 flex-1">
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

                    {/* Empty State */}
                    <div className="flex-1 flex flex-col items-center justify-center py-20 text-center gap-6">
                        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center border border-white/5">
                            <PackageOpen size={40} className="text-gray-700" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-white font-bold text-xl">No Matches Recorded</h3>
                            <p className="text-gray-600 text-sm max-w-xs mx-auto">
                                You haven&apos;t participated in any matches yet. Ready to place your first bet?
                            </p>
                        </div>
                        <Link href="/lounge">
                            <button className="bg-[#B03EE1] text-white rounded-full px-8 py-3 font-bold text-sm hover:bg-[#c04ef1] transition-all active:scale-95 shadow-[0_0_20px_rgba(176,62,225,0.2)]">
                                Enter Lounge
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    );
}

// Simple Link wrapper since we don't want to import Link if common
import NextLink from 'next/link';
function Link({ href, children }) {
    return <NextLink href={href}>{children}</NextLink>;
}
