import express from 'express';
import {
  createSession,
  updateTaskScore,
  getLeaderboard,
  getSessionRank,
  getSession,
} from '../controllers/game.controller';

const router = express.Router();

/**
 * POST /api/game/session
 * Create a new game session
 */
router.post('/session', createSession);

/**
 * GET /api/game/session/:sessionId
 * Get session details
 */
router.get('/session/:sessionId', getSession);

/**
 * PUT /api/game/session/:sessionId/task
 * Update task score for a session
 */
router.put('/session/:sessionId/task', updateTaskScore);

/**
 * GET /api/game/leaderboard
 * Get leaderboard (top scores)
 */
router.get('/leaderboard', getLeaderboard);

/**
 * GET /api/game/session/:sessionId/rank
 * Get rank for a specific session
 */
router.get('/session/:sessionId/rank', getSessionRank);

export default router;
