import { Card } from './ui/card';
import { Trophy, Medal, Award } from 'lucide-react';

interface LeaderboardEntry {
  name: string;
  accuracy: number;
  timestamp: number;
  level: 'easy' | 'medium' | 'hard';
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  level: 'easy' | 'medium' | 'hard';
  title: string;
}

export function Leaderboard({ entries, level, title }: LeaderboardProps) {
  // Filter entries by level and get top 5
  // Sort with 100% accuracy prioritized
  const topFive = entries
    .filter(entry => entry.level === level)
    .sort((a, b) => {
      const aPerfect = a.accuracy === 100;
      const bPerfect = b.accuracy === 100;
      
      // If both are perfect or both are not perfect, sort normally
      if (aPerfect === bPerfect) {
        // Sort by accuracy descending, then by timestamp
        if (b.accuracy !== a.accuracy) {
          return b.accuracy - a.accuracy;
        }
        // For 100% scores, latest timestamp comes first
        // For other scores, earliest timestamp comes first
        return aPerfect ? b.timestamp - a.timestamp : a.timestamp - b.timestamp;
      }
      
      // Perfect scores always come first
      return bPerfect ? 1 : -1;
    })
    .slice(0, 5);

  if (topFive.length === 0) {
    return (
      <div className="w-full mb-6 sm:mb-8">
        <h3 className="text-center mb-3 sm:mb-4 text-[#7dd3fc] flex items-center justify-center gap-2 text-base sm:text-lg">
          <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
          {title}
        </h3>
        <Card className="bg-white/[0.05] border-white/[0.1] p-3 sm:p-4">
          <div className="text-center text-[#94a3b8] text-sm">
            No scores yet. Be the first!
          </div>
        </Card>
      </div>
    );
  }

  const getMedalIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-[#fbbf24]" />;
      case 1:
        return <Medal className="w-4 h-4 sm:w-5 sm:h-5 text-[#94a3b8]" />;
      case 2:
        return <Medal className="w-4 h-4 sm:w-5 sm:h-5 text-[#fb923c]" />;
      default:
        return <Award className="w-4 h-4 sm:w-5 sm:h-5 text-[#60a5fa]" />;
    }
  };

  const getRankColor = (index: number) => {
    switch (index) {
      case 0:
        return 'text-[#fbbf24]';
      case 1:
        return 'text-[#94a3b8]';
      case 2:
        return 'text-[#fb923c]';
      default:
        return 'text-[#60a5fa]';
    }
  };

  return (
    <div className="w-full mb-6 sm:mb-8">
      <h3 className="text-center mb-3 sm:mb-4 text-[#7dd3fc] flex items-center justify-center gap-2 text-base sm:text-lg">
        <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
        {title}
      </h3>
      <Card className="bg-white/[0.05] border-white/[0.1] p-3 sm:p-4">
        <div className="space-y-2">
          {topFive.map((entry, index) => (
            <div
              key={`${entry.name}-${entry.timestamp}`}
              className="flex items-center justify-between p-2 sm:p-3 bg-white/[0.03] rounded-lg border border-white/[0.05] hover:bg-white/[0.05] transition-all"
            >
              <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                <div className="flex-shrink-0">
                  {getMedalIcon(index)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-sm sm:text-base ${getRankColor(index)} truncate`}>
                    {entry.name}
                  </div>
                  <div className="text-xs text-[#94a3b8]">
                    Rank #{index + 1}
                  </div>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-lg sm:text-xl text-[#7dd3fc]">
                  {entry.accuracy}%
                </div>
                <div className="text-xs text-[#94a3b8]">Accuracy</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}