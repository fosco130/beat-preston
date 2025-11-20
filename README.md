# Beat Preston - Interactive Game MVP

An interactive browser-based game where estate agency professionals compete against Preston, an AI-powered digital negotiator, in real-time agency tasks.

## 🎮 Game Overview

**Beat Preston** is a single-screen, browser-based competitive game designed for iPads at event booths, with TV display mirroring for audience viewing.

### Features Completed

✅ **Complete Design System**
- Exact Greenhouse OS brand colors (#1E4D42, #FDB92F, #FFB3BA, #4CAF50)
- Full typography system with Inter font
- Spacing, shadows, and animation constants

✅ **Reusable UI Components**
- Button (primary, secondary, text variants)
- Card with multiple shadow levels
- Badge with color variants
- Input & Select fields
- Timer with countdown
- ProgressBar
- FloatingCard decorations

✅ **Preston Avatar**
- 7 different expressions (neutral, competitive, impressed, victorious, helpful, thinking, celebrating)
- Simple, friendly AI character design

✅ **Screen 1: Welcome/Registration**
- Dark green hero section with yellow headline
- Floating decorative cards
- User registration form
- Greenhouse OS branding

✅ **Screens 2-4: Task 1 - Lead Response Speed**
- **Briefing:** Task introduction with Preston's challenge
- **Gameplay:** 10 real leads, 90-second timer, score tracking, Preston progress indicator
- **Results:** Score comparison with Preston, personalized feedback

✅ **Screens 5-7: Task 2 - Spot the Hot Seller**
- **Briefing:** Data analysis challenge introduction
- **Gameplay:** Interactive data table with 20 sellers, select 10 hot prospects
- **Results:** Comparison with Preston's AI selections, match insights

✅ **Screens 8-10: Task 3 - Admin Workflow Challenge**
- **Briefing:** Automation vs human touch challenge
- **Gameplay:** 20 tasks to categorize (AI or Human), time savings tracking
- **Results:** Score comparison, total weekly time savings calculation

✅ **Screen 11: Final Score Reveal**
- Comprehensive score comparison across all tasks
- Future Readiness Score with tier system (Bronze/Silver/Gold/Platinum)
- Task breakdowns with icons
- Preston's final verdict
- Leaderboard with player ranking

✅ **Screen 12: Lead Capture/CTA**
- Value proposition cards
- Demo booking form with pre-filled user data
- Success confirmation screen
- Professional footer with navigation

✅ **Backend API (Node.js/Express/MongoDB)**
- Complete REST API with TypeScript
- MongoDB database with Mongoose
- Game session management
- Leaderboard functionality
- Score tracking and ranking system

### Tech Stack

**Frontend:**
- React 18 + TypeScript
- Emotion (CSS-in-JS)
- Framer Motion (animations)
- React Router v6 (routing)
- Vite (build tool)

**Backend:**
- Node.js + Express.js
- MongoDB + Mongoose
- TypeScript
- CORS, Helmet (security)
- Morgan (logging)

## 🚀 Getting Started

### Frontend Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open http://localhost:5173/ in your browser.

### Backend Setup (Optional)

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start MongoDB (if running locally)
mongod

# Start backend server
npm run dev
```

API will be available at http://localhost:3001

See [server/README.md](server/README.md) for detailed backend documentation.

### Build for Production

```bash
# Frontend
npm run build

# Backend
cd server
npm run build
npm start
```

## 📱 iPad Optimization

The game is optimized for:
- **iPad Landscape:** 2048x1536 resolution
- **Touch Targets:** Minimum 44px for comfortable interaction
- **Fullscreen Mode:** Hide browser chrome for immersive experience

## 🎯 Complete Game Flow

1. **Welcome/Registration** - Player enters name, agency, email, challenge
2. **Task 1 Briefing** - Introduction to Lead Response Speed challenge
3. **Task 1 Game** - Categorize 10 leads in 90 seconds
4. **Task 1 Results** - Score comparison with Preston
5. **Task 2 Briefing** - Introduction to Hot Seller identification
6. **Task 2 Game** - Analyze data table and select 10 hot prospects
7. **Task 2 Results** - See matches with Preston's AI selections
8. **Task 3 Briefing** - Introduction to Admin Workflow automation
9. **Task 3 Game** - Categorize 20 tasks as AI or Human
10. **Task 3 Results** - See time savings and accuracy
11. **Final Score Reveal** - Comprehensive results, Future Readiness Score, leaderboard
12. **Lead Capture/CTA** - Demo booking and value propositions

## 🎨 Design System

### Colors
```typescript
Primary: #1E4D42 (Dark Green)
Accent: #FDB92F (Yellow)
Secondary: #FFB3BA (Pink), #4CAF50 (Green)
```

### Typography
- **Display:** Georgia serif for headlines
- **Body:** Inter sans-serif for UI

### Shadows
- Subtle: 0 2px 8px rgba(0,0,0,0.06)
- Standard: 0 4px 16px rgba(0,0,0,0.08)
- Prominent: 0 8px 24px rgba(0,0,0,0.12)

## 📂 Project Structure

```
beat-preston/
├── src/                      # Frontend source code
│   ├── components/
│   │   ├── ui/              # Button, Card, Badge, Input, Timer, etc.
│   │   ├── game/            # PrestonAvatar
│   │   └── layout/          # Logo
│   ├── pages/               # 12 game screens
│   │   ├── WelcomePage.tsx
│   │   ├── Task1-3 pages...
│   │   ├── FinalScorePage.tsx
│   │   └── LeadCapturePage.tsx
│   ├── styles/              # theme.ts, global.css
│   ├── types/               # TypeScript definitions
│   ├── data/                # 10 leads, 20 sellers, 20 admin tasks
│   └── App.tsx              # Router configuration
│
├── server/                  # Backend API
│   ├── src/
│   │   ├── models/          # MongoDB schemas
│   │   ├── controllers/     # Business logic
│   │   ├── routes/          # API endpoints
│   │   └── server.ts        # Express server
│   ├── package.json
│   └── tsconfig.json
│
├── package.json
└── README.md
```

## 🎯 Features Implemented

✅ **All 12 Screens Complete**
- Welcome/Registration
- All 3 tasks (briefing, game, results)
- Final score reveal
- Lead capture/CTA

✅ **Complete Game Logic**
- Task 1: Lead Response Speed (10 leads, 90 seconds)
- Task 2: Hot Seller Detection (20 prospects, data analysis)
- Task 3: Admin Workflow (20 tasks, AI vs Human categorization)
- Real-time scoring and Preston AI simulation
- Session state management

✅ **Full Backend API**
- RESTful endpoints for all game operations
- MongoDB database with Mongoose
- Leaderboard and ranking system
- TypeScript throughout

✅ **Professional Design**
- Exact Greenhouse OS brand implementation
- Responsive for iPad landscape
- Smooth animations with Framer Motion
- Touch-optimized interactions

## 🔜 Future Enhancements

### Production-Ready Features
- [ ] Frontend-backend integration (API calls from React)
- [ ] Real-time leaderboard updates
- [ ] User authentication/sessions
- [ ] Email notifications for demo bookings
- [ ] Analytics and tracking (Google Analytics, Mixpanel)
- [ ] Admin dashboard for viewing results

### iPad Kiosk Features
- [ ] Fullscreen kiosk mode
- [ ] Auto-reset after inactivity
- [ ] TV display mirroring setup
- [ ] Offline mode support

### Polish & Optimization
- [ ] Additional micro-animations
- [ ] Sound effects (optional)
- [ ] Loading states and error handling
- [ ] Performance optimization
- [ ] A/B testing framework

## 🎬 Live Demo

**Frontend:** http://localhost:5173/
**Backend API:** http://localhost:3001/api (optional)

### Complete Game Experience

**Play through all 12 screens:**

1. **Registration** - Enter your details
2. **Task 1** - Lead Response Speed Challenge
3. **Task 2** - Spot the Hot Sellers
4. **Task 3** - Admin Workflow Automation
5. **Final Score** - See your Future Readiness Score
6. **Lead Capture** - Book a demo

**Test all features:**
- ⚡ Real-time scoring
- 🤖 Preston AI competition
- 📊 Data analysis gameplay
- 🎯 Interactive decision making
- 🏆 Leaderboard ranking
- 📱 Touch-optimized interface

## 📊 Data & Content

**Realistic Game Data:**
- 10 estate agency lead scenarios
- 20 seller prospect profiles with engagement metrics
- 20 typical daily admin tasks

All data reflects real estate agency workflows and challenges.

## 🤝 Contributing

This is a client project MVP. For questions or customization requests, please contact the development team.

## 📄 License

Proprietary - Developed for Greenhouse OS

---

**Built with ❤️ for estate agents who want to work smarter, not harder.**

*Preston is ready when you are!* 🤖
