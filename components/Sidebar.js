'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Home,
    Trophy,
    Gamepad2,
    User,
    HelpCircle,
    LogOut
} from 'lucide-react';

const menuItems = [
    { name: 'Home', icon: Home, href: '/dashboard' },
    { name: 'Leaderboard', icon: Trophy, href: '/leaderboard' },
    { name: 'Matches', icon: Gamepad2, href: '/matches' },
    { name: 'Profile', icon: User, href: '/profile' },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 border-r border-white/5 flex flex-col fixed h-full bg-black z-20">
            <div className="p-8">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(176,62,225,0.4)]">
                        <span className="text-xl font-bold">G</span>
                    </div>
                </Link>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all group ${isActive
                                    ? 'bg-purple-500/20 text-purple-400'
                                    : 'text-gray-500 hover:bg-white/5 hover:text-gray-300'
                                }`}
                        >
                            <item.icon size={20} className={isActive ? 'text-purple-400' : 'group-hover:text-gray-300'} />
                            <span className="font-medium text-sm">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="px-4 py-8 space-y-2 border-t border-white/5">
                <Link href="/support" className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-gray-500 hover:bg-white/5 hover:text-gray-300 transition-all group">
                    <HelpCircle size={20} />
                    <span className="font-medium text-sm">Help & Support</span>
                </Link>
                <Link href="/" className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-red-500/60 hover:bg-red-500/10 hover:text-red-500 transition-all group">
                    <LogOut size={20} />
                    <span className="font-medium text-sm">Log Out</span>
                </Link>
            </div>
        </aside>
    );
}
