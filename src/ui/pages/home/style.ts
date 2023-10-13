import styled, { css } from 'styled-components/native';

export const StyledView = styled.View`
  ${({ theme }) => css`
    flex: 1;
    background-color: ${theme.colors["pure-white"]};
  `}
`;

export const StyledHeader= styled.View`
  ${({ theme }) => css`
    background-color: ${theme.colors["neutral-4"]};
    border-radius: 0 0 70px 70px;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 90px 80px 40px 80px;
  `}
`;

export const StyledLogoContainer = styled.View`
  ${({ theme }) => css`
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;
  `}
`;

export const StyledContent = styled.View`
  ${({ theme }) => css`
    padding-top: 70px;
    flex: 1;
    position: relative;
  `}
`;

export const StyledActions = styled.View`
  ${({ theme }) => css`
    position: absolute;

    padding-left: 25px;
    padding-right: 25px;

    bottom: 15px;
    width: 100%;
  `}
`;