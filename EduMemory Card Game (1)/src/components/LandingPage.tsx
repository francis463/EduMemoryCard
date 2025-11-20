import { Button } from './ui/button';
import { Card } from './ui/card';
import { Leaderboard } from './Leaderboard';
import { Brain, Trophy, Target, Zap, User } from 'lucide-react';

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
}

export function LandingPage({ onStartGame, stats, playerName, globalLeaderboards, isLoadingLeaderboards }: LandingPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#071028] to-[#08122a] text-[#e6eef8] p-3 sm:p-5">
      <div className="w-[1000px] max-w-[96%] flex flex-col items-center">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12 space-y-3 sm:space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6">
            <Brain className="w-12 h-12 sm:w-16 sm:h-16 text-[#7dd3fc]" />
          </div>
          <h1 className="text-3xl sm:text-5xl mb-3 sm:mb-4 bg-gradient-to-r from-[#7dd3fc] to-[#60a5fa] bg-clip-text text-transparent">
            EduMemory Card Game
          </h1>
          {playerName && (
            <div className="flex items-center justify-center gap-2 text-base sm:text-lg text-[#94a3b8]">
              <User className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Welcome back, <span className="text-[#7dd3fc]">{playerName}</span>!</span>
            </div>
          )}
          <p className="text-base sm:text-xl text-[#94a3b8] max-w-2xl mx-auto px-4">
            Test your memory while learning about programming languages and computer components. 
            Match pairs, improve your accuracy, and expand your tech knowledge!
          </p>
        </div>

        {/* Global Leaderboards */}
        <div className="w-full max-w-5xl mb-8 sm:mb-12">
          <h2 className="text-center mb-6 sm:mb-8 text-xl sm:text-2xl text-[#7dd3fc]">
            🏆 Global Leaderboards
          </h2>
          {isLoadingLeaderboards ? (
            <div className="text-center text-[#94a3b8]">Loading leaderboards...</div>
          ) : (
            <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
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

        {/* Level Selection */}
        <div className="bg-white/[0.03] rounded-xl p-5 sm:p-8 shadow-[0_10px_30px_rgba(2,6,23,0.6)] w-full max-w-3xl">
          <h2 className="text-center mb-4 sm:mb-6 text-[#7dd3fc]">Choose Your Difficulty</h2>
          
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            {/* Easy */}
            <button
              onClick={() => onStartGame('easy')}
              className="flex items-center gap-3 bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.1] hover:border-[#34d399]/50 rounded-lg px-5 sm:px-6 py-2.5 sm:py-3 transition-all cursor-pointer group w-full sm:w-auto"
            >
              <span className="text-xl sm:text-2xl">🟢</span>
              <div className="text-left">
                <div className="text-[#34d399] text-sm sm:text-base">Easy</div>
                <div className="text-xs text-[#94a3b8]">4 pairs</div>
              </div>
            </button>

            {/* Medium */}
            <button
              onClick={() => onStartGame('medium')}
              className="flex items-center gap-3 bg-white/[0.05] hover:bg-white/[0.08] border border-[#7dd3fc]/30 hover:border-[#7dd3fc]/60 rounded-lg px-5 sm:px-6 py-2.5 sm:py-3 transition-all cursor-pointer group w-full sm:w-auto"
            >
              <span className="text-xl sm:text-2xl">🟡</span>
              <div className="text-left">
                <div className="text-[#fbbf24] text-sm sm:text-base">Medium</div>
                <div className="text-xs text-[#94a3b8]">6 pairs · Recommended</div>
              </div>
            </button>

            {/* Hard */}
            <button
              onClick={() => onStartGame('hard')}
              className="flex items-center gap-3 bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.1] hover:border-[#ef4444]/50 rounded-lg px-5 sm:px-6 py-2.5 sm:py-3 transition-all cursor-pointer group w-full sm:w-auto"
            >
              <span className="text-xl sm:text-2xl">🔴</span>
              <div className="text-left">
                <div className="text-[#ef4444] text-sm sm:text-base">Hard</div>
                <div className="text-xs text-[#94a3b8]">8 pairs</div>
              </div>
            </button>
          </div>

          {/* Features */}
          <div className="pt-6 sm:pt-8 border-t border-white/[0.1]">
            <h3 className="text-center mb-4 sm:mb-6 text-[#94a3b8]">Game Features</h3>
            <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 text-center">
              <div>
                <div className="text-2xl mb-2">🧠</div>
                <div className="text-xs sm:text-sm text-[#94a3b8]">Educational content about programming and computer hardware!</div>
              </div>
              <div>
                <div className="text-2xl mb-2">💡</div>
                <div className="text-xs sm:text-sm text-[#94a3b8]">2 hints per game to help you</div>
              </div>
              <div>
                <div className="text-2xl mb-2">📊</div>
                <div className="text-xs sm:text-sm text-[#94a3b8]">Track your accuracy and progress</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-[#94a3b8] px-4">
          <p>Match pairs to learn about Python, JavaScript, Java, HTML, CSS, and computer hardware!</p>
        </div>
      </div>
    </div>
  );
}