import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1
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

export const CategoryContainer = styled.View``;

export const CategoryTitle = styled.Text`
${({ theme }) => css`
  color: ${theme.colors["positive"]};
  font-family: 'Poppins-bold';
  font-size: 16px;
  font-style: normal;
  margin-top: 16px;
`}
`;

export const CategoryButton = styled.TouchableOpacity``;

export const ContainerInput = styled.View`
  border: 1px solid black;
  ${({ theme }) => css`
    background-color: transparent;
    border-radius: 90px;
    border: 1.5px solid ${theme.colors["gray-3"]};
    padding: 10px;
    padding-left: 20px;
    font-size: ${theme.font.sizes.small}px;
    font-weight: ${theme.font.weight.medium};
    font-family: 'Poppins-regular';
  `}
`;

export const Label = styled.Text`
${({ theme }) => css `
  margin-top: 8px;
  color: ${theme.colors["neutral-4"]};
  font-family: 'Poppins-bold';
`}
`;