# EduMemory Card Game - Database Documentation

## Database Overview

The EduMemory Card Game uses **Supabase** as its database backend. The database follows a simple key-value store pattern, which provides flexibility for storing various types of application data.

**Supabase Project URL:** https://supabase.com/dashboard/project/hudtqdsrestbnaedluur/database/tables

---

## Database Tables

### Table: `kv_store_35696294`

A key-value store table that stores all application data in a flexible JSONB format.

#### Schema Definition

```sql
CREATE TABLE kv_store_35696294 (
  key TEXT NOT NULL PRIMARY KEY,
  value JSONB NOT NULL
);
```

#### Column Details

| Column | Data Type | Constraints | Description |
|--------|-----------|-------------|-------------|
| `key` | TEXT | PRIMARY KEY, NOT NULL | Unique identifier for each data entry |
| `value` | JSONB | NOT NULL | JSON data stored for the corresponding key |

#### Purpose

This table serves as a flexible key-value store that can accommodate various data structures without requiring schema migrations. It's particularly well-suited for:
- Storing leaderboard data
- Caching frequently accessed data
- Storing configuration data
- Maintaining application state

---

## Current Data Usage

### Leaderboard Data

The application currently uses three keys to store global leaderboards for different difficulty levels:

#### Key: `leaderboard:easy`
**Description:** Stores top 5 leaderboard entries for Easy difficulty level

**Data Structure:**
```json
[
  {
    "name": "PlayerName",
    "accuracy": 95,
    "level": "easy",
    "timestamp": 1700236800000
  },
  {
    "name": "AnotherPlayer",
    "accuracy": 90,
    "level": "easy",
    "timestamp": 1700237000000
  }
]
```

**Fields:**
- `name` (string) - Player's name
- `accuracy` (number) - Accuracy percentage (0-100)
- `level` (string) - Difficulty level ("easy")
- `timestamp` (number) - Unix timestamp when the entry was created

**Constraints:**
- Maximum 5 entries (top 5 players)
- Sorted by accuracy (descending), then by timestamp (ascending for tie-breaking)

---

#### Key: `leaderboard:medium`
**Description:** Stores top 5 leaderboard entries for Medium difficulty level

**Data Structure:**
```json
[
  {
    "name": "PlayerName",
    "accuracy": 88,
    "level": "medium",
    "timestamp": 1700236900000
  },
  {
    "name": "AnotherPlayer",
    "accuracy": 85,
    "level": "medium",
    "timestamp": 1700237100000
  }
]
```

**Fields:**
- `name` (string) - Player's name
- `accuracy` (number) - Accuracy percentage (0-100)
- `level` (string) - Difficulty level ("medium")
- `timestamp` (number) - Unix timestamp when the entry was created

**Constraints:**
- Maximum 5 entries (top 5 players)
- Sorted by accuracy (descending), then by timestamp (ascending for tie-breaking)

---

#### Key: `leaderboard:hard`
**Description:** Stores top 5 leaderboard entries for Hard difficulty level

**Data Structure:**
```json
[
  {
    "name": "PlayerName",
    "accuracy": 82,
    "level": "hard",
    "timestamp": 1700237000000
  },
  {
    "name": "AnotherPlayer",
    "accuracy": 78,
    "level": "hard",
    "timestamp": 1700237200000
  }
]
```

**Fields:**
- `name` (string) - Player's name
- `accuracy` (number) - Accuracy percentage (0-100)
- `level` (string) - Difficulty level ("hard")
- `timestamp` (number) - Unix timestamp when the entry was created

**Constraints:**
- Maximum 5 entries (top 5 players)
- Sorted by accuracy (descending), then by timestamp (ascending for tie-breaking)

---

## API Endpoints

The application interacts with the database through the following server endpoints:

### POST `/make-server-35696294/leaderboard`
**Purpose:** Add a new leaderboard entry

**Request Body:**
```json
{
  "name": "PlayerName",
  "accuracy": 95,
  "level": "easy"
}
```

**Response:**
```json
{
  "success": true,
  "leaderboard": [
    // Updated top 5 leaderboard array
  ]
}
```

**Business Logic:**
1. Validates required fields (name, accuracy, level)
2. Validates level is one of: easy, medium, hard
3. Creates entry with current timestamp
4. Retrieves current leaderboard for the level
5. Adds new entry to leaderboard
6. Sorts by accuracy (desc), then timestamp (asc)
7. Keeps only top 5 entries
8. Saves back to database

---

### GET `/make-server-35696294/leaderboard/:level`
**Purpose:** Get leaderboard for a specific difficulty level

**Parameters:**
- `level` (path parameter) - One of: easy, medium, hard

**Response:**
```json
{
  "leaderboard": [
    {
      "name": "PlayerName",
      "accuracy": 95,
      "level": "easy",
      "timestamp": 1700236800000
    }
  ]
}
```

---

### GET `/make-server-35696294/leaderboard`
**Purpose:** Get all leaderboards (easy, medium, hard)

**Response:**
```json
{
  "leaderboards": {
    "easy": [
      // Top 5 easy leaderboard entries
    ],
    "medium": [
      // Top 5 medium leaderboard entries
    ],
    "hard": [
      // Top 5 hard leaderboard entries
    ]
  }
}
```

---

## Database Operations

The application uses the following key-value store operations (defined in `/supabase/functions/server/kv_store.tsx`):

### Available Functions

