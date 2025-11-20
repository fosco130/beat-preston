import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { colors, spacing, typography, shadows, borderRadius } from '../styles/theme';
import { Button, Card, Badge, ProgressBar } from '../components/ui';
import { PrestonAvatar } from '../components/game/PrestonAvatar';
import { adminTasks } from '../data/gameData';
import type { AdminTask } from '../types/game';

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${colors.offWhite};
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  background: ${colors.white};
  padding: ${spacing.md} ${spacing.lg};
  box-shadow: ${shadows.subtle};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${spacing.sm};
`;

const HeaderLeft = styled.div`
  display: flex;
  gap: ${spacing.sm};
  align-items: center;
`;

const HeaderRight = styled.div`
  display: flex;
  gap: ${spacing.md};
  align-items: center;
`;

const ScoreBadge = styled(Badge)`
  min-width: 100px;
  font-size: 16px;
  font-weight: 700;
`;

const TimeSavedBadge = styled(Badge)`
  min-width: 120px;
  font-size: 14px;
  font-weight: 600;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${spacing.md} ${spacing.lg};
  margin-top: -${spacing.xl};
`;

const TaskCard = styled(Card)`
  max-width: 700px;
  width: 100%;
  padding: ${spacing.lg};
  margin-bottom: ${spacing.lg};
  text-align: center;
`;

const CategoryBadge = styled(Badge)`
  margin-bottom: ${spacing.md};
`;

const TaskTitle = styled.h2`
  font-size: ${typography.sizes.h3};
  font-weight: ${typography.weights.semibold};
  color: ${colors.darkGreen};
  margin-bottom: ${spacing.sm};
`;

const TaskDescription = styled.p`
  font-size: ${typography.sizes.body};
  color: ${colors.textDark};
  line-height: ${typography.lineHeights.relaxed};
  margin-bottom: ${spacing.lg};
`;

const DecisionZones = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing.md};
  max-width: 700px;
  width: 100%;
`;

const DecisionButton = styled(Button)<{ zoneType: 'ai' | 'human' }>`
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${spacing.sm};
  font-size: ${typography.sizes.body};

  ${props =>
    props.zoneType === 'ai'
      ? `
    background: ${colors.yellow};
    color: ${colors.darkGreen};
    &:hover:not(:disabled) {
      background: #FDBC42;
    }
  `
      : `
    background: ${colors.brightGreen};
    color: ${colors.white};
    &:hover:not(:disabled) {
      background: #45a049;
    }
  `}
`;

const ZoneIcon = styled.div`
  font-size: 32px;
`;

const ZoneLabel = styled.div`
  font-weight: ${typography.weights.semibold};
`;

const ProgressContainer = styled(Card)`
  width: 100%;
  max-width: 700px;
  margin-bottom: ${spacing.lg};
  display: flex;
  gap: ${spacing.sm};
  padding: ${spacing.sm} ${spacing.md};
  background: white;
  border: 3px solid ${colors.darkGreen};
  box-shadow: ${shadows.hero};

  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${spacing.sm};
  }
`;

const ProgressItem = styled.div<{ variant: 'user' | 'preston' }>`
  flex: 1;
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
  padding: ${spacing.xs} ${spacing.sm};
  border-radius: 8px;
  background: ${props => props.variant === 'user'
    ? 'linear-gradient(135deg, #FDB92F 0%, #f4a000 100%)'
    : 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)'};
  min-width: 0;
`;

const ProgressIcon = styled.div`
  font-size: 32px;
  line-height: 1;
  flex-shrink: 0;
`;

const ProgressContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const ProgressLabel = styled.div`
  font-size: ${typography.sizes.small};
  font-weight: ${typography.weights.semibold};
  color: ${colors.white};
  margin-bottom: 4px;
  white-space: nowrap;
`;

