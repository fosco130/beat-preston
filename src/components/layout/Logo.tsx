import React from 'react';
import styled from '@emotion/styled';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'small' | 'medium' | 'large';
}

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img<{ logoSize: string }>`
  height: ${props => {
    switch (props.logoSize) {
      case 'small':
        return '30px';
      case 'large':
        return '60px';
      default:
        return '40px';
    }
  }};
  width: auto;
  object-fit: contain;
`;

export const Logo: React.FC<LogoProps> = ({ variant = 'light', size = 'medium' }) => {
  return (
    <LogoContainer>
      <LogoImage
        src="/greenhouse-logo.png"
        alt="Greenhouse OS"
        logoSize={size}
      />
    </LogoContainer>
  );
};
