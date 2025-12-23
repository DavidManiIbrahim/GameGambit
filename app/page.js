"use client";
import { useState, useEffect } from "react";
import Image from 'next/image';
import Link from 'next/link';
import {
  Wallet,
  Users,
  Trophy,
  Gamepad2,
  Play,
  MessageCircle,
  Youtube,
  Facebook,
  Twitter
} from "lucide-react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await fetch('/api/matches');
        if (!res.ok) throw new Error('Failed to fetch matches');
        const data = await res.json();
        setMatches(data);
      } catch (error) {
        console.error('Error fetching matches:', error);
        setMatches([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center bg-black text-white relative">
      {/* Background Hero Effects */}
      <div className="absolute top-0 w-full h-screen overflow-hidden pointer-events-none -z-10">
        {/* <Image src="/hero-bg.png" alt="background" fill className="object-cover opacity-50" priority /> */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>
      </div>

      {/* Floating Chips */}
      {/* <Image src="/poker-chip.png" width={96} height={96} className="absolute top-1/4 left-10 animate-pulse opacity-20 -z-5" alt="" /> */}
      {/* <Image src="/poker-chip.png" width={128} height={128} className="absolute top-1/3 right-10 animate-bounce opacity-20 -z-5" style={{ animationDuration: '4s' }} alt="" /> */}

      {/* Navigation */}
      <nav className="w-full flex justify-between items-center px-12 py-6 z-50">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
        </div>
        <div className="hidden md:flex gap-10 mx-auto text-sm font-medium text-gray-300">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <a href="#how" className="hover:text-white transition-colors">How it Works</a>
          <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
        </div>
        <Link href="/signup" className="btn-primary">Connect Wallet</Link>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-32 flex flex-col items-center text-center px-4 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
          Stake $SOL, Win Big
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed">
          Place your $SOL in high stakes 1v1 matches on Game Gambit and get verified instant payouts.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
            className="input-field flex-grow"
          />
          <Link href="/signup" className="btn-primary !px-8 flex items-center justify-center">Connect Wallet</Link>
        </div>
        <p className="text-xs text-silver-400 opacity-60">Wait, it&apos;s not live yet but soon</p>
      </section>

      {/* How it Works Section */}
      <section id="how" className="py-24 w-full px-8 max-w-6xl">
        <h2 className="text-4xl font-bold text-center mb-16">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <Link href="/signup" className="glass-card p-10 step-card border-purple-500/30 block group transition-all hover:border-purple-500/60">
            <div className="bg-purple-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-600/30 transition-colors">
              <Wallet className="text-purple-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Connect your  wallet to play</h3>
            <p className="text-gray-400 text-sm">Phantom, Solflare, Trust, etc.</p>
            <span className="step-number text-purple-500">1</span>
          </Link>

          {/* Step 2 */}
          <div className="glass-card p-10 step-card border-green-500/30">
            <div className="bg-green-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <Users className="text-green-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Find an opponent and stake $SOL</h3>
            <p className="text-gray-400 text-sm">Match by players ID, location, or find randomly.</p>
            <span className="step-number text-green-500">2</span>
          </div>

          {/* Step 3 */}
          <div className="glass-card p-10 step-card border-blue-500/30">
            <div className="bg-blue-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <Trophy className="text-blue-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Play, verify, and win instant payouts!</h3>
            <p className="text-gray-400 text-sm">Win rewards that are delivered instantly via  security.</p>
            <span className="step-number text-blue-500">3</span>
          </div>
        </div>
      </section>

      {/* Featured Matches Section */}
      <section id="featured" className="py-24 w-full px-8 max-w-7xl">
        <h2 className="text-4xl font-bold text-center mb-16">Featured Matches</h2>

        {loading ? (
          <div className="text-center text-gray-400">Loading matches...</div>
        ) : matches.length === 0 ? (
          <div className="text-center text-gray-400">No matches available yet.</div>
        ) : (
          <div className="mb-12 bg-[#121212] rounded-3xl p-8 border border-white/5">
            <div className="flex items-center gap-3 mb-8">
              <h3 className="text-xl font-semibold">{matches[0]?.game || 'Matches'}</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {matches.slice(0, 4).map((match, index) => (
                <Link href="/lounge" key={match._id || index} className="match-card block hover:border-[#B03EE1]/50 hover:shadow-[0_0_15px_rgba(176,62,225,0.1)] transition-all">
                  <div className="badge-live mb-4">Live Match</div>
                  <div className="flex justify-between items-center mb-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gray-800 rounded-full mx-auto mb-2 flex items-center justify-center group-hover:bg-gray-700 transition-colors">
                        <Users className="w-6 h-6 text-gray-500" />
                      </div>
                      <p className="text-[10px] text-gray-500">{match.players?.[0] || 'Player 1'}</p>
                      <p className="text-[8px] text-green-500">Active</p>
                    </div>
                    <span className="text-gray-600 text-xs">vs</span>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gray-800 rounded-full mx-auto mb-2 flex items-center justify-center group-hover:bg-gray-700 transition-colors">
                        <Users className="w-6 h-6 text-gray-500" />
                      </div>
                      <p className="text-[10px] text-gray-500">{match.players?.[1] || 'Player 2'}</p>
                      <p className="text-[8px] text-green-500">Active</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-4 px-4">
                    <span className="text-2xl font-bold">0</span>
                    <span className="text-2xl font-bold">0</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-gray-500 pt-2 border-t border-white/5">
                    <span>Wager</span>
                    <span className="text-white">{match.stake || '0 SOL'}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Progress Section */}
      <section className="w-[90%] max-w-4xl py-20 px-12 rounded-[40px] bg-gradient-to-br from-[#ff00ff] via-[#9d4edd] to-[#00d4ff] text-center mb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl hidden"></div>
        <h3 className="text-4xl font-bold mb-4">Master the Gambit</h3>
        <p className="text-white/80 mb-10">Stake, Play, Win on Game Gambit</p>

        <div className="max-w-2xl mx-auto">
          <div className="progress-container mb-4">
            <div className="progress-bar" style={{ width: '5%' }}></div>
          </div>
          <div className="flex justify-between text-xs text-white/70">
            <span>Community Goals</span>
            <span>Season 1</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-20 px-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-start gap-12 bg-[#050505]">
        <div className="flex flex-col gap-6">
          <p className="text-gray-400 text-sm">Game Gambit. All rights reserved.</p>
          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-widest text-gray-600 font-bold mb-2">Quick Links</p>
            <Link href="/" className="text-sm hover:text-purple-500 transition-colors">Home</Link>
            <Link href="#how" className="text-sm hover:text-purple-500 transition-colors">How it Works</Link>
            <Link href="#featured" className="text-sm hover:text-purple-500 transition-colors">Explore Matches</Link>
            <Link href="/signup" className="text-sm hover:text-purple-500 transition-colors">Connect Wallet</Link>
          </div>
          <div className="flex gap-6 mt-4">
            <MessageCircle className="footer-social-link" />
            <Youtube className="footer-social-link" />
            <Facebook className="footer-social-link" />
            <Twitter className="footer-social-link" />
          </div>
          <div className="flex gap-6 mt-8 text-xs text-gray-600">
            <Link href="#" className="hover:underline">Privacy Policy</Link>
            <Link href="#" className="hover:underline">Terms and conditions</Link>
          </div>
        </div>

        <div className="bg-[#121212] p-10 rounded-3xl border border-white/5 flex items-center justify-center w-full md:w-auto min-h-[250px]">
          {/* <Image src="/mascot.png" width={192} height={192} className="object-contain" alt="Mascot" /> */}
        </div>
      </footer>
    </main >
  );
}