| Function | Description | Parameters | Return Type |
|----------|-------------|------------|-------------|
| `get(key)` | Retrieve a single value | key: string | Promise<any> |
| `set(key, value)` | Store a single key-value pair | key: string, value: any | Promise<void> |
| `del(key)` | Delete a single key-value pair | key: string | Promise<void> |
| `mget(keys)` | Retrieve multiple values | keys: string[] | Promise<any[]> |
| `mset(keys, values)` | Store multiple key-value pairs | keys: string[], values: any[] | Promise<void> |
| `mdel(keys)` | Delete multiple key-value pairs | keys: string[] | Promise<void> |
| `getByPrefix(prefix)` | Search for keys by prefix | prefix: string | Promise<any[]> |

---

## Data Access Patterns

### Leaderboard Read Pattern
```typescript
// Get specific level leaderboard
const key = `leaderboard:${level}`;
const data = await kv.get(key);
const leaderboard = data ? JSON.parse(data) : [];
```

### Leaderboard Write Pattern
```typescript
// Add entry and maintain top 5
const key = `leaderboard:${level}`;
const currentData = await kv.get(key);
let leaderboard = currentData ? JSON.parse(currentData) : [];

leaderboard.push(entry);
leaderboard.sort((a, b) => {
  if (b.accuracy !== a.accuracy) {
    return b.accuracy - a.accuracy;
  }
  return a.timestamp - b.timestamp;
});
leaderboard = leaderboard.slice(0, 5);

await kv.set(key, JSON.stringify(leaderboard));
```

---

## Data Persistence

### Cloud Storage (Supabase)
- **Leaderboard data** - Stored in Supabase database
- **Global across all users**
- **Persists indefinitely**
- **Accessible from any device**

### Local Storage (Browser)
- **Player-specific statistics** - Stored in browser's localStorage
- **Per player name:**
  - Games Played
  - Best Accuracy
  - Average Accuracy
  - Total Matches
- **Device-specific**
- **Cleared on browser cache clear**

---

## Security

### Authentication
- Server uses `SUPABASE_SERVICE_ROLE_KEY` for database access
- Frontend uses `SUPABASE_ANON_KEY` for API requests
- Service role key is never exposed to the frontend

### Data Validation
- Level validation (must be easy, medium, or hard)
- Required field validation (name, accuracy, level)
- Error handling with detailed error messages

---

## Backup and Recovery

**Supabase Automatic Backups:**
- Supabase provides automatic daily backups
- Point-in-time recovery available
- Backups accessible through Supabase dashboard

**Manual Backup:**
```bash
# Export data via Supabase CLI
supabase db dump -f backup.sql
```

---

## Scalability Considerations

### Current Design
- **Advantages:**
  - Simple key-value structure
  - No schema migrations needed
  - Fast read/write operations
  - Suitable for prototyping

### Future Enhancements (if needed)
If the application scales beyond the current scope, consider:

1. **Separate Leaderboard Table:**
```sql
CREATE TABLE leaderboards (
  id SERIAL PRIMARY KEY,
  player_name TEXT NOT NULL,
  accuracy INTEGER NOT NULL CHECK (accuracy >= 0 AND accuracy <= 100),
  difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  timestamp BIGINT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_leaderboards_difficulty_accuracy 
ON leaderboards(difficulty, accuracy DESC, timestamp ASC);
```

2. **Player Statistics Table:**
```sql
CREATE TABLE player_stats (
  player_name TEXT PRIMARY KEY,
  games_played INTEGER DEFAULT 0,
  best_accuracy INTEGER DEFAULT 0,
  average_accuracy DECIMAL(5,2) DEFAULT 0,
  total_matches INTEGER DEFAULT 0,
  last_played TIMESTAMP DEFAULT NOW()
);
```

3. **Add pagination for large datasets**
4. **Implement caching layer**
5. **Add database indexes for performance**

---

## Maintenance

### Monitoring
- Monitor Supabase dashboard for:
  - Database size
  - Query performance
  - Error rates
  - Connection pool usage

### Optimization
- Current table is already indexed by primary key (key column)
- JSONB data type allows efficient JSON querying
- Consider using Supabase's built-in performance insights

### Data Cleanup
Currently, leaderboard data is automatically maintained (top 5 only), so no cleanup is needed. If additional data types are added, implement cleanup strategies:
- Archive old data
- Set retention policies
- Implement soft deletes

---

## Environment Variables

Required environment variables for database access:

| Variable | Description | Usage |
|----------|-------------|-------|
| `SUPABASE_URL` | Supabase project URL | Both frontend and backend |
| `SUPABASE_ANON_KEY` | Public anonymous key | Frontend API calls |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (admin) | Backend database operations |
| `SUPABASE_DB_URL` | Direct database connection URL | Advanced database operations |

**Important:** Never expose `SUPABASE_SERVICE_ROLE_KEY` to the frontend as it has admin privileges.

---

## Notes

1. **No Schema Migrations Required:** The key-value store design eliminates the need for database migrations, making it perfect for rapid prototyping.

2. **JSONB Benefits:** PostgreSQL's JSONB type provides:
   - Efficient storage
   - Fast indexing
   - Rich query capabilities
   - Flexibility in data structure

3. **Limitations:** The current design is optimized for small to medium-scale applications. For high-traffic production applications, consider implementing dedicated tables with proper indexing.

4. **Data Integrity:** All database operations include error handling to ensure data consistency.
