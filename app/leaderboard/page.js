'use client';

import React from 'react';
import {
    Trophy,
    MapPin,
    Calendar,
    ChevronDown,
    PackageOpen
} from 'lucide-react';

export default function LeaderboardPage() {
    return (
        <div className="max-w-[1200px] mx-auto space-y-8 pb-20">

            {/* Filters Area */}
            <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-3 bg-[#121212] border border-white/5 px-5 py-3 rounded-2xl cursor-pointer hover:bg-white/5 transition-all group">
                    <Trophy size={18} className="text-gray-500 group-hover:text-purple-400" />
                    <span className="text-sm font-bold text-gray-400">Select Game</span>
                    <ChevronDown size={16} className="text-gray-600" />
                </div>

                <div className="flex items-center gap-3 bg-[#121212] border border-white/5 px-5 py-3 rounded-2xl cursor-pointer hover:bg-white/5 transition-all group">
                    <MapPin size={18} className="text-gray-500 group-hover:text-purple-400" />
                    <span className="text-sm font-bold text-gray-400">Region</span>
                    <ChevronDown size={16} className="text-gray-600" />
                </div>

                <div className="flex items-center gap-3 bg-[#121212] border border-white/5 px-5 py-3 rounded-2xl cursor-pointer hover:bg-white/5 transition-all group">
                    <Calendar size={18} className="text-gray-500 group-hover:text-purple-400" />
                    <span className="text-sm font-bold text-gray-400">All time</span>
                    <ChevronDown size={16} className="text-gray-600" />
                </div>
            </div>

            {/* Empty Spotlight Canvas */}
            <div className="w-full aspect-[11/3] relative rounded-[40px] overflow-hidden bg-[#121212] border border-white/5 flex items-center justify-center px-12 md:px-20">
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
                <div className="text-center space-y-4 relative z-10">
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto">
                        <Trophy size={32} className="text-gray-700" />
                    </div>
                    <h3 className="text-gray-600 font-black tracking-[0.2em] uppercase">No Leaderboard Data Yet</h3>
                </div>
            </div>

            {/* Leaderboard Table Container */}
            <div className="bg-[#121212] border border-white/5 rounded-[40px] p-8 md:p-10 space-y-8 min-h-[500px] flex flex-col">
                <div className="flex justify-between items-center">
                    <h4 className="text-lg font-bold text-white tracking-tight">Leaderboard</h4>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center py-20 text-center gap-4">
                    <PackageOpen size={64} className="text-gray-800" />
                    <div className="space-y-2">
                        <p className="text-gray-500 font-bold text-lg">No rankings found</p>
                        <p className="text-gray-700 text-sm max-w-xs mx-auto">Be the first to climb the ranks and secure your spotlight!</p>
                    </div>
                </div>
            </div>

        </div>
    );
}
