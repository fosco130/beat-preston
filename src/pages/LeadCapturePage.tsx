import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { colors, spacing, typography, shadows, borderRadius } from '../styles/theme';
import { Button, Card, Input, Select, FloatingCard } from '../components/ui';
import { PrestonAvatar } from '../components/game/PrestonAvatar';
import { Logo } from '../components/layout/Logo';

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${colors.offWhite};
`;

const Header = styled.header`
  background: ${colors.darkGreen};
  padding: ${spacing.md} ${spacing.xl};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 10;
`;

const HeroSection = styled.div`
  background: ${colors.white};
  padding: ${spacing.xxl} ${spacing.md};
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const HeroTitle = styled.h1`
  font-size: ${typography.sizes.h1};
  font-weight: ${typography.weights.bold};
  color: ${colors.darkGreen};
  margin-bottom: ${spacing.md};
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: ${typography.sizes.h2};
  }
`;

const HeroSubtitle = styled.p`
  font-size: ${typography.sizes.h4};
  color: ${colors.textGray};
  max-width: 700px;
  margin: 0 auto ${spacing.xl};
  line-height: ${typography.lineHeights.relaxed};
`;

const ContentSection = styled.div`
  padding: ${spacing.xxl} ${spacing.md};
  max-width: 1200px;
  margin: 0 auto;
`;

const StepContainer = styled(motion.div)`
  max-width: 900px;
  margin: 0 auto;
`;

const StepCard = styled(Card)`
  padding: ${spacing.xl};
  margin-bottom: ${spacing.lg};
`;

const StepTitle = styled.h2`
  font-size: ${typography.sizes.h2};
  font-weight: ${typography.weights.bold};
  color: ${colors.darkGreen};
  margin-bottom: ${spacing.md};
  text-align: center;
`;

const StepText = styled.p`
  font-size: ${typography.sizes.body};
  color: ${colors.textDark};
  line-height: ${typography.lineHeights.relaxed};
  margin-bottom: ${spacing.lg};
  text-align: center;
`;

const HighlightBox = styled.div`
  background: ${colors.yellow};
  padding: ${spacing.lg} ${spacing.xl};
  border-radius: ${borderRadius.md};
  margin: ${spacing.lg} 0;
  text-align: center;
`;

const HighlightNumber = styled.div`
  font-size: 64px;
  font-weight: ${typography.weights.bold};
  color: ${colors.darkGreen};
  line-height: 1;
  margin-bottom: ${spacing.sm};
`;

const HighlightLabel = styled.div`
  font-size: ${typography.sizes.h4};
  font-weight: ${typography.weights.semibold};
  color: ${colors.darkGreen};
`;

const ValuePropsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${spacing.md};
  margin: ${spacing.xl} 0;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: ${spacing.sm};
  }
`;

const ValuePropCard = styled(Card)`
  padding: ${spacing.md};
  text-align: center;
  transition: transform 200ms ease;

  &:hover {
    transform: translateY(-4px);
  }

  @media (max-width: 968px) {
    padding: ${spacing.sm} ${spacing.md};
  }
`;

const IconCircle = styled.div<{ color: string }>`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  margin: 0 auto ${spacing.sm};
  box-shadow: ${shadows.standard};

  @media (max-width: 968px) {
    width: 48px;
    height: 48px;
    font-size: 24px;
  }
`;

const ValueTitle = styled.h3`
  font-size: ${typography.sizes.h4};
  font-weight: ${typography.weights.semibold};
  color: ${colors.darkGreen};
  margin-bottom: ${spacing.sm};
`;

const ValueDescription = styled.p`
  font-size: ${typography.sizes.body};
  color: ${colors.textGray};
  line-height: ${typography.lineHeights.relaxed};
`;

const FormGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  margin-bottom: ${spacing.md};
`;

const PrestonSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.md};
  margin-top: ${spacing.lg};
  padding: ${spacing.md};
  background: ${colors.offWhite};
  border-radius: ${borderRadius.md};
`;

const PrestonMessage = styled.div`
  flex: 1;
  text-align: left;
