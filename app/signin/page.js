'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }
        setLoading(true);

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError(result.error);
            } else {
                router.push('/dashboard');
                router.refresh();
            }
        } catch (err) {
            setError('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4 font-sans">
            <div className="flex flex-col md:flex-row w-full max-w-[1000px] gap-8 items-stretch">

                {/* Left Side - Illustration (Desktop) */}
                <div className="hidden md:flex flex-1 bg-gradient-to-br from-[#ff00ff]/20 via-[#9d4edd]/20 to-[#00d4ff]/20 rounded-[40px] border border-white/10 relative overflow-hidden flex-col items-center justify-center p-12 text-center">
                    {/* Decorative backdrop */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle,rgba(176,62,225,0.2)_0%,transparent_70%)] animate-pulse"></div>
                    </div>

                    <div className="relative z-10 space-y-8">
                        {/* Shield/Logo Placeholder */}
                        <div className="w-48 h-48 mx-auto relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 blur-2xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
                            <div className="relative bg-[#121212] border border-white/10 rounded-full w-full h-full flex items-center justify-center">
                                <div className="text-6xl">🎮</div>
                            </div>
                        </div>

                        <h2 className="text-5xl font-black text-white tracking-tighter leading-tight">
                            Stake $SOL,<br />
                            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Win Big</span>
                        </h2>
                    </div>
                </div>

                {/* Right Side - Sign In Form */}
                <div className="flex-1 bg-[#121212] rounded-[40px] p-8 md:p-12 border border-white/5 flex flex-col justify-center">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Sign In</h1>
                        <p className="text-gray-500 font-medium text-lg">Welcome Back</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-sm font-medium">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-gray-400 text-sm font-medium ml-1">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                className="w-full bg-[#1c1c1c]/50 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 transition-colors"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-gray-400 text-sm font-medium ml-1 flex justify-between items-center">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    className="w-full bg-[#1c1c1c]/50 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 transition-colors pr-12"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            <div className="flex justify-end pr-1 pt-1">
                                <Link href="/forgot-password" size="sm" className="text-purple-500/80 hover:text-purple-400 text-sm transition-colors decoration-purple-500/20 underline underline-offset-4">
                                    Forgot Password
                                </Link>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#B03EE1] text-white rounded-full py-4 font-bold text-lg hover:bg-[#c04ef1] transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(176,62,225,0.3)] mt-4 flex items-center justify-center gap-2"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Continue'}
                        </button>
                    </form>

                    <div className="text-center mt-8">
                        <p className="text-gray-400 text-sm">
                            Don&apos;t have an account? <Link href="/signup" className="text-purple-500 hover:text-purple-400 font-medium transition-colors">Sign up</Link>
                        </p>
                    </div>

                    <div className="mt-14 relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/5"></div>
                        </div>
                        <div className="relative flex justify-center text-[10px] uppercase">
                            <span className="bg-[#121212] px-4 text-gray-600 font-bold tracking-widest">Or Sign in with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-8">
                        <button onClick={() => signIn('google', { callbackUrl: '/dashboard' })} className="flex items-center justify-center bg-[#0d0d0d] hover:bg-[#1a1a1a] border border-white/5 rounded-2xl py-4 transition-all group">
                            <svg className="w-6 h-6" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            <span className="ml-3 font-medium text-white">Google</span>
                        </button>
                        <button onClick={() => signIn('discord', { callbackUrl: '/dashboard' })} className="flex items-center justify-center bg-[#0d0d0d] hover:bg-[#1a1a1a] border border-white/5 rounded-2xl py-4 transition-all group">
                            <svg className="w-6 h-6" viewBox="0 0 127.14 96.36">
                                <path fill="#5865F2" d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.22,85.25,68.42,68.42,0,0,1,28.68,80.18a48.09,48.09,0,0,0,4.06-3.15,75.44,75.44,0,0,0,61.68,0c1.43,1.14,2.78,2.2,4.06,3.15a68.42,68.42,0,0,1-10.54,5.07,77.7,77.7,0,0,0,6.51,11.11,105.73,105.73,0,0,0,32.17-16.15h0C129.46,52,120.35,28.41,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5.09-12.73,11.41-12.73S54.08,46,53.86,53,48.77,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5.09-12.73,11.41-12.73S96.08,46,95.86,53,90.77,65.69,84.69,65.69Z" />
                            </svg>
                            <span className="ml-3 font-medium text-white">Discord</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
