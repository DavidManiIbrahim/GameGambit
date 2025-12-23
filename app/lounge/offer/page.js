'use client';

import React from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';

export default function CounterOfferPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60rem] w-full max-w-5xl mx-auto py-12">

            <div className="bg-[#121212] border border-white/5 rounded-[40px] p-20 flex flex-col items-center justify-center text-center gap-8 relative overflow-hidden w-full">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>

                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center border border-white/5">
                    <Search size={40} className="text-gray-700 animate-pulse" />
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-black text-white tracking-tight">No Active Offers</h2>
                    <p className="text-gray-500 max-w-sm mx-auto">
                        You don&apos;t have any pending match offers or counter-offers at the moment.
                    </p>
                </div>

                <div className="flex gap-4 w-full max-w-md">
                    <Link href="/lounge" className="flex-1">
                        <button className="w-full bg-[#B03EE1] text-white rounded-full py-4 font-bold text-sm hover:bg-[#c04ef1] transition-all active:scale-[0.98]">
                            Find a Match
                        </button>
                    </Link>
                    <Link href="/dashboard" className="flex-1">
                        <button className="w-full bg-white/5 border border-white/10 text-white rounded-full py-4 font-bold text-sm hover:bg-white/10 transition-all">
                            Dashboard
                        </button>
                    </Link>
                </div>
            </div>

        </div>
    );
}