`;

const PrestonText = styled.p`
  font-size: ${typography.sizes.bodySmall};
  color: ${colors.textGray};
  line-height: ${typography.lineHeights.normal};
  font-weight: ${typography.weights.semibold};
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  align-items: center;
`;

const LoadingScreen = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${colors.darkGreen};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const LoadingSpinner = styled(motion.div)`
  width: 80px;
  height: 80px;
  border: 4px solid ${colors.white}30;
  border-top: 4px solid ${colors.yellow};
  border-radius: 50%;
  margin-bottom: ${spacing.lg};
`;

const LoadingText = styled.h2`
  font-size: ${typography.sizes.h3};
  font-weight: ${typography.weights.semibold};
  color: ${colors.white};
  margin-bottom: ${spacing.sm};
`;

const LoadingSubtext = styled.p`
  font-size: ${typography.sizes.body};
  color: ${colors.white};
  opacity: 0.8;
`;

const Footer = styled.footer`
  text-align: center;
  padding: ${spacing.xl};
  background: ${colors.white};
`;

const FooterLinks = styled.div`
  display: flex;
  gap: ${spacing.md};
  justify-content: center;
  align-items: center;
  margin-top: ${spacing.md};
`;

export const LeadCapturePage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    agencyName: '',
    email: '',
    phone: '',
    biggestChallenge: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store user data
    sessionStorage.setItem('userData', JSON.stringify(formData));

    // Show loading screen
    setIsSubmitting(true);

    // Simulate API call, then navigate
    setTimeout(() => {
      navigate('/final-score');
    }, 2500);
  };

  const handleSkip = () => {
    navigate('/final-score');
  };

  const challenges = [
    { value: '', label: 'Select your biggest challenge...' },
    { value: 'lead-response', label: 'Responding to leads quickly enough' },
    { value: 'admin-time', label: 'Too much time on admin tasks' },
    { value: 'data-analysis', label: 'Finding the right prospects' },
    { value: 'follow-up', label: 'Consistent follow-up with leads' },
    { value: 'work-life', label: 'Work-life balance' },
  ];

  return (
    <PageContainer>
      {/* Loading Screen */}
      <AnimatePresence>
        {isSubmitting && (
          <LoadingScreen
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LoadingSpinner
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            <LoadingText>Calculating Your Results...</LoadingText>
            <LoadingSubtext>Analyzing your performance against Preston™</LoadingSubtext>
          </LoadingScreen>
        )}
      </AnimatePresence>

      {/* Header */}
      <Header>
        <Logo variant="light" />
        <Button variant="primary" size="small">
          Login
        </Button>
      </Header>

      {/* Multi-Step Content */}
      <ContentSection>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <StepContainer
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <StepCard shadow="hero">
                <PrestonAvatar expression="celebrating" size={160} showName />

                <StepTitle>Here's What You Could Save</StepTitle>
                <StepText>
                  Based on how other estate agents perform in this challenge, here's the average time
                  savings they're seeing with Preston™ in their agencies.
                </StepText>

                <HighlightBox>
                  <HighlightNumber>50+</HighlightNumber>
                  <HighlightLabel>Hours Saved Per Week (5-agent agency)</HighlightLabel>
                </HighlightBox>

                <StepText>
                  That's over <strong>2,500 hours per year</strong> your team can spend on high-value activities
                  like building relationships and closing deals instead of admin work.
                </StepText>

                <ButtonContainer>
                  <Button variant="primary" size="large" onClick={() => setStep(2)}>
                    Show Me How This Works
                  </Button>
                  <Button variant="text" size="small" onClick={handleSkip}>
                    Skip to my results
                  </Button>
                </ButtonContainer>
              </StepCard>
            </StepContainer>
          )}

          {step === 2 && (
            <StepContainer
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <StepCard shadow="hero">
                <StepTitle>What Preston™ Does for Your Agency</StepTitle>

                <ValuePropsGrid>
                  <ValuePropCard shadow="standard">
                    <IconCircle color={colors.brightGreen}>⚡</IconCircle>
                    <ValueTitle>Instant Lead Response</ValueTitle>
                    <ValueDescription>
                      Responds to portal enquiries in seconds, 24/7. Qualifies leads and books
                      viewings while you sleep.
                    </ValueDescription>
                  </ValuePropCard>

                  <ValuePropCard shadow="standard">
                    <IconCircle color={colors.yellow}>🤖</IconCircle>
                    <ValueTitle>Automated Admin</ValueTitle>
                    <ValueDescription>
                      Handles emails, updates CRM, schedules follow-ups, and generates reports
                      automatically.
                    </ValueDescription>
                  </ValuePropCard>

                  <ValuePropCard shadow="standard">
                    <IconCircle color={colors.pink}>🎯</IconCircle>
                    <ValueTitle>Smart Prospecting</ValueTitle>
                    <ValueDescription>
                      Analyzes thousands of data points to identify hot sellers and match buyers
                      to properties instantly.
                    </ValueDescription>
                  </ValuePropCard>
                </ValuePropsGrid>

                <PrestonSection>
                  <PrestonAvatar expression="helpful" size={120} />
                  <PrestonMessage>
                    <PrestonText>
                      "I work alongside your team, handling routine tasks instantly so your agents can
                      focus on what they do best - building relationships and closing deals."
                    </PrestonText>
                  </PrestonMessage>
                </PrestonSection>

                <ButtonContainer style={{ marginTop: spacing.xl }}>
                  <Button variant="primary" size="large" onClick={() => setStep(3)}>
                    Next
                  </Button>
                  <Button variant="text" size="small" onClick={handleSkip}>
                    Skip to results
                  </Button>
                </ButtonContainer>
              </StepCard>
            </StepContainer>
          )}

          {step === 3 && (
            <StepContainer
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <StepCard shadow="hero">
                <StepTitle>Show Me The Leaderboard</StepTitle>
                <StepText>
                  Enter your details to see where you rank and compete for a £2,000 consultancy prize
                </StepText>

                <form onSubmit={handleSubmit}>
                  <FormGrid>
                    <Input
                      label="Your Name"
                      type="text"
                      placeholder="John Smith"
                      value={formData.name}
                      onChange={e => handleChange('name', e.target.value)}
                      required
                      fullWidth
                    />
                    <Input
                      label="Agency Name"
                      type="text"
                      placeholder="Smith & Co Estate Agents"
                      value={formData.agencyName}
                      onChange={e => handleChange('agencyName', e.target.value)}
                      required
                      fullWidth
                    />
                    <Input
                      label="Email"
                      type="email"
                      placeholder="john@smithestates.com"
                      value={formData.email}
                      onChange={e => handleChange('email', e.target.value)}
                      required
                      fullWidth
                    />
                    <Input
                      label="Phone Number"
                      type="tel"
                      placeholder="07700 900000"
                      value={formData.phone}
                      onChange={e => handleChange('phone', e.target.value)}
                      required
                      fullWidth
                    />
                    <Select
                      label="Your biggest challenge?"
                      options={challenges}
                      value={formData.biggestChallenge}
                      onChange={e => handleChange('biggestChallenge', e.target.value)}
                      fullWidth
                    />
                  </FormGrid>

                  <Button type="submit" variant="primary" size="large" fullWidth>
                    Next
                  </Button>
                </form>

                <div style={{ textAlign: 'center', marginTop: spacing.md }}>
                  <Button variant="text" size="small" onClick={handleSkip}>
                    Skip for now — just show me my results
                  </Button>
                </div>
              </StepCard>
            </StepContainer>
          )}
        </AnimatePresence>
      </ContentSection>

      {/* Footer */}
      <Footer>
        <Logo variant="dark" size="medium" />
        <FooterLinks>
          <Button variant="text" size="small" onClick={() => navigate('/')}>
            Play again
          </Button>
          <span style={{ color: colors.borderGray }}>•</span>
          <Button variant="text" size="small">
            Download Case Studies
          </Button>
          <span style={{ color: colors.borderGray }}>•</span>
          <Button variant="text" size="small">
            Contact Us
          </Button>
        </FooterLinks>
      </Footer>
    </PageContainer>
  );
};
