import { ActivityIndicator, TouchableOpacityProps } from "react-native";
import { defaultTheme } from "../../theme/default";
import React, { PropsWithChildren } from "react";
import { StyledButton } from "./style";

export type ButtonProps = {
  ["bg-color"]: keyof typeof defaultTheme.colors;
  color?: keyof typeof defaultTheme.colors;
  loading?: boolean;
} & TouchableOpacityProps;

export const Button: React.FC<PropsWithChildren<ButtonProps>> = (props) => {
  return (
    <StyledButton {...props}>
      {props.loading && <ActivityIndicator size={"small"} color={"#00344A"} />}
      {!props.loading && <>{props.children}</>}
    </StyledButton>
  );
};
