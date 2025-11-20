import React from 'react';
import styled from '@emotion/styled';
import { colors, borderRadius, shadows, spacing } from '../../styles/theme';

interface CardProps {
  children: React.ReactNode;
  variant?: 'white' | 'dark' | 'transparent';
  shadow?: 'subtle' | 'standard' | 'prominent' | 'hero' | 'none';
  padding?: 'sm' | 'md' | 'lg' | 'none';
  className?: string;
  onClick?: () => void;
}

const StyledCard = styled.div<CardProps>`
  border-radius: ${borderRadius.md};
  transition: all 200ms ease-out;

  ${props => {
    switch (props.variant) {
      case 'dark':
        return `background: ${colors.darkGreen};`;
      case 'transparent':
        return `background: transparent;`;
      default:
        return `background: ${colors.white};`;
    }
  }}

  ${props => {
    if (props.shadow === 'none') return 'box-shadow: none;';
    const shadowValue = props.shadow || 'standard';
    return `box-shadow: ${shadows[shadowValue]};`;
  }}

  ${props => {
    switch (props.padding) {
      case 'sm':
        return `padding: ${spacing.sm};`;
      case 'lg':
        return `padding: ${spacing.lg};`;
      case 'none':
        return `padding: 0;`;
      default:
        return `padding: ${spacing.md};`;
    }
  }}

  ${props => props.onClick && `
    cursor: pointer;

    &:hover {
      box-shadow: ${shadows.prominent};
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0);
    }
  `}
`;

export const Card: React.FC<CardProps> = ({ children, ...props }) => {
  return <StyledCard {...props}>{children}</StyledCard>;
};
