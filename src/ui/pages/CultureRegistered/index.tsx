import React from "react";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";

import { strings } from "../../../utils";

import { NavigationProps } from "../../routes/types/StackNavigationProps";
import { Header } from "../../components/Header";
import { Typography } from "../../components/typography";

import * as S from './style';
import { Button } from "../../components/button";
import { AuthDomain } from "../../../core/domain/auth.domain";
import { NewPropertyDomain } from "../../../core/domain/newProperty.domain";
import { useQuery } from "@tanstack/react-query";

type PropertyRegisteredProps = {
  auth: AuthDomain;
  propertyService: NewPropertyDomain;
};

export const CultureRegistered: React.FC<PropertyRegisteredProps> = ({ propertyService, auth}) => {
  const navigation = useNavigation<NavigationProps>();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["AllProperties"],
    queryFn: () => propertyService.getAllPropertiesData(),
  });

  const onSubmit = () => {
    refetch()
    navigation.navigate('HomeLogged')
  }


  return (
    <S.Container>
      <Header 
        minHeader 
        minTitle={strings.CultureInfo.cultureFinished} 
        isFinalStep
      />
      <S.Content>
      <Typography
        style={{
          fontFamily: 'Poppins-bold',
          fontSize: 22,
        }}
        color="neutral-4"
        size="normal"
        weight="regular"
        >
        {strings.CultureInfo.cultureRegistered}
      </Typography>
      <S.ImageContent>
      <Image
        source={require("../../../../assets/onboarding4.png")}
        transition={1000}
        style={{
          width: 211,
          height: 213,
        }}
        contentFit="cover"
        />
      </S.ImageContent>
      <S.TextContainer>
        <Typography
          style={{
            marginTop: 28,
            fontFamily: 'Poppins-bold',
            fontSize: 14,
            textAlign: 'center',
            lineHeight: 17.5
          }}
          color="neutral-4"
          size="normal"
          weight="regular"
          >
          {strings.CultureInfo.text1} 
        </Typography>
        <Typography
          style={{
            fontFamily: 'Poppins-regular',
            fontSize: 14,
            textAlign: 'center',
            lineHeight: 17.5
          }}
          color="gray-7"
          size="normal"
          weight="regular"
          >
          {strings.CultureInfo.text2} 
        </Typography>
      </S.TextContainer>
      <S.TextContainer>
      </S.TextContainer>
      </S.Content>
      <S.ButtonContainer>
        <Button 
          onPress={() => onSubmit()}
          bg-color="neutral-4" 
          style={{ 
              width: '90%',
            }}
            >
          <Typography
            style={{
              fontFamily: 'Poppins-bold',
              fontSize: 14,
              textAlign: 'center',
            }}
            color="pure-white"
            size="normal"
            weight="regular"
            >
            {strings.CultureInfo.gobackButton}
          </Typography>
        </Button>
      </S.ButtonContainer>
    </S.Container>
  )
}