import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { colors, spacing, typography, shadows, borderRadius } from '../styles/theme';
import { Button, Card, Badge, ProgressBar } from '../components/ui';
import { PrestonAvatar } from '../components/game/PrestonAvatar';
import { sellerData } from '../data/gameData';
import type { SellerData } from '../types/game';

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${colors.offWhite};
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  background: ${colors.white};
  padding: ${spacing.md} ${spacing.lg};
  box-shadow: ${shadows.subtle};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${spacing.sm};
`;

const HeaderLeft = styled.div`
  display: flex;
  gap: ${spacing.sm};
  align-items: center;
`;

const HeaderRight = styled.div`
  display: flex;
  gap: ${spacing.sm};
  align-items: center;
`;

const MainContent = styled.div`
  flex: 1;
  padding: ${spacing.md} ${spacing.lg};
  padding-bottom: ${spacing.lg};
  margin-top: -${spacing.md};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TableCard = styled(Card)`
  width: 100%;
  max-width: 1400px;
  padding: 0;
  overflow: hidden;
`;

const TableContainer = styled.div`
  overflow-x: auto;
  max-height: 600px;
  overflow-y: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${typography.sizes.bodySmall};
`;

const Thead = styled.thead`
  background: ${colors.lightGray};
  position: sticky;
  top: 0;
  z-index: 10;
`;

const Th = styled.th`
  text-align: left;
  padding: ${spacing.sm} ${spacing.md};
  font-weight: ${typography.weights.semibold};
  color: ${colors.textDark};
  white-space: nowrap;
  border-bottom: 2px solid ${colors.borderGray};
`;

const Tbody = styled.tbody``;

const Tr = styled.tr<{ selected: boolean; isCorrect?: boolean; showFeedback?: boolean }>`
  cursor: pointer;
  transition: all 200ms ease;
  background: ${props => (props.selected ? 'rgba(253, 185, 47, 0.15)' : colors.white)};
  border-left: ${props => {
    if (props.showFeedback && props.selected) {
      return props.isCorrect ? `4px solid ${colors.brightGreen}` : `4px solid ${colors.error}`;
    }
    return 'none';
  }};

  &:hover {
    background: ${props => (props.selected ? 'rgba(253, 185, 47, 0.25)' : colors.offWhite)};
  }
`;

const Td = styled.td`
  padding: ${spacing.sm} ${spacing.md};
  border-bottom: 1px solid ${colors.lightGray};
`;

const Checkbox = styled.div<{ checked: boolean }>`
  width: 24px;
  height: 24px;
  border: 2px solid ${props => (props.checked ? colors.brightGreen : colors.borderGray)};
  border-radius: 4px;
  background: ${props => (props.checked ? colors.brightGreen : colors.white)};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.white};
  font-size: 16px;
  font-weight: bold;
  transition: all 200ms ease;
`;

const ActivityBadge = styled(Badge)<{ activity: string }>`
  ${props => {
    switch (props.activity) {
      case 'High':
        return `background: ${colors.brightGreen}; color: ${colors.white};`;
      case 'Medium':
        return `background: ${colors.yellow}; color: ${colors.darkGreen};`;
      default:
        return `background: ${colors.lightGray}; color: ${colors.textGray};`;
    }
  }}
`;

const ProgressSection = styled(Card)`
  width: 100%;
  max-width: 1400px;
  margin-bottom: ${spacing.lg};
  display: flex;
  gap: ${spacing.sm};
  padding: ${spacing.sm} ${spacing.md};
  background: white;
  border: 3px solid ${colors.darkGreen};
  box-shadow: ${shadows.hero};

  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${spacing.sm};
  }
`;

const ProgressCard = styled.div`
  flex: 1;
  padding: ${spacing.xs} ${spacing.sm};
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
  border-radius: 8px;
  min-width: 0;
`;

const UserProgressCard = styled(ProgressCard)`
  background: linear-gradient(135deg, ${colors.yellow} 0%, #f4a000 100%);
`;

const PrestonProgressCard = styled(ProgressCard)`
  background: linear-gradient(135deg, ${colors.brightGreen} 0%, #45a049 100%);
`;

const ProgressIcon = styled.div`
  font-size: 32px;
  line-height: 1;
  flex-shrink: 0;
`;

const ProgressContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const ProgressLabel = styled.div`
  font-size: ${typography.sizes.small};
  font-weight: ${typography.weights.semibold};
  color: ${colors.white};
  margin-bottom: 4px;
  white-space: nowrap;
`;

