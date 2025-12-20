'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, CheckCircle2 } from 'lucide-react';

export default function EscrowSignPage() {
    const [showToast, setShowToast] = useState(true);

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] w-full">
            {/* Sign SOL Card */}
            <div className="w-full max-w-[500px] bg-[#121212] border border-white/5 rounded-[40px] p-10 md:p-14 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#B03EE1]/30 to-transparent"></div>

                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-600 font-bold mb-8">Sign SOL to Escrow</p>

                <h2 className="text-2xl md:text-3xl font-black text-white mb-4 tracking-tight">
                    Stake 2 SOL <span className="text-gray-600 text-lg mx-1">vs</span> Kingfisher22
                </h2>

                <p className="text-gray-500 text-sm font-medium mb-12">Phantom prompt...</p>

                <div className="space-y-6">
                    <Link href="/lounge" className="block w-full">
                        <button className="w-full bg-[#B03EE1] text-white rounded-full py-4 font-bold text-lg hover:bg-[#c04ef1] transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(176,62,225,0.3)]">
                            Sign
                        </button>
                    </Link>

                    <Link href="/lounge" className="text-purple-500/80 hover:text-purple-400 text-sm font-medium transition-colors block underline decoration-purple-500/20 underline-offset-4">
                        Cancel
                    </Link>
                </div>
            </div>

            {/* Proposal Accepted Toast */}
            {showToast && (
                <div className="fixed bottom-10 right-10 bg-[#121212] border border-white/10 rounded-2xl p-6 shadow-2xl flex items-start gap-4 max-w-[380px] animate-in slide-in-from-bottom-5">
                    <div className="flex-1">
                        <h4 className="text-sm font-bold text-white mb-1.5 flex items-center gap-2">
                            Proposal Accepted <CheckCircle2 size={16} className="text-green-500" />
                        </h4>
                        <p className="text-[12px] text-gray-500 leading-relaxed">
                            <span className="text-[#B03EE1] font-bold">Kingfisher22</span> has accepted your proposal to wager <span className="text-white font-bold">2 SOL</span> for this CODM match
                        </p>
                    </div>
                    <button onClick={() => setShowToast(false)} className="text-gray-500 hover:text-white flex-shrink-0 border border-white/10 rounded-full p-1 mt-1">
                        <X size={14} />
                    </button>
                </div>
            )}
        </div>
    );
}
