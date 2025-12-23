'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Sword } from 'lucide-react';

export default function LoungePage() {
    const [matchState, setMatchState] = useState('submit'); // 'submit', 'ongoing', 'completed'
    const [showToast, setShowToast] = useState(true);

    const renderButton = () => {
        switch (matchState) {
            case 'submit':
                return (
                    <button
                        onClick={() => setMatchState('ongoing')}
                        className="w-full bg-[#B03EE1] text-white rounded-full py-4 font-bold text-lg hover:bg-[#c04ef1] transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(176,62,225,0.3)] mt-6"
                    >
                        Submit Code
                    </button>
                );
            case 'ongoing':
                return (
                    <button
                        disabled
                        className="w-full bg-gray-600/50 text-gray-300 rounded-full py-4 font-bold text-lg cursor-not-allowed mt-6 border border-white/5"
                    >
                        Game Ongoing
                    </button>
                );
            case 'completed':
                return (
                    <button
                        disabled
                        className="w-full bg-gray-600/50 text-gray-300 rounded-full py-4 font-bold text-lg cursor-not-allowed mt-6 border border-white/5 flex items-center justify-center gap-2"
                    >
                        Game Completed <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    </button>
                );
        }
    };

    const renderToast = () => {
        if (!showToast) return null;

        if (matchState === 'ongoing') {
            return (
                <div className="fixed bottom-10 right-10 bg-[#121212] border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col items-center gap-4 min-w-[300px] animate-in slide-in-from-bottom-5">
                    <button onClick={() => setShowToast(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X size={18} /></button>
                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center">
                        <Sword size={24} className="text-white" />
                    </div>
                    <p className="text-sm font-medium text-gray-300">Match has Begone</p>
                </div>
            );
        }

        if (matchState === 'completed') {
            return (
                <div className="fixed bottom-10 right-10 bg-[#121212] border border-white/10 rounded-2xl p-5 shadow-2xl flex items-center gap-4 max-w-[350px] animate-in slide-in-from-bottom-5">
                    <div className="flex-1">
                        <h4 className="text-sm font-bold text-white mb-1">Game Complete</h4>
                        <p className="text-[12px] text-gray-500 leading-tight">This match has ended, please wait for the winner to be announced</p>
                    </div>
                    <button onClick={() => setShowToast(false)} className="text-gray-500 hover:text-white flex-shrink-0 border border-white/10 rounded-full p-1"><X size={14} /></button>
                </div>
            );
        }

        return null;
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full">

            {/* Live Match Card */}
            <div className="w-full max-w-[450px] bg-[#121212] border border-white/5 rounded-[40px] p-8 md:p-10 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#B03EE1]/50 to-transparent"></div>
                <div className="text-center mb-8">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-gray-600 font-bold mb-6">Live Match</p>

                    <div className="flex justify-between items-center mb-10 px-4">
                        <div className="text-center">
                            <span className="text-5xl font-black text-white block mb-4">0</span>
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-10 h-10 bg-gray-800 rounded-full overflow-hidden border-2 border-white/5">
                                    {/* Placeholder for Kingfisher22 avatar */}
                                    <div className="w-full h-full bg-orange-400"></div>
                                </div>
                                <p className="text-[11px] font-bold text-white">Kingfisher22</p>
                                <p className="text-[9px] text-gray-600">Lagos</p>
                            </div>
                        </div>

                        <span className="text-gray-800 font-black text-sm uppercase italic">vs</span>

                        <div className="text-center">
                            <span className="text-5xl font-black text-white block mb-4">0</span>
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-10 h-10 bg-gray-800 rounded-full overflow-hidden border-2 border-white/10 flex items-center justify-center text-[10px] text-black font-bold">
                                    JB
                                </div>
                                <p className="text-[11px] font-bold text-white">Jamesbond007</p>
                                <p className="text-[9px] text-gray-600">Lagos</p>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-white/5 pt-8 text-left">
                        <p className="text-[10px] uppercase tracking-widest text-gray-600 font-bold mb-4">Game</p>
                        <div className="flex items-center gap-4 bg-white/5 rounded-2xl p-4 border border-white/5">
                            <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center overflow-hidden relative">
                                <Image src="https://m.media-amazon.com/images/I/71uV6W9B6CL.png" alt="COD" fill className="object-cover" />
                            </div>
                            <p className="font-bold text-sm text-gray-300">Call of Duty</p>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-between items-center border-t border-white/5 pt-6">
                        <p className="text-[10px] uppercase tracking-widest text-gray-600 font-bold">Wager</p>
                        <div className="flex items-center gap-2">
                            <span className="text-xl font-black text-white tracking-tight">4 SOL</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Game Guide Card */}
            <div className="w-full max-w-[450px] bg-[#121212] border border-white/5 rounded-[40px] p-8 md:p-10 flex flex-col h-full min-h-[450px]">
                <div className="text-center mb-8">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-gray-600 font-bold mb-8">Game Guide</p>
                </div>

                <div className="space-y-6 flex-1">
                    <div className="flex justify-between items-center group">
                        <span className="text-xs font-bold text-gray-600 group-hover:text-gray-400 transition-colors">01</span>
                        <p className="text-sm font-medium text-gray-400 group-hover:text-gray-200 transition-colors">Create CODM room</p>
                    </div>
                    <div className="flex justify-between items-center group">
                        <span className="text-xs font-bold text-gray-600 group-hover:text-gray-400 transition-colors">02</span>
                        <p className="text-sm font-medium text-gray-400 group-hover:text-gray-200 transition-colors">Share code</p>
                    </div>

                    <div className="space-y-2 pt-4">
                        <label className="text-[10px] uppercase tracking-widest text-gray-600 font-bold ml-1">Enter Code</label>
                        <input
                            type="text"
                            placeholder="Code"
                            className="w-full bg-[#1c1c1c]/50 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 transition-colors"
                            defaultValue={matchState !== 'submit' ? '131412' : ''}
                            readOnly={matchState !== 'submit'}
                        />
                    </div>
                </div>

                <div className="mt-auto pt-6 text-center space-y-6">
                    {renderButton()}

                    <Link
                        href="/"
                        className="text-purple-500/80 hover:text-purple-400 text-sm font-medium transition-colors block mx-auto underline underline-offset-4 decoration-purple-500/20"
                    >
                        Cancel
                    </Link>
                </div>
            </div>

            {renderToast()}
        </div>
    );
}
