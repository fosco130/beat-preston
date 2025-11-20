# Beat Preston - Backend API

Node.js/Express backend API with MongoDB for the Beat Preston game.

## Setup

### Prerequisites

- Node.js 18+
- MongoDB (local or MongoDB Atlas)

### Installation

```bash
cd server
npm install
```

### Configuration

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Update environment variables in `.env`:
```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/beat-preston
```

### Running the Server

**Development (with hot reload):**
```bash
npm run dev
```

**Production:**
```bash
npm run build
npm start
```

The API will be available at `http://localhost:3001`

## API Endpoints

### Game Sessions

#### Create Session
```
POST /api/game/session
Content-Type: application/json

{
  "name": "John Smith",
  "agencyName": "Smith Estates",
  "email": "john@smithestates.com",
  "mobile": "07700900000",
  "biggestChallenge": "lead-response"
}

Response: { success: true, sessionId: "...", data: {...} }
```

#### Get Session
```
GET /api/game/session/:sessionId

Response: { success: true, data: {...} }
```

#### Update Task Score
```
PUT /api/game/session/:sessionId/task
Content-Type: application/json

{
  "taskNumber": 1,
  "userScore": 850,
  "prestonScore": 950,
  "details": {}
}

Response: { success: true, data: {...} }
```

#### Get Leaderboard
```
GET /api/game/leaderboard?limit=10

Response: { success: true, data: [{rank, name, agencyName, totalScore, ...}] }
```

#### Get Session Rank
```
GET /api/game/session/:sessionId/rank

Response: { success: true, rank: 3, totalScore: 2500, futureReadinessScore: 83 }
```

### Health Check
```
GET /health

Response: { status: "ok", timestamp: "..." }
```

## Database Schema

### GameSession Collection

```typescript
{
  name: string,
  agencyName: string,
  email: string,
  mobile?: string,
  biggestChallenge?: string,
  taskScores: [{
    taskNumber: 1 | 2 | 3,
    userScore: number,
    prestonScore: number,
    completedAt: Date,
    details?: any
  }],
  totalUserScore: number,
  totalPrestonScore: number,
  futureReadinessScore: number,
  completedAt?: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Tech Stack

- **Runtime:** Node.js 20+
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Language:** TypeScript
- **Security:** Helmet, CORS
- **Logging:** Morgan

## Development

The server uses `ts-node-dev` for hot reloading during development. Any changes to TypeScript files will automatically restart the server.

## Production Deployment

1. Build the TypeScript code:
```bash
npm run build
```

2. Set production environment variables

3. Start the server:
```bash
npm start
```

## MongoDB Setup

### Local MongoDB

Install MongoDB locally and start it:
```bash
mongod --dbpath /path/to/data
```

### MongoDB Atlas (Cloud)

1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`
