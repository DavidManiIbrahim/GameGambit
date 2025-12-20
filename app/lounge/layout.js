'use client';

import Link from 'next/link';

export default function LoungeLayout({ children }) {
    return (
        <div className="min-h-screen bg-black text-white font-sans flex flex-col">
            {/* Header */}
            <header className="w-full px-8 py-6 flex justify-between items-center border-b border-white/5">
                <Link href="/" className="hover:opacity-80 transition-opacity">
                    <h1 className="text-xl font-bold tracking-tight">Game Lounge</h1>
                </Link>

                <div className="flex items-center gap-3">
                    <div className="bg-[#B03EE1]/10 text-[#B03EE1] text-[10px] font-bold px-3 py-1 rounded-full border border-[#B03EE1]/20 uppercase tracking-wider">
                        Veteran
                    </div>
                    <div className="flex items-center gap-2 bg-[#121212] px-3 py-1.5 rounded-full border border-white/5">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-[10px] font-bold text-black">
                            JB
                        </div>
                        <span className="text-sm font-medium text-gray-300">Jamesbond007</span>
                    </div>
                </div>
            </header>

            {/* Content Area */}
            <main className="flex-1 relative overflow-hidden flex flex-col items-center justify-center p-4">
                {/* Subtle background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[radial-gradient(circle,rgba(176,62,225,0.03)_0%,transparent_70%)] pointer-events-none"></div>

                <div className="w-full max-w-6xl z-10">
                    {children}
                </div>
            </main>
        </div>
    );
}
