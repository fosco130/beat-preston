import React from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { colors, spacing, typography, borderRadius, shadows } from '../styles/theme';
import { Button, Card } from '../components/ui';
import { Logo } from '../components/layout/Logo';
import { PrestonAvatar } from '../components/game/PrestonAvatar';

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${colors.darkGreen};
  display: flex;
  flex-direction: column;
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

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${spacing.md} ${spacing.xl};
  position: relative;
  z-index: 10;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.md};
`;

const LinkedInIcon = styled.a`
  color: ${colors.white};
  font-size: 24px;
  text-decoration: none;
  transition: opacity 200ms;

  &:hover {
    opacity: 0.8;
  }
`;

const HeroSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${spacing.md} ${spacing.md} ${spacing.lg};
  position: relative;
  z-index: 5;
  text-align: center;
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.xl};
  margin-bottom: ${spacing.md};

  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${spacing.md};
  }
`;

const PrestonShowcase = styled.div``;

const PrizeRoundel = styled.div`
  position: relative;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${colors.yellow} 0%, ${colors.pink} 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: ${shadows.hero};
  border: 4px solid ${colors.white};
  animation: pulse 2s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      box-shadow: ${shadows.hero};
    }
    50% {
      transform: scale(1.05);
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
    }
  }

  @media (max-width: 768px) {
    width: 140px;
    height: 140px;
  }
`;

const PrizeLabel = styled.div`
  font-size: ${typography.sizes.small};
  font-weight: ${typography.weights.bold};
  color: ${colors.darkGreen};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 4px;
`;

const PrizeAmount = styled.div`
  font-size: 32px;
  font-weight: ${typography.weights.bold};
  color: ${colors.white};
  line-height: 1;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  margin-bottom: 2px;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const PrizeDescription = styled.div`
  font-size: ${typography.sizes.small};
  font-weight: ${typography.weights.semibold};
  color: ${colors.darkGreen};
  text-align: center;
  line-height: 1.2;
  padding: 0 ${spacing.xs};
`;

const Headline = styled.h1`
  font-size: 56px;
  font-weight: 700;
  color: ${colors.yellow};
  text-align: center;
  margin-bottom: ${spacing.sm};
  line-height: 1.1;

  @media (max-width: 768px) {
    font-size: 42px;
  }
`;

const Subhead = styled.h2`
  font-size: ${typography.sizes.h3};
  font-weight: ${typography.weights.medium};
  color: ${colors.white};
  text-align: center;
  margin-bottom: ${spacing.sm};
  max-width: 700px;
`;

const BodyText = styled.p`
  font-size: ${typography.sizes.body};
  color: ${colors.white};
  text-align: center;
  margin-bottom: ${spacing.md};
  max-width: 650px;
  line-height: ${typography.lineHeights.relaxed};
  opacity: 0.95;
`;

const ValueBanner = styled(Card)`
  background: ${colors.yellow};
  padding: ${spacing.md} ${spacing.lg};
  border-radius: ${borderRadius.md};
  margin-bottom: ${spacing.md};
  max-width: 700px;
  box-shadow: ${shadows.hero};
  text-align: center;
`;

const BannerTitle = styled.div`
  font-size: ${typography.sizes.h3};
  font-weight: ${typography.weights.bold};
  color: ${colors.darkGreen};
  margin-bottom: ${spacing.sm};
  line-height: 1.2;
`;

const BannerText = styled.div`
  font-size: ${typography.sizes.body};
  color: ${colors.darkGreen};
  font-weight: ${typography.weights.semibold};
  line-height: 1.4;
`;

const ChallengeDetails = styled.div`
  display: flex;
  gap: ${spacing.lg};
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: ${spacing.md};
`;

const DetailItem = styled.div`
  text-align: center;
`;

const DetailNumber = styled.div`
  font-size: ${typography.sizes.h2};
  font-weight: ${typography.weights.bold};
  color: ${colors.yellow};
  margin-bottom: ${spacing.xs};
`;

const DetailLabel = styled.div`
  font-size: ${typography.sizes.bodySmall};
  color: ${colors.white};
  opacity: 0.9;
`;

const CTASection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing.sm};
`;

const GameInfo = styled.div`
  text-align: center;
  font-size: ${typography.sizes.bodySmall};
  color: ${colors.white};
  opacity: 0.8;
`;

export const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/task-1-briefing');
  };

  return (
    <PageContainer>
      {/* Header */}
      <Header>
        <Logo variant="light" size="medium" />
        <HeaderRight>
          <LinkedInIcon href="https://linkedin.com" target="_blank" title="LinkedIn">
            in
          </LinkedInIcon>
          <Button variant="primary" size="small">
            Book a demo
          </Button>
        </HeaderRight>
      </Header>

      {/* Hero Section */}
      <HeroSection>
        <TopRow>
          <PrestonShowcase>
            <PrestonAvatar expression="competitive" size={140} showName />
          </PrestonShowcase>

          <PrizeRoundel>
            <PrizeLabel>Win</PrizeLabel>
            <PrizeAmount>£2,000</PrizeAmount>
            <PrizeDescription>Consultancy for your Agency</PrizeDescription>
          </PrizeRoundel>
        </TopRow>

        <Headline>Think You're Faster Than AI?</Headline>
        <Subhead>Prove It Against Preston™</Subhead>
        <BodyText>
          3 challenges. See where AI saves you 10+ hours every week.
        </BodyText>

        {/* CTA */}
        <CTASection>
          <Button variant="primary" size="hero" onClick={handleStart}>
            Start The Challenge
          </Button>
        </CTASection>
      </HeroSection>
    </PageContainer>
  );
};
