import styled, { css } from "styled-components/native";
import { ButtonProps } from ".";

export const StyledButton = styled.TouchableOpacity<ButtonProps>`
  ${(props) => css`
    background-color: ${props.disabled
      ? props.theme.colors["gray-5"]
      : props.theme.colors[props["bg-color"]]};
    height: 50px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 40px;
  `}
`;
