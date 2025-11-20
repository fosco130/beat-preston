import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { colors, spacing, typography, shadows } from '../styles/theme';
import { Button, Card, Badge } from '../components/ui';
import { PrestonAvatar } from '../components/game/PrestonAvatar';

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${colors.darkGreen};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${spacing.md} ${spacing.lg};
`;

const Title = styled.h1`
  font-size: ${typography.sizes.h2};
  font-weight: ${typography.weights.bold};
  color: ${colors.yellow};
  margin-bottom: ${spacing.md};
  text-align: center;
`;

const ComparisonSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing.md};
  margin-bottom: ${spacing.md};
  max-width: 900px;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ResultCard = styled(Card)`
  padding: ${spacing.md};
  text-align: center;
`;

const ResultLabel = styled.div`
  font-size: ${typography.sizes.bodySmall};
  color: ${colors.textGray};
  margin-bottom: ${spacing.sm};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ResultScore = styled.div<{ variant: 'user' | 'preston' }>`
  font-size: 72px;
  font-weight: ${typography.weights.bold};
  color: ${props => (props.variant === 'user' ? colors.yellow : colors.brightGreen)};
  margin-bottom: ${spacing.md};
  line-height: 1;
`;

const ResultBreakdown = styled.div`
  font-size: ${typography.sizes.bodySmall};
  color: ${colors.textGray};
  margin-top: ${spacing.sm};
`;

const TimeComparison = styled(Card)`
  max-width: 650px;
  width: 100%;
  padding: ${spacing.md};
  margin-bottom: ${spacing.md};
  background: linear-gradient(135deg, ${colors.brightGreen} 0%, ${colors.yellow} 100%);
  text-align: center;
`;

const TimeTitle = styled.div`
  font-size: ${typography.sizes.body};
  font-weight: ${typography.weights.bold};
  color: ${colors.white};
  margin-bottom: ${spacing.xs};
`;

const TimeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing.md};
`;

const TimeBox = styled.div`
  text-align: center;
`;

const TimeLabel = styled.div`
  font-size: ${typography.sizes.small};
  color: ${colors.white};
  opacity: 0.9;
  margin-bottom: ${spacing.xs};
`;

const TimeValue = styled.div`
  font-size: ${typography.sizes.h2};
  font-weight: ${typography.weights.bold};
  color: ${colors.white};
`;

const PrestonReaction = styled(Card)`
  max-width: 700px;
  width: 100%;
  padding: ${spacing.lg};
  display: flex;
  align-items: center;
  gap: ${spacing.md};
  margin-bottom: ${spacing.lg};
`;

const PrestonMessage = styled.div`
  flex: 1;
  text-align: left;
`;

const PrestonName = styled.div`
  font-size: ${typography.sizes.bodySmall};
  font-weight: ${typography.weights.semibold};
  color: ${colors.darkGreen};
  margin-bottom: 8px;
`;

const PrestonText = styled.p`
  font-size: ${typography.sizes.body};
  color: ${colors.textDark};
  line-height: ${typography.lineHeights.normal};
  font-weight: ${typography.weights.semibold};
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

export const Task1ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const [userScore, setUserScore] = useState(0);
  const [userTime, setUserTime] = useState(90);
  const prestonScore = 1000; // Preston is perfect and instant

  useEffect(() => {
    const storedScore = sessionStorage.getItem('task1Score');
    const storedTime = sessionStorage.getItem('task1Time');
    if (storedScore) {
      setUserScore(parseInt(storedScore, 10));
    }
    if (storedTime) {
      setUserTime(parseInt(storedTime, 10));
    }
  }, []);

  const getPrestonReaction = () => {
    if (userScore >= 900) {
      return {
        expression: 'impressed' as const,
        message: "Impressive! You're fast and accurate. But remember - I do this instantly, 24/7, while you sleep. Imagine never missing a hot lead again!",
      };
    } else if (userScore >= 700) {
      return {
        expression: 'competitive' as const,
        message: "Good work! But I respond in 0 seconds, every time. While you took 90 seconds, I'd already have 100 leads qualified. That's the power of instant AI.",
      };
    } else {
      return {
        expression: 'helpful' as const,
        message: "Lead response is tough when juggling everything. I handle this in 0 seconds, 24/7. Every lead gets perfect, instant attention while you focus on closing deals.",
      };
    }
  };

  const reaction = getPrestonReaction();

  const handleNext = () => {
    navigate('/task-2-briefing');
  };

  return (
    <PageContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Badge variant="yellow" size="large" style={{ marginBottom: spacing.lg }}>
          Task 1 Complete ✓
        </Badge>

        <Title>Great Start!</Title>

        <PrestonReaction shadow="standard">
          <PrestonAvatar expression="helpful" size={150} />
          <PrestonMessage>
            <PrestonName>Preston</PrestonName>
            <PrestonText>Lead response is just the beginning. Ready to see what else I can handle for your agency?</PrestonText>
          </PrestonMessage>
        </PrestonReaction>

        <ButtonGroup>
          <Button variant="primary" size="large" onClick={handleNext}>
            Next Challenge
          </Button>
          <TextLink onClick={() => navigate('/')}>
            Start Over
          </TextLink>
        </ButtonGroup>
      </motion.div>
    </PageContainer>
  );
};
