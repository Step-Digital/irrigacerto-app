import styled from 'styled-components/native';

export const Container = styled.View`
  position: relative;
  flex: 1;
  height: 100%;
`;

export const Content = styled.View`
  padding: 32px 16px;
`;

export const ImageContent = styled.View`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 24px;
`;

export const TextContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const TextBold = styled.Text`
  margin-left: 4px;
`;

export const registerCultureButton = styled.TouchableOpacity`
  margin-top: 24px;
`;

export const ButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  margin-bottom: 16px;
`;
