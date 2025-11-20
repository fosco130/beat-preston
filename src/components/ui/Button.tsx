import React from 'react';
import styled from '@emotion/styled';
import { colors, borderRadius, shadows, touchTargets, typography } from '../../styles/theme';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'text';
  size?: 'small' | 'medium' | 'large' | 'hero';
  fullWidth?: boolean;
  children: React.ReactNode;
}

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: ${typography.fonts.primary};
  font-size: ${typography.sizes.button};
  font-weight: ${typography.weights.medium};
  border-radius: ${borderRadius.sm};
  transition: all 200ms ease-out;
  cursor: pointer;
  user-select: none;

  /* Size variants */
  height: ${props => {
    switch (props.size) {
      case 'small':
        return '40px';
      case 'large':
        return touchTargets.large;
      case 'hero':
        return '70px';
      default:
        return touchTargets.comfortable;
    }
  }};

  padding: ${props => {
    switch (props.size) {
      case 'small':
        return '8px 20px';
      case 'large':
        return '14px 32px';
      case 'hero':
        return '20px 48px';
      default:
        return '12px 28px';
    }
  }};

  font-size: ${props => {
    switch (props.size) {
      case 'hero':
        return '24px';
      default:
        return typography.sizes.button;
    }
  }};

  width: ${props => (props.fullWidth ? '100%' : 'auto')};

  /* Variant styles */
  ${props => {
    switch (props.variant) {
      case 'secondary':
        return `
          background: ${colors.white};
          color: ${colors.darkGreen};
          border: 2px solid ${colors.darkGreen};
          box-shadow: none;

          &:hover:not(:disabled) {
            background: ${colors.offWhite};
          }

          &:active:not(:disabled) {
            background: ${colors.lightGray};
          }
        `;
      case 'text':
        return `
          background: transparent;
          color: ${colors.darkGreen};
          box-shadow: none;
          padding: 8px 16px;

          &:hover:not(:disabled) {
            background: ${colors.offWhite};
          }

          &:active:not(:disabled) {
            background: ${colors.lightGray};
          }
        `;
      default: // primary
        return `
          background: ${colors.yellow};
          color: ${colors.darkGreen};
          box-shadow: ${shadows.subtle};

          &:hover:not(:disabled) {
            background: #FDBC42;
            box-shadow: ${shadows.standard};
          }

          &:active:not(:disabled) {
            background: #FDB01C;
            box-shadow: ${shadows.subtle};
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${colors.yellow};
    outline-offset: 2px;
  }
`;

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  children,
  ...props
}) => {
  return (
    <StyledButton variant={variant} size={size} fullWidth={fullWidth} {...props}>
      {children}
    </StyledButton>
  );
};
