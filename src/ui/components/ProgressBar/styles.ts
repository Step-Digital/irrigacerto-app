import styled, { css } from 'styled-components/native';

interface ProgressBarProps {
  active?: boolean;
  width: string;
}

export const Container = styled.View<ProgressBarProps>`
  ${({ theme, active, width }) => css`
    width: ${width};
    height: 6px;
    background-color: ${active ? theme.colors["positive"] : theme.colors["gray-2"]};
    border-radius: 55px;
   
    margin-right: 4px;
  `}
`;
