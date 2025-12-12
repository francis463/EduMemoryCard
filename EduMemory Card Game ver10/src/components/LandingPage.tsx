import { Button } from './ui/button';
import { Card } from './ui/card';
import { Leaderboard } from './Leaderboard';
import { Brain, Trophy, Target, Zap, User, Menu, X, LogOut } from 'lucide-react';
import { useState } from 'react';

interface LeaderboardEntry {
  name: string;
  accuracy: number;
  timestamp: number;
  level: 'easy' | 'medium' | 'hard';
}

interface GameStats {
  gamesPlayed: number;
  bestAccuracy: number;
  totalMatches: number;
  averageAccuracy: number;
  leaderboard: LeaderboardEntry[];
}

interface GlobalLeaderboards {
  easy: LeaderboardEntry[];
  medium: LeaderboardEntry[];
  hard: LeaderboardEntry[];
}

interface LandingPageProps {
  onStartGame: (level: 'easy' | 'medium' | 'hard') => void;
  stats: GameStats;
  playerName: string;
  globalLeaderboards: GlobalLeaderboards;
  isLoadingLeaderboards: boolean;
  onExit?: () => void;
}

export function LandingPage({ onStartGame, stats, playerName, globalLeaderboards, isLoadingLeaderboards, onExit }: LandingPageProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#071028] to-[#08122a] text-[#e6eef8] flex">
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Fixed Sidebar - Level Selection */}
      <aside className={`fixed left-0 top-0 h-screen w-[280px] bg-white/[0.05] backdrop-blur-sm border-r border-white/[0.1] shadow-[0_10px_30px_rgba(2,6,23,0.6)] overflow-y-auto z-50 transition-transform duration-300 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6">
          {/* Sidebar Header with Close Button */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-[#7dd3fc]" />
              <h1 className="text-lg bg-gradient-to-r from-[#7dd3fc] to-[#60a5fa] bg-clip-text text-transparent">
                EduMemory
              </h1>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-2 hover:bg-white/[0.1] rounded-lg transition-colors"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5 text-[#94a3b8]" />
            </button>
          </div>

          {/* Player Welcome */}
          {playerName && (
            <div className="mb-8 pb-6 border-b border-white/[0.1]">
              <div className="flex items-center gap-2 text-sm text-[#94a3b8] mb-1">
                <User className="w-4 h-4" />
                <span>Player</span>
              </div>
              <div className="text-[#7dd3fc] truncate text-[24px]">{playerName}</div>
            </div>
          )}

          {/* Difficulty Selection */}
          <h2 className="text-sm uppercase tracking-wider text-[#94a3b8] mb-4">Select Difficulty</h2>
          
          <div className="flex flex-col gap-3 mb-8">
            {/* Easy */}
            <button
              onClick={() => onStartGame('easy')}
              className="flex items-center gap-3 bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-[#34d399]/50 rounded-lg px-4 py-3 transition-all cursor-pointer group w-full"
            >
              <span className="text-2xl">🟢</span>
              <div className="text-left flex-1">
                <div className="text-[#34d399] text-sm">Easy</div>
                <div className="text-xs text-[#94a3b8]">4 pairs</div>
              </div>
            </button>

            {/* Medium */}
            <button
              onClick={() => onStartGame('medium')}
              className="flex items-center gap-3 bg-white/[0.03] hover:bg-white/[0.08] border border-[#7dd3fc]/30 hover:border-[#7dd3fc]/60 rounded-lg px-4 py-3 transition-all cursor-pointer group w-full"
            >
              <span className="text-2xl">🟡</span>
              <div className="text-left flex-1">
                <div className="text-[#fbbf24] text-sm">Medium</div>
                <div className="text-xs text-[#94a3b8]">6 pairs · Recommended</div>
              </div>
            </button>

            {/* Hard */}
            <button
              onClick={() => onStartGame('hard')}
              className="flex items-center gap-3 bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-[#ef4444]/50 rounded-lg px-4 py-3 transition-all cursor-pointer group w-full"
            >
              <span className="text-2xl">🔴</span>
              <div className="text-left flex-1">
                <div className="text-[#ef4444] text-sm">Hard</div>
                <div className="text-xs text-[#94a3b8]">8 pairs</div>
              </div>
            </button>
          </div>

          {/* Features */}
          <div className="pt-6 border-t border-white/[0.1]">
            <h3 className="text-sm uppercase tracking-wider text-[#94a3b8] mb-4">Features</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <div className="text-xl">🧠</div>
                <div className="text-xs text-[#94a3b8]">Educational content about programming</div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-xl">💡</div>
                <div className="text-xs text-[#94a3b8]">2 hints per game to help you</div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-xl">📊</div>
                <div className="text-xs text-[#94a3b8]">Track your accuracy and progress</div>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={onExit}
            className="mt-6 flex items-center gap-3 bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-[#ef4444]/50 rounded-lg px-4 py-3 transition-all cursor-pointer group w-full"
          >
            <LogOut className="w-5 h-5 text-[#ef4444]" />
            <div className="text-left flex-1">
              <div className="text-[#ef4444] text-sm">Logout</div>
            </div>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={`flex-1 p-6 sm:p-8 transition-all duration-300 ${
        isSidebarOpen ? 'lg:ml-[280px]' : 'ml-0'
      }`}>
        {/* Hamburger Menu Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed top-6 left-6 z-30 p-3 bg-white/[0.05] hover:bg-white/[0.1] backdrop-blur-sm border border-white/[0.1] rounded-lg transition-all shadow-lg"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-6 h-6 text-[#7dd3fc]" />
        </button>

        <div className="max-w-[1200px] mx-auto">
          {/* Hero Section */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl sm:text-4xl bg-gradient-to-r from-[#7dd3fc] to-[#60a5fa] bg-clip-text text-transparent mb-2">
              Welcome to EduMemory!
            </h1>
            <p className="text-[#94a3b8]">Match pairs to learn about Python, JavaScript, Java, HTML, CSS, and computer hardware!</p>
          </div>

          {/* Global Leaderboards */}
          <div className="bg-white/[0.03] rounded-xl p-6 sm:p-8 shadow-[0_10px_30px_rgba(2,6,23,0.6)]">
            <h2 className="text-center mb-6 sm:mb-8 text-xl sm:text-2xl text-[#7dd3fc]">
              🏆 Global Leaderboards
            </h2>
            {isLoadingLeaderboards ? (
              <div className="text-center text-[#94a3b8]">Loading leaderboards...</div>
            ) : (
              <div className="flex flex-col gap-4 sm:gap-6">
                <Leaderboard 
                  entries={globalLeaderboards.easy} 
                  level="easy" 
                  title="🟢 Easy" 
                />
                <Leaderboard 
                  entries={globalLeaderboards.medium} 
                  level="medium" 
                  title="🟡 Medium" 
                />
                <Leaderboard 
                  entries={globalLeaderboards.hard} 
                  level="hard" 
                  title="🔴 Hard" 
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}