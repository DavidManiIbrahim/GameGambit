'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { X, Sword, Users, Search, Loader2 } from 'lucide-react';

export default function LoungePage() {
    const { data: session } = useSession();
    const [matchState, setMatchState] = useState('submit'); // 'submit', 'ongoing', 'completed'
    const [showToast, setShowToast] = useState(false);
    const [opponent, setOpponent] = useState(null);
    const [findingOpponent, setFindingOpponent] = useState(false);

    const userInitials = session?.user?.name
        ?.split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase() || '??';

    const opponentInitials = opponent?.username
        ?.split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase() || '??';

    const findRandomOpponent = async () => {
        setFindingOpponent(true);
        try {
            const res = await fetch('/api/matchmaking/random');
            const data = await res.json();

            if (data.ok && data.opponent) {
                setOpponent(data.opponent);
            } else {
                alert('No opponents available at the moment. Try again later!');
            }
        } catch (err) {
            console.error('Error finding opponent:', err);
            alert('Failed to find an opponent. Please try again.');
        } finally {
            setFindingOpponent(false);
        }
    };

    const renderButton = () => {
        switch (matchState) {
            case 'submit':
                return (
                    <button
                        onClick={() => {
                            setMatchState('ongoing');
                            setShowToast(true);
                        }}
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
                    <p className="text-sm font-medium text-gray-300">Match has Begun</p>
                </div>
            );
        }

        return null;
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-6xl mx-auto">

            {/* Live Match Card */}
            <div className="w-full max-w-[450px] bg-[#121212] border border-white/5 rounded-[40px] p-8 md:p-10 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#B03EE1]/50 to-transparent"></div>
                <div className="text-center mb-8">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-gray-600 font-bold mb-6">Preparation</p>

                    <div className="flex justify-between items-center mb-10 px-4">
                        <div className="text-center">
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-16 h-16 bg-white/5 rounded-full overflow-hidden border-2 border-white/10 flex items-center justify-center relative">
                                    {session?.user?.image ? (
                                        <img src={session.user.image} alt={session.user.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-xl font-black text-white/20">{userInitials}</span>
                                    )}
                                </div>
                                <p className="text-xs font-bold text-white">{session?.user?.name || 'You'}</p>
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <span className="text-gray-800 font-black text-sm uppercase italic">vs</span>
                            {opponent ? (
                                <div className="bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
                                    <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">Matched</span>
                                </div>
                            ) : (
                                <div className="bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                                    <span className="text-[9px] font-black text-purple-500 uppercase tracking-widest animate-pulse">Waiting</span>
                                </div>
                            )}
                        </div>

                        <div className="text-center">
                            <div className="flex flex-col items-center gap-3">
                                {opponent ? (
                                    <>
                                        <div className="w-16 h-16 bg-white/5 rounded-full overflow-hidden border-2 border-green-500/30 flex items-center justify-center relative">
                                            {opponent.image ? (
                                                <img src={opponent.image} alt={opponent.username} className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-xl font-black text-white">{opponentInitials}</span>
                                            )}
                                        </div>
                                        <p className="text-xs font-bold text-white">{opponent.username}</p>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={findRandomOpponent}
                                            disabled={findingOpponent}
                                            className="w-16 h-16 bg-purple-500/10 hover:bg-purple-500/20 rounded-full border-2 border-purple-500/30 hover:border-purple-500/50 flex items-center justify-center text-[10px] text-purple-500 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {findingOpponent ? (
                                                <Loader2 size={20} className="animate-spin" />
                                            ) : (
                                                <Search size={20} />
                                            )}
                                        </button>
                                        <p className="text-xs font-bold text-gray-700">
                                            {findingOpponent ? 'Searching...' : 'Click to Find'}
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-white/5 pt-8 text-left">
                        <p className="text-[10px] uppercase tracking-widest text-gray-600 font-bold mb-4">Selected Game</p>
                        <div className="flex items-center gap-4 bg-white/5 rounded-2xl p-4 border border-white/5">
                            <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center text-gray-700">
                                <Users size={24} />
                            </div>
                            <p className="font-bold text-sm text-gray-500">Call of Duty Mobile</p>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-between items-center border-t border-white/5 pt-6">
                        <p className="text-[10px] uppercase tracking-widest text-gray-600 font-bold">Wager Amount</p>
                        <div className="flex items-center gap-2">
                            <span className="text-xl font-black text-white tracking-tight">-- SOL</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Game Guide Card */}
            <div className="w-full max-w-[450px] bg-[#121212] border border-white/5 rounded-[40px] p-8 md:p-10 flex flex-col h-full min-h-[450px]">
                <div className="text-center mb-8">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-gray-600 font-bold mb-8">Instructions</p>
                </div>

                <div className="space-y-6 flex-1">
                    <div className="flex justify-between items-center group">
                        <span className="text-xs font-bold text-gray-600 group-hover:text-gray-400 transition-colors">01</span>
                        <p className="text-sm font-medium text-gray-400 group-hover:text-gray-200 transition-colors">Create a private match room in CODM</p>
                    </div>
                    <div className="flex justify-between items-center group">
                        <span className="text-xs font-bold text-gray-600 group-hover:text-gray-400 transition-colors">02</span>
                        <p className="text-sm font-medium text-gray-400 group-hover:text-gray-200 transition-colors">Copy the room invite code</p>
                    </div>
                    <div className="flex justify-between items-center group">
                        <span className="text-xs font-bold text-gray-600 group-hover:text-gray-400 transition-colors">03</span>
                        <p className="text-sm font-medium text-gray-400 group-hover:text-gray-200 transition-colors">Paste it here to invite your opponent</p>
                    </div>

                    <div className="space-y-2 pt-4">
                        <label className="text-[10px] uppercase tracking-widest text-gray-600 font-bold ml-1">Room Code</label>
                        <input
                            type="text"
                            placeholder="Enter CODM Room Code"
                            className="w-full bg-[#1c1c1c]/50 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 transition-colors"
                            defaultValue={matchState !== 'submit' ? 'PND-123' : ''}
                            readOnly={matchState !== 'submit'}
                        />
                    </div>
                </div>

                <div className="mt-auto pt-6 text-center space-y-6">
                    {renderButton()}

                    <Link
                        href="/dashboard"
                        className="text-gray-600 hover:text-white text-sm font-medium transition-colors block mx-auto underline underline-offset-4 decoration-white/10"
                    >
                        Return to Dashboard
                    </Link>
                </div>
            </div>

            {renderToast()}
        </div>
    );
}
