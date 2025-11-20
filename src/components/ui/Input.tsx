import React from 'react';
import styled from '@emotion/styled';
import { colors, borderRadius, spacing, typography, touchTargets } from '../../styles/theme';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  options: { value: string; label: string }[];
}

const InputWrapper = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
  width: ${props => (props.fullWidth ? '100%' : 'auto')};
`;

const Label = styled.label`
  font-size: ${typography.sizes.small};
  font-weight: ${typography.weights.medium};
  color: ${colors.textDark};
`;

const StyledInput = styled.input`
  width: 100%;
  height: ${touchTargets.comfortable};
  padding: 12px 16px;
  font-size: ${typography.sizes.bodySmall};
  font-family: ${typography.fonts.sans};
  color: ${colors.textDark};
  background: ${colors.white};
  border: 1px solid ${colors.borderGray};
  border-radius: ${borderRadius.sm};
  transition: all 200ms ease-out;

  &::placeholder {
    color: ${colors.placeholderGray};
  }

  &:hover {
    border-color: ${colors.textGray};
  }

  &:focus {
    border-color: ${colors.yellow};
    box-shadow: 0 0 0 3px rgba(253, 185, 47, 0.1);
  }

  &:disabled {
    background: ${colors.lightGray};
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const StyledSelect = styled.select`
  width: 100%;
  height: ${touchTargets.comfortable};
  padding: 12px 16px;
  font-size: ${typography.sizes.bodySmall};
  font-family: ${typography.fonts.sans};
  color: ${colors.textDark};
  background: ${colors.white};
  border: 1px solid ${colors.borderGray};
  border-radius: ${borderRadius.sm};
  transition: all 200ms ease-out;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%231E4D42' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  padding-right: 40px;

  &:hover {
    border-color: ${colors.textGray};
  }

  &:focus {
    border-color: ${colors.yellow};
    box-shadow: 0 0 0 3px rgba(253, 185, 47, 0.1);
  }

  &:disabled {
    background: ${colors.lightGray};
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const ErrorText = styled.span`
  font-size: ${typography.sizes.small};
  color: ${colors.error};
`;

export const Input: React.FC<InputProps> = ({ label, error, fullWidth = false, ...props }) => {
  return (
    <InputWrapper fullWidth={fullWidth}>
      {label && <Label>{label}</Label>}
      <StyledInput {...props} />
      {error && <ErrorText>{error}</ErrorText>}
    </InputWrapper>
  );
};

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  fullWidth = false,
  options,
  ...props
}) => {
  return (
    <InputWrapper fullWidth={fullWidth}>
      {label && <Label>{label}</Label>}
      <StyledSelect {...props}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
      {error && <ErrorText>{error}</ErrorText>}
    </InputWrapper>
  );
};