const SubmitButton = styled(Button)`
  margin-top: ${spacing.md};
`;

export const Task2GamePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [prestonReady, setPrestonReady] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [showFeedback, setShowFeedback] = useState(false);

  const maxSelections = 10;

  useEffect(() => {
    // Preston takes 3 seconds to "analyze" the data - instant AI analysis!
    const timer = setTimeout(() => setPrestonReady(true), 3000);
    setStartTime(Date.now());
    return () => clearTimeout(timer);
  }, []);

  const handleRowClick = (id: string) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else if (newSet.size < maxSelections) {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleSubmit = () => {
    // Show feedback on selections
    setShowFeedback(true);

    // Calculate score after a brief delay
    setTimeout(() => {
      const hotSellerIds = sellerData.filter(s => s.isHot).map(s => s.id);
      let matches = 0;
      selectedIds.forEach(id => {
        if (hotSellerIds.includes(id)) matches++;
      });

      const score = matches * 100;
      const elapsedTime = Math.round((Date.now() - startTime) / 1000);
      sessionStorage.setItem('task2Score', score.toString());
      sessionStorage.setItem('task2Time', elapsedTime.toString());
      sessionStorage.setItem('task2Selections', JSON.stringify([...selectedIds]));
      navigate('/task-2-results');
    }, 1500);
  };

  const canSubmit = selectedIds.size === maxSelections;

  return (
    <PageContainer>
      <Header>
        <HeaderLeft>
          <Badge variant="green">Task 2: Spot the Hot Seller</Badge>
        </HeaderLeft>
        <HeaderRight>
          <Badge variant="gray" size="small">
            Analyze the data and select 10
          </Badge>
        </HeaderRight>
      </Header>

      <MainContent>
        {/* Progress Section */}
        <ProgressSection shadow="hero">
          <UserProgressCard>
            <ProgressIcon>👤</ProgressIcon>
            <ProgressContent>
              <ProgressLabel>You: {selectedIds.size} / {maxSelections}</ProgressLabel>
              <ProgressBar
                value={(selectedIds.size / maxSelections) * 100}
                max={100}
                variant="yellow"
                height={6}
              />
            </ProgressContent>
          </UserProgressCard>

          <PrestonProgressCard>
            <PrestonAvatar expression="thinking" size={72} />
            <ProgressContent>
              <ProgressLabel>
                {prestonReady ? '✓ Preston™ complete!' : 'Preston™ analyzing...'}
              </ProgressLabel>
              <ProgressBar value={prestonReady ? 100 : 50} max={100} variant="yellow" height={6} />
            </ProgressContent>
          </PrestonProgressCard>
        </ProgressSection>

        <TableCard shadow="prominent">
          <TableContainer>
            <Table>
              <Thead>
                <Tr selected={false}>
                  <Th>Select</Th>
                  <Th>Name</Th>
                  <Th>Property Type</Th>
                  <Th>Last Sale</Th>
                  <Th>Activity</Th>
                  <Th>Portal Views</Th>
                  <Th>Engagement</Th>
                </Tr>
              </Thead>
              <Tbody>
                {sellerData.map(seller => {
                  const isSelected = selectedIds.has(seller.id);
                  const isCorrect = seller.isHot;
                  return (
                    <Tr
                      key={seller.id}
                      selected={isSelected}
                      isCorrect={isCorrect}
                      showFeedback={showFeedback}
                      onClick={() => !showFeedback && handleRowClick(seller.id)}
                    >
                      <Td>
                        <Checkbox checked={isSelected}>{isSelected && '✓'}</Checkbox>
                      </Td>
                      <Td>{seller.name}</Td>
                      <Td>{seller.propertyType}</Td>
                      <Td>{seller.lastSale}</Td>
                      <Td>
                        <ActivityBadge activity={seller.activity} size="small">
                          {seller.activity}
                        </ActivityBadge>
                      </Td>
                      <Td>{seller.portalViews.toLocaleString()}</Td>
                      <Td>{seller.engagementScore}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </TableCard>

        <SubmitButton
          variant="primary"
          size="large"
          onClick={handleSubmit}
          disabled={!canSubmit}
        >
          {canSubmit ? 'Lock In My Picks' : `Select ${maxSelections - selectedIds.size} More`}
        </SubmitButton>
      </MainContent>
    </PageContainer>
  );
};
