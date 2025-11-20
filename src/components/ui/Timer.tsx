import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Badge } from './Badge';

interface TimerProps {
  duration: number; // in seconds
  onComplete?: () => void;
  variant?: 'yellow' | 'green' | 'pink' | 'gray' | 'white';
}

const TimerBadge = styled(Badge)<{ warning: boolean }>`
  min-width: 80px;
  font-variant-numeric: tabular-nums;
  transition: all 200ms ease-out;

  ${props =>
    props.warning &&
    `
    animation: pulse 1s ease-in-out infinite;
  `}

  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }
`;

export const Timer: React.FC<TimerProps> = ({ duration, onComplete, variant = 'yellow' }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete?.();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onComplete]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isWarning = timeLeft <= 10 && timeLeft > 0;

  return (
    <TimerBadge variant={variant} warning={isWarning}>
      {formatTime(timeLeft)}
    </TimerBadge>
  );
};
