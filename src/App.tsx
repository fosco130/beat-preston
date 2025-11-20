import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './styles/global.css';

// Lazy load pages to help with debugging
const WelcomePage = React.lazy(() => import('./pages/WelcomePage').then(m => ({ default: m.WelcomePage })));
const Task1BriefingPage = React.lazy(() => import('./pages/Task1BriefingPage').then(m => ({ default: m.Task1BriefingPage })));
const Task1GamePage = React.lazy(() => import('./pages/Task1GamePage').then(m => ({ default: m.Task1GamePage })));
const Task1ResultsPage = React.lazy(() => import('./pages/Task1ResultsPage').then(m => ({ default: m.Task1ResultsPage })));
const Task2BriefingPage = React.lazy(() => import('./pages/Task2BriefingPage').then(m => ({ default: m.Task2BriefingPage })));
const Task2GamePage = React.lazy(() => import('./pages/Task2GamePage').then(m => ({ default: m.Task2GamePage })));
const Task2ResultsPage = React.lazy(() => import('./pages/Task2ResultsPage').then(m => ({ default: m.Task2ResultsPage })));
const Task3BriefingPage = React.lazy(() => import('./pages/Task3BriefingPage').then(m => ({ default: m.Task3BriefingPage })));
const Task3GamePage = React.lazy(() => import('./pages/Task3GamePage').then(m => ({ default: m.Task3GamePage })));
const Task3ResultsPage = React.lazy(() => import('./pages/Task3ResultsPage').then(m => ({ default: m.Task3ResultsPage })));
const FinalScorePage = React.lazy(() => import('./pages/FinalScorePage').then(m => ({ default: m.FinalScorePage })));
const LeadCapturePage = React.lazy(() => import('./pages/LeadCapturePage').then(m => ({ default: m.LeadCapturePage })));

function App() {
  return (
    <BrowserRouter>
      <React.Suspense fallback={<div style={{ padding: '20px', fontSize: '18px' }}>Loading...</div>}>
        <Routes>
          <Route path="/" element={<WelcomePage />} />

        {/* Task 1: Lead Response Speed */}
        <Route path="/task-1-briefing" element={<Task1BriefingPage />} />
        <Route path="/task-1-game" element={<Task1GamePage />} />
        <Route path="/task-1-results" element={<Task1ResultsPage />} />

        {/* Task 2: Spot the Hot Seller */}
        <Route path="/task-2-briefing" element={<Task2BriefingPage />} />
        <Route path="/task-2-game" element={<Task2GamePage />} />
        <Route path="/task-2-results" element={<Task2ResultsPage />} />

        {/* Task 3: Admin Workflow Challenge */}
        <Route path="/task-3-briefing" element={<Task3BriefingPage />} />
        <Route path="/task-3-game" element={<Task3GamePage />} />
        <Route path="/task-3-results" element={<Task3ResultsPage />} />

        {/* Final Score and Lead Capture */}
        <Route path="/final-score" element={<FinalScorePage />} />
        <Route path="/lead-capture" element={<LeadCapturePage />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
}

export default App;
