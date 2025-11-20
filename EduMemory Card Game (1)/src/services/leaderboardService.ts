import { projectId, publicAnonKey } from '../utils/supabase/info';

// Use environment variables if available (for VS Code/production), otherwise fall back to info.tsx (for Figma Make)
const SUPABASE_URL = (import.meta.env?.VITE_SUPABASE_URL) || `https://${projectId}.supabase.co`;
const SUPABASE_ANON_KEY = (import.meta.env?.VITE_SUPABASE_ANON_KEY) || publicAnonKey;

const API_URL = `${SUPABASE_URL}/functions/v1/make-server-35696294`;

interface LeaderboardEntry {
  name: string;
  accuracy: number;
  level: 'easy' | 'medium' | 'hard';
  timestamp: number;
}

interface Leaderboards {
  easy: LeaderboardEntry[];
  medium: LeaderboardEntry[];
  hard: LeaderboardEntry[];
}

export const leaderboardService = {
  // Add a new score to the leaderboard
  async addScore(name: string, accuracy: number, level: 'easy' | 'medium' | 'hard'): Promise<LeaderboardEntry[]> {
    try {
      const response = await fetch(`${API_URL}/leaderboard`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({ name, accuracy, level })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to add score');
      }

      const data = await response.json();
      return data.leaderboard;
    } catch (error) {
      console.error('Error adding score to leaderboard:', error);
      throw error;
    }
  },

  // Get leaderboard for a specific level
  async getLeaderboard(level: 'easy' | 'medium' | 'hard'): Promise<LeaderboardEntry[]> {
    try {
      const response = await fetch(`${API_URL}/leaderboard/${level}`, {
        headers: {
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch leaderboard');
      }

      const data = await response.json();
      return data.leaderboard;
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      throw error;
    }
  },

  // Get all leaderboards
  async getAllLeaderboards(): Promise<Leaderboards> {
    try {
      const response = await fetch(`${API_URL}/leaderboard`, {
        headers: {
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch leaderboards');
      }

      const data = await response.json();
      return data.leaderboards;
    } catch (error) {
      console.error('Error fetching all leaderboards:', error);
      throw error;
    }
  }
};
