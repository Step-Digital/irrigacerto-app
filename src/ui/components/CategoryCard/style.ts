import styled, { css } from 'styled-components/native';

export const Container = styled.View`
${({ theme }) => css`
  width: 100%;
  background-color: ${theme.colors["positive"]};
  height: 91px;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  border-radius: 8px;
  margin-bottom: 16px;
`}
`;

export const Text = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors["pure-white"]};
    font-size: 22px;
    font-family: 'Poppins-bold';
    margin-left: 16px;
    z-index: 1;
  `}
`;
