import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { colors, spacing, typography, shadows, borderRadius } from '../styles/theme';
import { Button, Card, Badge } from '../components/ui';
import { PrestonAvatar } from '../components/game/PrestonAvatar';
import { Logo } from '../components/layout/Logo';

// Confetti Component
const Confetti = styled(motion.div)<{ color: string; left: string; delay: number }>`
  position: fixed;
  width: 10px;
  height: 10px;
  background: ${props => props.color};
  left: ${props => props.left};
  top: -20px;
  z-index: 1000;
  opacity: 0.8;
`;

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${colors.darkGreen};
  padding: ${spacing.sm} ${spacing.md};
  overflow-y: auto;
`;

const ContentWrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const LogoHeader = styled.div`
  display: flex;
  justify-content: center;
  padding: ${spacing.md} 0;
  margin-bottom: ${spacing.md};
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${spacing.sm};
`;

const Title = styled.h1`
  font-size: ${typography.sizes.h1};
  font-weight: ${typography.weights.bold};
  color: ${colors.yellow};
  margin-bottom: ${spacing.xs};

  @media (max-width: 768px) {
    font-size: ${typography.sizes.h2};
  }
`;

const Subtitle = styled.p`
  font-size: ${typography.sizes.body};
  color: ${colors.white};
  opacity: 0.9;
  font-weight: ${typography.weights.semibold};
`;

const ScoreSection = styled(Card)`
  padding: ${spacing.md} ${spacing.lg};
  margin-bottom: ${spacing.sm};
  text-align: center;
  background: ${colors.white};
`;

const ScoreComparison = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: ${spacing.md};
  align-items: center;
  margin-bottom: ${spacing.md};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${spacing.sm};
  }
`;

const ScoreColumn = styled.div`
  text-align: center;
`;

const ScoreLabel = styled.div`
  font-size: ${typography.sizes.bodySmall};
  color: ${colors.textGray};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: ${spacing.sm};
  font-weight: ${typography.weights.bold};
`;

const ScoreNumber = styled.div<{ variant: 'user' | 'preston' }>`
  font-size: 84px;
  font-weight: ${typography.weights.bold};
  color: ${props => (props.variant === 'user' ? colors.yellow : colors.brightGreen)};
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 64px;
  }
`;

const VsDivider = styled.div`
  font-size: ${typography.sizes.h2};
  font-weight: ${typography.weights.bold};
  color: ${colors.textGray};

  @media (max-width: 768px) {
    display: none;
  }
`;

const BreakdownSection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${spacing.md};
  margin: ${spacing.lg} 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TaskBreakdownCard = styled(Card)`
  padding: ${spacing.md};
  text-align: center;
  border-left: 4px solid ${colors.yellow};
`;

const TaskLabel = styled.div`
  font-size: ${typography.sizes.small};
  color: ${colors.textGray};
  margin-bottom: ${spacing.xs};
  font-weight: ${typography.weights.bold};
`;

const TaskScore = styled.div`
  font-size: ${typography.sizes.h2};
  font-weight: ${typography.weights.bold};
  color: ${colors.darkGreen};
`;

const TaskMaxScore = styled.span`
  font-size: ${typography.sizes.body};
  font-weight: ${typography.weights.medium};
  color: ${colors.textGray};
`;

const TaskIcon = styled.div`
  font-size: 24px;
  margin-bottom: ${spacing.xs};
`;

const TimeSavingsSection = styled(Card)`
  padding: ${spacing.md} ${spacing.lg};
  text-align: center;
  margin-bottom: ${spacing.sm};
  background: linear-gradient(135deg, ${colors.yellow} 0%, ${colors.brightGreen} 100%);
  color: ${colors.white};
  box-shadow: ${shadows.hero};
`;

const TimeSavingsTitle = styled.h2`
  font-size: ${typography.sizes.h4};
  font-weight: ${typography.weights.bold};
  margin-bottom: ${spacing.xs};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const TimeSavingsNumber = styled.div`
  font-size: 64px;
  font-weight: ${typography.weights.bold};
  line-height: 1;
  margin-bottom: ${spacing.xs};
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    font-size: 56px;
  }
`;

const TimeSavingsSubtext = styled.div`
  font-size: ${typography.sizes.body};
  font-weight: ${typography.weights.semibold};
  margin-bottom: ${spacing.xs};
