import { Button } from './ui/button';
import { Brain, Sparkles, Trophy, Zap } from 'lucide-react';

interface HomePageProps {
  onEnter: () => void;
}

export function HomePage({ onEnter }: HomePageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#071028] to-[#08122a] text-[#e6eef8] p-4 sm:p-8">
      <div className="w-full max-w-5xl flex flex-col items-center text-center">
        {/* Hero Section */}
        <div className="mb-12 sm:mb-16 space-y-6 sm:space-y-8">
          {/* Icon */}
          <div className="flex justify-center mb-6 sm:mb-8 animate-bounce">
            <div className="relative">
              <Brain className="w-20 h-20 sm:w-28 sm:h-28 text-[#7dd3fc] drop-shadow-[0_0_20px_rgba(125,211,252,0.5)]" />
              <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-[#fbbf24] absolute -top-2 -right-2 animate-pulse" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl mb-4 sm:mb-6 bg-gradient-to-r from-[#7dd3fc] via-[#60a5fa] to-[#a78bfa] bg-clip-text text-transparent leading-tight px-4">
            EduMemory Card Game
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-2xl md:text-3xl text-[#94a3b8] max-w-3xl mx-auto leading-relaxed px-4">
            Test your memory while learning about programming languages and computer components
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 w-full max-w-4xl px-4">
          <div className="bg-white/[0.05] backdrop-blur-sm border border-white/[0.1] rounded-2xl p-6 sm:p-8 hover:bg-white/[0.08] transition-all">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#7dd3fc] to-[#60a5fa] rounded-xl flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 sm:w-9 sm:h-9 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl text-[#e6eef8] mb-2">Learn & Play</h3>
            <p className="text-sm sm:text-base text-[#94a3b8]">
              Discover programming language and computer hardware through engaging gameplay
            </p>
          </div>

          <div className="bg-white/[0.05] backdrop-blur-sm border border-white/[0.1] rounded-2xl p-6 sm:p-8 hover:bg-white/[0.08] transition-all">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#fbbf24] to-[#f59e0b] rounded-xl flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 sm:w-9 sm:h-9 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl text-[#e6eef8] mb-2">Track Progress</h3>
            <p className="text-sm sm:text-base text-[#94a3b8]">
              Monitor your accuracy and beat your personal best
            </p>
          </div>

          <div className="bg-white/[0.05] backdrop-blur-sm border border-white/[0.1] rounded-2xl p-6 sm:p-8 hover:bg-white/[0.08] transition-all">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#a78bfa] to-[#8b5cf6] rounded-xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 sm:w-9 sm:h-9 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl text-[#e6eef8] mb-2">3 Difficulty Levels</h3>
            <p className="text-sm sm:text-base text-[#94a3b8]">
              From easy 4 pairs, medium 6 pairs to challenging 8 pairs
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="space-y-4">
          <Button
            onClick={onEnter}
            size="lg"
            className="bg-gradient-to-r from-[#7dd3fc] to-[#60a5fa] hover:from-[#60a5fa] hover:to-[#7dd3fc] text-[#07122a] px-12 sm:px-16 py-6 sm:py-8 text-lg sm:text-2xl rounded-2xl shadow-[0_0_30px_rgba(125,211,252,0.4)] hover:shadow-[0_0_40px_rgba(125,211,252,0.6)] transition-all transform hover:scale-105"
          >
            Play Now
          </Button>
          <p className="text-xs sm:text-sm text-[#94a3b8]">
            No signup required • Play instantly
          </p>
        </div>

        {/* Footer */}
        <div className="mt-16 sm:mt-20 text-xs sm:text-sm text-[#94a3b8]/70 px-4">
          <p>Learn Python • JavaScript • Java • HTML • CSS • CPU • RAM • SSD ETC.</p>
        </div>
      </div>
    </div>
  );
}
