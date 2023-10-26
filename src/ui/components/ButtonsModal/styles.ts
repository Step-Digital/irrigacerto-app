import styled, { css } from "styled-components/native";

interface AddCultureButtonProps {
  isDisabled: boolean;
}


export const ButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  position: absolute;
  right: 16px;
  bottom: 16px;
`;

export const ButtonModalContainer = styled.View`
  width: 233px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: absolute;
  right: 18px;
  bottom: 64px;
  border-radius: 4px;
`;

export const AddCultureButton = styled.TouchableOpacity<AddCultureButtonProps>`
  ${({ theme, isDisabled }) => css`
    background-color: ${isDisabled
      ? theme.colors["gray-3"]
      : theme.colors["positive"]};
    display: flex;
    flex-direction: row;
    padding: 16px;
    border-radius: 4px 4px 0 0;
    justify-content: center;
  `}
`;

export const AddPropertyButton = styled.TouchableOpacity`
  ${({ theme }) => css`
    background-color: ${theme.colors["positive"]};
    display: flex;
    flex-direction: row;
    padding: 16px;
    border-radius: 0 0 4px 4px;
    justify-content: center;
  `}
`;

export const OpenModalButton = styled.TouchableOpacity`
  ${({ theme }) => css`
    background-color: ${theme.colors["positive"]};
    width: 44px;
    height: 44px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    border-radius: 50px;
  `}
`;

export const OpenModalButtonText = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors["pure-white"]};
    font-size: 32px;
  `}
`;