import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { colors, spacing, typography, shadows, borderRadius } from '../styles/theme';
import { Button, Card, Badge, Timer, ProgressBar } from '../components/ui';
import { PrestonAvatar } from '../components/game/PrestonAvatar';
import { leads } from '../data/gameData';
import type { Lead } from '../types/game';

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
  font-size: 18px;
  font-weight: 700;
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

const LeadCard = styled(Card)`
  max-width: 800px;
  width: 100%;
  padding: ${spacing.lg};
  position: relative;
`;

const NewBadge = styled(Badge)`
  position: absolute;
  top: ${spacing.md};
  right: ${spacing.md};
`;

const LeadName = styled.h2`
  font-size: ${typography.sizes.h3};
  font-weight: ${typography.weights.semibold};
  color: ${colors.darkGreen};
  margin-bottom: ${spacing.sm};
`;

const LeadType = styled(Badge)`
  margin-bottom: ${spacing.md};
`;

const LeadMessage = styled.p`
  font-size: ${typography.sizes.body};
  color: ${colors.textDark};
  line-height: ${typography.lineHeights.relaxed};
  margin-bottom: ${spacing.md};
  padding: ${spacing.md};
  background: ${colors.offWhite};
  border-radius: ${borderRadius.sm};
  font-weight: ${typography.weights.bold};
  position: relative;

  &::before {
    content: '"';
    font-size: 1.5em;
    line-height: 0;
    position: relative;
    top: 0.15em;
  }

  &::after {
    content: '"';
    font-size: 1.5em;
    line-height: 0;
    position: relative;
    top: 0.15em;
  }
`;

const PropertyDetails = styled.p`
  font-size: ${typography.sizes.bodySmall};
  color: ${colors.textGray};
  margin-bottom: ${spacing.lg};
  font-weight: ${typography.weights.medium};
`;

const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing.sm};
`;

const ActionButton = styled(Button)`
  height: 60px;
  font-size: ${typography.sizes.bodySmall};
`;

const ProgressContainer = styled(Card)`
  width: 100%;
  max-width: 800px;
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
  padding: ${spacing.lg} ${spacing.xl};
  background: ${props => (props.correct ? colors.brightGreen : colors.error)};
  color: ${colors.white};
  border-radius: ${borderRadius.lg};
  box-shadow: ${shadows.hero};
  font-weight: ${typography.weights.bold};
  z-index: 1001;
  font-size: ${typography.sizes.h2};
  text-align: center;
  min-width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4px solid ${colors.white};
