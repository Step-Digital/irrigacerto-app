import { css } from 'styled-components';
import styled from 'styled-components/native';

interface ProgressBarProps {
  active?: boolean;
}

interface ProgressButton {
  activeButton?: boolean;
}

export const Container = styled.View`
  ${({ theme }) => css`
  width: 328px;
  background-color: ${theme.colors["pure-white"]};
  display: flex;
  align-items: center;
  margin: 0 auto;
  margin-top: 120px;
  padding: 24px;
  `}
`;

export const Content = styled.View``;

export const ImgContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const TitleContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const CloseModalButton = styled.TouchableOpacity`
  /* margin-top: 30px; */
`;

export const TextBold = styled.Text`
  font-weight: 700;
`;

export const Footer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 16px;
`;

export const ProgressBarContainer = styled.View`
  display: flex;
  flex-direction: row;
`;

export const ProgressBar = styled.View<ProgressBarProps>`
  ${({ theme, active }) => css`
    width: 32px;
    height: 6px;
    background-color: ${active ? theme.colors["positive"] : theme.colors["gray-2"]};
    border-radius: 55px;
   
    margin-right: 4px;
  `}
`;

export const ButtonsContainer = styled.View`
  display: flex;
  flex-direction: row;
`;


export const LeftButton = styled.TouchableOpacity<ProgressButton>`
  ${({ activeButton, theme }) => css`
    background-color: ${activeButton ? theme.colors["positive"] : theme.colors["gray-2"]};
    width: 34px;
    height: 34px;
    border-radius: 50px;
    margin-right: 16px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  `}
`;

export const RightButton = styled.TouchableOpacity<ProgressButton>`
  ${({ activeButton, theme }) => css`
    background-color: ${activeButton ? theme.colors["positive"] : theme.colors["gray-2"]};
    width: 34px;
    height: 34px;
    border-radius: 50px;
    justify-content: center;
    align-items: center;
  `}
`;

export const FooterContent = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;
