interface GameCardProps {
  id: string;
  icon: string;
  title: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

export function GameCard({ id, icon, title, isFlipped, isMatched, onClick }: GameCardProps) {
  return (
    <div
      className={`relative w-20 h-24 sm:w-[110px] sm:h-[140px] cursor-pointer transition-transform duration-[450ms] ${
        isFlipped || isMatched ? '[transform:rotateY(180deg)]' : ''
      } [transform-style:preserve-3d]`}
      onClick={onClick}
      style={{ perspective: '1000px' }}
    >
      <div className="relative w-full h-full [transform-style:preserve-3d]">
        {/* Back */}
        <div className="absolute inset-0 rounded-xl flex items-center justify-center [backface-visibility:hidden] bg-gradient-to-b from-[#0f1724] to-[#07122a] text-[#94a3b8] shadow-[0_6px_14px_rgba(2,6,23,0.6)]">
          <span className="text-2xl sm:text-[32px]">?</span>
        </div>
        
        {/* Front */}
        <div className="absolute inset-0 rounded-xl flex flex-col items-center justify-center gap-1 sm:gap-1.5 text-center p-2 sm:p-2.5 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-b from-[#e6eef8] to-[#cfe8ff] text-[#07122a] shadow-[0_6px_14px_rgba(2,6,23,0.6)]">
          <img src={icon} alt={title} className="w-10 h-10 sm:w-[60px] sm:h-[60px]" />
          <div className="text-xs sm:text-sm">{title}</div>
        </div>
      </div>
    </div>
  );
}