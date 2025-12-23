'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import Sidebar from './Sidebar';

export default function DashboardLayout({ children, title }) {
    const { data: session, status } = useSession();
    const pathname = usePathname();
    const router = useRouter();
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    // Enforce authentication
    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/signin');
        }
    }, [status, router]);

    // Derive title if not provided
    const displayTitle = title || (pathname.split('/').pop() || 'Home');

    const userInitials = session?.user?.name
        ?.split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase() || '??';

    if (status === 'loading') {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white font-sans flex">
            {/* Reusable Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-1 ml-64 flex flex-col">
                {/* Header */}
                <header className="h-24 px-8 flex justify-between items-center bg-black/50 backdrop-blur-xl border-b border-white/5 sticky top-0 z-10">
                    <h2 className="text-xl font-bold tracking-tight capitalize">
                        {displayTitle}
                    </h2>

                    <div className="relative">
                        <button
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                            className="flex items-center gap-3 bg-[#121212] hover:bg-[#1a1a1a] p-1.5 pl-4 rounded-full border border-white/5 transition-all outline-none"
                        >
                            <div className="bg-[#B03EE1]/10 text-[#B03EE1] text-[10px] font-black px-3 py-1 rounded-full border border-[#B03EE1]/20 uppercase tracking-widest hidden md:block">
                                Active
                            </div>
                            <div className="flex items-center gap-2">
                                {session?.user?.image ? (
                                    <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10 relative">
                                        <Image
                                            src={session.user.image}
                                            alt={session.user.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-[10px] font-black text-black">
                                        {userInitials}
                                    </div>
                                )}
                                <span className="text-sm font-bold text-gray-300 hidden md:block">
                                    {session?.user?.name || 'User'}
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
                                        href="/profile"
                                        onClick={() => setShowProfileMenu(false)}
                                        className="block px-6 py-3 text-sm text-gray-400 hover:text-white transition-colors"
                                    >
                                        My Profile
                                    </Link>
                                    <div className="h-px bg-white/5 my-2 mx-4"></div>
                                    <button
                                        onClick={() => signOut({ callbackUrl: '/' })}
                                        className="w-full text-left px-6 py-3 text-sm text-red-500 font-bold hover:bg-red-500/5 transition-colors"
                                    >
                                        Log out
                                    </button>
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
