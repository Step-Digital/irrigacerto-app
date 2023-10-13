import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  ${({ theme }) => css`
    background: ${theme.colors['positive']};
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    padding: 48px 24px 32px 32px;
  `}
`;

export const CloseContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const CloseButton= styled.TouchableOpacity`
  width: 20%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const logoContainer = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const MenuContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const MenuOptionContainer = styled.TouchableOpacity`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 16px;
`;
