import mongoose, { Schema, Document } from 'mongoose';

export interface ITaskScore {
  taskNumber: 1 | 2 | 3;
  userScore: number;
  prestonScore: number;
  completedAt: Date;
  details?: any;
}

export interface IGameSession extends Document {
  name: string;
  agencyName: string;
  email: string;
  mobile?: string;
  biggestChallenge?: string;
  taskScores: ITaskScore[];
  totalUserScore: number;
  totalPrestonScore: number;
  futureReadinessScore: number;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TaskScoreSchema = new Schema({
  taskNumber: {
    type: Number,
    required: true,
    enum: [1, 2, 3],
  },
  userScore: {
    type: Number,
    required: true,
  },
  prestonScore: {
    type: Number,
    required: true,
  },
  completedAt: {
    type: Date,
    default: Date.now,
  },
  details: Schema.Types.Mixed,
});

const GameSessionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    agencyName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    mobile: {
      type: String,
    },
    biggestChallenge: {
      type: String,
    },
    taskScores: [TaskScoreSchema],
    totalUserScore: {
      type: Number,
      default: 0,
    },
    totalPrestonScore: {
      type: Number,
      default: 0,
    },
    futureReadinessScore: {
      type: Number,
      default: 0,
    },
    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Index for leaderboard queries
GameSessionSchema.index({ totalUserScore: -1, completedAt: -1 });

export const GameSession = mongoose.model<IGameSession>('GameSession', GameSessionSchema);