const FeedbackToast = styled(motion.div)<{ correct: boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: ${spacing.md} ${spacing.lg};
  background: ${props => (props.correct ? colors.brightGreen : colors.error)};
  color: ${colors.white};
  border-radius: ${borderRadius.md};
  box-shadow: ${shadows.prominent};
  font-weight: ${typography.weights.bold};
  z-index: 1000;
  font-size: ${typography.sizes.h3};
  text-align: center;
  min-width: 200px;
`;

export const Task3GamePage: React.FC = () => {
  const navigate = useNavigate();
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeSaved, setTimeSaved] = useState(0);
  const [userChoices, setUserChoices] = useState<Record<string, 'ai' | 'human'>>({});
  const [startTime, setStartTime] = useState<number>(0);
  const [feedback, setFeedback] = useState<{ show: boolean; correct: boolean; message: string }>({
    show: false,
    correct: false,
    message: '',
  });

  const currentTask = adminTasks[currentTaskIndex];
  const totalTasks = adminTasks.length;

  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  const handleDecision = (choice: 'ai' | 'human') => {
    const isCorrect = choice === currentTask.correctAnswer;

    // Store user choice
    setUserChoices(prev => ({ ...prev, [currentTask.id]: choice }));

    // Calculate final values before state update
    let finalScore = score;
    let finalTimeSaved = timeSaved;

    if (isCorrect) {
      finalScore = score + currentTask.points;
      setScore(finalScore);
      if (choice === 'ai') {
        finalTimeSaved = timeSaved + currentTask.timeSaved;
        setTimeSaved(finalTimeSaved);
      }
      setFeedback({ show: true, correct: true, message: `✓ Correct! +${currentTask.points}` });
    } else {
      setFeedback({ show: true, correct: false, message: '✗ Not quite' });
    }

    // Hide feedback and move to next
    setTimeout(() => {
      setFeedback({ show: false, correct: false, message: '' });
      if (currentTaskIndex < totalTasks - 1) {
        setCurrentTaskIndex(prev => prev + 1);
      } else {
        // Game complete - use final calculated values
        const elapsedTime = Math.round((Date.now() - startTime) / 1000);
        sessionStorage.setItem('task3Score', finalScore.toString());
        sessionStorage.setItem('task3Time', elapsedTime.toString());
        sessionStorage.setItem('task3TimeSaved', finalTimeSaved.toFixed(1));
        sessionStorage.setItem('task3Choices', JSON.stringify(userChoices));
        navigate('/task-3-results');
      }
    }, 800);
  };

  return (
    <PageContainer>
      <Header>
        <HeaderLeft>
          <Badge variant="pink">Task 3: Admin Workflow</Badge>
          <Badge variant="gray">
            {currentTaskIndex + 1}/{totalTasks}
          </Badge>
        </HeaderLeft>
        <HeaderRight>
          <TimeSavedBadge variant="green">{timeSaved.toFixed(1)} hrs/week</TimeSavedBadge>
          <ScoreBadge variant="yellow">Score: {score}</ScoreBadge>
        </HeaderRight>
      </Header>

      <MainContent>
        {/* Combined Progress Indicator */}
        <ProgressContainer shadow="hero">
          <ProgressItem variant="user">
            <ProgressIcon>👤</ProgressIcon>
            <ProgressContent>
              <ProgressLabel>
                You: {currentTaskIndex}/{totalTasks}
              </ProgressLabel>
              <ProgressBar value={currentTaskIndex} max={totalTasks} variant="yellow" height={6} />
            </ProgressContent>
          </ProgressItem>

          <ProgressItem variant="preston">
            <PrestonAvatar expression="competitive" size={36} />
            <ProgressContent>
              <ProgressLabel>
                Preston™: {Math.min(currentTaskIndex + 6, totalTasks)}/{totalTasks}
              </ProgressLabel>
              <ProgressBar
                value={Math.min(currentTaskIndex + 6, totalTasks)}
                max={totalTasks}
                variant="yellow"
                height={6}
              />
            </ProgressContent>
          </ProgressItem>
        </ProgressContainer>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentTaskIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <TaskCard shadow="prominent">
              <CategoryBadge variant="gray" size="small">
                {currentTask.category}
              </CategoryBadge>

              <TaskTitle>{currentTask.title}</TaskTitle>
              <TaskDescription>{currentTask.description}</TaskDescription>
            </TaskCard>

            <DecisionZones>
              <DecisionButton zoneType="ai" onClick={() => handleDecision('ai')}>
                <ZoneIcon>🤖</ZoneIcon>
                <ZoneLabel>AI Can Handle This</ZoneLabel>
              </DecisionButton>

              <DecisionButton zoneType="human" onClick={() => handleDecision('human')}>
                <ZoneIcon>👤</ZoneIcon>
                <ZoneLabel>Needs Human Touch</ZoneLabel>
              </DecisionButton>
            </DecisionZones>
          </motion.div>
        </AnimatePresence>
      </MainContent>

      {/* Feedback Toast */}
      <AnimatePresence>
        {feedback.show && (
          <FeedbackToast
            correct={feedback.correct}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            {feedback.message}
          </FeedbackToast>
        )}
      </AnimatePresence>
    </PageContainer>
  );
};
