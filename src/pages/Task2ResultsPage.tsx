import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { colors, spacing, typography, shadows } from '../styles/theme';
import { Button, Card, Badge } from '../components/ui';
import { PrestonAvatar } from '../components/game/PrestonAvatar';
import { sellerData } from '../data/gameData';

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

const MatchPercentage = styled.div`
  font-size: ${typography.sizes.h3};
  font-weight: ${typography.weights.semibold};
  color: ${colors.darkGreen};
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
  color: ${colors.white}
`;

const InsightsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${spacing.md};
  margin-bottom: ${spacing.lg};
  max-width: 1000px;
  width: 100%;
`;

const InsightCard = styled(Card)`
  padding: ${spacing.md};
`;

const InsightTitle = styled.h3`
  font-size: ${typography.sizes.bodySmall};
  font-weight: ${typography.weights.semibold};
  color: ${colors.textDark};
  margin-bottom: ${spacing.sm};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const InsightIcon = styled.span`
  font-size: 20px;
`;

const NameList = styled.div`
  font-size: ${typography.sizes.small};
  color: ${colors.textGray};
  line-height: 1.6;
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

export const Task2ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const [userScore, setUserScore] = useState(0);
  const [userTime, setUserTime] = useState(0);
  const [userSelections, setUserSelections] = useState<string[]>([]);
  const prestonScore = 1000; // Preston gets them all right

  useEffect(() => {
    const storedScore = sessionStorage.getItem('task2Score');
    const storedTime = sessionStorage.getItem('task2Time');
    const storedSelections = sessionStorage.getItem('task2Selections');
    if (storedScore) setUserScore(parseInt(storedScore, 10));
    if (storedTime) setUserTime(parseInt(storedTime, 10));
    if (storedSelections) setUserSelections(JSON.parse(storedSelections));
  }, []);

  const hotSellerIds = sellerData.filter(s => s.isHot).map(s => s.id);
  const matches = userSelections.filter(id => hotSellerIds.includes(id));
  const userOnly = userSelections.filter(id => !hotSellerIds.includes(id));
  const prestonOnly = hotSellerIds.filter(id => !userSelections.includes(id));

  const matchPercentage = (matches.length / 10) * 100;

  const getNames = (ids: string[]) => {
    return ids.map(id => sellerData.find(s => s.id === id)?.name).filter(Boolean);
  };

  const getPrestonReaction = () => {
    if (matchPercentage >= 90) {
      return {
        expression: 'impressed' as const,
        message: "Incredible! You spotted almost all the hot sellers. Your market intuition is exceptional. Together, we'd be unstoppable!",
      };
    } else if (matchPercentage >= 70) {
      return {
        expression: 'competitive' as const,
        message: "Solid work! You've got good instincts. I analyze patterns 24/7 across thousands of properties - imagine combining your expertise with my data processing.",
      };
    } else {
      return {
        expression: 'helpful' as const,
        message: "Finding hot sellers is tough - there's so much data to process. The good news? I can analyze all this instantly and surface the best opportunities for you every day.",
      };
    }
  };

  const reaction = getPrestonReaction();

  const handleNext = () => {
    navigate('/task-3-briefing');
  };

  return (
    <PageContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Badge variant="green" size="large" style={{ marginBottom: spacing.lg }}>
          Task 2 Complete ✓
        </Badge>

        <Title>Nice Work!</Title>

        <PrestonReaction shadow="standard">
          <PrestonAvatar expression="helpful" size={90} />
          <PrestonMessage>
            <PrestonName>Preston</PrestonName>
            <PrestonText>Spotting hot sellers takes time and expertise. One more challenge to see how I can transform your workflow.</PrestonText>
          </PrestonMessage>
        </PrestonReaction>

        <ButtonGroup>
          <Button variant="primary" size="large" onClick={handleNext}>
            Final Challenge
          </Button>
          <TextLink onClick={() => navigate('/')}>
            Start Over
          </TextLink>
        </ButtonGroup>
      </motion.div>
    </PageContainer>
  );
};
