import { useState, useEffect } from 'react';
import { GameCard } from './components/GameCard';
import { HomePage } from './components/HomePage';
import { LandingPage } from './components/LandingPage';
import { NameInputDialog } from './components/NameInputDialog';
import { BackgroundMusic } from './components/BackgroundMusic';
import { Button } from './components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './components/ui/alert-dialog';
import { Home, Menu, X } from 'lucide-react';
import { leaderboardService } from './services/leaderboardService';
import { playFlipSound, initSound } from './utils/sounds';

interface Card {
  id: string;
  icon: string;
  title: string;
  desc: string;
}

interface FlippedCard {
  index: number;
  card: Card;
}

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
  accuracyHistory: number[];
  leaderboard: LeaderboardEntry[];
}

interface PlayerStatsMap {
  [playerName: string]: GameStats;
}

interface GlobalLeaderboards {
  easy: LeaderboardEntry[];
  medium: LeaderboardEntry[];
  hard: LeaderboardEntry[];
}

const CARD_LIBRARY: Card[] = [
  { id: 'python', icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968350.png', title: 'Python', desc: 'A versatile high-level language used in web, data, and AI.' },
  { id: 'javascript', icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968292.png', title: 'JavaScript', desc: 'The web\'s interactive scripting language.' },
  { id: 'java', icon: 'https://cdn-icons-png.flaticon.com/512/226/226777.png', title: 'Java', desc: 'A robust, portable, object-oriented programming language.' },
  { id: 'html', icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968267.png', title: 'HTML', desc: 'The structure of web pages.' },
  { id: 'css', icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968242.png', title: 'CSS', desc: 'The design language for styling web pages.' },
  { id: 'cpu', icon: 'https://cdn-icons-png.flaticon.com/128/984/984442.png', title: 'CPU', desc: 'The computer\'s central processing brain.' },
  { id: 'ram', icon: 'https://cdn-icons-png.flaticon.com/128/543/543279.png', title: 'RAM', desc: 'Fast, temporary memory for running programs.' },
  { id: 'ssd', icon: 'https://cdn-icons-png.flaticon.com/128/4854/4854407.png', title: 'SSD', desc: 'High-speed solid-state storage device.' }
];

const LEVELS = { easy: 4, medium: 6, hard: 8 };

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function App() {
  const [showHomePage, setShowHomePage] = useState(true);
  const [showNameInput, setShowNameInput] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [level, setLevel] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [deck, setDeck] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedIndices, setMatchedIndices] = useState<number[]>([]);
  const [flipped, setFlipped] = useState<FlippedCard[]>([]);
  const [matches, setMatches] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [hintsLeft, setHintsLeft] = useState(2);
  const [matchedCard, setMatchedCard] = useState<Card | null>(null);
  const [showHelp, setShowHelp] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);
  const [showingHint, setShowingHint] = useState(false);
  const [stats, setStats] = useState<GameStats>({
    gamesPlayed: 0,
    bestAccuracy: 0,
    totalMatches: 0,
    averageAccuracy: 0,
    accuracyHistory: [],
    leaderboard: []
  });
  const [globalLeaderboards, setGlobalLeaderboards] = useState<GlobalLeaderboards>({
    easy: [],
    medium: [],
    hard: []
  });
  const [isLoadingLeaderboards, setIsLoadingLeaderboards] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Set favicon and page title
  useEffect(() => {
    // Update page title
    document.title = 'EduMemory - Card Game';

    // Create and set favicon
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#7dd3fc;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#60a5fa;stop-opacity:1" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="45" fill="url(#grad)" />
        <text x="50" y="65" font-size="50" text-anchor="middle" fill="white"></text>
      </svg>
    `;
    
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    
    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = url;

    return () => {
      URL.revokeObjectURL(url);
    };
  }, []);

  const accuracy = attempts > 0 ? Math.round((matches / attempts) * 100) : 0;

  // Load stats and player name from localStorage and fetch global leaderboards
  useEffect(() => {
    // Remove player name from localStorage on page load/refresh
    // This ensures user must enter name again after refresh
    localStorage.removeItem('eduMemoryPlayerName');

    // Fetch global leaderboards
    loadGlobalLeaderboards();
  }, []);

  // Load player-specific stats when playerName changes
  useEffect(() => {
    if (playerName) {
      loadPlayerStats(playerName);
    }
  }, [playerName]);

  // Load player-specific stats from localStorage
  const loadPlayerStats = (name: string) => {
    try {
      const allPlayersStats = localStorage.getItem('eduMemoryPlayerStats');
      if (allPlayersStats) {
        const parsedAllStats: PlayerStatsMap = JSON.parse(allPlayersStats);
        
        if (parsedAllStats[name]) {
          // Load existing player stats
          const playerStats = parsedAllStats[name];
          
          // Ensure leaderboard exists for backward compatibility
          if (!playerStats.leaderboard) {
            playerStats.leaderboard = [];
          }
          
          console.log(`Loaded stats for player "${name}":`, playerStats);
          setStats(playerStats);
        } else {
          // New player - start with fresh stats
          console.log(`New player "${name}" - starting with fresh stats`);
          setStats({
            gamesPlayed: 0,
            bestAccuracy: 0,
            totalMatches: 0,
            averageAccuracy: 0,
            accuracyHistory: [],
            leaderboard: []
          });
        }
      } else {
        // No stats exist yet - start fresh
        console.log('No player stats found - starting fresh');
        setStats({
          gamesPlayed: 0,
          bestAccuracy: 0,
          totalMatches: 0,
          averageAccuracy: 0,
          accuracyHistory: [],
          leaderboard: []
        });
      }
    } catch (error) {
      console.error('Error loading player stats:', error);
      // Start with fresh stats on error
      setStats({
        gamesPlayed: 0,
        bestAccuracy: 0,
        totalMatches: 0,
        averageAccuracy: 0,
        accuracyHistory: [],
        leaderboard: []
      });
    }
  };

  // Load global leaderboards from Supabase
  const loadGlobalLeaderboards = async () => {
    setIsLoadingLeaderboards(true);
    try {
      const leaderboards = await leaderboardService.getAllLeaderboards();
      setGlobalLeaderboards(leaderboards);
      console.log('Loaded global leaderboards:', leaderboards);
    } catch (error) {
      console.log('Note: Global leaderboards are currently unavailable. The game will still work with local stats.');
      // Set empty leaderboards on error
      setGlobalLeaderboards({
        easy: [],
        medium: [],
        hard: []
      });
    } finally {
      setIsLoadingLeaderboards(false);
    }
  };

  // Save stats to localStorage and Supabase
  const updateStats = async (gameAccuracy: number) => {
    // Add to leaderboard with difficulty level
    const newLeaderboardEntry: LeaderboardEntry = {
      name: playerName || 'Anonymous',
      accuracy: gameAccuracy,
      timestamp: Date.now(),
      level: level
    };
    
    const newStats: GameStats = {
      gamesPlayed: stats.gamesPlayed + 1,
      bestAccuracy: Math.max(stats.bestAccuracy, gameAccuracy),
      totalMatches: stats.totalMatches + matches,
      averageAccuracy: 0,
      accuracyHistory: [...stats.accuracyHistory, gameAccuracy],
      leaderboard: [...stats.leaderboard, newLeaderboardEntry]
    };
    
    // Calculate average accuracy
    const sum = newStats.accuracyHistory.reduce((a, b) => a + b, 0);
    newStats.averageAccuracy = Math.round(sum / newStats.accuracyHistory.length);
    
    console.log('Saving stats to localStorage:', newStats);
    setStats(newStats);
    const allPlayersStats = localStorage.getItem('eduMemoryPlayerStats');
    if (allPlayersStats) {
      const parsedAllStats: PlayerStatsMap = JSON.parse(allPlayersStats);
      parsedAllStats[playerName] = newStats;
      localStorage.setItem('eduMemoryPlayerStats', JSON.stringify(parsedAllStats));
    } else {
      const newPlayerStats: PlayerStatsMap = {
        [playerName]: newStats
      };
      localStorage.setItem('eduMemoryPlayerStats', JSON.stringify(newPlayerStats));
    }

    // Save to Supabase global leaderboard
    try {
      console.log('Submitting score to global leaderboard:', { 
        name: playerName || 'Anonymous', 
        accuracy: gameAccuracy, 
        level 
      });
      await leaderboardService.addScore(
        playerName || 'Anonymous',
        gameAccuracy,
        level
      );
      // Reload global leaderboards after submitting score
      await loadGlobalLeaderboards();
    } catch (error) {
      console.error('Failed to submit score to global leaderboard:', error);
      // Continue even if Supabase submission fails
    }
  };

  const startGame = (selectedLevel?: 'easy' | 'medium' | 'hard') => {
    if (selectedLevel) {
      setLevel(selectedLevel);
    }
    setGameStarted(true);
    setMatches(0);
    setAttempts(0);
    setHintsLeft(2);
    setFlipped([]);
    setFlippedIndices([]);
    setMatchedIndices([]);
    setMatchedCard(null);
    setShowGameOver(false);

    const pairs = LEVELS[selectedLevel || level];
    const chosen = CARD_LIBRARY.slice(0, pairs);
    const shuffled = shuffle([...chosen, ...chosen]);
    setDeck(shuffled);
  };

  const returnToHome = () => {
    setGameStarted(false);
    setShowHomePage(false); // Go to difficulty selection, not home page
  };

  const enterGame = () => {
    setShowHomePage(false);
    // Show name input if player hasn't entered name yet
    if (!playerName) {
      setShowNameInput(true);
    }
  };

  const handleNameSubmit = (name: string) => {
    setPlayerName(name);
    localStorage.setItem('eduMemoryPlayerName', name);
    setShowNameInput(false);
  };

  const handleNameCancel = () => {
    setShowNameInput(false);
    setShowHomePage(true);
  };

  const flipCard = (index: number, card: Card) => {
    if (flippedIndices.includes(index) || matchedIndices.includes(index) || flipped.length === 2 || showingHint) {
      return;
    }

    // Play flip sound
    playFlipSound();

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    const newFlipped = [...flipped, { index, card }];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newFlipped[0].card.id === newFlipped[1].card.id) {
        const newMatches = matches + 1;
        setMatches(newMatches);
        setMatchedIndices([...matchedIndices, newFlipped[0].index, newFlipped[1].index]);
        setMatchedCard(newFlipped[0].card);
        setFlipped([]);
        setFlippedIndices([...matchedIndices, newFlipped[0].index, newFlipped[1].index]);

        if (newMatches === deck.length / 2) {
          setTimeout(() => {
            setShowGameOver(true);
            updateStats(Math.round((newMatches / newAttempts) * 100));
          }, 500);
        }
      } else {
        setTimeout(() => {
          setFlippedIndices(matchedIndices);
          setFlipped([]);
        }, 800);
      }
    }
  };

  const useHint = () => {
    if (hintsLeft <= 0 || showingHint) return;

    setHintsLeft(hintsLeft - 1);
    setShowingHint(true);
    const allIndices = deck.map((_, i) => i);
    setFlippedIndices(allIndices);

    setTimeout(() => {
      setFlippedIndices(matchedIndices);
      setShowingHint(false);
    }, 1500);
  };

  // Responsive grid layout based on level
  const getGridCols = () => {
    switch (level) {
      case 'easy':
        return 'grid-cols-4 sm:grid-cols-4'; // 8 cards: 4x2
      case 'medium':
        return 'grid-cols-3 sm:grid-cols-4'; // 12 cards: 3x4 mobile, 4x3 desktop
      case 'hard':
        return 'grid-cols-4 sm:grid-cols-4'; // 16 cards: 4x4
      default:
        return 'grid-cols-4';
    }
  };

  // Show home page first
  if (showHomePage) {
    return (
      <>
        <BackgroundMusic />
        <HomePage onEnter={enterGame} />
      </>
    );
  }

  // Show difficulty selection and stats
  if (!gameStarted) {
    return (
      <>
        <BackgroundMusic />
        <NameInputDialog open={showNameInput} onSubmit={handleNameSubmit} onCancel={handleNameCancel} />
        <LandingPage 
          onStartGame={startGame} 
          stats={stats} 
          playerName={playerName} 
          globalLeaderboards={globalLeaderboards}
          isLoadingLeaderboards={isLoadingLeaderboards}
          onExit={() => {
            setPlayerName('');
            setShowHomePage(true);
          }}
        />
      </>
    );
  }

  return (
    <>
      <BackgroundMusic />
      <div className="min-h-screen bg-gradient-to-b from-[#071028] to-[#08122a] text-[#e6eef8] flex">
        {/* Mobile Hamburger Button */}
        <Button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          variant="outline"
          size="icon"
          className="fixed top-4 left-4 z-50 lg:hidden bg-white/[0.05] border-white/[0.06] hover:bg-white/[0.10] backdrop-blur-sm"
        >
          {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>

        {/* Backdrop for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
            fixed lg:sticky top-0 h-screen w-[280px] bg-white/[0.03] backdrop-blur-md border-r border-white/[0.06]
            flex flex-col p-6 overflow-y-auto z-40
            transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          {/* Title */}
          <div className="mb-6">
            <h1 className="m-0 text-xl">EduMemory</h1>
            <p className="text-xs text-[#94a3b8] mt-1">Card Game</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-3">
            <Button
              onClick={returnToHome}
              variant="outline"
              className="w-full justify-start gap-2 bg-transparent border-white/[0.06] hover:bg-white/[0.05] text-[#e6eef8] text-[15px]"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Button>

            <div className="pt-4 pb-2 border-t border-white/[0.06]">
              <label className="text-xs text-[#94a3b8] uppercase tracking-wider">Difficulty</label>
            </div>

            <Select value={level} onValueChange={(value: any) => setLevel(value)}>
              <SelectTrigger className={`w-full border-white/[0.06] ${
                level === 'easy' ? 'bg-[#22c55e]/10 text-[#22c55e] border-[#22c55e]/20' :
                level === 'medium' ? 'bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/20' :
                'bg-[#ef4444]/10 text-[#ef4444] border-[#ef4444]/20'
              }`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy" className="text-[#22c55e] focus:text-[#22c55e] focus:bg-[#22c55e]/10">Easy (4 pairs)</SelectItem>
                <SelectItem value="medium" className="text-[#f59e0b] focus:text-[#f59e0b] focus:bg-[#f59e0b]/10">Medium (6 pairs)</SelectItem>
                <SelectItem value="hard" className="text-[#ef4444] focus:text-[#ef4444] focus:bg-[#ef4444]/10">Hard (8 pairs)</SelectItem>
              </SelectContent>
            </Select>

            <Button
              onClick={() => startGame()}
              variant="outline"
              className="w-full bg-[#7dd3fc]/10 border-[#7dd3fc]/20 hover:bg-[#7dd3fc]/20 text-[#7dd3fc]"
            >
              Start Game
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center p-4 lg:p-8">
          <div className="w-full max-w-4xl">
            {/* Actions */}
            <div className="flex justify-center gap-3 mb-4 flex-wrap">
              <Button
                onClick={useHint}
                variant="outline"
                disabled={hintsLeft <= 0 || showingHint}
                className="bg-transparent border-white/[0.06] hover:bg-white/[0.05] text-[#e6eef8] disabled:opacity-50"
              >
                Hint ({hintsLeft})
              </Button>
              <Button
                onClick={() => setShowHelp(true)}
                variant="outline"
                className="bg-transparent border-white/[0.06] hover:bg-white/[0.05] text-[#e6eef8]"
              >
                Help
              </Button>
            </div>

            {/* Current Game Stats */}
            <div className="flex justify-center gap-4 mb-6 flex-wrap text-sm">
              <div className="text-[#94a3b8]">
                Attempts: <span className="text-[#7dd3fc]">{attempts}</span>
              </div>
              <div className="text-[#94a3b8]">
                Matches: <span className="text-[#7dd3fc]">{matches}</span>
              </div>
              <div className="text-[#94a3b8]">
                Accuracy: <span className="text-[#7dd3fc]">{accuracy}%</span>
              </div>
              <div className="text-[#94a3b8]">
                Best: <span className="text-[#fbbf24]">{stats.bestAccuracy}%</span>
              </div>
            </div>

            {/* Board */}
            <section className={`grid ${getGridCols()} gap-2 sm:gap-3 justify-center items-center`}>
              {deck.map((card, index) => (
                <GameCard
                  key={index}
                  id={card.id}
                  icon={card.icon}
                  title={card.title}
                  isFlipped={flippedIndices.includes(index)}
                  isMatched={matchedIndices.includes(index)}
                  onClick={() => flipCard(index, card)}
                />
              ))}
            </section>
          </div>
        </main>

        {/* Match Description Dialog */}
        <Dialog open={!!matchedCard} onOpenChange={(open) => !open && setMatchedCard(null)}>
          <DialogContent 
            className="bg-[#0b1626] border-white/[0.06] text-[#e6eef8]"
            onPointerDownOutside={(e) => e.preventDefault()}
            onInteractOutside={(e) => e.preventDefault()}
          >
            <DialogHeader>
              <div className="flex justify-center mb-2">
                {matchedCard && <img src={matchedCard.icon} alt={matchedCard.title} className="w-16 h-16" />}
              </div>
              <DialogTitle className="text-center">{matchedCard?.title}</DialogTitle>
              <DialogDescription className="text-center text-[#94a3b8]">
                {matchedCard?.desc}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="justify-center">
              <Button
                onClick={() => setMatchedCard(null)}
                variant="outline"
                className="bg-transparent border-white/[0.06] hover:bg-white/[0.05] text-[#e6eef8]"
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Help Dialog */}
        <AlertDialog open={showHelp} onOpenChange={setShowHelp}>
          <AlertDialogContent className="bg-[#0b1626] border-white/[0.06] text-[#e6eef8]">
            <AlertDialogHeader>
              <AlertDialogTitle>🧠 HOW TO PLAY</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription asChild>
              <div className="text-[#94a3b8] space-y-2 text-sm">
                <div>1️⃣ Click cards to flip them.</div>
                <div>2️⃣ Match pairs of programming icons.</div>
                <div>3️⃣ When you match, read the info then double-click to continue.</div>
                <div>4️⃣ You have 2 hints that briefly show all cards.</div>
                <div>5️⃣ Your accuracy is shown at the end of the game!</div>
              </div>
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogAction className="bg-[#7dd3fc] text-[#07122a] hover:bg-[#7dd3fc]/90">
                Got it!
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Game Over Dialog */}
        <AlertDialog open={showGameOver} onOpenChange={setShowGameOver}>
          <AlertDialogContent className="bg-[#0b1626] border-white/[0.06] text-[#e6eef8]">
            <AlertDialogHeader>
              <AlertDialogTitle>🎉 Game Over!</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription asChild>
              <div className="text-[#94a3b8] space-y-2 text-sm">
                <div>Congratulations! You completed the game with an accuracy of <span className="text-[#7dd3fc]">{accuracy}%</span>.</div>
                {accuracy === stats.bestAccuracy && accuracy > 0 && (
                  <div className="text-[#fbbf24]">🏆 New personal best!</div>
                )}
                <div className="pt-2 space-y-1">
                  <div>Your Stats:</div>
                  <div>Games Played: {stats.gamesPlayed}</div>
                  <div>Average Accuracy: {stats.averageAccuracy}%</div>
                </div>
              </div>
            </AlertDialogDescription>
            <AlertDialogFooter className="gap-2">
              <Button
                onClick={() => {
                  setShowGameOver(false);
                  returnToHome();
                }}
                variant="outline"
                className="bg-transparent border-white/[0.06] hover:bg-white/[0.05] text-[rgba(42,199,204,0.9)]"
              >
                Back to Home
              </Button>
              <AlertDialogAction 
                onClick={() => {
                  setShowGameOver(false);
                  startGame();
                }}
                className="bg-[#7dd3fc] text-[#07122a] hover:bg-[#7dd3fc]/90"
              >
                Play Again
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
}