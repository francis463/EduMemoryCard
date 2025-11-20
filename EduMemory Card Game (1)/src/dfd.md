# EduMemory Card Game - Data Flow Diagrams

## Level 0 DFD (Context Diagram)

The Level 0 DFD shows the entire system as a single process with external entities and data flows.

```
┌─────────────┐
│             │
│   Player    │
│             │
└──────┬──────┘
       │
       │ Player Name
       │ Difficulty Selection
       │ Card Selections
       │ Music Controls
       ↓
┌─────────────────────────────────┐
│                                 │
│   EduMemory Card Game System    │
│                                 │
└────────┬───────────────┬────────┘
         │               │
         │ Game Results  │ Leaderboard Data
         │ Player Stats  │ Player Stats
         ↓               ↓
    ┌─────────┐    ┌──────────────────┐
    │ Player  │    │    Supabase      │
    │         │    │    Database      │
    └─────────┘    └──────────────────┘
```

### External Entities:
1. **Player** - User who interacts with the game
2. **Supabase Database** - Cloud database storing global leaderboards and player statistics

### Data Flows:
- **Input from Player:**
  - Player Name
  - Difficulty Level Selection (Easy/Medium/Hard)
  - Card Selections (flipping cards)
  - Music Controls (play/pause)
  
- **Output to Player:**
  - Game Results (accuracy, matches)
  - Player Statistics
  - Visual Feedback (card animations, confetti)
  - Background Music

- **To/From Supabase Database:**
  - Leaderboard Entries (name, accuracy, timestamp, level)
  - Player Statistics (games played, best accuracy, average accuracy, total matches)

---

## Level 1 DFD (Detailed Process Diagram)

The Level 1 DFD breaks down the system into major processes and shows detailed data flows.

```
                    ┌──────────────┐
                    │    Player    │
                    └───────┬──────┘
                            │
           ┌────────────────┼────────────────┐
           │                │                │
           │ Player Name    │ Difficulty     │ Card Selections
           │                │ Selection      │ Music Controls
           ↓                ↓                ↓
    ┌──────────────┐ ┌─────────────┐ ┌──────────────────┐
    │   Process 1  │ │  Process 2  │ │    Process 3     │
    │              │ │             │ │                  │
    │ Player Name  │ │   Level     │ │   Card Game      │
    │ Management   │ │  Selection  │ │   Processing     │
    │              │ │             │ │                  │
    └──────┬───────┘ └──────┬──────┘ └────────┬─────────┘
           │                │                  │
           │                │                  │ Match Results
           │                │ Selected Level   │ Attempts
           │                │                  │
           │                └──────────────────┤
           │                                   │
           │ Player Name                       ↓
           │                         ┌─────────────────┐
           │                         │   Process 4     │
           │                         │                 │
           └────────────────────────→│   Statistics    │
                                     │   Calculation   │
                                     │                 │
                                     └────────┬────────┘
                                              │
                                              │ Stats Data
                                              │
                       ┌──────────────────────┼──────────────────────┐
                       │                      │                      │
                       ↓                      ↓                      ↓
                ┌─────────────┐        ┌─────────────┐       ┌─────────────┐
                │  Process 5  │        │ Data Store  │       │ Data Store  │
                │             │        │      1      │       │      2      │
                │ Leaderboard │───────→│             │       │             │
                │ Management  │        │   Local     │       │  Supabase   │
                │             │←───────│  Storage    │       │  Database   │
                └──────┬──────┘        └─────────────┘       └─────────────┘
                       │                      ↑                      ↑
                       │                      │                      │
                       │                      └──────────────────────┘
                       │                      Read/Write Stats & Leaderboards
                       │ Leaderboard Display
                       │
                       ↓
                ┌─────────────┐
                │   Player    │
                └─────────────┘


               ┌──────────────┐
               │   Player     │
               └───────┬──────┘
                       │
                       │ Music Controls
                       ↓
                ┌─────────────┐
                │  Process 6  │
                │             │
                │ Background  │
                │    Music    │
                │  Control    │
                └──────┬──────┘
                       │
                       │ Audio Output
                       ↓
                ┌─────────────┐
                │   Player    │
                └─────────────┘
```

### Detailed Processes:

#### **Process 1: Player Name Management**
- **Input:** Player Name (from Player)
- **Process:** 
  - Validates player name input
  - Stores player name in local storage
  - Retrieves player name on page load
- **Output:** Player Name to Statistics Calculation
- **Data Store:** Local Storage (D1)

#### **Process 2: Level Selection**
- **Input:** Difficulty Selection (Easy/Medium/Hard from Player)
- **Process:**
  - Receives difficulty level choice
  - Initializes game configuration (4/6/8 pairs)
  - Prepares card deck based on difficulty
