import styled, { css } from 'styled-components/native';
import { TypographyProps } from '.';

export const StyledText = styled.Text<TypographyProps>`
  ${({ theme, color, size, weight}) => css`
    font-size: ${theme.font.sizes[size]}px;
    line-height: ${theme.font.lineHeight[size]}px;
    font-weight: ${theme.font.weight[weight]};

    color: ${theme.colors[color]};
  `}
`;
