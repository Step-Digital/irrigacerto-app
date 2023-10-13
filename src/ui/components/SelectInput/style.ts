import styled, { css } from 'styled-components/native';

interface ContainerProps {
  width?: string;
}

export const Container = styled.View<ContainerProps>`
${({ width }) => css`
  display: flex;
  width: ${width}
`}
`;