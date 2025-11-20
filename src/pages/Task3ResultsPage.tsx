import React, { useEffect, useState, useRef } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { colors, spacing, typography, shadows } from '../styles/theme';
import { Button, Card, Badge, Input, Select } from '../components/ui';
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
  gap: ${spacing.lg};
  margin-bottom: ${spacing.lg};
  max-width: 1000px;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ResultCard = styled(Card)`
  padding: ${spacing.lg};
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
  max-width: 650px;
  width: 100%;
  padding: ${spacing.md};
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  margin-bottom: ${spacing.md};
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

const FormButtonGroup = styled.div`
  display: flex;
  gap: ${spacing.sm};
  flex-direction: column;
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

const PrizeRoundel = styled.div`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${colors.yellow} 0%, ${colors.pink} 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: ${shadows.hero};
  border: 4px solid ${colors.white};
  margin: 0 auto ${spacing.lg};
  flex-shrink: 0;
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
`;

const PrizeDescription = styled.div`
  font-size: ${typography.sizes.small};
  font-weight: ${typography.weights.semibold};
  color: ${colors.darkGreen};
  text-align: center;
  line-height: 1.2;
  padding: 0 ${spacing.xs};
`;

const FormCard = styled(Card)`
  max-width: 600px;
  width: 100%;
  padding: ${spacing.xl};
  margin-bottom: ${spacing.lg};
`;

const FormTitle = styled.h3`
  font-size: ${typography.sizes.h3};
  font-weight: ${typography.weights.bold};
  color: ${colors.darkGreen};
  margin-bottom: ${spacing.sm};
  text-align: center;
`;

const FormSubtitle = styled.p`
  font-size: ${typography.sizes.body};
  color: ${colors.textGray};
  margin-bottom: ${spacing.lg};
  text-align: center;
  line-height: ${typography.lineHeights.relaxed};
`;

const FormGrid = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  margin-bottom: ${spacing.md};
`;

const StepIndicator = styled.div`
  display: flex;
  justify-content: center;
  gap: ${spacing.sm};
  margin-bottom: ${spacing.lg};
`;

const StepDot = styled.div<{ active: boolean; completed: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props =>
    props.completed ? colors.brightGreen : props.active ? colors.yellow : colors.lightGray};
  transition: all 0.3s ease;
`;

