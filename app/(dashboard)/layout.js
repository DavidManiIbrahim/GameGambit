'use client';

import { useSession, signOut } from 'next-auth/react';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import Sidebar from '@/components/Sidebar';

export default function SharedDashboardLayout({ children }) {
    const { data: session } = useSession();
    const pathname = usePathname();
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    // Derive the page title from the pathname
    const getPageTitle = () => {
        const parts = pathname.split('/');
        const lastPart = parts[parts.length - 1];
        if (!lastPart || lastPart === 'dashboard') return 'Home';
        return lastPart.charAt(0).toUpperCase() + lastPart.slice(1);
    };

    const userInitials = session?.user?.name
        ?.split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase() || '??';

    return (
        <div className="min-h-screen bg-black text-white font-sans flex">
            {/* Reusable Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-1 ml-64 flex flex-col">
                {/* Header */}
                <header className="h-24 px-8 flex justify-between items-center bg-black/50 backdrop-blur-xl border-b border-white/5 sticky top-0 z-10">
                    <h2 className="text-xl font-bold tracking-tight capitalize">
                        {getPageTitle()}
                    </h2>

                    <div className="relative">
                        <button
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                            className="flex items-center gap-3 bg-[#121212] hover:bg-[#1a1a1a] p-1.5 pl-4 rounded-full border border-white/5 transition-all outline-none"
                        >
                            <div className="bg-[#B03EE1]/10 text-[#B03EE1] text-[10px] font-black px-3 py-1 rounded-full border border-[#B03EE1]/20 uppercase tracking-widest hidden md:block">
                                Rookie
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-[10px] font-black text-black overflow-hidden relative">
                                    {session?.user?.image ? (
                                        <img src={session.user.image} alt={session.user.name} className="w-full h-full object-cover" />
                                    ) : (
                                        userInitials
                                    )}
                                </div>
                                <span className="text-sm font-bold text-gray-300 hidden md:block">
                                    {session?.user?.name || 'Loading...'}
                                </span>
                                <ChevronDown size={14} className={`text-gray-500 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
                            </div>
                        </button>

                        {/* Profile Dropdown */}
                        {showProfileMenu && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setShowProfileMenu(false)}></div>
                                <div className="absolute right-0 mt-3 w-56 bg-[#121212] border border-white/10 rounded-[24px] shadow-2xl py-3 z-20 animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                                    <Link
                                        href={`/profile/${session?.user?.id || ''}`}
                                        onClick={() => setShowProfileMenu(false)}
                                        className="block px-6 py-3 text-sm text-gray-400 hover:text-white transition-colors"
                                    >
                                        View public profile
                                    </Link>
                                    <Link
                                        href="/profile"
                                        onClick={() => setShowProfileMenu(false)}
                                        className="block px-6 py-3 text-sm text-gray-400 hover:text-white transition-colors"
                                    >
                                        View internal profile
                                    </Link>
                                    <div className="h-px bg-white/5 my-2 mx-4"></div>
                                    <button onClick={() => signOut()} className="block w-full text-left px-6 py-3 text-sm text-red-500 font-bold hover:bg-red-500/5 transition-colors">Log out</button>
                                </div>
                            </>
                        )}
                    </div>
                </header>

                <main className="flex-1 p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
