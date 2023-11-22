import styled, { css } from 'styled-components/native'

interface ContainerProps {
  isLogin: boolean
}

export const Container = styled.View<ContainerProps>`
${({ isLogin }) => css`
    background-color: #00344A;
    padding-top: 80px;
    border-radius: 0 0 70px 70px;
    height: 270px;
`}
`

export const ContainerImg = styled.View`
${({ theme }) => css`
  background-color: ${theme.colors["neutral-4"]};
  justify-content: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  padding-top: 50px;
`}
`