`;

export const Task1GamePage: React.FC = () => {
  const navigate = useNavigate();
  const [currentLeadIndex, setCurrentLeadIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [prestonProgress, setPrestonProgress] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [feedback, setFeedback] = useState<{ show: boolean; correct: boolean; message: string }>({
    show: false,
    correct: false,
    message: '',
  });

  const currentLead = leads[currentLeadIndex];
  const totalLeads = leads.length;

  // Start game timer
  useEffect(() => {
    setGameStarted(true);
    setStartTime(Date.now());
  }, []);

  // Preston automated progress (he's faster!)
  useEffect(() => {
    if (!gameStarted) return;

    const prestonInterval = setInterval(() => {
      setPrestonProgress(prev => {
        const newProgress = prev + 1;
        if (newProgress >= totalLeads) {
          clearInterval(prestonInterval);
        }
        return Math.min(newProgress, totalLeads);
      });
    }, 2000); // Preston completes one every 2 seconds - blazing fast!

    return () => clearInterval(prestonInterval);
  }, [gameStarted, totalLeads]);

  const handleAction = (action: string) => {
    const isCorrect = action === currentLead.correctAction;

    // Calculate final score before state update
    let finalScore = score;

    // Show feedback
    if (isCorrect) {
      finalScore = score + currentLead.points;
      setScore(finalScore);
      setFeedback({ show: true, correct: true, message: `✓ Correct! +${currentLead.points}` });
      setTimeout(() => {
        setFeedback({ show: false, correct: false, message: '' });
      }, 800);
    } else {
      setFeedback({ show: true, correct: false, message: '✗ Not quite' });
      setTimeout(() => setFeedback({ show: false, correct: false, message: '' }), 800);
    }

    // Move to next lead or finish
    if (currentLeadIndex < totalLeads - 1) {
      setTimeout(() => setCurrentLeadIndex(prev => prev + 1), 900);
    } else {
      // Game complete - use final calculated value
      setTimeout(() => {
        const elapsedTime = Math.round((Date.now() - startTime) / 1000);
        sessionStorage.setItem('task1Score', finalScore.toString());
        sessionStorage.setItem('task1Time', elapsedTime.toString());
        navigate('/task-1-results');
      }, 1000);
    }
  };

  const handleTimeUp = () => {
    const elapsedTime = 90; // Time ran out
    sessionStorage.setItem('task1Score', score.toString());
    sessionStorage.setItem('task1Time', elapsedTime.toString());
    navigate('/task-1-results');
  };

  return (
    <PageContainer>
      <Header>
        <HeaderLeft>
          <Badge variant="yellow">Task 1: Lead Response</Badge>
          <Badge variant="gray">
            {currentLeadIndex + 1}/{totalLeads}
          </Badge>
        </HeaderLeft>
        <HeaderRight>
          <ScoreBadge variant="yellow">Score: {score}</ScoreBadge>
          <Timer duration={90} onComplete={handleTimeUp} variant="yellow" />
        </HeaderRight>
      </Header>

      <MainContent>
        {/* Combined Progress Indicator */}
        <ProgressContainer shadow="hero">
          <ProgressItem variant="user">
            <ProgressIcon>👤</ProgressIcon>
            <ProgressContent>
              <ProgressLabel>
                You: {currentLeadIndex}/{totalLeads}
              </ProgressLabel>
              <ProgressBar value={currentLeadIndex} max={totalLeads} variant="yellow" height={6} />
            </ProgressContent>
          </ProgressItem>

          <ProgressItem variant="preston">
            <PrestonAvatar expression="competitive" size={72} />
            <ProgressContent>
              <ProgressLabel>
                Preston™: {prestonProgress}/{totalLeads}
              </ProgressLabel>
              <ProgressBar value={prestonProgress} max={totalLeads} variant="yellow" height={6} />
            </ProgressContent>
          </ProgressItem>
        </ProgressContainer>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentLeadIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{ width: '100%', maxWidth: '800px' }}
          >
            <LeadCard shadow="prominent">
              <NewBadge variant="yellow" size="small">
                NEW
              </NewBadge>

              <LeadName>{currentLead.name}</LeadName>
              <LeadType variant="gray" size="small">
                {currentLead.type}
              </LeadType>

              <LeadMessage>{currentLead.message}</LeadMessage>

              <PropertyDetails>{currentLead.property}</PropertyDetails>

              <ActionGrid>
                <ActionButton variant="primary" onClick={() => handleAction('book_viewing')}>
                  📅 Book Viewing
                </ActionButton>
                <ActionButton variant="primary" onClick={() => handleAction('book_valuation')}>
                  🏠 Book Valuation
                </ActionButton>
                <ActionButton variant="secondary" onClick={() => handleAction('nurture')}>
                  💬 Nurture Lead
                </ActionButton>
                <ActionButton variant="secondary" onClick={() => handleAction('follow_up')}>
                  ⏰ Follow Up Later
                </ActionButton>
              </ActionGrid>
            </LeadCard>
          </motion.div>
        </AnimatePresence>
      </MainContent>

      {/* Feedback Toast */}
      <AnimatePresence>
        {feedback.show && (
          <FeedbackToast
            correct={feedback.correct}
            initial={{ opacity: 0, scale: 0.8, x: '-50%', y: '-50%' }}
            animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
            exit={{ opacity: 0, scale: 0.8, x: '-50%', y: '-50%' }}
          >
            {feedback.message}
          </FeedbackToast>
        )}
      </AnimatePresence>
    </PageContainer>
  );
};
