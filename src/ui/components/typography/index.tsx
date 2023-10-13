import React, { PropsWithChildren } from 'react';
import { TextProps } from 'react-native';
import { defaultTheme } from '../../theme/default';
import { StyledText } from './style';

export type TypographyProps = {
    color: keyof typeof defaultTheme.colors;
    size: keyof typeof defaultTheme.font.sizes;
    weight: keyof typeof defaultTheme.font.weight;
} & TextProps;

export const Typography: React.FC<PropsWithChildren<TypographyProps>> = (props) => {
  return (
    <StyledText {...props}>
      {props.children}
    </StyledText>
  )
}
