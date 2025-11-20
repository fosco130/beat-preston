import React from 'react';
import styled from '@emotion/styled';
import { colors } from '../../styles/theme';

export type PrestonExpression =
  | 'neutral'
  | 'competitive'
  | 'impressed'
  | 'victorious'
  | 'helpful'
  | 'thinking'
  | 'celebrating';

interface PrestonAvatarProps {
  expression?: PrestonExpression;
  size?: number;
  showName?: boolean;
}

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const AvatarImage = styled.img`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  object-fit: contain;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1));
`;

const AvatarName = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${colors.darkGreen};
`;

export const PrestonAvatar: React.FC<PrestonAvatarProps> = ({
  expression = 'neutral',
  size = 80,
  showName = false,
}) => {
  return (
    <AvatarContainer>
      <AvatarImage
        src="/preston-avatar.png"
        alt="Preston™"
        width={size}
        height={size}
      />
      {showName && <AvatarName>Preston™</AvatarName>}
    </AvatarContainer>
  );
};
