import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  ${({ theme }) => css`
    background-color: ${theme.colors["pure-white"]};
    padding: 16px;
    margin: 16px;
    border-radius: 8px;
    elevation: 2;
  `}
`;

export const ActionsButton = styled.TouchableOpacity`
  position: relative;
`;

export const MainInfoContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const TextContainer = styled.View`
`;

export const StatusContainer = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: 16px;
`;

export const PrecipitationContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const PrecipitationTextContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
`;

export const StatusGroundContainer = styled.View`
  display: flex;
  flex-direction: column;
  margin-left: 32px;
`;

export const FooterCard = styled.View`
  ${({ theme }) => css`
    background-color: ${theme.colors["gray-1"]};
    padding: 14px;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
  `}
`;

export const FooterContainer = styled.View`
  margin-top: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const PlusButton = styled.TouchableOpacity``;

export const MinusButton = styled.TouchableOpacity``;

export const EditContainer = styled.TouchableOpacity`
${({ theme }) => css`
  display: flex;
  flex-direction: row;
  position: absolute;
  right: 0;
  bottom: 36px;
  background-color: ${theme.colors["pure-white"]};
  width: 161px;
  padding: 8px;
  border: 0.5px solid black
`}
`;
