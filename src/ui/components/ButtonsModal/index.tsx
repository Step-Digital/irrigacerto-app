import React from 'react'
import { Image } from "expo-image";
import { Typography } from '../typography';
import { strings } from "../../../utils";

import * as S from './styles'
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../routes/types/StackNavigationProps';

export const ButtonsModal = ({
  disableButton,
  setOpenButtonsModal,
  openButtonsMOdal
}) => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <>
      <S.ButtonContainer>
        <S.OpenModalButton
          onPress={() => setOpenButtonsModal(!openButtonsMOdal)}
        >
          <S.OpenModalButtonText>
            {openButtonsMOdal ? "-" : "+"}
          </S.OpenModalButtonText>
        </S.OpenModalButton>
      </S.ButtonContainer>
      {openButtonsMOdal && (
        <S.ButtonModalContainer>
          <S.AddCultureButton
            isDisabled={disableButton() === true}
            bg-color="positive"
            onPress={() => {
              navigation.navigate("CultureInfo");
              setOpenButtonsModal(false);
            }}
            disabled={disableButton()}
          >
            <Image
              source={require("../../../../assets/Light.png")}
              style={{
                width: 24,
                height: 24,
              }}
            />
            <Typography
              style={{ fontFamily: "Poppins-regular", marginLeft: 8 }}
              color="pure-white"
              size="normal"
              weight="medium"
            >
              {strings.homeLogged.addButton.addCulture}
            </Typography>
          </S.AddCultureButton>
          <S.AddPropertyButton
            bg-color="positive"
            onPress={() => {
              navigation.navigate("NewProperty");
              setOpenButtonsModal(false);
            }}
          >
            <Image
              source={require("../../../../assets/Regular.png")}
              style={{
                width: 24,
                height: 24,
              }}
            />
            <Typography
              style={{ fontFamily: "Poppins-regular", marginLeft: 8 }}
              color="pure-white"
              size="normal"
              weight="medium"
            >
              {strings.homeLogged.addButton.addProperty}
            </Typography>
          </S.AddPropertyButton>
        </S.ButtonModalContainer>
      )}
    </>
  )
}