`;

const TimeSavingsDetail = styled.div`
  font-size: ${typography.sizes.bodySmall};
  opacity: 0.95;
  font-weight: ${typography.weights.semibold};
`;

const FutureReadinessSection = styled(Card)`
  padding: ${spacing.md} ${spacing.lg};
  text-align: center;
  margin-bottom: ${spacing.sm};
  background: ${colors.white};
`;

const ReadinessLabel = styled.h2`
  font-size: ${typography.sizes.h4};
  font-weight: ${typography.weights.semibold};
  margin-bottom: ${spacing.xs};
  color: ${colors.darkGreen};
`;

const ReadinessScore = styled.div`
  font-size: 64px;
  font-weight: ${typography.weights.bold};
  line-height: 1;
  margin-bottom: ${spacing.xs};
  color: ${colors.darkGreen};

  @media (max-width: 768px) {
    font-size: 56px;
  }
`;

const ReadinessTier = styled.div`
  font-size: ${typography.sizes.h4};
  font-weight: ${typography.weights.semibold};
  margin-bottom: ${spacing.sm};
  color: ${colors.brightGreen};
`;

const ReadinessDescription = styled.p`
  font-size: ${typography.sizes.body};
  color: ${colors.textGray};
  max-width: 600px;
  margin: 0 auto;
  line-height: ${typography.lineHeights.relaxed};
`;

const PrestonVerdict = styled(Card)`
  padding: ${spacing.md};
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  margin-bottom: ${spacing.sm};

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const PrestonMessage = styled.div`
  flex: 1;
`;

const PrestonName = styled.div`
  font-size: ${typography.sizes.bodySmall};
  font-weight: ${typography.weights.bold};
  color: ${colors.darkGreen};
  margin-bottom: 8px;
`;

const PrestonText = styled.p`
  font-size: ${typography.sizes.body};
  color: ${colors.textDark};
  line-height: ${typography.lineHeights.relaxed};
  font-weight: ${typography.weights.semibold};
`;

const LeaderboardSection = styled(Card)`
  padding: ${spacing.md};
  margin-bottom: ${spacing.sm};
`;

const LeaderboardTitle = styled.h3`
  font-size: ${typography.sizes.body};
  font-weight: ${typography.weights.bold};
  color: ${colors.darkGreen};
  margin-bottom: ${spacing.sm};
  text-align: center;
`;

const LeaderboardTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
`;

const LeaderboardRow = styled.div<{ highlight?: boolean }>`
  display: grid;
  grid-template-columns: 60px 1fr 120px;
  gap: ${spacing.sm};
  padding: ${spacing.sm} ${spacing.md};
  background: ${props => (props.highlight ? 'rgba(253, 185, 47, 0.15)' : colors.offWhite)};
  border-radius: ${borderRadius.sm};
  align-items: center;
`;

const Rank = styled.div<{ highlight?: boolean }>`
  font-size: ${typography.sizes.h4};
  font-weight: ${typography.weights.bold};
  color: ${props => (props.highlight ? colors.yellow : colors.textGray)};
`;

const PlayerName = styled.div`
  font-size: ${typography.sizes.bodySmall};
  color: ${colors.textDark};
  font-weight: ${typography.weights.semibold};
`;

const PlayerScore = styled.div`
  font-size: ${typography.sizes.bodySmall};
  font-weight: ${typography.weights.bold};
  color: ${colors.darkGreen};
  text-align: right;
`;

const ActionSection = styled.div`
  text-align: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
  align-items: center;
`;

const TextLink = styled.button`
  background: none;
  border: none;
  color: ${colors.white};
  font-size: ${typography.sizes.bodySmall};
  text-decoration: underline;
  cursor: pointer;
  opacity: 0.8;
  padding: ${spacing.xs};

  &:hover {
    opacity: 1;
  }
