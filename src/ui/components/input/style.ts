import styled, { css } from "styled-components/native";

export const StyledWrapper = styled.KeyboardAvoidingView`
  background-color: transparent;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SyledLabel = styled.Text`
${({ theme }) => css `
  margin-top: 8px;
  color: ${theme.colors["neutral-4"]};
  font-family: 'Poppins-bold';
`}
`;

export const StyledInput = styled.TextInput`
  ${({ theme, editable }) => css`
    background-color: transparent;
    border-radius: 90px;
    border: 1.5px solid ${theme.colors["gray-3"]};
    padding: 10px;
    padding-left: 20px;
    font-size: ${theme.font.sizes.small}px;
    font-weight: ${theme.font.weight.medium};
    font-family: 'Poppins-regular';

    ${() =>
      editable === false &&
      css`
        border-radius: 90px;
        border: 1.5px solid ${theme.colors["gray-5"]};
        padding: 10px;
    padding-left: 20px;

      `}
  `}
`;
