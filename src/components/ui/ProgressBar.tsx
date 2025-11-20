import React from 'react';
import styled from '@emotion/styled';
import { colors, borderRadius } from '../../styles/theme';

interface ProgressBarProps {
  value: number; // 0-100
  max?: number;
  variant?: 'yellow' | 'green';
  height?: number;
  showLabel?: boolean;
}

const ProgressContainer = styled.div<{ height: number }>`
  width: 100%;
  height: ${props => props.height}px;
  background: ${colors.lightGray};
  border-radius: ${borderRadius.pill};
  overflow: hidden;
  position: relative;
`;

const ProgressFill = styled.div<{ value: number; variant: string }>`
  height: 100%;
  width: ${props => props.value}%;
  background: ${props => (props.variant === 'green' ? colors.brightGreen : colors.yellow)};
  border-radius: ${borderRadius.pill};
  transition: width 400ms cubic-bezier(0.4, 0.0, 0.2, 1);
`;

const ProgressLabel = styled.span<{ variant: string }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  font-weight: 600;
  color: ${props => (props.variant === 'green' ? colors.white : colors.darkGreen)};
`;

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  variant = 'yellow',
  height = 8,
  showLabel = false,
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <ProgressContainer height={height}>
      <ProgressFill value={percentage} variant={variant} />
      {showLabel && <ProgressLabel variant={variant}>{Math.round(percentage)}%</ProgressLabel>}
    </ProgressContainer>
  );
};
