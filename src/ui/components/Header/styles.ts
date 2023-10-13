import styled, { css } from "styled-components/native";

interface ContainerProps {
  minHeader: boolean;
}

export const Container = styled.View<ContainerProps>`
 ${({ theme, minHeader}) => css`
    width: 100%;
    background-color: ${theme.colors['neutral-4']};
    display: flex;
    padding: 40px 16px 12px 16px;
    border-radius: ${minHeader ?  0 : '0px 0px 24px 24px'};
  `}
`;

export const HeaderContainer = styled.View<ContainerProps>`
${({ minHeader }) => css`
  display: flex;
  flex-direction: row;
  justify-content: space-between; 
  align-items: center;
  margin-bottom:  ${!minHeader ?  0 : '8px'};
`}
`;

export const DropDownButton = styled.TouchableOpacity``;

export const ProfileButton = styled.TouchableOpacity``;

export const BackButton = styled.TouchableOpacity``;

export const CloseButton = styled.TouchableOpacity``;

export const MinTitle = styled.Text`
  ${({ theme }) => css`
  color: ${theme.colors["pure-white"]};
  font-size: 16px;
  font-family: 'Poppins-bold';
  `}
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors["pure-white"]};
    font-size: 16px;
    margin-top: 18px;
    width: 131px;
    font-family: 'Poppins-bold';
    `}
`;

