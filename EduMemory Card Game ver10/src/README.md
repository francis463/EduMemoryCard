# 🧠 EduMemory Card Game

An educational memory card game that teaches programming concepts through engaging card matching gameplay. Built with React, TypeScript, Tailwind CSS, and Supabase.

![EduMemory Game](https://img.shields.io/badge/React-18.x-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?logo=tailwindcss)
![Supabase](https://img.shields.io/badge/Supabase-Enabled-3ecf8e?logo=supabase)

## ✨ Features

### 🎮 Game Mechanics
- **Three Difficulty Levels**
  - Easy: 4 pairs (8 cards)
  - Medium: 6 pairs (12 cards)
  - Hard: 8 pairs (16 cards)
- **Card Matching System**: Flip cards to find matching pairs
- **Educational Popups**: Learn about each technology when you match pairs
- **Hint System**: 2 hints per game to reveal all cards briefly
- **Card Flip Animations**: Smooth 3D flip effects

### 🏆 Global Leaderboards
- **Worldwide Rankings**: Compete with players globally using Supabase backend
- **Top 5 Leaderboards**: Separate leaderboards for each difficulty level
- **Score Submission**: Automatically submit scores after each game
- **Real-time Updates**: See the latest global rankings
- **Player Names**: Enter your name to appear on the leaderboard

### 📊 Statistics & Progress
- **Persistent Statistics**: Track your progress across sessions
  - Games Played
  - Best Accuracy
  - Average Accuracy
  - Total Matches
- **Real-time Accuracy Tracking**: See your performance during gameplay
- **Personal Best Celebrations**: Get notified when you beat your high score
- **Stats Dashboard**: View all your statistics on the landing page

### 🎵 Audio
- **Background Music**: Calm, upbeat melody generated with Web Audio API
- **Music Toggle**: Mute/unmute with floating control button
- **Volume Control**: Set to 100% for full audio experience
- **Persistent Preference**: Music preference saved in localStorage

### 📱 Responsive Design
- **Mobile-Friendly**: Optimized for phones and tablets
- **Desktop Experience**: Enhanced layout for larger screens
- **Adaptive Grid**: Card layout adjusts based on screen size and difficulty
- **Touch-Optimized**: Works seamlessly with touch and click

### 🎨 UI/UX
- **Modern Dark Theme**: Gradient background with glassmorphism effects
- **Smooth Animations**: Card flips, transitions, and dialogs
- **ShadCN Components**: Professional UI components
- **Lucide Icons**: Beautiful, consistent iconography
- **Accessible Design**: Keyboard and screen reader friendly
- **Player Name Input**: Personalized experience with name entry

### 🧩 Programming Concepts Covered
- **Languages**: Python, JavaScript, Java, HTML, CSS
- **Hardware**: CPU, RAM, SSD
- Each card includes educational descriptions

## 🎯 Why EduMemory is Needed

While numerous memory card games and educational programming resources exist, **EduMemory bridges a critical gap** by combining several elements that are rarely found together in existing works:

### Unique Value Propositions

1. **Context-Aware Learning Through Play**
   - Unlike traditional flashcard apps or standalone memory games, EduMemory provides **educational context at the moment of engagement**. When students match cards, they immediately receive relevant programming knowledge, reinforcing learning through the dopamine release of success.
   - Most memory games focus purely on memorization without teaching; most programming tutorials lack the gamification that drives engagement.

2. **Progressive Difficulty Tailored for Learning**
   - The three difficulty levels aren't arbitrary—they're designed to match cognitive load:
     - **Easy (4 pairs)**: Ideal for complete beginners or young learners
     - **Medium (6 pairs)**: Balances challenge with achievability for intermediate students
     - **Hard (8 pairs)**: Tests mastery and working memory capacity
   - Unlike generic memory games with random difficulty scaling, each level is calibrated for educational progression.

3. **Persistent Progress & Motivation Loop**
   - **Local statistics** (games played, best/average accuracy, total matches) provide personal benchmarking
   - **Global leaderboards** (via Supabase) create healthy competition and community
   - **Personal best celebrations** trigger intrinsic motivation
   - This dual-layered tracking system (local + global) is uncommon in educational games and creates sustained engagement beyond a single session.

4. **Accessibility & Low Barrier to Entry**
   - **Fully responsive design** means students can learn on any device—phone during commute, tablet at home, desktop at school
   - **No account required** for playing—just enter a name and start learning
   - **Offline-capable statistics** through localStorage
   - Many educational platforms require subscriptions, installations, or complex setups; EduMemory is instant.

5. **Open-Source & Extensible Architecture**
   - Built with **modern, industry-standard technologies** (React, TypeScript, Tailwind, Supabase)
   - **Clear separation of concerns**: Components, services, backend API
   - **Comprehensive documentation** makes it easy for educators and developers to:
     - Add new programming concepts/cards
     - Customize difficulty levels
     - Deploy in their own environments
     - Use as a learning resource for web development itself
   - Most educational games are proprietary black boxes; EduMemory is a transparent learning tool for both users and developers.

6. **Cognitive Science-Backed Features**
   - **Hint system (2 per game)**: Reduces frustration without eliminating challenge, supporting the Zone of Proximal Development
   - **Accuracy tracking over move counting**: Emphasizes quality of learning over speed
   - **Spaced repetition through replay**: Global leaderboards encourage multiple sessions, naturally spacing out learning
   - **Multi-sensory engagement**: Visual (cards, animations), kinesthetic (clicking/tapping), auditory (background music), and cognitive (matching logic)

### Addressing Existing Gaps

| Existing Solutions | Limitations | EduMemory's Approach |
|--------------------|-------------|----------------------|
| **Generic Memory Games** | No educational content; random themes | Purpose-built for programming education with contextual learning |
| **Programming Flashcards** | Passive learning; no engagement mechanics | Active gamified learning with immediate feedback |
| **Coding Bootcamp Platforms** | High barrier to entry; time-intensive | Quick, accessible micro-learning sessions |
| **Traditional Educational Games** | Often single-player, no progress tracking | Global leaderboards + persistent local statistics |
| **Physical Card Games** | Limited scalability; no automatic tracking | Digital scalability with automatic progress monitoring |

### Real-World Impact

- **For Students**: Makes programming fundamentals memorable through active recall and spaced repetition
- **For Educators**: Provides a ready-to-deploy tool for classroom warm-ups, homework, or independent learning
- **For Self-Learners**: Offers a fun, low-pressure entry point into programming concepts
- **For Developers**: Serves as a complete reference implementation of a full-stack React + Supabase application

### Future Extensibility

The architecture supports easy expansion into:
- Different subject domains (math, science, languages)
- Multiplayer competitive modes
- Adaptive difficulty based on performance
- Rich media cards (videos, code snippets, interactive demos)
- Classroom management features (teacher dashboards, student tracking)

**In summary**: EduMemory isn't just another memory game or another programming tutorial—it's a thoughtfully designed intersection of cognitive science, game design, and educational technology, built with modern tools and made freely available to accelerate programming literacy worldwide.

## 🛠️ Technologies Used

### Frontend
- **React 18**: Modern React with hooks
- **TypeScript**: Type-safe development
- **Tailwind CSS 4.0**: Utility-first styling
- **ShadCN/UI**: Pre-built accessible components
- **Lucide React**: Icon library
- **Web Audio API**: Synthesized background music

### Backend
- **Supabase**: Backend-as-a-Service platform
- **Supabase Edge Functions**: Serverless API endpoints (Hono framework)
- **Supabase Database**: PostgreSQL with key-value storage
- **RESTful API**: Three endpoints for leaderboard management

### Development
- **Vite**: Fast build tool and dev server

## 📁 Project Structure

```
├── .env                             # Environment variables (not included, see setup)
├── App.tsx                          # Main game component
├── components/
│   ├── BackgroundMusic.tsx          # Web Audio API music player
│   ├── GameCard.tsx                 # Individual card component
│   ├── HomePage.tsx                 # Main game page
│   ├── LandingPage.tsx              # Landing page with stats & leaderboards
│   ├── Leaderboard.tsx              # Global leaderboard component
│   ├── NameInputDialog.tsx          # Player name input dialog
│   ├── figma/
│   │   └── ImageWithFallback.tsx    # Image component with fallback
│   └── ui/                          # ShadCN UI components
├── services/
│   └── leaderboardService.ts        # API service for leaderboard
├── supabase/
│   └── functions/
│       └── server/
│           ├── index.tsx            # Hono server with API routes
│           └── kv_store.tsx         # Key-value store utilities
├── utils/
│   └── supabase/
│       └── info.tsx                 # Supabase configuration
├── styles/
│   └── globals.css                  # Global styles and Tailwind config
├── guidelines/
│   └── Guidelines.md                # Development guidelines
└── Attributions.md                  # Third-party attributions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn/pnpm
- Modern web browser
- Supabase account (for backend features)

### Installation

1. **Clone or download the project files**

2. **Install dependencies**
   ```bash
   npm install
   ```

   Or with yarn:
   ```bash
   yarn install
   ```

   Or with pnpm:
   ```bash
   pnpm install
   ```

3. **Configure Supabase**
   
   

   **For VS Code or other environments**, create a `.env` file in the root directory:
   
   ```env
   # Supabase Configuration
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # Backend Environment Variables (for Supabase Edge Functions)
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   SUPABASE_DB_URL=your_supabase_database_url
   ```
   
   To get these values:
   - Go to your [Supabase Dashboard](https://supabase.com/dashboard)
   - Create a new project or select an existing one
   - Navigate to **Project Settings → API**
   - Copy the **Project URL** and **anon public** key
   - For service role key, find it under **Project Settings → API → service_role** (keep this secret!)
   - For database URL, go to **Project Settings → Database → Connection string → URI**

4. **Start the development server**
   ```bash
   npm run dev
   ```

   Or with yarn:
   ```bash
   yarn dev
   ```

   Or with pnpm:
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

### Build for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

## 🌐 Backend API

The application uses three Supabase Edge Function endpoints:

### Endpoints

1. **POST `/make-server-35696294/leaderboard/:difficulty`**
   - Submit a score to the leaderboard
   - Body: `{ playerName: string, accuracy: number, moves: number }`
   - Returns: `{ success: boolean, rank?: number }`

2. **GET `/make-server-35696294/leaderboard/:difficulty`**
   - Fetch top 5 players for a difficulty level
   - Returns: Array of top 5 scores

3. **GET `/make-server-35696294/leaderboard/all`**
   - Fetch all leaderboards (easy, medium, hard)
   - Returns: Object with three leaderboard arrays

### Database

- Uses Supabase PostgreSQL with key-value storage
- Data persists across sessions
- Automatic ranking and sorting

## 💻 Migrating to VS Code

### Option 1: Open Existing Project

1. **Open VS Code**
2. **File → Open Folder**
3. **Select the project directory**

### Option 2: Command Line

```bash
# Navigate to your project directory
cd path/to/edumemory

# Open in VS Code
code .
```

### Option 3: Create New Project from Scratch

```bash
# Create a new Vite + React + TypeScript project
npm create vite@latest edumemory -- --template react-ts

# Navigate to the project
cd edumemory

# Install dependencies
npm install

# Install additional dependencies
npm install lucide-react class-variance-authority clsx tailwind-merge
npm install -D tailwindcss postcss autoprefixer
npm install @radix-ui/react-dialog @radix-ui/react-alert-dialog @radix-ui/react-select

# Copy all files from this project to the new project
# (Copy App.tsx, components/, styles/, supabase/, etc.)

# Start the development server
npm run dev

# Open in VS Code
code .
```

### Required VS Code Extensions (Recommended)

Install these extensions for the best development experience:

```bash
# Open VS Code
# Press Ctrl+Shift+X (Windows/Linux) or Cmd+Shift+X (Mac)
# Search and install:
```

- **ES7+ React/Redux/React-Native snippets** - Code snippets
- **Tailwind CSS IntelliSense** - Tailwind autocomplete
- **TypeScript Vue Plugin (Volar)** - TypeScript support
- **Prettier - Code formatter** - Code formatting
- **ESLint** - Code linting

### VS Code Settings (Optional)

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"\"`]([^\"\"`]*).*?[\"\"`]"],
    ["cx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

## 🎮 How to Play

1. **Enter Your Name**: Input your player name on the landing page
2. **Choose Difficulty**: Select Easy, Medium, or Hard
3. **Flip Cards**: Click cards to flip them over
4. **Match Pairs**: Find matching programming icons
5. **Learn**: Read educational descriptions when you make a match
6. **Use Hints**: Click the Hint button to reveal all cards briefly (2 per game)
7. **Track Progress**: View your accuracy and stats in real-time
8. **Compete Globally**: Submit your score to the global leaderboard
9. **Beat Your Best**: Try to improve your accuracy percentage!

## 📊 Statistics Tracking

Statistics are tracked both locally and globally:

### Local Stats (localStorage)
- **Games Played**: Total number of completed games
- **Best Accuracy**: Your highest accuracy percentage
- **Average Accuracy**: Mean accuracy across all games
- **Total Matches**: Cumulative successful matches

### Global Leaderboards (Supabase)
- **Top 5 Rankings**: Best players for each difficulty
- **Player Names**: See who's leading the boards
- **Accuracy Scores**: Rankings based on accuracy percentage
- **Persistent**: Scores saved permanently in the database

## 🎵 Background Music

- **Toggle**: Click the speaker icon in the top-right corner
- **Auto-save**: Your music preference is saved automatically
- **Volume**: Set to 100% for full audio experience
- **Looping**: Music plays continuously while unmuted
- **Web Audio API**: Synthesized melody using oscillators

## 🔧 Configuration

### Adjusting Music Volume

Edit `/components/BackgroundMusic.tsx`:

```typescript
gainNodeRef.current.gain.value = 1.0; // Change to 0.0-1.0 (0% to 100%)
```

### Changing Difficulty Levels

Edit `/App.tsx`:

```typescript
const LEVELS = { easy: 4, medium: 6, hard: 8 }; // Number of pairs
```

### Adding New Cards

Edit the `CARD_LIBRARY` array in `/App.tsx`:

```typescript
const CARD_LIBRARY: Card[] = [
  { 
    id: 'unique-id', 
    icon: 'image-url', 
    title: 'Title', 
    desc: 'Educational description' 
  },
  // Add more cards...
];
```

### Customizing Backend

Edit `/supabase/functions/server/index.tsx`:

```typescript
// Add new routes
app.get('/make-server-35696294/custom-route', async (c) => {
  // Your custom logic
});
```

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📄 License

This project is open source and available for educational purposes.

## 🙏 Attributions

See [Attributions.md](./Attributions.md) for third-party resources and credits.

## 📞 Support

For issues or questions, please check the code comments or refer to the component documentation or contact francisjohn.gorres.s@southlandcollege,edu.ph
Special Mention for Gorres na cute hahahaha!

---

**Built with ❤️ for learning and education**