- **Output:** Selected Level to Card Game Processing
- **Data Store:** None

#### **Process 3: Card Game Processing**
- **Input:** 
  - Card Selections (from Player)
  - Selected Level (from Process 2)
- **Process:**
  - Handles card flip logic
  - Manages game state (matched cards, flipped cards)
  - Processes hint usage (2 hints per game)
  - Validates card matches
  - Tracks attempts and matches
  - Triggers confetti on completion
- **Output:** 
  - Match Results and Attempts to Statistics Calculation
  - Visual feedback to Player
- **Data Store:** None (in-memory state)

#### **Process 4: Statistics Calculation**
- **Input:**
  - Match Results and Attempts (from Process 3)
  - Player Name (from Process 1)
  - Selected Level (from Process 2)
- **Process:**
  - Calculates accuracy percentage
  - Updates games played count
  - Computes average accuracy
  - Tracks total matches
  - Determines best accuracy
  - Creates leaderboard entry with timestamp
- **Output:** 
  - Stats Data to Leaderboard Management
  - Stats Data to Local Storage (D1)
  - Stats Data to Supabase Database (D2)
- **Data Store:** 
  - Local Storage (D1) - player-specific stats
  - Supabase Database (D2) - global leaderboard entries

#### **Process 5: Leaderboard Management**
- **Input:** 
  - Stats Data (from Process 4)
- **Process:**
  - Submits leaderboard entries to Supabase
  - Retrieves top 5 entries per difficulty level
  - Filters and sorts leaderboard data
  - Manages separate leaderboards (Easy/Medium/Hard)
- **Output:** 
  - Leaderboard Display to Player
  - Read/Write operations to Local Storage (D1)
  - Read/Write operations to Supabase Database (D2)
- **Data Store:** 
  - Local Storage (D1)
  - Supabase Database (D2)

#### **Process 6: Background Music Control**
- **Input:** Music Controls (play/pause from Player)
- **Process:**
  - Handles music play/pause/resume
  - Manages audio state
  - Provides music toggle functionality
- **Output:** Audio Output to Player
- **Data Store:** None

---

## Data Stores

### **D1: Local Storage**
**Contents:**
- Player Name (string)
- Player-specific Statistics:
  - Games Played (number)
  - Best Accuracy (number)
  - Average Accuracy (number)
  - Total Matches (number)
- Stored per player name

**Purpose:** Persist player data across browser sessions

### **D2: Supabase Database**
**Contents:**
- Global Leaderboard Entries:
  - Player Name (string)
  - Accuracy (number)
  - Timestamp (number)
  - Difficulty Level (easy/medium/hard)
- Top entries for each difficulty level

**Purpose:** Store and retrieve global leaderboard data across all players

---

## Data Dictionary

| Data Element | Description | Type | Source | Destination |
|--------------|-------------|------|--------|-------------|
| Player Name | Name entered by player | String | Player | Process 1, 4 |
| Difficulty Selection | Game difficulty level | Enum (easy/medium/hard) | Player | Process 2 |
| Card Selection | Cards flipped by player | Array | Player | Process 3 |
| Music Control | Play/pause commands | Boolean | Player | Process 6 |
| Selected Level | Chosen difficulty | Enum | Process 2 | Process 3, 4 |
| Match Results | Game outcome data | Object | Process 3 | Process 4 |
| Attempts | Number of card flips | Number | Process 3 | Process 4 |
| Accuracy | Success percentage | Number | Process 4 | D1, D2 |
| Games Played | Total games count | Number | Process 4 | D1 |
| Best Accuracy | Highest accuracy | Number | Process 4 | D1 |
| Average Accuracy | Mean accuracy | Number | Process 4 | D1 |
| Total Matches | Sum of all matches | Number | Process 4 | D1 |
| Leaderboard Entry | Competition record | Object | Process 4 | Process 5, D2 |
| Timestamp | Entry creation time | Number | Process 4 | D2 |
| Leaderboard Display | Top 5 per level | Array | Process 5 | Player |
| Audio Output | Music playback | Audio | Process 6 | Player |

---

## Notes

1. **Player-specific Statistics:** All statistics are tracked separately for each player name. When a player re-enters their name after a page refresh, their individual stats are loaded from local storage.

2. **Global Leaderboards:** The Supabase database maintains separate top-5 leaderboards for each difficulty level (Easy, Medium, Hard), allowing players to compete globally.

3. **Data Persistence:** Local storage is used for player-specific data, while Supabase provides cloud-based global leaderboard functionality.

4. **Real-time Updates:** Leaderboard data is fetched from Supabase on landing page load to show current global standings.

5. **Stateless Game Sessions:** The card game processing (Process 3) maintains state only during active gameplay and resets between games.
