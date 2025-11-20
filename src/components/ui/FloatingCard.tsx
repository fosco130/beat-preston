import React from 'react';
import styled from '@emotion/styled';
import { colors, borderRadius, shadows } from '../../styles/theme';

interface FloatingCardProps {
  color?: 'yellow' | 'pink' | 'green';
  size?: number;
  icon?: React.ReactNode;
  position?: { top?: string; right?: string; bottom?: string; left?: string };
  rotate?: number;
  delay?: number;
}

const StyledFloatingCard = styled.div<FloatingCardProps>`
  position: absolute;
  width: ${props => props.size || 60}px;
  height: ${props => props.size || 60}px;
  border-radius: ${borderRadius.sm};
  box-shadow: ${shadows.standard};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;

  ${props => props.position?.top && `top: ${props.position.top};`}
  ${props => props.position?.right && `right: ${props.position.right};`}
  ${props => props.position?.bottom && `bottom: ${props.position.bottom};`}
  ${props => props.position?.left && `left: ${props.position.left};`}

  ${props => props.rotate && `transform: rotate(${props.rotate}deg);`}

  ${props => {
    switch (props.color) {
      case 'pink':
        return `background: ${colors.pink};`;
      case 'green':
        return `background: ${colors.brightGreen};`;
      default:
        return `background: ${colors.yellow};`;
    }
  }}

  animation: float 3s ease-in-out infinite;
  animation-delay: ${props => props.delay || 0}s;

  @keyframes float {
    0%,
    100% {
      transform: translateY(0px) rotate(${props => props.rotate || 0}deg);
    }
    50% {
      transform: translateY(-10px) rotate(${props => props.rotate || 0}deg);
    }
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.white};
  font-size: 18px;

  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

export const FloatingCard: React.FC<FloatingCardProps> = ({ icon, ...props }) => {
  return (
    <StyledFloatingCard {...props}>
      {icon && <IconContainer>{icon}</IconContainer>}
    </StyledFloatingCard>
  );
};
