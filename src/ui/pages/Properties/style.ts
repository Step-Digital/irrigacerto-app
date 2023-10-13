import styled, { css } from "styled-components/native";

interface AddCultureButtonProps {
  isDisabled: boolean;
}

interface ContainerProps {
  isModalActive: boolean;
}

export const Container = styled.View<ContainerProps>`
  ${({ isModalActive }) => css`
    position: relative;
    height: 100%;
    background-color: ${ isModalActive ? '#b3b3b3' : '#fff'};
  `}
`;

export const ModalContainer = styled.View`
  ${({ theme }) => css`
    width: 92%;
    background-color: ${theme.colors["pure-white"]};
    margin: 0 auto;
    margin-top: 120px;
    margin-bottom: 16px;
    padding: 24px;
    border-radius: 8px;
  `}
`;

export const HeaderModal = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

export const CloseModalButton = styled.TouchableOpacity``;

export const Divisor = styled.View`
  width: 100%;
  border: 0.5px solid #dddddd;
  margin: 4px 0;
`;

export const SectionContainer = styled.View`
  width: 100%;
  padding: 1px;
`;

export const SectionHeader = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const SectioContent = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const EditButton = styled.TouchableOpacity``;

export const InfoText = styled.Text`
  ${({ theme }) => css`
    font-size: 14px;
    color: black;
    font-family: "Poppins-regular";
  `}
`;

export const InfoTextBold = styled.Text`
  ${({ theme }) => css`
    font-size: 14px;
    color: black;
    font-family: "Poppins-bold";
  `}
`;

export const Content = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
`;

export const ButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  position: absolute;
  right: 16px;
  bottom: 16px;
`;

export const ButtonModalContainer = styled.View`
  width: 233px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: absolute;
  right: 18px;
  bottom: 64px;
  border-radius: 4px;
`;

export const AddCultureButton = styled.TouchableOpacity<AddCultureButtonProps>`
  ${({ theme, isDisabled }) => css`
    background-color: ${isDisabled
      ? theme.colors["gray-3"]
      : theme.colors["positive"]};
    display: flex;
    flex-direction: row;
    padding: 16px;
    border-radius: 4px 4px 0 0;
    justify-content: center;
  `}
`;

export const AddPropertyButton = styled.TouchableOpacity`
  ${({ theme }) => css`
    background-color: ${theme.colors["positive"]};
    display: flex;
    flex-direction: row;
    padding: 16px;
    border-radius: 0 0 4px 4px;
    justify-content: center;
  `}
`;

export const OpenModalButton = styled.TouchableOpacity`
  ${({ theme }) => css`
    background-color: ${theme.colors["positive"]};
    width: 44px;
    height: 44px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    border-radius: 50px;
  `}
`;

export const OpenModalButtonText = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors["pure-white"]};
    font-size: 32px;
  `}
`;

export const PropertyContainer = styled.View`
  padding: 24px 16px 0 16px;
`;

export const PropertyHeader = styled.TouchableOpacity`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;

export const OpenClosePorpertiesButton = styled.TouchableOpacity``;

export const GroundContent = styled.View`
  display: flex;
  flex-direction: "column";
  gap: 10px;
  padding: 16px;
`;

export const AddButton = styled.TouchableOpacity`
${({ theme }) => css `
  width: 156px;
  border: 2px solid #00344A;
  padding: 10px;
  border-radius: 500px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors["neutral-4"]};
  margin-top: 16px;
`}
`;

export const AddBombsButton = styled.TouchableOpacity`
${({ theme }) => css `
  width: 206px;
  border: 2px solid #00344A;
  padding: 10px;
  border-radius: 500px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors["neutral-4"]};
  margin-top: 16px;
  margin-bottom: 16px;
`}
`;

export const AddSystemButton = styled.TouchableOpacity`
${({ theme }) => css `
  width: 256px;
  border: 2px solid #00344A;
  padding: 10px;
  border-radius: 500px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors["neutral-4"]};
  margin-top: 16px;
  margin-bottom: 16px;
`}
`;

export const CardContainer = styled.View`
${({ theme }) => css`
  width: 100%;
  background: ${theme.colors["gray-2"]};
  padding: 16px;
  display: flex;
  flex-direction: row;
  border-radius: 8px;
  margin-bottom: 8px;
`}
`;

export const CardContent = styled.View`
  width: 90%;
`;

export const InfoTitle = styled.Text`
  ${({ theme }) => css`
  font-size: 16px;
  color: ${theme.colors["neutral-4"]};
  font-weight: 700;
  font-family: 'Poppins-regular';
`}
`;

export const GroundContainer = styled.View`
  position: relative;
  flex: 1;
`;

export const BombsContainer = styled(GroundContainer)`
  position: relative;
  flex: 1;
`;

export const SystemContainer = styled(GroundContainer)``;

export const ButtonsContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* width: 100%; */
`;