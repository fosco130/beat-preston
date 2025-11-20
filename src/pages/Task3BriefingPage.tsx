import React from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { colors, spacing, typography, shadows } from '../styles/theme';
import { Button, Card, Badge } from '../components/ui';
import { PrestonAvatar } from '../components/game/PrestonAvatar';

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${colors.darkGreen};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${spacing.xl};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 300px;
    height: 400px;
    background-image: url('/marketplace-left.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: left center;
    opacity: 0.15;
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 300px;
    height: 400px;
    background-image: url('/marketplace-right.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: right center;
    opacity: 0.15;
    z-index: 1;
  }

  @media (max-width: 968px) {
    &::before,
    &::after {
      width: 200px;
      height: 300px;
      opacity: 0.1;
    }
  }
`;

const ContentCard = styled(Card)`
  max-width: 900px;
  width: 100%;
  text-align: center;
  padding: ${spacing.xl};
  position: relative;
  z-index: 10;
`;

const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.md};
  margin-bottom: ${spacing.lg};
`;

const TaskIcon = styled.div`
  width: 60px;
  height: 60px;
  background: ${colors.pink};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  box-shadow: ${shadows.standard};
  flex-shrink: 0;
`;

const Title = styled.h1`
  font-size: ${typography.sizes.h1};
  font-weight: ${typography.weights.bold};
  color: ${colors.darkGreen};
  margin-bottom: ${spacing.md};
`;

const Description = styled.p`
  font-size: ${typography.sizes.body};
  font-weight: ${typography.weights.bold};
  color: ${colors.textDark};
  line-height: ${typography.lineHeights.relaxed};
  margin-bottom: ${spacing.lg};
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const PrestonSection = styled.div`
  background: white;
  border: 4px solid ${colors.darkGreen};
  border-radius: 12px;
  padding: ${spacing.lg};
  margin: ${spacing.lg} 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing.md};
  box-shadow: ${shadows.standard};
`;

const PrestonMessage = styled.div`
  flex: 1;
  text-align: center;
`;

const PrestonText = styled.p`
  font-size: ${typography.sizes.h3};
  color: ${colors.darkGreen};
  line-height: ${typography.lineHeights.normal};
  font-weight: ${typography.weights.bold};
`;

const TaskDetails = styled.div`
  display: flex;
  justify-content: center;
  gap: ${spacing.lg};
  margin: ${spacing.lg} 0;
  flex-wrap: wrap;
  background: ${colors.brightGreen};
  padding: ${spacing.lg};
  border-radius: 12px;
  box-shadow: ${shadows.standard};
`;

const DetailItem = styled.div`
  text-align: center;
`;

const DetailNumber = styled.div`
  font-size: ${typography.sizes.h2};
  font-weight: ${typography.weights.bold};
  color: ${colors.white};
`;

const DetailLabel = styled.div`
  font-size: ${typography.sizes.small};
  color: ${colors.white};
  margin-top: 4px;
  opacity: 0.9;
`;

export const Task3BriefingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/task-3-game');
  };

  return (
    <PageContainer>
      <ContentCard shadow="hero">
        <HeaderSection>
          <Badge variant="pink" size="large">
            Task 3 of 3
          </Badge>
          <TaskIcon>⚙️</TaskIcon>
        </HeaderSection>

        <Title>Admin Workflow Challenge</Title>

        <TaskDetails>
          <DetailItem>
            <DetailNumber>10</DetailNumber>
            <DetailLabel>Tasks</DetailLabel>
          </DetailItem>
          <DetailItem>
            <DetailNumber>10+</DetailNumber>
            <DetailLabel>Hours Saved/Week</DetailLabel>
          </DetailItem>
          <DetailItem>
            <DetailNumber>1000</DetailNumber>
            <DetailLabel>Max Points</DetailLabel>
          </DetailItem>
        </TaskDetails>

        <Description>
          10 daily tasks. Decide which AI can handle, which need you.
        </Description>

        <PrestonSection>
          <PrestonAvatar expression="helpful" size={80} />
          <PrestonMessage>
            <PrestonText>
              "I handle routine admin 24/7. You handle what matters. Let's see if you know the difference." — Preston™
            </PrestonText>
          </PrestonMessage>
        </PrestonSection>

        <Button variant="primary" size="large" onClick={handleStart}>
          Let's Sort These Tasks
        </Button>
      </ContentCard>
    </PageContainer>
  );
};