export const Task3ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement>(null);
  const [userScore, setUserScore] = useState(0);
  const [userTime, setUserTime] = useState(0);
  const [timeSaved, setTimeSaved] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    agencyName: '',
    phone: '',
    painPoint: '',
  });
  const prestonScore = 1000; // Preston gets them all right
  const prestonTimeSaved = 11.6;

  useEffect(() => {
    const storedScore = sessionStorage.getItem('task3Score');
    const storedTime = sessionStorage.getItem('task3Time');
    const storedTimeSaved = sessionStorage.getItem('task3TimeSaved');
    if (storedScore) setUserScore(parseInt(storedScore, 10));
    if (storedTime) setUserTime(parseInt(storedTime, 10));
    if (storedTimeSaved) setTimeSaved(parseFloat(storedTimeSaved));
  }, []);

  const accuracy = (userScore / 1000) * 100;

  const getPrestonReaction = () => {
    if (accuracy >= 90) {
      return {
        expression: 'celebrating' as const,
        message: "Perfect! You understand exactly where AI adds value and where humans are irreplaceable. You'd save over 10 hours per week while keeping the personal touch that matters!",
      };
    } else if (accuracy >= 70) {
      return {
        expression: 'helpful' as const,
        message: "Good judgment! You're identifying most opportunities for automation. Together, we can reclaim hours of your week for client relationships and deal-making.",
      };
    } else {
      return {
        expression: 'helpful' as const,
        message: "The line between AI and human tasks can be tricky. The key is: I handle the repetitive stuff so you can focus on relationships, negotiations, and growing your business.",
      };
    }
  };

  const reaction = getPrestonReaction();

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (formStep < 3) {
      setFormStep(formStep + 1);
    } else {
      // Final submission
      sessionStorage.setItem('userData', JSON.stringify(formData));
      navigate('/final-score');
    }
  };

  const handleBackStep = () => {
    if (formStep > 1) {
      setFormStep(formStep - 1);
    }
  };

  const handleSkip = () => {
    navigate('/final-score');
  };

  const handleShowForm = () => {
    setShowForm(true);
    // Scroll to form after it's rendered
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const painPoints = [
    { value: '', label: 'Select your biggest pain point...' },
    { value: 'lead-response', label: 'Responding to leads quickly enough' },
    { value: 'admin-time', label: 'Too much time on admin tasks' },
    { value: 'data-analysis', label: 'Finding the right prospects' },
    { value: 'follow-up', label: 'Consistent follow-up with leads' },
    { value: 'work-life', label: 'Work-life balance' },
  ];

  return (
    <PageContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Badge variant="pink" size="large" style={{ marginBottom: spacing.lg }}>
          All Tasks Complete ✓
        </Badge>

        <Title>You're Done!</Title>

        <PrestonReaction shadow="standard">
          <PrestonAvatar expression="helpful" size={150} />
          <PrestonMessage>
            <PrestonName>Preston</PrestonName>
            <PrestonText>Ready to see how you performed across all three challenges? Let's check out your final score and see where you rank!</PrestonText>
          </PrestonMessage>
        </PrestonReaction>

        {!showForm ? (
          <ButtonGroup>
            <Button variant="primary" size="large" onClick={handleShowForm}>
              See Final Score
            </Button>
            <TextLink onClick={() => navigate('/')}>
              Start Over
            </TextLink>
          </ButtonGroup>
        ) : (
          <FormCard ref={formRef} shadow="hero">
            <PrizeRoundel>
              <PrizeLabel>Win</PrizeLabel>
              <PrizeAmount>£2,000</PrizeAmount>
              <PrizeDescription>Consultancy for your Agency</PrizeDescription>
            </PrizeRoundel>
            <FormTitle>One Last Step!</FormTitle>
            <FormSubtitle>
              Enter your details to see your final score and compete for the £2,000 prize
            </FormSubtitle>

            <StepIndicator>
              <StepDot active={formStep === 1} completed={formStep > 1} />
              <StepDot active={formStep === 2} completed={formStep > 2} />
              <StepDot active={formStep === 3} completed={false} />
            </StepIndicator>

            <FormGrid onSubmit={handleNextStep}>
              {/* Step 1: Name and Email */}
              {formStep === 1 && (
                <>
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
                    label="Email Address"
                    type="email"
                    placeholder="john@smithestates.co.uk"
                    value={formData.email}
                    onChange={e => handleChange('email', e.target.value)}
                    required
                    fullWidth
                  />
                </>
              )}

              {/* Step 2: Agency and Phone */}
              {formStep === 2 && (
                <>
                  <Input
                    label="Estate Agency Name"
                    type="text"
                    placeholder="Smith & Co Estate Agents"
                    value={formData.agencyName}
                    onChange={e => handleChange('agencyName', e.target.value)}
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
                </>
              )}

              {/* Step 3: Pain Point */}
              {formStep === 3 && (
                <Select
                  label="Your biggest pain point?"
                  options={painPoints}
                  value={formData.painPoint}
                  onChange={e => handleChange('painPoint', e.target.value)}
                  fullWidth
                />
              )}

              <FormButtonGroup>
                <Button type="submit" variant="primary" size="large" fullWidth>
                  {formStep < 3 ? 'Next' : 'Show Me My Final Score'}
                </Button>
                {formStep > 1 && (
                  <Button type="button" variant="secondary" size="large" fullWidth onClick={handleBackStep}>
                    Back
                  </Button>
                )}
              </FormButtonGroup>
            </FormGrid>

            <div style={{ textAlign: 'center' }}>
              <TextLink onClick={handleSkip}>
                Skip for now — just show me my results
              </TextLink>
            </div>
          </FormCard>
        )}
      </motion.div>
    </PageContainer>
  );
};
