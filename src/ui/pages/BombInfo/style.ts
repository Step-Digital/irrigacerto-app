import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  position: relative;
  flex: 1;
`;

export const ProgressBarContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 16px;
`;

export const Content = styled.View`
  display: flex;
  flex-direction: "column";
  gap: 10px;
`;

export const ButtonText = styled.Text`
${({ theme }) => css`
  font-family: 'Poppins-regular';
  font-weight: 700;
  color: ${theme.colors["pure-white"]};
  font-size: 14px;
`}
`;

export const InputsContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Label = styled.Text`
${({ theme }) => css`
  margin: 0;
  position: absolute;
  color: ${theme.colors["neutral-4"]};
  font-weight: 700;
  margin-top: 9px;
`}

`;

export const AddButton = styled.TouchableOpacity`
${({ theme }) => css `
  width: 221px;
  border: 2px solid #00344A;
  padding: 10px;
  border-radius: 500px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors["neutral-4"]};
  margin-top: 16px;
`}
`;

export const CardContainer = styled.View`
${({ theme }) => css`
  width: 100%;
  background: ${theme.colors["gray-1"]};
  padding: 16px;
  display: flex;
  flex-direction: row;
`}
`;

export const CardContent = styled.View`
  width: 90%;
`;

export const InfoTitle = styled.Text`
  ${({ theme }) => css`
  font-size: 16px;
  color: ${theme.colors["neutral-4"]};
  font-weight: 700;
  font-family: 'Poppins-regular';
`}
`;

export const InfoText = styled.Text`
  ${({ theme }) => css`
  font-size: 14px;
  color: ${theme.colors["neutral-4"]};
  font-family: 'Poppins-regular';
`}
`;

export const InfoTextBold = styled.Text`
  ${({ theme }) => css`
  font-size: 14px;
  color: ${theme.colors["neutral-4"]};
  font-family: 'Poppins-regular';
  font-weight: 700;
`}
`;