`;

export const FinalScorePage: React.FC = () => {
  const navigate = useNavigate();
  const [scores, setScores] = useState({
    task1: 0,
    task2: 0,
    task3: 0,
    total: 0,
  });
  const [timeSaved, setTimeSaved] = useState(0);

  useEffect(() => {
    // Scroll to top when page loads - use scrollTo with behavior: auto to prevent smooth scrolling issues
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    const task1 = parseInt(sessionStorage.getItem('task1Score') || '0', 10);
    const task2 = parseInt(sessionStorage.getItem('task2Score') || '0', 10);
    const task3 = parseInt(sessionStorage.getItem('task3Score') || '0', 10);
    const total = task1 + task2 + task3;

    // Get saved time from Task 3, or calculate based on score if not available
    let savedTime = parseFloat(sessionStorage.getItem('task3TimeSaved') || '0');
    if (savedTime === 0 && task3 > 0) {
      // Estimate based on score (max 11.6 hours for perfect score)
      savedTime = (task3 / 1000) * 11.6;
    } else if (savedTime === 0) {
      // Default if no data
      savedTime = 10.5;
    }

    setScores({ task1, task2, task3, total });
    setTimeSaved(savedTime);

    // Force scroll again after a brief moment to ensure it sticks
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, 50);
  }, []);

  const prestonTotal = 2950; // Preston total across all tasks
  const futureReadinessScore = Math.round((scores.total / 3000) * 100);

  const getTier = (score: number) => {
    if (score >= 90) return { tier: 'Platinum', color: '#E5E4E2' };
    if (score >= 75) return { tier: 'Gold', color: colors.yellow };
    if (score >= 60) return { tier: 'Silver', color: '#C0C0C0' };
    return { tier: 'Bronze', color: '#CD7F32' };
  };

  const tierData = getTier(futureReadinessScore);

  const getPrestonVerdict = () => {
    if (futureReadinessScore >= 90) {
      return {
        expression: 'victorious' as const,
        message: "Outstanding! You're clearly AI-ready and understand how to leverage technology while maintaining the human touch. Your agency could be leading the market with the right tools!",
      };
    } else if (futureReadinessScore >= 75) {
      return {
        expression: 'impressed' as const,
        message: "Impressive performance! You've got strong instincts for where AI helps and where humans excel. With the right implementation, you could reclaim 10+ hours per week.",
      };
    } else if (futureReadinessScore >= 60) {
      return {
        expression: 'helpful' as const,
        message: "Good effort! You're starting to see where AI can help. The opportunity is huge - agents using our platform are closing 30% more deals by focusing on relationships instead of admin.",
      };
    } else {
      return {
        expression: 'helpful' as const,
        message: "Thanks for playing! The good news is there's massive opportunity here. Most agents spend 50% of their time on tasks I could handle instantly. Let's talk about transforming your workflow!",
      };
    }
  };

  const verdict = getPrestonVerdict();

  // Mock leaderboard data - dynamically sorted
  const leaderboardData = [
    { name: 'James Wilson', agency: 'Wilson Estates', score: 2850, highlight: false },
    { name: 'Sarah Thompson', agency: 'Thompson Properties', score: 2720, highlight: false },
    { name: 'You', agency: '', score: scores.total, highlight: true },
    { name: 'Michael Brown', agency: 'Brown & Co', score: 2580, highlight: false },
    { name: 'Lisa Martinez', agency: 'Martinez Realty', score: 2490, highlight: false },
  ];

  // Sort by score descending and add ranks
  const leaderboard = leaderboardData
    .sort((a, b) => b.score - a.score)
    .map((entry, index) => ({
      ...entry,
      rank: index + 1,
    }))
    .slice(0, 5); // Show top 5

  // Generate confetti
  const confettiColors = [colors.yellow, colors.brightGreen, colors.pink, colors.white];
  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    color: confettiColors[i % confettiColors.length],
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2,
  }));

  return (
    <PageContainer>
      {/* Confetti Animation */}
      {confettiPieces.map(piece => (
        <Confetti
          key={piece.id}
          color={piece.color}
          left={piece.left}
          delay={piece.delay}
          initial={{ y: -20, rotate: 0, opacity: 0 }}
          animate={{
            y: window.innerHeight + 20,
            rotate: 360 * 3,
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: 'linear',
          }}
        />
      ))}

      <ContentWrapper>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: 'spring' }}
        >
          <LogoHeader>
            <Logo variant="light" size="medium" />
          </LogoHeader>

          <Header>
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Title>🎉 Your Final Score! 🎉</Title>
              <Subtitle>How did you measure up against Preston™?</Subtitle>
            </motion.div>
          </Header>

          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5, type: 'spring' }}
          >
            <PrestonVerdict shadow="prominent">
              <PrestonAvatar expression={verdict.expression} size={100} />
              <PrestonMessage>
                <PrestonName>Preston™'s Verdict</PrestonName>
                <PrestonText>{verdict.message}</PrestonText>
              </PrestonMessage>
            </PrestonVerdict>
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5, type: 'spring', bounce: 0.4 }}
          >
            <ScoreSection shadow="hero">
              <ScoreComparison>
                <ScoreColumn>
                  <ScoreLabel>Your Total</ScoreLabel>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.6, type: 'spring', bounce: 0.5 }}
                  >
                    <ScoreNumber variant="user">{scores.total}</ScoreNumber>
                  </motion.div>
                </ScoreColumn>
                <VsDivider>VS</VsDivider>
                <ScoreColumn>
                  <ScoreLabel>Preston™'s Total</ScoreLabel>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.6, type: 'spring', bounce: 0.5 }}
                  >
                    <ScoreNumber variant="preston">{prestonTotal}</ScoreNumber>
                  </motion.div>
                </ScoreColumn>
              </ScoreComparison>
            </ScoreSection>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.5 }}
          >
            <LeaderboardSection shadow="standard">
              <LeaderboardTitle>🏆 Today's Leaderboard</LeaderboardTitle>
              <LeaderboardTable>
                {leaderboard.map((entry, index) => (
                  <motion.div
                    key={entry.rank}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.2 + index * 0.1, duration: 0.3 }}
                  >
                    <LeaderboardRow highlight={entry.highlight}>
                      <Rank highlight={entry.highlight}>#{entry.rank}</Rank>
                      <PlayerName>
                        {entry.name}
                        {entry.agency && ` - ${entry.agency}`}
                      </PlayerName>
                      <PlayerScore>{entry.score} pts</PlayerScore>
                    </LeaderboardRow>
                  </motion.div>
                ))}
              </LeaderboardTable>
            </LeaderboardSection>
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.5, type: 'spring' }}
          >
            <BreakdownSection>
              {[
                { icon: '⚡', label: 'Task 1: Lead Response', score: scores.task1, max: 1000, delay: 2.0 },
                { icon: '🔍', label: 'Task 2: Hot Sellers', score: scores.task2, max: 1000, delay: 2.1 },
                { icon: '⚙️', label: 'Task 3: Admin Tasks', score: scores.task3, max: 1000, delay: 2.2 },
              ].map((task, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: task.delay, duration: 0.4 }}
                >
                  <TaskBreakdownCard shadow="subtle">
                    <TaskIcon>{task.icon}</TaskIcon>
                    <TaskLabel>{task.label}</TaskLabel>
                    <TaskScore>
                      {task.score} <TaskMaxScore>out of {task.max}</TaskMaxScore>
                    </TaskScore>
                  </TaskBreakdownCard>
                </motion.div>
              ))}
            </BreakdownSection>
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 2.4, duration: 0.6, type: 'spring' }}
          >
            <TimeSavingsSection shadow="hero">
              <TimeSavingsTitle>What You Could Save With Greenhouse OS & Preston™</TimeSavingsTitle>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ delay: 2.6, duration: 0.6, repeat: 2 }}
              >
                <TimeSavingsNumber>{(timeSaved * 5).toFixed(0)}+</TimeSavingsNumber>
              </motion.div>
              <TimeSavingsSubtext>hours per week (5 agent agency)</TimeSavingsSubtext>
              <TimeSavingsDetail>
                {Math.round((timeSaved * 5 * 52) / 40)}+ weeks of productive work reclaimed every year
              </TimeSavingsDetail>
              <TimeSavingsDetail style={{ marginTop: spacing.sm, fontWeight: typography.weights.bold, fontSize: typography.sizes.body }}>
                = 30% more deals closed & significantly higher profits
              </TimeSavingsDetail>
            </TimeSavingsSection>
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 3.6, duration: 0.5, type: 'spring' }}
          >
            <ActionSection>
              <ButtonGroup>
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ delay: 3.8, duration: 1, repeat: Infinity, repeatDelay: 2 }}
                >
                  <Button variant="primary" size="large" onClick={() => window.open('https://calendly.com', '_blank')}>
                    Book Your Free Demo
                  </Button>
                </motion.div>
                <TextLink onClick={() => navigate('/')}>
                  Play Again
                </TextLink>
              </ButtonGroup>
            </ActionSection>
          </motion.div>
        </motion.div>
      </ContentWrapper>
    </PageContainer>
  );
};
