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
  gap: 10px;
  flex: 1;
`;

export const ButtonsContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const InsertButton = styled.TouchableOpacity`
  border: 2px solid #00344A;
  padding: 10px;
  border-radius: 500px;
  width: 172px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const GPSBUtton = styled.TouchableOpacity`
  border: 2px solid #00344A;
  padding: 10px;
  border-radius: 500px;
  width: 172px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const GPSButtonFull = styled.TouchableOpacity`
${({ theme }) => css `
  border: 2px solid #00344A;
  padding: 10px;
  border-radius: 500px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors["neutral-4"]};
  margin-bottom: 4px;
`}
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
  font-family: 'Poppins-bold';
  margin-top: 9px;
`}
  
`;

export const ContainerInput = styled.View`
  border: 1px solid black;
  ${({ theme }) => css`
    background-color: transparent;
    border-radius: 90px;
    border: 1.5px solid ${theme.colors["gray-3"]};
    padding: 10px;
    /* padding-left: 20px; */
    font-size: ${theme.font.sizes.small}px;
    font-weight: ${theme.font.weight.medium};
    font-family: 'Poppins-regular';
    margin-top: 43px;
  `}
`;