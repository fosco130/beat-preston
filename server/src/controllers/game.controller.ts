import { Request, Response } from 'express';
import { GameSession, IGameSession } from '../models/GameSession.model';

/**
 * Create a new game session
 */
export const createSession = async (req: Request, res: Response) => {
  try {
    const { name, agencyName, email, mobile, biggestChallenge } = req.body;

    if (!name || !agencyName || !email) {
      return res.status(400).json({
        error: 'Missing required fields: name, agencyName, email',
      });
    }

    const session = new GameSession({
      name,
      agencyName,
      email,
      mobile,
      biggestChallenge,
      taskScores: [],
      totalUserScore: 0,
      totalPrestonScore: 0,
      futureReadinessScore: 0,
    });

    await session.save();

    res.status(201).json({
      success: true,
      sessionId: session._id,
      data: session,
    });
  } catch (error: any) {
    console.error('Error creating session:', error);
    res.status(500).json({
      error: 'Failed to create game session',
      message: error.message,
    });
  }
};

/**
 * Update session with task score
 */
export const updateTaskScore = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const { taskNumber, userScore, prestonScore, details } = req.body;

    if (!taskNumber || userScore === undefined || prestonScore === undefined) {
      return res.status(400).json({
        error: 'Missing required fields: taskNumber, userScore, prestonScore',
      });
    }

    const session = await GameSession.findById(sessionId);

    if (!session) {
      return res.status(404).json({
        error: 'Game session not found',
      });
    }

    // Add or update task score
    const existingTaskIndex = session.taskScores.findIndex(
      t => t.taskNumber === taskNumber
    );

    if (existingTaskIndex >= 0) {
      session.taskScores[existingTaskIndex] = {
        taskNumber,
        userScore,
        prestonScore,
        completedAt: new Date(),
        details,
      };
    } else {
      session.taskScores.push({
        taskNumber,
        userScore,
        prestonScore,
        completedAt: new Date(),
        details,
      });
    }

    // Recalculate totals
    session.totalUserScore = session.taskScores.reduce(
      (sum, task) => sum + task.userScore,
      0
    );
    session.totalPrestonScore = session.taskScores.reduce(
      (sum, task) => sum + task.prestonScore,
      0
    );

    // Calculate future readiness score (percentage)
    session.futureReadinessScore = Math.round(
      (session.totalUserScore / 3000) * 100
    );

    // If all 3 tasks are complete, mark as completed
    if (session.taskScores.length === 3) {
      session.completedAt = new Date();
    }

    await session.save();

    res.json({
      success: true,
      data: session,
    });
  } catch (error: any) {
    console.error('Error updating task score:', error);
    res.status(500).json({
      error: 'Failed to update task score',
      message: error.message,
    });
  }
};

/**
 * Get leaderboard
 */
export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;

    const leaderboard = await GameSession.find({ completedAt: { $exists: true } })
      .select('name agencyName totalUserScore futureReadinessScore completedAt')
      .sort({ totalUserScore: -1, completedAt: 1 })
      .limit(limit);

    const results = leaderboard.map((session, index) => ({
      rank: index + 1,
      name: session.name,
      agencyName: session.agencyName,
      totalScore: session.totalUserScore,
      futureReadinessScore: session.futureReadinessScore,
      completedAt: session.completedAt,
    }));

    res.json({
      success: true,
      data: results,
    });
  } catch (error: any) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({
      error: 'Failed to fetch leaderboard',
      message: error.message,
    });
  }
};

/**
 * Get session rank
 */
export const getSessionRank = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;

    const session = await GameSession.findById(sessionId);

    if (!session) {
      return res.status(404).json({
        error: 'Game session not found',
      });
    }

    if (!session.completedAt) {
      return res.json({
        success: true,
        rank: null,
        message: 'Session not yet completed',
      });
    }

    // Count how many sessions have a higher score
    const higherScoreCount = await GameSession.countDocuments({
      completedAt: { $exists: true },
      totalUserScore: { $gt: session.totalUserScore },
    });

    const rank = higherScoreCount + 1;

    res.json({
      success: true,
      rank,
      totalScore: session.totalUserScore,
      futureReadinessScore: session.futureReadinessScore,
    });
  } catch (error: any) {
    console.error('Error getting session rank:', error);
    res.status(500).json({
      error: 'Failed to get session rank',
      message: error.message,
    });
  }
};

/**
 * Get session details
 */
export const getSession = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;

    const session = await GameSession.findById(sessionId);

    if (!session) {
      return res.status(404).json({
        error: 'Game session not found',
      });
    }

    res.json({
      success: true,
      data: session,
    });
  } catch (error: any) {
    console.error('Error fetching session:', error);
    res.status(500).json({
      error: 'Failed to fetch session',
      message: error.message,
    });
  }
};
