import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-35696294/health", (c) => {
  return c.json({ status: "ok" });
});

// Add a leaderboard entry
app.post("/make-server-35696294/leaderboard", async (c) => {
  try {
    const body = await c.req.json();
    const { name, accuracy, level } = body;

    if (!name || accuracy === undefined || !level) {
      return c.json({ error: "Missing required fields: name, accuracy, level" }, 400);
    }

    if (!['easy', 'medium', 'hard'].includes(level)) {
      return c.json({ error: "Invalid level. Must be easy, medium, or hard" }, 400);
    }

    const entry = {
      name,
      accuracy,
      level,
      timestamp: Date.now()
    };

    // Get current leaderboard for this level
    const key = `leaderboard:${level}`;
    const currentData = await kv.get(key);
    let leaderboard = currentData ? JSON.parse(currentData) : [];

    // Add new entry
    leaderboard.push(entry);

    // Sort by accuracy (descending), then by timestamp (ascending for tie-breaking)
    leaderboard.sort((a: any, b: any) => {
      if (b.accuracy !== a.accuracy) {
        return b.accuracy - a.accuracy;
      }
      return a.timestamp - b.timestamp;
    });

    // Keep only top 5
    leaderboard = leaderboard.slice(0, 5);

    // Save back to database
    await kv.set(key, JSON.stringify(leaderboard));

    return c.json({ success: true, leaderboard });
  } catch (error) {
    console.error('Error adding leaderboard entry:', error);
    return c.json({ error: `Failed to add leaderboard entry: ${error.message}` }, 500);
  }
});

// Get leaderboard for a specific level
app.get("/make-server-35696294/leaderboard/:level", async (c) => {
  try {
    const level = c.req.param('level');

    if (!['easy', 'medium', 'hard'].includes(level)) {
      return c.json({ error: "Invalid level. Must be easy, medium, or hard" }, 400);
    }

    const key = `leaderboard:${level}`;
    const data = await kv.get(key);
    const leaderboard = data ? JSON.parse(data) : [];

    return c.json({ leaderboard });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return c.json({ error: `Failed to fetch leaderboard: ${error.message}` }, 500);
  }
});

// Get all leaderboards (easy, medium, hard)
app.get("/make-server-35696294/leaderboard", async (c) => {
  try {
    const levels = ['easy', 'medium', 'hard'];
    const leaderboards: any = {};

    for (const level of levels) {
      const key = `leaderboard:${level}`;
      const data = await kv.get(key);
      leaderboards[level] = data ? JSON.parse(data) : [];
    }

    return c.json({ leaderboards });
  } catch (error) {
    console.error('Error fetching all leaderboards:', error);
    return c.json({ error: `Failed to fetch leaderboards: ${error.message}` }, 500);
  }
});

Deno.serve(app.fetch);