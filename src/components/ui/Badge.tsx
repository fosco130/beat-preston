import React from 'react';
import styled from '@emotion/styled';
import { colors, borderRadius, typography } from '../../styles/theme';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'yellow' | 'green' | 'pink' | 'gray' | 'white';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const StyledBadge = styled.span<BadgeProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: ${typography.fonts.sans};
  font-weight: ${typography.weights.medium};
  border-radius: ${borderRadius.pill};
  white-space: nowrap;

  ${props => {
    switch (props.size) {
      case 'small':
        return `
          height: 24px;
          padding: 4px 12px;
          font-size: ${typography.sizes.tiny};
        `;
      case 'large':
        return `
          height: 40px;
          padding: 8px 20px;
          font-size: ${typography.sizes.bodySmall};
        `;
      default:
        return `
          height: 32px;
          padding: 6px 16px;
          font-size: ${typography.sizes.small};
        `;
    }
  }}

  ${props => {
    switch (props.variant) {
      case 'green':
        return `
          background: ${colors.brightGreen};
          color: ${colors.white};
        `;
      case 'pink':
        return `
          background: ${colors.pink};
          color: ${colors.darkGreen};
        `;
      case 'gray':
        return `
          background: ${colors.lightGray};
          color: ${colors.textGray};
        `;
      case 'white':
        return `
          background: ${colors.white};
          color: ${colors.darkGreen};
        `;
      default: // yellow
        return `
          background: ${colors.yellow};
          color: ${colors.darkGreen};
        `;
    }
  }}
`;

export const Badge: React.FC<BadgeProps> = ({
  variant = 'yellow',
  size = 'medium',
  children,
  ...props
}) => {
  return (
    <StyledBadge variant={variant} size={size} {...props}>
      {children}
    </StyledBadge>
  );
};
